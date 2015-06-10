<?php
/**
* HybridAuth
* http://hybridauth.sourceforge.net | http://github.com/hybridauth/hybridauth
* (c) 2009-2015, HybridAuth authors | http://hybridauth.sourceforge.net/licenses.html
*/

// ----------------------------------------------------------------------------------------
//	HybridAuth Config file: http://hybridauth.sourceforge.net/userguide/Configuration.html
// ----------------------------------------------------------------------------------------

return
	array(
		"base_url" => "http://bbug.me/works/acufene/hybridauth",

		"providers" => array (
			// openid providers
			"OpenID" => array (
				"enabled" => true
			),
			"AOL"  => array (
				"enabled" => false
			),
			"Facebook" => array (
				"enabled" => true,
				"keys"    => array ( "id" => "", "secret" => "" ),
				"trustForwarded" => false
			),

			"Twitter" => array (
				"enabled" => true,
				"keys"    => array ( "key" => "Zv2WIwErRJMZqIHMdwf7IuhrB", "secret" => "JWBcP46rWNyrg1LFgkARFlMVFJ9mNxvnr0hVEnoW0mQTIPWhBr" )
			),
		),

		// If you want to enable logging, set 'debug_mode' to true.
		// You can also set it to
		// - "error" To log only error messages. Useful in production
		// - "info" To log info and error messages (ignore debug messages)
		"debug_mode" => false,

		// Path to file writable by the web server. Required if 'debug_mode' is not false
		"debug_file" => "",
	);
