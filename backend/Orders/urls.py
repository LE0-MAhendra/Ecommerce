from django.urls import path
from . import views

urlpatterns = [
    path("cart/", views.getCartItems, name="allCartItems"),
    path("addCartItem/<uuid:pk>/", views.AddCartItems, name="addItem"),
    path("incqty/<uuid:pk>/", views.increment, name="increase"),
    path("decqty/<uuid:pk>/", views.decrement, name="decrease"),
    path("DelCart/<uuid:pk>/", views.remove_from_cart, name="deleteItem"),
    path("orders/", views.getOrderItems, name="allorders"),
    path("addOrder/<uuid:pk>/", views.AddOrderItems, name="addorder"),
    path("createOrder/<uuid:pk>/", views.createOrder),
    path("verifySignature/<uuid:pk>/", views.verifySignature),
]
