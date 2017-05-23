/*
    Function to get url parameters, from any value, e.g id, from, to etc.
*/
function fnGetUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam)
      return sParameterName[1] === undefined ? true : sParameterName[1];
  }
};

function fnAddNavigation(){
//Prepend the header navigation (1st item in body)

$("header").prepend('<nav class="navigation">\
    <div class="logolinkcontainer">\
        <a href="index.html"><img src="./img/techmarkWhite.png" alt="Techmark logo" class="logo"></a>\
      </div>\
    </div>\
    <div class="navitems">\
      <ul>\
        <a href="index.html">Home</a>\
        <a href="searchResults.html">Events</a>\
        <a href="about-us.html">About us</a>\
        <a href="partners.html">Partners</a>\
        <a href="contact.html">Contact us</a>\
        <div class="menuSearch">\
            <input class="navigationSearch" placeholder="Search for events...">\
            <button class="btnMenuSearch fa">&#xf002;</button>\
        </div>\
      </ul>\
    </div>\
    <div class="mobile-nav">\
      <div class="menu-btn" id="menu-btn">\
        <div>\
          <span></span>\
          <span></span>\
          <span></span>\
        </div>\
      </div>\
      <div class="responsive-menu">\
        <ul id="mobileMenu">\
          <a href="index.html">Home</a>\
          <a href="searchResults.html">Events</a>\
          <a href="about-us.html">About us</a>\
          <a href="partners.html">Partners</a>\
          <a href="contact.html">Contact us</a>\
          <div class="menuSearch">\
            <input class="navigationSearch" placeholder="Search for events...">\
            <button class="btnMenuSearch fa">&#xf002;</button>\
          </div>\
        </ul>\
      </div>\
    </div>\
  </nav>');

//Append the footer (last item in body)

$("body").append(
  '<footer>\
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
  </footer>');
}
function formatDate(date) {
  var monthNames = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN", "JUL",
    "AUG", "SEP", "OCT",
    "NOV", "DEC"
  ];
  var dayNames = [
    "SUN", "MON", "TUE",
    "WED", "THU", "FRI", "SAT"
  ];

  var day = date.getDate();
  var ampm = (hours >= 12) ? "PM" : "AM";
  var hours = (date.getHours()<10?'0':'') + date.getHours();
  var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
  var dayIndex = date.getDay();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + day+ ' ' +hours+ ':' +minutes+ ' ' +ampm;
}
function fnSearchEvents(sWord) {
  var date = new Date();
  var day = date.getDate();
  var month = ("0" + (date.getMonth() + 1)).slice(-2)
  var year = date.getFullYear();

  $('#date').attr('placeholder', year+ '-' +month+ '-' +day);
  $('.searchTerm').val(sWord);
  $('#search-results').html('');
  $.getJSON('data/events.txt', function(oData) {
    var sAppend = '<div class="row events">';
    var iCount = 0;
    var sExp = "/" +sWord+ "/";

    $.each(oData, function(index, oEvent) {
      if(typeof sWord !== "undefined" && sWord != "" && !oEvent.sTitle.includes(sWord))
        return true;

      if(typeof $('#location').val() !== "undefined" && $('#location').val() != "" && !oEvent.sLocation.includes($('#location').val()))
        return true;

      if(typeof $('#tags').val() !== "undefined" && $('#tags').val() != "" && !oEvent.sTag.includes($('#tags').val()))
        return true;

      if(typeof $('#date').val() !== "undefined" && $('#date').val() != "" && oEvent.sDate != $('#date').val())
        return true;

      sAppend +=
        '<div data-id="' +oEvent.sID+ '" class="event-box box">\
          <div class="boxContentWrapper">\
            <div class="fpBoxTop">\
              <img class="eventimg" src="img/events/' +oEvent.sImage+ '" alt="' +oEvent.sTitle+ '">\
              <div class="price">' +oEvent.sPrice+ '</div>\
            </div>\
            <div class="fpBoxContent">\
              <div class="fpTimeDate">\
                <p>' +formatDate(new Date(oEvent.sDate))+ '</p>\
              </div>\
              <div class="fpEventTitle">\
                <h3>' +oEvent.sTitle+ '</h3>\
              </div>\
              <div class="fpLocation">\
                <div class="fploc"><p>' +oEvent.sLocation+ '</p></div>\
                <div class="fpmap"><i class="fa fa-map-marker" title="See location on Google maps" aria-hidden="true"></i></div>\
              </div>\
            </div>\
          </div>\
        </div>';

      if(iCount == 2 || index == oData.length-1) {
        sAppend += '</div><div class="row events">';
        iCount = 0;
      } else
        iCount++;
    });
    $('#search-results').append(sAppend);
  });
}
var globalEvent = "";
function fnGetEvent(eventID) {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $.getJSON('data/events.txt', function(oData) {
    var oEvent = oData.find(function(e) { return e.sID == eventID });
    globalEvent = oEvent;
    $('#title').html(oEvent.sTitle);
    $('#month').html(monthNames[new Date(oEvent.sDate).getMonth()]);
    $('#day').html(new Date(oEvent.sDate).getUTCDate());
    $('#day-name').html(dayNames[new Date(oEvent.sDate).getDay()]);
    $('header').css('background-image', 'url(img/events/' +oEvent.sImage+ ')').css('background-size', 'cover');
    $('.textContent').html(oEvent.sDescription);
  });
}
function isValidEmail(sEmail) {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return pattern.test(sEmail);
}

if(window.location.href.indexOf("searchResults.html") > -1 || window.location.href.indexOf("index.html") > -1)
  fnSearchEvents(fnGetUrlParameter('search'));

if(window.location.href.indexOf("event.html") > -1)
  fnGetEvent(fnGetUrlParameter('id'));

//In the header menu, you can search by clicking enter, or pressing the search icon.
function fnSearchOnEnter() {
  $(".navigationSearch").keyup(function(event){
    if(event.keyCode == 13)
      window.location.href = "searchResults.html?search=" +$('.navigationSearch').val();
  });
}

$(document).on("click", ".btnMenuSearch", function(e){
  window.location.href = "searchResults.html?search=" +$('.navigationSearch').val();
});

$(document).on("click", ".event-box", function(e){
  window.location = 'event.html?id=' +$(this).attr('data-id');
});

$(document).on("click", ".searchBtn", function(e){
  e.preventDefault();
  fnSearchEvents($('.searchTerm').val());
});

$(document).on("click", ".btnSubscribe", function(e){
  if(!isValidEmail($('.txtSubscribe').val()))
    alert("Invalid email, please try again.");
  else
    alert("Thank you! You're now subscribed!");
});

$(".searchTerm").keyup(function(event){
  if(event.keyCode == 13)
    fnSearchEvents($('.searchTerm').val());
});

$(document).on("click", "#add-to-calendar", function(){
  console.log(globalEvent);
  window.location.href = "http://www.google.com/calendar/event?action=TEMPLATE&text=" +globalEvent.sTitle+ "&dates=" +globalEvent.sDate+ "/" +globalEvent.sDate+ "&details=" +globalEvent.sDescription+ "&location=" +globalEvent.sLocation+ "&trp=false&sprop=&sprop=name:";
});

$(document).on("click", "#btnFindMoreEvents", function(){
  window.location.href = "searchResults.html";
});

$(document).on("click", "#EventregisterButton button", function(){
  //Show Modal
  $('#event-title').html($('#title').html());
  $("#registerEvent").css("display", "block").css('z-index', '99999');
});
$(document).on("click", ".close", function(){
  $("#registerEvent").css('display', 'none');
});
$(document).on("click", ".btnRegisterForEvent", function(){
  $("#registerEvent").css('display', 'none');
  alert("You're now attending the Event!");
});

/*Responsive menu toggling */
$(function($){
  $('.menu-btn').click(function(){
    $('.responsive-menu').toggleClass('expand')
  });
});
