Template.WeatherStations.onCreated(() => {
  Meteor.subscribe('sarai-weather-stations')
})

Template.WeatherStations.helpers({
  stations: () => {
    const stations = WeatherStations.find({}).fetch()

    return stations
  }
})