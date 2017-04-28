Template.FertilityMap.onCreated(() => {
  //By default the visible chart is the forecast chart

  Meteor.subscribe('sarai-fertility-data')
  Meteor.subscribe('weather-data-30')

  this.visibleChart = 'forecast'
  $('#forecast button').addClass('active')

  Highcharts.setOptions({
  // This is for all plots, change Date axis to local timezone
      global : {
          useUTC : false
      }
  });
})

Template.FertilityMap.onRendered(() => {
  /****MAP****/
  const northEast = L.latLng(21.924058, 115.342984);
  const southWest = L.latLng(4.566972, 128.614468);
  const bounds = L.latLngBounds(southWest, northEast);

  const weatherMap = L.map('weather-map-v2', {
      maxBounds: bounds,
      center: [14.154604, 121.247505],
      zoom: 5,
      minZoom: 1,
      zoomControl: false
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/mcarandang/cj1jd9bo2000a2speyi8o7cle/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNhcmFuZGFuZyIsImEiOiJjaWtxaHgzYTkwMDA4ZHZtM3E3aXMyYnlzIn0.x63VGx2C-BP_ttuEsn2fVg',{
    maxZoom: 20,
    id: 'mapbox://styles/mcarandang/cj1jd9bo2000a2speyi8o7cle',
    accessToken: 'pk.eyJ1IjoibWNhcmFuZGFuZyIsImEiOiJjaWtxaHgzYTkwMDA4ZHZtM3E3aXMyYnlzIn0.x63VGx2C-BP_ttuEsn2fVg'
  }).addTo(weatherMap);

  // weatherMap.zoomControl.setPosition('bottomleft');

  const showWeatherData = (stationID, label, event) => {
    Session.set('stationID', stationID)

    displayWeatherData(stationID, this.apiKey)
  }

  Meteor.subscribe('sarai-fertility-data', () => {
    Meteor.autorun(() => {
      const stations = FertilityData.find().fetch()

      for (let a = 0; a < stations.length; a++) {
        const station = stations[a]
        const x = station.coords[0]
        const y = station.coords[1]
        const label = station.district
        const stationID = station.region

        const marker = new L.marker([x, y])
        .bindPopup(`<h5>${label}</h5>`)
        .on('click', L.bind(showWeatherData, null, stationID, label))

        marker.addTo(weatherMap)
      }
    })
  })

})

Template.FertilityMap.helpers({
  /*forecastIsSelected: () => {
    if (this.visibleChart == 'forecast' ) {
      return true
    } else {
      return false
    }
  },*/

  sites: () => {
    //const fertilityTable = FertilityData.find({}, {fields: {region: 1}}).fetch()
    const fertilityTable = FertilityData.find().fetch()

    return fertilityTable
  }
})