<?php get_header(); ?>
          <?php
          if ( have_posts() ) {
      
            // Load posts loop.
            while ( have_posts() ) {
	      the_post();
	      ?><h2><?php the_title(); ?></h2>
              <?php the_content();
	      echo "<br>";
 
#              get_template_part( 'template-parts/content/content' );
            }
      
            // Previous/next page navigation.
#            twentynineteen_the_posts_navigation();
      
          } else {
            echo "ERROR";
      
            // If no content, include the "No posts found" template.
#            get_template_part( 'template-parts/content/content', 'none' );
      
          }
          ?>

<?php get_footer(); ?>
