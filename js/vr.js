import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// ========================================
// 1. HTMLの3D表示エリア
// ========================================

const container = document.getElementById("vrCanvas");


// ========================================
// 2. Scene
// 3Dオブジェクトを置く世界
// ========================================

const scene = new THREE.Scene();


// ========================================
// 3. Camera
// 3D世界を見る視点
// ========================================

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);

// 正面から見る
camera.position.set(0, 0, 5);


// ========================================
// 4. Renderer
// 3D世界をブラウザに描画する
// ========================================

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(
  container.clientWidth,
  container.clientHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

// 背景透明
renderer.setClearColor(0x000000, 0);

container.appendChild(renderer.domElement);


// ========================================
// 5. OrbitControls
//
// 今は手とゴーグルの位置確認用。
// 完成版では削除する予定。
// ========================================

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.06;

controls.enableZoom = true;
controls.enablePan = false;

controls.target.set(0, 0, 0);

controls.update();


// ========================================
// 6. Light
// ========================================

// 全体を柔らかく照らす
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  2.5
);

scene.add(ambientLight);


// 右上から白い光
const mainLight = new THREE.DirectionalLight(
  0xffffff,
  4
);

mainLight.position.set(
  4,
  5,
  5
);

scene.add(mainLight);


// 左側から淡いピンクの光
const pinkLight = new THREE.DirectionalLight(
  0xffd4e8,
  2
);

pinkLight.position.set(
  -4,
  2,
  3
);

scene.add(pinkLight);


// ========================================
// 7. GLTFLoader
// GLBファイルを読み込む
// ========================================

const loader = new GLTFLoader();


// ========================================
// 8. VR全体をまとめるGroup
//
// ゴーグルと左右の手をまとめて入れる。
//
// 後で装着アニメーションを作るときに
// vrGroupごとカメラへ近づけられる。
// ========================================

const vrGroup = new THREE.Group();

scene.add(vrGroup);


// ========================================
// 9. VRゴーグル
// ========================================

let headset;
let headsetPivot;


loader.load(

  "./assets/models/headset.glb",


  // ========================================
  // 読み込み成功
  // ========================================

  function (gltf) {

    headset = gltf.scene;


    // ----------------------------------------
    // モデル本来のサイズを取得
    // ----------------------------------------

    const box =
      new THREE.Box3().setFromObject(
        headset
      );

    const size =
      new THREE.Vector3();

    box.getSize(size);


    // ----------------------------------------
    // 一番大きい辺を取得
    // ----------------------------------------

    const maxDimension =
      Math.max(
        size.x,
        size.y,
        size.z
      );


    // ----------------------------------------
    // ゴーグルのサイズを調整
    // ----------------------------------------

    const targetSize = 2.2;

    const scale =
      targetSize / maxDimension;

    headset.scale.setScalar(
      scale
    );


    // ----------------------------------------
    // スケール変更後に中心を再計算
    // ----------------------------------------

    box.setFromObject(
      headset
    );

    const center =
      new THREE.Vector3();

    box.getCenter(
      center
    );


    // ----------------------------------------
    // モデルの中心を原点へ移動
    // ----------------------------------------

    headset.position.set(
      -center.x,
      -center.y,
      -center.z
    );


    // ========================================
    // ゴーグル用Pivot
    // ========================================

    headsetPivot =
      new THREE.Group();

    headsetPivot.add(
      headset
    );


    // ゴーグルは中央
    headsetPivot.position.set(
      0,
      0,
      0
    );


    // 正面向き
    headsetPivot.rotation.set(
      0,
      0,
      0
    );


    vrGroup.add(
      headsetPivot
    );


    console.log(
      "🥽 Headset loaded!"
    );

  },


  // ========================================
  // 読み込み中
  // ========================================

  function (progress) {

    if (progress.total) {

      const percent =
        progress.loaded /
        progress.total *
        100;

      console.log(
        `Headset loading: ${percent.toFixed(0)}%`
      );

    }

  },


  // ========================================
  // 読み込み失敗
  // ========================================

  function (error) {

    console.error(
      "Headset could not be loaded:",
      error
    );

  }

);


// ========================================
// 10. 手モデル
// ========================================

let leftHand;
let rightHand;

let leftHandPivot;
let rightHandPivot;


// ========================================
// 11. hand.glb を読み込む
// ========================================

loader.load(

  "./assets/models/hand.glb",


  // ========================================
  // 読み込み成功
  // ========================================

  function (gltf) {

    const originalHand =
      gltf.scene;


    // ----------------------------------------
    // 手モデル本来のサイズを取得
    // ----------------------------------------

    const box =
      new THREE.Box3().setFromObject(
        originalHand
      );

    const size =
      new THREE.Vector3();

    box.getSize(
      size
    );


    console.log(
      "Original hand size:",
      size
    );


    // ----------------------------------------
    // 一番大きい辺を取得
    // ----------------------------------------

    const maxDimension =
      Math.max(
        size.x,
        size.y,
        size.z
      );


    // ----------------------------------------
    // 手のサイズ
    // ----------------------------------------

    const targetSize = 1.6;

    const scale =
      targetSize / maxDimension;


    // ========================================
    // 左手
    // ========================================

    leftHand =
      originalHand.clone(true);


    leftHand.scale.setScalar(
      scale
    );


    // ----------------------------------------
    // 左手の中心を取得
    // ----------------------------------------

    const leftBox =
      new THREE.Box3().setFromObject(
        leftHand
      );

    const leftCenter =
      new THREE.Vector3();

    leftBox.getCenter(
      leftCenter
    );


    // ----------------------------------------
    // 左手モデルの中心を原点へ
    // ----------------------------------------

    leftHand.position.set(
      -leftCenter.x,
      -leftCenter.y,
      -leftCenter.z
    );


    // ========================================
    // 左手用Pivot
    // ========================================

    leftHandPivot =
      new THREE.Group();

    leftHandPivot.add(
      leftHand
    );


    // ========================================
    // 左手の位置
    //
    // 前よりゴーグル側へ寄せる
    //
    // X : 左右
    // Y : 上下
    // Z : 前後
    //
    // Zをプラスにすると
    // カメラ側（手前）に来る
    // ========================================

    leftHandPivot.position.set(
      -1.15,
      -0.12,
      0.55
    );


    // ========================================
    // 左手の角度
    //
    // 真横からではなく、
    // 少し手前からゴーグルへ
    // 添えるような角度にする
    // ========================================

    leftHandPivot.rotation.set(
      -0.25,
      0.75,
      -1.05
    );


    vrGroup.add(
      leftHandPivot
    );


    // ========================================
    // 右手
    // ========================================

    rightHand =
      originalHand.clone(true);


    rightHand.scale.setScalar(
      scale
    );


    // ----------------------------------------
    // 右手の中心を取得
    // ----------------------------------------

    const rightBox =
      new THREE.Box3().setFromObject(
        rightHand
      );

    const rightCenter =
      new THREE.Vector3();

    rightBox.getCenter(
      rightCenter
    );


    // ----------------------------------------
    // 右手モデルの中心を原点へ
    // ----------------------------------------

    rightHand.position.set(
      -rightCenter.x,
      -rightCenter.y,
      -rightCenter.z
    );


    // ========================================
    // 右手用Pivot
    // ========================================

    rightHandPivot =
      new THREE.Group();

    rightHandPivot.add(
      rightHand
    );


    // ========================================
    // 右手の位置
    // ========================================

    rightHandPivot.position.set(
      1.15,
      -0.12,
      0.55
    );


    // ========================================
    // 右手を左右反転
    //
    // 1つのhand.glbから
    // 左右対称の手を作る
    // ========================================

    rightHandPivot.scale.x =
      -1;


    // ========================================
    // 右手の角度
    //
    // 左手と左右対称になるようにする
    // ========================================

    rightHandPivot.rotation.set(
      -0.25,
      -0.75,
      1.05
    );


    vrGroup.add(
      rightHandPivot
    );


    // ========================================
    // 12. 肌色
    //
    // 色白だけど
    // 真っ白すぎない色
    // ========================================

    const skinColor =
      new THREE.Color(
        "#eebfac"
      );


    // ========================================
    // 左手のマテリアル
    // ========================================

    leftHand.traverse(

      function (child) {

        if (child.isMesh) {

          // 元モデルのマテリアルを
          // 直接変更しないようコピー
          child.material =
            child.material.clone();


          // 肌色
          child.material.color =
            skinColor;


          // テカテカしすぎないようにする
          child.material.roughness =
            0.65;

        }

      }

    );


    // ========================================
    // 右手のマテリアル
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


    console.log(
      "🤲 Hands loaded!"
    );

  },


  // ========================================
  // 読み込み中
  // ========================================

  function (progress) {

    if (progress.total) {

      const percent =
        progress.loaded /
        progress.total *
        100;

      console.log(
        `Hand loading: ${percent.toFixed(0)}%`
      );

    }

  },


  // ========================================
  // 読み込み失敗
  // ========================================

  function (error) {

    console.error(
      "Hand could not be loaded:",
      error
    );

  }

);


// ========================================
// 13. Animation
// ========================================

function animate() {

  requestAnimationFrame(
    animate
  );


  // OrbitControlsを滑らかに動かす
  controls.update();


  // Sceneを描画
  renderer.render(
    scene,
    camera
  );

}


// アニメーション開始
animate();


// ========================================
// 14. ウィンドウサイズ変更対応
// ========================================

window.addEventListener(

  "resize",

  function () {

    const width =
      container.clientWidth;

    const height =
      container.clientHeight;


    // Cameraの縦横比を更新
    camera.aspect =
      width / height;

    camera.updateProjectionMatrix();


    // Canvasサイズを更新
    renderer.setSize(
      width,
      height
    );

  }

);