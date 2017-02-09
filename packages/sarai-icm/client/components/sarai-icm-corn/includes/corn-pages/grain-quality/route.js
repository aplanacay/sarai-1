FlowRouter.route("/icm-corn-grain-quality", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "GrainQuality"})
		else goHome();
	}
})
