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
  <?php include "../Part/Head.php"; ?>
  <?php include "../Part/Cap.php"; ?>
  <div id="section" sight>
    <div id="intro" class="ArticleBox"></div>
    <div id="DiveSite" class="ArticleBox"></div>

    <div id="schedule" class="ArticleBox"></div>
    <div id="ScheduleTab" class="Block"></div>
	<!-- 二天行程 -->
    <div id="schedule1" class="ArticleBox"></div>
    <div id="price1" class="ArticleBox"></div>
	<!-- 三天行程 -->
	<div id="schedule2" class="ArticleBox"></div>
    <div id="price2" class="ArticleBox"></div>

    <!-- 共用 -->
    <div id="price" class="ArticleBox"></div>
    <div id="notice" class="ArticleBox"></div>
    <div id="agency" class="ArticleBox"></div>
  </div>
  <?php include "../Part/Foot.php" ; ?>
</body>
</html>