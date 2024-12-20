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
            document.getElementById('translationResult').innerHTML = `<p>翻譯結果: ${translatedText}</p>`;
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
    const voiceName = language === 'ja' ? 'ja-JP-Wavenet-A' : 'en-US-Wavenet-D'; // 根據語言選擇語音
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