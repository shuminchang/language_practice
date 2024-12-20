const questions = [
    // 資料來源 https://www.youtube.com/watch?v=Q3jLzZSdOC0
    { question: "你好"},
    { question: "謝謝"},
    { question: "我迷路了"},
    { question: "你叫什麼名字？"},
    { question: "你是從哪裡來的？"},
    { question: "你住在哪裡？"},
    { question: "你呢？"},
    { question: "很高興見到你"},
    { question: "你在做什麼？"},
    { question: "你會說中文嗎？"},
    { question: "因為工作的關係。"},
    { question: "你的興趣是什麼？"},
    { question: "你做過跳舞嗎？"},
    { question: "我可以做料理嗎？"},
    { question: "你什麼時候做了旅行？"},
    { question: "你喜歡音樂嗎？"},
    { question: "這個是什麼意思？"},
    { question: "你會彈鋼琴嗎？"},
    { question: "這裡有餐廳嗎？"},
    { question: "請再說一次。"},
    { question: "這個多少錢？"},
    { question: "我想去公園。"},
    { question: "要怎麼到車站？"},
    { question: "是哪個餐廳？"},
    { question: "那位是誰？"},
    { question: "現在幾點？"},
    { question: "有推薦的料理嗎？"},
    { question: "我要這個。"},
    { question: "請結帳。"},
    { question: "你可以幫我開門嗎？"},
    // 資料來源 https://www.skyscanner.com.tw/news/must-learn-english-before-travel-201710
    { question: "你知道報到櫃台在哪裡嗎？"},
    { question: "可以給我一個靠窗的位子嗎？"},
    { question: "可以給我一個靠走道的位子嗎？"},
    { question: "我想要托運行李。"},
    { question: "請問詢問處在哪裡？"},
    { question: "轉機櫃台在哪裡？"},
    { question: "這是我的護照。"},
    { question: "這個可以通過安檢嗎？"},
    { question: "這件很合適。"},
    { question: "太大了。"},
    { question: "太小了。"},
    { question: "可以給我一個大一點的嗎？"},
    { question: "我要這個。"},
    { question: "我想買一雙鞋。"},
    { question: "可以讓我看看這個杯子嗎？"},
    { question: "這個東西有特價嗎？"},
    { question: "這是特價商品嗎？"},
    { question: "最近有什麼優惠活動嗎？"},
    { question: "打個折吧？"},
    { question: "太貴了，便宜一點吧！"},
    { question: "謝謝，可是我只是看看。"},
    { question: "我能在哪裡換錢"},
    { question: "我想換些零錢。"},
    { question: "哪裡有取款機？"},
    { question: "可以開收據嗎？"},
    { question: "我可以點餐了嗎？"},
    { question: "請給我菜單。"},
    { question: "餐廳最推薦的菜式是什麼？"},
    { question: "餐廳有今日特餐嗎？"},
    { question: "我可以點與那份相同的餐嗎？"},
    { question: "請問現在有兩人座位嗎？"},
    { question: "我今天晚上6:30有訂位。"},
    { question: "可以給我們一個靠窗的桌子嗎？"},
    { question: "打擾一下，請問醫院怎麼走？"},
    { question: "請問車站怎麼走？"},
    { question: "打擾一下，這是去商店的路嗎？"},
    { question: "到那需要多長時間？"},
    { question: "請問附近有沒有廁所？"},
    { question: "我要退房。"},
    { question: "房間有Wifi嗎？"},
    { question: "不好意思，可以幫我們拍張照嗎？"},
    { question: "可以把相機轉向嗎？"},
    { question: "能再幫我拍一張嗎？"},
    { question: "這張拍得好好，謝謝！"},
    { question: "要不要我也幫你拍一張？"},
];

const apiKey = 'AIzaSyCDGxhLyv4-iwrVfQb7nuKWdcCxXXy8vM0'; // 替換為你的 Text-to-Speech API 金鑰

let currentQuestionIndex = 0;

function displayQuestion() {
    const questionElement = document.getElementById('questions');
    questionElement.innerHTML = `<p>${questions[currentQuestionIndex].question}</p>`;
    document.getElementById('translationResult').innerHTML = ''; // 清空翻譯結果
}

document.getElementById('next').addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    displayQuestion();
});

document.getElementById('prev').addEventListener('click', () => {
    currentQuestionIndex = (currentQuestionIndex - 1 + questions.length) % questions.length;
    displayQuestion();
});

document.getElementById('random').addEventListener('click', () => {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    displayQuestion();
});

// 翻譯成英文
document.getElementById('translateToEnglish').addEventListener('click', () => {
    const textToTranslate = questions[currentQuestionIndex].question; // 當前問題
    const targetLanguage = 'en'; // 目標語言：英文

    translateAndPlay(textToTranslate, targetLanguage);
});

// 翻譯成日文
document.getElementById('translateToJapanese').addEventListener('click', () => {
    const textToTranslate = questions[currentQuestionIndex].question; // 當前問題
    const targetLanguage = 'ja'; // 目標語言：日文

    translateAndPlay(textToTranslate, targetLanguage);
});

// 翻譯和播放語音的功能
function translateAndPlay(textToTranslate, targetLanguage) {
    fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: textToTranslate,
            target: targetLanguage,
            format: 'text',
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data && data.data.translations) {
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('translationResult').innerHTML = `<p>${translatedText}</p>`;
            playAudio(translatedText, targetLanguage); // 播放翻譯的語音
        } else {
            document.getElementById('translationResult').innerHTML = '<p>翻譯失敗，請稍後再試。</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('translationResult').innerHTML = '<p>翻譯失敗，請稍後再試。</p>';
    });
}

// 播放翻譯語音
function playAudio(text, language) {
    const voiceName = language === 'ja' ? 'ja-JP-Wavenet-A' : 'en-US-Wavenet-C'; // 根據語言選擇語音
    fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: { text: text },
            voice: { languageCode: language === 'ja' ? 'ja-JP' : 'en-US', name: voiceName },
            audioConfig: { audioEncoding: 'MP3' },
        }),
    })
    .then(response => response.json())
    .then(data => {
        const audioContent = data.audioContent;
        const audio = new Audio('data:audio/mp3;base64,' + audioContent);
        audio.play();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 初始顯示第一題
displayQuestion();