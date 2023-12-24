from django.db import models
from accounts.models import User
import uuid
from products.models import Products


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_checked_out = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    delivery_fee = models.IntegerField(default=0)
    Total_qty = models.IntegerField(default=0)
    final_price = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True
    )
    final_price_del = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return f"Cart User: {self.user.email}"

    def calculate_total_qty(self):
        total_qty = sum(item.cart_quantity for item in self.cart_items.all())
        return total_qty

    def save(self, *args, **kwargs):
        self.Total_qty = self.calculate_total_qty()
        if self.cart_items:
            self.final_price = sum(item.total_price for item in self.cart_items.all())
            if self.final_price > 500:
                self.delivery_fee = 0
                self.final_price_del = int(self.final_price + self.delivery_fee)
            else:
                self.delivery_fee = 150
                self.final_price_del = int(self.final_price + self.delivery_fee)
        else:
            self.final_price = 0
        super().save(*args, **kwargs)


class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(Cart, related_name="cart_items", on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    cart_quantity = models.IntegerField(default=1)

    @property
    def total_price(self):
        return self.cart_quantity * self.product.sale_price

    def __str__(self):
        return f"{self.product.name} - {self.cart_quantity}"


class Orders(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.DO_NOTHING, null=True, blank=True)
    Payment_id = models.CharField(max_length=100, null=True, blank=True)
    payment_sign = models.CharField(max_length=100, null=True, blank=True)
    payment_success = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
