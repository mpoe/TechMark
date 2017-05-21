/*
    Function to get url parameters, from any value, e.g id, from, to etc.
*/
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function fnAddNavigation(){

//Prepend the header navigation (1st item in body)

$("body").prepend('<nav class="navigation">\
\
                  <a href="index.html" class="logolinkcontainer">\
                    <img src="./img/techmarkWhite.png" alt="Techmark logo" class="logo"></img>\
                  </a>\
\
                    <div class="navitems">\
                        <ul>\
                            <a href="index.html">Home</a>\
                            <a href="searchResults.html">Events</a>\
                            <a href="about-us.html">About us</a>\
                            <a href="partners.html">Partners</a>\
                            <a href="contact.html">Contact us</a>\
                            <input class="navigationSearch" placeholder="Search for events...">\
                            <i id="btnMenuSearch" class="fa fa-search"></i>\
                        </ul>\
                    </div>\
                 </nav>');

//Append the footer (last item in body)

$("body").append('<footer>\
    <div id="footerMain">\
        <div class="row footerLevel1">\
        <h3>Subscribe to our newsletter</h3>\
    <input type="text" class="txtSubscribe" placeholder="Enter your email">\
        <button class="btnSubscribe">Subscribe</button>\
        </div>\
        <div class="row footerLevel2">\
        <div class="leftfooter">\
        <img src="./img/techmarkWhite.png" alt="Techmark logo" class="footerlogo">\
        </div>\
        <div class="centerfooter">\
        <div >\
        <ul>\
        <li>Email: info@techmark.dk</li>\
    <li>Phone: (+45) 51 22 11 92</li>\
    <li>Address: Nørregade 26, KBH K 1165</li>\
    </ul>\
    </div>\
    </div>\
    <div class="rightfooter">\
        <div id="socialMedia">\
        <i class="fa fa-facebook-square" aria-hidden="true"></i>\
        <i class="fa fa-linkedin-square" aria-hidden="true"></i>\
        <i class="fa fa-instagram" aria-hidden="true"></i>\
        <i class="fa fa-google-plus-square" aria-hidden="true"></i>\
        </div>\
        </div>\
        </div>\
        </div>\
        <div id="footerUnder"><p>Copyright TechMark A/S - All rights reserved</p></div>\
    </footer>')
}
if(window.location.href.indexOf("searchResults.html") > -1)
  fnSearchEvents(getUrlParameter('search'));


//In the header menu, you can search by clicking enter, or pressing the search icon.
function fnSearchOnEnter() {
  $(".navigationSearch").keyup(function(event){
      if(event.keyCode == 13)
        window.location.href = "searchResults.html?search=" +$('.navigationSearch').val();
  });
}

$(document).on("click", "#btnMenuSearch", function(e){
  window.location.href = "searchResults.html?search=" +$('.navigationSearch').val();
});


function fnSearchEvents(sWord) {
  var date = new Date();
  var day = date.getDate();
  var month = ("0" + (date.getMonth() + 1)).slice(-2)
  var year = date.getFullYear();

  $('#date').attr('placeholder', year+ '-' +month+ '-' +day);
  $('.searchTerm').val(sWord);
  $('#search-results').html('');
  $.getJSON('data/events.txt', function(oData) {
    var sAppend = '<div class="row">';
    var iCount = 0;
    var sExp = "/" +sWord+ "/";

    // TODO: When we have the right formats, do the filtering
    $.each(oData, function(index, oEvent) {
      if(sWord != "" && !oEvent.sTitle.includes(sWord))
        return true;

      if($('#location').val() != "" && !oEvent.sLocation.includes($('#location').val()))
        return true;

      if($('#tags').val() != "" && !oEvent.sTag.includes($('#tags').val()))
        return true;

      if($('#date').val() != "" && oEvent.sDate != $('#date').val())
        return true;

      sAppend += '<div class="box">' +oEvent.sTitle+ '</div>';

      if(iCount == 2 || index == oData.length-1) {
        sAppend += '</div><div class="row">';
        iCount = 0;
      } else
        iCount++;
    });
    $('#search-results').append(sAppend);
  })
}

$(document).on("click", ".searchBtn", function(e){
  e.preventDefault();
  fnSearchEvents($('.searchTerm').val());
});


$(".searchTerm").keyup(function(event){
    if(event.keyCode == 13)
      fnSearchEvents($('.searchTerm').val());
});

$(document).on("click", "#btnFindMoreEvents", function(){
  window.location.href = "searchResults.html";
});
