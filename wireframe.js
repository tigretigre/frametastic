// Copyright (c) 2006 Christin Romney (http://www.xml-blog.com, xmlblog@gmail.com)
//           (c) 2006 Diego Scataglini (http://jroller.com/pages/dscataglini, dwebsubmit@gmail.com)

var start_position = null;
var end_position = null;
var focussed_element = null;
var storage = new Object();
storage.slots = 0;

function set_point(event) {
	return {
		x : event.clientX,
		y : event.clientY					
	};				
}	

function start_box(event) {
	start_position = set_point(event);				
}		

function complete_box(event) {
    if (start_position) {
    	end_position = set_point(event);
    	width 	= end_position.x - start_position.x;
    	height 	= end_position.y - start_position.y;				
	
    	if (width > 10 && height > 10) {
    		$('wireframe').appendChild(create_box(start_position, width, height));	
    		$('wireframe').focus();
    	}				
    	start_position = null;
    	end_position = null;
    }
}

function to_pixels(value) {
	return value.toString() + 'px';
}						

function set_title(event) {
	var element = Event.element(event);
	var new_text = document.createTextNode(prompt('Enter the title for this box:'));
	if (new_text && 0 < new_text.length) {
	    var old_text = element.firstChild;
    	element.removeChild(old_text);
	    element.appendChild(new_text);
	}	    	
}

function focus_box(event) {
    var box = Event.element(event);
    box.style.outline = '2px solid blue';
    blur_box(focussed_element);
    focussed_element = box;            
}

function handle_keypress(event) {
    var code = event.charCode ? event.charCode : event.keyCode;    
    
    switch(code) {
        case 27:                    
        // Escape key is for lose focus
        blur_box(focussed_element);
        focussed_element = null;
        break
        
        case 37:
        // left arrow moves left 1 px
        if (!focussed_element) return;    
        var new_position = parseInt(focussed_element.style.left.slice(0,-2)) - 1;
        focussed_element.style.left = to_pixels(new_position);
        new_position = null;
        break
        
        case 38:
        // up arrow moves up 1 px
        if (!focussed_element) return;    
        var new_position = parseInt(focussed_element.style.top.slice(0,-2)) - 1;
        focussed_element.style.top = to_pixels(new_position);
        new_position = null;
        break
        
        case 39:
        // right arrow moves right 1 px
        if (!focussed_element) return;    
        var new_position = parseInt(focussed_element.style.left.slice(0,-2)) + 1;
        focussed_element.style.left = to_pixels(new_position);
        new_position = null;
        break
        
        case 40:
        // down arrow moves down 1 px
        if (!focussed_element) return;    
        var new_position = parseInt(focussed_element.style.top.slice(0,-2)) + 1;
        focussed_element.style.top = to_pixels(new_position);
        new_position = null;
        break;
        
        case 49:
        // 1 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s1').style.backgroundColor;
        break;
        
        case 50:
        // 2 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s2').style.backgroundColor;
        break;
        
        case 51:
        // 3 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s3').style.backgroundColor;
        break;
        
        case 52:
        // 4 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s4').style.backgroundColor;
        break;
        
        case 53:
        // 5 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s5').style.backgroundColor;
        break;
        
        case 54:
        // 6 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s6').style.backgroundColor;
        break;
        
        case 55:
        // 7 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s7').style.backgroundColor;
        break;
        
        case 56:
        // 8 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s8').style.backgroundColor;
        break;
        
        case 57:
        // 9 key        
        if (!focussed_element) return;    
        focussed_element.style.backgroundColor = $('s9').style.backgroundColor;
        break;
        
        case 66:
        // B is for send back (z-index)   
        if (!focussed_element) return;             
        var zindex = focussed_element.style.zIndex;
        zindex = zindex ? (parseInt(zindex) - 1) : 1;
        focussed_element.style.zIndex = zindex;
        break
        
        case 67:
        // C is for clone
        if (!focussed_element) return;    
        var start = {
            x : (parseInt(focussed_element.style.left.slice(0, -2)) + 10), 
            y : (parseInt(focussed_element.style.top.slice(0, -2)) + 10)
        };
        
	    $('wireframe').appendChild(create_box(start, 
	        parseInt(focussed_element.style.width.slice(0,-2)), 
	        parseInt(focussed_element.style.height.slice(0,-2))));	
	    $('wireframe').focus();    
        break
        
        case 68:
        // D is for delete wireframe
        var title = prompt('Which wireframe do you want to delete?');
        if (title) {            
            delete_wireframe(title);
        }
        break
        
        case 70:
        // F is for bring forward (z-index)
        if (!focussed_element) return;    
        var zindex = focussed_element.style.zIndex;
        zindex = zindex ? (parseInt(zindex) + 1) : 256;
        focussed_element.style.zIndex = zindex;
        break
                
        case 73:
        // I is for image
        if (!focussed_element) return;    
        var src = prompt('Enter a url for the image:');
        if (src && 0 < src.length) {
            var img = document.createElement('img');
            img.src = src;    
            
            var title = focussed_element.firstChild;
            focussed_element.removeChild(title);            
            focussed_element.appendChild(img);
            focussed_element.style.width = img.style.width;
            focussed_element.style.height = img.style.height;
        }        
        break
        
        case 76:
        // L is for load (a saved wireframe)
        var title = prompt('Enter the name of the wireframe to load');
        if (title) {
            load_wireframe(title);    
        }        
        break
        
        case 82:
        // R is for resize
        if (!focussed_element) return;    
        var old_width = focussed_element.style.width.slice(0, -2);
        var old_height = focussed_element.style.height.slice(0, -2);
        var old_dimensions = old_width + 'x' + old_height;
        var raw = prompt('Enter the new width and height of the box ex: 150x50', old_dimensions);
        if (raw && raw.match(/^\d{1,3}x\d{1,3}$/)) {
            dimensions = raw.split('x');
            focussed_element.style.width = to_pixels(dimensions[0]);
            focussed_element.style.height = to_pixels(dimensions[1]);
        }
        break
        
        case 83:
        // S is for save (a wireframe)
        var title = prompt('Enter a title to save this wireframe');
        if (title) {            
            save_wireframe(title);                             
        }
        break
        
        case 87:
        // W is for wipe clean
        clear_wireframe();
        break
                
        case 88:
        // X is for delete
        if (!focussed_element) return;    
        var parent = focussed_element.parentNode;
        parent.removeChild(focussed_element);
        focussed_element = null;
        break
    }
}

function blur_box(box) {
    if (box) box.style.outline = '0px solid #fff';
}

function create_box(start, width, height) {
	var box = document.createElement('div');
	box.style.position = 'absolute';
	box.style.width = to_pixels(width);
	box.style.height = to_pixels(height);
	box.style.top = to_pixels(start.y);
	box.style.left = to_pixels(start.x);		
	box.style.zIndex = 256;
	Element.addClassName(box, 'box');	
	Event.observe(box, 'click', focus_box);
	new Draggable(box, {snap: [10,10]});	
	Droppables.add(box, {accept: 'swatch', onDrop: update_color});	
	
	var title = document.createElement('h3');
	var span = document.createElement('span');
	Event.observe(span, 'click', set_title);
	var text = document.createTextNode('[Click to title me]');
	
	span.appendChild(text);
	title.appendChild(span);
	box.appendChild(title);
		
	return box;
}

function update_color(dragged, dropped) {
    dragged.clicked = false;
    dropped.style.backgroundColor = dragged.style.backgroundColor;
}

function change_color(event) {
    var swatch = Event.element(event);
    if (swatch.clicked) {
        var new_color = prompt('Select a new color:');
        if (new_color && 0 < new_color.length) {
            swatch.style.backgroundColor = new_color;    
        }        
    }
    else {
        swatch.clicked = true;
    }
}

function delete_wireframe(title) {
    var item  = $('wf_' + title);    
    if (item) {
        command = "storage." + title + "= null;";    
        eval(command);
        
        var parent = item.parentNode;
        parent.removeChild(item);    
        
        storage.slots -= 1;
    }    
    
    if (0 == storage.slots) $('none_saved').style.display = 'block';
}

function save_wireframe(title) {
    if (storage.slots == 5) {
        alert('Sorry, you can save a maximum of 5 wireframes.')    
        return;
    }    
    
    command = "storage." + title + "='" + escape($('wireframe').innerHTML) + "';";
    eval(command);
    storage.slots += 1;    
    
    if ($('wireframe_list')) {
        $('none_saved').style.display = 'none';
        var item = document.createElement('li');
        item.setAttribute('id', 'wf_' + title);
        item.innerHTML = title;
        $('wireframe_list').appendChild(item);    
    }    
}

function clear_wireframe() {
    $('wireframe').innerHTML = '';
}

function load_wireframe(title) {
    command = "storage." + title;
    var content = eval(command);
    if (content) {
        $('wireframe').innerHTML = unescape(content);            
    }    
}

function init() {
    $$('.swatch').each(function (swatch) {
        new Draggable(swatch, {snap: [10,10], revert: true});
        Event.observe(swatch, 'click', change_color);
    });    
}
