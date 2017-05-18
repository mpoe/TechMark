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
                    <img src="./img/TechmarkLogo.png" alt="Techmark logo" class="logo"></img>\
                  </a>\
\
                    <div class="navitems">\
                        <ul>\
                            <a href="index.html">Home</a>\
                            <a href="searchResults.html">Events</a>\
                            <a href="about-us.html">About us</a>\
                            <a href="partners.html">Partners</a>\
                            <a href="contact.html">Contact us</a>\
                            <input type="search" class="navigationSearch" placeholder="Search for events...">\
                            <button>Search</button>\
                        </ul>\
                    </div>\
                 </nav>');

//Append the footer (last item in body)

$("body").append('<footer>\
    <div id="footerMain">\
    <div class="leftfooter">\
              <img src="./img/techmarkWhite.png" alt="Techmark logo" class="footerlogo">\
    </div>\
    <div class="centerfooter">\
            <div >\
                <ul>\
                        <li>Email: info@techmark.dk</li>\
                        <li>Phone: (+45) 51 22 11 92</li>\
                        <li>Address: Nørregade 26 1.sal tv KBH K 1165</li>\
                        <li>Opening hours: 10:00 to 16:00 Monday to Friday</li>\
                </ul>\
            </div>\
    </div>\
    <div class="rightfooter">\
        <h3>Subscribe to our newsletter</h3>\
        <input type="text" class="txtSubscribe" placeholder="Enter your email">\
        <button class="btnSubscribe">Subscribe</button>\
    </div>\
    </div>\
    <div id="footerUnder"><p>Copyright TechMark A/S - All rights reserved</p></div>\
</footer>')

}

function fnSearchOnEnter() {

$(".navigationSearch").keyup(function(event){
    if(event.keyCode == 13){ //Enter key
        window.location.href = "searchResults.html";
    }

});

}

$(document).on("click", "#btnFindMoreEvents", function(){
    window.location.href = "searchResults.html";
});