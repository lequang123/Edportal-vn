var home = (function ($) {
    function HandlePaging(){
        $(document).on('click', '.page', function() {
            console.log(123);
            var currentPage = $(this).parent().data('current');
            var selectedPage = $(this).data('page');
            RenderPaging(selectedPage, 10, '.paging-interest')
        });
    }

    function RenderPaging(page, totalPages, element) {
        var html = ''
        if(page != 1) {
            html += '<li class="page" data-page="1"> << </li>';
            html += '<li class="page" data-page="'+ (page - 1) +'"> < </li>';
        }
        if(page == 1) {
            html += '<li class="page active" data-page="1">1</li>';
            html += '<li class="page" data-page="'+ (page + 1) +'">'+ (page + 1) +'</li>';
            html += '<li class="page" data-page="'+ (page + 2) +'">'+ (page + 2) +'</li>'
        } else if (page == totalPages) {
            html += '<li class="page" data-page="'+ (page - 2) +'">'+ (page - 2) +'</li>';
            html += '<li class="page" data-page="'+ (page - 1) +'">'+ (page - 1) +'</li>';
            html += '<li class="page active" data-page="'+ page +'">'+ page +'</li>'
        } else {
            html += '<li class="page" data-page="'+ (page - 1) +'">'+ (page - 1) +'</li>';
            html += '<li class="page active" data-page="'+ page +'">'+ page +'</li>';
            html += '<li class="page" data-page="'+ (page + 1) +'">'+ (page + 1) +'</li>'
        }
        if(page !== totalPages) {
            html += '<li class="page" data-page="'+ page + 1 +'">></li>';
            html += '<li class="page" data-page="'+ totalPages +'">>></li>';
        }
        $(element).html(html);
    }

    function init() {
        HandlePaging();
    }

    return {
        init
    }
})(jQuery);

$(function () {
    home.init();
});
