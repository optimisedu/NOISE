//make a white noise generator with band pass modulation on mouse move (done)

//create web audio class(es) ---done
let x = window.innerWidth;
let y = window.innerHeight;

let position = (x * y) / 2;
console.log(position);

const ctx = new AudioContext({
    sampleRate: 44100,
    latencyHint: 'interactive',
});

//outputs what should make for a good value mod

function mousemove(event){
    function mousemove(event){
        let x = event.clientX;
        let y = event.clientY;
        let position = (x * y) / 2;
        console.log(position);
    }
    
    window.addEventListener('mousemove', mousemove);
}
mousemove()

  //biquad filter class set to bandpass(done)
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 420; //`${Math.ceil(mousemove)}`;
  bandpass.Q.value = 1;
  bandpass.gain.value = 0;

  const delay = ctx.createDelay();
    delay.delayTime.value = 0.5;


//max samplerate to fill with random 2d waves/time


let bufferSize = 2 * ctx.sampleRate,
    noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate),
    output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
}

//save whitenoise to buffer

let source = ctx.createBufferSource();
source.buffer = noiseBuffer;
source.loop = true;
source.start(0);


//-----------------------------------------------------------uncomment the connections to get started-----------------------------------------------------------------//
//---V 0.2 Includes state and a theramin for a js framework to manage please contact if you are interested in contributing i am versed in frontend JS frameworkings---//

// source.connect(bandpass);
// bandpass.connect(delay);
// delay.connect(ctx.destination);


//functor event listener for mouse move to set frequency try exponential is a bad idea - need to keep within samplerate
