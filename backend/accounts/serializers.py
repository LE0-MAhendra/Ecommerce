from .models import User
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password")
        extra_kwargs = {
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
            "email": {"required": True, "allow_blank": False},
            "password": {"required": True, "allow_blank": False, "min_length": 6},
        }


class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "first_name", "last_name", "email")
