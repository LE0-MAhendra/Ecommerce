from django.urls import path
from . import views

urlpatterns = [
    # Categories CRUD
    path("categories/", views.get_categories, name="allcategories"),
    path("addcategory/", views.addcategory, name="addcategory"),
    path("category/<uuid:pk>/", views.category, name="category"),
    path("delcategory/<uuid:pk>/", views.delete_category, name="delcategory"),
    # Brand CRUD
    path("addbrand/", views.addbrand, name="addbrand"),
    path("allbrands/", views.get_brands, name="allbrands"),
    path("brand/<uuid:pk>/", views.brand, name="brand"),
    path("delbrand/<uuid:pk>/", views.delete_brand, name="delbrand"),
    #  Products CRUD
    path("", views.get_products, name="allproducts"),
    path("<uuid:pk>/", views.get_product, name="product"),
    path("addproduct/", views.add_product, name="addproduct"),
    path("editproduct/<uuid:pk>/", views.edit_product, name="editproduct"),
    path("delproduct/<uuid:pk>/", views.delete_product, name="delproduct"),
]
