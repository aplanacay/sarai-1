FlowRouter.route("/icm-cacao-preparation", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "CacaoPreparation"})
		else goHome();
	}
})
