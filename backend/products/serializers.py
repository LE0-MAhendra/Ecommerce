from rest_framework import serializers
from accounts.models import User

from products.models import Products, Category, Brand


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    sale_price = serializers.SerializerMethodField()
    # base_url = "http://127.0.0.1:8000"
    user = UserSerializer()
    brand = BrandSerializer()

    class Meta:
        model = Products
        fields = "__all__"

    def get_sale_price(self, obj):
        return obj.sale_price

    # def to_representation(self, instance):
    #     data = super(ProductSerializer, self).to_representation(instance)
    #     if instance.image:
    #         data["image"] = f"{self.base_url}{instance.image.url}"
    #     return data
