from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from Orders.views import get_user
from products.models import Products, Category, Brand
from products.serializers import ProductSerializer, CategorySerializer, BrandSerializer
from rest_framework.permissions import AllowAny
from django.db.models import Q


def get_full_image_url(relative_path):
    base_url = "http://127.0.0.1:8000"
    return f"{base_url}{relative_path}"


@permission_classes([AllowAny])
@api_view(["GET"])
def get_products(request):
    brand_param = request.query_params.get("brand", None)
    category_param = request.query_params.get("category", None)
    if not brand_param and not category_param:
        data = Products.objects.all()
    elif brand_param or category_param:
        # Create a dictionary to store filter conditions
        filters = []

        # Add brand filter if provided
        if brand_param:
            brand_filters = [
                Q(brand__in=brand.split(",")) for brand in brand_param.split(",")
            ]
            filters.extend(brand_filters)

        # Add category filter if provided
        if category_param:
            category_filters = [
                Q(category__in=category.split(","))
                for category in category_param.split(",")
            ]
            filters.extend(category_filters)

        # Combine filters with logical OR
        combined_filter = Q()
        if brand_param and category_param:
            combined_filter &= Q(brand__in=brand_param.split(",")) & Q(
                category__in=category_param.split(",")
            )
        else:
            for filter_condition in filters:
                combined_filter |= filter_condition

        # Apply filters to the queryset
        data = Products.objects.filter(combined_filter).distinct()

    if not data:
        return Response({"message": f"No Products are added"})
    serializer = ProductSerializer(data, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_product(request, pk):
    try:
        product = Products.objects.get(id=pk)
    except Products.DoesNotExist:
        return Response(
            {"message": f"No Product with id {pk} exists"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ProductSerializer(product)
    return Response(serializer.data)


@permission_classes([AllowAny])
@api_view(["GET"])
def get_categories(request):
    data = Category.objects.all()
    serializer = CategorySerializer(data, many=True)
    return Response(serializer.data)


@permission_classes([AllowAny])
@api_view(["GET"])
def get_brands(request):
    data = Brand.objects.all()
    serializer = BrandSerializer(data, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addcategory(request):
    user = get_user(request)
    if user.is_admin:
        data = request.data.copy()
        data["user"] = user.id
        serializer = CategorySerializer(data=data)
        if serializer.is_valid() and user.is_admin:
            serializer.save()
            data.clear()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def category(request, pk):
    user = get_user(request)
    if user.is_admin:
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(
                {"message": "category not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if request.method == "PUT":
            data = request.data.copy()
            data["user"] = user.id
            serializer = CategorySerializer(category, data=data)
        elif request.method == "PATCH":
            serializer = CategorySerializer(category, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addbrand(request):
    user = get_user(request)
    if user.is_admin:
        data = request.data.copy()
        data["user"] = user.id
        serializer = BrandSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def brand(request, pk):
    user = get_user(request)
    if user.is_admin:
        try:
            brand = Brand.objects.get(pk=pk)
        except Brand.DoesNotExist:
            return Response(
                {"message": "brand not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if request.method == "PUT":
            data = request.data.copy()
            data["user"] = user.id
            serializer = BrandSerializer(brand, data=data)
            data.clear()
        elif request.method == "PATCH":
            serializer = BrandSerializer(brand, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_product(request):
    user = get_user(request)
    data = request.data
    image = request.data["images"]
    data["user"] = user.id
    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def edit_product(request, pk):
    user = get_user(request)
    if user.is_admin:
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response(
                {"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if request.method == "PUT":
            data = request.data
            data["user"] = user.id
            serializer = ProductSerializer(product, data=data)
        elif request.method == "PATCH":
            serializer = ProductSerializer(product, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_category(request, pk):
    user = get_user(request)
    category = get_object_or_404(Category, id=pk)
    if not user.is_admin:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )
    category.delete()
    return Response({"message": "Category is Deleted"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_brand(request, pk):
    user = get_user(request)
    brand = get_object_or_404(Brand, id=pk)
    if not user.is_admin:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )
    brand.delete()
    return Response({"message": "Job is Deleted"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    user = get_user(request)
    product = get_object_or_404(Products, id=pk)
    if not user.is_admin:
        return Response(
            {"message": "You are not Allowed"}, status=status.HTTP_403_FORBIDDEN
        )
    product.delete()
    return Response({"message": "Job is Deleted"}, status=status.HTTP_200_OK)
