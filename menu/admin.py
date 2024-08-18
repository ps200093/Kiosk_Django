from django.contrib import admin
from .models import Product, OrderItem, Order

# models에 있는거 여기에 넣어주기
# Register your models here.
admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(Order)

