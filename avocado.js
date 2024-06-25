document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const temperatureDisplay = document.getElementById('temperatureDisplay');

    getWeatherBtn.addEventListener('click', () => {
        getWeather();
    });

    async function getWeather() {
        const apiKey = '86808765a6e53f486acc76859059185d';
        const city = 'Tokyo';  // 必要に応じて都市名を変更してください
        const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

        try {
            const [responseCurrent, responseForecast] = await Promise.all([
                fetch(urlCurrent),
                fetch(urlForecast)
            ]);
            const dataCurrent = await responseCurrent.json();
            const dataForecast = await responseForecast.json();

            if (dataCurrent.cod === 200 && dataForecast.cod === "200") {
                const currentTemp = dataCurrent.main.temp;
                const tempMin = dataForecast.list[0].main.temp_min;
                const tempMax = dataForecast.list[0].main.temp_max;
                const avgTemp = (tempMin + tempMax) / 2;
                const weather = dataCurrent.weather[0].description;
                const icon = dataCurrent.weather[0].icon;
                const precipitationProb = dataForecast.list[0].pop * 100;
                const windSpeed = dataCurrent.wind.speed;
                const uvIndex = dataCurrent.uvi; // UVインデックスが含まれている場合

                temperatureDisplay.innerHTML = `
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="天気アイコン">
                   <p> 現在の気温: ${currentTemp}°C</p>
                    <p>平均気温: ${avgTemp.toFixed(1)}°C</p>
                    <p>降水確率: ${precipitationProb}%   風速: ${windSpeed} m/s</p>
                `;
                temperatureDisplay.dataset.temp = avgTemp.toFixed(1); // 平均気温をデータ属性に保存

                // 日付から季節を判断
                const currentDate = new Date();
                const month = currentDate.getMonth() + 1;
                let season = '';

                if (month >= 3 && month <= 5) {
                    season = 'spring';
                } else if (month >= 6 && month <= 8) {
                    season = 'summer';
                } else if (month >= 9 && month <= 11) {
                    season = 'autumn';
                } else {
                    season = 'winter';
                }

                showCoordinate(season, parseFloat(avgTemp));
            } else {
                temperatureDisplay.innerHTML = `<p>天気情報を取得できませんでした: ${dataCurrent.message || dataForecast.message}</p>`;
            }
        } catch (error) {
            temperatureDisplay.innerHTML = `<p>天気情報の取得中にエラーが発生しました。</p>`;
            console.error('Error fetching weather data:', error);
        }
    }

    function showCoordinate(season, avgTemp) {
        const coordinateInfo = document.getElementById('coordinateInfo');
        const coordinateImage = document.getElementById('coordinateImage');
        let imgUrl = '';
        let coordinateText = '';

         // シーズンごとのコーディネート情報を表示
        if (season === 'spring') {
            if (avgTemp < 15) {
                imgUrl = 'images/パーカ.png';
                coordinateText = '日中は過ごしやすいが、朝晩は冷え込むので軽めのアウターがあると◎';
            } else if(avgTemp < 20) {
                imgUrl = 'images/デニムシャツ.png';
                coordinateText = '少しずつあったかくなってきたのでニットなら一枚で過ごせそう！';
            }
              else {
                imgUrl = 'images/ピンクT.png';
                coordinateText = '薄手の長袖一枚か、半袖インナーにシャツ羽織がおすすめ！春っぽい色を取り入れよう！';
            }
            
        } else if (season === 'summer') {
            if (avgTemp < 27) {
                imgUrl = 'images/シア―.png';
                coordinateText = 'サンダルデビュー！蒸し暑い時期、風通しの良い服を！';}
            else if (avgTemp < 30) {
                imgUrl = 'images/夏ワンピ.png';
                coordinateText = '冷房対策で羽織を持っておくと便利！';
            } else {
                imgUrl = 'images/ノースリ.png';
                coordinateText = 'とにかく涼しく!日傘・日焼け止めなどのUV対策忘れずに!';
            }
　　　　} else if (season === 'autumn') {
            if (avgTemp < 15) {
                imgUrl = 'ニットカーデ.jpg';
                coordinateText = '季節の変わり目は油断禁物。温度調節できる格好がベスト！';
            } else if (avgTemp < 18) {
                    imgUrl = 'パーカ.jpg';
                    coordinateText = 'ファッションの秋！色や素材で楽しもう❤ベロア素材がおすすめ！';
            } else if (avgTemp < 20) {                   
                 imgUrl = '白ワンピ.jpg';
                    coordinateText = '一日を通して過ごしやすい気温！適度な肌みせで抜け感を！ブレスレットやネックレスを足しておしゃれしよう！';
                
            } else {
                imgUrl = '黒七分.jpg';
                coordinateText = 'ハーフスリーブでもハリのある素材で秋感を出すのがおすすめ';
            }

        } else if (season === 'winter') {
            if (avgTemp < 5 ) {
                imgUrl = 'チェックコート.jpg';
                coordinateText = '足元、首元は念入りに防寒対策を！手袋帽子もあるとなお良し！';
            } else {
                imgUrl = 'ボアフリース.jpg';
                coordinateText = 'さわやかなインナーで春を先取り！まだまだ寒いので厚手アウターとマフラー必須';
            }
        }

        coordinateInfo.innerHTML = coordinateText;
        coordinateImage.src = imgUrl;
        coordinateImage.alt = coordinateText;
    }
});







        
     
