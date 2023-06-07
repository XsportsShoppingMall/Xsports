<?php
session_start();

// 로그인 세션 체크
if (isset($_SESSION['user_id'])) {
    // 이미 로그인된 상태이므로 필요한 페이지로 리다이렉트
    echo "<script>alert('이미 로그인 된 상태입니다.');</script>";
    echo "<script>window.location.href = '../index.html';</script>";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 사용자가 로그인 폼을 제출한 경우

    // 사용자가 입력한 아이디와 비밀번호를 가져옵니다.
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 사용자마다 개별적인 데이터베이스 계정을 생성하여 접속합니다
    // $database_user = "user_" . $username; // 사용자마다 독립적인 데이터베이스 계정 생성

    // MySQL 데이터베이스 연결 설정
    $servername = "db:3306";
    $username_db = "root"; // 본인의 MySQL 관리자 계정 이름
    $password_db = "example"; // 본인의 MySQL 관리자 계정 비밀번호
    $database = 'XsportsShoppingMalldb'; // 사용자마다 독립적인 데이터베이스 계정 사용

    // MySQL 데이터베이스에 연결
    $conn = new mysqli($servername, $username_db, $password_db, $database);

    // 연결 오류 확인
    if ($conn->connect_error) {
        die("MySQL 연결 실패: " . $conn->connect_error);
    }

    // 아이디와 비밀번호를 사용하여 회원 테이블에서 해당 사용자 정보 조회
    $query = "SELECT * FROM memberTBL WHERE ID = '$username' AND password = '$password'";
    $result = $conn->query($query);

    // 검색 결과 확인
    if ($result->num_rows > 0) {
        // 로그인 성공 시 세션에 사용자 정보 저장
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['ID'];
        $_SESSION['user_authority'] = $user['authority'];
        

        // 로그인 성공 후 이동할 페이지로 리디렉션
        header("Location:../index.html");
        exit();
    } else {
        // 로그인 실패 시 에러 메시지 출력
        echo "<script>alert('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');</script>";
        echo "<script>window.location.href = '../login.html';</script>";
    }

    // MySQL 연결 종료
    $conn->close();
} else {
    // POST 방식으로 요청되지 않은 경우, 로그인 페이지로 리디렉션합니다.
    header("Location: login.html");
    exit();
}
?>
