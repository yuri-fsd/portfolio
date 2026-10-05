// ========================================
// MAIN.JS
//
// Three.js側から送られてくるイベントを受け取り、
// ページ全体の画面遷移を担当する
// ========================================


// ========================================
// 状態管理
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

    // 二重実行防止
    if (transitionStarted) {
      return;
    }

    transitionStarted = true;


    // ========================================
    // ① 黒へフェード
    // ========================================

    document.body.classList.add(
      "vr-blackout"
    );


    // ========================================
    // ② 完全に暗くなるまで待つ
    //
    // CSS側の暗転時間 350ms より
    // 少し長く待つ
    // ========================================

    setTimeout(
      function () {

        // ========================================
        // ③ 黒画面の裏側で
        // VR WORLDへ切り替える
        // ========================================

        document.body.classList.add(
          "world-open"
        );


        // ========================================
        // ④ 完全な黒を少し維持
        //
        // 「装着した」感を出すため
        // 650ms待つ
        // ========================================

        setTimeout(
          function () {

            // ========================================
            // ⑤ 徐々に明るくする
            // ========================================

            document.body.classList.add(
              "vr-reveal"
            );


            // ========================================
            // ⑥ 明転終了後
            // blackoutを完全解除
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

              1200
            );

          },

          650
        );

      },

      400
    );

  }
);

// ========================================
// PIXEL CAT
// ========================================

const pixelCat =
  document.getElementById(
    "pixelCat"
  );


const catHearts =
  document.querySelector(
    ".cat-hearts"
  );


let catPetTimer =
  null;


// ========================================
// 猫を撫でる
// ========================================

function petCat() {

  if (
    !pixelCat ||
    !catHearts
  ) {
    return;
  }


  // ========================================
  // 猫を一時停止
  // ========================================

  pixelCat.classList.add(
    "is-petted"
  );


  // ========================================
  // HEARTを作る
  // ========================================

  const heart =
    document.createElement(
      "span"
    );


  heart.classList.add(
    "cat-heart"
  );


  heart.textContent =
    "♥";


  // ========================================
  // ハートが毎回少し違う方向へ
  // ========================================

  const randomX =
    Math.floor(
      Math.random() * 45
    ) - 22;


  heart.style.setProperty(
    "--heart-x",
    `${randomX}px`
  );


  catHearts.appendChild(
    heart
  );


  // ========================================
  // アニメーション終了後
  // HEARTを削除
  // ========================================

  setTimeout(
    function () {

      heart.remove();

    },

    1000
  );


  // ========================================
  // 連打された場合は
  // 停止時間をリセット
  // ========================================

  clearTimeout(
    catPetTimer
  );


  // ========================================
  // 0.8秒後にまた歩き始める
  // ========================================

  catPetTimer =
    setTimeout(
      function () {

        pixelCat.classList.remove(
          "is-petted"
        );

      },

      800
    );

}


// ========================================
// CLICK
// ========================================

if (pixelCat) {

  pixelCat.addEventListener(
    "click",
    petCat
  );


  // ========================================
  // キーボード操作
  // ========================================

  pixelCat.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        petCat();

      }

    }
  );

}