<?php

if (!defined('ABSPATH')) {
	exit;
}

require_once 'tmy-plug.php';

add_action('wp_enqueue_scripts', 'menu_scripts');
function menu_scripts()
{
	wp_enqueue_script('videojs', get_stylesheet_directory_uri() .  '/js/dist/frontend_script.bundle.js', array('jquery'), '1.0.0', true);
	$parent_style = 'parent-style';
	wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array($parent_style), wp_get_theme()->get('Version'));
}

add_filter('user_has_cap', 'wpse_67225_unfiltered_upload');
function wpse_67225_unfiltered_upload($caps)
{
	$caps['unfiltered_upload'] = 1;
	return $caps;
}

add_filter('upload_mimes', 'my_myme_types', 1, 1);
function my_myme_types($mime_types)
{
	$mime_types['gltf'] = 'model/gltf+json';
	$mime_types['glb'] = 'model/gltf-binary';
	return $mime_types;
}

add_action('enqueue_block_editor_assets', 'extend_block_example_enqueue_block_editor_assets');

function extend_block_example_enqueue_block_editor_assets()
{
	// Enqueue our script
	wp_enqueue_script(
		'blockextention.bundle.js',
		esc_url(get_stylesheet_directory_uri() . '/js/dist/blockextention.bundle.js'),
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
		'1.0.0',
		true // Enqueue the script in the footer.
	);
}

// /*
//  * Whitelist specific Gutenberg blocks (paragraph, heading, image and lists)
//  *
//  * @author Misha Rudrastyh
//  * @link https://rudrastyh.com/gutenberg/remove-default-blocks.html#allowed_block_types_all
//  */
// add_filter('allowed_block_types_all', 'misha_allowed_block_types', 25, 2);

// function misha_allowed_block_types($allowed_blocks, $editor_context)
// {
// 	echo '<pre>$allowed_blocks,';
// 	var_dump($allowed_blocks);
// 	echo '</pre>';
// 	return array(
// 		'core/image',
// 		'core/video',
// 		'core/paragraph',
// 		'core/heading',
// 		'core/list',
// 		'core/list-item'
// 	);
// }


/**********************
 *
 * Add parameters to Vimeo videos in Lightbox
 * @param string   $param Default '?autoplay=0'
 * @return string
 *
 **********************/
// add_filter('uncode_vimeo_params', 'uncode_child_vimeo_params');
// function uncode_child_vimeo_params($param)
// {
// 	$param = '?muted=0';
// 	return $param;
// }

// function ree_youtube_player($block_content, $block)
// {
// 	if ("core-embed/vimeo" === $block['blockName']) {
// 		echo '<pre>$block_content';
// 		var_dump($block_content);
// 		echo '</pre>';
// 		$block_content = str_replace('?feature=oembed', '?feature=oembed&rel=0', $block_content);
// 	}
// 	return $block_content;
// }
// add_filter('render_block', 'ree_youtube_player', 10, 3);

add_filter('body_class', 'my_body_classes');
function my_body_classes($classes)
{
	$post = get_post();
	if (has_block('create-block/tmy-sequence', $post->ID)) {
		$classes[] = 'loading';
	}
	return $classes;
}

// add categories for attachments
function add_categories_for_attachments() {
    register_taxonomy_for_object_type( 'category', 'attachment' );
}
add_action( 'init' , 'add_categories_for_attachments' );

// add tags for attachments
function add_tags_for_attachments() {
    register_taxonomy_for_object_type( 'post_tag', 'attachment' );
}
add_action( 'init' , 'add_tags_for_attachments' );

