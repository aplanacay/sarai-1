Template.SaraiSuitabilityGallery.events({
    'click .filter-button' : function (e){
        var value = e.target.attributes[1].nodeValue;
        console.log(e);
        // console.log(e.target.attributes[1].nodeValue);
        // console.log(e.target.attributes[1]);
        // console.log("VALUE: "+value);
        Session.set('crop', value)
        if(value == "All")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000')
        }
        else
        { 
            $(".filter").not('.'+value).hide('3000')
            $('.filter').filter('.'+value).show('3000')
            
        }

        if ($(".filter-button").removeClass("active")) {
            $(e).removeClass("active")
        }
        e.target.className = "btn btn-default filter-button active"
        // $(e).addClass("active");       
     },

     'click .pop' : function (e){
        const src = e.target.src
        const dialog = document.querySelector('#suitability-dialog')

        Session.set("src", src)

        dialog.querySelector('.cancel').addEventListener('click', () => {
            dialog.close();
        }); 
        //remove any existing chart first
        $('img.suitability-image').remove()
        $('<img class="suitability-image" src="'+src+'">').appendTo('#image-container')
        dialog.showModal()  
     },

     'click .download-button' : function (e){
        console.log(e.target.href)
        e.target.href = Session.get("src")
        
     },

     'change #preview-select-region': (e) => {
        const region = e.currentTarget.value
        Session.set('region', region)
        let province
        if(region == "All"){
            province = Regions.findOne({region:region}).province[0]    
        }else{
            province = Regions.findOne({region:region}).province[1]
        }

        

        // sets province to first province in the chosen region 
        Session.set('province',province)


      },
      
      'change #preview-select-province': (e) => {
        const province = e.currentTarget.value
        Session.set('province', province)

        // sets municipality to first municipality in the chosen province 
        // Session.set('municipality',Provinces.findOne({province:province}).municipality[0])
      },
});