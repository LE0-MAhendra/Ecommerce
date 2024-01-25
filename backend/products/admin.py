from django.contrib import admin

from products.models import Products, Brand, Category


# Register your models here.
class slugmaker(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)


class Productadmin(admin.ModelAdmin):
    list_display = ("name", "brand", "created_at", "updated_at", "is_available")


admin.site.register(Products, Productadmin)
admin.site.register(Brand, slugmaker)
admin.site.register(Category, slugmaker)
