Template.SaraiPestsMonitor.helpers({
	pestsRice: function(){
		return PlantProblem.find({'type': 'Pest', 'plant_affected': 'Rice'},{limit: 8});
	},
	pestsCorn: function(){
		return PlantProblem.find({'type': 'Pest', 'plant_affected': 'Corn'},{limit: 8});
	},
	imageName: function(str){
		return str.replace(/\s/g, '');
	},
	equals: function(v1, v2) {
		return (v1 === v2);
	},
	charLimit: function(str){
		return str.substring(0,160) + "...";
	},
	titleCharLimit: function(str){
		if(str.length > 13)
			return str.substring(0,12) + "...";

		return str;
	},
	bannerInfo: function(){
		return CMS.find({info:'finalMonitor'});
	},
	imageURL: function(){
		var link = CMS.findOne({info:'finalMonitor'});
		if(link.bannerImage=="")
			return "/packages/sarai_sarai-pests/public/images/mon_banner2.jpg";
		else
			return link.bannerImage;
	}
});




 Template.monitorChart.helpers({
 	
	   monitorChart : function() {
			var self = Template.instance()
		    return self.monitorChart.get()
		},

		numberChart : function() {
			var self = Template.instance()
		    return self.numberChart.get()
		},

		mostViewedChart : function() {
			var self = Template.instance()
		    return self.mostViewedChart.get()
		},
	
});