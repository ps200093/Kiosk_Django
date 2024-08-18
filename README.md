# 키오스크 시스템

Django를 사용하여 개발된 키오스크 시스템. 사용자는 제품을 선택하고 주문할 수 있으며, 관리자는 주문을 확인하고 초기화할 수 있다.

## 기능

- 제품 목록 표시
- 제품 주문
- 주문 확인 및 초기화
- 주문 내용 조회

## 설치 및 실행

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/ps200093/Kiosk_Django.git
   cd kiosk-system
</br>

2. **가상 환경 생성 및 활성화**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
</br>

3. **의존성 설치**
   ```bash
   pip install -r requirements.txt
</br>

5. **데이터베이스 마이그레이션**
   ```bash
   python manage.py migrate
</br>

7. **서버 실행**
   ```bash
   python manage.py runserver
</br>
