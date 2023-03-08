<?php


if (isset($_POST["name"]) && isset($_POST["email"])) {
    $name = $_POST["name"];
    $email = $_POST["email"];
}
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email address '$email' is considered valid.\n";
    $email = $_POST["email"];
    echo json_encode(array('success' => true));

}
if ((string)filter_input(INPUT_POST, 'name')) {
    echo "Name '$name' is considered valid.\n";
    $name = $_POST["name"];
    echo json_encode(array('success' => true));


}

$body = array(
    "members" => [
        array(
            "email_address" => $email,
            "merge_fields" => array(
                "FNAME" => $name,
            ),
            "status" => "subscribed",
        ),
    ],
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
  CURLOPT_POSTFIELDS =>json_encode($body),
  CURLOPT_HTTPHEADER => array(
    'Authorization: auth 2d43db49313c54b1907a590e0d5e7211-us11',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
