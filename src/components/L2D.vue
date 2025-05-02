<template>
    <div>
        <button @click="login">
            login
        </button>
        <button @click="loadModel('ailunsamuna_2')">
            ailunsamuna_2
        </button>
        <button @click="loadModel('aisaikesi_4')">
            aisaikesi_4
        </button>
        <button @click="loadModel('xiaoba_vts',true)">
            xiaoba_vts
        </button>
    </div>
    
    <canvas id="canvas"></canvas>
</template>

<script setup>
import { Application ,Ticker} from 'pixi.js';
import { Live2DModel,ExpressionManager  } from 'pixi-live2d-display/cubism4';
 
import { onMounted } from 'vue';
import { config } from 'pixi-live2d-display';

config.idleMotionFadingDuration = 300;
Live2DModel.registerTicker(Ticker);

let modelName = import.meta.env.VITE_APP_MODEL_PREFIX+"/buildPublic/ailunsamuna_2/ailunsamuna_2.model3.json"
let modelHasExpression = false;
 

let map = {
    "ailunsamuna_2":import.meta.env.VITE_APP_MODEL_PREFIX+"/buildPublic/ailunsamuna_2/ailunsamuna_2.model3.json",
    "aisaikesi_4":import.meta.env.VITE_APP_MODEL_PREFIX+"/buildPublic/aisaikesi_4/aisaikesi_4.model3.json",
    "xiaoba_vts":import.meta.env.VITE_APP_MODEL_PREFIX+"/buildPublic/xiaoba_vts/xiaoba.model3.json",
}

onMounted(() => {
    renderCanvas();
     
})
let model = null;

let login = () => {
    // console.log(JSON.parse(JSON.stringify(model.internalModel.motionManager)))
    model.motion('login')
    // setTimeout(() => {
    //     console.log(model.internalModel.motionManager)
    // }, 100);
}

let loadModel = (name,hasExpression=false) =>{
    modelHasExpression = hasExpression;
    modelName = map[name]
   
    renderCanvas();

    if(hasExpression){
        // const expressionManager = model.internalModel.expressionManager;
        // setTimeout(() => {
        //     // console.log(model)
        //     if (!model.internalModel.expressionManager) {
        //         model.internalModel.expressionManager = new ExpressionManager(model.internalModel.coreModel);
        //     }
        //     model.internalModel.expressionManager.setExpression(0);
        // }, 100);
      
    }
}


let checkAnimation = ()=>{
    if(model){
        console.log(model.internalModel.motionManager.playing)
    }
    
    requestAnimationFrame(checkAnimation)
}
// requestAnimationFrame(checkAnimation)

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
        width: 600,
        height: 600


    });

    model = await Live2DModel.from(modelName);
     
    app.stage.addChild(model);


    adjustModelScale(model, app.view.width, app.view.height);

  
 
     
    // model.internalModel.motionManager.startMotion('idle', 0,{loop:true});
}


</script>