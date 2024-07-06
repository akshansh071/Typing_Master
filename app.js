document.addEventListener('DOMContentLoaded', () => {
    const testText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Pellentesque eget nunc sit amet urna ullamcorper fermentum et eu leo. Aenean quis quam ligula. Mauris tempor, nulla eu scelerisque pretium, nulla mauris blandit turpis, ut commodo ligula nunc a odio. Vestibulum euismod tortor quis tortor posuere, a aliquam turpis ullamcorper. Etiam sit amet lacus at ligula hendrerit consectetur. Aenean vitae orci vitae nunc pulvinar malesuada. Quisque in varius quam, at tristique lacus. Sed sed augue vitae urna suscipit feugiat. Nullam mollis sapien et gravida bibendum. Phasellus commodo erat a tortor ultrices tincidunt. Suspendisse potenti.`;
    
    const userInput = document.getElementById('userInput');
    const timeCounterElem = document.getElementById('timeCounter');
    const timeTakenElem = document.getElementById('timeTaken');
    const wpmElem = document.getElementById('wpm');
    const accuracyElem = document.getElementById('accuracy');

    let startTime;
    let interval;

    userInput.addEventListener('focus', () => {
        startTime = new Date();
        interval = setInterval(() => {
            const elapsedTime = ((new Date()) - startTime) / 1000;
            timeCounterElem.textContent = `Time Elapsed: ${elapsedTime.toFixed(2)} seconds`;
        }, 100);
    }, { once: true });

    userInput.addEventListener('input', () => {
        const userText = userInput.value;
        if (userText === testText) {
            clearInterval(interval);
            const endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000; // in seconds
            const wordsTyped = userText.split(' ').length;
            const wpm = (wordsTyped / timeTaken) * 60;

            const accuracy = calculateAccuracy(testText, userText);

            timeTakenElem.textContent = `Time Taken: ${timeTaken.toFixed(2)} seconds`;
            wpmElem.textContent = `Words Per Minute (WPM): ${wpm.toFixed(2)}`;
            accuracyElem.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
        }
    });

    function calculateAccuracy(testText, userText) {
        const testTextArray = testText.split('');
        const userTextArray = userText.split('');
        let correctChars = 0;

        testTextArray.forEach((char, index) => {
            if (char === userTextArray[index]) {
                correctChars++;
            }
        });

        return (correctChars / testTextArray.length) * 100;
    }
});
