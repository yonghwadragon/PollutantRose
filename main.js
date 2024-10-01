// main.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 참조
    const graphTypeSelect = document.getElementById('graph-type-select');
    const pollutantSelect = document.getElementById('pollutant-select');
    const graphTitle = document.getElementById('graph-title');
    const pollutantImage = document.getElementById('pollutant-image');
    const sectorGraphTitle = document.getElementById('sector-graph-title');
    const sectorImage = document.getElementById('sector-image');
    const currentMonthIndicator = document.getElementById('current-month');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const windRoseControls = document.querySelector('.wind-rose-controls');
    const windRoseIndicator = document.querySelector('.wind-rose-indicator');

    const totalMonths = 9;
    let currentMonth = 1;
    let isPlaying = true;
    const intervalTime = 2000; // 2초
    let intervalId;

    let currentPollutant = pollutantSelect.value;
    let currentGraphType = graphTypeSelect.value;

    // 업데이트 함수
    function updateImages() {
        if (currentGraphType === 'windRose') {
            pollutantImage.src = `${currentPollutant}/month${currentMonth}.png`;
            graphTitle.textContent = `${currentPollutant.toUpperCase()} 바람장미 그래프`;
            currentMonthIndicator.textContent = `${currentMonth}월`;
        } else if (currentGraphType === 'sectorComparison') {
            sectorImage.src = `${currentPollutant}_sector_comparison/${currentPollutant.toUpperCase()}_sector_comparison.png`;
            sectorGraphTitle.textContent = `${currentPollutant.toUpperCase()} 섹터별 농도 비교`;
        }
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

    // 그래프 유형 변경 시 처리
    function changeGraphType() {
        currentGraphType = graphTypeSelect.value;
        if (currentGraphType === 'windRose') {
            document.querySelector('.wind-rose').classList.remove('hidden');
            document.querySelector('.sector-comparison').classList.add('hidden');
            windRoseControls.classList.remove('hidden');
            windRoseIndicator.classList.remove('hidden');
            updateImages();
        } else if (currentGraphType === 'sectorComparison') {
            document.querySelector('.wind-rose').classList.add('hidden');
            document.querySelector('.sector-comparison').classList.remove('hidden');
            windRoseControls.classList.add('hidden');
            windRoseIndicator.classList.add('hidden');
            updateImages();
            clearInterval(intervalId);
            playPauseBtn.textContent = '재생';
            isPlaying = false;
        }
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
        if (isPlaying && currentGraphType === 'windRose') {
            clearInterval(intervalId);
            intervalId = setInterval(nextMonth, intervalTime);
        }
    });
    graphTypeSelect.addEventListener('change', () => {
        changeGraphType();
    });

    // 초기 업데이트 및 애니메이션 시작
    updateImages();
    if (currentGraphType === 'windRose') {
        intervalId = setInterval(nextMonth, intervalTime);
    }
});
