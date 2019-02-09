<?php include("ascii-header.txt");
if (function_exists('bloginfo')) $wp = true;
 ?>
<!DOCTYPE html>
<html <?php if ($wp) language_attributes(); ?>>
<head>
<meta charset="<?php if ($wp) bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="profile" href="https://gmpg.org/xfn/11" />

<!-- FONTS -->
<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">

<!-- JQUERY -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- SimpleBar Scroll bar -->
<link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css" />
<script src="https://unpkg.com/simplebar@latest/dist/simplebar.js"></script>

<!-- Thex.Tech -->
<script src="https://thex.tech/wp-content/themes/thex.tech/thextech.js"></script>
<link rel="stylesheet" href="https://thex.tech/wp-content/themes/thex.tech/thextech.css" />

<!-- Wordpress -->
<?php if ($wp) wp_head(); ?>

</head>

<body <?php if ($wp) body_class(); ?>>

<!-- Content Frame -->
<div id='tvbody'>
 <div id='tvframe'>
  <div id='tv'>
   <div id='tvcontent'>
    <div id='top'></div>
    <div id='realcontent'>
<?php include("ascii-content-begin.txt");?>
