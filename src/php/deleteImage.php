<?php

    if(isset($_POST['name'])) {

        $imgName = $_POST['name'];
        unlink("./".$imgName);
        $response = array('deleted' => true);
        echo json_encode($response);
        
    }

?>