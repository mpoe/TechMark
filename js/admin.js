//Grab events & partners when page loads.
fnCheckLogin();
fnGetAllEvents();
fnGetAllPartners();

function fnCheckLogin() {
  $.getJSON('api/check-login.php', function(oData) {
    if(oData.status == "error")
      window.location = "login.html";
  });
}
function fnGetAllEvents(){
        var sEvent = '<div class="row">\
                             <time datetime="{{eventdatecalender}}" class="icon">\
                             <strong>{{eventMonth}}</strong>\
                             <span>{{eventDay}}</span>\
                             <em>{{eventDayname}}</em>\
                             </time>\
                             <span class="eventID">{{eventid}}</span>\
                             <span>{{eventtitle}}</span>\
                             <span>{{eventdate}}</span>\
                             <span>{{eventprice}}</span>\
                            <div>\
                            <button class="btnEditEvent">Edit</button>\
                            <button class="btnDeleteEvent">Delete</button>\
                   </div>\
               </div>';

    var sURL = "api/api-get-all-events.php";
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    $.getJSON(sURL, function(jData){






        $("#events").empty(); //clear before appending.
        for(var i = 0; i < jData.length; i++){
            var sEventTemplate = sEvent;
            sEventTemplate = sEventTemplate.replace( "{{eventMonth}}", monthNames[new Date(jData[i].sDate).getMonth()]);
            sEventTemplate = sEventTemplate.replace( "{{eventDay}}", new Date(jData[i].sDate).getUTCDate());
            sEventTemplate = sEventTemplate.replace( "{{eventDayname}}", dayNames[new Date(jData[i].sDate).getDay()]);
            sEventTemplate = sEventTemplate.replace( "{{eventdatecalender}}", jData[i].sDate);
            sEventTemplate = sEventTemplate.replace( "{{eventid}}", jData[i].sID);
            sEventTemplate = sEventTemplate.replace( "{{eventtitle}}", jData[i].sTitle);
            sEventTemplate = sEventTemplate.replace( "{{eventdate}}", jData[i].sDate);
            sEventTemplate = sEventTemplate.replace( "{{eventprice}}", jData[i].sPrice);
            $("#events").append(sEventTemplate);
        };
    });
}

function fnGetAllPartners(){

        var sPartner = '<div class="row">\
                            <div>\
                                <img src="../img/partners/{{partnerlogo}}">\
                            </div>\
                            <span class="partnerID">{{partnerid}}</span>\
                            <span>{{partnername}}</span>\
                            <span>{{partnerwebsite}}</span>\
                            <span>{{partnermail}}</span>\
                            <div>\
                               <button class="btnEditPartner">Edit</button>\
                               <button class="btnDeletePartner">Delete</button>\
                            </div>\
                        </div>';

    var sURL = "api/api-get-all-partners.php";

    $.getJSON(sURL, function(jData){

        $("#partners").empty(); //clear before appending.
        for(var i = 0; i < jData.length; i++){
            var sPartnerTemplate = sPartner;
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerid}}", jData[i].sID);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnername}}", jData[i].sPartnerName);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerwebsite}}", jData[i].sPartnerWebsite);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnermail}}", jData[i].sPartnerMail);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerlogo}}", jData[i].sPartnerLogo);
            $("#partners").append(sPartnerTemplate);
        };
    });
}

$('#frm-create-event').on('submit',(function(e) {
	//e.preventDefault(); // do not reload
	var formData = new FormData(this); // this is the form and it's data
	console.log(formData);
	$.ajax({
        type:'POST',
        url: "api/api-create-event.php",
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
	}).done(function(jData){
		console.log("Hi");
	})
	})
);

$('#frm-create-partner').on('submit',(function(e) {
	//e.preventDefault(); // do not reload
	var formData = new FormData(this); // this is the form and it's data
	console.log(formData);
	$.ajax({
        type:'POST',
        url: "api/api-create-partner.php",
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
	}).done(function(jData){
		console.log("Hi");
	})
	})
);
$('#frm-create-user').on('submit',(function(e) {
	//e.preventDefault(); // do not reload
	var formData = new FormData(this); // this is the form and it's data
	console.log(formData);
	$.ajax({
        type:'POST',
        url: "api/api-create-user.php",
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
	}).done(function(jData){
		console.log("Hi");
	})
	})
);

$(document).on("click",".btnDeleteEvent", function(jData){

    var sIDToDelete = $(this).parent().siblings(".eventID").text();
    var sURL = "api/api-delete-event.php?id="+sIDToDelete;
    var oTheParent = $(this).parent().parent();

    $.get(sURL, function(){
        $(oTheParent).fadeOut(200);
        console.log("Event #"+sIDToDelete+" deleted!")
    });

});

$(document).on("click",".btnDeletePartner", function(jData){

    var sIDToDelete = $(this).parent().siblings(".partnerID").text();
    var sURL = "api/api-delete-partner.php?id="+sIDToDelete;
    var oTheParent = $(this).parent().parent();

    $.get(sURL, function(){
        $(oTheParent).fadeOut(200);
        console.log("Partner #"+sIDToDelete+" deleted!")
    });

});

$(document).on("submit", "#frm-edit-event", function(e){

    var formData = new FormData(this); // this is the form and it's data

    $.ajax({
        type: 'POST',
        url: 'api/api-edit-event.php',
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
    }).done(function(jData){
        if(jData.status == "ok"){
            fnGetAllEvents(); //Reload the events, to see the new changes.
        }
    })
});

$(document).on("submit", "#frm-edit-event-image", function(e){

    e.preventDefault(); // do not reload
    var formData = new FormData(this); // this is the form and it's data

    $.ajax({
        type: 'POST',
        url: 'api/api-edit-event-image.php',
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
    }).done(function(jData){
    })
})

$(document).on('change' , '#eventImageFile' , function(){
      var preview = new FileReader();
      preview.readAsDataURL( this.files[0]);
      var self = this;
      preview.onload = function(event){
        $(self).parent().parent().siblings(".eventImagePreview").attr("src", event.target.result);
      }
});


$(document).on("click", ".btnEditEvent", function(){

    $("#myModal").css("display", "block");

    //Loop through the events, and get the rest of the values based on the ID

    var sID = $(this).parent().siblings(".eventID").text();

    var sEventTitle = '<h2>Editing Event: #{{eventid}}</h2>';

    var sEvent = '<form method="POST" id="frm-edit-event" enctype="multipart/form-data">\
                                 <div class="eventID"> ID:<br><input type="text" name="id" value="{{eventid}}"></div>\
                                 <div>Title:<br><input type="text" name="title" value="{{eventtitle}}"></div>\
                                 <div>Tags: <br><input type="text" name="tag" value="{{eventtags}}"></div>\
                                 <div>Description: <br><input type="text" name="description" value="{{eventdesc}}"></div>\
                                 <div>Location: <br><input type="text" name="location" value="{{eventlocation}}"></div>\
                                 <div>Date: <br><input type="date" name="date" value="{{eventdate}}"></div>\
                                 <div>Price: <br><input type="text" name="price" value="{{eventprice}}"></div>\
                             </form>\
                             <form method="POST" id="frm-edit-event-image" enctype="multipart/form-data">\
                                <div class="eventID2">ID:<br><input type="text" name="id" value="{{eventid}}"></div>\
                                <div class="eventImage">Image:<br><input type="file" id="eventImageFile" name="image"></div>\
                             </form>\
                             <br><img class="eventImagePreview" src="../img/events/{{eventimage}}">\
                             <br><br><button type="submit" class="btnSaveEventChanges">Save changes</button><br>\
                             ';

    var sURL = "api/api-get-all-events.php";

    $.getJSON(sURL, function(jData){

        $(".modal-body").empty(); //clear before appending.
        $(".modal-header").empty(); //clear before appending.

        for(var i = 0; i < jData.length; i++){

            if(jData[i].sID == sID){

            var sEventTitleTemplate = sEventTitle;
            sEventTitleTemplate = sEventTitleTemplate.replace("{{eventid}}", jData[i].sID);

            var sEventTemplate = sEvent;
            sEventTemplate = sEventTemplate.replace( "{{eventid}}", jData[i].sID);
            sEventTemplate = sEventTemplate.replace( "{{eventid}}", jData[i].sID);
            sEventTemplate = sEventTemplate.replace( "{{eventtitle}}", jData[i].sTitle);
            sEventTemplate = sEventTemplate.replace( "{{eventtags}}", jData[i].sTag);
            sEventTemplate = sEventTemplate.replace( "{{eventdesc}}", jData[i].sDescription);
            sEventTemplate = sEventTemplate.replace( "{{eventlocation}}", jData[i].sLocation);
            sEventTemplate = sEventTemplate.replace( "{{eventdate}}", jData[i].sDate);
            sEventTemplate = sEventTemplate.replace( "{{eventprice}}", jData[i].sPrice);
            sEventTemplate = sEventTemplate.replace( "{{eventimage}}", jData[i].sImage);
            $(".modal-body").append(sEventTemplate);
            $(".modal-header").append('<span class="close">&times;</span>')
            $(".modal-header").append(sEventTitleTemplate);

            }
        };
    });
});

$(document).on("click", ".btnSaveEventChanges", function(){
    //When we click on the save changes button, submit both our forms. (Edit-event-image is a different AJAX post than edit-event, so it has to be a different form)
    $("#frm-edit-event").submit();
    $("#frm-edit-event-image").submit();
})


$(document).on("submit", "#frm-edit-partner", function(e){

    var formData = new FormData(this); // this is the form and it's data

    $.ajax({
        type: 'POST',
        url: 'api/api-edit-partner.php',
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
    }).done(function(jData){
        if(jData.status == "ok"){
            fnGetAllPartners(); //Reload the partners, to see the new changes.
        }
    })
});

$(document).on("submit", "#frm-edit-partner-image", function(e){

    e.preventDefault(); // do not reload
    var formData = new FormData(this); // this is the form and it's data

    $.ajax({
        type: 'POST',
        url: 'api/api-edit-partner-image.php',
        data: formData,
        cache:false,
        contentType: false, // ?
        processData: false, // ?
    }).done(function(jData){
    })
})

$(document).on('change' , '#partnerImageFile' , function(){
      var preview = new FileReader();
      preview.readAsDataURL( this.files[0]);
      var self = this;
      preview.onload = function(event){
        $(self).parent().parent().siblings(".partnerImagePreview").attr("src", event.target.result);
      }
});



$(document).on("click", ".btnEditPartner", function(){

    $("#myModal").css("display", "block");

    //Loop through the events, and get the rest of the values based on the ID

    var sID = $(this).parent().siblings(".partnerID").text();

    var sPartnerTitle = '<h2>Editing Partner: #{{partnerid}}</h2>';

    var sPartner = '<form method="POST" id="frm-edit-partner" enctype="multipart/form-data">\
                                 <div class="partnerID"> ID:<br><input type="text" name="id" value="{{partnerid}}"></div>\
                                 <div>Name:<br><input type="text" name="name" value="{{partnername}}"></div>\
                                 <div>Website: <br><input type="text" name="website" value="{{partnerwebsite}}"></div>\
                                 <div>E-mail: <br><input type="text" name="mail" value="{{partnermail}}"></div>\
                             </form>\
                             <form method="POST" id="frm-edit-partner-image" enctype="multipart/form-data">\
                                <div class="partnerID2">ID:<br><input type="text" name="id" value="{{partnerid}}"></div>\
                                <div class="partnerImage">Logo: <br><input type="file" id="partnerImageFile" name="image"></div>\
                             </form>\
                             <br><img class="partnerImagePreview" src="../img/partners/{{partnerlogo}}"</img>\
                             <br><br><button type="submit" class="btnSavePartnerChanges">Save changes</button><br>\
                             ';

    var sURL = "api/api-get-all-partners.php";

    $.getJSON(sURL, function(jData){

        $(".modal-body").empty(); //clear before appending.
        $(".modal-header").empty(); //clear before appending.

        for(var i = 0; i < jData.length; i++){

            if(jData[i].sID == sID){

            var sPartnerTitleTemplate = sPartnerTitle;
            sPartnerTitleTemplate = sPartnerTitleTemplate.replace("{{partnerid}}", jData[i].sID);

            var sPartnerTemplate = sPartner;
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerid}}", jData[i].sID);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerid}}", jData[i].sID);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnername}}", jData[i].sPartnerName);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerwebsite}}", jData[i].sPartnerWebsite);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnermail}}", jData[i].sPartnerMail);
            sPartnerTemplate = sPartnerTemplate.replace( "{{partnerlogo}}", jData[i].sPartnerLogo);
            $(".modal-body").append(sPartnerTemplate);
            $(".modal-header").append('<span class="close">&times;</span>')
            $(".modal-header").append(sPartnerTitleTemplate);

            }
        };
    });

});

$(document).on("click", ".btnSavePartnerChanges", function(){
    //When we click on the save changes button, submit both our forms. (Edit-partner-image is a different AJAX post than edit-partner, so it has to be a different form)
    $("#frm-edit-partner").submit();
    $("#frm-edit-partner-image").submit();
})

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal and empty it.

$(document).on("click", ".close", function(){
    modal.style.display = "none";
    $(".modal-body").empty();
    $(".modal-header").empty();
})

// When the user clicks anywhere outside of the modal, close it and empty it.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $(".modal-body").empty();
        $(".modal-header").empty();
    }
}
