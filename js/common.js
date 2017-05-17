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
                    <img src="./img/techmarkLogoNoText.svg" alt="Techmark logo" class="logo"></img>\
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
                        </ul>\
                    </div>\
                 </nav>');

//Append the footer (last item in body)

$("body").append('<footer class="pageFooter">\
    <div class="leftfooter">\
        <a href="index.html">News</a><br>\
        <a href="index.html">Videos</a><br>\
        <a href="searchResults.html">Events</a>\
    </div>\
    <div class="centerfooter">\
        <a href="about-us.html">About Us</a><br>\
        <a href="contact.html">Contact Us</a><br>\
        <a href="partners.html">Become a Partner</a>\
    </div>\
    <div class="rightfooter">\
        <input type="text" class="txtSubscribe" placeholder="Subscribe to the Techmark newsletter">\
        <button class="btnSubscribe">Subscribe</button>\
    </div>\
</footer>')

}
