from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import mysql.connector
from dataclasses import dataclass
import random
import datetime
from selenium.webdriver.support.select import Select

# Selenium을 사용하여 웹 페이지를 열고 로드합니다.
driver = webdriver.Chrome('../chromedriver/chromedriver.exe')  # chromedriver 경로를 설정해주세요.
driver.get('https://redsports.co.kr/')  # 크롤링할 쇼핑몰의 URL을 입력해주세요.

#데이터를 받아올 클래스 배열 선언
class OptionalProduct:
    def __init__(self, stock=None, price_change=None, color=None, size=None, other_option=None):
        self.stock = stock
        self.price_change = price_change
        self.color = color
        self.size = size
        self.other_option = other_option

class RepresentProduct:
    def __init__(self, product_no=None, category=None, name=None, price=None, add_date=None, views=None,
                 more_information_image=None, represent_image=None, optional_products=None):
        self.product_no = product_no
        self.category = category
        self.name = name
        self.price = price
        self.add_date = add_date
        self.views = views
        self.more_information_image = more_information_image
        self.represent_image = represent_image
        self.optional_products = optional_products if optional_products is not None else []

represent_products = []




# 페이지 로딩을 위해 충분한 시간을 기다립니다. 필요에 따라 sleep 등의 대기 메서드를 사용할 수 있습니다.
driver.implicitly_wait(5)  # 2초간 기다립니다.

category = {}

#카테고리 선택
button = driver.find_element("xpath","//*[@id=\"category\"]/div/ul/li[1]/a")
button.click()

#세부카테고리 선택
button = driver.find_element("xpath","//*[@id=\"contents\"]/div[1]/ul/li[7]/a")
button.click()

#세부카테고리 {번호:이름} 딕셔너리 저장
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
category[int(soup.select_one("#contents > div.xans-element-.xans-product.xans-product-menupackage > ul > li:nth-child(1) > a")['href'].split('cate_no=')[1])]\
     = soup.select_one("#contents > div.xans-element-.xans-product.xans-product-menupackage > ul > li:nth-child(1) > a").text.split(' (')[0]
print(category)

#대표상품 한개씩 들어가기
items = driver.find_elements("xpath","//*[@class=\"item xans-record-\"]/div/a/img")
for i in range(0,len(items)-1):
    button = items[i]
    button.click()
    
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')


    product = RepresentProduct()
    product.product_no = soup.select_one("#contents > div.xans-element-.xans-product.xans-product-detail.d_step1 > div.detailArea > div.xans-element-.xans-product.xans-product-image.imgArea > div.keyImg > a")['href'].split('product_no=')[1].split('&cate_no')[0]
    product.category = soup.select_one("#contents > div.xans-element-.xans-product.xans-product-detail.d_step1 > div.detailArea > div.xans-element-.xans-product.xans-product-image.imgArea > div.keyImg > a")['href'].split('cate_no=')[1].split('&display_group')[0]
    product.name = soup.select_one("#contents > div.xans-element-.xans-product.xans-product-detail.d_step1 > div.detailArea > div.infoArea > h3 > font").text
    product.price = int(soup.select_one("#span_product_price_text").text.replace(",","").replace("원",""))
    # 랜덤한 날짜 생성
    start_date = datetime.date(2021, 1, 1)
    end_date = datetime.date(2023, 6, 4)
    product.add_date = start_date + datetime.timedelta(days=random.randint(0, (end_date - start_date).days))
    # 랜덤한 조회수
    product.views = random.randint(1, 1000)
    product.more_information_image = "https://redsports.co.kr/"+soup.select_one("#prdDetail > div > p:nth-child(4) > img")['src']
    product.represent_image = "https:"+soup.select_one("#contents > div.xans-element-.xans-product.xans-product-detail.d_step1 > div.detailArea > div.xans-element-.xans-product.xans-product-image.imgArea > div.keyImg > a > img")['src']
    
    #모든 옵션 번갈아가며 선택


    optionsForSelect = driver.find_elements("class name","ProductOption0")
    optional_procuct_index = 0
    optionindices = [None,None,None]
    # print(optionindices)
    if len(optionsForSelect) >= 1:
        
        optionindices[0] = 0
        for option in Select(options[0]).options:
            optionindices[0] += 1
            if option.get_attribute("value") == "*" or option.get_attribute("value") == "**":
                continue
            option.click()
            if len(optionsForSelect) >= 2:
                optionindices[1] = 0
                for option in Select(options[1]).options:
                    optionindices[1] += 1
                    if option.get_attribute("value") == "*" or option.get_attribute("value") == "**":
                        continue
                    option.click()
                    if len(optionsForSelect) >= 3:
                        optionindices[2] = 0
                        for option in Select(options[2]).options:
                            if option.get_attribute("value") == "*" or option.get_attribute("value") == "**":
                                continue
                            option.click()
                            #옵션 선택 후 html 다시 불러오기
                            html = driver.page_source
                            soup = BeautifulSoup(html, 'html.parser')
                            #옵션 딕셔너리 생성
                            soup.select_one("id","")
                            #옵셔널 프로덕트 저장
                            optionalProduct = OptionalProduct()
                            optionalProduct.index = optional_procuct_index
                            optional_procuct_index += 1
                            
                            optionalProduct.color
    # options = soup.select(".ProductOption0")
    # if options[0]['option_title'] == '색상':
    #     Select(driver.find_element("id","product_option_id1")).select_by_index(2)
        
    # #옵션 선택 후 html 다시 받아오기
    # html = driver.page_source
    # soup = BeautifulSoup(html, 'html.parser')

    # options = soup.select(".ProductOption0")
    # for option in options:
    #     if option['option_title'] == '색상':
            


    represent_products.append(product)




    for product in represent_products:
        print("Product No:", product.product_no)
        print("Category:", product.category)
        print("Name:", product.name)
        print("Price:", product.price)
        print("Add Date:", product.add_date)
        print("Views:", product.views)
        print("More Information Image:", product.more_information_image)
        print("Represent Image:", product.represent_image)

        if product.optional_products:
            print("Optional Products:")
            for optional_product in product.optional_products:
                print("  Stock:", optional_product.stock)
                print("  Price Change:", optional_product.price_change)
                print("  Color:", optional_product.color)
                print("  Size:", optional_product.size)
                print("  Other Option:", optional_product.other_option)

        print("\n")
    driver.back()
    items = driver.find_elements("xpath","//*[@class=\"item xans-record-\"]/div/a/img")


# connection = mysql.connector.connect(
#     host="localhost",
#     port="3306",
#     user="root",
#     password="example",
#     database="XsportsShoppingMalldb"
# )
# cursor = connection.cursor()



# 이미지 데이터를 INSERT 쿼리로 저장합니다.
# sql = "INSERT INTO table_name (image_blob) VALUES (%s)"
# cursor.execute(sql, (blob_data,))


# 변경사항을 커밋합니다.
# connection.commit()


# # 연결을 닫습니다.
# cursor.close()
# connection.close()
# text = soup.__str__()
# with open("py_venv_data_crawling/soup.txt", "w", encoding='utf-8') as file:
#     file.write(text)

# 필요한 데이터를 크롤링합니다. 예시로 상품 이름과 가격을 가져오겠습니다.
# product_name = soup.select_one('CSS 선택자1').text  # CSS 선택자를 사용하여 상품 이름을 가져옵니다.
# product_price = soup.select_one('CSS 선택자2').text  # CSS 선택자를 사용하여 상품 가격을 가져옵니다.


# 가져온 데이터를 출력합니다.
# print('상품 이름:', product_name)
# print('상품 가격:', product_price)

# 크롤링이 끝났으면 Selenium을 종료합니다.
driver.quit()