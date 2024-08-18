from django.shortcuts import render, redirect
from .models import Product, OrderItem, Order
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    # 제품 목록 조회 후, 렌더링
    if request.method == 'POST':
        return redirect('/')

    items = Product.objects.all()   # 모든 제품 가져오기
    return render(request, 'menu/index.html', {'items': items})


@csrf_exempt
def confirm_home(request):
    # 주문 항목 초기화

    if request.method == 'POST':
        data = json.loads(request.body)
        confirm = data.get('confirm')
        print(f"Confirm status: {confirm}")

        if confirm == 'yes':
            print("초기화 시작")
            reset_order_items(request.user)  # 현재 사용자의 주문 항목 초기화
            print("초기화 완료")
            return JsonResponse({'status': 'redirect', 'url': redirect('index').url})
        else:
            return JsonResponse({'status': 'fail'})

    return redirect('index')


@csrf_exempt
def add_to_order(request):
    # 주문 내역에 제품 추가
    # 제품 ID로 접근

    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data.get('product_id')
        product = Product.objects.get(id=product_id)
        print(f"Responsed product_id = {product_id}")
        print(f"Product: {product}, User: {request.user}")

        order, created = Order.objects.get_or_create(user=request.user, completed=False)
        order_item, created = OrderItem.objects.get_or_create(order=order, product=product)

        if not created:
            order_item.quantity += 1
        order_item.save()

        # Update total price and quantity
        order.total_price += product.price
        order.total_quantity += 1
        order.save()

        print(f"Updated total price: {order.total_price}, total quantity: {order.total_quantity}")

        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'fail'})


@csrf_exempt
def get_order_content(request):
    # 주문 내용 JSON 형태로 반환

    try:
        order = Order.objects.get(user=request.user, completed=False)
    except Order.DoesNotExist:
        return JsonResponse({'order_items': [], 'total_quantity': 0, 'total_price': 0})

    order_items = order.orderitem_set.all()
    order_data = {
        'order_items': [
            {
                'product': {
                    'name': item.product.name,
                    'price': str(item.product.price)
                },
                'quantity': item.quantity
            }
            for item in order_items
        ],
        'total_quantity': order.total_quantity,
        'total_price': str(order.total_price)
    }
    return JsonResponse(order_data)


def reset_order_items(user):
    try:
        order = Order.objects.get(user=user, completed=False)
        OrderItem.objects.filter(order=order).delete()
        order.total_price = 0
        order.total_quantity = 0
        order.save()
        print("주문 항목이 초기화되었습니다.")
    except Order.DoesNotExist:
        print("주문이 없습니다.")