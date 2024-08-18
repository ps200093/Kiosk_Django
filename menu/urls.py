from django.urls import path
from . import views, admin

# path(URL_NAME, BEHAVIOR, OBJECT_NAME)
urlpatterns = [
    path('', views.index, name='index'),
    path('confirm_home/', views.confirm_home, name='confirm_home'),
    path('add_to_order/', views.add_to_order, name='add_to_order'),
    path('get_order_content/', views.get_order_content, name='get_order_content'),
]
