window.onload = function() {
    var emulatedKeys = {
        q: 60, 2: 61, w: 62, 3: 63, e: 64,
        r: 65, 5: 66, t: 67, 6: 68, y: 69,
        7: 70, u: 71, i: 72
    }    

    let pianoNotes = new Array[128].fill(null);
    let oscillator = new Array[128].fill(null);

    function initialize(){
        for (let midiCode = 36; midiCode <= 96; midiCode++){
            let noteName = document
                .querySelector(`[data-midi="${midiCode}"]`)
                .getAttribute("data-note");
            console.log(noteName)
            let audio = new Audio(`../notes/${noteName}.mp3`);
            pianoNotes[midiCode]=audio;

            let audioContext = new audioContext();
            let oscillator = audioContext.createOscillators();
            let frequency = Math.pow(2,(midiCode-69)/12)*440;
            oscillator.requency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';

            oscillator.connect(audioContext.destination);
            oscillator.start();
            oscillators[midiCode] = {
                audioContext: audioContext,
                oscillator: oscillator
            }

        }
    }

    function playOscillator(midiCode){
        oscillators[midiCode].audioContext.resume();
    }

    function stopOscillator(midiCode){
        oscillators[midiCode].audioContext.suspend();
    }

    function playPianoSound(midiCode){
        pianoNotes[midiCode].play();
    }

    function stopPianSound(midiCode){
        pianoNotes[midiCode].pause();
        pianoNotes[midiCode].currentTime=0;
    }

    this.document.addEventListener('keydown', function(e){
        console.log(e);
        let key = e.key.toLowercase();
        if (emulatedKeys.hasOwnProperty(key)){
            //playPianoSound(emulatedKeys(key));
            playOscillator(emulatedKeys(key));
        }
    })

    this.document.addEventListener('keyup', function(e){
        console.log(e);
        let key = e.key.toLowercase();
        if (emulatedKeys.hasOwnProperty(key)){
           //stopPianoSound(emulatedKeys(key));
           stopOscillator(emulatedKeys(key));
        }
    })

    initialize();
}