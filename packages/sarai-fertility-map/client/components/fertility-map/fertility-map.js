Template.FertilityMap.onCreated(() => {
  //By default the visible chart is the forecast chart

  Meteor.subscribe('sarai-fertility-data')
  // Meteor.subscribe('weather-data-30')

  this.visibleChart = 'fertility'
  $('#fertility button').addClass('active')

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

  const fertilityMap = L.map('weather-map-v2', {
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
  }).addTo(fertilityMap);

  // fertilityMap.zoomControl.setPosition('bottomleft');

  const showFertilityData = (stationID, label, event) => {
    Session.set('stationID', stationID)

    displayFertilityData(stationID)
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
        .on('click', L.bind(showFertilityData, null, stationID, label))

        marker.addTo(fertilityMap)
      }
    })
  })

})

Template.FertilityMap.events({
  'click #fertility': () => {
    this.visibleChart = 'fertility'

    activateButton('fertility')
    displayFertilityData(Session.get('stationID'))
  },
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

const displayFertilityData = (stationID) => {
  console.log('Displaying fertility data from region ' + stationID)

  //Remove any existing chart
  $('div.meteogram').remove()

  //Display temporary spinner
  $('<div class="meteogram meteogram-stub"><div class="mdl-spinner mdl-js-spinner is-active"></div></div>').appendTo('#meteogram-container')

  if (this.visibleChart == 'fertility') {
    displayFertility(stationID)
  }/* else if (this.visibleChart == 'accumulated') {
    displayAccumulatedRain(stationID, apiKey)
  } else {
    displayYear(stationID)
  }*/
}

const displayFertility = (stationID) => {
  /*const dataFeatures = [ 'conditions', 'hourly10day', 'forecast10day']*/
  console.log('test')

  $.getJSON(`lib/ph-fertility.json`, (result) => {
/*
    //common data
    const tickPositions = Meteor.chartHelpers.getTickPositions(result)
    const altTickPositions = Meteor.chartHelpers.getAltTickPositions(result)

    const plotLines = Meteor.chartHelpers.getPlotLines(tickPositions)

    const tickQPFMap = Meteor.chartHelpers.getTickQPFMap(altTickPositions, dailySeries.qpf)
    const tickTempMap = Meteor.chartHelpers.getTickTempMap(altTickPositions, dailySeries.hlTemp)
*/
    const ph = Meteor.chartHelpers.getpH(result)

    const charts = [
      {
        element: '#fertility-meteogram',
        title: 'Fertility Data',
        name: 'Fertility',
        id: 'fertility',
        //data: result.pH,
        /*unit: '°C',
        tickPositions: tickPositions,
        altTickPositions: altTickPositions,
        color: '#ff8c1a',
        dateTicksEnabled: true,
        plotLines,
        altTickLabels: tickTempMap,*/
      },  
    ]

    console.log('test2')

    //remove any existing charts first
    $('div.meteogram').remove()

    //add new charts
    charts.forEach((chart, index) => {
      $('<div class="meteogram">')
        .appendTo('#meteogram-container')
        .highcharts(
          Meteor.chartHelpers.constructChart(chart))
    })
  })
}

const activateButton = (id) => {
  $(`#${id} > button`).addClass('active')

  const charts = ['fertility']

  charts.forEach((element) => {
    if (element != id) {
      $(`#${element} > button`).removeClass('active')
    }
  })
}