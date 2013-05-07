/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
*/
var board_id = "51510e779c649e70160045e2";
var boardLists = function (board_id) {

    Trello.members.get("me", function (member) {
        var $board = Trello.boards.get(board_id)
        var $lists = $("<div>")
            .text("Loading Lists for Board" + $board.fields.name + "...")
            .appendTo("#output");

        Trello.get("board/" + board_id + "/lists", function (lists) {
            $lists.empty();
            //$("<div>").text("Click a list to...").appendTo($lists);

            $.each(lists, function (ix, list) {
                $("<div>")
                    .addClass(list.id)
                    .addClass("list")
                    .text(list.name + " ( " + list.id + " )")
                    .appendTo($lists)
                Trello.get("list/" + list.id + "/cards", function (list_cards) {
                    $list_cards.empty();
                    $.each(list_cards, function (ix, list_card) {
                        $("<li>")
                            .text(list_card.name)
                            .appendTo($list_cards)
                    });
                });

            });
        });
    });
  };