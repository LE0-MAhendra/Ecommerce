from rest_framework import serializers

from Orders.models import Cart, Orders, CartItem
from accounts.models import User
from products.models import Products
from products.serializers import ProductSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email")


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    cart_items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = "__all__"

    def get_user(self, obj):
        return obj.user.email


class OrdersSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    product = ProductSerializer()

    class Meta:
        model = Orders
        fields = "__all__"
