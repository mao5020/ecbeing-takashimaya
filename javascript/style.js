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


	// common-pc：左右カラムの追従（現状はclassの付与のみで追従させない）
	// const fixedElement = function() {
	// 	if($('.l-leftnav').length || $('.l-mylist').length ){
  //           let fixedElementWin = $(window),
  //               headerElm = $('.l-header'),
  //               headerElmHeight = headerElm.outerHeight(),
  //               headerElmPos = headerElm.offset().top,
  //               fixedClass = 'is-fixed',
  //               scrollValue,
  //               scrollValueSet;
  //           fixedElementWin.on('scroll', function() {
  //               scrollValue = $(this).scrollTop();
  //               scrollValueSet = scrollValue - 100;
  //               if ( scrollValue > headerElmHeight ) {
  //                   $('.l-leftnav,.l-mylist').addClass(fixedClass);
  //                   $('.l-mylist').css('top',scrollValueSet);
  //               } else {
  //                   $('.l-leftnav,.l-mylist').removeClass(fixedClass);
  //               }
  //           });
	//     }
	// }


	// common-pc：追従カテゴリ
	// const fixedMainSticky = function() {
	// 	if($('.js-mainsticky').length ){
  //           let mainStickyWin = $(window),
  //               mainStickyElm = $('.js-mainsticky'),
  //               mainStickyElmHeight = mainStickyElm.outerHeight(),
  //               mainStickyElmPos = mainStickyElm.offset().top,
  //               fixedClass = 'is-fixed',
  //               mainStickyScrollValue;
  //           mainStickyWin.on('scroll', function() {
  //               mainStickyScrollValue = $(this).scrollTop();
  //               if ( mainStickyScrollValue > mainStickyElmPos ) {
  //                   $(mainStickyElm).addClass(fixedClass);
  //               } else {
  //                   $(mainStickyElm).removeClass(fixedClass);
  //                   $('.l-main-sort').removeClass('is-show');
  //               }
  //           });
	//     }
	// }


	// common：masonry描画
	const renderMasonry = function() {
		if($('.js-grid').length){
		    $('.js-grid').masonry({
		      percentPosition: true,
		      columnWidth: '.grid-item '
		    });
		}
		if($('.js-mylist-listwrap').length){
			$('.js-mylist-listwrap').masonry({
		      columnWidth: '.js-mylist-listwrap li'
		    });		
		}
	}


	// common：masonry再描画
	const reRenderMasonry = function() {
		masonry = new Masonry('.js-mylist-listwrap', {
		  itemSelector: '.js-mylist-listwrap li'
		});			
	};


	// common：マイリスト
	const itemMylistBtn = function() {
	    $('.js-itembtn').on('click',function(){
	    	if(!$(this).hasClass('is-on')){
	    		let itembtnSrc = $(this).parents('.c-item-list'),
		    		itembtnLink = $(itembtnSrc).find('a').attr('href'),
	    			itembtnImgsrc = $(itembtnSrc).find('img').attr('src'),
	    			itembtnName = $(itembtnSrc).find('.c-item-name').text(),
	    			itemData = $(itembtnSrc).find('a').data('item');
	    		if (typeof itembtnImgsrc === "undefined"){
	    			itembtnImgsrc = $(itembtnSrc).find('.cri-liveact-player').data('img');
	    		}
	    		let itembtnCopy = '<li class="c-mylist-list js-mylist-modal-open is-prepend"><figure><img src="'+
		    						itembtnImgsrc +'"></figure><div class="c-mylist-name">' +
		    						itembtnName + '</div><div class="c-mylist-mylist"><div data-mylistitem="'+
		    						itemData +'"  class="c-mylist-mylist-btn js-mylistbtn is-on"></div></div></li>';
		    	$('.js-mylist-listwrap').prepend( itembtnCopy );
		    	setTimeout(function(){
	    			reRenderMasonry();
		    	},300);
		    	$(itembtnSrc).addClass('is-on');
		    	$(this).addClass('is-on');
				$('.js-modal-item').each(function() {
		        	if($(this).data('modalitem') === itemData){
		        		$(this).find('.js-modal-mylist').addClass('is-on');
		        	}
		        });
		        mylistComment();
	    	}else{
	    		let itembtnSrc = $(this).parents('.c-item-list'),
	    			itemOnData = $(itembtnSrc).find('a').data('item');
		        $('.js-mylistbtn').each(function() {
		        	if($(this).data('mylistitem') === itemOnData){
		        		$(this).parent().parent().fadeOut('fast', function() {
	    					setTimeout(function(){
	    						$(this).parent().parent().remove();
	    						reRenderMasonry();
		    				},300);
	    				});
		        	}
		        });
				$('.js-modal-item').each(function() {
		        	if($(this).data('modalitem') === itemOnData){
		        		$(this).find('.js-modal-mylist').removeClass('is-on');
		        	}
		        });
				$('.js-relation-modal-open').each(function() {
		        	if($(this).data('item') === itemOnData){
		        		$(this).removeClass('is-on');
		        		$(this).find('.js-relation-mylistbtn').removeClass('is-on');
		        	}
		        });
		        $(itembtnSrc).removeClass('is-on');
	    		$(this).removeClass('is-on');
	    	}
	    	
	    });
	}


	// sp common：マイリスト追加コメント
	const mylistComment = function() {
		const mylistCommentHtml = '<p class="c-mylist-balloon">マイリストに追加しました</p>	';
		if(!$('.c-mylist-balloon').length){
			$(mylistCommentHtml).appendTo('body').addClass('is-show');
			setTimeout(function(){$('.c-mylist-balloon').addClass('is-show')},200);
			setTimeout(function(){$('.c-mylist-balloon').removeClass('is-show')},2000);
		    setTimeout(function(){$('.c-mylist-balloon').remove()},2600);
		}
	};


	// common：モーダル内マイリスト
	const itemModalMylistBtn = function() {
	    $('.js-modal-mylist').on('click',function(){
	    	if(!$(this).hasClass('is-on')){
	    		let itemModalMylistBtnSrc = $(this).parents('.js-modal-item'),
	    			itemModalMylistBtnName = $(itemModalMylistBtnSrc).find('.c-modal-item-title').text(),
	    			itemModalMylistBtnImgsrc = $(itemModalMylistBtnSrc).find('.l-modal-item-imgwrap img').attr('src'),
	    			itemModalMylistBtnData = $(itemModalMylistBtnSrc).data('modalitem');
	    		if($(this).hasClass('is-category')){
		    			itemModalMylistBtnSrc = $(this).parents('.c-itemdetail-list'),
		    			itemModalMylistBtnName = $(itemModalMylistBtnSrc).find('.c-itemdetail-title').text(),
		    			itemModalMylistBtnImgsrc = $(itemModalMylistBtnSrc).find('.l-itemdetail-item-imgwrap img').attr('src'),
		    			itemModalMylistBtnData = $(itemModalMylistBtnSrc).data('modalitem'); 				
	    			}
	    		if($(itemModalMylistBtnSrc).find('.slick-list').length){
	    			itemModalMylistBtnImgsrc = $(itemModalMylistBtnSrc).find('[data-slick-index=0]').children('img').attr('src');
	    		}
	    		if (typeof itemModalMylistBtnImgsrc === "undefined"){
	    			itemModalMylistBtnImgsrc = $(itemModalMylistBtnSrc).find('.cri-liveact-player').data('img');
	    		}
	    		let	itemModalMylistBtnCopy = '<li class="c-mylist-list is-prepend"><figure><img src="'+
				    						itemModalMylistBtnImgsrc +'"></figure><div class="c-mylist-name">' +
				    						itemModalMylistBtnName + '</div><div class="c-mylist-mylist"><div data-mylistitem="'+
				    						itemModalMylistBtnData +'"  class="c-mylist-mylist-btn js-mylistbtn is-on"></div></div></li>';
		    	$('.js-mylist-listwrap').prepend( itemModalMylistBtnCopy );
		    	setTimeout(function(){
	    			reRenderMasonry();
		    	},300);
		    	$(this).addClass('is-on');
		        $('.js-modal-itemopen').each(function() {
		        	if($(this).data('item') === itemModalMylistBtnData){
		        		$(this).parent().addClass('is-on');
		        		$(this).next().find('.js-itembtn').addClass('is-on');
		        	}
		        });
		        if($('.js-relation-modal-open').length){
		        	$('.js-relation-modal-open').each(function() {
		        		if($(this).data('item') === itemModalMylistBtnData){
		        			$(this).addClass('is-on');
		        			$(this).find('.js-relation-mylistbtn').addClass('is-on');
		        		}
		        	});
		        }
		        mylistComment();
	    	}else{
	    		let itemModalMylistBtnSrc = $(this).parents('.js-modal-item');
	    		if($(this).hasClass('is-category')){
		    		itemModalMylistBtnSrc = $(this).parents('.c-itemdetail-list');				
	    		}
	    		let itemModalMylistBtnData = $(itemModalMylistBtnSrc).data('modalitem');
		        $('.js-mylistbtn').each(function() {
		        	if($(this).data('mylistitem') === itemModalMylistBtnData){
		        		$(this).parent().parent().fadeOut('fast', function() {
	    					setTimeout(function(){
	    						$(this).parent().parent().remove();
	    						reRenderMasonry();
		    				},300);
	    				});
		        	}
		        });
		        $('.js-modal-itemopen').each(function() {
		        	if($(this).data('item') === itemModalMylistBtnData){
		        		$(this).parent().removeClass('is-on');
		        		$(this).next().find('.js-itembtn').removeClass('is-on');
		        	}
		        });
		        if($('.js-relation-modal-open').length){
		        	$('.js-relation-modal-open').each(function() {
		        		if($(this).data('item') === itemModalMylistBtnData){
		        			$(this).removeClass('is-on');
		        			$(this).find('.js-relation-mylistbtn').removeClass('is-on');
		        		}
		        	});
		        }
	    		$(this).removeClass('is-on');
	    	}
	    	return false;
	    });
	}


	// common：右カラムマイリスト削除
	const itemMylistRemoveBtn = function() {
	    $(document).on('click','.js-mylistbtn',function(){
	    	let itemMylistData = $(this).data('mylistitem');
	        $('.js-modal-itemopen').each(function() {
	        	if($(this).data('item') === itemMylistData){
	        		$(this).next().find('.js-itembtn').removeClass('is-on');
	        		$(this).parent().removeClass('is-on');
	        	}
	        });
			$('.js-modal-item').each(function() {
	        	if($(this).data('modalitem') === itemMylistData){
	        		$(this).find('.js-modal-mylist').removeClass('is-on');
	        	}
	        });
	    	$(this).parents('.c-mylist-list').fadeOut('fast', function() {
	    		setTimeout(function(){
	    			$(this).remove();
	    			reRenderMasonry();
		    	},300);
	    	});
	    	if($('.js-relation-modal-open').length){
		    	$('.js-relation-modal-open').each(function() {
		    		if($(this).data('item') === itemMylistData){
		        		$(this).removeClass('is-on');
		        		$(this).find('.js-relation-mylistbtn').removeClass('is-on');
		        	}
		    	});	    		
	    	}
	    	if($('.c-itemdetail-list').length){
		    	$('.c-itemdetail-list').each(function() {
		    		if($(this).data('modalitem') === itemMylistData){
		        		$(this).find('.js-modal-mylist').removeClass('is-on');
		        	}
		    	});	    		
	    	}
	    });
	}

	// common：モーダル内画像スライド
	const modalItemSlick = function(elm) {

		if($(elm).find('.c-modal-item-img').length > 1){
			$(elm).not('.slick-initialized').slick({
				dots: true,
				speed: 300,
				slidesToShow: 1,
				adaptiveHeight: true,
				respondTo:'slider'
			});

			//window resizeでカルーセル画像が崩れるため発火させない処理
			$(window).on('resize', function() {
				if(!$('.js-modal-bg').hasClass('is-show')){
					$(elm).slick('unslick');
				}
			});


			//画像が5件以上なら件数表示
			let modalItemAllNum = $(elm).find('.c-modal-item-img').length,
					modalItemCloneNum = $(elm).find('.slick-cloned').length,
					modalItemNum = modalItemAllNum - modalItemCloneNum;
			if(modalItemNum > 4){
				let modalItemCurrentNum = 1,
					modalItemNumHtml = '<div class="c-modal-item-imgnum-wrap"><span class="c-modal-item-imgnum">'+ modalItemCurrentNum + '</span><span class="c-modal-item-imgnum-all">' + modalItemNum + '</span></div>';
				if(!$(elm).find('.c-modal-item-imgnum-wrap').length){
					$(elm).append(modalItemNumHtml);
				}
				$('.slick-next,.slick-prev').on('click',function(){
					modalItemCurrentNum = $(elm).find('.slick-current').data('slick-index') + 1;
					$('.c-modal-item-imgnum').html(modalItemCurrentNum);
				});
			}
		}
	}


	// common：モーダル表示
	const modalItemView = function(event) {
		//c-item
	    $('.js-modal-itemopen').on('click', function() {
	        let modalItemData = $(this).data('item');
	        modalItemViewProcess(modalItemData);
	        return false;
	    });
	    //mylist-item
	    $(document).on('click', '.js-mylist-modal-open figure',function() {
	        let modalMylistItemData = $(this).parent().find('.js-mylistbtn').data('mylistitem');
			modalItemViewProcess(modalMylistItemData);
			return false;
	    });
	    //閲覧履歴
	    $(document).on('click', '.l-leftnav-history figure',function() {
	        let modalHistoryItemData = $(this).parent().data('item');
			modalItemViewProcess(modalHistoryItemData);
			return false;
	    });
	    //TOP関連商品
	    $(document).on('click', '.js-relation-modal-open figure',function() {
	        let modalRelationItemData = $(this).parent().data('item');
			$('.js-modal-item').removeClass('is-show is-relation');
			$('.js-modal-bg,.js-modal-close').removeClass('is-relation');
			$('.l-modal-item-relation').hide();
			modalItemViewProcess(modalRelationItemData);
			return false;
	    });
		//mylist&category関連商品
	    $(document).on('click', '#category .js-relation-modal-open figure,#category2 .js-relation-modal-open figure,#mylist .js-relation-modal-open figure',function() {
	        let modalRelationItemData = $(this).parent().data('item');
			$('.js-modal-item').removeClass('is-show is-relation');
			$('.js-modal-category-bg').removeClass('is-show');
			$('.js-modal-bg,.js-modal-close').removeClass('is-relation');
			modalItemViewProcess(modalRelationItemData);
			return false;
	    });
	    let modalItemViewProcess = function(itemdata) {
	    	let userAgent = window.navigator.userAgent.toLowerCase();
	    	$('.js-modal-bg').addClass('is-show');
	        $('.js-modal-item').each(function() {
	        	if($(this).data('modalitem') === itemdata){
	        		let modalItemSlickElm = $(this).find('.js-modal-item-slick');
	        		$(this).addClass('is-show');
	        		if(userAgent.indexOf('trident') != -1) {
	        		    setTimeout(function(){
	    					modalItemSlick(modalItemSlickElm);
						},100);
					}else{
						modalItemSlick(modalItemSlickElm);
					}
					
	        	}
	        });
	    }
	}


	// common：モーダル非表示
	const modalItemHide = function() {
		$(document).on('click','.js-modal-bg', function(e) {
		    if($('.js-modal-bg').hasClass('is-relation')){
			    if(!$(e.target).closest('.l-modal-item').length){
			    	let modalItemRelationData = $('.js-relation-modalhide').data('modalitem');
					$('.js-modal-item').removeClass('is-relation');
					$('.js-modal-bg,.js-modal-close').removeClass('is-relation');
					$('.l-modal-item-relation').hide();
					$('.l-modal-item-imgwrap,.l-modal-item-content').removeClass('is-hide');
			    }
			}else{
			    if(!$(e.target).closest('.l-modal-item').length){
			    	$('.js-modal-bg,.js-modal-item').removeClass('is-show');
			    	$('.js-modal-item').removeClass('is-relation');
			    	$('.l-modal-item-imgwrap,.l-modal-item-content').removeClass('is-hide');
			    	$('.l-modal-item-relation').hide();
			    	$('.js-modal-close').removeClass('is-relation');
			    }
			}
			return false;
		});

		//category & mylist
		$(document).on('click','.js-modal-category-bg', function(e) {
			if($(this).hasClass('is-show')){
			    if(!$(e.target).closest('.l-modal-item').length){
					$('.js-modal-category-bg').removeClass('is-show');
					$(this).find('.l-modal-item-relation').hide();
		    	}	
			}
		});

	}


	// common：モーダル内&マイリスト 続きを見る
	const modalItemSlidedown = function() {
		$('.js-modal-item-inner').on('click', function(e) {
			$(this).parent('.l-modal-item-innerwrap').addClass('is-show');
			$(this).hide();
		});
		$('.js-itemdetail-inner').on('click', function(e) {
			$(this).parent('.l-itemdetail-innerwrap').addClass('is-show');
			$(this).hide();
		});
	}


	// common：モーダル内関連商品
	const modalItemRelation = function() {
		$('.js-modal-relation').on('click', function() {
			let modalRelationArea = $(this).parents('.l-modal-item'),
				modalRelationAreaHideImg = $(modalRelationArea).find('.l-modal-item-imgwrap'),
				modalRelationAreaHideConts = $(modalRelationArea).find('.l-modal-item-content'),
				modalRelationAreaShow = $(modalRelationArea).find('.l-modal-item-relation');
			$(modalRelationArea).addClass('is-relation js-relation-modalhide');
			$('.js-modal-bg').addClass('is-relation');
			$(modalRelationAreaHideImg).addClass('is-hide');
			$(modalRelationAreaHideConts).addClass('is-hide');
			$(modalRelationAreaShow).fadeIn('100');
			$('.js-modal-close').addClass('is-relation');
			return false;
		});
	}


	// common：モーダル内マイリストボタン
	const modalRelationMylistBtn = function() {
	    $(document).on('click','.js-relation-mylistbtn',function(){
	    	if(!$(this).hasClass('is-on')){
	    		let itemRelationSrc = $(this).parents('.c-modal-item-relation-item'),
	    			itemRelationImgsrc = $(itemRelationSrc).find('img').attr('src'),
	    			itemRelationName = $(itemRelationSrc).find('.c-modal-relation-name').text(),
	    			itemRelationData = $(itemRelationSrc).data('item');
	    		if (typeof itemRelationImgsrc === "undefined"){
	    			itemRelationImgsrc = $(itemRelationSrc).find('.cri-liveact-player').data('img');
	    		}

	    		let	itemRelationCopy = '<li class="c-mylist-list is-prepend"><figure><img src="'+
		    						itemRelationImgsrc +'"></figure><div class="c-mylist-name">' +
		    						itemRelationName + '</div><div class="c-mylist-mylist"><div data-mylistitem="'+
		    						itemRelationData +'"  class="c-mylist-mylist-btn js-mylistbtn is-on"></div></div></li>';
		    	$('.js-mylist-listwrap').prepend( itemRelationCopy );
		    	setTimeout(function(){
	    			reRenderMasonry();
		    	},300);
		    	if($('.js-modal-itemopen').length){
			    	$('.js-modal-itemopen').each(function() {
		        		if($(this).data('item') === itemRelationData){
		        			$(this).parent('.c-item-list').addClass('is-on');
		        			$(this).next().find('.js-itembtn').addClass('is-on');
		        		}
		        	});
		        }
		        if($('.js-relation-modal-open').length){
		        	$('.js-relation-modal-open').each(function() {
		        		if($(this).data('item') === itemRelationData){
		        			$(this).addClass('is-on');
		        			$(this).find('.js-relation-mylistbtn').addClass('is-on');
		        		}
		        	});
		        }
		        if($('.js-modal-item').length){
		        	$('.js-modal-item').each(function() {
		        		if($(this).data('modalitem') === itemRelationData){
		        			$(this).find('.js-modal-mylist').addClass('is-on');
		        		}
		        	});
		        }
		    	$(itemRelationSrc).addClass('is-on');
		    	$(this).addClass('is-on');
		    	mylistComment();
	    	}else{
	    		let itemRelationSrc = $(this).parents('.c-modal-item-relation-item').data('item');
		        $('.js-mylistbtn').each(function() {
		        	if($(this).data('mylistitem') === itemRelationSrc){
		        		$(this).parent().parent().fadeOut('fast', function() {
	    					setTimeout(function(){
	    						$(this).parent().parent().remove();
	    						reRenderMasonry();
		    				},300);
	    				});
		        	}
		        });
		    	$('.js-modal-itemopen').each(function() {
	        		if($(this).data('item') === itemRelationSrc){
	        			$(this).parent('.c-item-list').removeClass('is-on');
	        			$(this).next().find('.js-itembtn').removeClass('is-on');
	        		}
	        	});
		        if($('.js-relation-modal-open').length){
		        	$('.js-relation-modal-open').each(function() {
		        		if($(this).data('item') === itemRelationSrc){
		        			$(this).removeClass('is-on');
		        			$(this).find('.js-relation-mylistbtn').removeClass('is-on');
		        		}
		        	});
		        }
		        if($('.js-modal-item').length){
		        	$('.js-modal-item').each(function() {
		        		if($(this).data('modalitem') === itemRelationSrc){
		        			$(this).find('.js-modal-mylist').removeClass('is-on');
		        		}
		        	});
		        }
		        $(this).parents('.c-modal-item-relation-item').removeClass('is-on');
	    		$(this).removeClass('is-on');
	    	}
	    	
	    });
	}


	// common：シェアボタン
	const modalItemShare = function() {
		//open
		$('.js-modal-share,.js-modal-item-share-close').on('click', function() {
			let modalShareArea = $(this).parents('.l-modal-item-btn').prev();
			if(!$(modalShareArea).hasClass('is-show')){
				$(modalShareArea).fadeIn('fast');
			}else{
				$(modalShareArea).fadeOut('fast');
			}
			$(modalShareArea).toggleClass('is-show');
			return false;
		});
		//close
		$(document).on('click','.js-modal-bg,#mylist,#category,#category2', function(e) {
		    if($('.l-modal-item-share').hasClass('is-show')){
			    if(!$(e.target).closest('.l-modal-item-share').length){
					if(!$('.l-modal-item-share').hasClass('is-show')){
						$('.l-modal-item-share').fadeIn('fast');
					}else{
						$('.l-modal-item-share').fadeOut('fast');
					}
					$('.l-modal-item-share').removeClass('is-show');
			    }
			    return false;
			}
			
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


	// カテゴリ第2：絞り込みボタン
    const itemDetailRefine = function() {
    	jQuery('.c-itemrefine-list').on('click',function(){
    		if (jQuery(this).hasClass('is-current')) {
    			jQuery(this).removeClass('is-current');
    		} else {
    			jQuery(this).addClass('is-current');
    		}
    		return false;
		});
	}


	// マイリスト&カテゴリ第2：画像スライド
	const itemDetailSlick = function(elm) {
		$(elm).each(function() {
			if($(this).find('.c-itemdetail-img').length > 1){
				$(this).not('.slick-initialized').slick({
					dots: true,
					speed: 300,
					slidesToShow: 1,
					adaptiveHeight: true,
					respondTo:'slider'
				});

				//画像が5件以上なら件数表示
				let itemDetailSlickAllNum = $(this).find('.c-itemdetail-img').length,
					itemDetailSlickCloneNum = $(this).find('.slick-cloned').length,
					itemDetailSlickNum = itemDetailSlickAllNum - itemDetailSlickCloneNum;
				if(itemDetailSlickNum > 4){
					let itemDetailSlickCurrentNum = 1,
						itemDetailSlickNumHtml = '<div class="c-modal-item-imgnum-wrap"><span class="c-modal-item-imgnum">'+ itemDetailSlickCurrentNum + '</span><span class="c-modal-item-imgnum-all">' + itemDetailSlickNum + '</span></div>';
					if(!$(this).find('.c-modal-item-imgnum-wrap').length){
						$(this).append(itemDetailSlickNumHtml);
					}
				}
			}
		});
		$('.slick-next,.slick-prev').on('click',function(){
			itemDetailSlickCurrentNum = $(this).prev().find('.slick-current').data('slick-index') + 1;
			$('.c-modal-item-imgnum').html(itemDetailSlickCurrentNum);
		});
	}


	// 画像スライドフリック数値変更
	$('.l-modal-item-imgwrap').on('swipe', function(event, slick, direction){
		console.log($(this).attr('class'));
		itemDetailSlickCurrentNum = $(this).find('.slick-current').data('slick-index') + 1;
		$('.c-modal-item-imgnum').html(itemDetailSlickCurrentNum);
	});


    // マイリスト&カテゴリ第2：画像スライド発火
    const itemDetailView = function() {
    	let itemDetailSlickElm = $('.js-itemdetail-slick');
    	if (itemDetailSlickElm.length) {
    		itemDetailSlick(itemDetailSlickElm);
    	}
	}


	// マイリスト&カテゴリ第2：関連商品
	const mylistRelation = function() {
		$('.js-mylist-relation').on('click', function() {
			let mylistRelationArea = $(this).parents('.c-itemdetail-list'),
				mylistRelationAreaShow = $(mylistRelationArea).find('.js-modal-category-bg'),
				mylistRelationItemAreaShow = $(mylistRelationArea).find('.l-modal-item-relation');
			$('.js-modal-close').addClass('is-relation');
			$(mylistRelationAreaShow).addClass('is-show');
			$(mylistRelationItemAreaShow).show();
			return false;
		});
	}


	// マイリスト：星をクリック
    const myListRefine = function() {
    	jQuery('.js-itemdetail-refine li').on('click',function(){
    		let myListRefineList = jQuery(this).parent().find('li'),
    			myListRefineNum = $(myListRefineList).index(this);
			$(myListRefineList).removeClass('is-on');
			$(myListRefineList).slice(0,myListRefineNum+1).addClass('is-on');
    		return false;
		});
	}


	// マイリスト：マイリストボタン
    const myListMylistBtn = function() {
    	$('.js-mylist-mylist').on('click',function(){
    		let myListMylistMod = $(this).parents('.c-itemdetail-list');
    		$(myListMylistMod).fadeOut(300, function() {
    			setTimeout(function(){
	    			$(myListMylistMod).remove();
				},100);
    		});
    		return false;
		});
	}


	// マイリスト：説明モーダル表示
    const myListExplanModal = function() {
		$('.js-mylist-explan').on('click',function(){
    		let myListExplanModalBtn = $(this),
    			myListExplanModalArea = $('.c-mylist-explan-modalbg');
	    	$(myListExplanModalArea).addClass('is-show');
			return false;
		});
	}


	// マイリスト：説明モーダル非表示
    const myListExplanModalDel = function() {
		$(document).on('click','.c-mylist-explan-modalbg', function(e) {
		    if($('.c-mylist-explan-modalbg').hasClass('is-show')){
			    if(!$(e.target).closest('.c-mylist-explan-modal').length){
			    	$('.c-mylist-explan-modalbg').removeClass('is-show');
			    }
			}
			return false;
		});
		$('.js-mylist-explan-close').on('click',function(){
			if($('.c-mylist-explan-modalbg').hasClass('is-show')){
				$('.c-mylist-explan-modalbg').removeClass('is-show');
			}
			return false;
		});
	}


	// マイリスト_商品一覧：商品数追従
	const itemDetailSticky = function() {
		if($('.js-itemdetail-length').length ){
            let itemStickyWin = $(window),
                itemStickyElm = $('.js-itemdetail-length'),
                itemStickyElmPos = 100,
                fixedClass = 'is-fixed',
                itemStickyScrollValue;
            itemStickyWin.on('scroll', function() {
                itemStickyScrollValue = $(this).scrollTop();
                if ( itemStickyScrollValue > itemStickyElmPos ) {
                    $(itemStickyElm).addClass(fixedClass);
                } else {
                    $(itemStickyElm).removeClass(fixedClass);
                }
            });
	    }
	}


	// SPカテゴリ第２階層：絞り込みスライド
    const categoryItemRefine = function() {
		$('.js-category-itemrefine').on('click',function(){
    		let categoryItemRefineArea = $('.l-itemrefine-list-wrap');
    		$(this).toggleClass('is-show');
	    	$(categoryItemRefineArea).slideToggle();
			return false;
		});
	}


	// common：シェイクアニメーション
    const itemShakeAnime = function() {
		$('.js-sort-shake').on('click',function(){
    		let itemShakeAnimeHref = $(this).attr('href');
    		let itemShakeAnimeHtml = '<div class="l-modal-shake js-modal-shake-bg"><div class="c-modal-shake"><img src="./images/common/img_shake.gif"></div></div>';
			$('body').append(itemShakeAnimeHtml);
			$('.c-modal-shake img').fadeIn();
		    setTimeout(function(){
    			$('.c-modal-shake img').fadeOut();
			},900);
			setTimeout(function(){
				location.href = itemShakeAnimeHref;
			},1500);
			return false;
		});
	}


	// category：ページ最下部でモーダル表示
    const modalItemLast = function() {
    	if($('#top').length ){
    		let modalItemLastFlag = false;
    		const modalItemLastHtml = '<div class="l-modal-last js-modal-last-bg"><div class="c-modal-last-close"></div><div class="c-modal-last">'+
    									'<h2 class="c-modal-last-title">すべてのアイテムを閲覧しました。</h2>' +
    									'<form action="/presentage/item.php?pnumflag=1" method="post"><dl class="c-modal-last-input"><dt>気になるアイテムを検索される方はこちら</dt>'+
    									'<dd><input name="keyWord" id="keyWord" type="text" placeholder="何をお探しですか？" value="" class="c-modal-last-input-text">'+
    									'<input type="submit" class="c-modal-last-input-submit" value="検 索"></dd></dl></form>' +
    									'<dl class="c-modal-last-pagetop"><dt>最初からアイテムをご覧の方はこちら</dt><dd><a href="#top" class="c-modal-last-pagetop-link js-modal-scrolltop">ページトップに戻る</a></dd></dl></div></div>';
			$(window).on('scroll', function () {
				let modalItemLastHeight = $(document).innerHeight(),
					modalItemLastInHeight = $(window).innerHeight(),
					modalItemLastBottom = modalItemLastHeight - modalItemLastInHeight
				if (modalItemLastBottom - 40 <= $(window).scrollTop() && modalItemLastFlag === false) {
					$('body').append(modalItemLastHtml);
					modalItemLastFlag = true;
				}
			});
			$(document).on('click','.js-modal-last-bg', function(e) {
			    if(!$(e.target).closest('.c-modal-last').length){
					$('.js-modal-last-bg').remove();
			    }
			});
			$(document).on('click','.js-modal-scrolltop', function(e) {
				$('.js-modal-last-bg').remove();
				var speed = 500;
				var href= jQuery(this).attr("href");
				var target = jQuery(href == "#" || href == "" ? 'html' : href);
				var position = target.offset().top;
				jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
				return false;
			});
		}
	}


	// cart & お問い合わせ：プライバシーポリシー同意
    const privacypolicyAgree = function() {
    	if($('.js-agree').length ){
			$('.js-agree').on('click',function(){
	    		if ($(this).prop("checked") == true) {
	            	$(".js-agree-btn").addClass('is-on');
	          	}else {
	            	$(".js-agree-btn").removeClass('is-on');
	          	}
			});
		}
	}


	// TOP：初回訪問時の説明動画モーダル
    const modalFirstMovie = function() {
    	if(localStorage.getItem('firstMovie') == null){
    	 	localStorage.setItem('firstMovie','on');
    	    let modalFirstMovieWidth = $(window).width(),
		    	modalFirstMoviePoint = 768,
		    	modalFirstMovieFile = '';
		    if (modalFirstMovieWidth <= modalFirstMoviePoint) {
		    	modalFirstMovieFile = 'movie_sp.mp4';
		    }else{
		    	modalFirstMovieFile = 'movie_pc.mp4';
		    }
    		let modalFirstMovieHtml = '<div class="l-modal-movie js-modal-movie-bg"><div class="c-modal-movie-close"></div><div class="c-modal-movie">'+
    									'<video preload="none" autoplay muted playsinline controls><source src="./images/common/' + modalFirstMovieFile + '" type="video/mp4"></video>' +
    									'</div></div>';

			$('body').append(modalFirstMovieHtml);
			$(document).on('click','.js-modal-movie-bg', function(e) {
			    if(!$(e.target).closest('.c-modal-movie video').length){
			    	$('.js-modal-movie-bg').fadeOut('fast', function() {
    					setTimeout(function(){
    						$('.js-modal-movie-bg').remove();
	    				},300);
    				});
			    }
			});
    	}
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


	// common：loading表示
    const viewLoading= function() {
	    $('.js-loading').on('click', function() {
			const ua = navigator.userAgent.toLowerCase();
			const viewLoadingScript = document.createElement("link");
			viewLoadingScript.href = './css/loaders.css';
			viewLoadingScript.rel = 'stylesheet';
			document.body.appendChild(viewLoadingScript);
    		const viewLoadingHtml = '<div class="l-modal-loading"><div class="c-modal-loading"><div class="loader"><div class="ball-grid-beat"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div>';
			$('body').append(viewLoadingHtml);
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


	// common：demo表示削除
    const demoDelete = function() {
    	if($('.js-exlogin-delete').length){
    		if(localStorage.getItem('demoFixed') == null){
    			$('.js-exlogin-delete').on('click', function() {
					$('.l-exlogin').fadeOut();
					localStorage.setItem('demoFixed','on');
	    		});
    		}else{
    			$('.l-exlogin').remove();
    		}
	    }
	}


	$(window).on('load', function() {
		scrollTop();
		fixedElement();
		fixedMainSticky();
		renderMasonry();
		itemMylistBtn();
		itemModalMylistBtn();
		itemMylistRemoveBtn();
		modalItemView();
		modalItemHide();
		modalItemSlidedown();
		modalItemRelation();
		modalRelationMylistBtn();
		modalItemShare();
		spFooterSticky();
		spFooterSort();
		itemDetailRefine();
		itemDetailView();
		mylistRelation();
		myListRefine();
		myListMylistBtn();
		myListExplanModal();
		myListExplanModalDel();
		itemDetailSticky();
		categoryItemRefine();
		itemShakeAnime();
		modalItemLast();
		privacypolicyAgree();
		//modalFirstMovie();
		naviSpCategory();
		viewLoading();
		viewTablet();
		demoDelete();
	});
});

// カテゴリ アコーディオン
// $(function () {
//   $(".more").click(function () {
//       $(this).fadeOut();
//       $(".content").removeClass("hide");
//   });
// });
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
		// infinite:false
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
    // fade: true,
    speed: 400,
    variableWidth: true,
    // infinite:false
  });

});
