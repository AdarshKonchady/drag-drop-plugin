(function() {
    var dragObject = null,
        mouseOffset = null;
    document.onmousemove = mouseMove;
    document.onmouseup = mouseUp;

    function mouseMove(ev) {
        ev = ev || window.event; // event is global in IE
        var mousePos = mouseCoords(ev);
    }

    function mouseCoords(ev) {
        if (ev.pageX || ev.pageY) { // Firefox and other browsers
            return { // pageX and pageY give values relative to 'document'
                x: ev.pageX,
                y: ev.pageY
            };
        }
        // IE
        return { // clientX and clientY give values relative to 'window'
            // document.body.clientLeft gives width of border surrounding 'document' in IE.
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    function makeClickable(object) {
        object.onmousedown = function() {
            dragObject = this;
        }
    }

    function makeDraggable(item) {
        if (!item) {
            return;
        }
        item.onmousedown = function (ev) {
            dragObject = this;
            mouseOffset = getMouseOffset(this, ev);
            return false;
        }
    }

    function getMouseOffset(target, ev) {
        ev = ev || window.event;
        var docPos = getPosition(target);
        var mousePos = mouseCoords(ev);
        return {
            x: mousePos.x - docPos.x,
            y: mousePos.y - docPos.y
        }
    }

    function getPosition(ele) {
        var left = 0,
            top = 0;
        while (ele.offsetParent) {
            left += ele.offsetLeft;
            top += ele.offsetTop;
            ele = ele.offsetParent;
        }
        left += ele.offsetLeft;
        top += ele.offsetTop;

        return {
            x: left,
            y: top
        };
    }

    function mouseMove(ev) {
        ev = ev || window.event;
        
    }

    function mouseUp() {
        dragObject = null;
    }
})();