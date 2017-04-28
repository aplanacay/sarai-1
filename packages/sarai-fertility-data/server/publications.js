Meteor.publish('sarai-fertility-data', (id) => {
  return FertilityData.find({id})
})