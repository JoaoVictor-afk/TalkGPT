<?php


if (isset($_POST["name"]) && isset($_POST["email"])) {
    $name = $_POST["name"];
    $email = $_POST["email"];
}
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = $_POST["email"];
}
if ((string)filter_input(INPUT_POST, 'name')) {
    $name = $_POST["name"];
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
    CURLOPT_URL => 'https://us11.api.mailchimp.com/3.0/lists/825c31743f',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($body),
    CURLOPT_HTTPHEADER => array(
        'Authorization: auth 2d43db49313c54b1907a590e0d5e7211-us11',
        'Content-Type: application/json'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo json_encode($response);
