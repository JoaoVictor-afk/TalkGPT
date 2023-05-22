<?php

$message = $_POST["message"];

$key = "";

if (isset($_POST["apikey"]) and $_POST["apikey"] != "null")
  $key = $_POST["apikey"];

$body = array(
  "prompt" => $message,
  "size" => "512x512",
);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.openai.com/v1/images/generations',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => json_encode($body),
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer '.$key,
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);

echo json_encode($response);
