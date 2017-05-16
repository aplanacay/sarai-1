Meteor.methods({
  'cms-weather-data-edit': (_id, tempAve, tempMin, tempMax, humAve, humMin, humMax, windAve, windMax, preMin, preMax, rain) => {
    tempAve = parseFloat(tempAve)
    tempMin = parseFloat(tempMin)
    tempMax = parseFloat(tempMax)
    humAve = parseFloat(humAve)
    humMin = parseFloat(humMin)
    humMax = parseFloat(humMax)
    windAve = parseFloat(windAve)
    windMax = parseFloat(windMax)
    preMin = parseFloat(preMin)
    preMax = parseFloat(preMax)
    rain = parseFloat(rain)

    WeatherData.update(
      { _id },
      {
        $set: {
          data: {
            temp: {
              ave: tempAve,
              min: tempMin,
              max: tempMax
            },
            pressure: {
              min: preMin,
              max: preMax
            },
            wind: {
              maxSpd: windMax,
              aveSpd: windAve
            },
            humidity: {
              ave: humAve,
              min: humMin,
              max: humMax
            },
            rainfall: rain
          }
        }
      },
      { upsert: false }
    )
  },

  'cms-weather-station-edit': (id, label, lat, long) => {
    WeatherStations.update(
      { id },
      {
        $set: {
          label: label,
          coords: [lat, long]
        }
      },
      { upsert: false }
    )
  },

  'cms-weather-wu-key-edit': (key) => {
    DSSSettings.update(
      { name: 'wunderground-api-key'},
      { $set:
          { value: key}
      },
      { upsert: false }
    )
  }
})