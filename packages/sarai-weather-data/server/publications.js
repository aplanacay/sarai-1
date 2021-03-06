/**********WEATHER DATA***********/
Meteor.publish('weather-data', () => {
  return WeatherData.find();
});

Meteor.publish('weather-data-30', () => {
  let oneMonthAgo = new Date()
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 31)

  return WeatherData.find({dateUTC: { $gt: oneMonthAgo}}, {sort: {dateUTC: -1}});
});

Meteor.publish('weather-data-30-by-id', (id) => {
  let oneMonthAgo = new Date()
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 31)

  return WeatherData.find({id, dateUTC: { $gt: oneMonthAgo}}, {sort: {dateUTC: -1}});
})

/**********WEATHER STATIONS***********/

//just one
Meteor.publish('weather-station', (id) => {
  return WeatherStations.find({id})
})


Meteor.publish('quick-weather-stations', () => {
  return WeatherStations.find({}, {limit: 5})
})

Meteor.publish('weather-stations', () => {
    return WeatherStations.find();
});

//Return all enabled SARAI stations
Meteor.publish('sarai-weather-stations', () => {
  return WeatherStations.find({group: 'SARAI', enabled: true})
})

Meteor.publish('dss-settings', () => {
  return DSSSettings.find();
})

