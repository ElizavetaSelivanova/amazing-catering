$(document).keydown(function (e) {
	switch (e.which) {
		//up
		case 38:
			$('html, body').stop().animate({
				scrollTop: $(window).scrollTop() - distance
			}, time);
			break;
		//down
		case 40:
			$('html, body').stop().animate({
				scrollTop: $(window).scrollTop() + distance
			}, time);
			break;
	}
});
$(document).ready(function(){
//	height main bg

	$(window).on('load resize', function(){
		var defaultHeight = $('.page-section._main').height();
		var menuHeight = $('.page-menu._header').innerHeight(),
			newHeight = defaultHeight - menuHeight;
		$('.page-section_main__bg').css('height', newHeight + 'px');
	});

//    modals open
    function openPopup(popUp, open){
        var that = this;
        that.elems = {
            popupActive: popUp,
            buttonOpen: open
        };
        that.event = function(){
            that.elems.buttonOpen.on('click', function(){
                if($('html').hasClass('_modal_open')){
                    $('html').addClass('_modal_active');
                        $('.page-modal, .page-modal-list__i').fadeOut();
                        that.elems.popupActive.fadeIn();
                } else{
                    $('html').addClass('_modal_open');
                    if(!$(this).hasClass('section-more-list__i')){
                        that.elems.popupActive.fadeIn();
                    }else if($(this).hasClass('section-more-list__i')){
                        var ind = $(this).index();
                        that.elems.popupActive.eq(ind).fadeIn();
                    }
                }
                $('.page-dark').fadeIn();
            });
            $('.js-modal_close, .page-dark').on('click', function(){
                $('html').removeClass('_modal_open _modal_active');
                $('.page-dark').fadeOut();
                that.elems.popupActive.fadeOut();
            });
        };
        that.action = function(){
            that.elems.popupActive.hide();
            that.event();
        }();
    }

    var howToOrder = new openPopup($('._how_to_order'), $('.js-open_modal__how'));
    var service =  new openPopup($('.page-modal-list__i'), $('.section-more-list__i'));
    var order =  new openPopup($('._order_call'), $('.js-order-call'));

//	parallax
	function parallaxAll(background, text){
		var that = this;
		that.event = function(){
			$(window).on('scroll', function(){
				that.moveBg();
			});
		}();
		that.moveBg = function(){
			var topPos = $(document).scrollTop();
			if(background){
				background.css('background-position', 'center '+(topPos*0.8)+'px');
			}
			if(text){
				text.css('padding-top',+(topPos*0.8)+'px');
			}
		};
	}
	var top = new parallaxAll($('.page-section_main__bg'), $('.page-title'));

//	hide elements
	function scrollPage(){
		var that = this;
		that.event = function(){
			$(document).on('scroll', function(){
				$('.page-hide-block').addClass(function(){
					if (that.showElements($(this))){
						$(this).addClass('_visible');
					}
				});
			});
		}();
		that.showElements = function(elem){
			var docViewTop = $(window).scrollTop(),
				docViewBottom = docViewTop + $(window).height(),
				elemTop = $(elem).offset().top,
				elemBottom = elemTop + $(elem).height();
			return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
		};
	}
	var scrollFunction = new scrollPage();

//    scroll function
    var massTopValue = [],
        pageSection = $('.page-section'),
        massSection = ['main', 'service', 'more_service', 'about', 'faq', 'call'];
    for(var i=0; i<pageSection.length; i++){
        massTopValue.push(pageSection.eq(i).offset().top);
    };

	$(document).bind('scroll',function(e){
		pageSection.each(function(){
			if (
				$(this).offset().top < window.pageYOffset + 10
//begins before top
				&& $(this).offset().top + $(this).height() > window.pageYOffset + 10
//but ends in visible area
//+ 10 allows you to change hash before it hits the top border
				) {
				var ind = $(this).index();
				window.location.hash = '#' + massSection[ind];
			}
		});
	});

    function changeBlock(index, block, link, bg){
        var that = this;
        that.event = function(){
			link.removeClass('_active').eq(index).addClass('_active');
            block.fadeOut().eq(index).fadeIn();
			if(bg){
				bg.fadeOut().eq(index).fadeIn();
			}
        };
        that.action = function(){
            that.event();
        }();
    }

	$('._service .section-nav__i').on('click', function(){
		if(!$(this).hasClass('_active')){
			var ind = $(this).index();
			new changeBlock(ind, $('._service .section-slide__i'), $('._service .section-nav__i'), $('.section-bg__i'));
		}
	});

	$('._about .section-nav__i').on('click', function(){
		if(!$(this).hasClass('_active')){
			var ind = $(this).index();
			new changeBlock(ind, $('._about .section-slide__i'), $('._about .section-nav__i'), false);
		}
	});

    $('.page-menu-list__i').on('click', function(){
		var link = $(this).data('link');
        if(!$(this).hasClass('_caption')){
            var ind = $(this).index() - 1;
			if(link == 1){
				new changeBlock(ind, $('._service .section-slide__i'), $('._service .section-nav__i'), $('.section-bg__i'));
			}else if(link == 3){
				new changeBlock(ind, $('._about .section-slide__i'), $('._about .section-nav__i'), false);
			}
        }
		$('html, body').animate({
			scrollTop: pageSection.eq(link).offset().top
		})
    });

    var hash = window.location.hash;
    if(hash == '#main'){
        $('html, body').animate({
            scrollTop: pageSection.eq(0).offset().top
        });
    } else if(hash == ''){
        return;
    } else {
        var id = hash.split('#')[1];
        for(var i = 0, lng = massSection.length; i < lng; i++){
            if(id == massSection[i]){
                $('html, body').animate({
                    scrollTop: pageSection.eq(i).offset().top
                });
            }
        }

    }
});
