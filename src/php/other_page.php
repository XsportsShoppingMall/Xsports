<?php
session_start();

// 세션 ID 받아오기
if (isset($_GET['session_id'])) {
    $sessionId = $_GET['session_id'];

    // 세션 ID 유효성 검사 및 로그인 상태 확인
    // ...

    // 예시: 세션 ID를 사용하여 로그인 상태 확인 후 처리
    if ($loggedIn) {
        echo "다른 페이지에서 로그인 상태를 유지합니다.";
    } else {
        echo "로그인 상태가 아닙니다.";
    }
} else {
    echo "세션 ID를 전달받지 못했습니다.";
}
?>
