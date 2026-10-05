import * as THREE from "three";

import {
  GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


// ========================================
// HTML
// ========================================

const container =
  document.getElementById(
    "vrCanvas"
  );


// ========================================
// SCENE
// ========================================

const scene =
  new THREE.Scene();


// ========================================
// CAMERA
// ========================================

const camera =
  new THREE.PerspectiveCamera(
    45,
    window.innerWidth /
      window.innerHeight,
    0.01,
    100
  );


camera.position.set(
  0,
  0,
  4.3
);


// ========================================
// RENDERER
//
// スマホではpixelRatioを抑えて
// 描画負荷を軽減
// ========================================

const renderer =
  new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference:
      "high-performance"
  });


function getPixelRatio() {

  const mobile =
    window.innerWidth <= 600;


  return Math.min(
    window.devicePixelRatio || 1,
    mobile ? 1.5 : 2
  );

}


renderer.setPixelRatio(
  getPixelRatio()
);


renderer.outputColorSpace =
  THREE.SRGBColorSpace;


renderer.setClearColor(
  0x000000,
  0
);


container.appendChild(
  renderer.domElement
);


// ========================================
// RESIZE RENDERER
// ========================================

function resizeRenderer() {

  const width =
    window.innerWidth;


  const height =
    window.innerHeight;


  camera.aspect =
    width / height;


  camera.updateProjectionMatrix();


  renderer.setPixelRatio(
    getPixelRatio()
  );


  renderer.setSize(
    width,
    height,
    false
  );

}


resizeRenderer();


// ========================================
// LIGHT
// ========================================

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    2.5
  );


scene.add(
  ambientLight
);


const mainLight =
  new THREE.DirectionalLight(
    0xffffff,
    4
  );


mainLight.position.set(
  4,
  5,
  5
);


scene.add(
  mainLight
);


const pinkLight =
  new THREE.DirectionalLight(
    0xffd4e8,
    2
  );


pinkLight.position.set(
  -4,
  2,
  3
);


scene.add(
  pinkLight
);


// ========================================
// LOADER
// ========================================

const loader =
  new GLTFLoader();


// ========================================
// VR GROUP
// ========================================

const vrGroup =
  new THREE.Group();


scene.add(
  vrGroup
);


// ========================================
// VARIABLES
// ========================================

let headsetPivot = null;

let leftHandPivot = null;

let rightHandPivot = null;


let headsetReady = false;

let handsReady = false;


let isEntering = false;

let enterCompleteSent = false;

let enterStartTime = 0;


// ========================================
// SETTINGS
// ========================================

const WEAR_ROTATION_Y =
  Math.PI;


const WEAR_POSITION_X =
  0;


const WEAR_POSITION_Y =
  0;


const WEAR_POSITION_Z =
  3.35;


const MIN_FINAL_SCALE =
  6.5;


// ========================================
// RESPONSIVE
// ========================================

function getResponsiveSettings() {

  const width =
    window.innerWidth;


  const height =
    window.innerHeight;


  const portrait =
    height > width;


  // Smartphone portrait

  if (
    width <= 600 &&
    portrait
  ) {

    return {
      scale: 0.58,
      y: -0.38
    };

  }


  // Smartphone landscape

  if (
    height <= 500 &&
    width <= 950
  ) {

    return {
      scale: 0.56,
      y: -0.28
    };

  }


  // Tablet

  if (width <= 1000) {

    return {
      scale: 0.69,
      y: -0.42
    };

  }


  // Short laptop

  if (height <= 760) {

    return {
      scale: 0.68,
      y: -0.42
    };

  }


  // Desktop

  if (width < 1500) {

    return {
      scale: 0.83,
      y: -0.50
    };

  }


  // Large desktop

  return {
    scale: 0.94,
    y: -0.55
  };

}


let responsiveSettings =
  getResponsiveSettings();


let normalScale =
  responsiveSettings.scale;


let normalY =
  responsiveSettings.y;


vrGroup.scale.setScalar(
  normalScale
);


vrGroup.position.set(
  0,
  normalY,
  0
);


// ========================================
// HELPER
// Center + scale model
// ========================================

function prepareModel(
  model,
  targetSize
) {

  const box =
    new THREE.Box3()
      .setFromObject(
        model
      );


  const size =
    new THREE.Vector3();


  box.getSize(
    size
  );


  const maxDimension =
    Math.max(
      size.x,
      size.y,
      size.z
    );


  if (
    maxDimension > 0
  ) {

    model.scale.setScalar(
      targetSize /
        maxDimension
    );

  }


  const centeredBox =
    new THREE.Box3()
      .setFromObject(
        model
      );


  const center =
    new THREE.Vector3();


  centeredBox.getCenter(
    center
  );


  model.position.set(
    -center.x,
    -center.y,
    -center.z
  );

}


// ========================================
// HEADSET
// ========================================

loader.load(

  "./assets/models/headset.glb",


  function (gltf) {

    const headset =
      gltf.scene;


    prepareModel(
      headset,
      2.2
    );


    headsetPivot =
      new THREE.Group();


    headsetPivot.add(
      headset
    );


    vrGroup.add(
      headsetPivot
    );


    headsetReady =
      true;

  },


  undefined,


  function (error) {

    console.error(
      "Headset load error:",
      error
    );

  }

);


// ========================================
// HAND
// ========================================

loader.load(

  "./assets/models/hand.glb",


  function (gltf) {

    const originalHand =
      gltf.scene;


    prepareModel(
      originalHand,
      1.6
    );


    const skinColor =
      new THREE.Color(
        "#eebfac"
      );


    // ========================================
    // LEFT
    // ========================================

    const leftHand =
      originalHand.clone(
        true
      );


    leftHand.traverse(
      function (child) {

        if (
          child.isMesh &&
          child.material
        ) {

          child.material =
            child.material.clone();


          child.material.color =
            skinColor;


          if (
            "roughness" in
            child.material
          ) {

            child.material.roughness =
              0.65;

          }

        }

      }
    );


    leftHandPivot =
      new THREE.Group();


    leftHandPivot.add(
      leftHand
    );


    leftHandPivot.position.set(
      -2.20,
      -0.31,
      0.48
    );


    leftHandPivot.rotation.set(
      -0.45,
      0.82,
      1.02
    );


    leftHandPivot.visible =
      false;


    vrGroup.add(
      leftHandPivot
    );


    // ========================================
    // RIGHT
    // ========================================

    const rightHand =
      originalHand.clone(
        true
      );


    rightHand.traverse(
      function (child) {

        if (
          child.isMesh &&
          child.material
        ) {

          child.material =
            child.material.clone();


          child.material.color =
            skinColor;


          if (
            "roughness" in
            child.material
          ) {

            child.material.roughness =
              0.65;

          }

        }

      }
    );


    rightHandPivot =
      new THREE.Group();


    rightHandPivot.add(
      rightHand
    );


    rightHandPivot.scale.x =
      -1;


    rightHandPivot.position.set(
      2.20,
      -0.31,
      0.48
    );


    rightHandPivot.rotation.set(
      -0.45,
      -0.82,
      -1.02
    );


    rightHandPivot.visible =
      false;


    vrGroup.add(
      rightHandPivot
    );


    handsReady =
      true;

  },


  undefined,


  function (error) {

    console.error(
      "Hand load error:",
      error
    );

  }

);


// ========================================
// EASING
// ========================================

function clamp01(value) {

  return THREE.MathUtils.clamp(
    value,
    0,
    1
  );

}


function easeInOutCubic(t) {

  return t < 0.5
    ? 4 * t * t * t
    : 1 -
      Math.pow(
        -2 * t + 2,
        3
      ) / 2;

}


function easeInQuart(t) {

  return (
    t *
    t *
    t *
    t
  );

}


// ========================================
// START VR ENTER
// ========================================

function startVREnter() {

  if (isEntering) {
    return;
  }


  if (
    !headsetReady ||
    !handsReady
  ) {
    return;
  }


  isEntering =
    true;


  enterCompleteSent =
    false;


  enterStartTime =
    performance.now();


  headsetPivot.position.set(
    0,
    0,
    0
  );


  headsetPivot.rotation.set(
    0,
    0,
    0
  );


  vrGroup.position.set(
    0,
    normalY,
    0
  );


  vrGroup.rotation.set(
    0,
    0,
    0
  );


  vrGroup.scale.setScalar(
    normalScale
  );


  leftHandPivot.visible =
    false;


  rightHandPivot.visible =
    false;


  leftHandPivot.position.set(
    -2.20,
    -0.31,
    0.48
  );


  rightHandPivot.position.set(
    2.20,
    -0.31,
    0.48
  );


  window.dispatchEvent(
    new CustomEvent(
      "vr-enter-start"
    )
  );

}


// ========================================
// CLICK / KEYBOARD
// ========================================

container.addEventListener(
  "click",
  startVREnter
);


container.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      startVREnter();

    }

  }
);


// ========================================
// ANIMATION
// ========================================

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const elapsed =
    clock.getElapsedTime();


  // ========================================
  // NORMAL
  // ========================================

  if (
    !isEntering &&
    headsetReady
  ) {

    headsetPivot.position.y =
      Math.sin(
        elapsed * 1.5
      ) * 0.035;


    headsetPivot.rotation.set(
      0,
      0,
      0
    );


    vrGroup.rotation.set(
      0,
      0,
      0
    );


    if (leftHandPivot) {

      leftHandPivot.visible =
        false;

    }


    if (rightHandPivot) {

      rightHandPivot.visible =
        false;

    }

  }


  // ========================================
  // ENTER
  // ========================================

  if (
    isEntering &&
    headsetReady &&
    handsReady
  ) {

    const time =
      performance.now() -
      enterStartTime;


    // ========================================
    // PHASE 1
    // WAIT
    // ========================================

    if (time <= 300) {

      leftHandPivot.visible =
        false;


      rightHandPivot.visible =
        false;


      vrGroup.rotation.set(
        0,
        0,
        0
      );


      vrGroup.position.set(
        0,
        normalY,
        0
      );


      vrGroup.scale.setScalar(
        normalScale
      );

    }


    // ========================================
    // PHASE 2
    // ROTATE HEADSET
    // ========================================

    else if (time <= 1500) {

      const progress =
        easeInOutCubic(
          clamp01(
            (time - 300) /
              1200
          )
        );


      leftHandPivot.visible =
        false;


      rightHandPivot.visible =
        false;


      vrGroup.rotation.set(
        0,
        THREE.MathUtils.lerp(
          0,
          WEAR_ROTATION_Y,
          progress
        ),
        0
      );


      vrGroup.position.set(
        0,
        normalY,
        0
      );


      vrGroup.scale.setScalar(
        normalScale
      );

    }


    // ========================================
    // PHASE 3
    // HANDS APPROACH
    // ========================================

    else if (time <= 2300) {

      const progress =
        easeInOutCubic(
          clamp01(
            (time - 1500) /
              800
          )
        );


      leftHandPivot.visible =
        true;


      rightHandPivot.visible =
        true;


      leftHandPivot.position.x =
        THREE.MathUtils.lerp(
          -2.20,
          -1.13,
          progress
        );


      rightHandPivot.position.x =
        THREE.MathUtils.lerp(
          2.20,
          1.13,
          progress
        );


      leftHandPivot.position.y =
        -0.31;


      rightHandPivot.position.y =
        -0.31;


      leftHandPivot.position.z =
        0.48;


      rightHandPivot.position.z =
        0.48;


      vrGroup.rotation.set(
        0,
        WEAR_ROTATION_Y,
        0
      );


      vrGroup.position.set(
        0,
        normalY,
        0
      );


      vrGroup.scale.setScalar(
        normalScale
      );

    }


    // ========================================
    // PHASE 4
    // HOLD
    // ========================================

    else if (time <= 2600) {

      leftHandPivot.visible =
        true;


      rightHandPivot.visible =
        true;


      leftHandPivot.position.set(
        -1.13,
        -0.31,
        0.48
      );


      rightHandPivot.position.set(
        1.13,
        -0.31,
        0.48
      );


      vrGroup.rotation.set(
        0,
        WEAR_ROTATION_Y,
        0
      );


      vrGroup.position.set(
        0,
        normalY,
        0
      );


      vrGroup.scale.setScalar(
        normalScale
      );

    }


    // ========================================
    // PHASE 5
    // PUT ON HEADSET
    // ========================================

    else if (time <= 4300) {

      const rawProgress =
        clamp01(
          (time - 2600) /
            1700
        );


      const moveProgress =
        easeInOutCubic(
          rawProgress
        );


      const zoomProgress =
        easeInQuart(
          rawProgress
        );


      const finalScale =
        Math.max(
          normalScale * 7.5,
          MIN_FINAL_SCALE
        );


      leftHandPivot.visible =
        true;


      rightHandPivot.visible =
        true;


      vrGroup.position.x =
        THREE.MathUtils.lerp(
          0,
          WEAR_POSITION_X,
          moveProgress
        );


      vrGroup.position.y =
        THREE.MathUtils.lerp(
          normalY,
          WEAR_POSITION_Y,
          moveProgress
        );


      vrGroup.position.z =
        THREE.MathUtils.lerp(
          0,
          WEAR_POSITION_Z,
          zoomProgress
        );


      vrGroup.scale.setScalar(
        THREE.MathUtils.lerp(
          normalScale,
          finalScale,
          zoomProgress
        )
      );


      vrGroup.rotation.set(
        0,
        WEAR_ROTATION_Y,
        0
      );

    }


    // ========================================
    // PHASE 6
    // FINAL HOLD
    // ========================================

    else if (time <= 4650) {

      const finalScale =
        Math.max(
          normalScale * 7.5,
          MIN_FINAL_SCALE
        );


      leftHandPivot.visible =
        true;


      rightHandPivot.visible =
        true;


      vrGroup.position.set(
        WEAR_POSITION_X,
        WEAR_POSITION_Y,
        WEAR_POSITION_Z
      );


      vrGroup.rotation.set(
        0,
        WEAR_ROTATION_Y,
        0
      );


      vrGroup.scale.setScalar(
        finalScale
      );

    }


    // ========================================
    // COMPLETE
    // ========================================

    else if (!enterCompleteSent) {

      enterCompleteSent =
        true;


      window.dispatchEvent(
        new CustomEvent(
          "vr-enter-complete"
        )
      );

    }

  }


  renderer.render(
    scene,
    camera
  );

}


// ========================================
// START
// ========================================

animate();


// ========================================
// RESIZE
// ========================================

let resizeTimer = null;


window.addEventListener(
  "resize",
  function () {

    clearTimeout(
      resizeTimer
    );


    resizeTimer =
      setTimeout(
        function () {

          resizeRenderer();


          if (!isEntering) {

            responsiveSettings =
              getResponsiveSettings();


            normalScale =
              responsiveSettings.scale;


            normalY =
              responsiveSettings.y;


            vrGroup.scale.setScalar(
              normalScale
            );


            vrGroup.position.set(
              0,
              normalY,
              0
            );


            vrGroup.rotation.set(
              0,
              0,
              0
            );

          }

        },

        80
      );

  }
);