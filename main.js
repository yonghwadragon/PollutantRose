// main.js

document.addEventListener('DOMContentLoaded', () => {
    const pollutantSelect = document.getElementById('pollutant-select');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const roseImage = document.getElementById('rose-image');
    const dayIndicator = document.getElementById('day-indicator');

    let currentPollutant = pollutantSelect.value;
    let currentDay = 1;
    let intervalId = null;
    let isPlaying = false;

    const TOTAL_DAYS = 31;

    // 초기 이미지 설정
    updateImage();

    // 이벤트 리스너: 오염물질 선택 변경 시
    pollutantSelect.addEventListener('change', () => {
        currentPollutant = pollutantSelect.value;
        currentDay = 1;
        updateImage();
        stopAnimation();
    });

    // 이벤트 리스너: 재생/일시정지 버튼
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });

    function updateImage() {
        const imagePath = `${currentPollutant}/day${currentDay}.png`;
        roseImage.src = imagePath;
        roseImage.alt = `${currentPollutant} - Day ${currentDay}`;
        dayIndicator.textContent = `Day ${currentDay}`;
    }

    function startAnimation() {
        isPlaying = true;
        playPauseBtn.textContent = '일시정지';
        intervalId = setInterval(() => {
            currentDay++;
            if (currentDay > TOTAL_DAYS) {
                currentDay = 1; // 31일 후 다시 1일로 돌아감
            }
            updateImage();
        }, 1000); // 1초 간격으로 변경 (원하는 대로 조정 가능)
    }

    function stopAnimation() {
        isPlaying = false;
        playPauseBtn.textContent = '재생';
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});