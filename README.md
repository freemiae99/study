![header](https://capsule-render.vercel.app/api?text=Hello%World!&fontColor=d6ace6)



## 탭구현해보기

wai-aria 추가해서 jQuery로 구현 갈길이 멀구나 ㅠㅠ




## List

* [기본탭](https://freemiae99.github.io/study/html.html)
* 스크롤탭


## html
```html
//기본탭구조
<div class="tab ul-tab">
    <ul class="tab_list" role="tablist">
        <li class="on"><a href="#con01" role="button">탭1</a></li>
        <li><a href="#con02" role="button">탭2</a></li>
        <li><a href="#con03" role="button">탭3</a></li>
    </ul>
    <div id="con01" class="tab_panel on" role="tabpanel">탭1내용</div>
    <div id="con02" class="tab_panel" role="tabpanel">탭2내용</div>
    <div id="con03" class="tab_panel" role="tabpanel">탭3내용</div>
</div>
```

## JS
```javascript
//wai-aria html에 나오게 기본셋팅
var $tab = $('.ul-tab');     
    $tab.find('li.on').find('>a').attr({'title':'선택됨','aria-selected':'true'});
    $tab.find('li.on').siblings().find('>a').attr('aria-selected','false').removeAttr('title');

//탭구현
var $this = $(this);
    var idx = $this.parent('li').index(); //li의 갯수를 찾아라 
    $this.attr({'aria-selected': true, 'title': "선택됨"}) //선택된 a태그에 aria속성추가
    .parent('li').addClass('on') //선택된 li에 on클래스추가
    .siblings('li').removeClass('on') //선택된 li 빼고 모든형제들 remove
    .children('a').attr({'aria-selected': false}).removeAttr('title') //선택안된애들 title속성 빼주고 aria속성 바꾸고 
    .parents('.ul-tab').find('.tab_panel').eq(idx).addClass('on').siblings('.tab_panel').removeClass('on'); //tab_panel을 찾아서 아까 위에서 li에 맞는 내용을 찾아서 on시키기

```