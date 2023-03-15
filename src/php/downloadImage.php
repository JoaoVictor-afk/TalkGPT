
<?php

    if(isset($_POST['imageUrl'])) {

        $url = $_POST['imageUrl'];
        $img = file_get_contents($url);

        $string = str_replace("https://", "", $url);

        $imgName = explode("/", $string)[4];
        
        $imgName = explode("?", $imgName)[0];

        file_put_contents("./".$imgName, $img);

        $response = array('name' => $imgName, 'deleted' => false);
        echo json_encode($response);

    }

?>