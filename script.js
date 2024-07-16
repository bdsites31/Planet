var container = document.getElementById('canvas_wrapper');
var canvas = document.getElementById("canvas_id");
var textbox_size = document.getElementById("input_size");
var textbox_zoom = document.getElementById("input_zoom");

var ctx = canvas.getContext("2d");

let add_size = 10;

let ballcount = 0;

var colors = [0];

var x = [0];
var y = [0];

var sx = [0];
var sy = [0];

var size = [0];

var mousePos;

let canvas_zoom=1;

function getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function check_size(){
    if (textbox_size.value == ""){
        alert("enter the size.");
        return false;
    }else{
        add_size=textbox_size.value;
        return true;
    }
}

function check_zoom(){
        if (textbox_zoom.value == ""){
            alert("enter the zoom.");
            return false;
        }else{
            canvas_zoom=textbox_zoom.value;
            return true;
        }
    }

function add_star(c,spx,spy,mx,my,s){
	colors[ballcount] = c;

        x[ballcount] = mx;
        y[ballcount] = my;

        sx[ballcount] = spx;
        sy[ballcount] = spy;

        size[ballcount] = s;

        ballcount+=1;
}

canvas.width = container.clientWidth*1.2;
canvas.height = container.clientHeight*1.2; 

//main
function draw() {
        for (let i = 0; i < ballcount; i++) {
                for(let j = 0; j < ballcount; j++){
                        if(i != j){
                                sx[i] += size[j]*size[j]*(x[j]-x[i])/((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j])+0.01)/Math.sqrt((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j])+0.01);
                                sy[i] += size[j]*size[j]*(y[j]-y[i])/((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j])+0.01)/Math.sqrt((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j])+0.01);
                        }
                }

                x[i]+=sx[i];
                y[i]+=sy[i];
        }

        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.closePath();

        for (let i = 0; i < ballcount; i++) {
              ctx.beginPath();
              ctx.arc((x[i]+canvas.width/2)*canvas_zoom, (y[i]+canvas.height/2)*canvas_zoom, size[i]*canvas_zoom, 0, Math.PI * 2);
              ctx.fillStyle = colors[i];
              ctx.fill();
              ctx.closePath();
        }
        
        add_size = textbox_size.value;
}


canvas.addEventListener('click', (evt_click) => {
        add_star('#'+
        (Math.floor(Math.random() * 255)).toString(16) +
        (Math.floor(Math.random() * 255)).toString(16) +
        (Math.floor(Math.random() * 255)).toString(16)
         ,0,0,mousePos.x/canvas_zoom-canvas.width/2,mousePos.y/canvas_zoom-canvas.height/2, add_size);
});

canvas.addEventListener('mousemove', function (evt_move) {
        mousePos = getMousePosition(canvas, evt_move);
}, false);

setInterval(draw, 10);
