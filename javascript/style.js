$(function(){

	// FVスライダー
	$(function () {
		$(".top-slider").slick({
			arrows: true,
			autoplay: false,
			autoplaySpeed: 2000,
			centerMode: true,
			centerPadding: "22%",
			dots: true,
			slidesToShow: 1,
			// fade: true,
			speed: 400,
			variableWidth: true,
		});
	});

	$(document).ready(function() {
		$('.mylist_btn_wrap').on('click', function() {
				$('.l-mylistwrap').toggleClass('js-mylist-show');
		});
});

	// spメニュー表示
    $('.c-header-menu a').on('click', function() {
        $('.sp_header_bg').addClass('is-show');
        $('.l-leftnav').addClass('is-show');
    });
    $('.sp_header_bg,.c-leftnav_close').on('click', function() {
        $('.l-leftnav').removeClass('is-show');
        if (!$('.c-header-search-wrap-sp.is-show').length) {
        	$('.sp_header_bg').removeClass('is-show');
        }
    });
	$('.js-leftnav-slide').on('click', function() {
		if($('.l-leftnav').hasClass('is-show')){
	    	$('.c-leftnav-middle').slideToggle();
	    	$(this).toggleClass('is-show');
    	}
	});	


    
    // sp検索ボックス表示
    $('.js-header-search').on('click', function() {
        $('.c-header-search-wrap-sp').addClass('is-show');
        $('.sp_header_bg').addClass('is-show');
        $('.l-leftnav').removeClass('is-show');
    });
    $('.sp_header_bg,.c-header-search-close-sp').on('click', function() {
        if ($('.c-header-search-wrap-sp.is-show').length) {
            $('.c-header-search-wrap-sp').removeClass('is-show');
            $('.sp_header_bg').removeClass('is-show');
        }
    });


	// common：スクロールTOP
	const scrollTop = function() {
		jQuery('.js-scrolltop').click(function() {
			var speed = 500;
			var href= jQuery(this).attr("href");
			var target = jQuery(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});
	}


	// common-sp：追従フッター
	const spFooterSticky = function() {
		if($('.c-fixed-footer').length ){
            let fixedElementWin = $(window),
                headerElm = $('.l-header'),
                headerElmHeight = headerElm.outerHeight(),
                headerElmPos = headerElm.offset().top,
                fixedClass = 'is-fixed',
                scrollValue;
            fixedElementWin.on('scroll', function() {
                scrollValue = $(this).scrollTop();
                if ( scrollValue > headerElmHeight ) {
                    $('.c-fixed-footer').addClass(fixedClass);
                } else {
                    $('.c-fixed-footer').removeClass(fixedClass);
                }
            });
	    }
	}


	// common-sp：フッター並び替え
	const spFooterSort = function() {
	    $(document).on('click','.js-fixed-sort',function(){
	    	if ($('.l-main-sort').hasClass('is-show')) {
	    		$('.l-main-sort').removeClass('is-show');
	    	} else {
		    	$('.l-main-sort').addClass('is-show');
	    	}
	    	return false;
	    });
	}



	// SP：カテゴリナビ表示
    const naviSpCategory = function() {
    	let naviSpCategoryFlag = false,
    	naviSpCategoryHeight;
	    $('.js-category-navi').on('click', function() {
	        $('.sp_header_bg').addClass('is-show');
	        $('.l-leftnav').addClass('is-show');
			if($('.l-leftnav').hasClass('is-show')){
		    	$('.js-leftnav-slide').addClass('is-show');
		    	$('.c-leftnav-middle').slideDown();
		    	if(naviSpCategoryFlag == false){
		    		naviSpCategoryHeight = $('.js-leftnav-slide').offset().top;
		    		naviSpCategoryFlag = true;
		    	}
				jQuery('.l-leftnav').animate({scrollTop:naviSpCategoryHeight}, 300, 'swing');
	    	}
	    });
	}

	// common：tablet表示
    const viewTablet= function() {
		const viewTabletUa = navigator.userAgent.toLowerCase();
		const isTablet = (viewTabletUa.indexOf('ipad') > -1 || (viewTabletUa.indexOf('Android') > -1 && viewTabletUa.indexOf('Mobile') == -1));
		if(isTablet){
			const viewTabletHead = $('head'),
				  viewTabletHeadChildren = viewTabletHead.children(),
				  viewTabletHeadChildrenLength = viewTabletHeadChildren.length;
			for(let i = 0;i < viewTabletHeadChildrenLength;i++){
				let metaName = viewTabletHeadChildren.eq(i).attr('name');
				if(metaName === 'viewport'){
					viewTabletHeadChildren.eq(i).attr('content','');
				}
			}
		}
	}
	viewTablet();

	$(function () {
		$(".more").click(function () {
				$(this).fadeOut();
				$(this).parent(".content").removeClass("hide");
		});
	});
	
	// スライダー
	$(function () {
		$(".category-slider").slick({
			arrows: true,
			autoplay: false,
			autoplaySpeed: 2000,
			centerMode: true,
			centerPadding: "22%",
			dots: true,
			slidesToShow: 1,
			// fade: true,
			speed: 400,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 750, // 399px以下のサイズに適用
					settings: {
						slidesToShow: 1,
					},
				},
			],
		});
	});
	
	// モーダル
	$(function() {
		// スクロールバーの幅を計算
		function getScrollbarWidth() {
			var outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body');
			var widthWithScroll = $('<div>').css({width: '100%'}).appendTo(outer).outerWidth();
			outer.remove();
			return 100 - widthWithScroll;
		}
	
		// モーダルウィンドウを開く
		$('.js-modal-open').on('click', function() {
			if ($(window).height() < $(document).height()) {  // スクロールバーが存在する場合
				var scrollbarWidth = getScrollbarWidth();
				$('body').css({
					'overflow': 'hidden',
					'padding-right': scrollbarWidth + 'px'  // スクロールバーの幅の分だけ右のパディングを追加
				});
			} else {
				$('body').css('overflow', 'hidden');
			}
	
			var target = $(this).data('target');
			var modal = document.getElementById(target);
			$(modal).fadeIn();
	
			return false;
		});
	
		// モーダルウィンドウを閉じる
		$('.js-modal-close').on('click', function() {
			$('body').css({
				'overflow': '',
				'padding-right': ''  // パディングを元に戻す
			});
	
			$('.js-modal').fadeOut();
			return false;
		});
	});
	
	// モーダル内スライダー
	$(function () {
		$(".modal-slider").slick({
			arrows: true,
			autoplay: false,
			autoplaySpeed: 2000,
			centerMode: true,
			centerPadding: "47%",
			dots: true,
			slidesToShow: 1,
			speed: 400,
			variableWidth: true,
		});
	});
	
	$(document).ready(function() {
		// 変数定義
		const mainTabs = $('li.main_tab01, li.main_tab02, li.main_tab03');
		const subMenus = $('ul.main_tab01, ul.main_tab02, ul.main_tab03');
		const allElements = mainTabs.add(subMenus);
	
		// サブメニューとメインタブの表示を制御する関数
		function toggleVisibility(tabClass) {
				subMenus.removeClass('is-visible').filter('.' + tabClass).addClass('is-visible');
				mainTabs.removeClass('active').filter('.' + tabClass).addClass('active');
		}
	
		// メインタブにマウスをオーバー
		mainTabs.on('mouseenter', function() {
				const tabClass = $(this).attr('class').split(' ')[0];
				toggleVisibility(tabClass);
		});
	
		// サブメニューやメインタブからマウスを外す
		allElements.on('mouseleave', function() {
				const mainElement = $(this).get(0);
				const childElement = $(this).find('li, ul').get(0);
				if (mainElement && !mainElement.matches(':hover') && childElement && !childElement.matches(':hover')) {
						subMenus.removeClass('is-visible');
						mainTabs.removeClass('active');
				}
		});
	
		// メインメニュー全体のマウスオーバーイベント
		$('.c-main-tab li').on('mouseenter', function() {
				if (!$(this).is(mainTabs)) {
						subMenus.removeClass('is-visible');
						mainTabs.removeClass('active');
				}
		});
	
		// body要素上でのマウスオーバーイベント
		$('body').on('mouseover', function(e) {
				if (!$(e.target).closest('.c-main-tab, ul.main_tab01, ul.main_tab02, ul.main_tab03').length) {
						subMenus.removeClass('is-visible');
						mainTabs.removeClass('active');
				}
		});
	});

	// SPカテゴリ第２階層：絞り込みスライド
	const categoryItemRefine = function() {
		$('.js-category-itemrefine').on('click',function(){
    		let categoryItemRefineArea = $('.l-itemrefine-list-wrap');
    		$(this).toggleClass('is-show');
	    	$(categoryItemRefineArea).slideToggle();
			return false;
		});
	}
	$(window).on('load', function() {
		scrollTop();
		// fixedElement();
		// fixedMainSticky();
		// renderMasonry();
		// itemMylistBtn();
		// itemModalMylistBtn();
		// itemMylistRemoveBtn();
		// modalItemView();
		// modalItemHide();
		// modalItemSlidedown();
		// modalItemRelation();
		// modalRelationMylistBtn();
		// modalItemShare();
		// spFooterSticky();
		// spFooterSort();
		// itemDetailRefine();
		// itemDetailView();
		// mylistRelation();
		// myListRefine();
		// myListMylistBtn();
		// myListExplanModal();
		// myListExplanModalDel();
		// itemDetailSticky();
		categoryItemRefine();
		// itemShakeAnime();
		// modalItemLast();
		// privacypolicyAgree();
		naviSpCategory();
		// viewLoading();
		viewTablet();
		// demoDelete();
	});
});

$(document).ready(function(){
	$(".c-itemdetail-list").each(function(){
			// それぞれのc-itemdetail-listに対するc-itemdetail-titleを取得
			var title = $(this).find(".c-itemdetail-title");
			
			// それぞれのl-itemdetail-item-imgwrapの上に移動
			title.insertBefore($(this).find(".l-itemdetail-item-imgwrap"));
	});
});

$(document).ready(function(){
	$(".c-itemdetail-list").each(function(){
			// それぞれのc-itemdetail-listに対するc-modal-item-btn-mylistとc-modal-item-btn-shareを取得
			var btnMyList = $(this).find(".c-modal-item-btn-mylist");
			var btnShare = $(this).find(".c-modal-item-btn-share");
			
			// これら2つの要素をc-modal-item-btn-underという新しいdivでラップ
			btnMyList.add(btnShare).wrapAll('<div class="c-modal-item-btn-under"></div>');
	});
});