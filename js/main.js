// ========================================
// MAIN.JS
//
// VR装着後の画面遷移
// ＋
// ピクセル猫の制御
// ========================================


// ========================================
// STATE
// ========================================

let transitionStarted = false;


// ========================================
// VR装着開始
// ========================================

window.addEventListener(
  "vr-enter-start",
  function () {

    document.body.classList.add(
      "entering"
    );

  }
);


// ========================================
// VR装着完了
// ========================================

window.addEventListener(
  "vr-enter-complete",
  function () {

    if (transitionStarted) {
      return;
    }


    transitionStarted = true;


    // ========================================
    // ① 暗転開始
    // ========================================

    document.body.classList.add(
      "vr-blackout"
    );


    // ========================================
    // ② 黒くなったらWORLDを準備
    // ========================================

    setTimeout(
      function () {

        document.body.classList.add(
          "world-open"
        );


        // ========================================
        // ③ 黒画面を消して
        //    昼背景を見せる
        // ========================================

        setTimeout(
          function () {

            document.body.classList.add(
              "vr-reveal"
            );

          },

          180
        );


        // ========================================
        // ④ 昼背景のあとから
        //    WORLD UIを表示
        // ========================================

        setTimeout(
          function () {

            document.body.classList.add(
              "world-ui-open"
            );


            // ========================================
            // ⑤ 猫スタート
            // ========================================

            startCat();

          },

          850
        );


        // ========================================
        // ⑥ 暗転用クラスを掃除
        // ========================================

        setTimeout(
          function () {

            document.body.classList.remove(
              "vr-blackout"
            );

            document.body.classList.remove(
              "vr-reveal"
            );

          },

          1500
        );

      },

      400
    );

  }
);


// ========================================
// PIXEL CAT ELEMENTS
// ========================================

const pixelCat =
  document.getElementById(
    "pixelCat"
  );


const catSprite =
  document.getElementById(
    "catSprite"
  );


const catHearts =
  document.querySelector(
    ".cat-hearts"
  );


// ========================================
// NORMAL CATS
// ========================================

const normalCats = [
  "white",
  "black",
  "gray",
  "orange",
  "calico"
];


// ========================================
// CAT STATE
// ========================================

let catWalking = false;

let catPetTimer = null;

let catAnimation = null;

let nextCatTimer = null;


// ========================================
// 猫を選ぶ
//
// ribbon = 5%
// ========================================

function chooseCat() {

  const rareRoll =
    Math.random();


  if (rareRoll < 0.05) {

    return "ribbon";

  }


  const randomIndex =
    Math.floor(
      Math.random() *
      normalCats.length
    );


  return normalCats[
    randomIndex
  ];

}


// ========================================
// 猫画像を変更
// ========================================

function setCatDesign(
  catName
) {

  if (!catSprite) {
    return;
  }


  catSprite.style.backgroundImage =
    `url("./assets/cats/${catName}.png")`;

}


// ========================================
// 猫を歩かせる
// ========================================

function startCat() {

  if (
    !pixelCat ||
    !catSprite
  ) {
    return;
  }


  if (catWalking) {
    return;
  }


  catWalking = true;


  // 前回のタイマーを消す

  if (nextCatTimer) {

    clearTimeout(
      nextCatTimer
    );

    nextCatTimer = null;

  }


  // ========================================
  // 猫の種類を選ぶ
  // ========================================

  const nextCat =
    chooseCat();


  setCatDesign(
    nextCat
  );


  // ========================================
  // 初期位置
  //
  // CSSで right:-130px なので
  // translateX(0)で右外側から開始
  // ========================================

  pixelCat.style.transform =
    "translateX(0px)";


  // ========================================
  // 移動距離
  // ========================================

  const travelDistance =
    window.innerWidth + 260;


  // ========================================
  // 右 → 左
  //
  // 12秒でゆっくり歩く
  // ========================================

  catAnimation =
    pixelCat.animate(
      [
        {
          transform:
            "translateX(0px)"
        },

        {
          transform:
            `translateX(-${travelDistance}px)`
        }
      ],

      {
        duration: 12000,

        easing: "linear",

        fill: "forwards"
      }
    );


  // ========================================
  // 画面外まで歩いたあと
  // ========================================

  catAnimation.onfinish =
    function () {

      catWalking = false;

      catAnimation = null;


      pixelCat.classList.remove(
        "is-petted"
      );


      pixelCat.style.transform =
        "translateX(0px)";


      // ========================================
      // 次の猫
      //
      // 0.2〜0.6秒後にすぐ登場
      // ========================================

      const nextDelay =
        200 +
        Math.random() *
        400;


      nextCatTimer =
        setTimeout(
          function () {

            startCat();

          },

          nextDelay
        );

    };

}


// ========================================
// HEARTを作る
// ========================================

function createHeart() {

  if (!catHearts) {
    return;
  }


  const heart =
    document.createElement(
      "img"
    );


  heart.classList.add(
    "cat-heart"
  );


  heart.src =
    "./assets/cats/heart.png";


  heart.alt =
    "";


  // ========================================
  // ハートを左右ランダムに飛ばす
  // ========================================

  const randomX =
    Math.floor(
      Math.random() * 55
    ) - 27;


  heart.style.setProperty(
    "--heart-x",
    `${randomX}px`
  );


  catHearts.appendChild(
    heart
  );


  // ========================================
  // 1秒後に削除
  // ========================================

  setTimeout(
    function () {

      heart.remove();

    },

    1000
  );

}


// ========================================
// 猫を撫でる
// ========================================

function petCat() {

  if (
    !pixelCat ||
    !catWalking ||
    !catAnimation
  ) {
    return;
  }


  // ========================================
  // ハート
  // ========================================

  createHeart();


  // ========================================
  // 猫を停止
  // ========================================

  pixelCat.classList.add(
    "is-petted"
  );


  catAnimation.pause();


  // ========================================
  // 連打されたら
  // 800msを最初から数え直す
  // ========================================

  clearTimeout(
    catPetTimer
  );


  catPetTimer =
    setTimeout(
      function () {

        pixelCat.classList.remove(
          "is-petted"
        );


        if (catAnimation) {

          catAnimation.play();

        }

      },

      800
    );

}


// ========================================
// CAT CLICK
// ========================================

if (pixelCat) {

  pixelCat.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      petCat();

    }
  );


  // ========================================
  // KEYBOARD
  // ========================================

  pixelCat.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        event.stopPropagation();

        petCat();

      }

    }
  );

}