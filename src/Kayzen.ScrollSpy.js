//=================================================================
// Scroll Spy
//=================================================================

(function ($) {
    
    $.fn.extend({
    
        scrollSpy: function(options) {
            
            var defaults = {  
                selector : 'li'
            };
            
            var options = $.extend(defaults, options);
            
            return this.each(function() {
                
                var $parent   = this,
                    $selector = options.selector;
                
                // Cache selectors
                var lastId,
                    topMenuHeight = $($parent).outerHeight()+15,
                    // All items
                    items = $($parent).find($selector),
                    // Anchors corresponding to menu items
                    scrollItems = items.map(function() {
                        if ($(this).prop('tagName') == 'A') {
                            var item = $($(this).attr("href"));
                        } else {
                            var item = $($(this).find('a').attr("href"));
                        }
                        if (item.length) { return item; }
                    });
            
                // Bind to scroll
                $(window).scroll(function() {
                    
                    // Get container scroll position
                    var fromTop = $(this).scrollTop()+topMenuHeight;
                    
                    // Get id of current scroll item
                    var cur = scrollItems.map(function(){
                    if ($(this).offset().top < fromTop)
                        return this;
                    });
                    
                    // Get the id of the current element
                    cur = cur[cur.length-1];
                    var id = cur && cur.length ? cur[0].id : "";
                    
                    if (lastId !== id) {
                        lastId = id;
                        // Set/remove active class
                        items.removeClass("active");
                        if ($($selector).prop('tagName') == 'A') {
                            items.filter("[href=#"+id+"]").addClass("active");
                        } else {
                            items.find('a').filter("[href=#"+id+"]").end().addClass("active");
                        }
                    }   
                                    
                });
            
            });
        
        } // scrollSpy
    
    });

}(jQuery));