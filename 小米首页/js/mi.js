$(function () {
    // 购物车效果
    $('#topbar').find('.cart-link').hover(function() {
        $(this).addClass('active').find('.cart-down').stop().slideDown(200);
    }, function() {
        $(this).removeClass('active').find('.cart-down').stop().slideUp(200);
    });

    (function() {
        var header = $('#header');

        // 搜索框效果
        header.find('form').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });

        header.find('form .text').focus(function() {
            var that = $(this);
            that.parent().addClass('focus');
            that.siblings('.hot').hide().prev().siblings('.tips').show();
        }).blur(function() {
            var that = $(this);
            that.parent().removeClass('focus');
            that.siblings('.hot').show().prev().siblings('.tips').hide();
        });

        // 水平导航
        header.find('.nav-item').hover(function() {
            $(this).addClass('active');
        }, function() {
            $(this).removeClass('active');
        });

        header.find('.list').hover(function() {
            header.find('.dropdown').stop().slideDown(200).find('ul').hide().eq($(this).index()).show();
        }, function() {
            header.find('.dropdown').stop().slideUp(200);
        });

        header.find('.dropdown').hover(function() {
            $(this).stop().slideDown(200);
        }, function() {
            $(this).stop().slideUp(200);
        });
    })();

    // 轮播图
    (function() {
        var home = $('#home'),
            now = 0,
            switchTimer,
            imgs = home.find('div.img a'),
            pager = home.find('div.pager a'),
            dir = home.find('.direction');

        pager.removeClass('active').eq(now).addClass('active');
        imgs.hide().eq(now).show();
        autoPlay();

        function autoPlay() {
            switchTimer = setInterval(function() {
                now = ++now % imgs.length;
                switchToIndex(now);
            }, 5000);
        }

        function switchToIndex(index) {
            pager.removeClass('active').eq(index).addClass('active');
            imgs.stop().fadeOut(400).eq(index).fadeIn(400);
        }

        imgs.hover(function() {
            clearTimeout(switchTimer);
        }, function() {
            autoPlay();
        });

        pager.on('click', function() {
            if (imgs.is(":animated")) {
                return;
            }
            switchToIndex($(this).index());
        });

        dir.on('click', 'a', function() {
            if (imgs.is(":animated")) {
                return;
            }
            if ($(this).index() === 0) {
                --now;
                if (now < 0) {
                    now = imgs.length - 1;
                }
            } else {
                now = ++now % imgs.length;
            }
            switchToIndex(now);
        });
    })();

    function slideControl(params) {
        (function() {
            var control = params.control,
                slideTimer,
                ul = params.slider,
                now = 0,
                count = params.count;

            control.removeClass('disable').eq(now).addClass('disable');
            autoSlide();

            function autoSlide() {
                slideTimer = window.setInterval(function() {
                    now = ++now % count;
                    switchToIndex(now);
                }, 5000);
            }

            function switchToIndex(index) {
                ul.stop().animate({
                    'left': index * -1240 + 'px'
                }, 400);
                if (index === 0 || index === count - 1) {
                    control.removeClass('disable').eq(index / (count - 1)).addClass('disable');
                } else {
                    control.removeClass('disable')
                }
            }

            ul.children().hover(function() {
                clearTimeout(slideTimer);
            }, function() {
                autoSlide();
            });

            control.on('click', function() {
                if ($(this).hasClass('disable')) {
                    return;
                }
                now += $(this).index() * 2 - 1;
                switchToIndex(now);
            });
        })();
    }

    (function() {
        var home = $('#home');

        // 垂直导航
        home.find('li.category').hover(function() {
            $(this).find('div').show();
        }, function() {
            $(this).find('div').hide();
        });

        // 明星单品
        slideControl({
            slider: home.find('.product ul'),
            control: home.find('.control a'),
            count: 2
        });
    })();

    (function() {
        var main = $('#main'),
            list = main.find('.video .row li');

        // 为你推荐
        slideControl({
            slider: main.find('.recommend .brick ul'),
            control: main.find('.recommend .control a'),
            count: 4
        });

        // 浮现评论
        main.find('.item-m').hover(function() {
            $(this).find('a.comment').stop().animate({
                'bottom': '0px'
            }, 200);
        }, function() {
            $(this).find('a.comment').stop().animate({
                'bottom': '-76px'
            }, 200);
        });

        // tab切换
        main.find('.title .nav ul').each(function(i, item) {
            var $it = $(item),
                childs = $it.children(),
                index;

            childs.hover(function() {
                index = $(this).index();
                childs.removeClass('active').eq(index).addClass('active');
                $it.parents('.title').next().find('.brick ul').hide().eq(index).show();
            });
        });

        // 视频区域播放图标
        list.hover(function() {
            list.removeClass('active').eq($(this).index()).addClass('active');
        }, function() {
            list.removeClass('active');
        });
    })();

    // 内容
    (function() {
        var main = $('#main'),
            list = main.find('.content-list');

        list.hover(function() {
            $(this).find('.paging').show(100);
        }, function() {
            $(this).find('.paging').hide(100);
        });

        list.each(function(i, item) {
            (function() {
                var li = $(item),
                    pager = li.find('.pager a'),
                    control = li.find('.paging a'),
                    ul = li.find('.wrapper ul'),
                    now = 0;

                pager.removeClass('active').eq(now).addClass('active');

                function switchToIndex(e, index) {
                    e.stop().animate({
                        'left': index * -296 + 'px'
                    }, 200);
                    pager.removeClass('active').eq(index).addClass('active');
                }

                pager.on('click', function() {
                    now = $(this).index();
                    switchToIndex(ul, now);
                });

                control.on('click', function() {
                    var index = $(this).index();
                    if ((now === 0 && index === 0) || (now === 3 && index === 1)) {
                        return;
                    }
                    now += index * 2 - 1;
                    switchToIndex(ul, now);
                });
            })();
        });
    })();
});
