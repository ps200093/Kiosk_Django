function addToOrder(productId) {
    fetch("/add_to_order/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")  // Ensure CSRF token is sent
        },
        body: JSON.stringify({ product_id: productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
//                updateOrderContent();
            updateOrderContentTable();
        } else {
            alert('Failed to add to order.');
        }
    })
    .catch(error => console.error('Error:', error));
}
//
//<!--    function updateOrderContent() {-->
//<!--        fetch('/get_order_content/')-->
//<!--        .then(response => response.json())-->
//<!--        .then(data => {-->
//<!--            let orderContent = document.getElementById('order-content');-->
//<!--            orderContent.innerHTML = '';-->
//
//<!--            data.order_items.forEach(item => {-->
//<!--                const itemTotalPrice = item.quantity * item.product.price;-->
//<!--                orderContent.innerHTML += `<div>${item.product.name} x ${item.quantity} - ${item.product.price}원 (총: ${itemTotalPrice}원)</div>`;-->
//
//<!--            });-->
//
//<!--            // 총 수량 및 총 금액 업데이트-->
//<!--            document.getElementById("total_quantity").innerText = data.total_quantity;-->
//<!--            document.getElementById("total_price").innerText = data.total_price;-->
//<!--        })-->
//<!--        .catch(error => console.error('Error:', error));-->
//<!--    }-->

function updateOrderContentTable() {
    fetch('/get_order_content/')
    .then(response => response.json())
    .then(data => {
        let orderContentTable = document.getElementById('order-list');
        const tbody = orderContentTable.querySelector('tbody');
        if(!tbody){
            console.error('Tbody not found');
            return;
        }
        tbody.innerHTML = '';

        data.order_items.forEach((item, index) => {
            const tr = document.createElement('tr');

            const indexTd = document.createElement('td');
            indexTd.textContent = index + 1;
            indexTd.className = "tg-0lax";
            tr.appendChild(indexTd);

            const productNameTd = document.createElement('td');
            productNameTd.textContent = item.product.name;
            productNameTd.className = "tg-wk8r";
            tr.appendChild(productNameTd);

            const quantityTd  = document.createElement('td');
            quantityTd.textContent = "x" + item.quantity;
            quantityTd.className = "tg-c1kk";
            tr.appendChild(quantityTd);

            const totalPriceTd  = document.createElement('td');
            const totalPrice = item.quantity * item.product.price;
            totalPriceTd.textContent = totalPrice.toLocaleString();
            totalPriceTd.className = "tg-0pky";
            totalPriceTd.innerHTML += ' 원&emsp;&emsp;';
            tr.appendChild(totalPriceTd);

            tbody.appendChild(tr);
        });
        document.getElementById("total_quantity").innerText = data.total_quantity;
        document.getElementById("total_price").innerText = parseFloat(data.total_price).toLocaleString();
    })
    .catch(error => console.error('Error:', error));
}

function confirmHome() {
    if (confirm("홈으로 돌아가시겠습니까?")) {
        fetch(confirmHomeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({ confirm: "yes" })
        })
        .then(response => {
            if (response.redirected) {
//<!--                    updateOrderContent(); // 주문 내역 초기화-->
                updateOrderContentTable();
            } else {
//<!--                    updateOrderContent(); // 주문 내역 초기화-->
                updateOrderContentTable();
            }
            setCategory('all')
        })
        .catch(error => console.error('Error:', error));
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setCategory(category) {
    // 모든 카테고리 버튼에서 active 클래스를 제거
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // ALL 버튼에 active 클래스 추가
    const allBtn = document.querySelector('.category-btn[data-category="all"]');
    allBtn.classList.add('active');

    // 카테고리 별로 제품들을 필터링
    document.querySelectorAll('.product-btn').forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}


//    document.addEventListener('DOMContentLoaded', updateOrderContent);
document.addEventListener('DOMContentLoaded', function() {
    updateOrderContentTable();
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-price').forEach(function(el) {
        const price = parseFloat(el.dataset.price);
        el.textContent = price.toLocaleString() + '원';
    });
});

