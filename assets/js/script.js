const startTime = 9; //Start at 9AM
var counter = startTime; //Used for incrementing through the hours 9->5

const d = new Date(); //Gets current date
let hour = d.getHours(); //Gets current hour

var timeBlocks = $('.time-block'); //Get timeblock elements

var notes = getSavedNotes(); //Gets all saved notes

$( document ).ready(function() {
    //Displays the current day at top
    $("#currentDay").text($.datepicker.formatDate('DD, M d', new Date())); 
    
    //Fills in saved note values by index of timeblock class element
    for (let i = 0; i < notes.length; i++) {     
        var note = JSON.parse(notes[i]);
        timeBlocks.eq(note.position).val(note.plan);
    }

    //Adds required css class based on relation to current time of the day
    timeBlocks.each(function() {
        if(counter === hour){
            $(this).addClass("present");
        }else if(counter < hour){
            $(this).addClass("past");
        }else{
            $(this).addClass("future");
        }
        counter++;
    });
});

// When save icon is clicked saves the message to local storage with the index the
// message came from
$('.fa-save').click(function(){
    var index = $('.fa-save').index(this);
    var text = timeBlocks.eq(index).val();
  
    var note = {
        plan: text,
        position: index
    }
    window.localStorage.setItem('note'+index, JSON.stringify(note));
});

//Returns an array of all the notes in local storage 
function getSavedNotes(){
    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]));
    }
    return values;
}