from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('queries/', create_query_record, name='queries'),
]
