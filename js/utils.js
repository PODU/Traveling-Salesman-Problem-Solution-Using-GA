Array.prototype.clone = function () { return this.slice(0); }
Array.prototype.shuffle = function () {
  for (var j, x, i = this.length - 1; i; j = randomNumber(i), x = this[--i], this[i] = this[j], this[j] = x);
  return this;
};
Array.prototype.indexOf = function (value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === value) {
      return i;
    }
  }
}
Array.prototype.deleteByValue = function (value) {
  var pos = this.indexOf(value);
  this.splice(pos, 1);
}
Array.prototype.next = function (index) {
  if (index === this.length - 1) {
    return this[0];
  } else {
    return this[index + 1];
  }
}
Array.prototype.previous = function (index) {
  if (index === 0) {
    return this[this.length - 1];
  } else {
    return this[index - 1];
  }
}
Array.prototype.swap = function (x, y) {
  if (x > this.length || y > this.length || x === y) { return }
  var tem = this[x];
  this[x] = this[y];
  this[y] = tem;
}
Array.prototype.roll = function () {
  var rand = randomNumber(this.length);
  var tem = [];
  for (var i = rand; i < this.length; i++) {
    tem.push(this[i]);
  }
  for (var i = 0; i < rand; i++) {
    tem.push(this[i]);
  }
  return tem;
}
Array.prototype.reject = function (array) {
  return $.map(this, function (ele) {
    return $.inArray(ele, array) < 0 ? ele : null;
  })
}
function intersect(x, y) {
  return $.map(x, function (xi) {
    return $.inArray(xi, y) < 0 ? null : xi;
  })
}
function Point(x, y) {
  this.x = x;
  this.y = y;
}
function searchArray(z, x) {
  for (var i = 0; i < z.length; i++) {
    var s = z[i];
    if (s[0] == x[0] && s[1] == x[1]) {
      return i;
    }
  }
  return -1;
}
function randomPoint(x) {
  if (x.length > 0) {
    var rand = x[Math.floor(Math.random() * x.length)];
    var idx = searchArray(x, rand);
    if (idx > -1) {
      x.splice(idx, 1);
    }
    var randomPoint = new Point(rand[0], rand[1]);
    return randomPoint;
  }else{
    return false;
  }
}
function randomNumber(boundary) {
  return parseInt(Math.random() * boundary);
  //return Math.floor(Math.random() * boundary);
}
function distance(p1, p2) {
  return euclidean(p1.x - p2.x, p1.y - p2.y);
}
function euclidean(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy);
}
