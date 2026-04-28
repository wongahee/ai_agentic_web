let interval;
let timerId;

const timeInput = document.getElementById('timeInput');
const progress = document.getElementById('progress');  // 진행률 바
const progressText = document.getElementById('progressText');
const startButton = document.getElementById('startButton');
const clearButton = document.getElementById('clearButton');

startButton.addEventListener('click', startProgress);
clearButton.addEventListener('click', clearProgress);

function startProgress() {
    duration = parseInt(timeInput.value);
    console.log('입력초: ' + duration);
    startButton.disabled = true;

    // 초과시간 변수 지정 elapsed
    let elapsed = 0;
    timerId = setInterval(() => {
        // console.log('반복 호출');
        elapsed++;
        const ratio = Math.floor((elapsed / duration) * 100); // 진행률 계산
        progress.style.width = `${ratio}%`;
        progressText.textContent = `${ratio}%`;

        // 타이머 중지
        if (ratio >= 100) {
            clearInterval(timerId)
            startButton.disabled = false;
        }
    }, 1000);   // 1초마다 반복
}

function clearProgress() {
    if(timerId) clearInterval(timerId);
    progress.style.width = '2px';
    timeInput.value = '';    // 입력값 초기화
    progressText.textContent = '0%';
    startButton.disabled = false;
}