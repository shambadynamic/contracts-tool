from django.contrib import admin
from .models import DataQuery
# Register your models here.


@admin.register(DataQuery)
class DataQueryAdmin(admin.ModelAdmin):
    list_display = ('data_code', 'query_date')
