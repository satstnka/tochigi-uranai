// とちぎ占い：カードデータ
const CARDS = [
  {
    "card": "日光連山",
    "総合運": "大きな流れの中で立ち位置を見直すと良い日。視野を広く持つことで道が見えてきます。",
    "恋愛運": "焦らず時間をかけて関係を育てることで信頼が深まります。",
    "金運": "長期的な視点での判断が吉。安定を優先しましょう。",
    "今日の一言": "高いところから、全体を眺めてみよう。"
  },
  {
    "card": "中禅寺湖",
    "総合運": "心を落ち着かせることで運気が安定します。静かな時間が味方になります。",
    "恋愛運": "素直な気持ちを大切にすると関係が和らぎます。",
    "金運": "無理な出費は控え、今あるものを大切に。",
    "今日の一言": "静かな心が、良い流れを呼ぶ。"
  },
  {
    "card": "華厳の滝",
    "総合運": "停滞していたことが一気に動き出す兆し。変化を恐れないで。",
    "恋愛運": "思い切った一歩が関係を進めるきっかけに。",
    "金運": "使うべきところと守るべきところを見極めて。",
    "今日の一言": "流れに身を任せてみよう。"
  },
  {
    "card": "日光東照宮",
    "総合運": "積み重ねてきた努力が評価されやすい日です。",
    "恋愛運": "誠実な態度が信頼につながります。",
    "金運": "堅実な選択が安定をもたらします。",
    "今日の一言": "積み重ねは、力になる。"
  },
  {
    "card": "あしかがフラワーパーク",
    "総合運": "心が華やぐ出来事がありそうな日。",
    "恋愛運": "優しさや気配りが良いご縁を引き寄せます。",
    "金運": "小さなご褒美は吉。",
    "今日の一言": "美しいものに目を向けて。"
  },
  {
    "card": "那須高原",
    "総合運": "自然体で過ごすことで良い流れに乗れる一日です。",
    "恋愛運": "ありのままの自分で接すると好印象。",
    "金運": "無理のない計画が安定につながります。",
    "今日の一言": "肩の力を抜こう。"
  },
  {
    "card": "足利学校",
    "総合運": "学びや振り返りに適した日です。",
    "恋愛運": "相手を理解しようとする姿勢が関係を深めます。",
    "金運": "情報収集が無駄を防ぎます。",
    "今日の一言": "学ぶ姿勢を忘れずに。"
  },
  {
    "card": "益子焼",
    "総合運": "丁寧な行動が運気を安定させます。",
    "恋愛運": "時間をかけて育てる関係が長続きします。",
    "金運": "質を重視した選択が満足感につながります。",
    "今日の一言": "丁寧さが、味わいになる。"
  },
  {
    "card": "二荒山神社",
    "総合運": "ご縁やつながりに恵まれる日です。",
    "恋愛運": "自然な流れの中で関係が育ちます。",
    "金運": "人との関わりがチャンスを運びます。",
    "今日の一言": "縁を大切に。"
  },
  {
    "card": "いちご王国",
    "総合運": "楽しい出来事が増えそうな日。",
    "恋愛運": "明るい会話が関係を深めます。",
    "金運": "ちょっとした贅沢が気分転換に。",
    "今日の一言": "楽しむ心を忘れずに。"
  },
  {
    "card": "宇都宮餃子",
    "総合運": "身近な幸せに気づける日です。",
    "恋愛運": "気取らないやりとりが距離を縮めます。",
    "金運": "交際費はほどほどにすると吉。",
    "今日の一言": "身近な幸せを味わおう。"
  },
  {
    "card": "那須ミルク",
    "総合運": "心と体を休めることで次の活力が生まれます。",
    "恋愛運": "やさしい言葉が相手の心を和ませます。",
    "金運": "シンプルな選択が吉。",
    "今日の一言": "やさしさは力になる。"
  }
];

const elCard = document.getElementById("card");
const elFront = document.querySelector(".card-front");
const elDraw = document.getElementById("drawBtn");
const elReset = document.getElementById("resetBtn");

const elResult = document.getElementById("result");
const elName = document.getElementById("resultCardName");
const elOverall = document.getElementById("overall");
const elLove = document.getElementById("love");
const elMoney = document.getElementById("money");
const elOne = document.getElementById("oneword");

let locked = false;

function frontImagePath(cardName){
  return `images/${cardName}.webp`;
}

function pickRandomCard(){
  const idx = Math.floor(Math.random() * CARDS.length);
  return CARDS[idx];
}

function showResult(data){
  elName.textContent = data.card;
  elOverall.textContent = data["総合運"];
  elLove.textContent = data["恋愛運"];
  elMoney.textContent = data["金運"];
  elOne.textContent = data["今日の一言"];

  elResult.classList.remove("is-empty");

  // 結果エリアへスムーズスクロール（見落とし防止）
  elResult.scrollIntoView({ behavior: "smooth", block: "start" });

  // 一瞬ハイライト
  elResult.classList.add("flash");
  setTimeout(() => elResult.classList.remove("flash"), 700);
}

function hideResult(){
  // 空表示に戻す（枠は残す）
  elName.textContent = "結果はここに表示されます";
  elOverall.textContent = "—";
  elLove.textContent = "—";
  elMoney.textContent = "—";
  elOne.textContent = "—";
  elResult.classList.add("is-empty");
}

function setFrontImage(src){
  // 画像を一度ロードしてから適用（読み込み待ちを吸収）
  const img = new Image();
  img.onload = () => {
    elFront.style.backgroundImage = `url("${src}")`;
  };
  img.onerror = () => {
    // 読み込み失敗時のフォールバック
    elFront.style.backgroundImage = `url("images/card.webp")`;
  };
  img.src = src;
}

function flipToFront(){
  elCard.classList.add("is-flipped");
}

function flipToBack(){
  elCard.classList.remove("is-flipped");
}

elDraw.addEventListener("click", () => {
  if (locked) return;
  locked = true;

  elDraw.disabled = true;
  elReset.disabled = true;
  hideResult();

  // まず裏面に戻して、次のカード準備（連打でも破綻しにくくする）
  flipToBack();

  const data = pickRandomCard();
  const imgPath = frontImagePath(data.card);
  setFrontImage(imgPath);

  // 裏面に戻るアニメ時間を少し待ってから、表へフリップ
  setTimeout(() => {
    flipToFront();

    // フリップ完了後にテキストを表示
    setTimeout(() => {
      showResult(data);
      elReset.disabled = false;
      locked = false;
    }, 900);
  }, 120);
});

elReset.addEventListener("click", () => {
  if (locked) return;
  hideResult();
  flipToBack();
  elDraw.disabled = false;
  elReset.disabled = true;
});
