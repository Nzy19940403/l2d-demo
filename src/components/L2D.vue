<template>
    <button @click="login">login</button>
    <canvas id="canvas"></canvas>
</template>

<script setup>
import { Application ,Ticker} from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display/cubism4';
 
import { onMounted } from 'vue';
import { config } from 'pixi-live2d-display';

config.idleMotionFadingDuration = 300;
Live2DModel.registerTicker(Ticker);
 
onMounted(() => {
    renderCanvas();
     
})
let model = null;

let login = () => {
    console.log(JSON.parse(JSON.stringify(model.internalModel.motionManager)))
    model.motion('login')
    setTimeout(() => {
        console.log(model.internalModel.motionManager)
    }, 100);
}

let checkAnimation = ()=>{
    if(model){
        console.log(model.internalModel.motionManager.playing)
    }
    
    requestAnimationFrame(checkAnimation)
}
requestAnimationFrame(checkAnimation)

let adjustModelScale = (model, containerWidth, containerHeight) => {
    // 1. 获取模型原始尺寸
    const modelWidth = model.width;
    const modelHeight = model.height;

    // 2. 计算缩放比例（保持宽高比）
    const scaleX = containerWidth / modelWidth;
    const scaleY = containerHeight / modelHeight;
    const targetScale = Math.min(scaleX, scaleY) * 1; // 乘以 0.8 留出边距（可选）

    // 3. 设置缩放
    model.scale.set(targetScale);

    // 4. 居中模型
    model.position.set(
        containerWidth / 2 - (modelWidth * targetScale) / 2,
        containerHeight / 2 - (modelHeight * targetScale) / 2
    );
}


let renderCanvas = async () => {
    const app = new Application({
        view: document.getElementById('canvas'),
        width: 1200,
        height: 900


    });

    model = await Live2DModel.from("/public/buildPublic/ailunsamuna_2/ailunsamuna_2.model3.json");

    app.stage.addChild(model);


    adjustModelScale(model, app.view.width, app.view.height);

  
 
     
    // model.internalModel.motionManager.startMotion('idle', 0,{loop:true});
}


</script>