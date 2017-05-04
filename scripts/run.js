// The book data (Starts from first page (right hand side))
var KronoriumSource = {
    0 : [
        { date: "IN THE BEGINNING", event: "There was only the Aether and the Keepers. Among them were two beings who would later be known by many names. One would be known as Doctor Monty, the other as the Shadowman" },
        { date: "SEPTEMBER 3RD, 5AD", event: "Knowing the planet has a gateway to Agartha, the Apothicons send meteors of Element 115 to Earth. They believe humanity will one day use Element 115 to wage war amongst themselves, opening a rift that will allow the Apothicons to escape the Dark Aether." },
        { date: "JANUARY 15TH, 1292", event: "The Great War between humanity and the Apothicons begins." },
        { date: "APRIL 14TH, 1294", event: "Sir Pablo Marinus is saved from the clutches of a Margwa by the four unknown heroes. They would later become known as Primis." }
    ],
    1 : [
        { date: "DECEMBER 32ST, 1299", event: "Together with the Keepers, Primis defeats the Apothicons, bringing the Great War to an end." },
        { date: "JANUARY 1ST, 1300", event: "Before they seemingly disappear from history, Primis instructs the Wolf King to begin building Der Eisendrache." },
        { date: "SEPTEMBER 19TH, 1318", event: "Honoring the Wolf King's dying request, his loyal servant Arthur scatters and buries his bones in the grounds of Der Eisendrache, accompanied by the King's Wolf." },
        { date: "SEPTEMBER 20th, 1318", event: "Temporal Rifts teleport Arthur to Resolution 1295 in 2025 Angola." },
        { date: "JUNE 30TH, 1908", event: "A meteor containing Element 115 crashes near the Stony Tunguska River." }
    ],
    2 : [
        { date: "AUGUST 30TH, 1925", event: "Doctor Edward Richtofen joins the Illuminati." },
        { date: "FEBRUARY 4TH, 1931", event: "Large deposits of Element 115 are discovered near Breslau Germany. Doctor Ludvig Maxis, a german scientist, is sent to investigate." }
    ]
};

// General rule of thumb: Format so we have a left and a right page before the end, so it looks natural.

// TODO: Index with quick links to specific map's pages (Images will work awesome!)
// TODO: The rest of the damn book

$(document).ready(function()
{
    // Inject pages based on the template
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_front.png)"></div>');
    // Actual binding
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_first.png)"></div>');
    // Current page type (right, then left) (0, 1)
    var PageType = 0;
    var PageCount = 0;
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
        PageCount++;
        // Add it
        $('#kronorium').append(BuiltSource + '</div></div>');
    }
    // Check to add a blank page
    if (PageCount % 2 != 0)
    {
        // Add blank
        $('#kronorium').append('<div style="background-image:url(images/page_left.png)"></div>');
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