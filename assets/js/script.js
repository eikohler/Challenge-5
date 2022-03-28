const startTime = 9;
var counter = startTime;

const d = new Date();
let hour = d.getHours();

var timeBlocks = $('.time-block');

var notes = getSavedNotes();

$( document ).ready(function() {
    $("#currentDay").text($.datepicker.formatDate('DD, M d', new Date()));
    
    for (let i = 0; i < notes.length; i++) {     
        var note = JSON.parse(notes[i]);
        timeBlocks.eq(note.position).val(note.plan);
    }

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

$('.fa-save').click(function(){
    var index = $('.fa-save').index(this);
    var text = timeBlocks.eq(index).val();
  
    var note = {
        plan: text,
        position: index
    }
    window.localStorage.setItem('note'+index, JSON.stringify(note));
});

function getSavedNotes(){
    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]));
    }
    return values;
}