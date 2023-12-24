from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from Orders.models import Cart, CartItem, Orders
from Orders.serializers import CartSerializer, OrdersSerializer
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import redirect
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from accounts.models import User
from products.models import Products
from rest_framework_simplejwt.tokens import AccessToken
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import razorpay

RAZOR_KEY = settings.RAZOR_KEY_ID
RAZOR_SECRET = settings.RAZOR_SECRET


def get_user_from_token(request):
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split()[1]
        decoded_token = AccessToken(token)
        user_id = decoded_token["user_id"]
        user = User.objects.get(id=user_id)
        return user
    return None


def get_user(request):
    user = get_user_from_token(request)
    if not user:
        user = request.user
    return user


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def getCartItems(request):
    user = get_user(request)
    data = Cart.objects.filter(user=user.id)
    if not data:
        return Response({"message": f"No Products are added to Cart"})
    serializer = CartSerializer(data, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def getOrderItems(request):
    user = get_user(request)
    data = Orders.objects.filter(user=user.id)
    if not data:
        return Response({"message": f"No Products are Ordered"})
    serializer = OrdersSerializer(data, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def AddOrderItems(request, pk):
    user = get_user(request)
    product = get_object_or_404(Products, id=pk)
    order = Orders.objects.get_or_create(user=user, product=product)
    order.Order_quantity += 1
    order.save()
    return Response(
        {"message": "Product added to orders successfully"},
        status=status.HTTP_201_CREATED,
    )


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def AddCartItems(request, pk):
    user = get_user(request)
    if not user.is_authenticated:
        return Response(
            {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )
    product = get_object_or_404(Products, id=pk)
    cart, created = Cart.objects.get_or_create(user=user, is_checked_out=False)
    cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not item_created:
        cart_item.cart_quantity += 1
        cart_item.save()
    cart.save()

    return Response(
        {"message": "Product added to cart successfully"},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def increment(request, pk):
    user = get_user(request)
    if not user.is_authenticated:
        return Response(
            {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )
    cart_item = get_object_or_404(CartItem, id=pk, cart__user=user)

    prod_qty = cart_item.product.quantity
    cart_qty = cart_item.cart_quantity

    if cart_qty < prod_qty:
        cart_item.cart_quantity += 1
        cart_item.save()
        cart_item.cart.save()
        return Response(
            {"message": "Cart updated successfully"},
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(
            {"error": "Cannot increment, exceeds available quantity"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
def decrement(request, pk):
    user = get_user(request)
    if not user.is_authenticated:
        return Response(
            {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )
    cart_item = get_object_or_404(CartItem, id=pk, cart__user=user)

    prod_qty = cart_item.product.quantity
    cart_qty = cart_item.cart_quantity

    if 1 < cart_qty <= prod_qty:
        cart_item.cart_quantity -= 1
        cart_item.save()
        cart_item.cart.save()
        return Response(
            {"message": "Cart updated successfully"},
            status=status.HTTP_201_CREATED,
        )
    elif cart_qty <= 1:
        cart_item.delete()
        cart_item.cart.save()
        return Response(
            {"message": "Product removed from cart"},
            status=status.HTTP_204_NO_CONTENT,
        )


# @permission_classes([IsAuthenticated])
@api_view(["DELETE"])
def remove_from_cart(request, pk):
    user = get_user(request)
    cart_item = get_object_or_404(CartItem, id=pk, cart__user=user)
    cart_item.delete()
    cart_item.cart.save()
    return Response(
        {"message": "Product removed from cart successfully"},
        status=status.HTTP_204_NO_CONTENT,
    )


@api_view(["POST"])
def createOrder(request, pk):
    cart = Cart.objects.get(id=pk)
    global client

    amount = int(cart.final_price_del) * 100
    client = razorpay.Client(auth=(RAZOR_KEY, RAZOR_SECRET))

    data = {"amount": amount, "currency": "INR"}
    payment = client.order.create(data=data)
    return Response(
        {
            "order_id": payment["id"],
            "amount": payment["amount"],
            "currency": payment["currency"],
        }
    )


@api_view(["POST"])
def verifySignature(request, pk):
    res = request.data
    user = get_user(request)
    cart = Cart.objects.get(id=pk)
    params_dict = {
        "razorpay_payment_id": res["razorpay_paymentId"],
        "razorpay_order_id": res["razorpay_orderId"],
        "razorpay_signature": res["razorpay_signature"],
    }

    # verifying the signature
    res = client.utility.verify_payment_signature(params_dict)

    if res == True:
        Orders.objects.create(
            id=res["razorpay_orderId"],
            user=user,
            cart=cart,
            Payment_id=res["razorpay_paymentId"],
            payment_sign=res["razorpay_signature"],
            payment_success=True,
        )
        cart.delete()
        return Response({"status": "Payment Successful"})
    else:
        Orders.objects.create(
            id=res["razorpay_orderId"],
            user=user,
            cart=cart,
            Payment_id=res["razorpay_paymentId"],
            payment_sign=res["razorpay_signature"],
            payment_success=False,
        )
        return Response({"status": "Payment Failed"})
