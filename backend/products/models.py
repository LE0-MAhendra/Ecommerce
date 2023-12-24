from django.db import models
import uuid
from accounts.models import User


# Create your models here.
class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, verbose_name="category")
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


def image_upload(instance, filename):
    return f"{instance.name}/logo/{filename}"


class Brand(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    logo = models.ImageField(upload_to=image_upload)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


def product_image_upload_path(instance, filename):
    if instance.brand:
        brand_name = instance.brand.name
    else:
        brand_name = "no_brand"  # or any default name you prefer

    return f"{brand_name}/products/{filename}"


class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    category = models.ManyToManyField(Category, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    discount_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to=product_image_upload_path)
    sale_price = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True
    )
    rating = models.DecimalField(default=0, max_digits=2, decimal_places=1)
    description = models.TextField(null=True, blank=True)
    quantity = models.IntegerField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.discount_percentage:
            discount_amount = float(self.price) * (
                float(self.discount_percentage) / 100
            )
            self.sale_price = round(float(self.price) - discount_amount, 2)
        else:
            self.sale_price = self.price

        super(Products, self).save(*args, **kwargs)
