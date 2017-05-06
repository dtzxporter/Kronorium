/**
 * Provides an alternate .offset() method to the default jQuery one, 
 * as jQuery's native .offset() returns invalid coordinates if the browser's viewport is zoomed.
 * 
 * Functionally identical to the standard .offset(), aside from the aforementioned fix.
 * 
 * Credit to: https://github.com/aroussetpsn for this work-around.
 * 
 * @return Object {top, left}
 */

(function () {
    jQuery.fn.offset_FIXED = function () {

        //Get jQuery offset value
        var offset = $(this).offset();

        //Get actual document width, without scrollbar
        var prevStyle = document.body.style.overflow || "";
        document.body.style.overflow = "hidden";
        var docWidth = document.documentElement.clientWidth;
        document.body.style.overflow = prevStyle;
        
        //Check if viewport is scaled (if not, we don't need to adjust offset)
        if (docWidth / window.innerWidth !== 1) { 
            
            //Viewport is scaled; manually calculate correct offset
            var docRect = document.documentElement.getBoundingClientRect();
            offset = {
                top: offset.top - window.pageYOffset - docRect.top,
                left: offset.left - window.pageXOffset - docRect.left
            };
        }
        return offset;
    }
})();