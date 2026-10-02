const vrHeadset = document.getElementById("vrHeadset");

let isEntering = false;

vrHeadset.addEventListener("click", function () {

  if (isEntering) return;
  isEntering = true;

  // ゴーグルを掴んでこちらへ
  document.body.classList.add("entering");

  // 最後の一瞬だけフラッシュ
  setTimeout(function () {
    document.body.classList.add("vr-flash");
  }, 1050);

  // すぐVR世界を表示
  setTimeout(function () {
    document.body.classList.add("world-open");
  }, 1150);

  // 0.2秒程度で光を消す
  setTimeout(function () {
    document.body.classList.remove("vr-flash");
  }, 1350);

});