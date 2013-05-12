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

    this.scene.render(this.cv, this.ctx);
  };

  // Group class
  // (x position, y position, [z index])
  Canvas.Group = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.z = z || 0;

    this.objects = [];
  };

  Canvas.Group.prototype.render = function (cv, ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.scale(this.scaleX, this.scaleY);
    _.each(this.objects, function (obj) {
      obj.render(cv, ctx);
    });
    ctx.restore();
  };

  Canvas.Group.prototype.add = function (object) {
    this.objects.push(object);
    this.sort();
  };

  Canvas.Group.prototype.remove = function (object) {
    var index = this.objects.indexOf(object);
    if (index !== -1) {
      this.objects.splice(index, 1);
    } else {
      throw new Error(object + " is not contained in group");
    }
  };

  Canvas.Group.prototype.sort = function () {
    this.objects = _.sortBy(this.objects, function (obj) {
      return obj.z;
    });
  };

  // CachedGroup class (render-caching version of group)
  // (x position, y position, z position, width, height)
  Canvas.CachedGroup = function (x, y, z, width, height) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;

    this.cache = document.createElement('canvas');
    this.cache.width = this.width;
    this.cache.height = this.height;
    this.cacheCurrent = false;
  };

  Canvas.CachedGroup.prototype = new Canvas.Group();

  // Called when width/height/scaleX/scaleY changed
  Canvas.CachedGroup.prototype.update = function () {
    this.cacheCurrent = false;
  };

  Canvas.CachedGroup.prototype.render = function (cv, ctx) {
    var cacheCtx, that=this;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * Math.PI / 180);
    if (!this.cacheCurrent) {
      this.cache.width = Math.ceil(this.width * this.scaleX);
      this.cache.height = Math.ceil(this.height * this.scaleY);
      cacheCtx = this.cache.getContext('2d');
      cacheCtx.save();
      cacheCtx.translate(this.cache.width / 2, this.cache.height / 2);
      cacheCtx.scale(this.scaleX, this.scaleY);
      _.each(this.objects, function (obj) {
        obj.render(that.cache, cacheCtx);
      });
      cacheCtx.restore();
      this.cacheCurrent = true;
    }
    ctx.drawImage(this.cache, -(this.cache.width / 2), -(this.cache.width / 2));
    ctx.restore();
  };

  Canvas.CachedGroup.prototype.add = function (object) {
    Canvas.Group.prototype.add.call(this, object);
    this.update();
  };

  Canvas.CachedGroup.prototype.remove = function (object) {
    Canvas.Group.prototype.remove.call(this, object);
    this.update();
  };

  // Character class
  // (displayed character, color, x position, y position, [z index])
  Canvas.Character = function (c, color, x, y, z) {
    this.c = c;
    this.color = color;
    this.x = x;
    this.y = y;
    this.z = z || 0;
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
  };

  Canvas.Character.prototype.render = function (cv, ctx) {
    var charCode = this.c.charCodeAt(0),
        column = charCode % 16,
        row = Math.floor(charCode / 16);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.fillStyle = this.color;
    ctx.font = '12pt Inconsolata, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'middle';
    ctx.fillText(this.c, 0, 0);
    ctx.restore();
  };

  return Canvas;
}(window.ponydungeons || {}));
