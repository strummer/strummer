/* Builder.js - Contains base logic for builder prototype */

$(document).ready(function() {
  $(document).keydown(function(e) {
    if(e.which == 192) {
      toggleBuilder(this);
    }
  });
  $('.button.ui').click(function() {
    toggleBuilder(this);
  });
});

function toggleBuilder(object) {
  $('nav').toggleClass('selected');
  $(this).toggleClass('selected');
}