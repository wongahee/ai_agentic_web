// 버튼 요소 가져오기
const button1 = document.getElementById('incButton');
const button2 = document.getElementById('decButton');

// 이벤트 핸들러
// 익명함수 ( () => {} )로 만들어 내부에 로직 넣기 
button1.addEventListener('click', () => {
    document.getElementById('result').textContent = parseInt(result.textContent) + 1;
});

button2.addEventListener('click', () => {
    document.getElementById('result').textContent -= 1;
});