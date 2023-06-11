<?php
// 데이터베이스 연결 설정
$host = 'db:3306';
$dbname = 'XsportsShoppingMalldb';
$username = 'root';
$password = 'example';

$mysqli = new mysqli($host, $username, $password, $dbname);

// 첫 번째 CSV 파일 경로와 테이블명
$csvFile1 = '/var/www/html/dbdata_in_csv/represent_products.csv';
$table1 = 'represent_productTBL';

// 두 번째 CSV 파일 경로와 테이블명
$csvFile2 = '/var/www/html/dbdata_in_csv/optional_products.csv';
$table2 = 'optional_productTBL';

// 첫 번째 CSV 파일을 읽어서 데이터베이스에 import
if (($handle1 = fopen($csvFile1, 'r')) !== false) {
    while (($data = fgetcsv($handle1)) !== false) {
        // 필요한 열 개수만 추출
        $rowData = array_slice($data, 0, $columnCount1);
        $values = implode("','", $rowData);
        $query = "INSERT INTO $table1 (column1, column2, column3, column4, column5, column6, column7, column8) VALUES ('$values')";
        $mysqli->query($query);
    }
    fclose($handle1);
}

// 두 번째 CSV 파일을 읽어서 데이터베이스에 import
if (($handle2 = fopen($csvFile2, 'r')) !== false) {
    while (($data = fgetcsv($handle2)) !== false) {
        // 필요한 열 개수만 추출
        $rowData = array_slice($data, 0, $columnCount2);
        $values = implode("','", $rowData);
        $query = "INSERT INTO $table2 (column1, column2, column3, column4, column5, column6, column7) VALUES ('$values')";
        $mysqli->query($query);
    }
    fclose($handle2);
}

echo 'CSV 파일 import 완료';
?>
