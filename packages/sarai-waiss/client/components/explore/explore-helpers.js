Template.WAISSExplore.onCreated(function() {
    Meteor.subscribe('farm');
    Meteor.subscribe('crop');
    this.autorun(function() {
        Meteor.subscribe('weather-stations');
    });
});

Template.WAISSExplore.onRendered(function() {
    Session.set('exploreFarmId', null);
});

Template.WAISSExplore.helpers({
    isLoggedIn: function() {
        return Meteor.userId();
    },
    weatherStations: function() {
        return WeatherStations.find({'id':'ICALABAR18'}).fetch();
    },
    noFarms: function() {
        if(Session.get('weatherStationId') === null) {
            return Farm.find({
                'public': true,
                'weatherStation': 'ICALABAR18'
            }).count() === 0;
        }

        return Farm.find({
            'public': true,
            'weatherStation': Session.get('weatherStationId')
        }).count() === 0;
    },
    farms: function() {
        if(Session.get('weatherStationId') === null) {
            return Farm.find({
                'public': true,
                'weatherStation': 'ICALABAR18'
            }).fetch();
        }

        return Farm.find({
            'public': true,
            'weatherStation': Session.get('weatherStationId')
        }).fetch();
    },
    farmInfo: function() {
        return Farm.findOne({
            _id: Session.get('exploreFarmId')
        });
    },
    chartData: function() {
        var farm = Farm.findOne({
            _id: Session.get('exploreFarmId')
        });

        var mad = CropData.findOne({
            'name': farm.crop.toLowerCase()
        }).mad;

        var dataSource = WeatherStations.findOne({
            'id': farm.weatherStation
        });

        var categoriesArray = [];
        var madArray = [];
        var dataArray = [];
        var rainfallArray = [];

        var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ];

        for(var i = 0; i < farm.data.waterDeficit.length; i++) {
            var waterDeficit = farm.data.waterDeficit[i];
            categoriesArray.push(months[waterDeficit.dateUTC.getMonth()] + ' ' + waterDeficit.dateUTC.getDate());
            dataArray.push(-waterDeficit.data);
            madArray.push(mad);
            rainfallArray.push(farm.data.rainfall[i].data);
        }

        return {
            title: {
                text: 'Water Deficit',
                x: -20 //center
            },
            subtitle: {
                text: 'Weather data collected from ' + dataSource.label,
                x: -20
            },
            xAxis: {
                categories: categoriesArray
            },
            yAxis: {
                title: {
                    text: 'Water, mm'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Rainfall',
                data: rainfallArray,
                type: 'column',
                tooltip: {
                    valueSuffix: 'mm'
                }
            },{
                name: 'Management Allowable Depletion',
                data: madArray,
                color: 'red',
                tooltip: {
                    valueSuffix: 'mm'
                }
            },{
                name: 'Water Deficit',
                data: dataArray,
                tooltip: {
                    valueSuffix: 'mm'
                }
            }]
        };
    }
});

Template.WAISSExplore.events({
    'click .list-farm-item': function(e) {
        var currentFarm = $(e.target).attr('farmId');
        var farmInfo = Farm.findOne({
            _id: currentFarm
        });
        Session.set('exploreFarmId', currentFarm);
    },
    'click #goToDashboard': function(e) {
        FlowRouter.go('/waiss');
    }
});