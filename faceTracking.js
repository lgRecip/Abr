
var cu = document.createElement("script");
cu.src = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";
cu.crossOrigin = "anonymous";
document.head.appendChild(cu);

var fm = document.createElement("script");
fm.src = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
fm.crossOrigin = "anonymous";
document.head.appendChild(fm);

let modAssetPath = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
// let wasmPath = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm";
let wasmPath =  "./node_modules/@mediapipe/tasks-vision/wasm";
let wormMesh;
let wormMesh_idle;
let skeleton;
let ikPole;
let ikController;
let textureFond;
let textureFond_seamless;
let bim ;
let frameBuffer;

import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;
let runningMode = "VIDEO";
let faceLandmarker;
let enableWebcamButton;
let webcamRunning = false;
const videoWidth = 480;
async function createFaceLandmarker() {
   
  const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
      },
      outputFaceBlendshapes: true,
	outputFacialTransformationMatrixes: true,
      runningMode,
      numFaces: 1,
      selfieMode: true,
  });
  // demosSection.classList.remove("invisible");
  console.log("FACE LANDMARKER LAUNCHED");
}
createFaceLandmarker();

// var vt = document.createElement("script");
// // vt.src = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/camera_utils.js";
// vt.src = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm";
// vt.crossOrigin = "anonymous";
// document.head.appendChild(vt);

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

let camera;

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.useRightHandedSystem = true;
    
    const camera = new BABYLON.FreeCamera("RenderCamera", new BABYLON.Vector3(0, 0, 90.0), scene, true);
    camera.fov = 0.6;
    camera.setTarget(BABYLON.Vector3.Zero());
    scene.attachControl(camera);

    // const alpha =  Math.PI/4;
    // const beta = Math.PI/3;
    // const radius = 8;
    // const target = new BABYLON.Vector3(0, 0, 0);
    // const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    
     camera.attachControl(canvas, true);


	  bim = BABYLON.MeshBuilder.CreateBox('', { size: 1.1 }, scene);
	bim.position = new BABYLON.Vector3(0, 1, 0);
	bim.parent = wormMesh;
  bim.addBehavior(new BABYLON.PointerDragBehavior());
  bim.isVisible = false;

  //  const light = new BABYLON.HemisphericLight("KeyLight", new BABYLON.Vector3(0, 1, 0), scene);
   // light.intensity = 0.7;

    fm.onload = function() {
        _loadSceneContent(scene);
    };
    // vt.onload = function() {
    //   _loadSceneContent(scene);
    // };

    return scene;
};

const _loadSceneContent = async function(scene) {
    const mpCameraUtils = window;
    const mpFaceMesh = window;

    const devices = await navigator.mediaDevices.enumerateDevices();
    const deviceId = devices.find(d => d.kind === 'videoinput')?.deviceId;

    const webcam = await BABYLON.VideoTexture.CreateFromWebCamAsync(scene, {
      deviceId: deviceId || '',
      maxWidth: 1920,
      maxHeight: 1080,
      minWidth: 640,
      minHeight: 480,
    });
    webcam._invertY = false;
    // webcam.uScale = -1.0;
    const facemesh = new mpFaceMesh.FaceMesh({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },

      
      
    });
    facemesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.65,
      minTrackingConfidence: 0.65,
      selfieMode: true,
      outputFaceBlendshapes: true,
    });

    let lastVideoTime = -1;
    let results = undefined;
   
   

   const facecamera = new mpCameraUtils.Camera(webcam.video, {
      onFrame: async () => {
        let startTimeMs = performance.now();
        // console.log(  webcam.video.currentTime);
        // console.log( "NEW WEBCAM FRAME");
        // await facemesh.send({ image: webcam.video });
          // videoOption =  ImageProcessingOptions.Builder;
          // videoOption.setRotationDegrees (90);
        // videoOption.setRotationDegrees(90);

        if (lastVideoTime !== webcam.video.currentTime &&  webcam.video.currentTime > 0.0 ) {
          lastVideoTime = webcam.video.currentTime;
        //  console.log(webcam.video.width);
        //  console.log(webcam.video.height);
          results = faceLandmarker.detectForVideo(webcam.video, startTimeMs);
          // console.log(results.faceBlendshapes[0]);
          // if (results.faceLandmarks ) {
            if(results.faceBlendshapes[0]!=undefined){
            newFacemeshUpdate (results)
         //   console.log( results.faceBlendshapes[0]);
           
            // let htmlMaker = "";
            // UpdateMorphTargetByName(morphTargetManager, targetName, influence)
            var idx = -1;
             results.faceBlendshapes[0].categories.map((shape) => {
           
              if(wormMesh != undefined && idx>=0 && idx<51 && wormMesh.morphTargetManager != undefined)
         { 
          //  console.log(idx);
          // console.log(shape.score);
          
           wormMesh.morphTargetManager.getTarget(idx).influence = shape.score;
           }
           idx+=1;
          });
          }
      }
      },
    });

    const freq = 30;
    const ftime = { s: 0, c: 0 };

    const filter_x = new OneEuroFilter(freq, 0.685, 0, 1);
    const filter_y = new OneEuroFilter(freq, 0.685, 0, 1);
    const filter_z = new OneEuroFilter(freq, 0.685, 0, 1);

    const trk_00 = {
      faceidx: 151,
      filters: [filter_x, filter_y, filter_z],
      freq: freq,
      trkobj: BABYLON.MeshBuilder.CreatePlane(
        `TrackingPlane`,
        { size: 0.01, sideOrientation: BABYLON.VertexData.DOUBLESIDE },
        scene)
    };
   // const envTex = new BABYLON.CubeTexture.CreateFromPrefilteredData("https://carolhmj.github.io/quick-demos/assets/textures/environments/meadows.env", scene);
const envTex = new BABYLON.CubeTexture.CreateFromPrefilteredData("environment.env", scene);
 textureFond = new BABYLON.Texture("Fond.png");
    textureFond_seamless = new BABYLON.Texture("Fond_seamless.png");
	
	// const background = new BABYLON.Layer('BackgroundLayer', null, scene, true);
    // background.texture = webcam;
     //background.texture = envTex;
     scene.environmentTexture = envTex;
    // const skybox = scene.createDefaultSkybox(envTex, true, 10000,0.1); 
    // resize bg
    // _update_view_scaling(scene, background, webcam);

const background = new BABYLON.Layer('BackgroundLayer', null, scene, true);
   
     background.texture = textureFond;
	
    const material = new BABYLON.PBRMaterial('FaceMesh_PBR', scene);
    material.albedoColor = BABYLON.Color3.Magenta();
    material.reflectivityColor = BABYLON.Color3.Black();
    material.sideOrientation = BABYLON.PBRMaterial.CounterClockWiseSideOrientation;
    material.wireframe = true;

    const headXform = new BABYLON.TransformNode('Head', scene);
    const headCenter = BABYLON.MeshBuilder.CreateSphere('HeadCenter', { diameter: 5}, scene);
    headCenter.parent = headXform;
    
    // compute mesh
    const mesh = new BABYLON.Mesh('FaceMesh', scene);
    mesh.material = material;
    mesh.scaling = BABYLON.Vector3.One().scale(10);
    mesh.isVisible = false;
    const normals = [];
    BABYLON.VertexData.ComputeNormals(_canonical_face_model.face_positions, _canonical_face_model.face_tris, normals);

    const vertexData = new BABYLON.VertexData();
    vertexData.positions = _canonical_face_model.face_positions;
    vertexData.indices = _canonical_face_model.face_tris;
    vertexData.uvs = _canonical_face_model.face_uvs;
    vertexData.normals = normals;
    vertexData.applyToMesh(mesh, true);

    headXform.isVisible = false;
    headCenter.isVisible = false;

    var mymat = new BABYLON.StandardMaterial("myMaterial", scene);
  
    const mat = new BABYLON.PBRMaterial("sphereMat", scene);

    mat.metallic = 0.001;
    mat.roughness = 0.1;
    const baseUrl = "https://carolhmj.github.io/quick-demos/assets/textures/materials/frosted-glass/"
   mat.albedoTexture = textureFond_seamless;
	// mat.albedoTexture = new BABYLON.Texture(`${baseUrl}Glass_Frosted_001_basecolor.jpg`);
    mat.metallicTexture = new BABYLON.Texture(`${baseUrl}Glass_Frosted_001_roughness.jpg`);
    mat.bumpTexture = new BABYLON.Texture(`${baseUrl}Glass_Frosted_001_normal.jpg`);
    mat.ambientTexture = new BABYLON.Texture(`${baseUrl}Glass_Frosted_001_ambientOcclusion.jpg`);
    mat.reflectionTexture = envTex;
	mat.reflectionTexture.rotationY = 1.5;
    mat.refractionTexture = envTex;
    mat.linkRefractionWithTransparency = true;
    mat.indexOfRefraction = 1.1;
    mat.alpha = 0.0; // Fully refractive material
    mat.bumpTexture.vScale = 2.0;
    mat.bumpTexture.uScale = 2.0;
	 mat.environmentIntensity = 4;
    let v = 0;

    scene.onBeforeRenderObservable.add(() => {
        mat.albedoTexture.vOffset = v;
        mat.bumpTexture.vOffset = v;
        mat.metallicTexture.vOffset = v;
        mat.ambientTexture.vOffset = v;

        v -= 0.0005 * scene.getAnimationRatio();
    });

	    BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/Abr/main/","abyssWorm_idle_3.glb", scene, function(newMeshes){
      wormMesh_idle = newMeshes[1];
      wormMesh_idle.material = mat;
      // wormMesh.scaling = new BABYLON.Vector3(1000.0,1000.0,1000.0);
      //   wormMesh.position = new BABYLON.Vector3(0.0,-1500.0,0.0);
      wormMesh_idle.setEnabled(false);
    });

    BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/lgRecip/Abr/main/","abyssWorm_blend_skinned_inflated_withIdle.glb", scene, function(newMeshes,particleSystems, skeletons){
        wormMesh = newMeshes[1];
        wormMesh.material = mat;
        wormMesh.scaling = new BABYLON.Vector3(1000.0,1000.0,1000.0);
        wormMesh.position = new BABYLON.Vector3(0.0,-1500.0,0.0);
		
    var target = null;
 //   console.log( "GLB TARGETS");
    const aniGr = scene.animationGroups
    scene.animationGroups.forEach((g) => {
        g.stop()
    })
    scene.animationGroups[0].start(false, 1, 10, 20);
    skeleton = skeletons[0];

    toggleSkViewer(true, scene);

    addIK(scene);
    wormMesh.morphTargetManager.getTarget(51).influence = 1.0;
    });
   


    // update results
    // facemesh.onResults(results => {
    //     _update_mesh(mesh, results, [trk_00], ftime.c, headXform);
    //   console.log(results.faceBlendshapes);
    // });

    function newFacemeshUpdate (resultsIn)
    {

      _update_mesh(mesh, resultsIn, [trk_00], ftime.c, headXform);
    }

    // faceLandmarker.onResults(results => {
    //   console.log("faceLandmarker.onResults");
    // });

    // start chopping
    facecamera.start().then(() => {
        ftime.s = Date.now();
        ftime.c = ftime.s;
    });

    scene.onReadyObservable.addOnce(() => {
      addSceneInputKeys(scene);
    });

    scene.onBeforeRenderObservable.add(() => {
      ftime.c += engine.getDeltaTime();

      if (querySceneInputKey('a', true)) {
        scene.activeCamera.position.y += 1.25;
      }
      if (querySceneInputKey('d', true)) {
        scene.activeCamera.position.y -= 1.25;
      }
      if (querySceneInputKey('s', true)) {
        scene.activeCamera.position.z += 5;
      }
      if (querySceneInputKey('w', true)) {
        scene.activeCamera.position.z -= 5;
      }

      

    });

    scene.onDisposeObservable.addOnce(() => {
      facecamera.stop();
      facemesh.close();
    });

    scene.getEngine().onResizeObservable.add(function() {
        // _update_view_scaling(canvas, background, webcam);
    });
}

function UpdateMorphTargetByName(morphTargetManager, targetName, influence)
{
    var target = null;

    for (let i = 0; i < morphTargetManager.numTargets; i++) 
    {
        target = morphTargetManager.getTarget(i);

        if(target.name == targetName){
            break;
        }
    }

    target.influence = influence;
}

var animRotC = 0.0;
var animRotB = 0.0;
var animRotT = 0.0;
var animRotN = 0.0;
var animRot = 0.0;

var c,b,t,n;

let avgPos;
let avgPosInit = false;
let idAvg = 0;

let startPos = new BABYLON.Vector3(0.0,-1500.0,0.0);
let valPos0 = 0.0;
let valPos1 = 0.0;

let avgRotX,avgRotY,avgRotZ;
let nAvgRot = 0;
let avgRotInit = false;

const _update_mesh = function (
  mesh,
  results,
  tracks = [],
  ftime = 0,
  xform = null
) {
  // const verts = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
  // if (!verts) return;

  // const normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
  // if (!normals) return;

  // // const landmarks = results.multiFaceLandmarks[0];
  // const landmarks = results.faceLandmarks[0];
  // if (!landmarks) return;

  // const scene = mesh.getScene();
  // if (!scene) return;

  // let idx = 0;
  // let minx = Number.MAX_SAFE_INTEGER;
  // let maxx = Number.MIN_SAFE_INTEGER;
  // let miny = Number.MAX_SAFE_INTEGER;
  // let maxy = Number.MIN_SAFE_INTEGER;
  // let minz = Number.MAX_SAFE_INTEGER;
  // let maxz = Number.MIN_SAFE_INTEGER;

  // // console.log(landmarks[0]);
  // let avgX = 0.0; let avgY = 0.0; let avgZ = 0.0;
  // for (let i = 0; i < landmarks.length; i++) {
  //   // let x = (landmarks[i].x - 0.5) * 10;
  //   let x = ((1.0-landmarks[i].x) - 0.5) * 10;
  //   let y = -(landmarks[i].y - 0.5) * 10;
  //   // let z = ((1.0-landmarks[i].z) - 0.5) * 10;
  //   let z = (landmarks[i].z - 0.5) * 10;

  //   verts[idx++] = x;
  //   verts[idx++] = y;
  //   verts[idx++] = z;

  //   if (tracks.map(t => t.faceidx).includes(i)) {
  //     const track = tracks.find(t => t.faceidx === i);

  //     if (track?.trkobj) {
  //       const fx = track.filters[0].filter(x, (1 / track.freq) * ftime);
  //       const fy = track.filters[1].filter(y, (1 / track.freq) * ftime);
  //       const fz = track.filters[2].filter(z, (1 / track.freq) * ftime);
  //       track.trkobj?.setAbsolutePosition(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(fx, fy, fz), mesh._worldMatrix));



  //       // const c = BABYLON.Vector3.Forward();
  //       // console.log (c);
  //       //const c = scene.activeCamera?.getForwardRay().direction;// || BABYLON.Vector3.Forward();
  //       // const c = scene.activeCamera?.getForwardRay().direction || BABYLON.Vector3.Forward();
  //       // const t = new BABYLON.Vector3(-normals[track.faceidx + 1], normals[track.faceidx + 2], -normals[track.faceidx]);
  //       // const b = t.cross(c);
  //       // const n = b.cross(t).scale(-1);
  //       c = scene.activeCamera?.getForwardRay().direction || BABYLON.Vector3.Forward();
  //       t = new BABYLON.Vector3(-normals[track.faceidx + 1], normals[track.faceidx + 2], -normals[track.faceidx]);
  //       b = t.cross(c);
  //       n = b.cross(t).scale(-1);
  //       track.trkobj.rotation = BABYLON.Vector3.RotationFromAxis(b, t, n);
  //       //animRot = t;
  //     }
  //   }

  //   if (x < minx) minx = x;
  //   if (x > maxx) maxx = x;
  //   if (y < miny) miny = y;
  //   if (y > maxy) maxy = y;
  //   if (z < minz) minz = z;
  //   if (z > maxz) maxz = z;

  //   avgX += x;
  //   avgY += y;
  //   avgZ += z;
  // }

  // avgX /= landmarks.length;
  // avgY /= landmarks.length;
  // avgZ /= landmarks.length;

  // let xcenter = minx + (maxx - minx) / 2;
  // let ycenter = miny + (maxy - miny) / 2;
  // let zcenter = minz + (maxz - minz) / 2;

  // mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, verts);
  // xform.setAbsolutePosition(new BABYLON.Vector3(xcenter, ycenter, zcenter).scale(10));


	
 if(ikController != undefined && ikPole != undefined )
  {
   // ikController.position = new BABYLON.Vector3(avgX/5.0,(avgY/5.0)+2,0);
 // ikPole.position = new BABYLON.Vector3((avgX/5.0)+1,(avgY/5.0)+2,0);
  }
  // ikController.setAbsolutePosition( new BABYLON.Vector3(xcenter, ycenter, zcenter).scale(10));
  // ikPole.setAbsolutePosition( new BABYLON.Vector3(xcenter *20, ycenter*10, zcenter*10));
  // ikController.position = new BABYLON.Vector3(xcenter/10, ycenter, zcenter/10);
  // ikPole.position = new BABYLON.Vector3((xcenter+2)/10, ycenter, zcenter/10);
animRot += 0.1;
  if(skeleton != undefined && ikController != undefined && ikPole != undefined)
  {
    var mat = skeleton.bones[10].getLocalMatrix();
    

    var values = skeleton.bones[10].getLocalMatrix().toArray();

    // var vPb = new BABYLON.Vector3(values[12],values[13],values[14]);

    // var vXb = new BABYLON.Vector3(values[0],values[1],values[2]);
    // var vYb = new BABYLON.Vector3(values[4],values[5],values[6]);
    // var vZb = new BABYLON.Vector3(values[8],values[9],values[10]);
    for (var i = 0;i<16;i++)
    {
      values[i] = results.facialTransformationMatrixes[0].data[i];

    }
    var vP = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[12],results.facialTransformationMatrixes[0].data[13],results.facialTransformationMatrixes[0].data[14]);
    var vX = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[0],results.facialTransformationMatrixes[0].data[1],results.facialTransformationMatrixes[0].data[2]);
    var vY = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[4],results.facialTransformationMatrixes[0].data[5],results.facialTransformationMatrixes[0].data[6]);
    var vZ = new BABYLON.Vector3(results.facialTransformationMatrixes[0].data[8],results.facialTransformationMatrixes[0].data[9],results.facialTransformationMatrixes[0].data[10]);

    // axes00.update(vP, vX,vY,vZ); //all parameters are Vector3s

   

    // console.log(vX);
    // console.log(vY);
    // console.log(vZ);


      values[0] = results.facialTransformationMatrixes[0].data[10];
    values[1] = results.facialTransformationMatrixes[0].data[9];
    values[2] = -results.facialTransformationMatrixes[0].data[8];

    //  values[3] = results.facialTransformationMatrixes[0].data[11];

    values[4] = results.facialTransformationMatrixes[0].data[6];
    values[5] = results.facialTransformationMatrixes[0].data[5];
    values[6] = -results.facialTransformationMatrixes[0].data[4];

  //  values[7] = results.facialTransformationMatrixes[0].data[7];

    values[8] = -results.facialTransformationMatrixes[0].data[2];
    values[9] = -results.facialTransformationMatrixes[0].data[1];
    values[10] = results.facialTransformationMatrixes[0].data[0];

    //  values[11] = results.facialTransformationMatrixes[0].data[3];

    // skeleton.bones[6].updateMatrix(new BABYLON.Matrix.FromArray(values));

    var rot = BABYLON.Vector3.RotationFromAxis(vX, vY, vZ);
    // console.log(rot);
    // let rayToCam =  skeleton.bones[10].getTransformNode().position.substract(camera.position);
    // console.log("cam position : ",camera.position);
    // console.log("bone position : ",skeleton.bones[10].getTransformNode().position);
    
    let testPos = new BABYLON.Vector3(values[12] *20.0, 350, values[14]+20);

    let rayToCam = new BABYLON.Vector3(testPos.x,testPos.y, testPos.z - 45.0);

    // console.log(rayToCam);
    rayToCam.normalize();
let rVal = (Math.asin(rayToCam.x))/2.0;
    console.log(rVal);
    var rotInv = new BABYLON.Vector3(-rot.z,rVal,-rot.x);

    let nRot = 5;
    if ( !avgRotInit)
    {
      avgRotX = Array(nRot).fill(rotInv.x);
      avgRotY = Array(nRot).fill(rotInv.y);
      avgRotZ = Array(nRot).fill(rotInv.z);
      skeleton.bones[10].getTransformNode().rotation = rotInv;
      avgRotInit = true;
    }else{
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
      skeleton.bones[10].getTransformNode().rotation = new BABYLON.Vector3(rotX,rotY,rotZ);
      nAvgRot += 1;
      if (nAvgRot >= nRot){nAvgRot = 0;}
    }
    // skeleton.bones[10].getTransformNode().rotation = rotInv;

    // console.log(vXb);
    // console.log(vYb);
    // console.log(vZb);

    // values = skeleton.bones[6].getWorldMatrix().toArray();

    var vPb = new BABYLON.Vector3(values[12],values[13],values[14]);

    var vXb = new BABYLON.Vector3(values[0],values[1],values[2]);
    var vYb = new BABYLON.Vector3(values[4],values[5],values[6]);
    var vZb = new BABYLON.Vector3(values[8],values[9],values[10]);
    // axes01.update(vPb, vXb,vYb,vZb);//all parameters are Vector3s

    // ikController.position = new BABYLON.Vector3(-vPb.x *20.0,vPb.y*30.0+200,vPb.z+20);
    // ikPole.position = new BABYLON.Vector3(-vPb.x*20.0+1000.0,vPb.y*30.0+200,vPb.z+20);
    let curPos = new BABYLON.Vector3(-vPb.x *20.0, 350, vPb.z+20);
    // let l = 3;
    // if(!avgPosInit)
    // {
    //   let v3Tf = new BABYLON.Vector3(-vPb.x *20.0, 350, vPb.z+20);
    //   avgPos = Array(30).fill(v3Tf);
    //   curPos = new BABYLON.Vector3(-vPb.x *20.0, 350, vPb.z+20);
    //   avgPosInit = true;
    // }else{
    //   avgPos[idAvg] = new BABYLON.Vector3(-vPb.x *20.0, 350, vPb.z+20);
    //   curPos = new BABYLON.Vector3(0.0,0.0,0.0);
    //   for ( let i = 0;i<30;i++){
    //     curPos.x +=  avgPos[i].x / 30.0;
    //     curPos.y +=  avgPos[i].y / 30.0;
    //     curPos.z +=  avgPos[i].z / 30.0;
    //   }
    //   idAvg += 1;
    //   if(idAvg >= 30 ){idAvg = 0;}
    // }
    // if(!avgPosInit){
    ikController.position = curPos;
    ikPole.position = new BABYLON.Vector3(curPos.x+1000.0, curPos.y, curPos.z);
  //   avgPosInit = true;
  // }
    

    // ikController.position = new BABYLON.Vector3(-vPb.x *20.0, 350, vPb.z+20);
    // ikPole.position = new BABYLON.Vector3(-vPb.x*20.0+1000.0, 350, vPb.z+20);
    // console.log(vPb);
    bim.position = vPb;

    valPos0 += 0.005;
    valPos1 += 0.005;
    valPos0 = valPos0 % 1.0;
    valPos1 = valPos1 % 2.0;
     let valLerp0 = (Math.cos(valPos0*Math.PI*2.0));
     let valLerp1 = (Math.cos(valPos1*Math.PI));
    // let valLerp = (valPos-0.5)*2.0;
    wormMesh.position = new BABYLON.Vector3(startPos.x +(50*valLerp0),startPos.y+(50*valLerp1),startPos.z+vPb.z);

    ikCtl.update();
    // ikController.position =  new BABYLON.Vector3(-vPb.x ,vPb.y+15,-vPb.z+1);
    // ikPole.position = new BABYLON.Vector3(-vPb.x+1.0,vPb.y+15,-vPb.z+1);

    // values[0] = results.facialTransformationMatrixes[0].data[8];
    // values[1] = results.facialTransformationMatrixes[0].data[9];
    // values[2] = results.facialTransformationMatrixes[0].data[10];
    // // values[3] = results.facialTransformationMatrixes[0].data[7];

    // values[4] = results.facialTransformationMatrixes[0].data[4];
    // values[5] = results.facialTransformationMatrixes[0].data[5];
    // values[6] = results.facialTransformationMatrixes[0].data[6];
    // // values[7] = results.facialTransformationMatrixes[0].data[11];

    // values[8] = results.facialTransformationMatrixes[0].data[0];
    // values[9] = results.facialTransformationMatrixes[0].data[1];
    // values[10] = results.facialTransformationMatrixes[0].data[2];
    // // values[11] = results.facialTransformationMatrixes[0].data[3];

     
    // let matrix = new BABYLON.Matrix.FromArray(results.facialTransformationMatrixes[0].data);
    // console.log(matrix.toArray());
    // faceGroup.matrixAutoUpdate = false
    // faceGroup.matrix.copy(faceMatrix)
   // skeleton.bones[6].updateMatrix(matrix);
// console.log(results.facialTransformationMatrixes[0]);

    //console.log(v3);
   // mat = mat.multiply(BABYLON.Matrix.RotationX((v3.x/3.14)*180.0));
    //skeleton.bones[6].updateMatrix(mat);
  }
  //skeleton.bones[5].RotationFromAxis(0.0,0.0,animRot);

  // ikController.setAbsolutePosition( new BABYLON.Vector3(xcenter, ycenter, zcenter).scale(10));
  // ikPole.setAbsolutePosition( new BABYLON.Vector3(xcenter *20, ycenter*10, zcenter*10));
  // ikController.position = new BABYLON.Vector3(xcenter/10, ycenter, zcenter/10);
  // ikPole.position = new BABYLON.Vector3((xcenter+2)/10, ycenter, zcenter/10);
};

const _update_view_scaling = function (scene, layer, vtexture) {
  const canvas = scene.getEngine().getRenderingCanvas();
  const canvasAspectRatio = canvas.width / canvas.height;
  const videoAspectRatio = vtexture.video.videoWidth / vtexture.video.videoHeight;

  if (canvasAspectRatio > videoAspectRatio) {
    const _scale_y = canvasAspectRatio / videoAspectRatio;

    layer.scale.x = 1;
    layer.scale.y = _scale_y;

     vtexture.uScale = -1;
    // vtexture.uScale = 1;
    vtexture.vScale = 1 / _scale_y;
    vtexture.uOffset = 0;
    vtexture.vOffset = (1 - vtexture.vScale) * 0.5;
  } else {
    const _scale_x = videoAspectRatio / canvasAspectRatio;

    layer.scale.x = _scale_x;
    layer.scale.y = 1;

    vtexture.uScale = -(1 / _scale_x);
    vtexture.vScale = 1;
    vtexture.uOffset = (1 - vtexture.uScale) * 0.5;
    vtexture.vOffset = 0;
  }
};

const inputKeys = {};

const addSceneInputKeys = function (scene) {
  scene.onKeyboardObservable.add(e => {
    switch (e.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        if (inputKeys[e.event.key.toLocaleLowerCase()]) {
          return;
        }
        inputKeys[e.event.key.toLocaleLowerCase()] = [Date.now(), false];
        break;
      case BABYLON.KeyboardEventTypes.KEYUP:
        delete inputKeys[e.event.key.toLowerCase()];
        break;
    }
  });
};

const querySceneInputKey = function (key, set = false) {
  if (inputKeys[key.toLocaleLowerCase()] && inputKeys[key.toLocaleLowerCase()][1] !== true) {
    if (set) {
      inputKeys[key.toLocaleLowerCase()][1] = true;
    }
    return true;
  }
  return false;
};

// https://github.com/dli7319/one-euro-filter-js/blob/master/src/OneEuroFilter.js
class LowPassFilter {
  setAlpha(alpha) {
    if (alpha<=0.0 || alpha>1.0)
      console.log("alpha should be in (0.0., 1.0]");
    this.a = alpha;
  }

  constructor(alpha, initval=0.0) {
    this.y = this.s = initval;
    this.setAlpha(alpha);
    this.initialized = false;
  }

  filter(value) {
    var result;
    if (this.initialized)
      result = this.a*value + (1.0-this.a) * this.s;
    else {
      result = value;
      this.initialized = true;
    }
    this.y = value;
    this.s = result;
    return result;
  }

  filterWithAlpha(value, alpha) {
    this.setAlpha(alpha);
    return this.filter(value);
  }

  hasLastRawValue() {
    return this.initialized;
  }

  lastRawValue() {
    return this.y;
  }

  reset() {
    this.initialized = false;
  }

}

class OneEuroFilter {
  alpha(cutoff) {
    var te = 1.0 / this.freq;
    var tau = 1.0 / (2 * Math.PI * cutoff);
    return 1.0 / (1.0 + tau/te);
  }

  setFrequency(f) {
    if (f<=0) console.log("freq should be >0") ;
    this.freq = f;
  }

  setMinCutoff(mc) {
    if (mc<=0) console.log("mincutoff should be >0");
    this.mincutoff = mc;
  }

  setBeta(b) {
    this.beta_ = b;
  }

  setDerivateCutoff(dc) {
    if (dc<=0) console.log("dcutoff should be >0") ;
    this.dcutoff = dc ;
  }

  constructor(freq, mincutoff=1.0, beta_=0.0, dcutoff=1.0) {
    this.setFrequency(freq) ;
    this.setMinCutoff(mincutoff) ;
    this.setBeta(beta_) ;
    this.setDerivateCutoff(dcutoff) ;
    this.x = new LowPassFilter(this.alpha(mincutoff)) ;
    this.dx = new LowPassFilter(this.alpha(dcutoff)) ;
    this.lasttime = undefined ;
  }

  reset() {
    this.x.reset();
    this.dx.reset();
    this.lasttime = undefined;
  }

  filter(value, timestamp=undefined) {
    // update the sampling frequency based on timestamps
    if (this.lasttime!=undefined && timestamp!=undefined)
      this.freq = 1.0 / (timestamp-this.lasttime) ;
    this.lasttime = timestamp ;
    // estimate the current variation per second
    var dvalue = this.x.hasLastRawValue() ? (value - this.x.lastRawValue())*this.freq : 0.0 ;
    var edvalue = this.dx.filterWithAlpha(dvalue, this.alpha(this.dcutoff)) ;
    // use it to update the cutoff frequency
    var cutoff = this.mincutoff + this.beta_ * Math.abs(edvalue) ;
    // filter the given value
    return this.x.filterWithAlpha(value, this.alpha(cutoff)) ;
  }
}

const sceneToRender = createScene();
engine.runRenderLoop(function(){
    sceneToRender.render();
});

let  ikCtl;
let controlMeshes; // for drag assignments
function addIK(scene) {
	ikPole = BABYLON.MeshBuilder.CreateSphere('', {diameter: 10.05}, scene);
	ikPole.position = new BABYLON.Vector3(100, 1, 0);
	// ikPole.parent = wormMesh;
  ikPole.addBehavior(new BABYLON.PointerDragBehavior());
  ikPole.isVisible = false;
	ikController = BABYLON.MeshBuilder.CreateBox('', { size: 10.1 }, scene);
	ikController.position = new BABYLON.Vector3(0, 1, 0);
	// ikController.parent = wormMesh;
  ikController.addBehavior(new BABYLON.PointerDragBehavior());
  ikController.isVisible = false;
  // var bim = BABYLON.MeshBuilder.CreateBox('', { size: 0.1 }, scene);
	// bim.position = new BABYLON.Vector3(0, 1, 0);
	// bim.parent = wormMesh;
  // bim.addBehavior(new BABYLON.PointerDragBehavior());


  // ikPole.isVisible = false;
  // ikController.isVisible = false;
    controlMeshes = [ikController, ikPole];  

    const ikBone_R = skeleton.bones[8];

	// const 
  ikCtl = new BABYLON.BoneIKController(wormMesh, ikBone_R, {targetMesh: ikController, poleTargetMesh:ikPole, poleAngle: Math.PI/ 2});

    scene.registerBeforeRender( () => {
        // ikCtl.update();
        // skeleton.bones[6].RotationFromAxis(0.0,0.0,90.0);
    });
}

let skeletonViewer;
function toggleSkViewer(needed, scene) {
    if (needed) {
        if (!skeletonViewer) {
            skeletonViewer = new BABYLON.Debug.SkeletonViewer(skeleton, wormMesh, scene);
            skeletonViewer.displayMode = BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERE_AND_SPURS;
            skeletonViewer.update();
            skeletonViewer.color = BABYLON.Color3.Green();
        }
    }
    if (skeletonViewer) skeletonViewer.isEnabled = needed; // Enable it
}



// https://github.com/google/mediapipe/tree/master/mediapipe/modules/face_geometry/data
const _canonical_face_model = {
  "face_positions": [
    0, -3.4064, 5.97951, 0, -1.12687, 7.4756, 0, -2.08902, 6.05827, -0.463928, 0.955357, 6.63358, 0, -0.46317, 7.58658,
    0, 0.365669, 7.24287, 0, 2.47325, 5.78863, -4.25308, 2.57765, 3.2797, 0, 4.01904, 5.28476, 0, 4.88598, 5.38526, 0,
    8.26178, 4.48153, 0, -3.70681, 5.86492, 0, -3.9183, 5.56943, 0, -3.99444, 5.21948, 0, -4.5424, 5.40475, 0, -4.74558,
    5.52946, 0, -5.01957, 5.60145, 0, -5.36512, 5.53544, 0, -6.14962, 5.07137, 0, -1.5011, 7.1122, -0.416106, -1.46645,
    6.44766, -7.08796, 5.4348, 0.09962, -2.62864, 2.0359, 3.84812, -3.19836, 1.98582, 3.79695, -3.77515, 2.0394,
    3.64619, -4.46582, 2.42295, 3.15517, -2.16429, 2.18987, 3.85182, -3.20823, 3.22393, 4.11582, -2.6738, 3.20534,
    4.0922, -3.74519, 3.16529, 3.97241, -4.16102, 3.05907, 3.71955, -5.06201, 1.93442, 2.77609, -2.26666, -7.42577,
    4.38981, -4.44586, 2.66399, 3.17342, -7.21453, 2.26301, 0.07315, -5.79979, 2.34955, 2.20406, -2.84494, -0.720868,
    4.43313, -0.711452, -3.32936, 5.87704, -0.606033, -3.92456, 5.44492, -1.43161, -3.50095, 5.49619, -1.91491,
    -3.80315, 5.02893, -1.13104, -3.97394, 5.18965, -1.56355, -4.08276, 4.84226, -2.65011, -5.00365, 4.18848, -0.427049,
    -1.09413, 7.36053, -0.496396, -0.475659, 7.44036, -5.25331, 3.88158, 3.36316, -1.7187, 0.974609, 4.55836, -1.60863,
    -0.942516, 5.81419, -1.65127, -0.610868, 5.58132, -4.7655, -0.701554, 3.53463, -0.478306, 0.295766, 7.10101,
    -3.73496, 4.50823, 4.55045, -4.5886, 4.30204, 4.04848, -6.27933, 6.61543, 1.42585, -1.22094, 4.14217, 5.10604,
    -2.19349, 3.10032, 4.00058, -3.10264, -4.35298, 4.0959, -6.71968, -4.78864, -1.7454, -1.19382, -1.3068, 5.73775,
    -0.729766, -1.59371, 5.83321, -2.45621, -4.34262, 4.28388, -2.20482, -4.30451, 4.1625, -4.98589, 4.80246, 3.75198,
    -1.59229, -1.25771, 5.45695, -2.64455, 4.52465, 4.92156, -2.76029, 5.10097, 5.01599, -3.52396, 8.00598, 3.72916,
    -5.59976, 5.71547, 2.72426, -3.06393, 6.56614, 4.52998, -5.72097, 4.25458, 2.83085, -6.37439, 4.78559, 1.59169,
    -0.672728, -3.68802, 5.7378, -1.26256, -3.78769, 5.41778, -1.73255, -3.95277, 5.00058, -1.04362, -1.46497, 5.66246,
    -2.32123, -4.32907, 4.25816, -2.05685, -4.47767, 4.52088, -2.15308, -4.27632, 4.03809, -0.946874, -1.03525, 6.51227,
    -1.46913, -4.03635, 4.60491, -1.02434, -3.98985, 4.92669, -0.533422, -3.99322, 5.1382, -0.76972, -6.09539, 4.98588,
    -0.699606, -5.29185, 5.4483, -0.669687, -4.94977, 5.50961, -0.630947, -4.6951, 5.44937, -0.583218, -4.51798,
    5.33987, -1.53717, -4.42321, 4.74547, -1.6156, -4.47594, 4.81363, -1.72905, -4.61868, 4.85446, -1.83862, -4.82875,
    4.82374, -2.36825, -3.10624, 4.8681, -7.54224, -1.04928, -2.43132, 0, -1.724, 6.60139, -1.82661, -4.39953, 4.39902,
    -1.92956, -4.41183, 4.49705, -0.597442, -2.01369, 5.86646, -1.40563, -1.7142, 5.24109, -0.662449, -1.81932, 5.86376,
    -2.34234, 0.572222, 4.2943, -3.32732, 0.104863, 4.11386, -1.72617, -0.919165, 5.27336, -5.1332, 7.4856, 2.66044,
    -4.53864, 6.31991, 3.68342, -3.98656, 5.10949, 4.46631, -2.16968, -5.44043, 4.45587, -1.39563, 5.01196, 5.31603,
    -1.6195, 6.59922, 4.92111, -1.8914, 8.23638, 4.275, -4.19583, 2.2352, 3.3751, -5.73334, 1.41174, 2.43173, -1.85989,
    2.35576, 3.84318, -4.98861, 3.07465, 3.08386, -1.30326, 1.41645, 4.83109, -1.30576, -0.672779, 6.41596, -6.46517,
    0.937119, 1.68987, -5.25866, 0.945811, 2.97431, -4.43234, 0.722096, 3.52261, -3.30068, 0.861641, 3.87278, -2.43018,
    1.13149, 4.03903, -1.82073, 1.46795, 4.22412, -0.563221, 2.30769, 5.56679, -6.33814, -0.529279, 1.88118, -5.5877,
    3.20807, 2.68784, -0.242624, -1.46286, 7.07149, -1.61125, 0.339326, 4.89542, -7.74309, 2.365, -2.00517, -1.39114,
    1.85105, 4.449, -1.78579, -0.978284, 4.85047, -4.67096, 2.66446, 3.08407, -1.33397, -0.283761, 6.09705, -7.2709,
    -2.89092, -2.25245, -1.85643, 2.58524, 3.7579, -0.923388, 0.073076, 6.67194, -5.00059, -6.13513, 1.89252, -5.08528,
    -7.17859, 0.714711, -7.15929, -0.81182, -0.072044, -5.84305, -5.24802, 0.924091, -6.84726, 3.66292, 0.724695,
    -2.41294, -8.25885, 4.11921, -0.179909, -1.68986, 6.5733, -2.10366, -0.163946, 4.56612, -6.40757, 2.23602, 1.56084,
    -3.67007, 2.36015, 3.63523, -3.17719, 2.29427, 3.7757, -2.19612, -4.59832, 4.47979, -6.23488, -1.94443, 1.66354,
    -1.29292, -9.29592, 4.09406, -3.21065, -8.53328, 2.802, -4.06893, -7.99311, 1.92512, 0, 6.54539, 5.02731, 0,
    -9.40338, 4.26449, -2.72403, 2.3158, 3.77715, -2.28846, 2.39889, 3.6976, -1.99831, 2.49655, 3.68915, -6.13004,
    3.39926, 2.03852, -2.28846, 2.8865, 3.77503, -2.72403, 2.96181, 3.87177, -3.17719, 2.96414, 3.87697, -3.67007,
    2.92771, 3.72432, -4.01839, 2.85736, 3.48298, -7.55581, 4.10681, -0.991917, -4.01839, 2.4837, 3.4409, 0, -2.52194,
    5.93226, -1.77622, -2.68395, 5.21312, -1.22224, -1.18244, 5.95247, -0.731493, -2.53668, 5.81534, 0, 3.27103,
    5.23601, -4.13527, -6.99664, 2.67197, -3.31181, -7.66081, 3.38296, -1.3137, -8.63999, 4.70246, -5.94052, -6.22363,
    -0.631468, -1.99831, 2.74384, 3.74403, -0.901447, 1.23699, 5.75426, 0, -8.76524, 4.89144, -2.30898, -8.9742,
    3.60907, -6.95415, -2.43984, -0.131163, -1.09882, -4.45879, 5.12073, -1.18112, -4.58, 5.18956, -1.25582, -4.7879,
    5.23705, -1.32509, -5.10651, 5.20501, -1.54639, -5.81939, 4.75789, -1.95375, -4.18389, 4.43171, -2.1178, -4.13709,
    4.5551, -2.28534, -4.0512, 4.58244, -2.85016, -3.66572, 4.48499, -5.27854, -2.23894, 2.86122, -0.946709, 1.90763,
    5.19678, -1.31417, 3.10491, 4.2314, -1.78, 2.86, 3.88156, -1.84511, -4.09888, 4.24726, -5.43619, -4.03048, 2.10985,
    -0.766444, 3.18213, 4.86145, -1.93862, -6.61441, 4.52108, 0, 1.05941, 6.7746, -0.516573, 1.58357, 6.14836, 0,
    1.72837, 6.31675, -1.24681, 0.230297, 5.68104, 0, -7.94219, 5.18117, 0, -6.9915, 5.15348, -0.997827, -6.93092,
    4.97958, -3.28881, -5.38251, 3.79575, -2.31163, -1.56624, 4.59009, -2.68025, -6.11157, 4.09615, -3.83293, -1.53733,
    4.13773, -2.96186, -2.27421, 4.44094, -4.3869, -2.68329, 3.64389, -1.2173, -7.83447, 4.96929, -1.54237, -0.136843,
    5.20101, -3.87838, -6.04176, 3.31108, -3.08404, -6.80984, 3.81419, -3.74732, -4.50354, 3.72645, -6.09413, -3.20599,
    1.47348, -4.58899, -4.72873, 2.98322, -6.58323, -3.94127, 0.070268, -3.49258, -3.19582, 4.1302, -1.25554, 0.802341,
    5.30755, -1.12612, -0.933602, 6.53878, -1.44311, -1.14277, 5.90513, -0.923043, -0.529042, 7.00342, -1.75539,
    3.52912, 4.3277, -2.63259, 3.71383, 4.36463, -3.38806, 3.72198, 4.30903, -4.07577, 3.67541, 4.07606, -4.62291,
    3.47469, 3.64632, -5.17175, 2.53575, 2.67087, -7.29733, 0.763172, -0.048769, -4.70683, 1.651, 3.10953, -4.07171,
    1.47682, 3.47694, -3.26982, 1.47066, 3.73195, -2.52757, 1.61731, 3.86544, -1.97089, 1.85851, 3.96178, -1.57954,
    2.09794, 4.085, -7.66418, 0.673132, -2.43587, -1.39704, -1.34014, 5.63038, -0.884838, 0.65874, 6.23323, -0.767097,
    -0.968035, 7.07793, -0.460213, -1.33411, 6.78745, -0.748618, -1.06799, 6.7983, -1.23641, -1.58557, 5.48049,
    -0.387306, -1.40999, 6.95771, -0.319925, -1.60793, 6.50868, -1.63963, 2.5563, 3.86374, -1.25565, 2.46714, 4.2038,
    -1.03136, 2.38266, 4.61585, -4.25308, 2.7723, 3.3153, -4.53, 2.91, 3.33968, 0.463928, 0.955357, 6.63358, 4.25308,
    2.57765, 3.2797, 0.416106, -1.46645, 6.44766, 7.08796, 5.4348, 0.09962, 2.62864, 2.0359, 3.84812, 3.19836, 1.98582,
    3.79695, 3.77515, 2.0394, 3.64619, 4.46582, 2.42295, 3.15517, 2.16429, 2.18987, 3.85182, 3.20823, 3.22393, 4.11582,
    2.6738, 3.20534, 4.0922, 3.74519, 3.16529, 3.97241, 4.16102, 3.05907, 3.71955, 5.06201, 1.93442, 2.77609, 2.26666,
    -7.42577, 4.38981, 4.44586, 2.66399, 3.17342, 7.21453, 2.26301, 0.07315, 5.79979, 2.34955, 2.20406, 2.84494,
    -0.720868, 4.43313, 0.711452, -3.32936, 5.87704, 0.606033, -3.92456, 5.44492, 1.43161, -3.50095, 5.49619, 1.91491,
    -3.80315, 5.02893, 1.13104, -3.97394, 5.18965, 1.56355, -4.08276, 4.84226, 2.65011, -5.00365, 4.18848, 0.427049,
    -1.09413, 7.36053, 0.496396, -0.475659, 7.44036, 5.25331, 3.88158, 3.36316, 1.7187, 0.974609, 4.55836, 1.60863,
    -0.942516, 5.81419, 1.65127, -0.610868, 5.58132, 4.7655, -0.701554, 3.53463, 0.478306, 0.295766, 7.10101, 3.73496,
    4.50823, 4.55045, 4.5886, 4.30204, 4.04848, 6.27933, 6.61543, 1.42585, 1.22094, 4.14217, 5.10604, 2.19349, 3.10032,
    4.00058, 3.10264, -4.35298, 4.0959, 6.71968, -4.78864, -1.7454, 1.19382, -1.3068, 5.73775, 0.729766, -1.59371,
    5.83321, 2.45621, -4.34262, 4.28388, 2.20482, -4.30451, 4.1625, 4.98589, 4.80246, 3.75198, 1.59229, -1.25771,
    5.45695, 2.64455, 4.52465, 4.92156, 2.76029, 5.10097, 5.01599, 3.52396, 8.00598, 3.72916, 5.59976, 5.71547, 2.72426,
    3.06393, 6.56614, 4.52998, 5.72097, 4.25458, 2.83085, 6.37439, 4.78559, 1.59169, 0.672728, -3.68802, 5.7378,
    1.26256, -3.78769, 5.41778, 1.73255, -3.95277, 5.00058, 1.04362, -1.46497, 5.66246, 2.32123, -4.32907, 4.25816,
    2.05685, -4.47767, 4.52088, 2.15308, -4.27632, 4.03809, 0.946874, -1.03525, 6.51227, 1.46913, -4.03635, 4.60491,
    1.02434, -3.98985, 4.92669, 0.533422, -3.99322, 5.1382, 0.76972, -6.09539, 4.98588, 0.699606, -5.29185, 5.4483,
    0.669687, -4.94977, 5.50961, 0.630947, -4.6951, 5.44937, 0.583218, -4.51798, 5.33987, 1.53717, -4.42321, 4.74547,
    1.6156, -4.47594, 4.81363, 1.72905, -4.61868, 4.85446, 1.83862, -4.82875, 4.82374, 2.36825, -3.10624, 4.8681,
    7.54224, -1.04928, -2.43132, 1.82661, -4.39953, 4.39902, 1.92956, -4.41183, 4.49705, 0.597442, -2.01369, 5.86646,
    1.40563, -1.7142, 5.24109, 0.662449, -1.81932, 5.86376, 2.34234, 0.572222, 4.2943, 3.32732, 0.104863, 4.11386,
    1.72617, -0.919165, 5.27336, 5.1332, 7.4856, 2.66044, 4.53864, 6.31991, 3.68342, 3.98656, 5.10949, 4.46631, 2.16968,
    -5.44043, 4.45587, 1.39563, 5.01196, 5.31603, 1.6195, 6.59922, 4.92111, 1.8914, 8.23638, 4.275, 4.19583, 2.2352,
    3.3751, 5.73334, 1.41174, 2.43173, 1.85989, 2.35576, 3.84318, 4.98861, 3.07465, 3.08386, 1.30326, 1.41645, 4.83109,
    1.30576, -0.672779, 6.41596, 6.46517, 0.937119, 1.68987, 5.25866, 0.945811, 2.97431, 4.43234, 0.722096, 3.52261,
    3.30068, 0.861641, 3.87278, 2.43018, 1.13149, 4.03903, 1.82073, 1.46795, 4.22412, 0.563221, 2.30769, 5.56679,
    6.33814, -0.529279, 1.88118, 5.5877, 3.20807, 2.68784, 0.242624, -1.46286, 7.07149, 1.61125, 0.339326, 4.89542,
    7.74309, 2.365, -2.00517, 1.39114, 1.85105, 4.449, 1.78579, -0.978284, 4.85047, 4.67096, 2.66446, 3.08407, 1.33397,
    -0.283761, 6.09705, 7.2709, -2.89092, -2.25245, 1.85643, 2.58524, 3.7579, 0.923388, 0.073076, 6.67194, 5.00059,
    -6.13513, 1.89252, 5.08528, -7.17859, 0.714711, 7.15929, -0.81182, -0.072044, 5.84305, -5.24802, 0.924091, 6.84726,
    3.66292, 0.724695, 2.41294, -8.25885, 4.11921, 0.179909, -1.68986, 6.5733, 2.10366, -0.163946, 4.56612, 6.40757,
    2.23602, 1.56084, 3.67007, 2.36015, 3.63523, 3.17719, 2.29427, 3.7757, 2.19612, -4.59832, 4.47979, 6.23488,
    -1.94443, 1.66354, 1.29292, -9.29592, 4.09406, 3.21065, -8.53328, 2.802, 4.06893, -7.99311, 1.92512, 2.72403,
    2.3158, 3.77715, 2.28846, 2.39889, 3.6976, 1.99831, 2.49655, 3.68915, 6.13004, 3.39926, 2.03852, 2.28846, 2.8865,
    3.77503, 2.72403, 2.96181, 3.87177, 3.17719, 2.96414, 3.87697, 3.67007, 2.92771, 3.72432, 4.01839, 2.85736, 3.48298,
    7.55581, 4.10681, -0.991917, 4.01839, 2.4837, 3.4409, 1.77622, -2.68395, 5.21312, 1.22224, -1.18244, 5.95247,
    0.731493, -2.53668, 5.81534, 4.13527, -6.99664, 2.67197, 3.31181, -7.66081, 3.38296, 1.3137, -8.63999, 4.70246,
    5.94052, -6.22363, -0.631468, 1.99831, 2.74384, 3.74403, 0.901447, 1.23699, 5.75426, 2.30898, -8.9742, 3.60907,
    6.95415, -2.43984, -0.131163, 1.09882, -4.45879, 5.12073, 1.18112, -4.58, 5.18956, 1.25582, -4.7879, 5.23705,
    1.32509, -5.10651, 5.20501, 1.54639, -5.81939, 4.75789, 1.95375, -4.18389, 4.43171, 2.1178, -4.13709, 4.5551,
    2.28534, -4.0512, 4.58244, 2.85016, -3.66572, 4.48499, 5.27854, -2.23894, 2.86122, 0.946709, 1.90763, 5.19678,
    1.31417, 3.10491, 4.2314, 1.78, 2.86, 3.88156, 1.84511, -4.09888, 4.24726, 5.43619, -4.03048, 2.10985, 0.766444,
    3.18213, 4.86145, 1.93862, -6.61441, 4.52108, 0.516573, 1.58357, 6.14836, 1.24681, 0.230297, 5.68104, 0.997827,
    -6.93092, 4.97958, 3.28881, -5.38251, 3.79575, 2.31163, -1.56624, 4.59009, 2.68025, -6.11157, 4.09615, 3.83293,
    -1.53733, 4.13773, 2.96186, -2.27421, 4.44094, 4.3869, -2.68329, 3.64389, 1.2173, -7.83447, 4.96929, 1.54237,
    -0.136843, 5.20101, 3.87838, -6.04176, 3.31108, 3.08404, -6.80984, 3.81419, 3.74732, -4.50354, 3.72645, 6.09413,
    -3.20599, 1.47348, 4.58899, -4.72873, 2.98322, 6.58323, -3.94127, 0.070268, 3.49258, -3.19582, 4.1302, 1.25554,
    0.802341, 5.30755, 1.12612, -0.933602, 6.53878, 1.44311, -1.14277, 5.90513, 0.923043, -0.529042, 7.00342, 1.75539,
    3.52912, 4.3277, 2.63259, 3.71383, 4.36463, 3.38806, 3.72198, 4.30903, 4.07577, 3.67541, 4.07606, 4.62291, 3.47469,
    3.64632, 5.17175, 2.53575, 2.67087, 7.29733, 0.763172, -0.048769, 4.70683, 1.651, 3.10953, 4.07171, 1.47682,
    3.47694, 3.26982, 1.47066, 3.73195, 2.52757, 1.61731, 3.86544, 1.97089, 1.85851, 3.96178, 1.57954, 2.09794, 4.085,
    7.66418, 0.673132, -2.43587, 1.39704, -1.34014, 5.63038, 0.884838, 0.65874, 6.23323, 0.767097, -0.968035, 7.07793,
    0.460213, -1.33411, 6.78745, 0.748618, -1.06799, 6.7983, 1.23641, -1.58557, 5.48049, 0.387306, -1.40999, 6.95771,
    0.319925, -1.60793, 6.50868, 1.63963, 2.5563, 3.86374, 1.25565, 2.46714, 4.2038, 1.03136, 2.38266, 4.61585, 4.25308,
    2.7723, 3.3153, 4.53, 2.91, 3.33968
  ],
  "face_tris": [
    173, 155, 133, 246, 33, 7, 382, 398, 362, 263, 466, 249, 308, 415, 324, 78, 95, 191, 356, 389, 264, 127, 34, 162,
    368, 264, 389, 139, 162, 34, 267, 0, 302, 37, 72, 0, 11, 302, 0, 11, 0, 72, 349, 451, 350, 120, 121, 231, 452, 350,
    451, 232, 231, 121, 267, 302, 269, 37, 39, 72, 303, 269, 302, 73, 72, 39, 357, 343, 350, 128, 121, 114, 277, 350,
    343, 47, 114, 121, 350, 452, 357, 121, 128, 232, 453, 357, 452, 233, 232, 128, 299, 333, 297, 69, 67, 104, 332, 297,
    333, 103, 104, 67, 175, 152, 396, 175, 171, 152, 377, 396, 152, 148, 152, 171, 381, 384, 382, 154, 155, 157, 398,
    382, 384, 173, 157, 155, 280, 347, 330, 50, 101, 118, 348, 330, 347, 119, 118, 101, 269, 303, 270, 39, 40, 73, 304,
    270, 303, 74, 73, 40, 9, 336, 151, 9, 151, 107, 337, 151, 336, 108, 107, 151, 344, 278, 360, 115, 131, 48, 279, 360,
    278, 49, 48, 131, 262, 431, 418, 32, 194, 211, 424, 418, 431, 204, 211, 194, 304, 408, 270, 74, 40, 184, 409, 270,
    408, 185, 184, 40, 272, 310, 407, 42, 183, 80, 415, 407, 310, 191, 80, 183, 322, 270, 410, 92, 186, 40, 409, 410,
    270, 185, 40, 186, 347, 449, 348, 118, 119, 229, 450, 348, 449, 230, 229, 119, 434, 432, 430, 214, 210, 212, 422,
    430, 432, 202, 212, 210, 313, 314, 18, 83, 18, 84, 17, 18, 314, 17, 84, 18, 307, 375, 306, 77, 76, 146, 291, 306,
    375, 61, 146, 76, 259, 387, 260, 29, 30, 160, 388, 260, 387, 161, 160, 30, 286, 414, 384, 56, 157, 190, 398, 384,
    414, 173, 190, 157, 418, 424, 406, 194, 182, 204, 335, 406, 424, 106, 204, 182, 367, 416, 364, 138, 135, 192, 434,
    364, 416, 214, 192, 135, 391, 423, 327, 165, 98, 203, 358, 327, 423, 129, 203, 98, 298, 301, 284, 68, 54, 71, 251,
    284, 301, 21, 71, 54, 4, 275, 5, 4, 5, 45, 281, 5, 275, 51, 45, 5, 254, 373, 253, 24, 23, 144, 374, 253, 373, 145,
    144, 23, 320, 321, 307, 90, 77, 91, 375, 307, 321, 146, 91, 77, 280, 425, 411, 50, 187, 205, 427, 411, 425, 207,
    205, 187, 421, 313, 200, 201, 200, 83, 18, 200, 313, 18, 83, 200, 335, 321, 406, 106, 182, 91, 405, 406, 321, 181,
    91, 182, 405, 321, 404, 181, 180, 91, 320, 404, 321, 90, 91, 180, 17, 314, 16, 17, 16, 84, 315, 16, 314, 85, 84, 16,
    425, 266, 426, 205, 206, 36, 423, 426, 266, 203, 36, 206, 369, 396, 400, 140, 176, 171, 377, 400, 396, 148, 171,
    176, 391, 269, 322, 165, 92, 39, 270, 322, 269, 40, 39, 92, 417, 465, 413, 193, 189, 245, 464, 413, 465, 244, 245,
    189, 257, 258, 386, 27, 159, 28, 385, 386, 258, 158, 28, 159, 260, 388, 467, 30, 247, 161, 466, 467, 388, 246, 161,
    247, 248, 456, 419, 3, 196, 236, 399, 419, 456, 174, 236, 196, 333, 298, 332, 104, 103, 68, 284, 332, 298, 54, 68,
    103, 285, 8, 417, 55, 193, 8, 168, 417, 8, 168, 8, 193, 340, 261, 346, 111, 117, 31, 448, 346, 261, 228, 31, 117,
    285, 417, 441, 55, 221, 193, 413, 441, 417, 189, 193, 221, 327, 460, 326, 98, 97, 240, 328, 326, 460, 99, 240, 97,
    277, 355, 329, 47, 100, 126, 371, 329, 355, 142, 126, 100, 309, 392, 438, 79, 218, 166, 439, 438, 392, 219, 166,
    218, 381, 382, 256, 154, 26, 155, 341, 256, 382, 112, 155, 26, 360, 279, 420, 131, 198, 49, 429, 420, 279, 209, 49,
    198, 365, 364, 379, 136, 150, 135, 394, 379, 364, 169, 135, 150, 355, 277, 437, 126, 217, 47, 343, 437, 277, 114,
    47, 217, 443, 444, 282, 223, 52, 224, 283, 282, 444, 53, 224, 52, 281, 275, 363, 51, 134, 45, 440, 363, 275, 220,
    45, 134, 431, 262, 395, 211, 170, 32, 369, 395, 262, 140, 32, 170, 337, 299, 338, 108, 109, 69, 297, 338, 299, 67,
    69, 109, 335, 273, 321, 106, 91, 43, 375, 321, 273, 146, 43, 91, 348, 450, 349, 119, 120, 230, 451, 349, 450, 231,
    230, 120, 467, 359, 342, 247, 113, 130, 446, 342, 359, 226, 130, 113, 282, 283, 334, 52, 105, 53, 293, 334, 283, 63,
    53, 105, 250, 458, 462, 20, 242, 238, 461, 462, 458, 241, 238, 242, 276, 353, 300, 46, 70, 124, 383, 300, 353, 156,
    124, 70, 325, 292, 324, 96, 95, 62, 308, 324, 292, 78, 62, 95, 283, 276, 293, 53, 63, 46, 300, 293, 276, 70, 46, 63,
    447, 264, 345, 227, 116, 34, 372, 345, 264, 143, 34, 116, 352, 345, 346, 123, 117, 116, 340, 346, 345, 111, 116,
    117, 1, 19, 274, 1, 44, 19, 354, 274, 19, 125, 19, 44, 248, 281, 456, 3, 236, 51, 363, 456, 281, 134, 51, 236, 425,
    426, 427, 205, 207, 206, 436, 427, 426, 216, 206, 207, 380, 381, 252, 153, 22, 154, 256, 252, 381, 26, 154, 22, 391,
    393, 269, 165, 39, 167, 267, 269, 393, 37, 167, 39, 199, 428, 200, 199, 200, 208, 421, 200, 428, 201, 208, 200, 330,
    329, 266, 101, 36, 100, 371, 266, 329, 142, 100, 36, 422, 432, 273, 202, 43, 212, 287, 273, 432, 57, 212, 43, 290,
    250, 328, 60, 99, 20, 462, 328, 250, 242, 20, 99, 258, 286, 385, 28, 158, 56, 384, 385, 286, 157, 56, 158, 342, 446,
    353, 113, 124, 226, 265, 353, 446, 35, 226, 124, 257, 386, 259, 27, 29, 159, 387, 259, 386, 160, 159, 29, 430, 422,
    431, 210, 211, 202, 424, 431, 422, 204, 202, 211, 445, 342, 276, 225, 46, 113, 353, 276, 342, 124, 113, 46, 424,
    422, 335, 204, 106, 202, 273, 335, 422, 43, 202, 106, 306, 292, 307, 76, 77, 62, 325, 307, 292, 96, 62, 77, 366,
    447, 352, 137, 123, 227, 345, 352, 447, 116, 227, 123, 302, 268, 303, 72, 73, 38, 271, 303, 268, 41, 38, 73, 371,
    358, 266, 142, 36, 129, 423, 266, 358, 203, 129, 36, 327, 294, 460, 98, 240, 64, 455, 460, 294, 235, 64, 240, 294,
    331, 278, 64, 48, 102, 279, 278, 331, 49, 102, 48, 303, 271, 304, 73, 74, 41, 272, 304, 271, 42, 41, 74, 427, 436,
    434, 207, 214, 216, 432, 434, 436, 212, 216, 214, 304, 272, 408, 74, 184, 42, 407, 408, 272, 183, 42, 184, 394, 430,
    395, 169, 170, 210, 431, 395, 430, 211, 210, 170, 395, 369, 378, 170, 149, 140, 400, 378, 369, 176, 140, 149, 296,
    334, 299, 66, 69, 105, 333, 299, 334, 104, 105, 69, 417, 168, 351, 193, 122, 168, 6, 351, 168, 6, 168, 122, 280,
    411, 352, 50, 123, 187, 376, 352, 411, 147, 187, 123, 319, 320, 325, 89, 96, 90, 307, 325, 320, 77, 90, 96, 285,
    295, 336, 55, 107, 65, 296, 336, 295, 66, 65, 107, 404, 320, 403, 180, 179, 90, 319, 403, 320, 89, 90, 179, 330,
    348, 329, 101, 100, 119, 349, 329, 348, 120, 119, 100, 334, 293, 333, 105, 104, 63, 298, 333, 293, 68, 63, 104, 323,
    454, 366, 93, 137, 234, 447, 366, 454, 227, 234, 137, 16, 315, 15, 16, 15, 85, 316, 15, 315, 86, 85, 15, 429, 279,
    358, 209, 129, 49, 331, 358, 279, 102, 49, 129, 15, 316, 14, 15, 14, 86, 317, 14, 316, 87, 86, 14, 8, 285, 9, 8, 9,
    55, 336, 9, 285, 107, 55, 9, 329, 349, 277, 100, 47, 120, 350, 277, 349, 121, 120, 47, 252, 253, 380, 22, 153, 23,
    374, 380, 253, 145, 23, 153, 402, 403, 318, 178, 88, 179, 319, 318, 403, 89, 179, 88, 351, 6, 419, 122, 196, 6, 197,
    419, 6, 197, 6, 196, 324, 318, 325, 95, 96, 88, 319, 325, 318, 89, 88, 96, 397, 367, 365, 172, 136, 138, 364, 365,
    367, 135, 138, 136, 288, 435, 397, 58, 172, 215, 367, 397, 435, 138, 215, 172, 438, 439, 344, 218, 115, 219, 278,
    344, 439, 48, 219, 115, 271, 311, 272, 41, 42, 81, 310, 272, 311, 80, 81, 42, 5, 281, 195, 5, 195, 51, 248, 195,
    281, 3, 51, 195, 273, 287, 375, 43, 146, 57, 291, 375, 287, 61, 57, 146, 396, 428, 175, 171, 175, 208, 199, 175,
    428, 199, 208, 175, 268, 312, 271, 38, 41, 82, 311, 271, 312, 81, 82, 41, 444, 445, 283, 224, 53, 225, 276, 283,
    445, 46, 225, 53, 254, 339, 373, 24, 144, 110, 390, 373, 339, 163, 110, 144, 295, 282, 296, 65, 66, 52, 334, 296,
    282, 105, 52, 66, 346, 448, 347, 117, 118, 228, 449, 347, 448, 229, 228, 118, 454, 356, 447, 234, 227, 127, 264,
    447, 356, 34, 127, 227, 336, 296, 337, 107, 108, 66, 299, 337, 296, 69, 66, 108, 151, 337, 10, 151, 10, 108, 338,
    10, 337, 109, 108, 10, 278, 439, 294, 48, 64, 219, 455, 294, 439, 235, 219, 64, 407, 415, 292, 183, 62, 191, 308,
    292, 415, 78, 191, 62, 358, 371, 429, 129, 209, 142, 355, 429, 371, 126, 142, 209, 345, 372, 340, 116, 111, 143,
    265, 340, 372, 35, 143, 111, 388, 390, 466, 161, 246, 163, 249, 466, 390, 7, 163, 246, 352, 346, 280, 123, 50, 117,
    347, 280, 346, 118, 117, 50, 295, 442, 282, 65, 52, 222, 443, 282, 442, 223, 222, 52, 19, 94, 354, 19, 125, 94, 370,
    354, 94, 141, 94, 125, 295, 285, 442, 65, 222, 55, 441, 442, 285, 221, 55, 222, 419, 197, 248, 196, 3, 197, 195,
    248, 197, 195, 197, 3, 359, 263, 255, 130, 25, 33, 249, 255, 263, 7, 33, 25, 275, 274, 440, 45, 220, 44, 457, 440,
    274, 237, 44, 220, 300, 383, 301, 70, 71, 156, 368, 301, 383, 139, 156, 71, 417, 351, 465, 193, 245, 122, 412, 465,
    351, 188, 122, 245, 466, 263, 467, 246, 247, 33, 359, 467, 263, 130, 33, 247, 389, 251, 368, 162, 139, 21, 301, 368,
    251, 71, 21, 139, 374, 386, 380, 145, 153, 159, 385, 380, 386, 158, 159, 153, 379, 394, 378, 150, 149, 169, 395,
    378, 394, 170, 169, 149, 351, 419, 412, 122, 188, 196, 399, 412, 419, 174, 196, 188, 426, 322, 436, 206, 216, 92,
    410, 436, 322, 186, 92, 216, 387, 373, 388, 160, 161, 144, 390, 388, 373, 163, 144, 161, 393, 326, 164, 167, 164,
    97, 2, 164, 326, 2, 97, 164, 354, 370, 461, 125, 241, 141, 462, 461, 370, 242, 141, 241, 0, 267, 164, 0, 164, 37,
    393, 164, 267, 167, 37, 164, 11, 12, 302, 11, 72, 12, 268, 302, 12, 38, 12, 72, 386, 374, 387, 159, 160, 145, 373,
    387, 374, 144, 145, 160, 12, 13, 268, 12, 38, 13, 312, 268, 13, 82, 13, 38, 293, 300, 298, 63, 68, 70, 301, 298,
    300, 71, 70, 68, 340, 265, 261, 111, 31, 35, 446, 261, 265, 226, 35, 31, 380, 385, 381, 153, 154, 158, 384, 381,
    385, 157, 158, 154, 280, 330, 425, 50, 205, 101, 266, 425, 330, 36, 101, 205, 423, 391, 426, 203, 206, 165, 322,
    426, 391, 92, 165, 206, 429, 355, 420, 209, 198, 126, 437, 420, 355, 217, 126, 198, 391, 327, 393, 165, 167, 98,
    326, 393, 327, 97, 98, 167, 457, 438, 440, 237, 220, 218, 344, 440, 438, 115, 218, 220, 382, 362, 341, 155, 112,
    133, 463, 341, 362, 243, 133, 112, 457, 461, 459, 237, 239, 241, 458, 459, 461, 238, 241, 239, 434, 430, 364, 214,
    135, 210, 394, 364, 430, 169, 210, 135, 414, 463, 398, 190, 173, 243, 362, 398, 463, 133, 243, 173, 262, 428, 369,
    32, 140, 208, 396, 369, 428, 171, 208, 140, 457, 274, 461, 237, 241, 44, 354, 461, 274, 125, 44, 241, 316, 403, 317,
    86, 87, 179, 402, 317, 403, 178, 179, 87, 315, 404, 316, 85, 86, 180, 403, 316, 404, 179, 180, 86, 314, 405, 315,
    84, 85, 181, 404, 315, 405, 180, 181, 85, 313, 406, 314, 83, 84, 182, 405, 314, 406, 181, 182, 84, 418, 406, 421,
    194, 201, 182, 313, 421, 406, 83, 182, 201, 366, 401, 323, 137, 93, 177, 361, 323, 401, 132, 177, 93, 408, 407, 306,
    184, 76, 183, 292, 306, 407, 62, 183, 76, 408, 306, 409, 184, 185, 76, 291, 409, 306, 61, 76, 185, 410, 409, 287,
    186, 57, 185, 291, 287, 409, 61, 185, 57, 436, 410, 432, 216, 212, 186, 287, 432, 410, 57, 186, 212, 434, 416, 427,
    214, 207, 192, 411, 427, 416, 187, 192, 207, 264, 368, 372, 34, 143, 139, 383, 372, 368, 156, 139, 143, 457, 459,
    438, 237, 218, 239, 309, 438, 459, 79, 239, 218, 352, 376, 366, 123, 137, 147, 401, 366, 376, 177, 147, 137, 4, 1,
    275, 4, 45, 1, 274, 275, 1, 44, 1, 45, 428, 262, 421, 208, 201, 32, 418, 421, 262, 194, 32, 201, 327, 358, 294, 98,
    64, 129, 331, 294, 358, 102, 129, 64, 367, 435, 416, 138, 192, 215, 433, 416, 435, 213, 215, 192, 455, 439, 289,
    235, 59, 219, 392, 289, 439, 166, 219, 59, 328, 462, 326, 99, 97, 242, 370, 326, 462, 141, 242, 97, 326, 370, 2, 97,
    2, 141, 94, 2, 370, 94, 141, 2, 460, 455, 305, 240, 75, 235, 289, 305, 455, 59, 235, 75, 448, 339, 449, 228, 229,
    110, 254, 449, 339, 24, 110, 229, 261, 446, 255, 31, 25, 226, 359, 255, 446, 130, 226, 25, 449, 254, 450, 229, 230,
    24, 253, 450, 254, 23, 24, 230, 450, 253, 451, 230, 231, 23, 252, 451, 253, 22, 23, 231, 451, 252, 452, 231, 232,
    22, 256, 452, 252, 26, 22, 232, 256, 341, 452, 26, 232, 112, 453, 452, 341, 233, 112, 232, 413, 464, 414, 189, 190,
    244, 463, 414, 464, 243, 244, 190, 441, 413, 286, 221, 56, 189, 414, 286, 413, 190, 189, 56, 441, 286, 442, 221,
    222, 56, 258, 442, 286, 28, 56, 222, 442, 258, 443, 222, 223, 28, 257, 443, 258, 27, 28, 223, 444, 443, 259, 224,
    29, 223, 257, 259, 443, 27, 223, 29, 259, 260, 444, 29, 224, 30, 445, 444, 260, 225, 30, 224, 260, 467, 445, 30,
    225, 247, 342, 445, 467, 113, 247, 225, 250, 309, 458, 20, 238, 79, 459, 458, 309, 239, 79, 238, 290, 305, 392, 60,
    166, 75, 289, 392, 305, 59, 75, 166, 460, 305, 328, 240, 99, 75, 290, 328, 305, 60, 75, 99, 376, 433, 401, 147, 177,
    213, 435, 401, 433, 215, 213, 177, 250, 290, 309, 20, 79, 60, 392, 309, 290, 166, 60, 79, 411, 416, 376, 187, 147,
    192, 433, 376, 416, 213, 192, 147, 341, 463, 453, 112, 233, 243, 464, 453, 463, 244, 243, 233, 453, 464, 357, 233,
    128, 244, 465, 357, 464, 245, 244, 128, 412, 343, 465, 188, 245, 114, 357, 465, 343, 128, 114, 245, 437, 343, 399,
    217, 174, 114, 412, 399, 343, 188, 114, 174, 363, 440, 360, 134, 131, 220, 344, 360, 440, 115, 220, 131, 456, 420,
    399, 236, 174, 198, 437, 399, 420, 217, 198, 174, 456, 363, 420, 236, 198, 134, 360, 420, 363, 131, 134, 198, 361,
    401, 288, 132, 58, 177, 435, 288, 401, 215, 177, 58, 353, 265, 383, 124, 156, 35, 372, 383, 265, 143, 35, 156, 255,
    249, 339, 25, 110, 7, 390, 339, 249, 163, 7, 110, 261, 255, 448, 31, 228, 25, 339, 448, 255, 110, 25, 228, 14, 317,
    13, 14, 13, 87, 312, 13, 317, 82, 87, 13, 317, 402, 312, 87, 82, 178, 311, 312, 402, 81, 178, 82, 402, 318, 311,
    178, 81, 88, 310, 311, 318, 80, 88, 81, 318, 324, 310, 88, 80, 95, 415, 310, 324, 191, 95, 80
  ],
  "face_uvs": [
    0.499977, 0.347466, 0.500026, 0.452513, 0.499974, 0.397628, 0.482113, 0.528021, 0.500151, 0.472844, 0.49991,
    0.501747, 0.499523, 0.598938, 0.289712, 0.619236, 0.499955, 0.687602, 0.499987, 0.730081, 0.500023, 0.89295,
    0.500023, 0.333766, 0.500016, 0.320776, 0.500023, 0.307652, 0.499977, 0.304722, 0.499977, 0.294066, 0.499977,
    0.280615, 0.499977, 0.262981, 0.499968, 0.218629, 0.499816, 0.437019, 0.473773, 0.42609, 0.104907, 0.745859,
    0.36593, 0.590424, 0.338758, 0.586975, 0.31112, 0.59054, 0.274658, 0.610869, 0.393362, 0.596294, 0.345234, 0.655989,
    0.370094, 0.653924, 0.319322, 0.652735, 0.297903, 0.646409, 0.247792, 0.58919, 0.396889, 0.157245, 0.280098, 0.6244,
    0.10631, 0.600044, 0.209925, 0.608647, 0.355808, 0.465594, 0.471751, 0.349596, 0.474155, 0.319808, 0.439785,
    0.342771, 0.414617, 0.333459, 0.450374, 0.319139, 0.428771, 0.317309, 0.374971, 0.272195, 0.486717, 0.452371,
    0.485301, 0.472605, 0.257765, 0.68551, 0.401223, 0.544828, 0.429819, 0.451385, 0.421352, 0.466259, 0.276896,
    0.467943, 0.48337, 0.500413, 0.337212, 0.717117, 0.296392, 0.706757, 0.169295, 0.806186, 0.44758, 0.69739, 0.39239,
    0.646112, 0.35449, 0.303216, 0.067305, 0.269895, 0.442739, 0.427174, 0.457098, 0.415208, 0.381974, 0.305289,
    0.392389, 0.305797, 0.277076, 0.728068, 0.422552, 0.436767, 0.385919, 0.718636, 0.383103, 0.74416, 0.331431,
    0.880286, 0.229924, 0.767997, 0.364501, 0.810886, 0.229622, 0.700459, 0.173287, 0.721252, 0.472879, 0.333802,
    0.446828, 0.331473, 0.422762, 0.32611, 0.445308, 0.419934, 0.388103, 0.306039, 0.403039, 0.29346, 0.403629,
    0.306047, 0.460042, 0.442861, 0.431158, 0.307634, 0.452182, 0.307634, 0.475387, 0.307634, 0.465828, 0.22081,
    0.472329, 0.263774, 0.473087, 0.282143, 0.473122, 0.295374, 0.473033, 0.304722, 0.427942, 0.304722, 0.426479,
    0.29646, 0.423162, 0.288154, 0.418309, 0.279937, 0.390095, 0.360427, 0.013954, 0.439966, 0.499914, 0.419853, 0.4132,
    0.3046, 0.409626, 0.298177, 0.46808, 0.398465, 0.422729, 0.414015, 0.46308, 0.406216, 0.37212, 0.526586, 0.334562,
    0.503927, 0.411671, 0.453035, 0.242176, 0.852324, 0.290777, 0.798554, 0.327338, 0.743473, 0.39951, 0.251079,
    0.441728, 0.738324, 0.429765, 0.812166, 0.412198, 0.891099, 0.288955, 0.601048, 0.218937, 0.564589, 0.412782,
    0.60103, 0.257135, 0.64456, 0.427685, 0.562039, 0.44834, 0.463064, 0.17856, 0.542446, 0.247308, 0.542806, 0.286267,
    0.532325, 0.332828, 0.539288, 0.368756, 0.552793, 0.398964, 0.567345, 0.47641, 0.594194, 0.189241, 0.476076,
    0.228962, 0.651049, 0.490726, 0.437599, 0.40467, 0.514867, 0.019469, 0.598436, 0.426243, 0.579569, 0.396993,
    0.451203, 0.26647, 0.623023, 0.439121, 0.481042, 0.032314, 0.355643, 0.419054, 0.612845, 0.462783, 0.494253,
    0.238979, 0.220255, 0.198221, 0.168062, 0.10755, 0.459245, 0.18361, 0.259743, 0.13441, 0.666317, 0.385764, 0.116846,
    0.490967, 0.420622, 0.382385, 0.491427, 0.174399, 0.602329, 0.318785, 0.603765, 0.343364, 0.599403, 0.3961,
    0.289783, 0.187885, 0.411462, 0.430987, 0.055935, 0.318993, 0.101715, 0.266248, 0.130299, 0.500023, 0.809424,
    0.499977, 0.045547, 0.36617, 0.601178, 0.393207, 0.604463, 0.410373, 0.60892, 0.194993, 0.657898, 0.388665,
    0.637716, 0.365962, 0.644029, 0.343364, 0.644643, 0.318785, 0.64166, 0.301415, 0.636844, 0.058133, 0.680924,
    0.301415, 0.612551, 0.499988, 0.381566, 0.415838, 0.375804, 0.445682, 0.433923, 0.465844, 0.379359, 0.499923,
    0.648476, 0.288719, 0.180054, 0.335279, 0.14718, 0.440512, 0.097581, 0.128294, 0.208059, 0.408772, 0.626106,
    0.455607, 0.548199, 0.499877, 0.09101, 0.375437, 0.075808, 0.11421, 0.384978, 0.448662, 0.304722, 0.44802, 0.295368,
    0.447112, 0.284192, 0.444832, 0.269206, 0.430012, 0.233191, 0.406787, 0.314327, 0.400738, 0.318931, 0.3924,
    0.322297, 0.367856, 0.336081, 0.247923, 0.398667, 0.45277, 0.57915, 0.436392, 0.640113, 0.416164, 0.631286,
    0.413386, 0.307634, 0.228018, 0.316428, 0.468268, 0.647329, 0.411362, 0.195673, 0.499989, 0.530175, 0.479154,
    0.557346, 0.499974, 0.560363, 0.432112, 0.506411, 0.499886, 0.133083, 0.499913, 0.178271, 0.456549, 0.180799,
    0.344549, 0.254561, 0.378909, 0.42599, 0.374293, 0.219815, 0.319688, 0.429262, 0.357155, 0.39573, 0.295284,
    0.378419, 0.44775, 0.137523, 0.410986, 0.491277, 0.313951, 0.224692, 0.354128, 0.187447, 0.324548, 0.296007,
    0.189096, 0.3537, 0.279777, 0.285342, 0.133823, 0.317299, 0.336768, 0.355267, 0.429884, 0.533478, 0.455528,
    0.451377, 0.437114, 0.441104, 0.467288, 0.470075, 0.414712, 0.66478, 0.377046, 0.677222, 0.344108, 0.679849,
    0.312876, 0.677668, 0.283526, 0.66681, 0.241246, 0.617214, 0.102986, 0.531237, 0.267612, 0.57544, 0.297879,
    0.566824, 0.333434, 0.566122, 0.366427, 0.573884, 0.396012, 0.583304, 0.420121, 0.589772, 0.007561, 0.519223,
    0.432949, 0.430482, 0.458639, 0.520911, 0.473466, 0.454256, 0.476088, 0.43617, 0.468472, 0.444943, 0.433991,
    0.417638, 0.483518, 0.437016, 0.482483, 0.422151, 0.42645, 0.610201, 0.438999, 0.603505, 0.450067, 0.599566,
    0.289712, 0.631747, 0.27667, 0.636627, 0.517862, 0.528052, 0.710288, 0.619236, 0.526227, 0.42609, 0.895093,
    0.745859, 0.63407, 0.590424, 0.661242, 0.586975, 0.68888, 0.59054, 0.725342, 0.610869, 0.60663, 0.596295, 0.654766,
    0.655989, 0.629906, 0.653924, 0.680678, 0.652735, 0.702097, 0.646409, 0.752212, 0.589195, 0.602918, 0.157137,
    0.719902, 0.6244, 0.893693, 0.60004, 0.790082, 0.608646, 0.643998, 0.465512, 0.528249, 0.349596, 0.52585, 0.319809,
    0.560215, 0.342771, 0.585384, 0.333459, 0.549626, 0.319139, 0.571228, 0.317308, 0.624852, 0.271901, 0.51305,
    0.452718, 0.515097, 0.472748, 0.742247, 0.685493, 0.598631, 0.545021, 0.570338, 0.451425, 0.578632, 0.466377,
    0.723087, 0.467946, 0.516446, 0.500361, 0.662801, 0.717082, 0.703624, 0.706729, 0.830705, 0.806186, 0.552386,
    0.697432, 0.60761, 0.646112, 0.645429, 0.303293, 0.932695, 0.269895, 0.557261, 0.427174, 0.542902, 0.415208,
    0.618026, 0.305289, 0.607591, 0.305797, 0.722943, 0.728037, 0.577414, 0.436833, 0.614083, 0.718613, 0.616907,
    0.744114, 0.668509, 0.880086, 0.770092, 0.767979, 0.635536, 0.810751, 0.770391, 0.700444, 0.826722, 0.721245,
    0.527121, 0.333802, 0.553172, 0.331473, 0.577238, 0.32611, 0.554692, 0.419934, 0.611897, 0.306039, 0.596961,
    0.29346, 0.596371, 0.306047, 0.539958, 0.442861, 0.568842, 0.307634, 0.547818, 0.307634, 0.524613, 0.307634,
    0.53409, 0.220859, 0.527671, 0.263774, 0.526913, 0.282143, 0.526878, 0.295374, 0.526967, 0.304722, 0.572058,
    0.304722, 0.573521, 0.29646, 0.576838, 0.288154, 0.581691, 0.279937, 0.609945, 0.36009, 0.986046, 0.439966, 0.5868,
    0.3046, 0.590372, 0.298177, 0.531915, 0.398463, 0.577268, 0.414065, 0.536915, 0.406214, 0.627543, 0.526648,
    0.665586, 0.504049, 0.588354, 0.453138, 0.757824, 0.852324, 0.70925, 0.798492, 0.672684, 0.743419, 0.600409,
    0.250995, 0.558266, 0.738328, 0.570304, 0.812129, 0.588166, 0.890956, 0.711045, 0.601048, 0.78107, 0.564595,
    0.587247, 0.601068, 0.74287, 0.644554, 0.572156, 0.562348, 0.551868, 0.46343, 0.821442, 0.542444, 0.752702,
    0.542818, 0.713757, 0.532373, 0.667113, 0.539327, 0.631101, 0.552846, 0.600862, 0.567527, 0.523481, 0.594373,
    0.810748, 0.476074, 0.771046, 0.651041, 0.509127, 0.437282, 0.595293, 0.514976, 0.980531, 0.598436, 0.5735, 0.58,
    0.602995, 0.451312, 0.73353, 0.623023, 0.560611, 0.480983, 0.967686, 0.355643, 0.580985, 0.61284, 0.537728,
    0.494615, 0.760966, 0.220247, 0.801779, 0.168062, 0.892441, 0.459239, 0.816351, 0.25974, 0.865595, 0.666313,
    0.614074, 0.116754, 0.508953, 0.420562, 0.617942, 0.491684, 0.825608, 0.602325, 0.681215, 0.603765, 0.656636,
    0.599403, 0.6039, 0.289783, 0.812086, 0.411461, 0.568013, 0.055435, 0.681008, 0.101715, 0.733752, 0.130299, 0.63383,
    0.601178, 0.606793, 0.604463, 0.58966, 0.608938, 0.805016, 0.657892, 0.611335, 0.637716, 0.634038, 0.644029,
    0.656636, 0.644643, 0.681215, 0.64166, 0.698585, 0.636844, 0.941867, 0.680924, 0.698585, 0.612551, 0.584177,
    0.375893, 0.554318, 0.433923, 0.534154, 0.37936, 0.711218, 0.180025, 0.66463, 0.147129, 0.5591, 0.097368, 0.871706,
    0.208059, 0.591234, 0.626106, 0.544341, 0.548416, 0.624563, 0.075808, 0.88577, 0.384971, 0.551338, 0.304722,
    0.55198, 0.295368, 0.552888, 0.284192, 0.555168, 0.269206, 0.569944, 0.232965, 0.593203, 0.314324, 0.599262,
    0.318931, 0.6076, 0.322297, 0.631938, 0.3365, 0.752033, 0.398685, 0.547226, 0.579605, 0.563544, 0.640172, 0.583841,
    0.631286, 0.586614, 0.307634, 0.771915, 0.316422, 0.531597, 0.647517, 0.588371, 0.195559, 0.520797, 0.557435,
    0.567985, 0.506521, 0.543283, 0.180745, 0.655317, 0.254485, 0.621009, 0.425982, 0.62556, 0.219688, 0.680198,
    0.429281, 0.642764, 0.395662, 0.704663, 0.37847, 0.552012, 0.137408, 0.589072, 0.491363, 0.685945, 0.224643,
    0.645735, 0.18736, 0.675343, 0.296022, 0.810858, 0.353695, 0.720122, 0.285333, 0.866152, 0.317295, 0.663187,
    0.355403, 0.570082, 0.533674, 0.544562, 0.451624, 0.562759, 0.441215, 0.531987, 0.46986, 0.585271, 0.664823,
    0.622953, 0.677221, 0.655896, 0.679837, 0.687132, 0.677654, 0.716482, 0.666799, 0.758757, 0.617213, 0.897013,
    0.531231, 0.732392, 0.575453, 0.702114, 0.566837, 0.666525, 0.566134, 0.633505, 0.573912, 0.603876, 0.583413,
    0.579658, 0.590055, 0.99244, 0.519223, 0.567192, 0.43058, 0.541366, 0.521101, 0.526564, 0.453882, 0.523913, 0.43617,
    0.531529, 0.444943, 0.566036, 0.417671, 0.516311, 0.436946, 0.517472, 0.422123, 0.573595, 0.610193, 0.560698,
    0.604668, 0.549756, 0.600249, 0.710288, 0.631747, 0.72333, 0.636627
  ]
};
