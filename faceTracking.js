// let modAssetPath = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
// let wasmPath = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm";
// import "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";

let modAssetPath = "./faceTrackingAssets/face_landmarker.task";
let wasmPath =  "./node_modules/@mediapipe/tasks-vision/wasm";

import vision from "./js/tasks-vision@0.10.3.js";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;

import "./node_modules/babylonjs/babylon.js";
import "./node_modules/babylonjs-loaders/babylonjs.loaders.js";
import "./node_modules/@mediapipe/camera_utils/camera_utils.js";

let backgroundTexturePath = "./faceTrackingAssets/textures/fond.png";
let environmentHDRIPath = "./faceTrackingAssets/textures/environment.env";
let faceTrackingRenderCanvasID = "faceTrackingRenderCanvas";

let faceTrackingReady = false;
let faceTrackingPaused = false;

let maxDistToCam = 70.0;
let morphAnimDuration = 1.0;//second
let morphing = false;
let morphingStateLog = "LOADING";

let isTracking = false;
let allowMorphing = true;
let postProcessImage = false;

let isTooFar = false;


document.getElementById('pauseButton').addEventListener('click', function() {
  if(!faceTrackingPaused){
    faceTrackingPaused = true;
  }else{
    faceTrackingPaused = false;
  }
});

let distanceToCamLog = "";
setInterval(function() {
  document.getElementById('distanceToCamLog').textContent = distanceToCamLog;
}, 16);

setInterval(function() {
  document.getElementById('faceTrackingStateLog').textContent = morphingStateLog;
}, 16);

const canvas = document.getElementById(faceTrackingRenderCanvasID);
const engine = new BABYLON.Engine(canvas, true);
let scene = null; 

//skeleton variables -> to reset


let reseting = false;
export function resetFaceTracking()
{
  if(reseting){return;}else{reseting = true;}

  faceTrackingReady = false;
  engine.stopRenderLoop();
  if(scene){scene.dispose();}
  scene = new BABYLON.Scene(engine);
  // if(scene)
  // { scene.dispose;
  //   engine.stopRenderLoop(); }
  resetSkeleton ();
  createScene();
  reseting = false;
}



const createScene = async function () {
    
    scene.environmentTexture = new BABYLON.CubeTexture(environmentHDRIPath, scene);
    scene.environmentTexture.rotation = 1.5;
    let background = new BABYLON.Layer('BackgroundLayer', null, scene, true);
    background.texture = new BABYLON.Texture(backgroundTexturePath);

    let camera = new BABYLON.FreeCamera("RenderCamera", new BABYLON.Vector3(0, 0, 45.0), scene, true);
    camera.fov = 0.4;
    camera.setTarget(BABYLON.Vector3.Zero());

    if(postProcessImage)
    {var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
      edge_blur: 1.0,
      chromatic_aberration: 1.0,
      distortion: 1.0,
      dof_focus_distance: 500.0,
      dof_aperture: 20.0,			// set this very high for tilt-shift effect
      grain_amount: 0.0,
      dof_pentagon: true,
      dof_gain: 1.0,
      dof_threshold: 1.0,
      dof_darken: 0.0
    }, scene, 1.0, camera);}

    let light = new BABYLON.HemisphericLight("KeyLight", new BABYLON.Vector3(5000, 10000,-10000), scene);
    light.intensity = 250.0;

    let filesetResolver = await FilesetResolver.forVisionTasks(wasmPath);
    let faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {

    baseOptions: {
       modelAssetPath: modAssetPath,
        delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
    runningMode : "VIDEO",
    numFaces: 1,
    selfieMode: true,

});

   await loadSceneContent(faceLandmarker);

   engine.runRenderLoop(function(){
     if(faceTrackingReady )//&& !faceTrackingPaused)
     {scene.render();}
   });

}

const loadSceneContent = async function(faceLandmarker) {

    let mpCameraUtils = window;
    let devices = await navigator.mediaDevices.enumerateDevices();
    let deviceId = devices.find(d => d.kind === 'videoinput')?.deviceId;

    let webcam = await BABYLON.VideoTexture.CreateFromWebCamAsync(scene, {
      deviceId: deviceId || '',
      maxWidth: 1920,
      maxHeight: 1080,
      minWidth: 360,
      minHeight: 180,
    });

    webcam._invertY = true;

    let lastVideoTime = -1;
   
	let ikPole = BABYLON.MeshBuilder.CreateSphere('', {diameter: 10.05}, scene);
	ikPole.position = new BABYLON.Vector3(100, 1, 0);
  ikPole.isVisible = false;
	
  let ikController = BABYLON.MeshBuilder.CreateBox('', { size: 10.1 }, scene);
	ikController.position = new BABYLON.Vector3(0, 1, 0);
  ikController.isVisible = false;
  let ikCtl;

  let nodeMaterial = new BABYLON.NodeMaterial("node material", scene, { emitComments: false });
  createNodeMat(nodeMaterial);

  let wormMesh;
  let skeleton;
  let normalsStd;
  let normalsIdl;
  let normalsCur;
  BABYLON.SceneLoader.ImportMesh("","faceTrackingAssets/3dModels/","abyssWorm.glb", scene, function(newMeshes,particleSystems, skeletons){
  wormMesh = newMeshes[1];
  normalsStd = newMeshes[1].getNormalsData();
  normalsCur = newMeshes[1].getNormalsData();
  
  scene.animationGroups.forEach((g) => {
      g.stop()
  })
  scene.animationGroups[0].start(false, 1, 10, 20);
  skeleton = skeletons[0];
  let ikBone_R = skeleton.bones[8];
  ikCtl = new BABYLON.BoneIKController(wormMesh, ikBone_R, {targetMesh: ikController, poleTargetMesh:ikPole, poleAngle: Math.PI/ 2});
  wormMesh.morphTargetManager.getTarget(51).influence = 1.0;
  wormMesh.useVertexColor = false;
  wormMesh.material = nodeMaterial;
 
  BABYLON.SceneLoader.ImportMesh("","faceTrackingAssets/3dModels/","abyssWorm_idle.glb", scene, function(newMeshesT,particleSystems, skeletons){
  normalsIdl = newMeshesT[1].getVerticesData(BABYLON.VertexBuffer.NormalKind);
  newMeshesT[1].isVisible = false;
  
    });
  });
 
  // let results;
  let isDetecting = false;
  let startTimeMs;
  let isLost = false;
  let isFinded = false;
  let isPaused = false;
  let lastResults = undefined;
  let facecamera = new mpCameraUtils.Camera(webcam.video, {
      onFrame: async () => {

        if(normalsStd == null ||normalsIdl == null||normalsCur == null)
        {
          console.log("normals array null");
          return;
        }
        // if(faceTrackingPaused){return;}
        if(isDetecting){return;}
        isDetecting = true;
        startTimeMs = performance.now();

        if (lastVideoTime !== webcam.video.currentTime &&  webcam.video.currentTime > 0.0 ) {
          lastVideoTime = webcam.video.currentTime;

          //detection mediapipe
          var results;
          isPaused = faceTrackingPaused;
          if(isPaused){results = lastResults;}
          else {results = faceLandmarker.detectForVideo(webcam.video, startTimeMs);}
          if(!isPaused && results.faceBlendshapes[0]!=undefined)
          {
            lastResults = results;
           if(!isTracking) {isTracking = true; isFinded = true; }
           isTracking = true;
          }else{
            if(isTracking) {isTracking = false; isLost = true; }
            isTracking = false;
          }
          
          morphingStateLog = (isTracking?"IS TRACKING":"NO TRACKING")+ " - isTooFar: "+isTooFar+ " - isPaused: "+isPaused ;//+ " - isLost: "+isLost+" - isFinded: "+isFinded;

          updateWormAnimation(results, ikCtl, ikPole, ikController, skeleton, wormMesh, normalsCur, normalsIdl, normalsStd, isTracking, isFinded, isLost, isPaused);
         
          isLost = false;
          isFinded = false;
          
      
          
      }
      
     
      isDetecting = false;
      },
    });
    
    facecamera.start();
    scene.onDisposeObservable.addOnce(() => { 
    console.log("facecamera.stop()");
    facecamera.stop();});
}



function resetSkeleton ()
{
  frame = 0.0;
  avgRotX,avgRotY,avgRotZ;
  nAvgRot = 0;
  avgRotInit = false;
}
let results;
let frame = 0.0;
function updateWormAnimation(resultsIn, ikCtl, ikPole, ikController, skeleton, wormMesh, normalsCur, normalsIdl, normalsStd, isTracking, isFinded, isLost, isPaused)
{
  frame += 1.0;

  let valPos0 = (Math.cos(((frame*0.002)%1.0)*Math.PI*2.0));
  let valPos1 = (Math.cos(((frame*0.005)%1.0)*Math.PI*2.0));
  // updateLerpValues();
  let zVal = 0.0;
  if(isTracking)
  {
    results = resultsIn;
    computeResultsSkeletonAnim(results);
    zVal = -results.facialTransformationMatrixes[0].data[14];
    skeletonAnimValues.modelPos.x += (50*valPos0);
    skeletonAnimValues.modelPos.y += (50*valPos1);
    skeletonAnimValues.ikControllerPos.y += (-50*valPos1);
  }else{
    var zeroVal = 0.0;
     distanceToCamLog = "MP position = X:" + zeroVal.toFixed(2)+" Y:"+ zeroVal.toFixed(2)+" Z:"+ zeroVal.toFixed(2);
  }



  skeletonIdleValues.modelPos =  new BABYLON.Vector3 (startPos.x +(50*valPos0),startPos.y+(50*valPos1),startPos.z-550.0 );
  skeletonIdleValues.ikControllerPos = new BABYLON.Vector3(startPos.x +(150*-valPos1),240.0+(-75*valPos0),-maxDistToCam * 10.0);
  
  let isAnimBegining = false;
  let morphSmoothing = true;
  
  let isGoingIn = false;
  let isGoingOut = false;
  if(zVal  > maxDistToCam && !isTooFar)
  {
    isTooFar = true;
    isGoingOut = true;
    isGoingIn = false;
  }

  if(zVal < maxDistToCam*0.8 && isTooFar )
  {
    isTooFar = false;
    isGoingOut = false;
    isGoingIn = true;
  }

  if((isFinded || isGoingIn)&& !isMorphingToStd && !isPaused && !isStd && !isTooFar)
  {
    isMorphingToStd = true;
    if(isMorphingToIdl){ isMorphingToIdl = false;}
    isIdl = false;
    isAnimBegining = true;
  }

  if((isLost || isPaused || isGoingOut) && !isMorphingToIdl && !isIdl)
  {
    isMorphingToIdl = true;
    if(isMorphingToStd){ isMorphingToStd = false;}
    isStd = false;
    isAnimBegining = true;
  }
  if (isMorphingToIdl){ 
    isMorphingToIdl = updateMorphLerpValue(1.0, isAnimBegining,  morphSmoothing); 
    isIdl = isMorphingToIdl?false:true;
  }
  if (isMorphingToStd){ 
    isMorphingToStd = updateMorphLerpValue(-1.0, isAnimBegining, morphSmoothing); 
    isStd = isMorphingToStd?false:true;
  }

  isGoingOut = false;
  isGoingIn = false;

  isMorphing = isMorphingToIdl||isMorphingToStd;
  // morphingStateLog += " - isMorphing: "+isMorphing+ " -> value: "+morphLerpValue.toFixed(2)+" - toStd: "+isMorphingToStd+" - toIdl: "+isMorphingToIdl;
  if(isMorphing){computeMorphers( results, wormMesh, normalsCur, normalsIdl, normalsStd, false, morphLerpValue);}
  else if (isStd){computeMorphers( results, wormMesh, normalsCur, normalsIdl, normalsStd, isStd, morphLerpValue);}

 

  skeleton.bones[10].getTransformNode().rotation = new BABYLON.Vector3(skeletonAnimValues.headBoneRotation.x*(1.0 - morphLerpValue), skeletonAnimValues.headBoneRotation.y*(1.0 - morphLerpValue),skeletonAnimValues.headBoneRotation.z*(1.0 - morphLerpValue));
  wormMesh.position = new BABYLON.Vector3(skeletonAnimValues.modelPos.x*(1.0 - morphLerpValue)+skeletonIdleValues.modelPos.x*(morphLerpValue),skeletonAnimValues.modelPos.y*(1.0 - morphLerpValue)+skeletonIdleValues.modelPos.y*(morphLerpValue),skeletonAnimValues.modelPos.z*(1.0 - morphLerpValue)+skeletonIdleValues.modelPos.z*(morphLerpValue));
  ikController.position = new BABYLON.Vector3(skeletonAnimValues.ikControllerPos.x*(1.0 - morphLerpValue)+skeletonIdleValues.ikControllerPos.x*(morphLerpValue),skeletonAnimValues.ikControllerPos.y*(1.0 - morphLerpValue)+skeletonIdleValues.ikControllerPos.y*(morphLerpValue),skeletonAnimValues.ikControllerPos.z*(1.0 - morphLerpValue)+skeletonIdleValues.ikControllerPos.z*(morphLerpValue));
  ikPole.position = new BABYLON.Vector3(ikController.position.x-1000.0, ikController.position.y, ikController.position.z);
 
 
  ikCtl.update();
  
 if(!faceTrackingReady)
    {faceTrackingReady = true;}
}

class SkeletonAnimValues
{
  constructor(headBoneRotation, age) {
    this.headBoneRotation = BABYLON.Vector3(0.0,0.0,0.0);
    this.modelPos =  BABYLON.Vector3(0.0,0.0,0.0);
    this.ikControllerPos = BABYLON.Vector3(0.0,0.0,0.0);
    this.isEmpty = true;
}

};

let skeletonAnimValues = new SkeletonAnimValues();
let skeletonIdleValues = new SkeletonAnimValues();


let startPos = new BABYLON.Vector3(0.0,-1500.0,0.0);
let avgRotX,avgRotY,avgRotZ;
let nAvgRot = 0;
let avgRotInit = false;
let morphLerpValue = 0.0;
let isIdl = false;
let isStd = false;
let isMorphingToIdl = false;
let isMorphingToStd = false;
let isMorphing = false;

let a,b,c;
function updateMorphLerpValue(sign, isBegining, smoothing)
{
  if(smoothing){
  if(isBegining)
  {
   
    a = morphLerpValue;
    b =(sign /2.0)+0.5;
    c = morphLerpValue;
  }
  c += sign *( (1.0/morphAnimDuration)/30.0);
  // let val = (c-a)/(b-a);
  // let cos = Math.cos(val*Math.PI);
  morphLerpValue = (1.0-(((Math.cos(((c-a)/(b-a))*Math.PI))/2.0)+0.5))*(b-a)+a;


  if( sign > 0.0 && a >= b){morphLerpValue = 1.0; return false;}
  if( sign < 0.0 && a <= b){morphLerpValue = 0.0; return false;}
  if( sign > 0.0 && c >= b){morphLerpValue = 1.0; return false;}
  if( sign < 0.0 && c <= b){morphLerpValue = 0.0; return false;}
  if( sign > 0.0 && morphLerpValue >=1.0){morphLerpValue = 1.0; return false;}
  if( sign < 0.0 && morphLerpValue <= 0.0){morphLerpValue = 0.0; return false;}
  return true;
}
else
{
  morphLerpValue += sign *( (1.0/morphAnimDuration)/30.0);
  if( sign > 0.0 && morphLerpValue >=1.0){morphLerpValue = 1.0; return false;}
  if( sign < 0.0 && morphLerpValue <= 0.0){morphLerpValue = 0.0; return false;}
  return true;
}
  
 
}

let values = Array.from({ length: 16 }, () => 0.0);
function computeResultsSkeletonAnim(results)
{
  let vX = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[0],results.facialTransformationMatrixes[0].data[1],results.facialTransformationMatrixes[0].data[2]);
  let vY = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[4],results.facialTransformationMatrixes[0].data[5],results.facialTransformationMatrixes[0].data[6]);
  let vZ = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[8],results.facialTransformationMatrixes[0].data[9],results.facialTransformationMatrixes[0].data[10]);

    values[0] = results.facialTransformationMatrixes[0].data[10];
    values[1] = results.facialTransformationMatrixes[0].data[9];
    values[2] = -results.facialTransformationMatrixes[0].data[8];

    values[4] = results.facialTransformationMatrixes[0].data[6];
    values[5] = results.facialTransformationMatrixes[0].data[5];
    values[6] = -results.facialTransformationMatrixes[0].data[4];

    values[8] = -results.facialTransformationMatrixes[0].data[2];
    values[9] = -results.facialTransformationMatrixes[0].data[1];
    values[10] = results.facialTransformationMatrixes[0].data[0];

    values[12] = results.facialTransformationMatrixes[0].data[12];
    values[13] = results.facialTransformationMatrixes[0].data[13];
    values[14] = results.facialTransformationMatrixes[0].data[14];

    distanceToCamLog = "MP position = X:" +values[12].toFixed(2)+" Y:"+values[13].toFixed(2)+" Z:"+values[14].toFixed(2);

    //head bones
    let rot = BABYLON.Vector3.RotationFromAxis(vX, vY, vZ);
    let testPos = new BABYLON.Vector3(values[12] *20.0, 350, values[14]+20);
    let rayToCam = new BABYLON.Vector3(testPos.x,testPos.y, testPos.z - 45.0);
    rayToCam.normalize();
    let rVal = (((Math.asin(rayToCam.x))/2.0)*1.1) + (-rot.y/3.0);
    let rotInv = new BABYLON.Vector3(-rot.z,rVal,-rot.x);
    let nRot = 5;
    
    if (!avgRotInit)
    {
      avgRotX = Array(nRot).fill(rotInv.x);
      avgRotY = Array(nRot).fill(rotInv.y);
      avgRotZ = Array(nRot).fill(rotInv.z);
      skeletonAnimValues.headBoneRotation = new BABYLON.Vector3(rotInv.x,rotInv.y,rotInv.z);
      avgRotInit = true;
    }
    else
    {
      avgRotX[nAvgRot] = rotInv.x;
      avgRotY[nAvgRot] = rotInv.y;
      avgRotZ[nAvgRot] = rotInv.z;
      let rotX = 0.0;
      let rotY = 0.0;
      let rotZ = 0.0;
      for (let i = 0;i<nRot;i++)
      {
        rotX += avgRotX[i] / nRot;
        rotY += avgRotY[i] / nRot; 
        rotZ += avgRotZ[i] / nRot;
      }
      skeletonAnimValues.headBoneRotation = new BABYLON.Vector3(rotX,rotY,rotZ);

      nAvgRot += 1;
      if(nAvgRot >= nRot)
      {nAvgRot = 0;}
    }


    // skeletonAnimValues.modelPos = new BABYLON.Vector3(startPos.x +(50*valPos0),startPos.y+(50*valPos1),startPos.z+(values[14]*10.0)+250.0);
    // skeletonAnimValues.ikControllerPos =  new BABYLON.Vector3(values[12] *20.0, 240.0 + valPos1*50.0, values[14]*10.0+20);
    skeletonAnimValues.modelPos = new BABYLON.Vector3(startPos.x ,startPos.y,startPos.z+(values[14]*10.0)+100.0);
    skeletonAnimValues.ikControllerPos =  new BABYLON.Vector3(values[12] *20.0, 300.0 , values[14]*10.0+200);
    
  }

function computeMorphers( results, wormMesh, normalsCur, normalsIdl, normalsStd, isStd, morphingValue)
{
  
  if(isStd)
  {
    var idx = -1;
    results.faceBlendshapes[0].categories.map((shape) => {
      if (wormMesh != undefined && idx >= 0 && idx < 51 && wormMesh.morphTargetManager != undefined) {
        let sid = idx;
        if (shape.categoryName.includes("Left")) { sid += 1; if (shape.categoryName.includes("jaw")) { sid += 1; } if (shape.categoryName.includes("mouthLeft")) { sid += 5; } }
        if (shape.categoryName.includes("Right")) { sid -= 1; if (shape.categoryName.includes("jaw")) { sid -= 1; } if (shape.categoryName.includes("mouthRight")) { sid -= 5; } }
        wormMesh.morphTargetManager.getTarget(sid).influence = shape.score;
      }
      idx += 1;
    });
    return;
  }

  var idx = -1;
    results.faceBlendshapes[0].categories.map((shape) => {
    if (wormMesh != undefined && idx >= 0 && idx < 51 && wormMesh.morphTargetManager != undefined) {
      let sid = idx;
      if (shape.categoryName.includes("Left")) { sid += 1; if (shape.categoryName.includes("jaw")) { sid += 1; } if (shape.categoryName.includes("mouthLeft")) { sid += 5; } }
      if (shape.categoryName.includes("Right")) { sid -= 1; if (shape.categoryName.includes("jaw")) { sid -= 1; } if (shape.categoryName.includes("mouthRight")) { sid -= 5; } }

      wormMesh.morphTargetManager.getTarget(sid).influence = shape.score * (1.0 - morphingValue) ;
    }
    idx += 1;
  });
  wormMesh.morphTargetManager.getTarget(52).influence = morphingValue;
 
  for ( let i = 0; i<normalsCur.length;i++)
  {
    normalsCur[i] = (normalsStd[i] *  (1.0 -morphingValue)) + (normalsIdl[i] * morphingValue);
  }
  wormMesh.setVerticesData(BABYLON.VertexBuffer.NormalKind, normalsCur, true);

}







function createNodeMat(nodeMaterial) {
  //node material babylon -> https://nme.babylonjs.com/#100NDL#236
  nodeMaterial.mode = BABYLON.NodeMaterialModes.Material;
  
  // InputBlock
  var position = new BABYLON.InputBlock("position");
  position.visibleInInspector = false;
  position.visibleOnFrame = false;
  position.target = 1;
  position.setAsAttribute("position");
  
  // MorphTargetsBlock
  var MorphTargets = new BABYLON.MorphTargetsBlock("MorphTargets");
  MorphTargets.visibleInInspector = false;
  MorphTargets.visibleOnFrame = false;
  MorphTargets.target = 1;
  
  // InputBlock
  var normal = new BABYLON.InputBlock("normal");
  normal.visibleInInspector = false;
  normal.visibleOnFrame = false;
  normal.target = 1;
  normal.setAsAttribute("normal");
  
  // InputBlock
  var tangent = new BABYLON.InputBlock("tangent");
  tangent.visibleInInspector = false;
  tangent.visibleOnFrame = false;
  tangent.target = 1;
  tangent.setAsAttribute("tangent");
  
  // InputBlock
  var uv = new BABYLON.InputBlock("uv");
  uv.visibleInInspector = false;
  uv.visibleOnFrame = false;
  uv.target = 1;
  uv.setAsAttribute("uv");
  
  // TransformBlock
  var WorldPos = new BABYLON.TransformBlock("WorldPos");
  WorldPos.visibleInInspector = false;
  WorldPos.visibleOnFrame = false;
  WorldPos.target = 1;
  WorldPos.complementZ = 0;
  WorldPos.complementW = 1;
  
  // BonesBlock
  var Bones = new BABYLON.BonesBlock("Bones");
  Bones.visibleInInspector = false;
  Bones.visibleOnFrame = false;
  Bones.target = 1;
  
  // InputBlock
  var matricesIndices = new BABYLON.InputBlock("matricesIndices");
  matricesIndices.visibleInInspector = false;
  matricesIndices.visibleOnFrame = false;
  matricesIndices.target = 1;
  matricesIndices.setAsAttribute("matricesIndices");
  
  // InputBlock
  var matricesWeights = new BABYLON.InputBlock("matricesWeights");
  matricesWeights.visibleInInspector = false;
  matricesWeights.visibleOnFrame = false;
  matricesWeights.target = 1;
  matricesWeights.setAsAttribute("matricesWeights");
  
  // InputBlock
  var World = new BABYLON.InputBlock("World");
  World.visibleInInspector = false;
  World.visibleOnFrame = false;
  World.target = 1;
  World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);
  
  // TransformBlock
  var Worldnormal = new BABYLON.TransformBlock("World normal");
  Worldnormal.visibleInInspector = false;
  Worldnormal.visibleOnFrame = false;
  Worldnormal.target = 1;
  Worldnormal.complementZ = 0;
  Worldnormal.complementW = 0;
  
  // NormalizeBlock
  var Normalize = new BABYLON.NormalizeBlock("Normalize");
  Normalize.visibleInInspector = false;
  Normalize.visibleOnFrame = false;
  Normalize.target = 4;
  
  // AddBlock
  var Add = new BABYLON.AddBlock("Add");
  Add.visibleInInspector = false;
  Add.visibleOnFrame = false;
  Add.target = 4;
  
  // ScaleBlock
  var Scale = new BABYLON.ScaleBlock("Scale");
  Scale.visibleInInspector = false;
  Scale.visibleOnFrame = false;
  Scale.target = 4;
  
  // VectorMergerBlock
  var VectorMerger = new BABYLON.VectorMergerBlock("VectorMerger");
  VectorMerger.visibleInInspector = false;
  VectorMerger.visibleOnFrame = false;
  VectorMerger.target = 2;
  VectorMerger.xSwizzle = "x";
  VectorMerger.ySwizzle = "y";
  VectorMerger.zSwizzle = "z";
  VectorMerger.wSwizzle = "w";
  
  // ScaleBlock
  var Scale1 = new BABYLON.ScaleBlock("Scale");
  Scale1.visibleInInspector = false;
  Scale1.visibleOnFrame = false;
  Scale1.target = 4;
  
  // VectorMergerBlock
  var VectorMerger1 = new BABYLON.VectorMergerBlock("VectorMerger");
  VectorMerger1.visibleInInspector = false;
  VectorMerger1.visibleOnFrame = false;
  VectorMerger1.target = 4;
  VectorMerger1.xSwizzle = "x";
  VectorMerger1.ySwizzle = "y";
  VectorMerger1.zSwizzle = "z";
  VectorMerger1.wSwizzle = "w";
  
  // SimplexPerlin3DBlock
  var SimplexPerlinD = new BABYLON.SimplexPerlin3DBlock("SimplexPerlin3D");
  SimplexPerlinD.visibleInInspector = false;
  SimplexPerlinD.visibleOnFrame = false;
  SimplexPerlinD.target = 4;
  
  // ScaleBlock
  var Scale2 = new BABYLON.ScaleBlock("Scale");
  Scale2.visibleInInspector = false;
  Scale2.visibleOnFrame = false;
  Scale2.target = 4;
  
  // AddBlock
  var Add1 = new BABYLON.AddBlock("Add");
  Add1.visibleInInspector = false;
  Add1.visibleOnFrame = false;
  Add1.target = 4;
  
  // VectorMergerBlock
  var VectorMerger2 = new BABYLON.VectorMergerBlock("VectorMerger");
  VectorMerger2.visibleInInspector = false;
  VectorMerger2.visibleOnFrame = false;
  VectorMerger2.target = 4;
  VectorMerger2.xSwizzle = "x";
  VectorMerger2.ySwizzle = "y";
  VectorMerger2.zSwizzle = "z";
  VectorMerger2.wSwizzle = "w";
  
  // MultiplyBlock
  var Multiply = new BABYLON.MultiplyBlock("Multiply");
  Multiply.visibleInInspector = false;
  Multiply.visibleOnFrame = false;
  Multiply.target = 4;
  
  // InputBlock
  var Time = new BABYLON.InputBlock("Time");
  Time.visibleInInspector = false;
  Time.visibleOnFrame = false;
  Time.target = 1;
  Time.value = 0;
  Time.min = 0;
  Time.max = 0;
  Time.isBoolean = false;
  Time.matrixMode = 0;
  Time.animationType = BABYLON.AnimatedInputBlockTypes.Time;
  Time.isConstant = false;
  
  // InputBlock
  var Float = new BABYLON.InputBlock("Float");
  Float.visibleInInspector = false;
  Float.visibleOnFrame = false;
  Float.target = 1;
  Float.value = -100;
  Float.min = -1000;
  Float.max = 1000;
  Float.isBoolean = false;
  Float.matrixMode = 0;
  Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float.isConstant = false;
  
  // InputBlock
  var Float1 = new BABYLON.InputBlock("Float");
  Float1.visibleInInspector = false;
  Float1.visibleOnFrame = false;
  Float1.target = 1;
  Float1.value = 0.01;
  Float1.min = 0;
  Float1.max = 10;
  Float1.isBoolean = false;
  Float1.matrixMode = 0;
  Float1.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float1.isConstant = false;
  
  // InputBlock
  var Float2 = new BABYLON.InputBlock("Float");
  Float2.visibleInInspector = false;
  Float2.visibleOnFrame = false;
  Float2.target = 1;
  Float2.value = 10;
  Float2.min = -10;
  Float2.max = 10;
  Float2.isBoolean = false;
  Float2.matrixMode = 0;
  Float2.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float2.isConstant = false;
  
  // SubtractBlock
  var Subtract = new BABYLON.SubtractBlock("Subtract");
  Subtract.visibleInInspector = false;
  Subtract.visibleOnFrame = false;
  Subtract.target = 4;
  
  // InputBlock
  var Float3 = new BABYLON.InputBlock("Float");
  Float3.visibleInInspector = false;
  Float3.visibleOnFrame = false;
  Float3.target = 1;
  Float3.value = 1;
  Float3.min = 0;
  Float3.max = 0;
  Float3.isBoolean = false;
  Float3.matrixMode = 0;
  Float3.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float3.isConstant = false;
  
  // InputBlock
  var Float4 = new BABYLON.InputBlock("Float");
  Float4.visibleInInspector = false;
  Float4.visibleOnFrame = false;
  Float4.target = 1;
  Float4.value = 0.97;
  Float4.min = 0;
  Float4.max = 1;
  Float4.isBoolean = false;
  Float4.matrixMode = 0;
  Float4.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float4.isConstant = false;
  
  // ScaleBlock
  var Scale3 = new BABYLON.ScaleBlock("Scale");
  Scale3.visibleInInspector = false;
  Scale3.visibleOnFrame = false;
  Scale3.target = 4;
  
  // VectorMergerBlock
  var VectorMerger3 = new BABYLON.VectorMergerBlock("VectorMerger");
  VectorMerger3.visibleInInspector = false;
  VectorMerger3.visibleOnFrame = false;
  VectorMerger3.target = 4;
  VectorMerger3.xSwizzle = "x";
  VectorMerger3.ySwizzle = "y";
  VectorMerger3.zSwizzle = "z";
  VectorMerger3.wSwizzle = "w";
  
  // PBRMetallicRoughnessBlock
  var PBRMetallicRoughness = new BABYLON.PBRMetallicRoughnessBlock("PBRMetallicRoughness");
  PBRMetallicRoughness.visibleInInspector = false;
  PBRMetallicRoughness.visibleOnFrame = false;
  PBRMetallicRoughness.target = 3;
  PBRMetallicRoughness.lightFalloff = 2;
  PBRMetallicRoughness.useAlphaTest = false;
  PBRMetallicRoughness.alphaTestCutoff = 0.46;
  PBRMetallicRoughness.useAlphaBlending = false;
  PBRMetallicRoughness.useRadianceOverAlpha = true;
  PBRMetallicRoughness.useSpecularOverAlpha = true;
  PBRMetallicRoughness.enableSpecularAntiAliasing = false;
  PBRMetallicRoughness.realTimeFiltering = false;
  PBRMetallicRoughness.realTimeFilteringQuality = 8;
  PBRMetallicRoughness.useEnergyConservation = true;
  PBRMetallicRoughness.useRadianceOcclusion = true;
  PBRMetallicRoughness.useHorizonOcclusion = true;
  PBRMetallicRoughness.unlit = false;
  PBRMetallicRoughness.forceNormalForward = true;
  PBRMetallicRoughness.debugMode = 0;
  PBRMetallicRoughness.debugLimit = -1;
  PBRMetallicRoughness.debugFactor = 1;
  PBRMetallicRoughness.environmentIntensity = 4;
  // InputBlock
  var view = new BABYLON.InputBlock("view");
  view.visibleInInspector = false;
  view.visibleOnFrame = false;
  view.target = 1;
  view.setAsSystemValue(BABYLON.NodeMaterialSystemValues.View);
  
  // InputBlock
  var cameraPosition = new BABYLON.InputBlock("cameraPosition");
  cameraPosition.visibleInInspector = false;
  cameraPosition.visibleOnFrame = false;
  cameraPosition.target = 1;
  cameraPosition.setAsSystemValue(BABYLON.NodeMaterialSystemValues.CameraPosition);
  
  // InputBlock
  var Color = new BABYLON.InputBlock("Color3");
  Color.visibleInInspector = false;
  Color.visibleOnFrame = false;
  Color.target = 1;
  Color.value = new BABYLON.Color3(0.2, 0.4, 0.6);
  Color.isConstant = false;
  
  // InputBlock
  var Metallic = new BABYLON.InputBlock("Metallic");
  Metallic.visibleInInspector = true;
  Metallic.visibleOnFrame = false;
  Metallic.target = 1;
  Metallic.value = 0.45;
  Metallic.min = 0;
  Metallic.max = 1;
  Metallic.isBoolean = false;
  Metallic.matrixMode = 0;
  Metallic.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Metallic.isConstant = false;
  
  // InputBlock
  var Roughness = new BABYLON.InputBlock("Roughness");
  Roughness.visibleInInspector = true;
  Roughness.visibleOnFrame = false;
  Roughness.target = 1;
  Roughness.value = 0.1;
  Roughness.min = 0;
  Roughness.max = 1;
  Roughness.isBoolean = false;
  Roughness.matrixMode = 0;
  Roughness.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Roughness.isConstant = false;
  
  // InputBlock
  var Refractionior = new BABYLON.InputBlock("Refraction ior");
  Refractionior.visibleInInspector = true;
  Refractionior.visibleOnFrame = false;
  Refractionior.target = 1;
  Refractionior.value = 1.1;
  Refractionior.min = 1;
  Refractionior.max = 3;
  Refractionior.isBoolean = false;
  Refractionior.matrixMode = 0;
  Refractionior.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Refractionior.isConstant = false;
  
  // InputBlock
  var Ambientcolor = new BABYLON.InputBlock("Ambient color");
  Ambientcolor.visibleInInspector = true;
  Ambientcolor.visibleOnFrame = false;
  Ambientcolor.target = 1;
  Ambientcolor.value = new BABYLON.Color3(0.3, 0.4, 0.75);
  Ambientcolor.isConstant = false;
  
  // ReflectionBlock
  var Reflection = new BABYLON.ReflectionBlock("Reflection");
  Reflection.visibleInInspector = false;
  Reflection.visibleOnFrame = false;
  Reflection.target = 3;
  Reflection.useSphericalHarmonics = true;
  Reflection.forceIrradianceInFragment = false;
  
  // InputBlock
  var Reflectioncolor = new BABYLON.InputBlock("Reflection color");
  Reflectioncolor.visibleInInspector = true;
  Reflectioncolor.visibleOnFrame = false;
  Reflectioncolor.target = 1;
  Reflectioncolor.value = new BABYLON.Color3(0.3, 0.5, 0.75);
  Reflectioncolor.isConstant = false;
  
  // SubSurfaceBlock
  var SubSurface = new BABYLON.SubSurfaceBlock("SubSurface");
  SubSurface.visibleInInspector = false;
  SubSurface.visibleOnFrame = false;
  SubSurface.target = 2;
  
  // InputBlock
  var SubSurfacemaxthickness = new BABYLON.InputBlock("SubSurface max thickness");
  SubSurfacemaxthickness.visibleInInspector = true;
  SubSurfacemaxthickness.visibleOnFrame = false;
  SubSurfacemaxthickness.target = 1;
  SubSurfacemaxthickness.value = 10;
  SubSurfacemaxthickness.min = 0;
  SubSurfacemaxthickness.max = 10;
  SubSurfacemaxthickness.isBoolean = false;
  SubSurfacemaxthickness.matrixMode = 0;
  SubSurfacemaxthickness.animationType = BABYLON.AnimatedInputBlockTypes.None;
  SubSurfacemaxthickness.isConstant = false;
  
  // InputBlock
  var SubSurfacetintcolor = new BABYLON.InputBlock("SubSurface tint color");
  SubSurfacetintcolor.visibleInInspector = true;
  SubSurfacetintcolor.visibleOnFrame = false;
  SubSurfacetintcolor.target = 1;
  SubSurfacetintcolor.value = new BABYLON.Color3(0, 0.4470588235294118, 1);
  SubSurfacetintcolor.isConstant = false;
  
  // InputBlock
  var SubSurfacetranslucencyintensity = new BABYLON.InputBlock("SubSurface translucency intensity");
  SubSurfacetranslucencyintensity.visibleInInspector = true;
  SubSurfacetranslucencyintensity.visibleOnFrame = false;
  SubSurfacetranslucencyintensity.target = 1;
  SubSurfacetranslucencyintensity.value = 1;
  SubSurfacetranslucencyintensity.min = 0;
  SubSurfacetranslucencyintensity.max = 1;
  SubSurfacetranslucencyintensity.isBoolean = false;
  SubSurfacetranslucencyintensity.matrixMode = 0;
  SubSurfacetranslucencyintensity.animationType = BABYLON.AnimatedInputBlockTypes.None;
  SubSurfacetranslucencyintensity.isConstant = false;
  
  // InputBlock
  var SubSurfacetranslucencydiffusiondistance = new BABYLON.InputBlock("SubSurface translucency diffusion distance");
  SubSurfacetranslucencydiffusiondistance.visibleInInspector = true;
  SubSurfacetranslucencydiffusiondistance.visibleOnFrame = false;
  SubSurfacetranslucencydiffusiondistance.target = 1;
  SubSurfacetranslucencydiffusiondistance.value = new BABYLON.Color3(1, 1, 1);
  SubSurfacetranslucencydiffusiondistance.isConstant = false;
  
  // RefractionBlock
  var Refraction = new BABYLON.RefractionBlock("Refraction");
  Refraction.visibleInInspector = false;
  Refraction.visibleOnFrame = false;
  Refraction.target = 2;
  Refraction.linkRefractionWithTransparency = false;
  Refraction.invertRefractionY = false;
  Refraction.useThicknessAsDepth = false;
  
  // InputBlock
  var Refractionintensity = new BABYLON.InputBlock("Refraction intensity");
  Refractionintensity.visibleInInspector = true;
  Refractionintensity.visibleOnFrame = false;
  Refractionintensity.target = 1;
  Refractionintensity.value = 1;
  Refractionintensity.min = 0;
  Refractionintensity.max = 1;
  Refractionintensity.isBoolean = false;
  Refractionintensity.matrixMode = 0;
  Refractionintensity.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Refractionintensity.isConstant = false;
  
  // InputBlock
  var Refractiontintatdistance = new BABYLON.InputBlock("Refraction tint at distance");
  Refractiontintatdistance.visibleInInspector = true;
  Refractiontintatdistance.visibleOnFrame = false;
  Refractiontintatdistance.target = 1;
  Refractiontintatdistance.value = 10;
  Refractiontintatdistance.min = 0;
  Refractiontintatdistance.max = 10;
  Refractiontintatdistance.isBoolean = false;
  Refractiontintatdistance.matrixMode = 0;
  Refractiontintatdistance.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Refractiontintatdistance.isConstant = false;
  
  // InputBlock
  var Float_ior_volume = new BABYLON.InputBlock("Float_ior_volume");
  Float_ior_volume.visibleInInspector = false;
  Float_ior_volume.visibleOnFrame = false;
  Float_ior_volume.target = 1;
  Float_ior_volume.value = 1.1;
  Float_ior_volume.min = 0;
  Float_ior_volume.max = 2;
  Float_ior_volume.isBoolean = false;
  Float_ior_volume.matrixMode = 0;
  Float_ior_volume.animationType = BABYLON.AnimatedInputBlockTypes.None;
  Float_ior_volume.isConstant = false;
  
  // FragmentOutputBlock
  var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
  FragmentOutput.visibleInInspector = false;
  FragmentOutput.visibleOnFrame = false;
  FragmentOutput.target = 2;
  FragmentOutput.convertToGammaSpace = undefined;
  FragmentOutput.convertToLinearSpace = undefined;
  FragmentOutput.useLogarithmicDepth = false;
  
  // TransformBlock
  var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
  WorldPosViewProjectionTransform.visibleInInspector = false;
  WorldPosViewProjectionTransform.visibleOnFrame = false;
  WorldPosViewProjectionTransform.target = 1;
  WorldPosViewProjectionTransform.complementZ = 0;
  WorldPosViewProjectionTransform.complementW = 1;
  
  // InputBlock
  var ViewProjection = new BABYLON.InputBlock("ViewProjection");
  ViewProjection.visibleInInspector = false;
  ViewProjection.visibleOnFrame = false;
  ViewProjection.target = 1;
  ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);
  
  // VertexOutputBlock
  var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
  VertexOutput.visibleInInspector = false;
  VertexOutput.visibleOnFrame = false;
  VertexOutput.target = 1;
  
  // Connections
  position.output.connectTo(MorphTargets.position);
  normal.output.connectTo(MorphTargets.normal);
  tangent.output.connectTo(MorphTargets.tangent);
  uv.output.connectTo(MorphTargets.uv);
  MorphTargets.positionOutput.connectTo(WorldPos.vector);
  matricesIndices.output.connectTo(Bones.matricesIndices);
  matricesWeights.output.connectTo(Bones.matricesWeights);
  World.output.connectTo(Bones.world);
  Bones.output.connectTo(WorldPos.transform);
  WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
  ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
  WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
  WorldPos.output.connectTo(PBRMetallicRoughness.worldPosition);
  Time.output.connectTo(Multiply.left);
  Float.output.connectTo(Multiply.right);
  Multiply.output.connectTo(VectorMerger2.x);
  Multiply.output.connectTo(VectorMerger2.y);
  Multiply.output.connectTo(VectorMerger2.z);
  VectorMerger2.xyz.connectTo(Add1.left);
  MorphTargets.positionOutput.connectTo(Add1.right);
  Add1.output.connectTo(Scale2.input);
  Float1.output.connectTo(Scale2.factor);
  Scale2.output.connectTo(SimplexPerlinD.seed);
  SimplexPerlinD.output.connectTo(VectorMerger1.x);
  SimplexPerlinD.output.connectTo(VectorMerger1.y);
  SimplexPerlinD.output.connectTo(VectorMerger1.z);
  VectorMerger1.xyz.connectTo(Scale1.input);
  Float2.output.connectTo(Scale1.factor);
  Scale1.output.connectTo(VectorMerger.xyzIn);
  VectorMerger.xyz.connectTo(Scale.input);
  Float3.output.connectTo(Subtract.left);
  Float4.output.connectTo(Subtract.right);
  Subtract.output.connectTo(Scale.factor);
  Scale.output.connectTo(Add.left);
  MorphTargets.normalOutput.connectTo(VectorMerger3.xyzIn);
  VectorMerger3.xyz.connectTo(Scale3.input);
  Float4.output.connectTo(Scale3.factor);
  Scale3.output.connectTo(Add.right);
  Add.output.connectTo(Normalize.input);
  Normalize.output.connectTo(Worldnormal.vector);
  Bones.output.connectTo(Worldnormal.transform);
  Worldnormal.output.connectTo(PBRMetallicRoughness.worldNormal);
  view.output.connectTo(PBRMetallicRoughness.view);
  cameraPosition.output.connectTo(PBRMetallicRoughness.cameraPosition);
  Color.output.connectTo(PBRMetallicRoughness.baseColor);
  Metallic.output.connectTo(PBRMetallicRoughness.metallic);
  Roughness.output.connectTo(PBRMetallicRoughness.roughness);
  Refractionior.output.connectTo(PBRMetallicRoughness.indexOfRefraction);
  Ambientcolor.output.connectTo(PBRMetallicRoughness.ambientColor);
  MorphTargets.positionOutput.connectTo(Reflection.position);
  Bones.output.connectTo(Reflection.world);
  Reflectioncolor.output.connectTo(Reflection.color);
  Reflection.reflection.connectTo(PBRMetallicRoughness.reflection);
  SubSurfacemaxthickness.output.connectTo(SubSurface.thickness);
  SubSurfacetintcolor.output.connectTo(SubSurface.tintColor);
  SubSurfacetranslucencyintensity.output.connectTo(SubSurface.translucencyIntensity);
  SubSurfacetranslucencydiffusiondistance.output.connectTo(SubSurface.translucencyDiffusionDist);
  Refractionintensity.output.connectTo(Refraction.intensity);
  Refractiontintatdistance.output.connectTo(Refraction.tintAtDistance);
  Float_ior_volume.output.connectTo(Refraction.volumeIndexOfRefraction);
  Refraction.refraction.connectTo(SubSurface.refraction);
  SubSurface.subsurface.connectTo(PBRMetallicRoughness.subsurface);
  PBRMetallicRoughness.lighting.connectTo(FragmentOutput.rgb);
  
  // Output nodes
  nodeMaterial.addOutputNode(VertexOutput);
  nodeMaterial.addOutputNode(FragmentOutput);
  nodeMaterial.build();
  

}
