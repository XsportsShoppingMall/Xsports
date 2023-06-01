<?php 
  $con = mysqli_connect("db:3306", "cookUser", "1234", "XsportsShoppingMalldb") or die("MySQL 접속 실패");
  phpinfo();
  mysqli_close($con);
?>
