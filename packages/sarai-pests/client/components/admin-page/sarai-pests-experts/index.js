Template.ExpertPage.helpers({
	request: function(){
		return Assistance.find();
	},
	subjectString: function(str){
		if(str.length > 40){
			return str.substring(0,39) + "...";
		}else{
		return str;
		}
	},
	equals: function(v1, v2){
		return (v1 === v2);
	},
	IsLoggedIn: function(){
		if(Meteor.userId()===null){
			FlowRouter.go('/pests-clinic');
			FlowRouter.redirect('/pests-clinic');
		}
		else{
			return true;
		}
	},
	expert: function(){
		var e = Expert.find().fetch();
		return e;
	}
});

Template.ExpertPage.events({
	'click .msg-btn': function(e){
		e.preventDefault();
		var id = e.target.id;
		
		var name="";
		var position="";
		var company="";
		
		var data = Expert.findOne({_id:id});
		
		name = data.name;
		position = data.position;
		company = data.company;
		
		$('#name').val(name);
		$('#position').val(position);
		$('#company').val(company);
		
		$('#holder').val(id);
		
		$('#submitE').hide();
		$('#editE').show();	
		$('#cancelE').show();	
	},
	'click .rem-btn': function(e){
		e.preventDefault();
		var id = e.target.id;
		
		$('#name').val('');
		$('#position').val('');
		$('#company').val('');
		
		$('#submitE').show();	
		$('#editE').hide();	
		$('#cancelE').hide();
		
		Meteor.call('removeExpert', id);
		
	},
	'click #cancelE': function(e){
		e.preventDefault();
		$('#name').val('');
		$('#position').val('');
		$('#company').val('');
		
		$('#submitE').show();	
		$('#editE').hide();	
		$('#cancelE').hide();
		
		$('#holder').val('');
	
	},
	'click #editE': function(e){
		e.preventDefault();
		var id = $('#holder').val().trim();
		
		var name=$('#name').val().trim();
		var position=$('#position').val().trim();
		var company=$('#company').val().trim();
		
		if(name!="" || company!="" || position!=""){
			Meteor.call('updateExpert',name,position,company,id);
		}
	},
	'click #submitE': function(e){
		e.preventDefault();
		
		var name=$('#name').val().trim();
		var position=$('#position').val().trim();
		var company=$('#company').val().trim();
		
		if(name!="" || company!="" || position!=""){
			Meteor.call('addExpert',name,position,company);
		}
		
		$('#name').val('');
		$('#position').val('');
		$('#company').val('');
	}
	
	
});
