// main.js

document.addEventListener('DOMContentLoaded', () => {
    const pollutantSelect = document.getElementById('pollutant-select');
    const graphTitle = document.getElementById('graph-title');
    const pollutantImage = document.getElementById('pollutant-image');
    const currentMonthIndicator = document.getElementById('current-month');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const totalMonths = 9;
    let currentMonth = 1;
    let isPlaying = true;
    const intervalTime = 2000; // 2초
    let intervalId;

    let currentPollutant = pollutantSelect.value;

    // 업데이트 함수
    function updateImages() {
        pollutantImage.src = `${currentPollutant}/month${currentMonth}.png`;
        graphTitle.textContent = currentPollutant.toUpperCase();
        currentMonthIndicator.textContent = `${currentMonth}월`;
    }

    // 다음 월로 이동
    function nextMonth() {
        currentMonth = currentMonth < totalMonths ? currentMonth + 1 : 1;
        updateImages();
    }

    // 이전 월로 이동
    function prevMonthFunc() {
        currentMonth = currentMonth > 1 ? currentMonth - 1 : totalMonths;
        updateImages();
    }

    // 재생/일시정지 토글
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(intervalId);
            playPauseBtn.textContent = '재생';
        } else {
            intervalId = setInterval(nextMonth, intervalTime);
            playPauseBtn.textContent = '일시정지';
        }
        isPlaying = !isPlaying;
    }

    // 오염물질 변경 시 처리
    function changePollutant() {
        currentPollutant = pollutantSelect.value;
        currentMonth = 1; // 월 초기화
        updateImages();
    }

    // 이벤트 리스너 설정
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', () => {
        nextMonth();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextMonth, intervalTime);
        }
    });
    prevBtn.addEventListener('click', () => {
        prevMonthFunc();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextMonth, intervalTime);
        }
    });
    pollutantSelect.addEventListener('change', () => {
        changePollutant();
        if (isPlaying) {
            clearInterval(intervalId);
            intervalId = setInterval(nextMonth, intervalTime);
        }
    });

    // 초기 업데이트 및 애니메이션 시작
    updateImages();
    intervalId = setInterval(nextMonth, intervalTime);
});
