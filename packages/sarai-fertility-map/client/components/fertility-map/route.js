FlowRouter.route("/fertility-map", {
  action: () => {
    BlazeLayout.render("MainLayout", {main: "FertilityMap"})
  }
})