Template.RainfallDistribution.onCreated(() => {
  Meteor.subscribe('dss-settings2')
  Meteor.subscribe('percent-mean-data')
  Meteor.subscribe('historical-daily-rain-data')

  Highcharts.setOptions({
  // This is for all plots, change Date axis to local timezone
      global : {
          useUTC : false
      }
  });
})


Template.RainfallDistribution.helpers({
  
  weatherStations2: () => {
    const stations = WeatherStations2.find({}).fetch()

    stations.sort((a, b) => {
      return a.label.charCodeAt(0) - b.label.charCodeAt(0)
    })

    return stations
  },

  currentlySelected: (curr) => {
    const label = Session.get('label')
    $('#preview-select-location').val(label)
  },

  currentlocation: () => {
    const stationID = FlowRouter.getParam('stationID')
    const label = Session.get('label')
    const current_location = WeatherStations2.findOne({id: stationID, label: label})
    return current_location
  },

  isRice: () => {
    if (Session.get('selected_crop') == "Rice"){
      return true
    } else {
      return false
    }
  }

});

Template.RainfallDistribution.events({
  'click #preview-select-crop': function(){
    const selected_crop = $('#preview-select-crop').val()

    Session.set('selected_crop', selected_crop)
  },
   'click #submit-date': function(){
    const label = $('#preview-select-location').val()
    const stationID = Session.get('PGStationID')
    Session.set('PGStationID', stationID)

    $('#rainfall-distribution-dialog-title').html(`
      <p style="font-size:20px;">GUIDE TO PLANTING DATES</p>
      Rainfall Distribution for `+label+` <span style="font-size:23px">based on historical weather data</span>`)
    $('#rainfall-distribution-dialog-desc').html(`
      <p style="padding-left: 0.7cm; padding-top:0.3cm; font-size:17px;">Planting dates are guided by rainfall distribution. Please select crop, variety, location, and date below then click view for the cumulative rainfall and expected yield based on the chosen crop, variety, location, and date.</br></br>
      <strong>NOTE:</strong> <span style="font-size:15px;">Before clicking "view", make sure that the rainfall distribution graph is <span style="color:red">completely displayed</span>. If not, please <span style="color:red">close</span> the dialog then <span style="color:red">reload</span> and <span style="color:red">try again</span>. After reloading, <span style="color:red">please wait</span> <br/>until the chart has been loaded fully.</span>
      </p>
    `)
    $('#cumulative-rainfall-dialog-title').html(`
      <p style="font-size:20px;">GUIDE TO PLANTING DATES</p>
      Cumulative Rainfall for `+label+` <span style="font-size:23px">based on historical weather data</span>`)
  },
  


});

Template.RainfallDistribution.onRendered(() => {

  /******DIALOG*******/

  const dialog_rainfall_distribution = document.querySelector('#rainfall-distribution-dialog')
  const dialog_cumulative_rainfall = document.querySelector('#cumulative-rainfall-dialog')
  const dialog_introduction = document.querySelector('#introduction-dialog')

  dialog_introduction.showModal()

  dialog_rainfall_distribution.querySelector('#enter-date').value = moment().format('DD MMMM, YYYY');
  const picker = $('#enter-date').pickadate({
    min: new Date(2015,12,01),
    max: new Date(2017,4,31)
  })

  dialog_cumulative_rainfall.querySelector('.cancel').addEventListener('click', () => {
    dialog_cumulative_rainfall.close();
    // reset stationID
    FlowRouter.go(`/rainfall-distribution/`)
  });

  dialog_rainfall_distribution.querySelector('.cancel').addEventListener('click', () => {
    // reset stationID
    FlowRouter.go(`/rainfall-distribution/`)
    dialog_rainfall_distribution.close();
    dialog_introduction.close();
  });

  dialog_introduction.querySelector('.cancel').addEventListener('click', () => {
    dialog_introduction.close();
    // reset stationID
    FlowRouter.go(`/rainfall-distribution/`)
  });
  dialog_introduction.querySelector('#proceed').addEventListener('click', () => {
    dialog_introduction.close();
    Session.set('label', 'Los Baños, Laguna')
    // reset stationID
    FlowRouter.go(`/rainfall-distribution/ICALABAR18`)
  });

  

  Tracker.autorun(() => {
    const stationID = FlowRouter.getParam('stationID')
    let label = Session.get('label')

    // defaults
    Session.set('selected_crop', 'Rice')
    Session.set('PGStationID', 'ICALABAR18')
    if(label == null){
      Session.set('label', 'Los Baños, Laguna')
    }

    //remove any existing chart first
    $('div.rainfall-chart').remove()

    //Add (temporary) spinner
    $('<div class="rainfall-chart rainfall-chart-stub"><div class="mdl-spinner mdl-js-spinner is-active"></div></div>').appendTo('#rainfall-distribution-chart-container')

    $('#introduction-dialog-title').html(`GUIDE TO PLANTING DATES`)
    $('#introduction-dialog-desc').html(`
      <p style="padding-left: 0.7cm; padding-top:0.3cm; font-size:17px;">SARAI Planting Guide for rainfed rice and corn uses a combination of real-time weather data and expected yields to determine when is the optimal time to plant. This tool does not consider extreme events like pest infestation and typhoon occurrence.</p>
      <p style="padding-left: 0.7cm; padding-top:0.3cm; font-size:17px;">Ang SARAI Planting Guide para sa sahod-ulan na palay at mais ay pinagsasama ang kasalukuyang lagay ng panahon at ang inaasahang ani upang malaman kung kailan maipapayong magtanim. Hindi nito isinasaalang-alang ang mga matitinding kalagayan tulad ng bagyo at pananalasa ng mga peste.</p>
    `)

    if (stationID) {
      Meteor.subscribe('weather-stations2', () => {
        const station = WeatherStations2.findOne({id: stationID, label: label})
        $('#preview-select-location').val(label)

        $('#rainfall-distribution-dialog-title').html(`
          <p style="font-size:20px;">GUIDE TO PLANTING DATES</p>
          Rainfall Distribution for ${Meteor.RainfallDistribution.stripTitle(station.label)} <span style="font-size:23px">based on historical weather data</span>`)
        $('#rainfall-distribution-dialog-desc').html(`
          <p style="padding-left: 0.7cm; padding-top:0.3cm; font-size:17px;">Planting dates are guided by rainfall distribution. Please select crop, variety, location, and date below then click view for the cumulative rainfall and expected yield based on the chosen crop, variety, location, and date.</br></br>
          <strong>NOTE:</strong> <span style="font-size:15px;">Before clicking "view", make sure that the rainfall distribution graph is <span style="color:red">completely displayed</span>. If not, please <span style="color:red">close</span> the dialog then <span style="color:red">reload</span> and <span style="color:red">try again</span>. After reloading, <span style="color:red">please wait</span> <br/>until the chart has been loaded fully.</span>
          </p>
        `)

        $('#cumulative-rainfall-dialog-title').html(`
          <p style="font-size:20px;">GUIDE TO PLANTING DATES</p>
          Cumulative Rainfall for ${Meteor.RainfallDistribution.stripTitle2(station.label)} <span style="font-size:23px">based on historical weather data</span>`)
        $('#cumulative-rainfall-dialog-desc').html(`
          <p style="padding-left: 0.7cm; padding-top:0.3cm; font-size:15px;"><strong>NOTE: </strong>If there is <span style="color:red">no data</span> appearing for the 30-day or 20-day rainfall in the chart after it has been <span style="color:red">loaded</span> below, please <span style="color:red">close</span> the dialog then <span style="color:red">reload</span> and <span style="color:red">try again</span>. After reloading, <span style="color:red">please wait</span> until the chart has been loaded
          fully.</span>
          </p>
        `)
      })

      Meteor.subscribe('rainfall-distribution-data', () => {
        displayRainfallDistributionData(stationID, label)
      })

      if (!$('#rainfall-distribution-dialog').is(':visible')) {
        dialog_rainfall_distribution.showModal()
      }

      // *************
      dialog_cumulative_rainfall.querySelector('.back').addEventListener('click', () => {
        dialog_cumulative_rainfall.close();

        const label = $('#preview-select-location').val()
        const stationID = WeatherStations2.findOne({label: label}).id

        Session.set('label', label)
        Session.set('PGStationID', stationID)

        FlowRouter.go(`/rainfall-distribution/${stationID}`)

        Meteor.subscribe('weather-stations2', () => {
          const station = WeatherStations2.findOne({id: stationID, label: label})
        })
        
        Meteor.subscribe('rainfall-distribution-data', () => {
          Meteor.subscribe('cumulative-data', () => {
            displayRainfallDistributionData(stationID, label)
          })
        })
        dialog_rainfall_distribution.showModal();
      });
      // *************
      dialog_rainfall_distribution.querySelector('#submit-date').addEventListener('click', () => {
        let date = new Date(moment($('#enter-date').val(), "DD MMMM, YYYY"))
        let raw_date = new Date(date)
        let digit_selected_date = raw_date.getDate()
        date.setDate(date.getDate() + 1)              // add 1 for toISOString()
        date=date.toISOString().slice(0,10).replace(/-/g,"")

        dialog_rainfall_distribution.close();
        let stationID = FlowRouter.getParam('stationID')
        let label = Session.get('label')
        if(label != $('#preview-select-location').val()){
          label = $('#preview-select-location').val()
          stationID = WeatherStations2.findOne({label: label}).id
        }
        const crop = $('#preview-select-crop').val()
        const variety = $('#preview-select-variety').val()
        let date_today = new Date().setHours(0,0,0,0)
        let date_subscribe
        if (stationID) {
          // console.log('RAW DATE: '+raw_date)
          // console.log('DATE TODAY: '+date_today)
          // if (raw_date < date_today){
            date_subscribe = new Date(raw_date)
          // }else{
          //   date_subscribe = new Date()
          // }
          // console.log('DATE SUBSCRIBE: '+date_subscribe)
          // subscribe to last 30 days of data
          Meteor.subscribe('cumulative-data-30', date_subscribe, () => {
            displayRainData(stationID, label, crop, variety, raw_date, digit_selected_date, date, date_subscribe)
          })
        }
        dialog_cumulative_rainfall.showModal()
        dialog_introduction.close()
        dialog_rainfall_distribution.querySelector('#enter-date').value = moment().format('DD MMMM, YYYY');   // reset date to current date
      });
      // *************
    }
  })


  /****MAP****/
  const northEast = L.latLng(21.924058, 115.342984);
  const southWest = L.latLng(4.566972, 128.614468);
  const bounds = L.latLngBounds(southWest, northEast);

  const rainfallMap = L.map('rainfall-distribution-map', {
      maxBounds: bounds,
      center: [14.154604, 121.247505],
      zoom: 8,
      minZoom: 7
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNhcmFuZGFuZyIsImEiOiJjaWtxaHgzYTkwMDA4ZHZtM3E3aXMyYnlzIn0.x63VGx2C-BP_ttuEsn2fVg',{
        maxZoom: 20
    }).addTo(rainfallMap);

  rainfallMap.zoomControl.setPosition('bottomleft');

  const showRainfallDistribution = (stationID, label, event) => {

    Session.set('PGStationID', stationID)
    Session.set('label', label)
    
    Meteor.subscribe('weather-stations2', () => {
      const station = WeatherStations2.findOne({id: stationID, label: label})
      $('#rainfall-distribution-dialog-title').html(`Rainfall Distribution for ${Meteor.RainfallDistribution.stripTitle(station.label)} <span style="font-size:23px">based on historical weather data</span>`)
      $('#cumulative-rainfall-dialog-title').html(`Cumulative Rainfall for ${Meteor.RainfallDistribution.stripTitle2(station.label)} <span style="font-size:23px">based on historical weather data</span>`)

    })

    // reset stationID
    FlowRouter.go(`/rainfall-distribution/`)
    FlowRouter.go(`/rainfall-distribution/${stationID}`)
  }

  Meteor.subscribe('weather-stations2', () => {
    Meteor.autorun(() => {
      const stations = WeatherStations2.find().fetch()

      for (let a = 0; a < stations.length; a++) {
        const station = stations[a]
        const x = station.coords[0]
        const y = station.coords[1]
        const label = station.label
        const stationID = station.id

        const marker = new L.marker([x, y], {title:label})
        .bindPopup(`<h6>${label}</h6>`)
        .on('click', L.bind(showRainfallDistribution, null, stationID, label))

        marker.addTo(rainfallMap)
      }
    })
  })
})

const displayRainfallDistributionData = (stationID, label) => {
  //remove any existing chart first
  $('div.rainfall-chart').remove()

  //Add (temporary) spinner
  $('<div class="rainfall-chart rainfall-chart-stub"><div class="mdl-spinner mdl-js-spinner is-active"></div></div>').appendTo('#rainfall-distribution-chart-container')

  const rainfallDistributionData = RainfallDistributionData.find({id: stationID}).fetch()

  const cumulativeData = WeatherData.find({id: stationID}).fetch()

  //have to reconcile missing entries
  if (rainfallDistributionData) {
    const weekly_rainfall = RainfallDistributionData.find({id: stationID},{fields:{'weekly_rainfall':1}}).fetch()
    const weekly_maxtemp = RainfallDistributionData.find({id: stationID},{fields:{'weekly_maxtemp':1}}).fetch()
    const weekly_mintemp = RainfallDistributionData.find({id: stationID},{fields:{'weekly_mintemp':1}}).fetch()

    if (cumulativeData) {
      const weekly_rainfall_16 = Meteor.RainfallDistribution.getWeeklyRainfall(cumulativeData)

    $('div.rainfall-chart').remove()
    $('<div class="rainfall-chart">').appendTo('#rainfall-distribution-chart-container').highcharts(Meteor.RainfallDistribution.constructChartOfRainfallDistribution(weekly_rainfall,weekly_maxtemp,weekly_mintemp, weekly_rainfall_16.pastWeeklyRainfall))
    }
  }
}

const displayRainData = (stationID, label, crop, variety, raw_date, digit_selected_date, date, date_subscribe) => {
  //remove any existing chart first
  $('div.rainfall-chart').remove()

  //Add (temporary) spinner
  $('<div class="rainfall-chart rainfall-chart-stub"><div class="mdl-spinner mdl-js-spinner is-active"></div></div>').appendTo('#rainfall-chart-container')

  const cumulativeData = WeatherData.find({id: stationID}).fetch()
  let date_today = new Date().setHours(0,0,0,0)

  let digit_last_forecast = new Date()
  // digit_last_forecast.setDate(digit_last_forecast.getDate() + 9)     // full date
  digit_last_forecast = digit_last_forecast.getDate() + 9               // digit only

  let date_last_forecast = new Date()
  date_last_forecast.setDate(date_last_forecast.getDate() + 9)          // full date

  let digit_current_date = new Date()
  digit_current_date = digit_current_date.getDate()

  // if (raw_date < date_today){
  //   console.log('PAST')
  // }else if (raw_date > date_today){
  //   console.log('FUTURE')
  // }else{
  //   console.log('PRESENT')
  // }

  let forecastDates = []
  let forecastIndex
  for(i=0; i<10; i++){
    forecastDates.push({ x: i, y: digit_current_date})
    digit_current_date += 1
    if (forecastDates[i].y == digit_selected_date){
      forecastIndex = forecastDates[i].x
    }
  }

  digit_current_date = new Date()
  digit_current_date = digit_current_date.getDate()

  let date_first_historical = new Date()
  date_first_historical.setDate(date_first_historical.getDate() + 9)     // full date
  
  let date_last_historical = new Date()
  date_last_historical.setDate(raw_date.getDate())                       // full date
  

  let date_for_query
  date_for_query = new Date(raw_date)
  

  let date_for_graph = new Date(raw_date)
  
  // date_for_graph.setDate(raw_date.getDate())
  date_for_graph = date_for_graph.toString().slice(4,15)
  
  // for twenty days
  let twentyDaysAgo = new Date(date_subscribe)
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 21)
  twentyDaysAgo = twentyDaysAgo.toISOString()

  const cumulativeDataForTwenty = WeatherData.find({id:stationID, dateUTC: { $gt: new Date(twentyDaysAgo)}}).fetch()

  // Get the dates already part of 10-day forecast or historical rainfall to avoid overlapping of dates
  let diffDays
  if(new Date() < raw_date){
    diffDays = raw_date.getDate() - new Date().getDate()
  }else{
    diffDays = 0
  }

  //have to reconcile missing entries
  if (cumulativeData) {
    // console.log('date_for_query: '+date_for_query)
    // console.log('raw_date: '+raw_date)

    const fixedData = Meteor.RainfallDistribution.fillMissingEntries(cumulativeData.reverse(), date_for_query)  // creation of array of dates with rainfall
    const fixedDataForTwenty = Meteor.RainfallDistribution.fillMissingEntriesForTwenty(cumulativeDataForTwenty.reverse(), date_for_query)  // creation of array of dates with rainfall

    const pastRainfall = Meteor.RainfallDistribution.getPastRainfall(fixedData)   // past rainfall and past accumulated rainfall
    const pastRainfallForTwenty = Meteor.RainfallDistribution.getPastRainfall(fixedDataForTwenty)   // past rainfall and past accumulated rainfall

    const apiKey = DSSSettings2.findOne({name: 'wunderground-api-key'})

    // ************* IF PREVIOUS DATE THAN CURRENT DATE ************* //
    if (raw_date < date_today){
      //remove any existing chart first
      $('div.rainfall-chart').remove()
      const runningTotal = pastRainfall.pastAccRainfall[29].y     // 30-day rainfall
 
      $('<div class="rainfall-chart">').appendTo('#rainfall-chart-container').highcharts(Meteor.RainfallDistribution.constructChartPast(pastRainfall.pastRainfall, pastRainfall.pastAccRainfall, pastRainfallForTwenty.pastAccRainfall))

      const percentMeanData = PercentMeanData.find({id: stationID, crop: crop, variety: variety}).fetch()
      let expected, percent_english, percent_filipino, sentence_english, sentence_filipino
      for (let entry of percentMeanData){
        if(eval('entry.percentMean._'+date) != null){
          expected = eval('entry.percentMean._'+date)
          if(expected < 0){
            expected = expected * (-1)
            percent_english = 'lower'
            percent_filipino = 'mababa'
          }else{
            percent_english = 'higher'
            percent_filipino = 'mataas'
          }
        }
      }

      if(crop=="Rice"){
        crop="rainfed rice"
      }else if(crop=="Corn"){
        crop="corn"
      }
      sentence_english = 'If you plant <span style="color:blue">'+crop+' ('+variety+')</span> on '+date_for_graph+', expected yield may be <span style="color:red">'+expected+'% '+percent_english+'</span> than the average*.'
      sentence_filipino = 'Kung magtatanim sa '+date_for_graph+', ang inaasahang ani ay maaaring <span style="color:red">'+expected+' porsyento mas '+percent_filipino+'</span> kaysa pangkaraniwan*.'

      $('#rainfall-chart-text-container').html(`
      <br/><p style="font-size:17px">${sentence_english}</p>
      <p style="font-size:17px">${sentence_filipino}</p>
      <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
      `)
    }
    // ************* IF FUTURE DATE OUTSIDE 10-DAY FORECAST ************* //
    else if (date_last_forecast < raw_date){
      const historicalDailyRainData = HistoricalDailyRainData.find({id: stationID}).fetch()
    if (apiKey) {
      $.getJSON(`http:\/\/api.wunderground.com/api/${apiKey.value}/forecast10day/q/pws:${stationID}.json`, (result) => {

        //remove any existing chart first
        $('div.rainfall-chart').remove()

        const runningTotal = pastRainfall.pastAccRainfall[29-diffDays].y     // 30-day rainfall
        const runningTotalForTwenty = pastRainfallForTwenty.pastAccRainfall[19-diffDays].y     // 20-day rainfall

        const forecast = Meteor.RainfallDistribution.getForecast(result, runningTotal, runningTotalForTwenty)  // rainfall forecast and total rainfall forecast, plotBandStart and plotBandEnd

        const runningForecastTotal = forecast.forecastAccumulated[9].y     // 30-day rainfall from last day of forecast
        const runningForecastTotalWithTwenty = forecast.forecastAccumulatedWithTwenty[9].y     // 20-day rainfall from last day of forecast

        // console.log('date_first_historical: '+date_first_historical)
        // console.log('date_last_historical: '+date_last_historical)
        const historical = Meteor.RainfallDistribution.getHistoricalRainfall(date_first_historical, date_last_historical, historicalDailyRainData, runningForecastTotal, runningForecastTotalWithTwenty)
        const completeData = Meteor.RainfallDistribution.assembleHistoricalRainfallData(pastRainfall.pastRainfall, pastRainfall.pastAccRainfall, pastRainfallForTwenty.pastAccRainfall, forecast.forecastRainfall, forecast.forecastAccumulated, forecast.forecastAccumulatedWithTwenty, historical.pastHistoricalRain, historical.pastHistoricalAccRain, historical.pastHistoricalAccRainWithTwenty)   // completeRainfall and completeAccumulatedRainfall
        // console.log('historical.plot_first_historical: '+historical.plot_first_historical+' historical.plot_last_historical: '+historical.plot_last_historical)
        $('<div class="rainfall-chart">').appendTo('#rainfall-chart-container').highcharts(Meteor.RainfallDistribution.constructHistoricalChart(completeData.completeRainfall, completeData.completeAccumulatedRainfall, completeData.completeAccumulatedRainfallWithTwenty, forecast.plotBandStart, forecast.plotBandEnd, historical.plot_first_historical, historical.plot_last_historical))

        const percentMeanData = PercentMeanData.find({id: stationID, crop: crop, variety: variety}).fetch()
        let expected, percent_english, percent_filipino, sentence_english, sentence_filipino, transition_word_english, transition_word_filipino, raw_expected, sufficiency, sentence_corn_english, sentence_corn_filipino, threshold, total_historical, sentence_corn, is_irrigation_english, is_irrigation_tagalog
        for (let entry of percentMeanData){
          if(eval('entry.percentMean._'+date) != null){
            expected = eval('entry.percentMean._'+date)
            if(expected < 0){
              expected = expected * (-1)
              percent_english = 'lower'
              percent_filipino = 'mababa'
            }else{
              percent_english = 'higher'
              percent_filipino = 'mataas'
            }
            raw_expected = eval('entry.percentMean._'+date)
          }

          if(crop=="Rice"){
            crop="rainfed rice"
            sentence_corn_english = ""
            sentence_corn_filipino = ""
            sentence_corn = "."
            threshold = 200
            num_days = '30'
            total_historical = historical.finalPastHistoricalAccRain
          }else if(crop=="Corn"){
            crop="corn"
            sentence_corn_english = "Where <span style='color:blue'>irrigation</span> is possible, planting corn is <span style='color:blue'>still advisable</span> because harvesting will come during dry months and price is favorable.</br>"
            sentence_corn_filipino = "Kung may <span style='color:blue'>patubig, maaari pa ring magtanim ng mais</span> dahil ang pag-aani ay papatak sa tuyong panahon at ang presyo ng mais ay maganda.</br>"
            sentence_corn = " for rainfed or upland environment <br/> BUT may be recommended for low-lying regions with irrigation."
            threshold = 100
            num_days = '20'
            total_historical = historical.finalPastHistoricalAccRainWithTwenty
          }
        }

        if(total_historical < threshold){
          if(raw_expected > 0){
            transition_word_english = 'However, if'
            transition_word_filipino = 'Ngunit, kung'
            is_irrigation_english = ' if irrigation/water could be provided'
            is_irrigation_tagalog = ' kung may patubig'
          }else{
            transition_word_english = 'If'
            transition_word_filipino = 'Kung'
            is_irrigation_english = ''
            is_irrigation_tagalog = ''
          }

          $('#rainfall-chart-text-container').html(`
          <p style="font-size:22px; font-weight:bold">Planting of `+crop+` (`+variety+`) is NOT recommended`+sentence_corn+`</p>
          <details style="font-size:17px">
          <summary style="font-size:18px">Read More</summary><br/>
          <p style="font-size:17px">`+sentence_corn_english
          +label+` does not have sufficient soil moisture. `+transition_word_english+` you plant <span style="color:blue">`+crop+` (`+variety+`)</span> on ` +date_for_graph+`, expected yield may be <span style="color:red">${expected}% ${percent_english}</span> than the average*`+is_irrigation_english+`.</p>
          <p style="font-size:17px">`+sentence_corn_filipino+`
          Hindi pa sapat ang tubig sa lupa sa `+label+`. `+transition_word_filipino+` magtatanim sa ` +date_for_graph+`, ang inaasahang ani ay maaaring <span style="color:red">${expected} porsyento mas ${percent_filipino}</span> kaysa pangkaraniwan*`+is_irrigation_tagalog+`.</p>
          <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
          </details>
          `)
        }else{
          if(raw_expected < 0){
            transition_word_english = 'However, if'
            transition_word_filipino = 'Ngunit, kung'
            is_irrigation_english = ' if irrigation/water could be provided'
            is_irrigation_tagalog = ' kung may patubig'
            sufficiency = "is NOT"
            if(crop=="corn"){
              sentence_corn_english = "Where <span style='color:blue'>irrigation</span> is possible, planting corn is <span style='color:blue'>still advisable</span> because harvesting will come during dry months and price is favorable.</br>"
              sentence_corn_filipino = "Kung may <span style='color:blue'>patubig, maaari pa ring magtanim ng mais</span> dahil ang pag-aani ay papatak sa tuyong panahon at ang presyo ng mais ay maganda.</br>"
              sentence_corn = " for rainfed or upland environment <br/> BUT may be recommended for low-lying regions with irrigation."
            }else{
              sentence_corn_english = ""
              sentence_corn_filipino = ""
              sentence_corn = "."
            }
          }else{
            transition_word_english = 'If'
            transition_word_filipino = 'Kung'
            is_irrigation_english = ''
            is_irrigation_tagalog = ''
            sufficiency = "is"
            if(crop=="corn"){
              sentence_corn_english = "In <span style='color:blue'>low lying areas</span>, corn production is <span style='color:blue'>not practical</span> because of serious water logging problem.</br>"
              sentence_corn_filipino = "Kung nasa <span style='color:blue'>mababang lugar, hindi maipapayong magtanim ng mais</span> dahil maaari itong mabulok o mamatay sa sobrang tubig.</br>"
              sentence_corn = "."
            }else{
              sentence_corn_english = ""
              sentence_corn_filipino = ""
              sentence_corn = "."
            }
          }
          $('#rainfall-chart-text-container').html(`
          <p style="font-size:22px; font-weight:bold">Planting of `+crop+` (`+variety+`) `+sufficiency+` recommended`+sentence_corn+`</p>
          <details style="font-size:17px">
          <summary style="font-size:18px">Read More</summary><br/>
          <p style="font-size:17px">`+sentence_corn_english
          +label+` has sufficient soil moisture on ` +date_for_graph+`. `+transition_word_english+` you plant <span style="color:blue">`+crop+` (`+variety+`)</span> on ` +date_for_graph+`, expected yield may be <span style="color:red">${expected}% ${percent_english}</span> than the average*`+is_irrigation_english+`.</p>
          <p style="font-size:17px">`+sentence_corn_filipino+`
          Ang `+label+`ay maari nang tamnan ng sahod-ulan na palay sa ` +date_for_graph+`. `+transition_word_filipino+` magtatanim sa ` +date_for_graph+`, ang inaasahang ani ay maaaring <span style="color:red">${expected} porsyento mas ${percent_filipino}</span> kaysa pangkaraniwan*`+is_irrigation_tagalog+`.</p>
          <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
          </details>
          `)
        }
      })
    } // end of if (apiKey)
    }
    
    // ************* IF CURRENT DATE AND FUTURE DATE WITHIN 10-DAY FORECAST ************* //
    else{
    if (apiKey) {
      $.getJSON(`http:\/\/api.wunderground.com/api/${apiKey.value}/forecast10day/q/pws:${stationID}.json`, (result) => {

        //remove any existing chart first
        $('div.rainfall-chart').remove()

        const runningTotal = pastRainfall.pastAccRainfall[29-diffDays].y     // 30-day rainfall
        const runningTotalForTwenty = pastRainfallForTwenty.pastAccRainfall[19-diffDays].y     // 20-day rainfall

        const forecast = Meteor.RainfallDistribution.getForecast(result, runningTotal, runningTotalForTwenty)  // rainfall forecast and total rainfall forecast, plotBandStart and plotBandEnd
        const futureDateRainTotal = forecast.forecastAccumulated[forecastIndex].y       // 30-day rainfall
        const futureDateRainTotalWithTwenty = forecast.forecastAccumulatedWithTwenty[forecastIndex].y       // 20-day rainfall
        const completeData = Meteor.RainfallDistribution.assembleRainfallData(pastRainfall.pastRainfall, pastRainfall.pastAccRainfall, pastRainfallForTwenty.pastAccRainfall, forecast.forecastRainfall, forecast.forecastAccumulated, forecast.forecastAccumulatedWithTwenty)   // completeRainfall and completeAccumulatedRainfall

        $('<div class="rainfall-chart">').appendTo('#rainfall-chart-container').highcharts(Meteor.RainfallDistribution.constructChart(completeData.completeRainfall, completeData.completeAccumulatedRainfall, completeData.completeAccumulatedRainfallWithTwenty, forecast.plotBandStart, forecast.plotBandEnd))
        
        const percentMeanData = PercentMeanData.find({id: stationID, crop: crop, variety: variety}).fetch()

        let expected, percent_english, percent_filipino, sentence_english, sentence_filipino, raw_expected, sufficiency, sentence_corn_english, sentence_corn_filipino, threshold, num_days, total_rainfall, total_future, sentence_corn, is_irrigation_english, is_irrigation_tagalog
        for (let entry of percentMeanData){
          if(eval('entry.percentMean._'+date) != null){
            expected = eval('entry.percentMean._'+date)
            if(expected < 0){
              expected = expected * (-1)
              percent_english = 'lower'
              percent_filipino = 'mababa'
            }else{
              percent_english = 'higher'
              percent_filipino = 'mataas'
            }
          }

          if(crop=="Rice"){
            crop="rainfed rice"
            sentence_corn_english = ""
            sentence_corn_filipino = ""
            sentence_corn = "."
            threshold = 200
            num_days = '30'
            total_rainfall = runningTotal
            total_future = futureDateRainTotal
          }else if(crop=="Corn"){
            crop="corn"
            sentence_corn_english = "Where <span style='color:blue'>irrigation</span> is possible, planting corn is <span style='color:blue'>still advisable</span> because harvesting will come during dry months and price is favorable.</br>"
            sentence_corn_filipino = "Kung may <span style='color:blue'>patubig, maaari pa ring magtanim ng mais</span> dahil ang pag-aani ay papatak sa tuyong panahon at ang presyo ng mais ay maganda.</br>"
            sentence_corn = " for rainfed or upland environment <br/> BUT may be recommended for low-lying regions with irrigation."
            threshold = 100
            num_days = '20'
            total_rainfall = runningTotalForTwenty
            total_future = futureDateRainTotalWithTwenty
          }

          sentence_english = 'If you plant <span style="color:blue">'+crop+' ('+variety+')</span> today ('+date_for_graph+'), expected yield may be <span style="color:red">' +expected+'% '+percent_english+'</span> than the average*.'
          sentence_filipino = 'Kung magtatanim ngayon ('+date_for_graph+'), ang inaasahang ani ay maaaring <span style="color:red">'+expected+' porsyento mas '+percent_filipino+'</span> kaysa pangkaraniwan*.'
          raw_expected = eval('entry.percentMean._'+date)
        }
        // if future date within 10-day forecast
        if ((digit_current_date < digit_selected_date) && (digit_selected_date <= digit_last_forecast)){
          if(total_future < threshold){
            if(raw_expected > 0){
              transition_word_english = 'However, if'
              transition_word_filipino = 'Ngunit, kung'
              is_irrigation_english = ' if irrigation/water could be provided'
              is_irrigation_tagalog = ' kung may patubig'
            }else{
              transition_word_english = 'If'
              transition_word_filipino = 'Kung'
              is_irrigation_english = ''
              is_irrigation_tagalog = ''
            }
            $('#rainfall-chart-text-container').html(`
            <p style="font-size:22px; font-weight:bold">Planting of `+crop+` (`+variety+`) is NOT recommended`+sentence_corn+`</p>
            <details style="font-size:17px">
            <summary style="font-size:18px">Read More</summary><br/>
            <p style="font-size:17px">`+sentence_corn_english
            +label+` does not have sufficient soil moisture. `+transition_word_english+` you plant <span style="color:blue">`+crop+` (`+variety+`)</span> on ` +date_for_graph+`, expected yield may be <span style="color:red">${expected}% ${percent_english}</span> than the average*`+is_irrigation_english+`.</p>
            <p style="font-size:17px">`+sentence_corn_filipino+`
            Hindi pa sapat ang tubig sa lupa sa ${label}. `+transition_word_filipino+` magtatanim sa ` +date_for_graph+`, ang inaasahang ani ay maaaring <span style="color:red">${expected} porsyento mas ${percent_filipino}</span> kaysa pangkaraniwan*`+is_irrigation_tagalog+`.</p>
            <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
            <details>
            `)
          }else{
            if(raw_expected < 0){
              transition_word_english = 'However, if'
              transition_word_filipino = 'Ngunit, kung'
              is_irrigation_english = ' if irrigation/water could be provided'
              is_irrigation_tagalog = ' kung may patubig'
              sufficiency = "is NOT"
              if(crop=="corn"){
                sentence_corn_english = "Where <span style='color:blue'>irrigation</span> is possible, planting corn is <span style='color:blue'>still advisable</span> because harvesting will come during dry months and price is favorable.</br>"
                sentence_corn_filipino = "Kung may <span style='color:blue'>patubig, maaari pa ring magtanim ng mais</span> dahil ang pag-aani ay papatak sa tuyong panahon at ang presyo ng mais ay maganda.</br>"
                sentence_corn = " for rainfed or upland environment <br/> BUT may be recommended for low-lying regions with irrigation."
              }else{
                sentence_corn_english = ""
                sentence_corn_filipino = ""
                sentence_corn="."
              }
            }else{
              transition_word_english = 'If'
              transition_word_filipino = 'Kung'
              is_irrigation_english = ''
              is_irrigation_tagalog = ''
              sufficiency = "is"
              if(crop=="corn"){
                sentence_corn_english = "In <span style='color:blue'>low lying areas</span>, corn production is <span style='color:blue'>not practical</span> because of serious water logging problem.</br>"
                sentence_corn_filipino = "Kung nasa <span style='color:blue'>mababang lugar, hindi maipapayong magtanim ng mais</span> dahil maaari itong mabulok o mamatay sa sobrang tubig.</br>"
                sentence_corn = "."
              }else{
                sentence_corn_english = ""
                sentence_corn_filipino = ""
                sentence_corn = "."
              }
            }
            $('#rainfall-chart-text-container').html(`
            <p style="font-size:22px; font-weight:bold">Planting of `+crop+` (`+variety+`) `+sufficiency+` recommended`+sentence_corn+`</p>
            <details style="font-size:17px">
            <summary style="font-size:18px">Read More</summary><br/>
            <p style="font-size:17px">`+sentence_corn_english
            +label+` has sufficient soil moisture on ` +date_for_graph+`. `+transition_word_english+` you plant <span style="color:blue">`+crop+` (`+variety+`)</span> on ` +date_for_graph+`, expected yield may be <span style="color:red">${expected}% ${percent_english}</span> than the average*`+is_irrigation_english+`.</p>
            <p style="font-size:17px">`+sentence_corn_filipino+`
            Ang ${label} ay maari nang tamnan ng sahod-ulan na palay sa ` +date_for_graph+`. `+transition_word_filipino+` magtatanim sa ` +date_for_graph+`, ang inaasahang ani ay maaaring <span style="color:red">${expected} porsyento mas ${percent_filipino}</span> kaysa pangkaraniwan*`+is_irrigation_tagalog+`.</p>
            <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
            </details>
            `)
          }
        // else if current date
        }else{
          if(total_rainfall < threshold){
            if(raw_expected > 0){
              transition_word_english = 'However, if'
              transition_word_filipino = 'Ngunit, kung'
              is_irrigation_english = ' if irrigation/water could be provided'
              is_irrigation_tagalog = ' kung may patubig'
            }else{
              transition_word_english = 'If'
              transition_word_filipino = 'Kung'
              is_irrigation_english = ''
              is_irrigation_tagalog = ''
            }
            $('#rainfall-chart-text-container').html(`
            <p style="font-size:22px; font-weight:bold">Planting of `+crop+` (`+variety+`) is NOT recommended`+sentence_corn+`</p>
            <details style="font-size:17px">
            <summary style="font-size:18px">Read More</summary><br/>
            <p style="font-size:17px">`+sentence_corn_english
            +label+` does not have sufficient soil moisture with <span style="color:red">${total_rainfall} mm</span> total rainfall for the past `+num_days+` days. `+transition_word_english+` you plant <span style="color:blue">`+crop+` (`+variety+`)</span> today (` +date_for_graph+`), expected yield may be <span style="color:red">${expected}% ${percent_english}</span> than the average*`+is_irrigation_english+`.</p>
            <p style="font-size:17px">`+sentence_corn_filipino+`
            Hindi pa sapat ang tubig sa lupa sa ${label} na may <span style="color:red">${total_rainfall} mm</span> kabuuang pag-ulan sa nakalipas na `+num_days+` araw. `+transition_word_filipino+` magtatanim ngayon (` +date_for_graph+`), ang inaasahang ani ay maaaring <span style="color:red">${expected} porsyento mas ${percent_filipino}</span> kaysa pangkaraniwan*`+is_irrigation_tagalog+`.</p>
            <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
            </details>
            `)
          }else{
            if(raw_expected < 0){
              transition_word_english = 'However, if'
              transition_word_filipino = 'Ngunit, kung'
              is_irrigation_english = ' if irrigation/water could be provided'
              is_irrigation_tagalog = ' kung may patubig'
              sufficiency = "is NOT"
              if(crop=="corn"){
                sentence_corn_english = "Where <span style='color:blue'>irrigation</span> is possible, planting corn is <span style='color:blue'>still advisable</span> because harvesting will come during dry months and price is favorable.</br>"
                sentence_corn_filipino = "Kung may <span style='color:blue'>patubig, maaari pa ring magtanim ng mais</span> dahil ang pag-aani ay papatak sa tuyong panahon at ang presyo ng mais ay maganda.</br>"
                sentence_corn = " for rainfed or upland environment <br/> BUT may be recommended for low-lying regions with irrigation."
              }else{
                sentence_corn_english = ""
                sentence_corn_filipino = ""
                sentence_corn = "."
              }
            }else{
              transition_word_english = 'If'
              transition_word_filipino = 'Kung'
              is_irrigation_english = ''
              is_irrigation_tagalog = '' 
              sufficiency = "is"
              if(crop=="corn"){
                sentence_corn_english = "In <span style='color:blue'>low lying areas</span>, corn production is <span style='color:blue'>not practical</span> because of serious water logging problem.</br>"
                sentence_corn_filipino = "Kung nasa <span style='color:blue'>mababang lugar, hindi maipapayong magtanim ng mais</span> dahil maaari itong mabulok o mamatay sa sobrang tubig.</br>"
                sentence_corn = "."
              }else{
                sentence_corn_english = ""
                sentence_corn_filipino = ""
                sentence_corn = "."
              }
            }
            $('#rainfall-chart-text-container').html(`
            <p style="font-size:22px; font-weight:bold">Planting of `+crop+` (`+variety+`) `+sufficiency+` recommended`+sentence_corn+`</p>
            <details style="font-size:17px">
            <summary style="font-size:18px">Read More</summary><br/>
            <p style="font-size:17px">`+sentence_corn_english
            +label+` has sufficient soil moisture with <span style="color:red">${total_rainfall} mm</span> total rainfall for the past `+num_days+` days. `+transition_word_english+` you plant <span style="color:blue">`+crop+` (`+variety+`)</span> today (` +date_for_graph+`), expected yield may be <span style="color:red">${expected}% ${percent_english}</span> than the average*`+is_irrigation_english+`.</p>
            <p style="font-size:17px">`+sentence_corn_filipino+`
            Sapat na ang tubig sa lupa sa ${label} na may <span style="color:red">${total_rainfall} mm</span> kabuuang pag-ulan sa nakalipas na `+num_days+` araw. `+transition_word_filipino+` magtatanim ngayon (`+date_for_graph+`), ang inaasahang ani ay maaaring <span style="color:red">${expected} porsyento mas ${percent_filipino}</span> kaysa pangkaraniwan*`+is_irrigation_tagalog+`.</p>
            <p style="font-size:15px">*simulated using ${label} historical weather data from PAGASA (assuming no extreme events like typhoon and pest incidence)</p>
            </details>
             `)
          }
        }
      })
    } // end of if (apiKey)
    } // end of else
  }
}