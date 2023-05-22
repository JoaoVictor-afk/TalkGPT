<?php

$dados = $_POST["dados"];

$key = $_ENV["KEY"];

if (isset($_POST["apikey"]) and $_POST["apikey"] != "null")
  $key = $_POST["apikey"];

$body = array(
  $dados
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.openai.com/v1/completions',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $dados,
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer '.$key,
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo json_encode($response);
