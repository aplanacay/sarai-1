FlowRouter.route("/icm-coconut-nut-processing", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "NutProcessing"})
		else goHome();
	}
})
