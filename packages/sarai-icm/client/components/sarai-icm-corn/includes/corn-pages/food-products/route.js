FlowRouter.route("/icm-corn-food-products", {
	action: function() {
		if(isLoggedIn())
			BlazeLayout.render("ICMLayout", {main: "FoodProducts"})
		else goHome();
	}
})
