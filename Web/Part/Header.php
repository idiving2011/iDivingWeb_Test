<?php include "../Common.php" ?>
<!DOCTYPE html>

<html>
<head>
    <title></title>
    <meta name="Extra" content="" />
    <meta name="BasePath" content="../" />
    <meta name="Data" content = "<?php echo getDataFileName(""); ?>"/>
	<link rel="shortcut icon" href="/Image/Icon/favicon/favicon.ico">
    <script type="text/javascript" src="../Script/jquery.js"></script>
    <script type="text/javascript" src="../Script/Loader.js"></script>
</head>
<body>
    <?php include "../Part/SEO.php"; ?>
    <div id="header" sight>
        <a href="../Default.php" title="回首頁">
            <img src="/Image/Logo.png" alt="iDiving" id="logo" />
        </a>
        <span id="slogan">全方位潛水中心</span>
        <div id="googleSearch">
            <input id="keyword" type="text" class="MessageHint" note="Google 自訂搜尋" />
            <button id="search" type="button" value="搜尋">搜尋</button>
        </div>
        <a id="top"/>
        <div id="menu" data="<?php echo "Data/Menu.CH.xml" ?>"></div>
    </div>
    <?php include "../Part/Cap.php"; ?>