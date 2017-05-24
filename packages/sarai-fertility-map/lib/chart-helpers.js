Meteor.chartHelpers = {    
    getData : (data) => {
      let years = [] 
      let treatments = []
      let inputData = []
      
      byYear = _.groupBy(data, function(d){return d.Year})      
      for(let key in byYear){
        years.push(key)        
        // console.log('year')  
        bySeason = _.groupBy(byYear[key], function(d){return d.Season})
        for(let key2 in bySeason){          
          // console.log('variety')
          byVariety = _.groupBy(bySeason[key2], function(d){return d.Variety})
          for(let key3 in byVariety){
            // console.log('treatment')

            byTreatment = _.groupBy(byVariety[key3], function(d){return d.Treatment})
            for(let key4 in byTreatment){
              // console.log('replication')
              // console.log(key4)
              if (treatments.includes(key4)){} 
              else{
                treatments.push(key4)
              }             
              byReplication = _.groupBy(byTreatment[key4], function(d){return d.Replication})
              inputData[key][key2][key3][key4] = byReplication
              // console.log(byReplication)
            }
          }
        }      
      }
      //console.log(byReplication)
      //console.log(treatments)

      const result = {
        years,
        treatments
      }

      return result
    },

    constructChart: (chart) => {
      let chartOptions = {
        chart: {
          marginLeft: 50,
          marginRight: 30,
          // marginTop: 25,
          height: 200
        },

        legend: {
          enabled: false
        },

        title: {
          text: chart.title,
          align: 'left',
          margin: 0,
          x: 30
        },

        xAxis: [
          {
            categories: chart.categories,
            crosshair: true,
            //tickPositions: chart.tickPositions,
            //tickPosition: 'inside',
            // opposite: true,
            /*events: {
              setExtremes: function syncExtremes(e) {
                var thisChart = this.chart
                if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                  Highcharts.each(Highcharts.charts, function (chart) {
                    if (chart !== thisChart) {
                      if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                      }
                    }
                  });
                }
              }
            },*/
            labels: {
              enabled: false
            },
            //plotLines: chart.plotLines
          },

          {
            //tickPositions: chart.altTickPositions, //chart.atpEnabled ? altTickPositions : null,
            opposite: true,
            tickWidth: 0,
            /*labels: {
              formatter: function () {
                var altTickLabels = chart.altTickLabels[this.value.toString()]
                altTickLabels = (altTickLabels == undefined) ? '' : altTickLabels

                var d = chart.dateTicksEnabled ? Highcharts.dateFormat('%e %b', new Date(this.value)) : ''

                var label =  d + '<br/>' + altTickLabels

                return label
              }
            },*/
            linkedTo: 0
          }

        ],

        yAxis: {
          labels: {
            //format: '{value}' + chart.unit,
            style: {
                // color: '#ff1a1a',
                fontWeight: 'bold'
            }
          },
        },

        /*series: [{
          name: chart.name,
          id: chart.id,
          data: chart.data,
          type: 'column',
          //color: chart.color,
          tooltip: {
              valueDecimals: 0
          }
        }],*/

        /*series: [{
            type: 'column',
            name: 'Jane',
            data: [3, 2, 1, 3, 4]
        }, {
            type: 'column',
            name: 'John',
            data: [2, 3, 5, 7, 6]
        }, {
            type: 'column',
            name: 'Joe',
            data: [4, 3, 3, 9, 0]
        }, {
            type: 'spline',
            name: 'Average',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'Jane',
                y: 13,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: 'John',
                y: 23,
                color: Highcharts.getOptions().colors[1] // John's color
            }, {
                name: 'Joe',
                y: 19,
                color: Highcharts.getOptions().colors[2] // Joe's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }],*/

        tooltip: {
          formatter: function () {
            let s = '<b>' + Highcharts.dateFormat('%e %b - %H:00', new Date(this.x)) + '</b>';

            //s += '<br />' + this.series.name + ': ' + this.y + chart.unit;
            return s;
          }
        }

      }

      // if (chart.atpEnabled) {

      //   chartOptions.xAxis[1][tickPositions] = altTickPositions
      // }

      return chartOptions
    },

    getXAxis: () => {

    }

}