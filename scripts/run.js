// The book data (Starts from first page (right hand side))
var KronoriumSource = {
    0 : [
        { date: "April 11th 1945", event: "Richtofen had a thing which did a thing and then the thing ended!" },
        { date: "April 11th 1945", event: "Richtofen had a thing which did a thing and then the thing ended!" }
    ],
    1 : [
        { date: "April 11th 1945", event: "YO PAGE 2 BABAAYYYYYYY" }
    ]
};

// General rule of thumb: Format so we have a left and a right page before the end, so it looks natural.

$(document).ready(function()
{
    // Inject pages based on the template
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_front.png)"></div>');
    // Actual binding
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_front.png)"></div>');
    // Current page type (right, then left) (0, 1)
    var PageType = 0;
    // Loop through book data
    for (var page in KronoriumSource)
    {
        var BuiltSource = '';
        // Determine page side
        if (PageType == 0) {
            BuiltSource += '<div style="background-image:url(images/page_right.png)"><div class="kron-base-right">';
            PageType = 1;
        }
        else {
            BuiltSource += '<div style="background-image:url(images/page_left.png)"><div class="kron-base-left">';
            PageType = 0;
        }
        // Build events
        for (var i = 0; i < KronoriumSource[page].length; i++)
        {
            BuiltSource += '<h3 class="date-head">' + KronoriumSource[page][i]['date'] + '</h3>';
            BuiltSource += '<p class="event-text">' + KronoriumSource[page][i]['event'] + '</p>';
            BuiltSource += '<div class="event-space"></div>';
        }
        // Add it
        $('#kronorium').append(BuiltSource + '</div></div>');
    }
    // Backing
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_end.png)"></div>');
    // Initialize the book
    $("#kronorium").turn(
    {
        width: 922,
        height: 600,
        elevation: 50,
        gradients: false,
        autoCenter: true
	});
});