document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const apiKey = '86808765a6e53f486acc76859059185d'; // APIキーを設定
    const city = 'Tokyo'; // 都市名を設定（必要に応じて変更）
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const temp = data.main.temp;

        document.getElementById('temperatureDisplay').innerText = `現在の気温: ${temp}°C`;
        document.getElementById('temperatureDisplay').dataset.temp = temp; // 気温をデータ属性に保存
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

document.querySelectorAll('.season-btn').forEach(button => {
    button.addEventListener('click', function() {
        const tempDisplay = document.getElementById('temperatureDisplay');
        const temperature = tempDisplay.dataset.temp;
        if (!temperature) {
            alert('まず気温を取得してください');
            return;
        }
        const season = this.getAttribute('data-season');
        displayCoordinate(temperature, season);
    });
});

function displayCoordinate(temperature, season) {
    const imgElement = document.getElementById('coordinateImage');
    let imgUrl = '';
    let coordinateText = '';

    if (season === 'spring') {
        if (temperature < 15) {
            imgUrl = 'spring_cool.jpg';
            coordinateText = '春の涼しい日のコーディネート';
        } else {
            imgUrl = 'spring_warm.jpg';
            coordinateText = '春の暖かい日のコーディネート';
        }
    } else if (season === 'summer') {
        if (temperature < 25) {
            imgUrl = 'summer_cool.jpg';
            coordinateText = '夏の涼しい日のコーディネート';
        } else {
            imgUrl = 'summer_hot.jpg';
            coordinateText = '夏の暑い日のコーディネート';
        }
    } else if (season === 'autumn') {
        if (temperature < 15) {
            imgUrl = 'autumn_cool.jpg';
            coordinateText = '秋の涼しい日のコーディネート';
        } else {
            imgUrl = 'autumn_warm.jpg';
            coordinateText = '秋の暖かい日のコーディネート';
        }
    } else if (season === 'winter') {
        if (temperature < 0) {
            imgUrl = 'winter_cold.jpg';
            coordinateText = '冬の寒い日のコーディネート';
        } else {
            imgUrl = 'winter_cool.jpg';
            coordinateText = '冬の涼しい日のコーディネート';
        }
    }

    document.getElementById('coordinateInfo').innerText = coordinateText;
    imgElement.src = imgUrl;
}
