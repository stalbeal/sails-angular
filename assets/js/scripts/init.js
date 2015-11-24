(function($) {
    $(function() {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('select').material_select();
        $(".button-collapse").sideNav();
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({
            delay: 50
        });
          $('.slider').slider({height:500});
         
        $('.collapsible').collapsible();
    $('ul.tabs').tabs();
    


    }); // end of document ready
})(jQuery); // end of jQuery name space