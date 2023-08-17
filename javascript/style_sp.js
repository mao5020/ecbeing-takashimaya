$(document).ready(function(){
	$(".c-itemdetail-list").each(function(){
			var title = $(this).find(".c-itemdetail-title");
						title.insertBefore($(this).find(".l-itemdetail-item-imgwrap"));
	});
});

$(document).ready(function(){
	$(".c-itemdetail-list").each(function(){
			var btnMyList = $(this).find(".c-modal-item-btn-mylist");
			var btnShare = $(this).find(".c-modal-item-btn-share");
			btnMyList.add(btnShare).wrapAll('<div class="c-modal-item-btn-under"></div>');
	});
});


$(document).ready(function(){
	$(".c-itemdetail-list").each(function(){
			var title = $(this).find(".c-itemdetail-title");
						title.insertBefore($(this).find(".modal-slider-item-imgwrap"));
	});
});

$(document).ready(function(){
	$(".c-itemdetail-list").each(function(){
			var btnMyList = $(this).find(".c-modal-item-btn-mylist");
			var btnShare = $(this).find(".c-modal-item-btn-share");
			btnMyList.add(btnShare).wrapAll('<div class="c-modal-item-btn-under"></div>');
	});
});