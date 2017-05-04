// The book data (Starts from first page (left hand side))
var KronoriumSource = {
    0 : [
        { date: "April 11th 1945", event: "Richtofen had a thing which did a thing and then the thing ended!" },
        { date: "April 11th 1945", event: "Richtofen had a thing which did a thing and then the thing ended!" }
    ],
    1 : [
        { date: "April 11th 1945", event: "YO PAGE 2 BABAAYYYYYYY" }
    ]
};


$(document).ready(function()
{
    // Inject pages based on the template
    $('#kronorium').append('<div style="background-image:url(images/binding_front.png)"></div>');
    // Current page type (left / right)
    var PageType = 0;
    // Loop through book data
    for (var page in KronoriumSource)
    {
        var BuiltSource = '';
        // Determine page side
        if (PageType == 0) {
            BuiltSource += '<div style="background-image:url(images/page_left.png)"><div class="kron-base-left">';
            PageType = 1;
        }
        else {
            BuiltSource += '<div style="background-image:url(images/page_right.png)"><div class="kron-base-right">';
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
    $('#kronorium').append('<div style="background-image:url(images/binding_end.png)"></div>');
    // Initialize the book
    $("#kronorium").turn(
    {
			// Width
			width: 922,
			// Height
			height: 600,
			// Elevation (Height of page flip)
			elevation: 50,
			// Enable gradients (fading)
			gradients: true,
			// Auto center this flipbook
			autoCenter: true
	});
});