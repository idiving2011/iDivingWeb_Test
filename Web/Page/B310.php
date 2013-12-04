<?php include "../Common.php" ?>
<!DOCTYPE html>

<html>
<head>
    <title></title>
    <meta name="Extra" content="" />
    <meta name="BasePath" content="../" />
    <meta name="Data" content = "<?php echo getDataFileName(""); ?>"/>
    <script type="text/javascript" src="../Script/jquery.js"></script>
    <script type="text/javascript" src="../Script/Loader.js"></script>
</head>
<body>
    <?php include "../Part/Head.php"; ?>
    <?php include "../Part/Cap.php"; ?>
    <div id="section" sight>
        <div id="store" class="ArticleBox"></div>
        <div id="web" class="ArticleBox"></div>
        <div id="phone" class="ArticleBox"></div>
    </div>
    <?php include "../Part/Foot.php" ; ?>
</body>
</html>