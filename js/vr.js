import * as THREE from "three";

import {
  GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


// ========================================
// 1. HTML
// ========================================

const container =
  document.getElementById("vrCanvas");


// ========================================
// 2. SCENE
// ========================================

const scene =
  new THREE.Scene();


// ========================================
// 3. CAMERA
// ========================================

const camera =
  new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    100
  );

camera.position.set(
  0,
  0,
  4.3
);


// ========================================
// 4. RENDERER
// ========================================

const renderer =
  new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
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
// 5. RENDERER SIZE
// ========================================

function resizeRenderer() {

  const width =
    window.innerWidth;

  const height =
    window.innerHeight;


  camera.aspect =
    width / height;

  camera.updateProjectionMatrix();


  renderer.setSize(
    width,
    height,
    false
  );

}

resizeRenderer();


// ========================================
// 6. LIGHT
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
// 7. GLTF LOADER
// ========================================

const loader =
  new GLTFLoader();


// ========================================
// 8. VR GROUP
//
// ゴーグル＋左右の手を
// 最終的にまとめて動かす親Group
// ========================================

const vrGroup =
  new THREE.Group();

scene.add(
  vrGroup
);


// ========================================
// 9. VARIABLES
// ========================================

let headsetPivot;

let leftHandPivot;
let rightHandPivot;

let headsetReady = false;
let handsReady = false;

let isEntering = false;

let enterCompleteSent = false;

let enterStartTime = 0;


// ========================================
// 10. ANIMATION SETTINGS
// ========================================


// ========================================
// ゴーグルをY軸で180°回転
//
// 上下を反転させず、
// 鼻のくぼみを下に保ったまま
// 内側をこちらへ向ける
// ========================================

const WEAR_ROTATION_Y =
  Math.PI;


// ========================================
// 装着時の画面中央
//
// x = 0
// y = 0
//
// これで画面の中央へ近づく
// ========================================

const WEAR_POSITION_X =
  0;

const WEAR_POSITION_Y =
  0;


// ========================================
// カメラへの最終接近位置
// ========================================

const WEAR_POSITION_Z =
  3.35;


// ========================================
// 最終拡大サイズ
//
// 初期表示のサイズに関係なく
// 最低でも6.5まで大きくする
// ========================================

const MIN_FINAL_SCALE =
  6.5;


// ========================================
// 11. RESPONSIVE SETTINGS
//
// 通常表示時だけ
// 画面サイズに応じて調整する
// ========================================

function getResponsiveSettings() {

  const width =
    window.innerWidth;

  const height =
    window.innerHeight;


  // ========================================
  // SMARTPHONE
  // ========================================

  if (width <= 600) {

    return {
      scale: 0.64,
      y: -0.42
    };

  }


  // ========================================
  // TABLET / iPad
  // ========================================

  if (width <= 1000) {

    return {
      scale: 0.70,
      y: -0.45
    };

  }


  // ========================================
  // 高さが小さいPC
  // MacBookなど
  // ========================================

  if (height <= 750) {

    return {
      scale: 0.68,
      y: -0.43
    };

  }


  // ========================================
  // NORMAL DESKTOP
  // ========================================

  if (width < 1500) {

    return {
      scale: 0.83,
      y: -0.50
    };

  }


  // ========================================
  // LARGE DESKTOP
  // ========================================

  return {
    scale: 0.94,
    y: -0.55
  };

}


// ========================================
// CURRENT RESPONSIVE SETTINGS
// ========================================

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
// 12. HEADSET MODEL
// ========================================

loader.load(

  "./assets/models/headset.glb",

  function (gltf) {

    const headset =
      gltf.scene;


    // ========================================
    // MODEL SIZE
    // ========================================

    const box =
      new THREE.Box3()
        .setFromObject(
          headset
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


    // ========================================
    // HEADSET BASE SIZE
    // ========================================

    const targetSize =
      2.2;


    const scale =
      targetSize /
      maxDimension;


    headset.scale.setScalar(
      scale
    );


    // ========================================
    // CENTER MODEL
    // ========================================

    box.setFromObject(
      headset
    );


    const center =
      new THREE.Vector3();


    box.getCenter(
      center
    );


    headset.position.set(
      -center.x,
      -center.y,
      -center.z
    );


    // ========================================
    // HEADSET PIVOT
    // ========================================

    headsetPivot =
      new THREE.Group();


    headsetPivot.add(
      headset
    );


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


    vrGroup.add(
      headsetPivot
    );


    headsetReady =
      true;


    console.log(
      "🥽 Headset ready"
    );

  },


  undefined,


  function (error) {

    console.error(
      "Headset error:",
      error
    );

  }

);


// ========================================
// 13. HAND MODEL
// ========================================

loader.load(

  "./assets/models/hand.glb",

  function (gltf) {

    const originalHand =
      gltf.scene;


    // ========================================
    // HAND SIZE
    // ========================================

    const box =
      new THREE.Box3()
        .setFromObject(
          originalHand
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


    const targetSize =
      1.6;


    const scale =
      targetSize /
      maxDimension;


    // ========================================
    // SKIN COLOR
    // ========================================

    const skinColor =
      new THREE.Color(
        "#eebfac"
      );


    // ========================================
    // LEFT HAND
    // ========================================

    const leftHand =
      originalHand.clone(
        true
      );


    leftHand.scale.setScalar(
      scale
    );


    const leftBox =
      new THREE.Box3()
        .setFromObject(
          leftHand
        );


    const leftCenter =
      new THREE.Vector3();


    leftBox.getCenter(
      leftCenter
    );


    leftHand.position.set(
      -leftCenter.x,
      -leftCenter.y,
      -leftCenter.z
    );


    // ========================================
    // LEFT HAND MATERIAL
    // ========================================

    leftHand.traverse(

      function (child) {

        if (child.isMesh) {

          child.material =
            child.material.clone();


          child.material.color =
            skinColor;


          child.material.roughness =
            0.65;

        }

      }

    );


    // ========================================
    // LEFT HAND PIVOT
    // ========================================

    leftHandPivot =
      new THREE.Group();


    leftHandPivot.add(
      leftHand
    );


    // ========================================
    // 最初は画面外側に置く
    // ========================================

    leftHandPivot.position.set(
      -2.20,
      -0.31,
      0.48
    );


    // ========================================
    // 親指が上側に来る向き
    // ========================================

    leftHandPivot.rotation.set(
      -0.45,
      0.82,
      1.02
    );


    // ========================================
    // ★最初は非表示
    //
    // ゴーグルが回転し終わってから
    // 表示する
    // ========================================

    leftHandPivot.visible =
      false;


    vrGroup.add(
      leftHandPivot
    );


    // ========================================
    // RIGHT HAND
    // ========================================

    const rightHand =
      originalHand.clone(
        true
      );


    rightHand.scale.setScalar(
      scale
    );


    const rightBox =
      new THREE.Box3()
        .setFromObject(
          rightHand
        );


    const rightCenter =
      new THREE.Vector3();


    rightBox.getCenter(
      rightCenter
    );


    rightHand.position.set(
      -rightCenter.x,
      -rightCenter.y,
      -rightCenter.z
    );


    // ========================================
    // RIGHT HAND MATERIAL
    // ========================================

    rightHand.traverse(

      function (child) {

        if (child.isMesh) {

          child.material =
            child.material.clone();


          child.material.color =
            skinColor;


          child.material.roughness =
            0.65;

        }

      }

    );


    // ========================================
    // RIGHT HAND PIVOT
    // ========================================

    rightHandPivot =
      new THREE.Group();


    rightHandPivot.add(
      rightHand
    );


    // ========================================
    // 左手モデルを左右反転して
    // 右手として使用
    // ========================================

    rightHandPivot.scale.x =
      -1;


    // ========================================
    // 最初は画面外側
    // ========================================

    rightHandPivot.position.set(
      2.20,
      -0.31,
      0.48
    );


    // ========================================
    // 親指が上側に来る向き
    // ========================================

    rightHandPivot.rotation.set(
      -0.45,
      -0.82,
      -1.02
    );


    // ========================================
    // ★最初は非表示
    // ========================================

    rightHandPivot.visible =
      false;


    vrGroup.add(
      rightHandPivot
    );


    handsReady =
      true;


    console.log(
      "🤲 Hands ready"
    );

  },


  undefined,


  function (error) {

    console.error(
      "Hands error:",
      error
    );

  }

);


// ========================================
// 14. EASING
// ========================================

function easeInOutCubic(t) {

  if (t < 0.5) {

    return (
      4 *
      t *
      t *
      t
    );

  }


  return (
    1 -
    Math.pow(
      -2 * t + 2,
      3
    ) / 2
  );

}


// ========================================
// ZOOM EASING
//
// ズームは最初ゆっくり
// 最後にしっかり近づく
// ========================================

function easeInQuart(t) {

  return (
    t *
    t *
    t *
    t
  );

}


// ========================================
// CLAMP
// ========================================

function clamp01(value) {

  return THREE.MathUtils.clamp(
    value,
    0,
    1
  );

}


// ========================================
// 15. START VR ENTER
// ========================================

function startVREnter() {

  // ========================================
  // 二重クリック防止
  // ========================================

  if (isEntering) {
    return;
  }


  // ========================================
  // モデル読み込み前は開始しない
  // ========================================

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


  // ========================================
  // HEADSETを初期状態へ
  // ========================================

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


  // ========================================
  // VR GROUP初期状態
  // ========================================

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


  // ========================================
  // 手はまだ見せない
  // ========================================

  leftHandPivot.visible =
    false;


  rightHandPivot.visible =
    false;


  // ========================================
  // 手を左右外側へ戻しておく
  // ========================================

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


  // ========================================
  // main.jsへ開始通知
  // ========================================

  window.dispatchEvent(

    new CustomEvent(
      "vr-enter-start"
    )

  );

}


// ========================================
// 16. CLICK
// ========================================

container.addEventListener(
  "click",
  startVREnter
);


// ========================================
// KEYBOARD
// ========================================

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
// 17. ANIMATION LOOP
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
  // NORMAL STATE
  //
  // ★最初はゴーグルだけ
  // ========================================

  if (
    !isEntering &&
    headsetReady
  ) {

    // ========================================
    // ゴーグルを少し浮かせる
    // ========================================

    headsetPivot.position.y =
      Math.sin(
        elapsed * 1.5
      ) * 0.035;


    // ========================================
    // 正面固定
    // ========================================

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


    // ========================================
    // 手は通常時は完全非表示
    // ========================================

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
  // VR ENTER ANIMATION
  // ========================================

  if (
    isEntering &&
    headsetReady &&
    handsReady
  ) {

    const now =
      performance.now();


    const time =
      now -
      enterStartTime;


    // ========================================
    // PHASE 1
    //
    // 0 ～ 300ms
    //
    // クリック後ほんの少し間を作る
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
    //
    // 300 ～ 1500ms
    //
    // ★ゴーグルだけY軸180°回転
    //
    // 手はまだ出さない
    // ========================================

    else if (time <= 1500) {

      const progress =
        easeInOutCubic(
          clamp01(
            (
              time - 300
            ) / 1200
          )
        );


      leftHandPivot.visible =
        false;


      rightHandPivot.visible =
        false;


      // ========================================
      // X軸は回さない
      // ========================================

      vrGroup.rotation.x =
        0;


      // ========================================
      // Y軸だけ180°
      //
      // 鼻のくぼみは下のまま
      // 内側をこちらへ向ける
      // ========================================

      vrGroup.rotation.y =
        THREE.MathUtils.lerp(
          0,
          WEAR_ROTATION_Y,
          progress
        );


      // ========================================
      // Z軸も固定
      // ========================================

      vrGroup.rotation.z =
        0;


      // ========================================
      // 回転中は位置を動かさない
      // ========================================

      vrGroup.position.x =
        0;


      vrGroup.position.y =
        normalY;


      vrGroup.position.z =
        0;


      vrGroup.scale.setScalar(
        normalScale
      );

    }


    // ========================================
    // PHASE 3
    //
    // 1500 ～ 2300ms
    //
    // ★回転完了後に手を表示
    //
    // 左右外側から
    // ゴーグルへ寄せて掴む
    // ========================================

    else if (time <= 2300) {

      const progress =
        easeInOutCubic(
          clamp01(
            (
              time - 1500
            ) / 800
          )
        );


      // ========================================
      // ★ここで初めて手を表示
      // ========================================

      leftHandPivot.visible =
        true;


      rightHandPivot.visible =
        true;


      // ========================================
      // LEFT HAND
      //
      // 左外側 → ゴーグル
      // ========================================

      leftHandPivot.position.x =
        THREE.MathUtils.lerp(
          -2.20,
          -1.13,
          progress
        );


      leftHandPivot.position.y =
        THREE.MathUtils.lerp(
          -0.31,
          -0.31,
          progress
        );


      leftHandPivot.position.z =
        THREE.MathUtils.lerp(
          0.48,
          0.48,
          progress
        );


      // ========================================
      // RIGHT HAND
      //
      // 右外側 → ゴーグル
      // ========================================

      rightHandPivot.position.x =
        THREE.MathUtils.lerp(
          2.20,
          1.13,
          progress
        );


      rightHandPivot.position.y =
        THREE.MathUtils.lerp(
          -0.31,
          -0.31,
          progress
        );


      rightHandPivot.position.z =
        THREE.MathUtils.lerp(
          0.48,
          0.48,
          progress
        );


      // ========================================
      // ゴーグルは内側を向いたまま固定
      // ========================================

      vrGroup.rotation.x =
        0;


      vrGroup.rotation.y =
        WEAR_ROTATION_Y;


      vrGroup.rotation.z =
        0;


      vrGroup.position.x =
        0;


      vrGroup.position.y =
        normalY;


      vrGroup.position.z =
        0;


      vrGroup.scale.setScalar(
        normalScale
      );

    }


    // ========================================
    // PHASE 4
    //
    // 2300 ～ 2600ms
    //
    // 掴んだ状態で0.3秒停止
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
    //
    // 2600 ～ 4300ms
    //
    // ★手＋ゴーグルを
    // 画面中央へ移動させながら
    // 画面いっぱいまで近づける
    // ========================================

    else if (time <= 4300) {

      const rawProgress =
        clamp01(
          (
            time - 2600
          ) / 1700
        );


      const moveProgress =
        easeInOutCubic(
          rawProgress
        );


      const zoomProgress =
        easeInQuart(
          rawProgress
        );


      // ========================================
      // 手は表示したまま
      // ========================================

      leftHandPivot.visible =
        true;


      rightHandPivot.visible =
        true;


      // ========================================
      // ★X方向
      //
      // 必ず画面中央
      // ========================================

      vrGroup.position.x =
        THREE.MathUtils.lerp(
          0,
          WEAR_POSITION_X,
          moveProgress
        );


      // ========================================
      // ★Y方向
      //
      // normalY
      // ↓
      // 0
      //
      // 画面の縦中央へ移動
      // ========================================

      vrGroup.position.y =
        THREE.MathUtils.lerp(
          normalY,
          WEAR_POSITION_Y,
          moveProgress
        );


      // ========================================
      // Z方向
      //
      // カメラへ近づく
      // ========================================

      vrGroup.position.z =
        THREE.MathUtils.lerp(
          0,
          WEAR_POSITION_Z,
          zoomProgress
        );


      // ========================================
      // FINAL SCALE
      //
      // 初期サイズに関係なく
      // 最終的には画面いっぱい
      // ========================================

      const finalScale =
        Math.max(
          normalScale * 7.5,
          MIN_FINAL_SCALE
        );


      const currentScale =
        THREE.MathUtils.lerp(
          normalScale,
          finalScale,
          zoomProgress
        );


      vrGroup.scale.setScalar(
        currentScale
      );


      // ========================================
      // ★近づいている間も
      // 向きは完全固定
      //
      // 斜めにならない
      // ========================================

      vrGroup.rotation.x =
        0;


      vrGroup.rotation.y =
        WEAR_ROTATION_Y;


      vrGroup.rotation.z =
        0;

    }


    // ========================================
    // PHASE 6
    //
    // 4300 ～ 4650ms
    //
    // ★画面のど真ん中で
    // 画面いっぱいの状態を
    // 0.35秒キープ
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


      // ========================================
      // 完全に画面中央
      // ========================================

      vrGroup.position.set(
        WEAR_POSITION_X,
        WEAR_POSITION_Y,
        WEAR_POSITION_Z
      );


      // ========================================
      // 内側を向いたまま
      // ========================================

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
    // PHASE 7
    //
    // 装着完了
    //
    // main.jsへ通知
    //
    // ↓
    // 暗転
    // ↓
    // WORLDへ切替
    // ↓
    // 徐々に明るくなる
    // ========================================

    else {

      if (!enterCompleteSent) {

        enterCompleteSent =
          true;


        window.dispatchEvent(

          new CustomEvent(
            "vr-enter-complete"
          )

        );

      }

    }

  }


  // ========================================
  // RENDER
  // ========================================

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
// 18. RESIZE
//
// PC / iPad / Smartphone
//
// 画面サイズが変わった場合に
// Canvasと通常表示を再計算
// ========================================

window.addEventListener(

  "resize",

  function () {

    resizeRenderer();


    // ========================================
    // 装着前だけ再計算
    // ========================================

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


      // ========================================
      // 通常時は手を隠す
      // ========================================

      if (leftHandPivot) {

        leftHandPivot.visible =
          false;

      }


      if (rightHandPivot) {

        rightHandPivot.visible =
          false;

      }

    }

  }

);