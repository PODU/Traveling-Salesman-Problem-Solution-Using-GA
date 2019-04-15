var canvas, ctx;
var WIDTH, HEIGHT;
var points = [];
var running;
var canvasMinX, canvasMinY;
var doPreciseMutate;

var POPULATION_SIZE;
var ELITE_RATE;
var CROSSOVER_PROBABILITY;
var MUTATION_PROBABILITY;
var OX_CROSSOVER_RATE;
var UNCHANGED_GENS;

var mutationTimes;
var dis;
var bestValue, best;
var currentGeneration;
var currentBest;
var population;
var values;
var fitnessValues;
var roulette;
var map;
var markers;
var greenIcon = L.icon({
  iconUrl: './img/black.png',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
  popupAnchor: [-3, -76]
});
var markers = new Array();
var polylines = new Array();

$(function () {
  init();
  initData();
  //points = data40;
  $('#random').click(function () {
    addRandomPoints(10,cities);
    var c = parseInt($('#city').html());
    $('#city').html(c + 10);
    running = false;
  });
  $('#world').click(function () {
    addRandomPoints(10,countries);
    var c = parseInt($('#city').html());
    $('#city').html(c + 10);
    running = false;
  });
  $('#india').click(function () {
    addRandomPoints(10,indian_cities);
    var c = parseInt($('#city').html());
    $('#city').html(c + 10);
    running = false;
  });
  $('#pune').click(function () {
    addRandomPoints(10,pune);
    var c = parseInt($('#city').html());
    $('#city').html(c + 10);
    running = false;
  });
  $('#start').click(function () {
    if (points.length >= 3) {
      initData();
      GAInitialize();
      running = true;
    } else {
      alert("Add some more points to the map!");
    }
  });
  $('#clear').click(function () {
    running = false;
    initData();
    points = new Array();
    $('#city').html(points.length);
    $('#gen').html(0);
    $('#time').html(0);
    $('#score').html(0);
    for (var i = 0; i < markers.length; i++) {
      map.removeLayer(markers[i]);
    }
    markers = new Array();
    for (var i = 0; i < polylines.length; i++) {
      map.removeLayer(polylines[i]);
    }
    polylines = new Array();
    cities = cities2;

  });
  $('#stop').click(function () {
    running = false;
  });
});
function shuffle_array(arra1) {
  var ctr = arra1.length, temp, index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}
function init() {
  map = L.map('mapid').setView([18.5204, 73.8567], 4);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: ''
  }).addTo(map);
  setInterval(draw, 10);
  map.on('click', init_mouse);
}
function init_mouse(e) {
  if (!running) {
    var newMarker = new L.marker(e.latlng, { icon: greenIcon }).addTo(map);
    points.push(new Point(e.latlng.lat, e.latlng.lng));
    markers.push(newMarker);
  }
}
function initData() {
  running = false;
  POPULATION_SIZE = 30;
  ELITE_RATE = 0.3;
  CROSSOVER_PROBABILITY = 0.9;
  MUTATION_PROBABILITY = 0.01;
  //OX_CROSSOVER_RATE = 0.05;
  UNCHANGED_GENS = 0;
  mutationTimes = 0;
  doPreciseMutate = true;

  bestValue = undefined;
  best = [];
  currentGeneration = 0;
  currentBest;
  population = []; //new Array(POPULATION_SIZE);
  values = new Array(POPULATION_SIZE);
  fitnessValues = new Array(POPULATION_SIZE);
  roulette = new Array(POPULATION_SIZE);
}
function addRandomPoints(number,x) {
  running = false;
  for (var i = 0; i < number; i++) {
    var obj = randomPoint(x);
    if (obj!=false) {
      points.push(obj);
      var newMarker = new L.marker([obj.x, obj.y], { icon: greenIcon }).addTo(map);
      markers.push(newMarker);
    }
  }
}
function drawCircle(point) {
  var newMarker = new L.marker([point.x, point.y], { icon: greenIcon }).addTo(map);
  markers.push(newMarker);
}
function drawLines(array) {
  for (var i = 0; i < (array.length - 1); i++) {
    var p = new L.Polyline([[points[array[i]].x, points[array[i]].y], [points[array[i + 1]].x, points[array[i + 1]].y]], {
      color: 'red',
      weight: 3,
      opacity: 1,
      smoothFactor: 1
    }).addTo(map);
    polylines.push(p);
  }
  var z = array.length - 1;
  var p = new L.Polyline([[points[array[z]].x, points[array[z]].y], [points[array[0]].x, points[array[0]].y]], {
    color: 'red',
    weight: 3,
    opacity: 1,
    smoothFactor: 1
  }).addTo(map);
  polylines.push(p);
}
function draw() {
  if (running) {
    GANextGeneration();
    $('#city').html(points.length);
    $('#gen').html(currentGeneration);
    $('#time').html(mutationTimes);
    $('#score').html(bestValue);
  } else {
    /*$('#city').html(points.length);
    $('#gen').html(0);
    $('#time').html(0);
    $('#score').html(0);*/
  }
  clearCanvas();
  if (points.length > 0) {
    for (var i = 0; i < points.length; i++) {
      drawCircle(points[i]);
    }
    if (best.length === points.length) {
      //alert(best);
      drawLines(best);
    }
  }
}
function clearCanvas() {
  for (var i = 0; i < markers.length; i++) {
    map.removeLayer(markers[i]);
  }
  markers = new Array();
  for (var i = 0; i < polylines.length; i++) {
    map.removeLayer(polylines[i]);
  }
  polylines = new Array();
}
