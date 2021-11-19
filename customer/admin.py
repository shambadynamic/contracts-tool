from django.contrib import admin
from django_tenants.admin import TenantAdminMixin

from customer.models import DefiClient


@admin.register(DefiClient)
class DefiClientAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'paid_until')
