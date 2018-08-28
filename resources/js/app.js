// jQuery core
window.jQuery = window.$ = require('./vendor/jquery.js');

// These all require jQuery
require('./vendor/prism.js');
require('./vendor/bootstrap.js');
require('./vendor/typeahead.js');
require('./vendor/scotchPanels.js');

// Standalone vendor libraries
const Mousetrap = require('./vendor/mousetrap.js');
import Vue from 'vue';

new Vue({
  el: 'nav.main',
  data: {
    search: ''
  },
  methods: {
    reset: function() {
      this.search = '';
    }
  }
})


jQuery(function($) {

  // Smooth scroll to anchor
  $('body.home a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var scotchPanel = $('#slide-menu').scotchPanel({
    containerSelector: 'body',
    direction: 'left',
    duration: 300,
    transition: 'ease',
    distanceX: '70%',
    forceMinHeight: true,
    minHeight: '2500px',
    enableEscapeKey: true
  }).show(); // show to avoid flash of content

  $('.toggle-slide').click(function() {
    scotchPanel.css('overflow', 'scroll');
    scotchPanel.toggle();
    return false;
  });

  $('.overlay').click(function() {
    // CLOSE ONLY
    scotchPanel.close();
  });

  // Hide the slide menu when changing the browser width

  function checkSize() {
    if (window.matchMedia("(min-width: 960px)").matches) {
      scotchPanel.close();
    }
  }

  checkSize();
  window.onresize = checkSize;

  // gheading links
  $('.docs-wrapper').find('a[name]').each(function () {
    var anchor = $('<a href="#' + this.name + '"/>');
    $(this).parent().next('h2').wrapInner(anchor);
  });

  // It's nice to just write in Markdown, so this will adjust
  // our blockquote style to fill in the icon flag and label
  $('.docs blockquote p:first-child').each(function() {
    var str = $(this).html();
    var match = str.match(/\{(.*?)\}/);

    if (match) {
      var icon = match[1] || false;
      var word = match[1] || false;
    }

    if (icon) {
      switch (icon) {
        case "note":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="90px" height="90px" viewBox="0 0 90 90" enable-background="new 0 0 90 90" xml:space="preserve"><path fill="#FFFFFF" d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zM45 74.5c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5S48.6 74.5 45 74.5zM52.1 23.9l-2.5 29.6c0 2.5-2.1 4.6-4.6 4.6 -2.5 0-4.6-2.1-4.6-4.6l-2.5-29.6c-0.1-0.4-0.1-0.7-0.1-1.1 0-4 3.2-7.2 7.2-7.2 4 0 7.2 3.2 7.2 7.2C52.2 23.1 52.2 23.5 52.1 23.9z"/></svg>';
          break;
        case "success":
            icon = '\n' +
                '<svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
                '    <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->\n' +
                '    <desc>Created with Sketch.</desc>\n' +
                '    <defs></defs>\n' +
                '    <g id="Page" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
                '        <g id="icons8-verified_account" transform="translate(0.000000, -652.000000)" fill="#FFFFFF" fill-rule="nonzero">\n' +
                '            <g id="icons8-approval" transform="translate(0.000000, 652.000000)">\n' +
                '                <path d="M25.761719,13.859375 L24.242188,11.464844 L25.140625,8.777344 C25.265625,8.410156 25.113281,8.007813 24.777344,7.8125 L22.320313,6.398438 L21.867188,3.597656 C21.804688,3.214844 21.480469,2.929688 21.097656,2.914063 L18.261719,2.804688 L16.558594,0.53125 C16.328125,0.222656 15.90625,0.121094 15.5625,0.285156 L13,1.503906 L10.4375,0.285156 C10.089844,0.121094 9.671875,0.222656 9.4375,0.53125 L7.738281,2.804688 L4.902344,2.914063 C4.519531,2.929688 4.195313,3.214844 4.132813,3.597656 L3.679688,6.394531 L1.222656,7.8125 C0.886719,8.003906 0.734375,8.40625 0.855469,8.773438 L1.757813,11.464844 L0.238281,13.859375 C0.03125,14.1875 0.0859375,14.613281 0.363281,14.882813 L2.410156,16.847656 L2.183594,19.671875 C2.152344,20.058594 2.394531,20.410156 2.765625,20.519531 L5.492188,21.304688 L6.601563,23.914063 C6.753906,24.269531 7.132813,24.476563 7.511719,24.394531 L10.289063,23.824219 L12.484375,25.621094 C12.632813,25.742188 12.816406,25.804688 13,25.804688 C13.183594,25.804688 13.363281,25.742188 13.515625,25.621094 L15.710938,23.824219 L18.488281,24.394531 C18.867188,24.476563 19.25,24.273438 19.398438,23.914063 L20.507813,21.304688 L23.234375,20.519531 C23.605469,20.414063 23.847656,20.058594 23.816406,19.671875 L23.589844,16.847656 L25.636719,14.882813 C25.914063,14.613281 25.96875,14.1875 25.761719,13.859375 Z M18.878906,9.949219 L13.1875,18.476563 C12.972656,18.792969 12.636719,19.007813 12.308594,19.007813 C11.976563,19.007813 11.609375,18.820313 11.371094,18.585938 L7.195313,14.339844 C6.910156,14.050781 6.910156,13.582031 7.195313,13.289063 L8.226563,12.242188 C8.511719,11.953125 8.972656,11.953125 9.257813,12.242188 L11.976563,15.003906 L16.460938,8.285156 C16.683594,7.945313 17.140625,7.859375 17.472656,8.089844 L18.683594,8.921875 C19.015625,9.148438 19.101563,9.613281 18.878906,9.949219 Z" id="Shape"></path>\n' +
                '            </g>\n' +
                '        </g>\n' +
                '    </g>\n' +
                '</svg>';
            break;
        case "tip":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="56.6px" height="87.5px" viewBox="0 0 56.6 87.5" enable-background="new 0 0 56.6 87.5" xml:space="preserve"><path fill="#FFFFFF" d="M28.7 64.5c-1.4 0-2.5-1.1-2.5-2.5v-5.7 -5V41c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v10.1 5 5.8C31.2 63.4 30.1 64.5 28.7 64.5zM26.4 0.1C11.9 1 0.3 13.1 0 27.7c-0.1 7.9 3 15.2 8.2 20.4 0.5 0.5 0.8 1 1 1.7l3.1 13.1c0.3 1.1 1.3 1.9 2.4 1.9 0.3 0 0.7-0.1 1.1-0.2 1.1-0.5 1.6-1.8 1.4-3l-2-8.4 -0.4-1.8c-0.7-2.9-2-5.7-4-8 -1-1.2-2-2.5-2.7-3.9C5.8 35.3 4.7 30.3 5.4 25 6.7 14.5 15.2 6.3 25.6 5.1c13.9-1.5 25.8 9.4 25.8 23 0 4.1-1.1 7.9-2.9 11.2 -0.8 1.4-1.7 2.7-2.7 3.9 -2 2.3-3.3 5-4 8L41.4 53l-2 8.4c-0.3 1.2 0.3 2.5 1.4 3 0.3 0.2 0.7 0.2 1.1 0.2 1.1 0 2.2-0.8 2.4-1.9l3.1-13.1c0.2-0.6 0.5-1.2 1-1.7 5-5.1 8.2-12.1 8.2-19.8C56.4 12 42.8-1 26.4 0.1zM43.7 69.6c0 0.5-0.1 0.9-0.3 1.3 -0.4 0.8-0.7 1.6-0.9 2.5 -0.7 3-2 8.6-2 8.6 -1.3 3.2-4.4 5.5-7.9 5.5h-4.1H28h-0.5 -3.6c-3.5 0-6.7-2.4-7.9-5.7l-0.1-0.4 -1.8-7.8c-0.4-1.1-0.8-2.1-1.2-3.1 -0.1-0.3-0.2-0.5-0.2-0.9 0.1-1.3 1.3-2.1 2.6-2.1H41C42.4 67.5 43.6 68.2 43.7 69.6zM37.7 72.5H26.9c-4.2 0-7.2 3.9-6.3 7.9 0.6 1.3 1.8 2.1 3.2 2.1h4.1 0.5 0.5 3.6c1.4 0 2.7-0.8 3.2-2.1L37.7 72.5z"/></svg>'
          break;
        case "example":
            icon = '\n' +
                '<svg width="50px" height="41px" viewBox="0 0 50 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
                '    <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->\n' +
                '    <desc>Created with Sketch.</desc>\n' +
                '    <defs></defs>\n' +
                '    <g id="Portofolio-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
                '        <g id="example" fill="#FFFFFF" fill-rule="nonzero">\n' +
                '            <path d="M4,0 C1.800781,0 0,1.800781 0,4 L0,26 C0,27.898438 1,29.5 2.699219,29.902344 L24.097656,36.097656 C24.398438,36.199219 24.800781,36.199219 25.097656,36.199219 C25.785156,36.199219 26.449219,35.988281 27.027344,35.628906 C27.054688,35.6875 27.070313,35.746094 27.097656,35.800781 C27.597656,36.699219 28.402344,37.300781 29.402344,37.597656 L40,40.699219 C40.300781,40.800781 40.699219,40.800781 41,40.800781 C42.699219,40.800781 44.199219,39.800781 44.597656,38.097656 L47.007813,29.855469 C48.71875,29.402344 50,27.851563 50,26 L50,4 C50,1.800781 48.199219,0 46,0 L34,0 C32.800781,0 31.734375,0.546875 31,1.390625 C30.265625,0.546875 29.199219,0 28,0 L4,0 Z M4,2 L28,2 C29.101563,2 30,2.898438 30,4 L30,5 L32,5 L32,4 C32,2.898438 32.898438,2 34,2 L46,2 C47.101563,2 48,2.898438 48,4 L48,26 C48,27.101563 47.101563,28 46,28 L34,28 C32.898438,28 32,27.101563 32,26 L32,25 L30,25 L30,26 C30,27.101563 29.101563,28 28,28 L4,28 C3.460938,28 2.96875,27.78125 2.609375,27.429688 C2.269531,27.082031 2.050781,26.589844 2,26 L2,4 C2,2.898438 2.898438,2 4,2 Z M12.5,7 C9.300781,7 7,9.300781 7,12.5 C7,15.601563 14.601563,23 16,23 C16.300781,23 16.5,22.902344 16.699219,22.800781 C18.597656,21.101563 25,15.601563 25,12.5 C25,9.300781 22.699219,7 19.5,7 C18.300781,7 17.101563,7.5 16,8.402344 C14.800781,7.5 13.699219,7 12.5,7 Z M30,7 L30,11 L32,11 L32,7 L30,7 Z M36,8 L36,16 L44,16 L44,8 L36,8 Z M12.5,9.199219 C13.300781,9.199219 14.300781,9.699219 15.199219,10.699219 C15.597656,11.097656 16.300781,11.097656 16.699219,10.699219 C17.699219,9.699219 18.601563,9.199219 19.402344,9.199219 C21.402344,9.199219 22.800781,10.5 22.800781,12.5 C22.800781,13.800781 19.300781,17.597656 15.902344,20.597656 C14.101563,19.097656 9.101563,14.300781 9.101563,12.5 C9.101563,10.5 10.398438,9.199219 12.5,9.199219 Z M38,10 L42,10 L42,14 L38,14 L38,10 Z M30,13 L30,17 L32,17 L32,13 L30,13 Z M30,19 L30,23 L32,23 L32,19 L30,19 Z M36,20 L36,22 L44,22 L44,20 L36,20 Z M31,28.609375 C31.734375,29.453125 32.800781,30 34,30 L44.769531,30 L42.597656,37.5 C42.5,37.898438 42.199219,38.300781 41.800781,38.5 C41.402344,38.800781 41,38.800781 40.5,38.699219 L29.902344,35.597656 C29.5,35.5 29.101563,35.199219 28.902344,34.800781 C28.601563,34.402344 28.597656,33.898438 28.699219,33.5 L29,32.597656 L27.097656,32 L26.800781,32.902344 C26.699219,33.300781 26.398438,33.699219 26,33.902344 C25.5,34.199219 25.097656,34.199219 24.597656,34.097656 L10.402344,30 L27.640625,30 L27.542969,30.3125 L29.453125,30.910156 L29.890625,29.5 C30.3125,29.269531 30.6875,28.96875 31,28.609375 Z" id="Shape"></path>\n' +
                '        </g>\n' +
                '    </g>\n' +
                '</svg>'
          break;
        case "laracast":
        case "video":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="68.9px" height="59.9px" viewBox="0 0 68.9 59.9" enable-background="new 0 0 68.9 59.9" xml:space="preserve"><path fill="#FFFFFF" d="M63.7 0H5.3C2.4 0 0 2.4 0 5.3v49.3c0 2.9 2.4 5.3 5.3 5.3h58.3c2.9 0 5.3-2.4 5.3-5.3V5.3C69 2.4 66.6 0 63.7 0zM5.3 4h58.3c0.7 0 1.3 0.6 1.3 1.3V48H4V5.3C4 4.6 4.6 4 5.3 4zM13 52v4h-2v-4H13zM17 52h2v4h-2V52zM23 52h2v4h-2V52zM29 52h2v4h-2V52zM35 52h2v4h-2V52zM41 52h2v4h-2V52zM4 54.7V52h3v4H5.3C4.6 56 4 55.4 4 54.7zM63.7 56H47v-4h18v2.7C65 55.4 64.4 56 63.7 56zM26 38.7c0.3 0.2 0.7 0.3 1 0.3 0.4 0 0.7-0.1 1-0.3l17-10c0.6-0.4 1-1 1-1.7s-0.4-1.4-1-1.7l-17-10c-0.6-0.4-1.4-0.4-2 0s-1 1-1 1.7v20C25 37.7 25.4 38.4 26 38.7zM29 20.5L40.1 27 29 33.5V20.5z"/></svg>';
          break;
      }
      $(this).html(str.replace(/\{(.*?)\}/, '<div class="flag"><span class="svg">'+ icon +'</span></div>'));
      $(this).parent().addClass('has-icon ' + word);
    }
  });

  Mousetrap.bind('/', function(e) {
    e.preventDefault();
    $('#search-input').focus();
  });

  Mousetrap.bind(["ctrl+b", "command+b"], function(e) {
    e.preventDefault();
    $(".sidebar").find( "h2" ).addClass('is-active');
  });

  // collapse and expand for the sidebar
  var toggles = document.querySelectorAll('.sidebar h2'),
      togglesList = document.querySelectorAll('.sidebar h2 + ul');

  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', expandItem);
    toggles[i].addEventListener('keydown', expandItemKeyboard);
    toggles[i].setAttribute('tabindex', '0');
  }

  // Via https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
  function storageAvailable(type) {
    try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
    }
  }

  // Track the state of the doc collapse
  var docCollapsed = true;
  function expandDocs(e) {
    for (var i = 0; i < toggles.length; i++) {
      if(docCollapsed) {
        toggles[i].classList.add('is-active')
      } else {
        toggles[i].classList.remove('is-active')
      }
    }

    // Modify states
    docCollapsed = !docCollapsed;
    document.getElementById('doc-expand').text = (docCollapsed ? 'Expand All' : 'Collapse All');

    // Modify LS if we can
    if (storageAvailable('localStorage')) {
      localStorage.setItem('laravel_docCollapsed', docCollapsed);
    }
    // Cancel event
    if(e) {
      e.preventDefault();
    }
  }

  if (document.getElementById('doc-expand')) {
    // Load the users previous preference if available
    if(storageAvailable('localStorage')) {
      // Can't use if(var) since this is a boolean, LS returns null for unset keys
      if(localStorage.getItem('laravel_docCollapsed') === null) {
        localStorage.setItem('laravel_docCollapsed', true)
      } else {
        // Load previous state, and if it was false, then expand the doc
        // LS will store booleans as strings, we will "cast" them back here
        localStorage.getItem('laravel_docCollapsed') == 'false' ? expandDocs() : null
      }
    }

    // Register event listener
    document.getElementById('doc-expand').addEventListener('click', expandDocs);
  }

  if ($('.sidebar ul').length) {
    var current = $('.sidebar ul').find('li a[href="' + window.location.pathname + '"]');

    if (current.length) {
      current.parent().css('font-weight', 'bold');

      // Only toggle the state if the user has collapsed the documentation
      if(docCollapsed) {
        current.closest('ul').prev().toggleClass('is-active');
      }
    }
  }

  function expandItem(e) {
    var elem = e.target;

    if(elem.classList.contains('is-active')) {
      elem.classList.remove('is-active');
    } else {
      clearItems();
      elem.classList.add('is-active');
    }
  }

  function expandItemKeyboard(e) {
    var elem = e.target;

    if ([13, 37, 39].includes(e.keyCode)) {
      clearItems();
    }

    if (e.keyCode === 13) {
      elem.classList.toggle('is-active');
    }

    if (e.keyCode === 39) {
      elem.classList.add('is-active');
    }

    if (e.keyCode === 37) {
      elem.classList.remove('is-active');
    }
  }

  function clearItems() {
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].classList.remove('is-active');
    }
  }
});