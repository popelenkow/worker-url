(()=>{"use strict";((t,e)=>{class r extends AudioWorkletProcessor{handlers=(t=>{const{port:e,getState:r}=t;let s=!1;return e.onmessage=t=>{"start"===t.data&&(s=!0),"stop"===t.data&&(s=!1)},{process:(t,e)=>{if(!s)return;const{currentTime:a,sampleRate:o}=r();e.forEach((t=>{for(let e=0;e<t.length;e++){const r=a+e/o;t[e]=Math.sin(2*Math.PI*r*440)}}))}}})({port:this.port,getState:()=>({sampleRate,currentTime})});process([t],[e]){return this.handlers.process(t,e),!0}}registerProcessor("oscillator",r)})()})();