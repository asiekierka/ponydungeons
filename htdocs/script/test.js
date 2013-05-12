(function () {
    'use strict';

    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    var col = new Array("orange","blue","purple","green","pink","white","yellow","gray","red","cyan");

    window.onload = function () {
        var cv, g, c1, c2, c3;
        
        cv = new ponydungeons.Canvas(document.body, 640, 480, 'black');

        g = new Array();
        for(var j=0;j<10;j++) {
          g[j] = new ponydungeons.Canvas.Group(Math.random()*300, Math.random()*300);
          g[j].scaleX = g[j].scaleY = 3;
          g[j].angle = Math.PI / 3;
          cv.scene.add(g[j]);
          for(var i=0;i<100;i++) {
            var c = new ponydungeons.Canvas.Character('@', col[j], (Math.random()-0.5)*100, (Math.random()-0.5)*100);
            g[j].add(c);
          }
        }
        g[0].scaleX = 100;
        g[0].z = 1;
        cv.scene.sort();
        cv.render();
        
        var animloop = function() {
          for(var i=0;i<10;i++) {
            if(i<5) g[i].angle+=Math.PI/30;
            else g[i].angle-=Math.PI/30;
            g[i].x += ((i%5)+1)/10;
            g[i].y += ((i%5)+1)/10;
          }
          cv.render();
          window.requestAnimationFrame(animloop);
        };
        window.requestAnimationFrame(animloop);
    };
}());
