$( document ).ready(function() {
    $("#currentDay").text($.datepicker.formatDate('DD, M d', new Date()));
});