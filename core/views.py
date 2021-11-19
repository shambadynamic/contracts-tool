from django.shortcuts import render, redirect
from .forms import DataQueryForm
from django.views.generic.edit import FormView, CreateView
from .models import DataQuery
from django.urls import reverse_lazy
from django.http import HttpResponse
import json

# Create your views here.


class QueryMapView(FormView):
    template_name = 'defi/os/index.html'
    form_class = DataQueryForm
    success_url = reverse_lazy('dashboard')


def create_query_record(request):
    if request.method == 'POST':
        data_code = request.POST['dataset_code']
        band = request.POST['selected_band']
        scale = request.POST['image_scale']
        start_date = request.POST['start_date']
        end_date = request.POST['end_date']
        query = request.POST['query']
        # print('This is query', query)

        DataQuery.objects.create(
            data_code=data_code,
            band=band,
            scale=scale,
            start_date=start_date,
            end_date=end_date,
            query=json.loads(query)

        )
        return HttpResponse('')
