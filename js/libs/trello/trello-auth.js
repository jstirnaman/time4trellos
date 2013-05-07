/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api
*/

var onAuthorize = function () {
    updateLoggedIn();
    Trello.members.get("me", function (member) {
      $("#fullName").text(member.fullName);
    });
    $("#output").empty();
};

var updateLoggedIn = function () {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);
};

var logout = function () {
    Trello.deauthorize();
    updateLoggedIn();
};

Trello.authorize({
    interactive: false,
    success: onAuthorize,
    name: "Trellos"
});

$("#connectLink")
    .click(function () {
    Trello.authorize({
        type: "popup",
        success: onAuthorize,
        scope: {
            write: true,
            read: true
        }
    })
});

$("#disconnect").click(logout);