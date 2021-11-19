from datetime import datetime, timedelta
from django.contrib import messages
from django.shortcuts import render, HttpResponseRedirect, get_object_or_404
from django.views.generic import FormView, CreateView, DetailView, ListView, UpdateView, TemplateView


class HomeView(TemplateView):
    template_name = "defi/os/index.html"
