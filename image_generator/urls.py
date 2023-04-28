from django.urls import path
from . import views

app_name = "image_generator"

urlpatterns = [
    path("", views.index, name="index"),
    path("generate/", views.generate, name="generate")
]