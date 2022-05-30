var canvas = document.getElementById("c1");
var ctx = canvas.getContext("2d");

let ballcount = 0;

var colors = [0];

var x = [0];
var y = [0];

var sx = [0];
var sy = [0];

var size = [0];

function add_star(c,mx,my,s){
	colors[ballcount] = c;

        x[ballcount] = mx;
        y[ballcount] = my;

        sx[ballcount] = 0;
        sy[ballcount] = 0;

        size[ballcount] = s;

        ballcount+=1;
}

//main
function draw() {

        for (let i = 0; i < ballcount; i++) {
                for(let j = 0; j < ballcount; j++){
                        if(i != j){
                                sx[i] += (size[j]/size[i])*(size[j]/size[i])*(x[j]-x[i])/(((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j]))+0.01);
                                sy[i] += (size[j]/size[i])*(size[j]/size[i])*(y[j]-y[i])/(((x[i]-x[j])*(x[i]-x[j])+(y[i]-y[j])*(y[i]-y[j]))+0.01);
                        }
                }

                x[i]+=sx[i];
                y[i]+=sy[i];
        }

        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();

        for (let i = 0; i < ballcount; i++) {
              ctx.beginPath();
              ctx.arc(x[i], y[i], size[i], 0, Math.PI * 2);
              ctx.fillStyle = colors[i];
              ctx.fill();
              ctx.closePath();
        }
}

canvas.addEventListener('click', (e) => { 
        for(let i=0;i<20;i++){
                add_star('#'+
                (Math.floor(Math.random() * 255)).toString(16) +
                (Math.floor(Math.random() * 255)).toString(16) +
                (Math.floor(Math.random() * 255)).toString(16)
                ,canvas.width/2+(Math.random()-0.5)*canvas.width*0.8,canvas.height/2+(Math.random()-0.5)*canvas.height*0.8, 5+Math.random()*20);
        }
});

add_star('#f00',canvas.width/2,canvas.height/2,10+Math.random()*50);

setInterval(draw, 10);