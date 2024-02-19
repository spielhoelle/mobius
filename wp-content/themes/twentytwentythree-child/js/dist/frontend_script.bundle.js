/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************************************!*\
  !*** ./wp-content/themes/twentytwentythree-child/js/src/frontend_script.js ***!
  \*****************************************************************************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var useLS = false;
var videos = _toConsumableArray(document.querySelectorAll('.overlay'));
var categories = _toConsumableArray(document.querySelectorAll('.category_selector'));
var container = document.querySelector('.wp-block-create-block-tmy-mediacategories.categories .videos');
var playing = 0;
var siteBlocks = document.body;
var alreadyPlayed = localStorage.getItem('mobius_sequence');
var alreadyPlayedTimeStamp = useLS ? Number(alreadyPlayed) : Date.now() - 80000;
if (container) {
  categories.map(function (category, index) {
    category.addEventListener('click', function (e) {
      e.preventDefault();
      videos.forEach(function (video, i) {
        var videoCats = JSON.parse(video.dataset.seqcatid);
        console.log('videoCats', videoCats);
        if (!videoCats.includes(Number(e.target.dataset.catid))) {
          video.classList.add('hidden');
          video.pause();
        } else {
          video.classList.remove('hidden');
          video.play();
        }
      });
    });
  });
  container.addEventListener('click', function (e) {
    siteBlocks.classList.remove('loading');
    if (videos[playing]) {
      if (e.metaKey && e.shiftKey) {
        container.classList.add('hidden');
      } else if (e.shiftKey) {
        container.classList.toggle('active');
      } else {
        videos[playing].pause();
        if (videos[playing + 1]) {
          videos[playing + 1].classList.remove('hidden');
          videos[playing + 1].play();
        }
      }
      if (useLS) {
        localStorage.setItem('mobius_sequence', Date.now());
      }
    }
  });
}
if (videos[0]) {
  if (!alreadyPlayedTimeStamp || alreadyPlayedTimeStamp + 60000 < Date.now()) {
    videos[0].onloadeddata = function () {
      videos.map(function (video, index) {
        siteBlocks.classList.remove('loading');
        if (videos[index]) {
          videos[index].addEventListener("pause", function () {
            playing = (playing + 1) % videos.length;
            videos[index].pause();
            videos[index].classList.add('hidden');
            if (videos[(index + 1) % videos.length]) {
              console.log("Video ".concat(index, " paused, play next"));
              videos[(index + 1) % videos.length].classList.remove('hidden');
              videos[(index + 1) % videos.length].play();
            }
          });
        }
      });
    };
  } else {
    siteBlocks.classList.remove('loading');
    videos[0].classList.add('hidden');
    container.classList.add('hidden');
  }
}
/******/ })()
;