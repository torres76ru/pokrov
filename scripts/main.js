AOS.init();

// <ADAPTIVE> ==========================================================

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
const headerTop = document.querySelector('.header__top');
const headerBottom = document.querySelector('.header__bottom');
const headerLogo = document.querySelector('.header__logo');
const headerLogoDesktop = headerLogo.parentNode;
const ulTop = document.querySelector('#ul-header-top');
const ulBottom = document.querySelector('#ul-header-bottom');
const destinationBurger = document.querySelector('.mobile-menu');
const destinationLogo = document.querySelector('#header-logo-mobile');

function setBurger() {
  if (headerLogoDesktop.querySelector('.header__logo')) {
    destinationLogo.appendChild(headerLogo);
  }
}

function removeBurger() {
  if (destinationLogo.querySelector('.header__logo')) {
    headerLogoDesktop.prepend(headerLogo);
  }
}
const footerBrands = document.querySelector('.contacts__brands');
const footerMiddle = document.querySelector('.footer__middle');
const footerContacts = document.querySelector('.contacts');

function adjustFTM() {
  if (footerBrands.parentNode.classList.contains('contacts')) {
    footerMiddle.append(footerBrands);
  }
}
function adjustFTPC() {
  if (footerBrands.parentNode.classList.contains('footer__middle')) {
    footerContacts.insertBefore(footerBrands, footerContacts.childNodes[2]);
  }
}

let width = window.innerWidth;
function adjustHeader() {
  const width_for_burger = 767.98;
  width = window.innerWidth;
  if (width <= width_for_burger) {
    setBurger();
    adjustFTM();
  } else {
    removeBurger();
    adjustFTPC();
  }
}
adjustHeader();

window.addEventListener('resize', function () {
  adjustHeader();
});

// menu-icon
const menuIcon = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.header__row');
if (menuIcon) {
  menuIcon.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

$(document).ready(function () {
  var mySvg = document.getElementById('svg-image');
  const wrapperSvg = document.getElementById('svg-map-body');
  const rectWrapperSvg = wrapperSvg.getBoundingClientRect();
  var hammer = new Hammer(mySvg);

  // // Enable dragging
  var offsetX = 0;
  var offsetY = 0;
  var dx = 0;
  var dy = 0;
  let maxdx = mySvg.getBoundingClientRect().width / 2 - 400;
  let maxdy = mySvg.getBoundingClientRect().height / 2 - 200;
  hammer.on('pan', function (event) {
    dx = offsetX + event.deltaX;
    dy = offsetY + event.deltaY;
		// console.log("pan=================START===========");
		// console.log('map: ', dx, dy);
    // console.log('offset: ', offsetX, offsetY);
    if (dx > maxdx) {
			// console.log('right: ', dx, dy, maxdx, maxdy, offsetX, offsetY);
      dx = maxdx;
    }
    if (dx < -maxdx) {
			// console.log('left: ', dx, dy, maxdx, maxdy, offsetX, offsetY);
      dx = -maxdx;
    }
    if (dy > maxdy) {
			// console.log('top: ', dx, dy, maxdx, maxdy, offsetX, offsetY);
      dy = maxdy;
    }
    if (dy < -maxdy) {
			// console.log('down: ', dx, dy, maxdx, maxdy, offsetX, offsetY);
      dy = -maxdy;
    }

    
    // console.log('map: ', dx, dy);
    // console.log('offset: ', offsetX, offsetY);
		// console.log("pan=================END===========");
    mySvg.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
  });

  hammer.on('panend', function (event) {
    offsetX = dx;
    offsetY = dy;
		// console.log("panend============================================================");
		// console.log('map: ', dx, dy);
    // console.log('offset: ', offsetX, offsetY);
  });

  let container = document.getElementById('svg-map-body');
  let midpoint = container.scrollWidth / 2 - container.offsetWidth / 2;
  container.scrollLeft = midpoint;

  // Enable pinching for zooming
  // hammer.get('pinch').set({ enable: true });
  // hammer.on('pinch', function (event) {
  //   var scale = event.scale;
  //   mySvg.style.transform = 'scale(' + scale + ')';
  // });
});
// </ADAPTIVE> =========================================================

// <SVG-MAP> =========================================================

//const filename = 'https://www.xn----dtbjsbiobbcfop0t.xn--p1ai/api/squares/';
const filename = './data.json';
fetch(filename)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Обработка полученных данных
    $(document).ready(function () {
      let smc_id = $('#smc-number');
      let smc_size = $('#smc-size');
      let smc_status = $('#smc-status');
      let smc_price = $('#smc-price');
      let smc_card = $('#svg-map-card');
      let mfp = $('#modal-order-place');
      let scroll = false;
      // Обработчики клика на ген план
      for (let node of document.getElementById('svg-map').childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          id_element = node.getAttribute('id').split('-');
          id_element = id_element[id_element.length - 1];
          let foundObject = data.find((obj) => obj.id === parseInt(id_element));

          if (foundObject) {
            if (foundObject.status === 'забронирован') {
              $(node).addClass('reserved');
            } else if (foundObject.status === 'свободен') {
              $(node).addClass('available');
            } else {
              $(node).addClass('sold');
            }
          } else {
            console.log(`Объект с id ${id_element} не найден`);
          }
          $(node).on('click', function (event) {
            el = event.currentTarget;
            id_element = el.getAttribute('id').split('-');
            id_element = id_element[id_element.length - 1];
            let foundObject = data.find((obj) => obj.id === parseInt(id_element));
            if (scroll && width <= 991.98) {
              document.getElementById('svg-map-card').scrollIntoView({ behavior: 'smooth' });
              scroll = false;
            }
            if (foundObject) {
              if (foundObject.status === 'забронирован') {
                smc_card.addClass('svg-map-card__reserved');
                smc_card.removeClass('svg-map-card__sold');
              } else if (foundObject.status === 'свободен') {
                smc_card.removeClass('svg-map-card__reserved');
                smc_card.removeClass('svg-map-card__sold');
              } else {
                smc_card.addClass('svg-map-card__sold');
                smc_card.removeClass('svg-map-card__reserved');
              }
              smc_id.text(id_element);
              smc_size.text(foundObject.square);
              smc_status.text(foundObject.status);
              smc_price.text(foundObject.price);
              mfp.val(id_element);
            } else {
              console.log(`Объект с id ${id_element} не найден`);
            }
          });
        }
      }
      $('#svg-map')
        .contents()
        .each(function (index, node) {
          if ($(node).hasClass('available')) {
            $(node).click();
            return false;
          }
        });
      scroll = true;
    });
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

// </SVG-MAP> =========================================================
// <FAQ> =========================================================
$(document).ready(function () {
  $('.faq__question').click(function (event) {
    if ($('.faq__items').hasClass('one')) {
      $('.faq__question').not($(this)).removeClass('active');
      $('.faq__answer').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });
});

// </FAQ> =========================================================
// <POPUPS> =========================================================

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 500;
const stack = [];

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    // listeners for popup links
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    if (stack.length == 0) {
      bodyLock();
    }
    stack.push(curentPopup);

    curentPopup.classList.add('open');
    let clickedElement = null;

    curentPopup.addEventListener('mousedown', function (e) {
      clickedElement = e.target;
    });
    curentPopup.addEventListener('mouseup', function (e) {
      if (e.target === clickedElement) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    let index = stack.indexOf(popupActive);
    if (index > -1) {
      stack.splice(index, 1);
    }
    if (stack.length == 0) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('_lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }

    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    let item = stack[stack.length - 1];
    popupClose(item);
  }
});

document.querySelector('.modal-order__form').addEventListener('submit', function (event) {
  event.preventDefault();
  let item = stack[stack.length - 1];
  popupClose(item);
});
// </POPUPS> =========================================================
// <SMOOTH SCROLL> ===================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    if (menuIcon.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      menuIcon.classList.remove('_active');
      menuBody.classList.remove('_active');
    }
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// </SMOOTH SCROLL> ===================================================
// <INPUT ANIMATION> ==================================================

$(document).ready(function () {
  $('.input-cpc')
    .on('focus', function () {
      $(this).closest('.input-cpp').removeClass('required');
      $(this).closest('.input-cpp').addClass('focused');
    })
    .on('blur', function () {
      if ($(this).val() == '') {
        $(this).closest('.input-cpp').removeClass('focused');
        $(this).closest('.input-cpp').addClass('required');
      }
    });
});

// </INPUT ANIMATION> ==================================================
// <PHONE MASK> =======================================================

$(document).ready(function () {
  $('#modal-order-phone').inputmask({
    mask: '+9 (999) 999-9999', // Example of phone number mask
    placeholder: '_',
    showMaskOnFocus: true,
    showMaskOnHover: false,
  }); // Пример маски даты (можете заменить на нужную маску)
});

$(document).ready(function () {
  $('#modal-order-phone-sec').inputmask({
    mask: '+9 (999) 999-9999', // Example of phone number mask
    placeholder: '_',
    showMaskOnFocus: true,
    showMaskOnHover: false,
  }); // Пример маски даты (можете заменить на нужную маску)
});
// </PHONE MASK> =======================================================
//
var forms = document.getElementsByTagName('form');

for (var i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', function (event) {
    event.preventDefault();
  });
}
//
