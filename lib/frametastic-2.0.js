// Copyright 2006-2008 Christian Romney and Diego Scataglini
// Licensed under the MIT License

// document.createElement on steroids
function Element(tag, styles, inner, parent) {
  var el = document.createElement(tag);
  if ($(parent)) { $(parent).get(0).appendChild(el); }
  if (styles) { for (var i in styles) {$(el).css(i, styles[i]); } }
  if (inner) { $(el).html(inner); }
  $(el).addClass('frame');
  return el;
}

// One may define a box with two opposite-corner points
function Point (x, y) {
  this.x = x;
  this.y = y;
  Point.set().push(this);
}

// Static Point class methods 
jQuery.extend(Point, {
  set: function (all) {
    if (all) {$(document).data('points', all);}
    return $(document).data('points');
  },
  
  leftmost: function (p1, p2) {
    return (p1.x < p2.x) ? p1 : p2;
  },
  
  rightmost: function (p1, p2) {
    return (Point.leftmost(p1, p2) === p1) ? p2 : p1;
  },
  
  topmost: function (p1, p2) {
    return (p1.y < p2.y) ? p1 : p2;
  },
  
  bottommost: function (p1, p2) {
    return (Point.topmost(p1, p2) === p1) ? p2 : p1;
  }
});

// The point of frametastic is to "draw" boxes
function Box (tag) {
  var p2 = Point.set().pop();
  var p1 = Point.set().pop();
  
  if (tag && p1 && p2) {
    // Origin is the top-left corner of the box
    this.origin = new Point(Point.leftmost(p1, p2).x, Point.topmost(p1, p2).y);
    this.box_width = Point.rightmost(p1, p2).x - this.origin.x;
    this.box_height = Point.bottommost(p1, p2).y - this.origin.y;
    this.backing_element = new Element(tag, {
      'left': this.origin.x,
      'top': this.origin.y    
      }, null, '#stage'
    );
      
    $(this.backing_element).width(this.box_width);
    $(this.backing_element).height(this.box_height);        
    
    Box.active(this);
    Box.set().push(this);          
    
    // The global set of keybindings is defined here
    Box.keys({
      // 'D'elete
      100: function (e) {
        if (Box.active() && confirm('Delete the active box?')) {
          Box.active().destroy();        
        }
      }
    });
  } 
}

// Static methods of the Box class
// Each of these is a getter and a setter
jQuery.extend(Box, {
  set: function (all) {    
    if (all) { $(document).data('boxes', all); }
    return $(document).data('boxes');
  }, 
  
  active: function (box) {
    if (box) { 
      box.activate();
      $(document).data('active', box);       
    }
    return $(document).data('active');
  },
  
  keys: function (all) {
    if (all) { $(document).data('keybindings', all); }
    return $(document).data('keybindings');
  }
});

// Box class instance methods
jQuery.extend(Box.prototype, {  
  destroy: function () {
    var box = this;
    $(box.backing_element).remove();
    box.backing_element = null;
    box.origin = null;        
    Box.set(jQuery.grep(Box.set(), function (current) {
      return current != box;
    }));
  },
  
  deactivateAll: function () {
    $('.active').removeClass('active');
  },

  activate: function () {
    this.deactivateAll();  
    $(this.backing_element).addClass('active');
  }  
});

// Inialization of the apps and wire up event global handlers
$(document).ready(function () {  
  Point.set(new Array());
  Box.set(new Array());
  Box.active(null);
  
  $(document).keypress(function (e) {
    var handler = Box.keys()[e.which];
    if (handler) { handler(); }
  });
  
  $(document).mousedown(function (e) {
    new Point(e.pageX, e.pageY);
  });

  $(document).mouseup(function (e) {    
    new Point(e.pageX, e.pageY);
    new Box('div');
  });
});