/*
.-._                                                   _,-,
  `._`-._           I see you looking at            _,-'_,'
     `._ `-._             my code.              _,-' _,'
        `._  `-._        __.-----.__        _,-'  _,'
           `._   `#==="""           """===#'   _,'
              `._/)  ._               _.  (\_,'
               )*'     **.__     __.**     '*( 
               #  .==..__  ""   ""  __..==,  # 
Deelkar        #   `"._(😀).       .(😀)_."'   #               */


var debug = false;

var matrixInterval = 33; // refresh rate; 33 is default
var matrixEaseMultiplier = 1; // 1 = no spacing between columns, 16 = high spacing
var lowFPSThreshold = 30; // If FPS dips below this change matrix ease multiplier to lowFPSMatrixEaseMultiplier
var lowFPSTime = 2; // The amount of time spent below lowFPSThreshold before switching
var ultraLowFPSTime = 5; // If the FPS has been below lowFPSThreshold this long we will disable the matrix
var lowFPSMatrixEaseMultiplier = 16; // This will be used when FPS is below lowFPSThreshold
var benchmarkDuration = 6; // How long to perform a benchmark for (this need to be higher than ultraLowFPSTime)
var disableMatrix = false;

// Matrix varitions:
var matrix_default = 30000;
var matrix_runic = 1200;
var matrix_chinese = 2300; 
var matrix_blocks = 9600; // dramatic
var matrix_pipes = 10200;
var matrix_braille = 10400;
var matrix_circles = 12900;

var matrixBeginText = matrix_blocks; // What character alphabet to start at: String.fromCharCode(matrixBeginText+Math.random()*33); //default: 3e4

function initThexTech() {
  if (debug) initDebugText();
  new SimpleBar($('#tvcontent')[0], { autoHide: false });
  beginMatrix();
  tt_benchmarkLoop();
  setInterval(tt_mainLoop, 1000);
}

function tt_mainLoop() {
 matrix_benchmark();
}

var tt_timeLowFPS = 0
var tt_timeBenchmarking = 0;
var doBenchmark = true;
function matrix_benchmark() {
  if (doBenchmark == false) return;
  tt_timeBenchmarking++;
  if (tt_fps < lowFPSThreshold) {
    tt_timeLowFPS++;
    if (tt_timeLowFPS >= lowFPSTime) {
      matrixEaseMultiplier = lowFPSMatrixEaseMultiplier;
    }
    if (tt_timeLowFPS >= ultraLowFPSTime) {
      disableMatrix = true;
      $("#matrix").hide('slow');
      clearInterval(matrixIntId);
    }
  }
  if (tt_timeBenchmarking >= benchmarkDuration) {
    doBenchmark = false;
  }
}

let matrixIntId;
function beginMatrix() {
  var s = window.screen;
  var width = q.width = $(window).width();
  var height = q.height = $(window).height();
  var letters = Array(256).join(1).split('');

  letters.map(function(y_pos, index) {
    letters[index] = Math.floor(Math.random() * Math.floor(height));
  });

  var draw = function () {
    if (disableMatrix) { return; }
    q.getContext('2d').fillStyle='rgba(0,0,0,.05)';
    q.getContext('2d').fillRect(0,0,width*matrixEaseMultiplier,height);
    q.getContext('2d').fillStyle='#f9047b';
    letters.map(function(y_pos, index){
      text = String.fromCharCode(matrixBeginText+Math.floor(Math.random()*33));
      x_pos = index * 10;
      q.getContext('2d').fillText(text, matrixEaseMultiplier*x_pos, y_pos);
      letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
    });
  };
  matrixIntId = setInterval(draw, matrixInterval);
}

function initDebugText() {
  var debugText = '<div id=debugText><h2 class=tt id=fpsDisplay>000</h2></div>';
  $("#tvbody").append(debugText);
  var debugRun = function () {
   $('#fpsDisplay').text("FPS: " + tt_fps);
  }
  setInterval(debugRun, 100);
}

const tt_bm_times = [];
let tt_fps;
function tt_benchmarkLoop() {
  if (doBenchmark == false) return;
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (tt_bm_times.length > 0 && tt_bm_times[0] <= now - 1000) {
      tt_bm_times.shift();
    }
    tt_bm_times.push(now);
    tt_fps = tt_bm_times.length;
    tt_benchmarkLoop();
  });
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).ready(function() { initThexTech(); });

