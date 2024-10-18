var bookAdmin = (function ($) {

    function RenderListBook() {
        $.ajax({
            url: "/Admin/Book/GetGridData",
            type: 'POST',
            data: {  },
            success: function (res) {
                $('#grid').html(res);
            }
        });
    }

    function init() {
        RenderListBook()
    }

    return {
        init
    }
})(jQuery);

$(function () {
    bookAdmin.init();
});
