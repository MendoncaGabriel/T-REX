const dino = document.getElementById('dino')
let obstacle = document.getElementById('obstacle')

//dino
let dyD = 0
let pyD = 0
let Jump = true
let Fall = true
let velJump = 10
let velFall = -6
let jumping = true
let heigthJump = 250
let timeFall = 40

//obstacle
let py = 0
let px = -100
let dx = 1
let dy = 0
let velMove = 10
let incrementX = 2
let incrementMaxX = 20
let incrementY = 0




//render
function render(){

    //chegar no topo cair
    if(pyD >= heigthJump){
        dyD = velFall
    }

    //chegar no chao parar de cair
    if(pyD <= 0 && Fall == false){ 
        dyD = 0
    }

    //liberar pulo
    if (pyD <= 0) {
        jumping = true;
    }

    //dino
    pyD += dyD;
    dino.style.bottom = pyD + 'px';
    
    //obstacle
    px += dx + incrementX
    py += dy + incrementY
    
    if(px >= 440 && px <= 540  && pyD <= 50){ 
        px -= dx + incrementX
        console.log("Colisão detectada!");
    }



    obstacle.style.bottom = py + 'px'
    obstacle.style.right = px + 'px'

    requestAnimationFrame(render)
}
requestAnimationFrame(render)





function jump(){
    if(Jump && jumping ){
        jumping = false
        Jump = false
        Fall = true
        dyD = velJump

        dino.style.height = '45px'
        setTimeout(() => {
            dino.style.height = '50px'
            
        }, 300);
    }
} 

function fall(){
    if(Fall){
        Jump = true
        Fall = false
        dyD = 0
        setTimeout(() => {
            dyD = velFall
        }, timeFall);
    }
}

document.addEventListener('keydown', (e)=>{
    e.keyCode == 32 && jump()
})
document.addEventListener('keyup', (e)=>{
    Jump = false;  jumping = false;   Fall = true; 
    if(e.keyCode == 32){
        fall() 
    } 
})



//obstacle
function moveObstacle(){
    const monitore = setInterval(() => {
        if(px > 640){
            if(incrementX < incrementMaxX){
                incrementX += 0.3
            }
            px = -100
            clearInterval(monitore)
            moveObstacle()
        }
    }, 16);
}moveObstacle()