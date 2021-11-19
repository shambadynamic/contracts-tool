
from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from customer.views import HomeView
from core.views import QueryMapView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', QueryMapView.as_view(), name='dashboard'),
    path('', include("core.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
