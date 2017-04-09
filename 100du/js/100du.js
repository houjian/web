/**
 * Created by Administrator on 2016/8/22.
 */
$(function() {
    // 搜索切换
    (function() {
        var aLi = $('#menu li');
        var oText = $('#search .form').find('.text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var iNow = 0;
        oText.val(arrText[iNow]);
        aLi.each(function(index) {
            $(this).click(function() {
                //console.log(index);
                aLi.attr('class', 'gradient');
                $(this).attr('class', 'active');
                iNow = index;
                oText.val(arrText[iNow]);
            });
        });

        oText.focus(function() {
            //console.log(1);
            if ($(this).val() === arrText[iNow]) {
                $(this).val('');
            }
        });
        oText.blur(function() {
            //console.log(1);
            if ($(this).val() === '') {
                $(this).val(arrText[iNow]);
            }
        });
    })();

    // update文字弹性滑动
    (function() {
        var oUpdate = $('.update');
        var oUl = oUpdate.find('ul');
        var iH = 0;
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'#' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'#' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'#' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'#' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'#' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'#' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'#' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'#' }
        ];
        var str = '';
        var oBtnUp = $('#updateUpBtn');
        var oBtnDown = $('#updateDownBtn');
        var iNow = 0;
        var timer = null;

        for (var i = 0; i < arrData.length; i++) {
            str += '<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> '+arrData[i].title+'</a></li>';
        }
        oUl.html(str);
        iH = oUl.find('li').height();

        oBtnUp.click(function() {
            doMove(-1);
        });
        oBtnDown.click(function() {
            doMove(1);
        });
        oUpdate.hover(function() {
            clearInterval(timer);
        }, function() {
            autoPlay();
        });

        function autoPlay() {
            timer = setInterval(function() {
                doMove(-1);
            }, 3000);
        }
        autoPlay();

        function doMove(num) {
            iNow += num;
            if (Math.abs(iNow) > arrData.length - 1) {
                iNow = 0;
            }
            if (iNow > 0) {
                iNow = -(arrData.length - 1);
            }
            oUl.stop().animate({'top':iH*iNow}, 2000, 'elasticOut');
        }
    })();

    // options选项卡
    (function() {
        fnTab($('.tabNav1'), $('.tabCon1'));
        fnTab($('.tabNav2'), $('.tabCon2'));
        fnTab($('.tabNav3'), $('.tabCon3'))
        fnTab($('.tabNav4'), $('.tabCon4'));

        function fnTab(oNav, oCon) {
            var aElem = oNav.children();
            oCon.hide().eq(0).show();

            aElem.each(function(index) {
                $(this).click(function() {
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class', 'triangle_down_gray');
                    $(this).find('a').attr('class', 'triangle_down_red');
                    oCon.hide().eq(index).show();
                });
            });
        }
    })();

    // 焦点图
    (function() {
        var oDiv = $('#fade');
        var ul = oDiv.find('ul li');
        var ol = oDiv.find('ol li');
        var p = oDiv.find('p');
        var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
        var iNow = 0;
        var timer = null;

        fnFade();

        ol.click(function() {
            console.log($(this));
            iNow = $(this).index();
            fnFade();
        });
        oDiv.hover(function() {
            clearInterval(timer);
        }, function() {
            autoPlay();
        });

        function autoPlay() {
            timer = setInterval(function() {
                iNow++;
                iNow %= arr.length;
                fnFade();
            }, 2000);
        }
        autoPlay();

        function fnFade() {
            ul.each(function(i) {
                if (i != iNow) {
                    ul.eq(i).fadeOut().css('z-index', 1);
                    ol.eq(i).removeClass('active');
                } else {
                    ul.eq(i).fadeIn().css('z-index', 2);
                    ol.eq(i).addClass('active');
                }
                p.text(arr[iNow]);
            });
        };
    })();

    // 日历提示
    (function () {
        var aSpan = $('.calendar h3 span');
        var aImg = $('.calendar img');
        var oPrompt = $('.today_info').hide();
        var oImg = oPrompt.find('img');
        var oStrong = oPrompt.find('strong');
        var oP = oPrompt.find('p');
        console.log(aImg);
        aImg.hover(function() {
            var iTop = $(this).parent().position().top-30;
            var iLeft = $(this).parent().position().left+55;
            var num = $(this).parent().index() % aSpan.size();

            oPrompt.show().css({'left':iLeft,'top':iTop});
            oP.text($(this).attr('info'));
            oImg.attr('src', $(this).attr('src'));
            oStrong.text(aSpan.eq(num).text());
        }, function () {
            oPrompt.hide();
        });
    })();

    // BBS
    (function () {
        $('.bbs ol li').mouseover(function() {
            $('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
        });
    })();

    // HOT
    (function () {
        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        $('.hot_area li').mouseover(function() {
            if ($(this).index() === 0) return;
            $('.hot_area li p').remove();
            $(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px">'+
                arr[$(this).index()]+'</p>');
        });
    })();
});