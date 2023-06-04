<!DOCTYPE html>
<?php
    $con = new mysqli("db:3306", "cookUser", "1234", "XsportsShoppingMalldb") or die("MySQL 접속 실패");

    $default_zip_code = $_POST["default_zip_code"];
    $default_adress = $_POST["default_address"];
    $email = $_POST["email"];
    $gender = $_POST["gender"];
    $ID = $_POST["ID"];
    $name = $_POST["name"];
    $nickname = $_POST["nickname"];
    $password = $_POST["password"];
    $phone_number = $_POST["phone_number"];
    $resident_registration_number = $_POST["resident_registration_number"];
    $term_of_service_agreement = "agree";
    
    $sql = "INSERT INTO memberTBL (default_zip_code, default_adress, email, gender, ID, `name`, nickname, `password`, phone_number, resident_registration_number, term_of_service_agreement)";
    $sql .= " VALUES ('$default_zip_code', '$default_adress', '$email', '$gender', '$ID', '$name', '$nickname', '$password', '$phone_number', '$resident_registration_number', '$term_of_service_agreement')";
    
    $ret = mysqli_query($con , $sql);
    $con->close();
?>
<html>    
<head>
  <meta charset="UTF-8">
</head>
<header>
  <title>signup page</title>
          
  <meta http-equiv="Content-Type" content="text/html; charset = utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <link href="css/style.css" rel="stylesheet">
  <link href="css/common.css" rel="stylesheet"> 
  <link href="css/search.css" rel="stylesheet">
  <link href="css/sidebars.css" rel="stylesheet">
  <link href="css/signup.css" rel="stylesheet">  

  
</header>


<body>

  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="my page" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
    </symbol>
    <symbol id="cart" viewBox="0 0 16 16">
      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
    </symbol>
    <symbol id="favorite" viewBox="0 0 16 16">
      <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
    </symbol>
    <symbol id="order-history" viewBox="0 0 16 16">
      <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
      <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
    </symbol>
    <symbol id="log-out" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
    </symbol>
    <symbol id="check2" viewBox="0 0 16 16">
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </symbol>
    <symbol id="circle-half" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
    </symbol>
    <symbol id="moon-stars-fill" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
      <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
    </symbol>
    <symbol id="sun-fill" viewBox="0 0 16 16">
      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
    </symbol>
  </svg>

  <div class="container">
    <!--header, 1r-->
    <div class = "row">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
      </a>
      <!--logo 1c ~ 4c-->
      <ul class="col-4">
      <a href="index.html">
        <img src = "../img/Xsports.png">
      </a>
      </ul> 
      <!--searchBar 5c ~ 8c-->
      <form class="col-4" role="search">
        <input type="search" class="form-control" placeholder="제품 검색" aria-label="Search"> 
      </form>
      <!--공백 9c ~ 11c-->
      <div class="col-3"></div>
      <!--profile 12c-->
      
      </div>
    </div>


  <article class="find1"> 
    <h2>회원가입</h2> 
    <p>xsports 회원가입을 환영합니다.<br>회원으로 가입하시면 다양한 혜택과 서비스를 이용하실 수 있습니다.</p>

    <div>
      <!--디폴트 메뉴-->
    
      <input id="tab2" type="radio" name="tabs"  disabled/>
      <label for="tab2"><br>STEP 1<br>약관동의</label>

      <input id="tab3" type="radio" name="tabs" disabled/>
      <label for="tab3"><br>STEP 2<br>정보입력</label>

      <input id="tab4" type="radio" name="tabs" checked disabled/>
      <label for="tab4"><br>STEP 3<br>가입완료</label>

     


      <section id="content3"> 
        <h5>필수 입력 정보</h5>
        
        <div>
          <div>
            <p>아이디</p><br>
            <p>비밀번호</p>
            <p>비밀번호 확인</p><br>
            <p>성별</p>
            <p>이름</p>
            <p>닉네임</p>
            <p>생년월일</p>
            <p>휴대전화</p>
          </div>

        <form method="post" action="signup_result.php">
          <div>
            <input type="ID" name="ID" placeholder="아이디 입력">  
            <br>
            <button>중복확인</button><br>
            <input type="password" name="password" placeholder="영문, 숫자 조합 6~12자" required><br><br>
            <input type="password" name="confirm_password" placeholder="영문, 숫자 조합 6~12자" required onkeyup="checkPasswordMatch()"><br><br>
            <select id="gender" name="gender">
              <option value="man">남성</option>
              <option value="woman">여성</option>
            </select><br><br>
            <input type="text" name="name" placeholder="이름을 입력하세요."><br><br>
            <input type="text" name="nickname" placeholder="닉네임을 입력하세요."><br><br>
            <input type="text" name="resident_registration_number" placeholder="예) 200904"><br><br>
            <input type="tel" name="phone_number" placeholder="예) 01012341375"><br>
            <button>중복확인</button>
          </div>
        </div>
        <hr>

        <div class="join2">
          <h5>추가 입력 정보</h5>
          <div>
            <div>
              <p>주소</p><br><br><br><br><br>
              <p>이메일</p>
            </div>

            <div>
              <input type="address" name="default_zip_code" placeholder="우편번호">
              <input type="address" name="default_address" placeholder="도로명주소"><br>
              <input type="address" placeholder="상세주소"><br>
              <br>
              <input type="text" name="email" placeholder="emample@email.com">
            </div>
          </div>
        </div>

        <button type="submit">가입하기</button> 
        </form>
      </section>

      <section id="content4">
       
        <h4>회원가입이 완료되었습니다!</h4>
        <p>모든 회원가입 절차가 완료되었습니다.<br>로그인 후 다양한 혜택과 서비스를 이용하실 수 있습니다.</p>
        <button>메인으로</button>
      </section>
    </div>
  </article>

  <script>
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");

    function nextStep() {
      if (validateForm()) {
        document.getElementById("content2").style.display = "none";
        document.getElementById("content3").style.display = "block";
        document.getElementById("tab3").checked = true;
      }
    }  
  </script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>


</body>
</html>