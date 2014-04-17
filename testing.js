/*$(function(){

    var cnv = $('#cnv')[0],
        ctx = cnv.getContext('2d'),
        width = cnv.width,
        height = cnv.height,
        x = 10,
        y = 10,
        vx = 5,
        vy =4;
    $('#cnv').css({'border' : '1px solid #333'});
    
    (function draw(){
        
        ctx.clearRect(0,0,width,height);
        ctx.beginPath();
        ctx.arc(x,y,5,0,2*Math.PI);
        ctx.fill();
        x += vx;
        y += vy;
        
        setTimeout(draw, 50);
    }());
    
    
});*/