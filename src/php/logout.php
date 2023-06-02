<?php
session_start();

// 세션 삭제
session_unset();
session_destroy();

// 로그아웃 후 리다이렉트할 페이지 지정 (예: login.html)
$redirect_url = "../index.html";

// 로그아웃 후 리다이렉트

header("Location: " . $redirect_url);
exit();
?>