from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import mysql.connector
from dataclasses import dataclass
import random
import datetime
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from io import BytesIO
import csv

# Selenium을 사용하여 웹 페이지를 열고 로드합니다.
driver = webdriver.Chrome('../chromedriver/chromedriver.exe')  # chromedriver 경로를 설정해주세요.
driver.get('https://redsports.co.kr/')  # 크롤링할 쇼핑몰의 URL을 입력해주세요.

#데이터를 받아올 클래스 배열 선언
class OptionalProduct:
    def __init__(self, product_no=None, index = None, stock=None, price_change=None, color=None, size=None, other_option=None):
        self.product_no = product_no
        self.index = index
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

class RepresentImage:
    

def url_to_blob(url):
    # URL에서 데이터 가져오기
    response = requests.get(url)
    data = response.content

    # 데이터를 Blob 객체로 변환
    blob = BytesIO(data)

    return blob


# 페이지 로딩을 위해 충분한 시간을 기다립니다. 필요에 따라 sleep 등의 대기 메서드를 사용할 수 있습니다.
driver.implicitly_wait(5)  # 5초간 기다립니다.

category = {}

#카테고리 선택
category1s = driver.find_elements("xpath","//*[@id=\"category\"]/div/ul/li")
for category1 in range(0,len(category1s)-1):
    driver.find_elements("xpath","//*[@id=\"category\"]/div/ul/li")[category1].click()

    #세부카테고리 선택
    category2s = driver.find_elements("xpath","//*[@id=\"contents\"]/div[1]/ul/li")
    for category2 in range(0,len(category2s)-1):
        driver.find_elements("xpath","//*[@id=\"contents\"]/div[1]/ul/li")[category2].click()
        #세부 카테고리 이름 출력
        category[int(driver.find_elements("xpath","//*[@id=\"contents\"]/div[1]/ul/li")[category2].find_element(By.TAG_NAME,"a").get_attribute("href").split('cate_no=')[1])]\
        =driver.find_elements("xpath","//*[@id=\"contents\"]/div[1]/ul/li")[category2].find_element(By.TAG_NAME,"a").text.split(' (')[0]
        #세부카테고리 {번호:이름} 딕셔너리 저장
        # html = driver.page_source
        # soup = BeautifulSoup(html, 'html.parser')
        # category[int(soup.select_one("#contents > div.xans-element-.xans-product.xans-product-menupackage > ul > li:nth-child(1) > a")['href'].split('cate_no=')[1])]\
        #     = soup.select_one("#contents > div.xans-element-.xans-product.xans-product-menupackage > ul > li:nth-child(1) > a").text.split(' (')[0]
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
            
            
            #기본가격
            product.price = soup.select_one("#span_product_price_text").text.replace(",","").replace("원","")
                    
            #대표상품 이미지, 상세정보 이미지
            product.more_information_image = url_to_blob("https://redsports.co.kr/"+soup.select_one("#prdDetail > div > p:nth-child(4) > img")['src'])
            product.represent_image = url_to_blob("https:"+soup.select_one("#contents > div.xans-element-.xans-product.xans-product-detail.d_step1 > div.detailArea > div.xans-element-.xans-product.xans-product-image.imgArea > div.keyImg > a > img")['src'])                
            #모든 옵션 번갈아가며 선택
            driver_selects = driver.find_elements("class name","ProductOption0")
            optional_product_index = 0
            optiondict = {}
            
            #옵션이 존재하면
            if len(driver_selects) >= 1:
                for option in Select(driver_selects[0]).options:
                    if option.get_attribute("value") == "*" or option.get_attribute("value") == "**":
                        continue
                    
                    #옵션 선택
                    option.click()
                    #dict key 설정
                    if driver_selects[0].get_attribute("option_title") == "색상":
                        option_key = "color"
                    elif driver_selects[0].get_attribute("option_title") == "사이즈":
                        option_key = "size"
                    else:
                        option_key = "other"
                    #dict value 설정
                    optiondict[option_key] = option.get_attribute("value")
                    #옵션이 2개 이상이면
                    if len(driver_selects) >= 2:
                        for option in Select(driver_selects[1]).options:
                            if option.get_attribute("value") == "*" or option.get_attribute("value") == "**":
                                continue
                            option.click()
                            #dict key 설정
                            if driver_selects[1].get_attribute("option_title") == "색상":
                                option_key = "color"
                            elif driver_selects[1].get_attribute("option_title") == "사이즈":
                                option_key = "size"
                            else:
                                option_key = "other"
                            #dict value 설정
                            optiondict[option_key] = option.get_attribute("value")
                            #옵션이 3개 이상이면
                            if len(driver_selects) >= 3:
                                for option in Select(driver_selects[2]).options:
                                    if option.get_attribute("value") == "*" or option.get_attribute("value") == "**":
                                        continue
                                    option.click()
                                    #dict key 설정
                                    if driver_selects[1].get_attribute("option_title") == "색상":
                                        option_key = "color"
                                    elif driver_selects[1].get_attribute("option_title") == "사이즈":
                                        option_key = "size"
                                    else:
                                        option_key = "other"
                                    #dict value 설정
                                    optiondict[option_key] = option.get_attribute("value")
                                    
                                    #옵셔널 프로덕트 생성
                                    optional_product = OptionalProduct()
                                    optional_product.index = optional_product_index
                                    optional_product_index += 1
                                    optional_product.stock = random.randint(1,20)
                                    if "color" in optiondict:
                                        optional_product.color = optiondict["color"]
                                    if "size" in optiondict:
                                        optional_product.size = optiondict["size"]
                                    if "other" in optiondict:
                                        optional_product.other_option = optiondict["other"]
                                    
                                    html = driver.page_source
                                    soup = BeautifulSoup(html, 'html.parser')
                                    
                                    #가격 변동 대기
                                    waittime = 0
                                    while int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원","")) == 0:
                                        if waittime == 100: 
                                            optional_product.stock = 0
                                            break
                                        waittime += 1
                                        time.sleep(0.01)
                                        html = driver.page_source
                                        soup = BeautifulSoup(html, 'html.parser')
                                        
                                    #가격
                                    if waittime == 100:
                                        optional_product.price_change = product.price
                                    else: optional_product.price_change = int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원",""))
                                    #옵셔널 프로덕트 대표상품 연결
                                    optional_product.product_no = product.product_no
                                    #옵셔널 프로덕트 집어넣기
                                    product.optional_products.append(optional_product)
                                    #상품 지우기
                                    driver.find_element("class name","option_box_del").click()
                                    
                            else:
                                #옵셔널 프로덕트 생성
                                optional_product = OptionalProduct()
                                optional_product.index = optional_product_index
                                optional_product_index += 1
                                optional_product.stock = random.randint(1,20)
                                if "color" in optiondict:
                                    optional_product.color = optiondict["color"]
                                if "size" in optiondict:
                                    optional_product.size = optiondict["size"]
                                if "other" in optiondict:
                                    optional_product.other_option = optiondict["other"]
                                
                                html = driver.page_source
                                soup = BeautifulSoup(html, 'html.parser')
                                
                                #가격 변동 대기
                                waittime = 0
                                while int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원","")) == 0:
                                    if waittime == 100: 
                                        optional_product.stock = 0
                                        break
                                    waittime += 1
                                    time.sleep(0.01)
                                    html = driver.page_source
                                    soup = BeautifulSoup(html, 'html.parser')
                                    
                                #가격
                                if waittime == 100:
                                    optional_product.price_change = product.price
                                else: optional_product.price_change = int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원",""))
                                #옵셔널 프로덕트 대표상품 연결
                                optional_product.product_no = product.product_no
                                #옵셔널 프로덕트 집어넣기
                                product.optional_products.append(optional_product)
                                #상품 지우기
                                driver.find_element("class name","option_box_del").click()
                                
                    else:
                        #옵셔널 프로덕트 생성
                        optional_product = OptionalProduct()
                        optional_product.index = optional_product_index
                        optional_product_index += 1
                        optional_product.stock = random.randint(1,20)
                        if "color" in optiondict:
                            optional_product.color = optiondict["color"]
                        if "size" in optiondict:
                            optional_product.size = optiondict["size"]
                        if "other" in optiondict:
                            optional_product.other_option = optiondict["other"]
                        
                        html = driver.page_source
                        soup = BeautifulSoup(html, 'html.parser')
                        
                    #가격 변동 대기
                        waittime = 0
                        while int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원","")) == 0:
                            if waittime == 100: 
                                optional_product.stock = 0
                                break
                            waittime += 1
                            time.sleep(0.01)
                            html = driver.page_source
                            soup = BeautifulSoup(html, 'html.parser')
                            
                        #가격
                        if waittime == 100:
                            optional_product.price_change = product.price
                        else: optional_product.price_change = int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원",""))
                        #옵셔널 프로덕트 대표상품 연결
                        optional_product.product_no = product.product_no
                        #옵셔널 프로덕트 집어넣기
                        product.optional_products.append(optional_product)
                        #상품 지우기
                        driver.find_element("class name","option_box_del").click()
                driver.back()        
            else:
                #옵셔널 프로덕트 생성
                optional_product = OptionalProduct()
                optional_product.index = optional_product_index
                optional_product_index += 1
                optional_product.stock = random.randint(1,20)
                if "color" in optiondict:
                    optional_product.color = optiondict["color"]
                if "size" in optiondict:
                    optional_product.size = optiondict["size"]
                if "other" in optiondict:
                    optional_product.other_option = optiondict["other"]
            
                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                
                #가격 변동 대기
                waittime = 0
                while int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원","")) == 0:
                    if waittime == 100: 
                        optional_product.stock = 0
                        break
                    waittime += 1
                    time.sleep(0.01)
                    html = driver.page_source
                    soup = BeautifulSoup(html, 'html.parser')
                    
                #가격
                if waittime == 100:
                    optional_product.price_change = product.price
                else: optional_product.price_change = int(soup.select_one(".total").findChild("em").text.replace(",","").replace("원",""))
                #옵셔널 프로덕트 대표상품 연결
                optional_product.product_no = product.product_no
                #옵셔널 프로덕트 집어넣기
                product.optional_products.append(optional_product)
                #상품 지우기
                # driver.find_element("class name","option_box_del").click()                     


            #대표상품 추가
            represent_products.append(product)

            #상품 출력
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
                        print("  Index:", optional_product.index)
                        print("  Stock:", optional_product.stock)
                        print("  Price Change:", optional_product.price_change)
                        print("  Color:", optional_product.color)
                        print("  Size:", optional_product.size)
                        print("  Other Option:", optional_product.other_option)
                        print("\n")
                print("\n\n")
                
            driver.back()
            items = driver.find_elements("xpath","//*[@class=\"item xans-record-\"]/div/a/img")

        driver.back()
    
    driver.back()

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

def write_optional_products_to_csv(represent_products, filename):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['index', 'stock', 'price_change', 'color', 'size', 'other_option']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for represent_product in represent_products:
            for product in represent_product.optional_products:
                writer.writerow({'product_no': product.product_no, 'index': product.index, 'stock': product.stock, 'price_change': product.price_change,
                                'color': product.color, 'size': product.size, 'other_option': product.other_option})

def write_represent_products_to_csv(represent_products, filename):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['product_no', 'category', 'name', 'price', 'add_date', 'views', 'more_information_image',
                      'represent_image']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for product in represent_products:
            writer.writerow({'product_no': product.product_no, 'category': product.category, 'name': product.name,
                             'price': product.price, 'add_date': product.add_date, 'views': product.views,
                             'more_information_image': product.more_information_image,
                             'represent_image': product.represent_image})
            
# CSV 파일로 저장
write_optional_products_to_csv(represent_products, 'optional_products.csv')
write_represent_products_to_csv(represent_products, 'represent_products.csv')