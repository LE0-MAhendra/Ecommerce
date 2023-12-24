from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("djoser.urls")),
    path("api/", include("accounts.urls")),
    # path("api/", include("rest_framework.urls")),
    path("products/", include("products.urls")),
    path("items/", include("Orders.urls")),
]
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
