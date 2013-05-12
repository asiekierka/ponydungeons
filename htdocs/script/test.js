(function () {
    'use strict';

    window.onload = function () {
        var cv, g, c1, c2, c3;
        
        cv = new ponydungeons.Canvas(document.body, 640, 480, 'black');

        g = new ponydungeons.Canvas.Group(100, 100);
        g.scaleX = g.scaleY = 3;
        g.angle = Math.PI / 3;

        cv.scene.add(g);
        c1 = new ponydungeons.Canvas.Character('@', 'blue', 0, 0);
        g.add(c1);
        c2 = new ponydungeons.Canvas.Character('&', 'orange', 20, 20);
        g.add(c2);
        c3 = new ponydungeons.Canvas.Character('%', 'orange', -20, 20);
        g.add(c3);

        cv.render();
    };
}());
