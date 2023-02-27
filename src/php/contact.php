

<?php

$name = "";
$email = "";

if (isset($_POST["name"]) && isset($_POST["email"])){
    $name = $_POST["name"];
    $email = $_POST["email"];
}

$body = array(
    members => [
        array(
            email_address => $email,
            merge_fields => array(
                FNAME => $name,
            ),
            status => "subscribed",
        ),
    ],
);

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://us11.api.mailchimp.com/3.0/lists/825c31743f",
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>json_encode($body),
    CURLOPT_HTTPHEADER => array(
        "Authorization : 2d43db49313c54b1907a590e0d5e7211-us11",
    ),
));

$response = json_decode( curl_exec($curl), $associative );

curl_close($curl);


?>