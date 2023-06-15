//= require jquery
//= require jquery-ui

//= require bootstrap-sprockets

//= require angular
//= require angularDevise
//= require angular-cookies
//= require angular-rails-templates
//= require angular-ui-bootstrap-tpls
//= require angular-ui-router

//= require angular-animate
//= require angular-aria
//= require angular-material

//= require toastr

//= require angular-ui-sortable

//= require_tree .

// Toastr
$(document).ready(function() {
    //toastr
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "progressBar": true,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
})
