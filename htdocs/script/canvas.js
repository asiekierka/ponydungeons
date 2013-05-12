window.ponydungeons.Canvas = (function (ponydungeons) {
  'use strict';

  // Canvas class
  // (parent DOM element, width, height, background colour)
  function Canvas (parent, width, height, bgColor) {
    this.cv = document.createElement('canvas');
    this.cv.width = width;
    this.cv.height = height;
    parent.appendChild(this.cv);

    this.ctx = this.cv.getContext('2d');

    this.bgColor = bgColor;
    this.scene = new Canvas.Group(0, 0);
  }

  Canvas.prototype.render = function () {
    this.cv.width = this.cv.width;

    this.ctx.save();
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.cv.width, this.cv.height);
    this.ctx.restore();

    this.scene.render(this);
  };

  // Group class
  // (x position, y position)
  Canvas.Group = function (x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.objects = [];
  };

  Canvas.Group.prototype.render = function (cv) {
    cv.ctx.save();
    cv.ctx.translate(this.x, this.y);
    cv.ctx.rotate(this.angle);
    cv.ctx.scale(this.scaleX, this.scaleY);
    _.each(this.objects, function (obj) {
      obj.render(cv);
    });
    cv.ctx.restore();
  };

  Canvas.Group.prototype.add = function (object) {
    this.objects.push(object);
  };

  Canvas.Group.prototype.remove = function (object) {
    var index = this.objects.indexOf(object);
    if (index !== -1) {
      this.objects.splice(index, 1);
    } else {
      throw new Error(object + " is not contained in group");
    }
  };

  // Character class
  // (displayed character, color, x position, y position)
  Canvas.Character = function (c, color, x, y) {
    this.c = c;
    this.color = color;
    this.x = x;
    this.y = y;
  };

  Canvas.Character.prototype.render = function (cv) {
    var charCode = this.c.charCodeAt(0),
        column = charCode % 16,
        row = Math.floor(charCode / 16);
    cv.ctx.save();
    cv.ctx.translate(this.x, this.y);
    cv.ctx.fillStyle = this.color;
    cv.ctx.font = '12pt Inconsolata, monospace';
    cv.ctx.textAlign = 'center';
    cv.ctx.textBaseLine = 'middle';
    cv.ctx.fillText(this.c, 0, 0);
    cv.ctx.restore();
  };

  return Canvas;
}(window.ponydungeons || {}));
