// ========================================
// MAIN.JS
//
// VR WORLD UI
// Settings
// Language
// Text size
// BGM
// Clock
// Pixel cat
// ========================================


// ========================================
// ELEMENTS
// ========================================

const world =
  document.getElementById("world");

const libraryPanel =
  document.getElementById("libraryPanel");

const contentPanel =
  document.getElementById("contentPanel");

const contentTitle =
  document.getElementById("contentTitle");

const contentBody =
  document.getElementById("contentBody");

const backButton =
  document.getElementById("backButton");

const settingsPanel =
  document.getElementById("settingsPanel");

const settingsButton =
  document.getElementById("settingsButton");

const closeSettings =
  document.getElementById("closeSettings");

const homeButton =
  document.getElementById("homeButton");

const profileShortcut =
  document.getElementById("profileShortcut");

const soundButton =
  document.getElementById("soundButton");

const musicPanel =
  document.getElementById(
    "musicPanel"
  );

const closeMusic =
  document.getElementById(
    "closeMusic"
  );

const musicSoundButton =
  document.getElementById(
    "musicSoundButton"
  );

const musicVolumeControl =
  document.getElementById(
    "musicVolumeControl"
  );

const musicVolumeSlider =
  document.getElementById(
    "musicVolumeSlider"
  );

const iosVolumeMessage =
  document.getElementById(
    "iosVolumeMessage"
  );

const bgm =
  document.getElementById("bgm");

const currentTime =
  document.getElementById("currentTime");


// ========================================
// STATE
// ========================================

let currentLanguage = "en";

let currentTextSize = "medium";

let bgmPlaying = false;


// ========================================
// TRANSLATIONS
// ========================================

const translations = {

  en: {

    library: "Library",

    welcome: "Welcome",

    choose:
      "Applications",

    profile: "Profile",

    skills: "Skills",

    hobby: "Hobby",

    game: "Game",

    settings: "Settings",

    language: "Language",

    languageDescription:
      "Choose display language",

    textSize: "Text Size",

    textSizeDescription:
      "Change interface text size",

    bgm: "BGM",

    bgmDescription:
      "Background music",

    volume: "Volume",

    volumeDescription:
      "Adjust music volume",

    profileTitle: "Profile",

    skillsTitle: "Skills",

    hobbyTitle: "Hobby",

    gameTitle: "Game",

    profileHTML: `
      <div class="content-card">

        <h4>YURIA MORI</h4>

        <p>
          Welcome to my portfolio.
        </p>

        <p>
          I'm interested in technology,
          interaction design, VR,
          and creating digital experiences.
        </p>

        <div class="profile-section">

          <span class="profile-section-label">
            MUSIC
          </span>

          <h4>rewind</h4>

          <p>
            This original BGM was composed by a friend who drew inspiration from me💗
          </p>

          <div class="music-credit">
            ♫ rewind — Original BGM
          </div>

        </div>

      </div>
    `,
    skillsHTML: `
      <div class="content-card skills-content-card">
        <h4>Skills</h4>
        <p>Technologies and tools I have experience with.</p>

        <style>
          .skills-list {
            display: grid;
            gap: 10px;
            margin-top: 14px;
          }

          .skills-item {
            padding: 12px 14px;
            border: 1px solid rgba(145,160,210,.22);
            border-radius: 13px;
            background: rgba(255,255,255,.08);
          }

          .skills-item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .skills-item-name {
            font-size: .96em;
            font-weight: 700;
            overflow-wrap: anywhere;
          }

          .skills-item-years {
            flex-shrink: 0;
            padding: 3px 9px;
            border-radius: 999px;
            background: rgba(145,160,210,.18);
            font-size: .78em;
            white-space: nowrap;
          }

          .skills-item-description {
            margin: 6px 0 0;
            font-size: .88em;
            line-height: 1.55;
          }
        </style>

        <div class="skills-list">

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Python</span>
              <span class="skills-item-years">5.5 years</span>
            </div>
            <p class="skills-item-description">
              Built voice conversion systems, analyzed data with pandas and scikit-learn, and integrated VR experiments.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">HTML / CSS / JavaScript</span>
              <span class="skills-item-years">4 years</span>
            </div>
            <p class="skills-item-description">
              Developed websites, user interfaces, and interactive web content.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">React</span>
              <span class="skills-item-years">1 year</span>
            </div>
            <p class="skills-item-description">
              Built websites using React.
            </p>
          </div>

          
          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">C / C++ / C#</span>
              <span class="skills-item-years">6 months each</span>
            </div>
            <p class="skills-item-description">
              Used for VR experiment environment development in research.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Java / Processing / MongoDB/ R</span>
              <span class="skills-item-years">Coursework</span>
            </div>
            <p class="skills-item-description">
              Learned programming and database fundamentals through university coursework.
            </p>
          </div>


          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">MATLAB</span>
              <span class="skills-item-years">1 year</span>
            </div>
            <p class="skills-item-description">
              Used for statistical analysis and data visualization in coursework and research.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Unity</span>
              <span class="skills-item-years">6 months</span>
            </div>
            <p class="skills-item-description">
              Built VR experiment environments and controlled avatars.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Photon</span>
              <span class="skills-item-years">6 months</span>
            </div>
            <p class="skills-item-description">
              Built multi-user VR environments with Unity.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Docker</span>
              <span class="skills-item-years">3 years</span>
            </div>
            <p class="skills-item-description">
              Used for containerizing, setting up, and sharing development environments.
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">AWS</span>
              <span class="skills-item-years">2 months</span>
            </div>
            <p class="skills-item-description">
              Learned AWS fundamentals during an internship and practiced cloud infrastructure setup using EC2, VPC, and NAT Gateway.
            </p>
          </div>

        </div>
      </div>
    `,


    hobbyHTML: `
      <div class="content-card">
        <h4>Hobby</h4>

        <p>
          Music, games and creating things
          are some of my favorite ways to
          spend my time.
        </p>

        <p>
          More content will be added here
          as this world grows.
        </p>
      </div>
    `,

    gameHTML: `
      <div class="content-card">
        <h4>Game</h4>

        <p>
          🎮 Coming Soon...
        </p>

        <p>
          I'm planning to add small games
          and interactive experiences here.
        </p>
      </div>
    `

  },


  ja: {

    library: "ライブラリ",

    welcome: "ようこそ",

    choose:
      "アプリケーション",

    profile: "自己紹介",

    skills: "スキル",

    hobby: "趣味",

    game: "ゲーム",

    settings: "設定",

    language: "言語",

    languageDescription:
      "表示する言語を変更します",

    textSize: "文字サイズ",

    textSizeDescription:
      "文字サイズを変更します",

    bgm: "BGM",

    bgmDescription:
      "BGMのON / OFF",

    volume: "音量",

    volumeDescription:
      "BGMの音量を調整します",

    profileTitle: "自己紹介",

    skillsTitle: "スキル",

    hobbyTitle: "趣味",

    gameTitle: "ゲーム",

    profileHTML: `
      <div class="content-card">

        <h4>森 由璃亜</h4>

        <p>
          私のポートフォリオへようこそ。
        </p>

        <p>
          VRやインタラクション、
          テクノロジーを使った
          新しい体験づくりに興味があります。
        </p>

        <div class="profile-section">

          <span class="profile-section-label">
            MUSIC
          </span>

          <h4>rewind</h4>

          <p>
            友人が私をイメージして制作してくれたオリジナルBGMです。
          </p>

          <div class="music-credit">
            ♫ rewind — Original BGM
          </div>

        </div>

      </div>
    `,

    
    skillsHTML: `
      <div class="content-card skills-content-card">
        <h4>Skills</h4>
        <p>使用経験のある技術・ツールです。</p>

        <style>
          .skills-list {
            display: grid;
            gap: 10px;
            margin-top: 14px;
          }

          .skills-item {
            padding: 12px 14px;
            border: 1px solid rgba(145,160,210,.22);
            border-radius: 13px;
            background: rgba(255,255,255,.08);
          }

          .skills-item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .skills-item-name {
            font-size: .96em;
            font-weight: 700;
            overflow-wrap: anywhere;
          }

          .skills-item-years {
            flex-shrink: 0;
            padding: 3px 9px;
            border-radius: 999px;
            background: rgba(145,160,210,.18);
            font-size: .78em;
            white-space: nowrap;
          }

          .skills-item-description {
            margin: 6px 0 0;
            font-size: .88em;
            line-height: 1.55;
          }
        </style>

        <div class="skills-list">

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Python</span>
              <span class="skills-item-years">5年半</span>
            </div>
            <p class="skills-item-description">
              音声変換システムの構築，pandasやscikit-learnを用いたデータ分析，VR実験環境との連携に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">HTML / CSS / JavaScript</span>
              <span class="skills-item-years">4年</span>
            </div>
            <p class="skills-item-description">
              WebサイトやUIの設計・開発，インタラクティブなWebコンテンツの制作に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">React</span>
              <span class="skills-item-years">1年</span>
            </div>
            <p class="skills-item-description">
              Reactを用いたWebサイトの制作を経験
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">C / C++ / C#</span>
              <span class="skills-item-years">各半年</span>
            </div>
            <p class="skills-item-description">
              研究におけるVR実験環境の構築に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Java / Processing / MongoDB/ R</span>
              <span class="skills-item-years">講義で使用</span>
            </div>
            <p class="skills-item-description">
              大学の講義でプログラミングやデータベースの基礎を学習
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">MATLAB</span>
              <span class="skills-item-years">1年</span>
            </div>
            <p class="skills-item-description">
              講義と研究で統計解析やデータの可視化に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Unity</span>
              <span class="skills-item-years">半年</span>
            </div>
            <p class="skills-item-description">
              VR実験環境の構築やアバター制御に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Photon</span>
              <span class="skills-item-years">半年</span>
            </div>
            <p class="skills-item-description">
              Unityを用いたマルチユーザーVR環境の構築に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">Docker</span>
              <span class="skills-item-years">3年</span>
            </div>
            <p class="skills-item-description">
              開発環境の構築・コンテナ化，環境の共有に使用
            </p>
          </div>

          <div class="skills-item">
            <div class="skills-item-header">
              <span class="skills-item-name">AWS</span>
              <span class="skills-item-years">2ヶ月</span>
            </div>
            <p class="skills-item-description">
              独学でAWSの勉強を行い，インターンシップはEC2，VPC，NAT Gatewayなどの基礎を学び，クラウド環境の構築を経験
            </p>
          </div>

        </div>
      </div>
    `,

    hobbyHTML: `
      <div class="content-card">
        <h4>趣味</h4>

        <p>
          音楽やゲーム、ものづくりなどが
          好きです。
        </p>

        <p>
          この世界と一緒に、これから
          コンテンツも増やしていく予定です。
        </p>
      </div>
    `,

    gameHTML: `
      <div class="content-card">
        <h4>ゲーム</h4>

        <p>
          🎮 Coming Soon...
        </p>

        <p>
          今後ここにミニゲームや
          インタラクティブなコンテンツを
          追加していく予定です。
        </p>
      </div>
    `

  }

};


// ========================================
// CLOCK
// ========================================

function updateClock() {

  if (!currentTime) {
    return;
  }

  const now =
    new Date();

  currentTime.textContent =
    now.toLocaleTimeString(
      currentLanguage === "ja"
        ? "ja-JP"
        : "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }
    );

}


updateClock();

setInterval(
  updateClock,
  1000
);


// ========================================
// LANGUAGE
// ========================================

function setLanguage(language) {

  if (
    language !== "en" &&
    language !== "ja"
  ) {
    return;
  }

  currentLanguage =
    language;

  document.documentElement.lang =
    language;

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(
      function (element) {

        const key =
          element.dataset.i18n;

        const value =
          translations[language][key];

        if (value) {

          element.textContent =
            value;

        }

      }
    );

  document
    .querySelectorAll(
      ".language-button"
    )
    .forEach(
      function (button) {

        button.classList.toggle(
          "active",
          button.dataset.language ===
            language
        );

      }
    );

  updateClock();

}


document
  .querySelectorAll(
    ".language-button"
  )
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          setLanguage(
            button.dataset.language
          );

        }
      );

    }
  );


// ========================================
// TEXT SIZE
// ========================================

function setTextSize(size) {

  const scales = {
    small: 0.88,
    medium: 1,
    large: 1.16
  };

  if (!scales[size]) {
    return;
  }

  currentTextSize =
    size;

  document.body.style.setProperty(
    "--ui-scale",
    scales[size]
  );

  document
    .querySelectorAll(
      ".text-size-button"
    )
    .forEach(
      function (button) {

        button.classList.toggle(
          "active",
          button.dataset.size === size
        );

      }
    );

}


document
  .querySelectorAll(
    ".text-size-button"
  )
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          setTextSize(
            button.dataset.size
          );

        }
      );

    }
  );


// ========================================
// CONTENT
// ========================================

function openContent(type) {

  const language =
    translations[currentLanguage];

  const contentMap = {

    profile: {
      title: language.profileTitle,
      html: language.profileHTML
    },

    skills: {
      title: language.skillsTitle,
      html: language.skillsHTML
    },

    hobby: {
      title: language.hobbyTitle,
      html: language.hobbyHTML
    },

    game: {
      title: language.gameTitle,
      html: language.gameHTML
    }

  };

  const content =
    contentMap[type];

  if (!content) {
    return;
  }

  closeSettingsPanel();

  contentTitle.textContent =
    content.title;

  contentBody.innerHTML =
    content.html;

  libraryPanel.classList.add(
    "is-hidden"
  );

  contentPanel.classList.add(
    "is-open"
  );

  contentPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  homeButton.classList.remove(
    "active"
  );

}

closeMusicPanel();
function showLibrary() {

  contentPanel.classList.remove(
    "is-open"
  );

  contentPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  libraryPanel.classList.remove(
    "is-hidden"
  );

  closeSettingsPanel();

  homeButton.classList.add(
    "active"
  );

}


document
  .querySelectorAll(
    ".vr-app"
  )
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          openContent(
            button.dataset.panel
          );

        }
      );

    }
  );


backButton.addEventListener(
  "click",
  showLibrary
);


homeButton.addEventListener(
  "click",
  showLibrary
);


profileShortcut.addEventListener(
  "click",
  function () {

    openContent(
      "profile"
    );

  }
);


// ========================================
// SETTINGS
// ========================================

closeMusicPanel();

function openSettingsPanel() {

  settingsPanel.classList.add(
    "is-open"
  );

  settingsPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  settingsButton.classList.add(
    "active"
  );

}


function closeSettingsPanel() {

  settingsPanel.classList.remove(
    "is-open"
  );

  settingsPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  settingsButton.classList.remove(
    "active"
  );

}


settingsButton.addEventListener(
  "click",
  function () {

    if (
      settingsPanel.classList.contains(
        "is-open"
      )
    ) {

      closeSettingsPanel();

    }

    else {

      openSettingsPanel();

    }

  }
);


closeSettings.addEventListener(
  "click",
  closeSettingsPanel
);


// ========================================
// BGM
// ========================================
// ========================================
// MUSIC PANEL
// ========================================

function openMusicPanel() {

  closeSettingsPanel();

  musicPanel.classList.add(
    "is-open"
  );

  musicPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  soundButton.classList.add(
    "active"
  );

}


function closeMusicPanel() {

  musicPanel.classList.remove(
    "is-open"
  );

  musicPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  soundButton.classList.remove(
    "active"
  );

}


soundButton.addEventListener(
  "click",
  function () {

    if (
      musicPanel.classList.contains(
        "is-open"
      )
    ) {

      closeMusicPanel();

    }

    else {

      openMusicPanel();

    }

  }
);


closeMusic.addEventListener(
  "click",
  closeMusicPanel
);


// ========================================
// IOS / IPADOS CHECK
// ========================================

function isIOSDevice() {

  const userAgent =
    navigator.userAgent;

  const platform =
    navigator.platform;

  const touchPoints =
    navigator.maxTouchPoints || 0;


  const normalIOS =
    /iPhone|iPad|iPod/i.test(
      userAgent
    );


  /*
    iPadOSではSafariが
    Macとして名乗る場合があるため、
    Mac + タッチ対応もiPadとして扱う。
  */

  const iPadOS =
    platform === "MacIntel" &&
    touchPoints > 1;


  return (
    normalIOS ||
    iPadOS
  );

}


// ========================================
// BGM UI
// ========================================

function updateSoundUI() {

  document.body.classList.toggle(
    "bgm-playing",
    bgmPlaying
  );


  musicSoundButton.textContent =
    bgmPlaying
      ? "ON"
      : "OFF";


  musicSoundButton.classList.toggle(
    "active",
    bgmPlaying
  );

}


// ========================================
// BGM PLAY / PAUSE
// ========================================

async function toggleBGM() {

  if (!bgm) {
    return;
  }


  if (bgmPlaying) {

    bgm.pause();

    bgmPlaying = false;

  }

  else {

    try {

      await bgm.play();

      bgmPlaying = true;

    }

    catch (error) {

      console.warn(
        "BGM could not start:",
        error
      );

      bgmPlaying = false;

    }

  }


  updateSoundUI();

}


// ========================================
// BGM BUTTON
// ========================================

musicSoundButton.addEventListener(
  "click",
  toggleBGM
);


// ========================================
// VOLUME
// ========================================

if (bgm) {

  bgm.volume =
    Number(
      musicVolumeSlider.value
    ) / 100;

}


musicVolumeSlider.addEventListener(
  "input",
  function () {

    if (!bgm) {
      return;
    }


    bgm.volume =
      Number(
        musicVolumeSlider.value
      ) / 100;

  }
);


// ========================================
// MOBILE VOLUME SUPPORT
// ========================================

if (isIOSDevice()) {

  /*
    iPhone / iPadでは
    Webページ側のvolume制御が
   期待通り動作しないため
    スライダーを非表示にする。
  */

  musicVolumeControl.hidden =
    true;

  iosVolumeMessage.hidden =
    false;

}

else {

  musicVolumeControl.hidden =
    false;

  iosVolumeMessage.hidden =
    true;

}


// ========================================
// INITIAL SOUND UI
// ========================================

updateSoundUI();

// ========================================
// PIXEL CAT
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


const normalCats = [
  "white",
  "black",
  "gray",
  "orange",
  "calico"
];


let catWalking = false;

let catPetTimer = null;

let catAnimation = null;

let nextCatTimer = null;


// ========================================
// CHOOSE CAT
// ========================================

function chooseCat() {

  // 5% ribbon
  if (Math.random() < 0.05) {

    return "ribbon";

  }

  return normalCats[
    Math.floor(
      Math.random() *
      normalCats.length
    )
  ];

}


// ========================================
// CAT DESIGN
// ========================================

function setCatDesign(catName) {

  if (!catSprite) {
    return;
  }

  catSprite.style.backgroundImage =
    `url("./assets/cats/${catName}.png")`;

}


// ========================================
// START CAT
// ========================================

function startCat() {

  if (
    !pixelCat ||
    !catSprite ||
    catWalking
  ) {
    return;
  }

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    pixelCat.style.right =
      "20px";

    return;

  }

  catWalking = true;

  if (nextCatTimer) {

    clearTimeout(
      nextCatTimer
    );

    nextCatTimer = null;

  }

  setCatDesign(
    chooseCat()
  );

  pixelCat.style.transform =
    "translateX(0px)";

  const travelDistance =
    window.innerWidth + 260;

  catAnimation =
    pixelCat.animate(
      [
        {
          transform:
            "translateX(-120px)"
        },

        {
          transform:
            `translateX(${travelDistance}px)`
        }
      ],
      {
        duration: 12000,

        easing: "linear",

        fill: "forwards"
      }
    );

  catAnimation.onfinish =
    function () {

      catWalking = false;

      catAnimation = null;

      pixelCat.classList.remove(
        "is-petted"
      );

      pixelCat.style.transform =
        "translateX(0px)";

      const nextDelay =
        200 +
        Math.random() *
        400;

      nextCatTimer =
        setTimeout(
          startCat,
          nextDelay
        );

    };

}


// ========================================
// HEART
// ========================================

function createHeart() {

  if (!catHearts) {
    return;
  }

  const heart =
    document.createElement(
      "img"
    );

  heart.className =
    "cat-heart";

  heart.src =
    "./assets/cats/heart.png";

  heart.alt =
    "";

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

  setTimeout(
    function () {

      heart.remove();

    },

    1000
  );

}


// ========================================
// PET CAT
// ========================================

function petCat() {

  if (
    !pixelCat ||
    !catWalking ||
    !catAnimation
  ) {
    return;
  }

  createHeart();

  pixelCat.classList.add(
    "is-petted"
  );

  catAnimation.pause();

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


if (pixelCat) {

  pixelCat.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      petCat();

    }
  );


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


// ========================================
// INITIAL SETTINGS
// ========================================

setLanguage(
  currentLanguage
);

setTextSize(
  currentTextSize
);

startCat();