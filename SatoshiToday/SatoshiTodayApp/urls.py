from django.urls import path

from . import views

urlpatterns = [
    path("", views.HomePage, name="HomePage"),
    path('api/get_local_price/', views.get_local_price, name='get_local_price'),
    path('simulate/', views.simulate, name='simulate'),

]