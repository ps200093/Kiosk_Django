from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=0, default=0)
    total_quantity = models.PositiveIntegerField(default=0)


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, default=1)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=0, default=0)