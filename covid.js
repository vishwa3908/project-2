$(document).on('click','ul li',function(){
    $('this').addClass('active');
});
$('document').ready(function() {

    $(".toggle").click(function() {
        $(".navbar").toggleClass("collapse");
    })
});