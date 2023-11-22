

// Для попапа карты
smc = document.getElementById('svg-map-card');
// Обработчики клика на ген план
for (let node of document.getElementById('svg-map').childNodes) {
  console.log(node); // покажет все узлы из коллекции
	node.addEventListener("click", (event) => {
		el = event.currentTarget;
		console.log(el)
		console.log(el.getAttribute("id"));
		console.log('Coords: ' + event.clientX + ':' + event.clientY);
		smc.style.top = event.clientY + window.pageYOffset - 200 + 'px';
		smc.style.left = event.clientX + window.pageXOffset + 50 + 'px';
	});
}

// popup close

// open faq
$(document).ready(function() {
	$('.faq__question').click(function(event) {
		if($('.faq__items').hasClass('one')) {
			$('.faq__question').not($(this)).removeClass('active');
			$('.faq__answer').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
});
