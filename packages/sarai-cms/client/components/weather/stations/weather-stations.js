Template.WeatherStationsCMS.onCreated(() => {
  Meteor.subscribe('sarai-weather-stations')
})

Template.WeatherStationsCMS.onRendered(() => {
  initWeatherStationDialog('cms-weather-station-dialog')
})

Template.WeatherStationsCMS.helpers({
  stations: () => {
    const stations = WeatherStations.find({}).fetch()

    return stations
  },

  stationID: () => {
    const stationID = Session.get('weather-station-id')

    return stationID
  }
})

Template.WeatherStationsCMS.events({
  'click #cms-weather-station-add': () => {

  }
})

const initWeatherStationDialog = (dialogID) => {
  const dialog = document.querySelector(`#${dialogID}`)

  dialog.querySelector('.cancel').addEventListener('click', () => {
    dialog.close()
  })

  dialog.querySelector('.save').addEventListener('click', () => {

    const label = $('#cms-ws-label-input').val()
    const lat = parseFloat($('#cms-ws-lat-input').val())
    const long = parseFloat($('#cms-ws-long-input').val())
    const stationID = Session.get('weather-station-id')

    Meteor.call('cms-weather-station-edit', stationID, label, lat, long, (error, result) => {
      let toast = 'Saved changes to weather station'
      if (error) {
        toast = 'Unable to save changes'
      }
      showToast(toast)
    })

    dialog.close()
  })
}