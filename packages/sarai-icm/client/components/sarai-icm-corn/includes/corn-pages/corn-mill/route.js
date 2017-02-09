FlowRouter.route("/icm-corn-corn-mill", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "CornMill"})
		else goHome();
	}
})
