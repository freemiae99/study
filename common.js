$(function(){
    tabUI();
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

        $scrollWrap.animate({'scrollLeft': $this.parent('li').position().left}, 150);
        console.log($this.parent('li').position().left)

    }) 

}