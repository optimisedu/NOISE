//make a white noise generator with band pass modulation on mouse move (done)

//create web audio class(es)
let x = window.innerWidth;
let y = window.innerHeight;

let position = (x * y) / 2;
console.log(position);

const ctx = new AudioContext({
    sampleRate: 44100,
    latencyHint: 'interactive',
});

function mousemove(event){
    function mousemove(event){
        return event.position;
    }
    
    window.addEventListener('mousemove', mousemove);
}
mousemove()

  //biquad filter class set to bandpass
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = `${Math.ceil(mousemove)}`;
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



source.connect(bandpass);
bandpass.connect(delay);
delay.connect(ctx.destination);


//functor event listener for mouse move to set frequency try exponential is a bad idea - need to keep within samplerate
