from selenium import webdriver
from bs4 import BeautifulSoup

# Selenium을 사용하여 웹 페이지를 열고 로드합니다.
driver = webdriver.Chrome('경로/chromedriver')  # chromedriver 경로를 설정해주세요.
driver.get('쇼핑몰 URL')  # 크롤링할 쇼핑몰의 URL을 입력해주세요.

# 페이지 로딩을 위해 충분한 시간을 기다립니다. 필요에 따라 sleep 등의 대기 메서드를 사용할 수 있습니다.
driver.implicitly_wait(5)  # 5초간 기다립니다.

# 페이지 소스를 가져와 Beautiful Soup으로 파싱합니다.
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# 필요한 데이터를 크롤링합니다. 예시로 상품 이름과 가격을 가져오겠습니다.
product_name = soup.select_one('CSS 선택자1').text  # CSS 선택자를 사용하여 상품 이름을 가져옵니다.
product_price = soup.select_one('CSS 선택자2').text  # CSS 선택자를 사용하여 상품 가격을 가져옵니다.

# 가져온 데이터를 출력합니다.
print('상품 이름:', product_name)
print('상품 가격:', product_price)

# 크롤링이 끝났으면 Selenium을 종료합니다.
driver.quit()