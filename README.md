# README.md
## Flapping bird 包含功能
1. 基本要求：空白鍵飛翔，發出聲音，鳥的顏色以及背景隨機出現
2. 額外功能：
* 隨機高度的柱子作為障礙物
* 判斷鳥是否有撞擊
* 可計分
* 顯示遊戲結束
* 遊戲結束後按下space鍵可以重新遊玩
## 函式說明
### preload()
```javascript

    bgImg = loadImage("assets/sprites/background-day.png");
    baseImg = loadImage("assets/sprites/base.png");
    hitSound = loadSound("assets/audio/hit.wav");
    dieSound = loadSound("assets/audio/die.wav");
    
    for (let i=0; i<3; i++){
        for(let j=0;j<3; j++){
        birdImg[color[i]+flap[j]] = loadImage(`assets/sprites/${color[i]}bird-${flap[j]}.png`);

        }   
    }
 ```
主要包含一些圖片還有聲音檔的加載，也用了template literals的技巧協助我宣告多項變數。

### setup()
宣告一些在其他函式中會用到的變數以及初始值。

### draw()
```javascript
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
            ..................
         }
    }
 ```
 我利用的自己宣告的clickBool以及hitBool來控制不同時期要出現的動畫，這些變數會由後面介紹的函式改變，幫助我操作。
 
 ### keyPressed()
 ``` javascript 
   if(keyCode === 32 && clickBool === true && hitBool === false){
    vY = -6;
    triAng = -PI/3;
    wingSound.play();
    }
    else if (keyCode === 32 && landBool === true){
        history.go(0);
    }
  ```
  按下滑鼠鍵的程式碼，landBool指的是鳥落地的狀態值。如果是true並且按下Space，會重新遊戲。
  
  ### mouseClicked()
  只有一行程式碼，按下滑鼠使得clickBool改變，並開始遊戲。
  
  ### isHit()
  ``` javascript
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
   ```
   前兩個if是因為我宣告的柱子共有兩根，會一直在畫面上不停循環。接下來是判斷是否落地，最後一個則是是否撞到天花板。
  
  
  
  
  
