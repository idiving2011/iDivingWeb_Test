<?php include "Common.php" ?>
<!DOCTYPE html>

<html>
<head>
    <title>iDiving (愛潛水) 全方位潛水中心</title>
    <meta name="Extra" content="xUI.AD.less; jquery.AD.js; jquery.cycle.js; Default.php.less; Default.php.js" />
    <meta name="BasePath" content="./" />
    <meta name="Data" content = "<?php echo getDataFileName("./") ?>"/>
    <script type="text/javascript" src="Script/jquery.js"></script>
    <script type="text/javascript" src="Script/Loader.js"></script>
</head>
<body>
    <?php include "Part/Head.php"; ?>

    <div id="section" sight>
        <div id="AD" class="Block Full"></div>
        <div id="facebook" class="Block Side InfoBox"></div>
        <div id="course" class="Block Half InfoBox"></div>
        <div id="trip" class="Block Half InfoBox"></div>
        <div id="album" class="Block Main InfoBox"></div>
        <div id="coach" class="Block Main InfoBox"></div>
    </div>
    
    <?php include "Part/Foot.php" ; ?>
</body>
</html>