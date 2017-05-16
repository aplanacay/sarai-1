Meteor.RainfallHeatMap = {

  getCoordinates: (rainfall, totalMunicipalities) => {
    let coordinates = [], municipalities = []
    let rain, coords

    for (let yAxis = 0; yAxis < 5; yAxis++) {
      for (let xAxis = 0; xAxis < totalMunicipalities; xAxis++) {       // if all municipalities except "All" option -> totalMunicipalities-1
        rain = rainfall[totalMunicipalities-1-xAxis].y[yAxis]           // if not reversed, rain = rainfall[xAxis].y[yAxis]
        coords = "["+yAxis+","+ xAxis+","+ rain+"]"
        if(yAxis==0){
          municipalities.push(rainfall[totalMunicipalities-1-xAxis].x)  // if not reversed, rain = rainfall[xAxis].y[yAxis]
        }
        coordinates.push(coords)
      }
    }
    return {
      municipalities,
      coordinates
    }
  },

  getRainfall: (weatherOutlook, totalMunicipalities) => {
    let rainfallOutlook = []

    for (let a = 0; a < totalMunicipalities; a++) {                  // if all municipalities except "All" option which is the first element (weatherOutlook[0]) -> a=1
      rainfallOutlook.push({ x: weatherOutlook[a].municipality, y: [
                                                                    Math.round(weatherOutlook[a].data.month.May),
                                                                    Math.round(weatherOutlook[a].data.month.June),
                                                                    Math.round(weatherOutlook[a].data.month.July),
                                                                    Math.round(weatherOutlook[a].data.month.Aug),
                                                                    Math.round(weatherOutlook[a].data.month.Sept)]})
    }
    return rainfallOutlook
  },

  constructHeatMap: (municipalities, coordinates) => {
    let coord = "["+coordinates.toString()+"]"
    
    return {
      chart: {
          type: 'heatmap',
          marginBottom: 50,
          // plotBorderWidth: 1,
          // width: 900,
          height: 900,
      },

      title: {
          text: ''
      },

      xAxis: {
          categories: ['May', 'June', 'July', 'August', 'September'],
          opposite: true
      },

      yAxis: {
          categories: municipalities,
          title: null
      },

      colorAxis: {
        stops: [
            [0, '#FF0000'],     // red            // 0
            [0.2, '#FFA500'],   // orange         // 25
            [0.4, '#FFFF00'],   // yellow         // 50
            [0.6, '#62ff00'],   // light green    // 75
            [0.8, '#00ff00']    // green          // 100
        ],
        min: 0,
      },

      legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
      },

      tooltip: {
          formatter: function () {
              if (this.series.yAxis.categories[this.point.y] === 'All'){
                return 'Average of rainfall in <b>all<b><br>municipalities is '+'<b>'+
                  this.point.value + ' mm</b><br>on the month of <b>' + this.series.xAxis.categories[this.point.x] + '</b>';
              }else{
                return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> is expected to experience <br><b>' +
                  this.point.value + ' mm</b> of rain on the month of <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
              }
          }
      },

      series: [{
          name: 'mm of rain',
          // borderWidth: 1,
          data: JSON.parse(coord),
          dataLabels: {
              enabled: true,
              color: '#000000'
          }
      }]
    }
  }
}