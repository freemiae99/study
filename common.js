$(function(){
    tabUI();
    reviewStar();
    allCheck();
});

//tab
//왜 동작은 다되는데 같이먹는거냐 on같이나옴 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
var tabUI = function(){
    //wai-aria html에 나오게 기본셋팅
    var $tab = $('.ul-tab');     
    $tab.find('li.on').find('>a').attr({'title':'선택됨','aria-selected':'true'});
    $tab.find('li.on').siblings().find('>a').attr('aria-selected','false').removeAttr('title');

   

     //tab 초기화 (의미를 모름 ㅜㅜ 으어 )
     const tabInit = function() {
        $('.ul-tab').each(function() {
            const firstText = $(this).find('.ul-tab li:first-child a').text();

            $(this).find('.ul-tab li:first-child').addClass('on')
                .children('a').attr({'aria-selected': true, 'title': '선택됨'})
                .parent('li').siblings('li').children('a').attr({'aria-selected': false})
                .parents('.ul-tab').find('.tab_panel:eq(0)').text(firstText).addClass('on');
        });
    }
    tabInit();
 
    //기본탭
    $(document).on('click','.ul-tab a',function(e){
        e.preventDefault;
        var $this = $(this);
        var idx = $this.parent('li').index();

        //소스를 합치고싶다 scroll로 분기태워서 ㅜㅜㅜㅜㅜㅜ

        $this.attr({'aria-selected': true, 'title': "선택됨"})
        .parent('li').addClass('on')
        .siblings('li').removeClass('on')
        .children('a').attr({'aria-selected': false}).removeAttr('title')
        .parents('.ul-tab').find('.tab_panel').eq(idx).addClass('on').siblings('.tab_panel').removeClass('on');
        
    }); 

    //혬1004ver
 
    // $(document).on('click','.scroll_list a', function(e){
    //     e.preventDefault();
    //     var $this = $(this);
    //     var idx = $this.parent('li').index();
    //     var $scrollWrap = $this.parents('.scroll_list');
    //     var positionLeft = $this.parent('li').position().left + Number($this.parent('li').css('marginLeft').replace(/[^0-9]/g, ''));
    //     var scrollLeft = $scrollWrap.scrollLeft();

    //     $this.attr({'aria-selected': true, 'title': "선택됨"})
    //       .parent('li').addClass('on')
    //       .siblings('li').removeClass('on')
    //       .children('a').attr({'aria-selected': false}).removeAttr('title')
    //       .parents('.ul-tab').find('.tab_panel').eq(idx).addClass('on').siblings('.tab_panel').removeClass('on');

    //     $scrollWrap.animate({'scrollLeft': positionLeft + scrollLeft}, 150);
    // }) 

     $(document).on('click','.scroll_list a', function(e){
        e.preventDefault();
        var $this = $(this);
        var $scrollWrap = $this.parents('.scroll_list');
        var positionLeft = $this.parent('li').position().left;
        var scrollLeft = $scrollWrap.scrollLeft();
        $scrollWrap.animate({'scrollLeft': positionLeft + scrollLeft}, 150); //컨닝 ㅜㅜ 왜 스크럴 값을 더하는지 이해가 안감 ㅜㅜ 
        // console.log($this.parent('li').position().left)

    }) 
}

// var reviewStar = function(){
//     $(document).on('click','.star_item .star', function(e){
//         var idx = $(this).index();
//         $(this).parent().children('span').removeClass('on');
//         $(this).addClass('on').prevAll('span').addClass('on');
//         $(this).parents('.star_inner').find('.star_text').eq(idx).addClass('on').siblings('.star_text').removeClass('on').siblings('.default').remove(); //parent 에서 안끊고 아래로 내려서 하니까 첫번째 텍스트 가출가출 집나가버림 왓?
//     });
// }
var reviewStar = function(){
    //aria 및 tabIndex 속성 추가
    function reviewInit() {
        $('.review_area .star').each(function() {
            $(this).attr({
                ariaLabel: `평점 ${$(this).index()+1}점`, 
                tabIndex: 1
            });
        });
    }
    reviewInit();
    $(document).on('click','.star_item .star', function(e){
        var idx = $(this).index();
        $(this).parent().children('span').removeClass('on');
        $(this).addClass('on').prevAll('span').addClass('on');
        $(this).parents('.star_inner').find('.star_text').eq(idx).addClass('on').siblings('.star_text').removeClass('on').siblings('.default').remove(); //parent 에서 안끊고 아래로 내려서 하니까 첫번째 텍스트 가출가출 집나가버림 왓?
        var $msg = $(this).parent().siblings('strong');
        var msgArray = [
            '별로예요',         //1점
            '조금 아쉬워요',     //2점
            '보통이예요',       //3점
            '좋아요',          //4점
            '최고예요'          //5점
        ];

        // $(this).parent().children('span').removeClass('on');
        // $(this).addClass('on').prevAll('span').addClass('on');
        // $(this).parents('.star_inner').find('.star_text').eq(idx).addClass('on').siblings('.star_text').removeClass('on').siblings('.default').remove(); //parent 에서 안끊고 아래로 내려서 하니까 첫번째 텍스트 가출가출 집나가버림 왓?

        //star on💡
        $(this).addClass('on').prevAll('.star').addClass('on'); //$(this)가 아닌 곳에서 줄바꿈하면 동작이 이상한 것 같다😂
        $(this).nextAll('.star').removeClass('on');

        //text change
        $msg.text(msgArray[idx]).addClass('star_text');
    });
    //키보드 조작 추가
    $(document).on('keydown', '.star_item .star', function(e) {
        if (e.keyCode == 13) {
            $(this).click();
        }
    })
}

var allCheck = function(){
    $(document).on('click','.agree_box .check_all', function(e){
       $(this).next().find('.check_list input[type=checkbox]').prop('checked',true);
    });
}
