
class Sound{
    constructor(context){
        this.context = context;
    }

    
    
    init(){
        
        const wave__get = document.getElementById('wave');
        const wave = wave__get.value;
          console.log(wave);

        const freq__get = document.getElementById('lfo');
        const freq = freq__get.value;
            console.log(freq);

        //waveShaping  - destruction
        function curve(amount) {
           amount = Math.random() * 87;
            let n_samples = 1028,
              curve = new Float32Array(n_samples);
            for (let i = 0; i < n_samples; ++i) {
              let x = (i * 2) / n_samples - 1;
              curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
            }
            return curve;
          }



        this.lfo = this.context.createOscillator();
        this.sub = this.context.createOscillator();
        this.osc = this.context.createOscillator();
        this.osc__two = this.context.createOscillator();
        this.lpf = this.context.createBiquadFilter();
        this.del = this.context.createDelay();
        this.vel = this.context.createGain();
        this.ws = this.context.createWaveShaper();

        this.osc.type = wave;
        this.osc.frequency.value = freq;
        this.osc__two.type = wave;
        this.sub.value = 40;
        this.osc__two.frequency.value = freq / 2;
        this.lfo.type = wave;
        this.lfo.frequency.value = 4;
        this.ws.curve = curve()

        this.osc.connect(this.lpf);
        this.osc__two.connect(this.lpf);
        this.lfo.connect(this.lpf && this.del.delayTime);
        this.lpf.connect(this.vel);
        this.vel.connect(this.ws);
        this.sub.connect(this.context.destination);
        this.ws.connect(this.context.destination);
    }

    play(freq){
        this.init();

        this.vel.gain.setValueAtTime(0,this.context.currentTime);
        this.vel.gain.linearRampToValueAtTime(0.15,this.context.currentTime+0.05);

        this.lpf.frequency.setValueAtTime(0,this.context.currentTime);
        this.lpf.frequency.linearRampToValueAtTime(1200,this.context.currentTime+0.15);
        

        this.osc.start(this.context.currentTime);
        this.stop(this.context.currentTime);
        }
    

    stop(){
        this.vel.gain.exponentialRampToValueAtTime(0.001,this.context.currentTime+1.75);
        this.lpf.frequency.linearRampToValueAtTime(0.001,this.context.currentTime+.5);
        let stopTime = Math.random() + 1;
        this.osc.stop(this.context.currentTime+stopTime);
    }
}
// make a white noise generator with band pass modulation on mouse move (done)

// add timestreching and waveshaping

// create web audio class(es) ---done

function mousemove(event){
    function mousemove(event){
new Sound(ctx).play(event.clientX);
console.log(event.clientX);
    }

    window.addEventListener('mousemove',mousemove);
}
mousemove()

const ctx = new AudioContext({
    sampleRate: 44100,
    latencyHint: 'interactive'
});

//outputs what should make for a good value mod

const bandPass = new BiquadFilterNode({
    context: ctx,
    type: 'bandpass',
    frequency: 420,    
    Q: 4
})

const lfo = new OscilatorNode({
    context: ctx,
    type: 'sine',
    frequency: 8,
    detune: 0
})

const gain = new GainNode({
    context: ctx,
    gain: 0.5
});

const delay = new DelayNode({
    context: ctx,
    delayTime: 0.5,
    maxDelayTime: 1.5
});



  //biquad filter class set to bandpass(done)



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
delay.connect(gain);
gain.connect(lfo);
lfo.connect(delay.maxDelayTime);
delay.connect(ctx.destination);




//functor event listener for mouse move to set frequency try exponential is a bad idea - need to keep within samplerate
