//pick a number and system will tell if you guessed it
//elevenlabs.io best tts (AI voices)
window.onload = function() {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.MaxAlternatives = 1;
    let transcriptions ={
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10
    }

    let number = parseInt(Math.random()*100);
    console.log(number);

    let button = document.getElementById("guessButton");
    button.addEventListener("click", function() {
        recognition.start();
    });

    recognition.onresult = function(event) {
        let rawTranscription = event.results[0][0].transcript;
        
        let guessedNumber = parseInt(rawTranscription);

        if (isNaN(guessedNumber)){
            if(transcriptions.hasOwnProperty(rawTranscription.toLowerCase())){
                guess = transcriptions[rawTranscription.toLowerCase()];
            }
        }

        if (isNaN(guessedNumber)){
            let utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'en-US';
            utterance.text = 'I did not understand your guess. Please try again.';

            synth.speak(utterance);
            return;
        }

        if(guessedNumber == number){
            let utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'en-US';
            utterance.text = 'You won! The number was ' + number;
        }
        else {if(guessedNumber < number){
            let utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'en-US';
            utterance.text = 'Your guess ' + guessedNumber + ' is too low.';
        }
        else {
            let utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'en-US';
            utterance.text = 'Your guess ' + guessedNumber + ' is too high.';
        }
        }
    }
        let synth = window.speechSynthesis;
   window.speechSynthesis.onvoiceschanged = function() {
        let voices = synth.getVoices();
        console.log(voices);
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'en-US';
        utterance.text = 'hello';
        utterance.voice = voices[5]

        synth.speak(utterance);

        
        

   }

}