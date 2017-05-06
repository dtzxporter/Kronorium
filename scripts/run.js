// The book data
var KronoriumSource = '';
var CurrentLanguage = 'en';

// TODO: Images
// TODO: Language selector
// TODO: Error popups

// RULES:
// Make sure pages don't overflow! Use images if necessary to fill gaps.
// TRIPLE CHECK THAT YOU DIDN'T MISS AN ENTRY!!
// Recommended for data editing: http://www.jsoneditoronline.org/

// Load sounds (Open / close / flip)
var OpenSound = null;
var CloseSound = null;
var FlipSound = null;

$(document).ready(function()
{
    // We must load the specific JSON source for our language
    $.get(('data/' + CurrentLanguage + '/story.json'), BeginLoad).fail(DisplayFail);
});

function DisplayFail() {
    // TODO: Display an error that we couldn't load the defs

}

function SetupArrowKeys() {
    // Hook left / right keys for easy navigation
    $(document).keydown(function(e) {
        // Check key
        switch (e.which) {
            case 37: // left / go back
            $("#kronorium").turn("previous");
            break;
            case 39: // right / go forward
            $("#kronorium").turn("next");
            break;
            default: return; // cancel for other keys
        }
        // Stop default action
        e.preventDefault();
    });
}

function BeginLoad(data) {
    // Set it
    if (typeof data === 'string') {
        KronoriumSource = JSON.parse(data);
    }
    else {
        KronoriumSource = data;
    }
    // Setup page
    SetupPage();
    // Wait 1s to start
    setTimeout(BeginPage, 1000);
    // Hook keys
    SetupArrowKeys();
}

function BeginPage() {
    // Load sounds / begin
    OpenSound = new Howl({
        src: ['sound/open.mp3', 'sound/open.wav', 'sound/open.ogg'],
        onload: function() { SetupInitialAnim(); },
        volume: 0.5
    });
    CloseSound = new Howl({
        src: ['sound/close.mp3', 'sound/close.wav', 'sound/close.ogg'],
        volume: 0.5
    });
    FlipSound = new Howl({
        src: ['sound/flip.mp3', 'sound/flip.wav', 'sound/flip.ogg'],
        volume: 0.5
    });
}

function JumpPage(page) {
    // Go to it
    $("#kronorium").turn('page', page);
}

function BeginLoadCreditsIndex() {
    // Load inside of credit / index in async
    $.get(('data/' + CurrentLanguage + '/credits.html'), function(data) {
        // Inject data to credits
        $('#credits-inject').append($(data));
    }).fail(DisplayFail);
    $.get(('data/' + CurrentLanguage + '/index.html'), function(data) {
        // Inject data to index
        $('#index-inject').append($(data));
    }).fail(DisplayFail);
}

function SetupPage() {
    // Inject pages based on the template
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_front.png)"></div>');
    // Actual binding
    $('#kronorium').append('<div class="hard" style="background-image:url(images/binding_first.png)"></div>');
    // Append placeholders
    $('#kronorium').append($('#credits-inject'));
    $('#kronorium').append($('#index-inject'));
    // Unhide them
    $('#credits-inject').removeClass('hide');
    $('#index-inject').removeClass('hide');
    // Credits / Index
    BeginLoadCreditsIndex();
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
            if (KronoriumSource[page][i].hasOwnProperty('date'))
            {
                // Insert date head
                BuiltSource += '<h3 class="date-head">' + KronoriumSource[page][i]['date'] + '</h3>';
            }
            if (KronoriumSource[page][i].hasOwnProperty('event'))
            {
                // Insert event text
                BuiltSource += '<p class="event-text">' + KronoriumSource[page][i]['event'] + '</p>';
                // Check whether or not to skip spacer
                if (!KronoriumSource[page][i].hasOwnProperty('skipspace') && KronoriumSource[page][i]['skipspace'] != "true")
                {
                    // Insert it
                    BuiltSource += '<div class="event-space"></div>';
                }
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
        // If we turned, we can play it (Unless to closed, (figure out a better closed sound))
        if (page > 2) { FlipSound.play(); }
    });
}