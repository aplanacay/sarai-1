Template.FertilityMap.helpers({ 
  mapConfig: function() {
    var mapData = Highcharts.maps['lib/ph-all'];
    $.each(mapData, function () {
      this.id = this.properties['hc-key'];
    });

    return {
      title : {
        text : 'My highmap'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        type: 'logarithmic',
        endOnTick: false,
        startOnTick: false,
        min: 50000
      },
      series : [{
        data : [{
          code3: 'BR',
          name: 'Brazil',
          value: 2500000
        }, {
          code3: 'ES',
          name: 'Spain',
          value: 10000
        }, {
          code3: 'US',
          name: 'United States',
          value: 300000
        }],
        mapData: mapData,
        joinBy: ['iso-a2', 'code3'],
        name: 'Some text here',
        allowPointSelect: true,
        cursor: 'pointer',
        states: {
          select: {
            color: '#a4edba',
            borderColor: 'black',
            dashStyle: 'shortdot'
          }
        }
      }]
    }
  }
});

/*
if (Meteor.isClient) {

  var data = [{
    "value": 438,
    "code": "nj"
  }, {
    "value": 387.35,
    "code": "ri"
  }, {
    "value": 312.68,
    "code": "ma"
  }, {
    "value": 271.4,
    "code": "ct"
  }, {
    "value": 209.23,
    "code": "md"
  }, {
    "value": 195.18,
    "code": "ny"
  }, {
    "value": 154.87,
    "code": "de"
  }, {
    "value": 114.43,
    "code": "fl"
  }, {
    "value": 107.05,
    "code": "oh"
  }, {
    "value": 105.8,
    "code": "pa"
  }, {
    "value": 86.27,
    "code": "il"
  }, {
    "value": 83.85,
    "code": "ca"
  }, {
    "value": 72.83,
    "code": "hi"
  }, {
    "value": 69.03,
    "code": "va"
  }, {
    "value": 67.55,
    "code": "mi"
  }, {
    "value": 65.46,
    "code": "in"
  }, {
    "value": 63.8,
    "code": "nc"
  }, {
    "value": 54.59,
    "code": "ga"
  }, {
    "value": 53.29,
    "code": "tn"
  }, {
    "value": 53.2,
    "code": "nh"
  }, {
    "value": 51.45,
    "code": "sc"
  }, {
    "value": 39.61,
    "code": "la"
  }, {
    "value": 39.28,
    "code": "ky"
  }, {
    "value": 38.13,
    "code": "wi"
  }, {
    "value": 34.2,
    "code": "wa"
  }, {
    "value": 33.84,
    "code": "al"
  }, {
    "value": 31.36,
    "code": "mo"
  }, {
    "value": 30.75,
    "code": "tx"
  }, {
    "value": 29,
    "code": "wv"
  }, {
    "value": 25.41,
    "code": "vt"
  }, {
    "value": 23.86,
    "code": "mn"
  }, {
    "value": 23.42,
    "code": "ms"
  }, {
    "value": 20.22,
    "code": "ia"
  }, {
    "value": 19.82,
    "code": "ar"
  }, {
    "value": 19.4,
    "code": "ok"
  }, {
    "value": 17.43,
    "code": "az"
  }, {
    "value": 16.01,
    "code": "co"
  }, {
    "value": 15.95,
    "code": "me"
  }, {
    "value": 13.76,
    "code": "or"
  }, {
    "value": 12.69,
    "code": "ks"
  }, {
    "value": 10.5,
    "code": "ut"
  }, {
    "value": 8.6,
    "code": "ne"
  }, {
    "value": 7.03,
    "code": "nv"
  }, {
    "value": 6.04,
    "code": "id"
  }, {
    "value": 5.79,
    "code": "nm"
  }, {
    "value": 3.84,
    "code": "sd"
  }, {
    "value": 3.59,
    "code": "nd"
  }, {
    "value": 2.39,
    "code": "mt"
  }, {
    "value": 1.96,
    "code": "wy"
  }, {
    "value": 0.42,
    "code": "ak"
  }];

  Template.FertilityMap.onRendered(function() {
    // Make codes uppercase to match the map data
    _.each(data, (el) => el.code = el.code.toUpperCase());

    // Instanciate the map
    $('#container').highcharts('Map', {

      chart: {
        borderWidth: 1
      },

      title: {
        text: 'US population density (/km²)'
      },

      legend: {
        layout: 'horizontal',
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.85)',
        floating: true,
        verticalAlign: 'top',
        y: 25
      },

      mapNavigation: {
        enabled: true
      },

      colorAxis: {
        min: 1,
        type: 'logarithmic',
        minColor: '#EEEEFF',
        maxColor: '#000022',
        stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },

      series: [{
        animation: {
          duration: 1000
        },
        data: data,
        mapData: Highcharts.maps['countries/us/us-all'],
        joinBy: ['postal-code', 'code'],
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          format: '{point.code}'
        },
        name: 'Population density',
        tooltip: {
          pointFormat: '{point.code}: {point.value}/km²'
        }
      }]
    });
  });

}*/