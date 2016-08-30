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

    // 垂直导航
    $('#home').find('li.category').hover(function() {
        $(this).find('div').show();
    }, function() {
        $(this).find('div').hide();
    });

    // 明星单品
    (function() {
        var home = $('#home'),
            control = home.find('.control a'),
            slideTimer,
            ul = home.find('.product ul'),
            now = 0;

        control.removeClass('disable').eq(now).addClass('disable');
        autoSlide();

        function autoSlide() {
            slideTimer = window.setInterval(function() {
                now = ++now % 2;
                switchToIndex(now);
            }, 5000);
        }

        function switchToIndex(index) {
            ul.stop().animate({
                'left': index * -1240 + 'px'
            }, 400);
            control.removeClass('disable').eq(index).addClass('disable');
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

    // 浮现评论
    $('#main').find('.item-m').hover(function() {
        $(this).find('a.comment').stop().animate({
            'bottom': '0px'
        }, 200);
    }, function() {
        $(this).find('a.comment').stop().animate({
            'bottom': '-76px'
        }, 200);
    });

    // tab切换
    (function() {
        var main = $('#main'),
            ul = main.find('.title .nav ul');

        ul.each(function(i, item) {
            var $it = $(item),
                childs = $it.children(),
                index;

            childs.hover(function() {
                index = $(this).index();
                childs.removeClass('active').eq(index).addClass('active');
                $it.parents('.title').next().find('.brick ul').hide().eq(index).show();
            });
        })
    })();

    // 为你推荐
    (function() {
        var recommend = $('#main').find('.recommend'),
            control = recommend.find('.control a'),
            slideTimer,
            ul = recommend.find('.brick ul'),
            now = 0;

        control.removeClass('disable').eq(now).addClass('disable');
        autoSlide();

        function autoSlide() {
            slideTimer = window.setInterval(function() {
                now = ++now % 4;
                switchToIndex(now);
            }, 5000);
        }

        function switchToIndex(index) {
            ul.stop().animate({
                'left': index * -1240 + 'px'
            }, 400);
            if (index === 0 || index === 3) {
                control.removeClass('disable').eq(index / 3).addClass('disable');
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

    // 内容
    (function() {
        var main = $('#main'),
            list = main.find('.content-list');

        list.hover(function() {
            $(this).find('.paging').show(200);
        }, function() {
            $(this).find('.paging').hide(200);
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
