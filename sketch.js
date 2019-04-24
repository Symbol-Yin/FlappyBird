let cvsWrapper = null;
let bgImg;
let baseImg;
let birdImg = [];
let msgImg;
let r;
let color = [ "red" , "blue" , "yellow" ];
let flap = [ "downflap" , "midflap" , "upflap" ];
let clickBool = false;
let hitBool = false;
let landBool = false;
let wingSound;
let pipeImg = [];
let pipeColor = [ "green" , "red" ];
let pipeState = [ "upper" , "lower" ];
let gradeImg = [];
let countArray = [];


// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets

function preload() {
    bgImg = loadImage("assets/sprites/background-day.png");
    baseImg = loadImage("assets/sprites/base.png");
    msgImg = loadImage("assets/sprites/message.png");
    gameoverImg = loadImage("assets/sprites/gameover.png");
    wingSound = loadSound("assets/audio/wing.wav");
    pointSound = loadSound("assets/audio/point.wav");
    hitSound = loadSound("assets/audio/hit.wav");
    dieSound = loadSound("assets/audio/die.wav");

    for (let i=0;i<10;i++){
        gradeImg[i] = loadImage(`assets/sprites/${i}.png`);

    }

    for (let i=0; i<3; i++){
        for(let j=0;j<3; j++){
        birdImg[color[i]+flap[j]] = loadImage(`assets/sprites/${color[i]}bird-${flap[j]}.png`);

        }   
    }

    for (let i=0; i<2; i++){
        for(let j=0;j<2; j++){
        pipeImg[pipeColor[i] + "_" + pipeState[j]] = loadImage(`assets/sprites/pipe-${pipeColor[i]}-${pipeState[j]}.png`);

        }   
    }
}



function setup() {
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");
    baseScale = width/baseImg.width;
    x=0;
    y=0;
    bird_x1 = 0;
    bird_y1 = 0;
    bird_width = 0;
    bird_height = 0;
    vX = 0;
    vY = 0;
    aY = 10;
    triAng = 0;
    numflap = 0;
    randomdiff_y1 = 0;
    randomdiff_y2 = 0;
    x_total = -0.5*width;
    pipe_width = pipeImg["green_upper"].width;
    pipe_height = pipeImg["green_upper"].height;
    pipe_x1 = 1.5*width;
    pipe_x2 = pipe_x1 + (width+pipe_width)/2;
    pipe_x1_upper_y = 0;
    pipe_x1_lower_y = 0;
    pipe_x2_upper_y = 0;
    pipe_x2_lower_y = 0;
    gradeImg_x1 = 0;
    gradeImg_y1 = 0;
    successCount = 0;
    r = int(random(0,3));
    keyPressed();
}



function draw() {
    image(bgImg, x, y, width , height);
    image(bgImg, x + width, y, width, height);
    if(hitBool === false){
        x-=3; if(x+width <= 0){x=0};
        numflap+=0.3; if(int(numflap) === 3){numflap = 0;}
    }

    
    if(clickBool === false){
        image(msgImg, (width - msgImg.width*1.5)/2, (height - msgImg.height*1.5)/2,msgImg.width*1.5,msgImg.height*1.5);
        bird_x1 = (width-birdImg[color[r]+flap[int(numflap)]].width)/2;
        bird_y1 = (height-birdImg[color[r]+flap[int(numflap)]].height)/2+50;
        bird_width = birdImg[color[r]+flap[int(numflap)]].width*1.4;
        bird_height = birdImg[color[r]+flap[int(numflap)]].height*1.4;
        image(birdImg[color[r]+flap[int(numflap)]],bird_x1,bird_y1
        ,bird_width,bird_height);

    }

    if(clickBool === true){
         if(hitBool === false){
            isHit();
            x_total+=3;
            if(x_total >= (width+pipeImg["green_upper"].width)/2){
                x_total=0;
                successCount++;
                pointSound.play();
            }
            
            pipe_x1 -= 3; if(pipe_x1 <= -pipeImg["green_upper"].width){
                pipe_x1 = width;
                randomdiff_y1 = random(-100,100);
            }
            pipe_x2 -= 3; if(pipe_x2 <= -pipeImg["green_upper"].width){
                pipe_x2 = width;
                randomdiff_y2 = random(-100,100);
            }
        }
            pipe_x1_upper_y = -100+randomdiff_y1;
            pipe_x1_lower_y = height-pipeImg["green_lower"].height+randomdiff_y1;
            pipe_x2_upper_y = -100+randomdiff_y2;
            pipe_x2_lower_y = height-pipeImg["green_lower"].height+randomdiff_y2;

            image(pipeImg["green_upper"],pipe_x1,pipe_x1_upper_y);
            image(pipeImg["green_lower"],pipe_x1,pipe_x1_lower_y);
            image(pipeImg["green_upper"],pipe_x2,pipe_x2_upper_y);
            image(pipeImg["green_lower"],pipe_x2,pipe_x2_lower_y);
          
            if(bird_y1 + bird_height < height - baseImg.height * baseScale){

                vY += aY * 0.03;
                bird_y1+=vY;
                triAng += 0.025;
                let tmpstr = successCount.toString();
                countArray =  tmpstr.split('').join('');
                gradeImg_x1 = width/2-(gradeImg[0].width*1.5*(countArray.length)/(2));
                gradeImg_y1 = (height-gradeImg[0].height*1.5)/4;
                for(let i=0;i<countArray.length;i++){
                    image(gradeImg[countArray[i]],gradeImg_x1+i*gradeImg[0].width*1.5,gradeImg_y1,gradeImg[0].width*1.5,gradeImg[0].height*1.5);
                }
                
            }
            else{
                landBool = true;
                image(gameoverImg,(width-gameoverImg.width)/2,(height-gameoverImg.height)/2-80);
                for(let i=0;i<countArray.length;i++){
                    image(gradeImg[countArray[i]],gradeImg_x1+i*gradeImg[0].width*1.5,gradeImg_y1,gradeImg[0].width*1.5,gradeImg[0].height*1.5);
                }
                var hint = "Press space to play again !";
                textSize(20);
                text(hint, (width-250)/2 , (height-gradeImg[0].height)/2+80);
               
            }
        

          
            
        
        
    }

 
    push();
    translate(bird_x1,bird_y1);
    rotate(triAng);
    image(birdImg[color[r]+flap[int(numflap)]],0,0,bird_width,bird_height);
    pop();

    image(baseImg, x ,height - baseImg.height * baseScale ,baseImg.width * baseScale,baseImg.height * baseScale);
    image(baseImg, x + width ,height - baseImg.height * baseScale ,baseImg.width * baseScale,baseImg.height * baseScale);


    }


function keyPressed() {
    if(keyCode === 32 && clickBool === true && hitBool === false){
    vY = -6;
    triAng = -PI/3;
    wingSound.play();
    }
    else if (keyCode === 32 && landBool === true){
        history.go(0);
    }
}

function mouseClicked(){
    clickBool = true;
}

function isHit(){

    if(bird_x1+bird_width >= pipe_x1 && bird_x1 <= pipe_x1+pipe_width 
        && (bird_y1 <= pipe_x1_upper_y+pipe_height || bird_y1+bird_height >= pipe_x1_lower_y)){
        hitBool = true;
        hitSound.play();
        dieSound.play();

    }
    else if(bird_x1+bird_width >= pipe_x2 && bird_x1 <= pipe_x2+pipe_width 
        && (bird_y1 <= pipe_x2_upper_y+pipe_height || bird_y1+bird_height >= pipe_x2_lower_y)){
        hitBool = true;
        hitSound.play();
        dieSound.play();
    }
    else if(bird_y1+bird_height >= height - baseImg.height * baseScale){
        hitBool = true;
        hitSound.play();
        dieSound.play();
    }
    else if(bird_y1 < 0){
        hitBool = true;
        hitSound.play();
        dieSound.play();
    }



}



