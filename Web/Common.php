<?php
function getDataFileName($basePath){
    if ($basePath == null) $basePath = "../";
    
    $path = "Data/";
    $fileName = basename($_SERVER["SCRIPT_NAME"], ".php");
    $lang = ".CH";
    $type= ".xml";
    
    return $basePath.$path.$fileName.$lang.$type;
}

function getThisPageUrl(){
  return "http://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
}
?>