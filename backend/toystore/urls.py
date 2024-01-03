from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path("store/admin/", admin.site.urls),
    path("store/api/", include("djoser.urls")),
    path("store/api/", include("accounts.urls")),
    # path("api/", include("rest_framework.urls")),
    path("store/products/", include("products.urls")),
    path("store/items/", include("Orders.urls")),
]
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
