var Animation = function(){
    var particles = [],
        numPoints =50,
        cnv = $('#cnv')[0],
        ctx = cnv.getContext('2d'),
        width = cnv.width,
        height = cnv.height,
        bounce =-1,
        particle;
    
    this.init = function(){
        $('#cnv').css({'border' : '1px solid #ddd'});
        
        setInterval(function(){
            if(particles.length < numPoints){
                particle ={}
                initParticle(particle)
                particles.push(particle);
            }   
            update();
            draw();

        }, 50)
    };
    
    //Particle initialization
    function initParticle(p){
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.vx = Math.random() * 10 - 5;
        p.vy = Math.random() * 10 - 5;
        p.radius = Math.random()*5 +1;
    };
    
    //Updating particles' positions on canvas 
    function update(){
        var i, len = particles.length;
        for( i = 0; i < len; i++){
            particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
 
            //when particle goes out of the canvas it is re-initialize  
            if(particle.x  >width || particle.x <0 || particle.y > height || particle.y < 0) {
                initParticle(particle)
            }
        }       
    };
    
    //Draw particles on canvas
    function draw(){
        ctx.clearRect(0,0,width,height);
        var i, len = particles.length;
        for( i = 0; i < len; i++){
            particle = particles[i];
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, 2* Math.PI)
            ctx.fill();
        }
    };

};




/*var Animation = function(){
    var particles = [],
        numPoints =50,
        cnv = $('#cnv')[0],
        ctx = cnv.getContext('2d'),
        width = cnv.width,
        height = cnv.height,
        bounce =-1,
        particle;
    
    this.init = function(){
        $('#cnv').css({'border' : '1px solid #ddd'});
        for(var i = 0; i < numPoints; i++){
            particles.push({
               x : Math.random() * width,
               y : Math.random() * height,
               vx : Math.random() * 10 - 5,
               vy : Math.random() * 10 - 5,
               radius : Math.random()*3 +1
            });
        }
        setInterval(function(){
            update();
            draw();
        }, 40)
    };
    
    function update(){
   
        for(var i = 0; i < numPoints; i++){
            particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if(particle.x > width){
                particle.x = width;
                particle.vx *= bounce;
            }else if(particle.x < 0){
                particle.x = 0;
                particle.vx *= bounce;
            }else if(particle.y > height){
                particle.y = height;
                particle.vy *= bounce;
            }else if(particle.y < 0){
                particle.y = 0;
                particle.vy *= bounce;
            }
        }
        
    };
    
    function draw(){
        ctx.clearRect(0,0,width,height);
        for(var i =0; i< numPoints; i++){
            particle = particles[i];
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, 2* Math.PI)
            ctx.fill();
        }
    };

};*/