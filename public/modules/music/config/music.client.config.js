'use strict';

// Configuring the Articles module
angular.module('music').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Music', 'music', 'dropdown', '/music(/create)?');
		Menus.addSubMenuItem('topbar', 'music', 'List Music', 'music');
		Menus.addSubMenuItem('topbar', 'music', 'New Music', 'music/create');
	}
]);