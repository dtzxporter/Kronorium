// The book data (Starts from first page (right hand side))
var KronoriumSource = '';

// TODO: Index with quick links to specific map's pages (Images will work awesome!)
// TODO: The rest of the damn book

// Make sure pages don't overflow! Use images if necessary to fill gaps.

// TRIPLE CHECK THAT YOU DIDN'T MISS AN ENTRY!!

// Recommended for data editing: http://www.jsoneditoronline.org/

// Load sounds (Open / close / flip)
var OpenSound = null;
var CloseSound = null;
var FlipSound = null;

$(document).ready(function()
{
    // We must load the specific JSON source for our language (EN for now)
    $.get(('data/en.json'), BeginLoad).fail(DisplayFail);
});

function DisplayFail() {
    // TODO: Display an error that we couldn't load the language defs

}

function BeginLoad(data) {
    // Set it
    KronoriumSource = JSON.parse(data);
    // Setup page
    SetupPage();
    // Load sounds
    OpenSound = new Howl({
        src: ['sound/open.mp3', 'sound/open.wav', 'sound/open.ogg'],
        onload: function() { SetupInitialAnim(); }
    });
    CloseSound = new Howl({
        src: ['sound/close.mp3', 'sound/close.wav', 'sound/close.ogg']
    });
    FlipSound = new Howl({
        src: ['sound/flip.mp3', 'sound/flip.wav', 'sound/flip.ogg']
    });
}

function SetupPage() {
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
            // Check if it's an image
            if (KronoriumSource[page][i].hasOwnProperty('img'))
            {
                // Embed an image here
                BuiltSource += KronoriumSource[page][i]['img'];
            }
            else
            {
                // Normal source
                BuiltSource += '<h3 class="date-head">' + KronoriumSource[page][i]['date'] + '</h3>';
                BuiltSource += '<p class="event-text">' + KronoriumSource[page][i]['event'] + '</p>';
                BuiltSource += '<div class="event-space"></div>';
            }
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
    // Disable it for the opening effect
    $("#kronorium").turn("disable", true);
}

function SetupInitialAnim() {
    // Add the shake effect, play sound, then countdown to open
    $('#kronorium').addClass('shake shake-constant');
    // Play
    OpenSound.play();
    // Time
    setTimeout(EnableBookOpen, 1600);
}

function EnableBookOpen() {
    // Enable the book, open to first page, stop shake
    $('#kronorium').removeClass('shake shake-constant');
    // Enable
    $("#kronorium").turn("disable", false);
    // Turn
    $("#kronorium").turn("page", 2);
    // Hook page turning
    $("#kronorium").bind("turning", function(event, page, view)
    {
        // If we turned, we can play it (Unless to closed, then play closed)
        if (page > 2) { FlipSound.play(); }
    });
}