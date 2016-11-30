<?php include "../Common.php" ?>
<!DOCTYPE html>

<html>
<head>
    <title></title>
    <meta name="Extra" content="C120.php.js" />
    <meta name="Extra" content="" />
    <meta name="BasePath" content="../" />
    <meta name="Data" content = "<?php echo getDataFileName(""); ?>"/>
	<link rel="shortcut icon" href="/Image/Icon/favicon/favicon.ico">
    <script type="text/javascript" src="../Script/jquery.js"></script>
    <script type="text/javascript" src="../Script/Loader.js"></script>
</head>
<body>
    <?php include "../Part/Head.php"; ?>
    <?php include "../Part/Cap.php"; ?>
    <div id="section" sight>
      <div id="OWD" class="Block"></div>

      <!-- 假日班(適合一般上班族) -->
      <div id="dock1" class="Block"></div>
		  <div id="curriculum1" class="ArticleBox"></div>
		  <div id="plan1" class="ArticleBox"></div>
		  <div id="tuition1" class="ArticleBox"></div>

      <!-- 平日班(適合自行排休者) -->
      <div id="dock2" class="Block"></div>
      <div id="curriculum2" class="ArticleBox"></div>
      <div id="plan2" class="ArticleBox"></div>
      <div id="tuition2" class="ArticleBox"></div>

      <!-- 平日班(適合自行排休者) -->
      <div id="dock3" class="Block"></div>
      <div id="curriculum3" class="ArticleBox"></div>
      <div id="plan3" class="ArticleBox"></div>
      <div id="tuition3" class="ArticleBox"></div>
      
		  <div id="register" class="ArticleBox"></div>
		  <div id="processing" class="ArticleBox"></div>
		  <div id="notice" class="ArticleBox"></div>
    </div>
    <?php include "../Part/Foot.php" ; ?>
</body>
</html>