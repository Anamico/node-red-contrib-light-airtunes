'use strict';

var AirTunesServer = require('nodetunes-zp');
var Analyser = require('audio-analyser');

var server = new AirTunesServer({
    serverName: 'NodeTunes',
    macAddress: 'E9F50021E53E',
    recordMetrics: true
});

//https://www.npmjs.com/package/audio-analyser

const fftSize = 1024;

var analyser = new Analyser({
    // Magnitude diapasone, in dB
    minDecibels: -100,
    maxDecibels: -30,

    // Number of time samples to transform to frequency
    fftSize: fftSize,

    // Number of frequencies, twice less than fftSize
    frequencyBinCount: fftSize/2,

    // Smoothing, or the priority of the old data over the new data
    smoothingTimeConstant: 0.2,

    // Number of channel to analyse
    channel: 0,

    // Size of time data to buffer
    bufferSize: 44100 //,

    // Windowing function for fft, https://github.com/scijs/window-functions
    //applyWindow: function (sampleNumber, totalSamples) {
    //}

    //...pcm-stream params, if required
});

server.on('clientConnected', function(stream) {
    stream.pipe(analyser);
    //stream.pipe(process.stdout);
});

server.start();

var arr;
setInterval(function() {
    analyser.getFloatFrequencyData(arr);
    if (arr) {
        console.log(arr);
    }
}, 1000);


