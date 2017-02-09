FlowRouter.route("/icm-coconut-pollination", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "Pollination"})
		else goHome();
	}
})
