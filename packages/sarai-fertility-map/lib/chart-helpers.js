Meteor.chartHelpers = {    
    getData : (data, season) => {
      let years = [] 
      //let treatments = []
      let series = []
      let varieties = []
      let uniqueVarieties = []    
      let inputData = []
      let gy = []     
      let seriesData = []
      let treatments = ['Control', 'NK', 'NP', 'NPK', 'PK']
      let yAverage = []

      
      byYear = _.groupBy(data, function(d){return d.Year})      
      for(let key in byYear){
        years.push(key)              
        bySeason = _.groupBy(byYear[key], function(d){return d.Season})

        for(let key2 in bySeason){          
          byVariety = _.groupBy(bySeason[key2], function(d){return d.Variety})   

          for(let key3 in byVariety){            
            varieties.push(key3)
            byTreatment = _.groupBy(byVariety[key3], function(d){return d.Treatment})            
            for(let entry in byTreatment){             
              sum = 0              
              for(i = 0;i<byTreatment[entry].length;i++){
                //console.log(byTreatment[entry][i])
                sum = sum + byTreatment[entry][i]['Grain Yield at 14%MC']
              }
              average = sum/byTreatment[entry].length
                if(byTreatment[entry][0]['Season'] === season){
                  inputData.push({
                  year: byTreatment[entry][0]['Year'],
                  season: byTreatment[entry][0]['Season'],
                  variety: byTreatment[entry][0]['Variety'],
                  treatment: byTreatment[entry][0]['Treatment'],
                  grainYield: average,
                })     

                gy.push(average) 
              }                      
            }//byTreatment
          }//byVariety
        }//bySeason      
      }//byYear
    

      /*get unique list of varieties*/
      $.each(varieties, function(i, unique){
          if($.inArray(unique, uniqueVarieties) === -1) uniqueVarieties.push(unique);
      });
      
      for(let tr in treatments){            
          sum = 0
          for(let entry2 in inputData){       
            if(inputData[entry2]['variety'] == 'IPB Var 13' && inputData[entry2]['treatment'] == treatments[tr]){
              seriesData.push(inputData[entry2].grainYield)
              sum = sum + inputData[entry2].grainYield
            }
            yAverage.push(sum/3)
          }
          series.push({
            type: 'column',
            name: treatments[tr],            
            data: seriesData
          })          
          seriesData = []       
      }
      series.push({
        type: 'spline',
        name: 'average',
        data: yAverage,
      })

      Object.keys(series).map(key => series[key])      

      const result = {
        years,        
        series,        
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
          }

        ],

        yAxis: {
          labels: {            
            style: {                
                fontWeight: 'bold'
            }
          },
        },

        series: chart.data,
      }

      return chartOptions
    },

    getXAxis: () => {

    }

}