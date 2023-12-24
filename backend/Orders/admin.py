from django.contrib import admin

from Orders.models import Cart, Orders, CartItem

# Register your models here.
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Orders)
