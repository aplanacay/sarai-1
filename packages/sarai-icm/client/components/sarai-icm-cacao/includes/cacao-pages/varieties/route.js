FlowRouter.route("/icm-cacao-varieties", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "CacaoVarieties"})
		else goHome();
	}
})
