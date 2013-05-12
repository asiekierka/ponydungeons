(function () {
  'use strict';

  var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame  ||
    window.mozRequestAnimationFrame     ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  var secs, frames = 0;

  function timeSecs () {
    return (new Date()).getTime() / 1000;
  }

  function createFluttershy (x, y, z) {
    var group = new ponydungeons.Canvas.CachedGroup(x, y, z, 36, 22), chr;

    chr = new ponydungeons.Canvas.Character('-', 'rgb(253, 181, 203)', -8, 0);
    group.add(chr);
    chr = new ponydungeons.Canvas.Character('@', 'rgb(255, 244, 157)', 0, 0);
    group.add(chr);
    chr = new ponydungeons.Canvas.Character('-', 'rgb(253, 181, 203)', 8, 0);
    group.add(chr);
    chr = new ponydungeons.Canvas.Character('~', 'rgb(253, 181, 203)', 8, 8);
    group.add(chr);
    chr = new ponydungeons.Canvas.Character('~', 'rgb(253, 181, 203)', 16, 8);
    group.add(chr);

    return group;
  }
  
  window.onload = function () {
    var cv, g, c1, c2, c3;
    
    cv = new ponydungeons.Canvas(document.body, 640, 480, 'black');

    g = new Array();
    for(var j=0;j<80;j++) {
      g[j] = createFluttershy(Math.random()*300, Math.random()*300, 0);
      g[j].scaleX = g[j].scaleY = 3;
      g[j].angle = Math.PI / 3;
      cv.scene.add(g[j]);
    }
    cv.render();
    
    var animloop = function() {
      for(var i=0;i<80;i++) {
        if(i<40) g[i].angle+=6;
        else g[i].angle-=6;
        g[i].x += ((i%5)+1)/10;
        g[i].y += ((i%5)+1)/10;
      }
      cv.render();
      frames += 1;
      console.log('Average FPS since start: ' + (frames/(timeSecs() - secs)));
      requestAnimFrame(animloop);
    };
    secs = timeSecs();
    requestAnimFrame(animloop);
  };
}());
