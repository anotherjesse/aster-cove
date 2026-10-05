// Local, explicit evidence capture: the scene canvas only, never microphone or camera.
const scene = document.querySelector('#scene');
const controls = document.createElement('details');
controls.className = 'capture-controls';
controls.innerHTML = `<summary>Capture a moment</summary><button id="captureStill">Save scene PNG</button><button id="captureVideo">Record 12 seconds</button><span id="captureStatus" role="status"></span><a id="captureDownload" hidden>Download capture</a>`;
document.querySelector('#lab').append(controls);
const style = document.createElement('style');
style.textContent = '.capture-controls{position:relative;background:#fff7e7ed;color:#365451;border-radius:8px;padding:10px 13px;font:12px sans-serif;z-index:5;max-width:220px;border:0}.capture-controls summary{margin:0}.capture-controls button,.capture-controls a{display:block;margin-top:9px;background:#e0e6d3;padding:8px;border-radius:4px;color:#365451}.capture-controls span{display:block;margin-top:7px}';
document.head.append(style);
let lastUrl;
async function deliver(blob, name) { if(location.hostname==='127.0.0.1'){try{const response=await fetch('/__capture',{method:'POST',headers:{'Content-Type':blob.type},body:blob});if(response.ok){const result=await response.json();document.querySelector('#captureStatus').textContent='Saved locally: '+result.saved;}}catch{}} if(lastUrl) URL.revokeObjectURL(lastUrl); const link=document.querySelector('#captureDownload'); link.href=lastUrl=URL.createObjectURL(blob); link.download=name; link.textContent='Download '+name; link.hidden=false; }
document.querySelector('#captureStill').onclick=()=>scene.toBlob(blob=>deliver(blob,'aster-cove-scene.png'),'image/png');
document.querySelector('#captureVideo').onclick=()=>{
 const button=document.querySelector('#captureVideo'), status=document.querySelector('#captureStatus');
 if(!scene.captureStream||!window.MediaRecorder){status.textContent='Video capture is unavailable in this browser.';return;}
 const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/mp4'].find(t=>MediaRecorder.isTypeSupported(t));
 const stream=scene.captureStream(30), chunks=[]; const recorder=new MediaRecorder(stream,mime?{mimeType:mime,videoBitsPerSecond:6000000}:{});
 button.disabled=true; status.textContent='Recording — explore for 12 seconds';
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());button.disabled=false;status.textContent='Capture ready';deliver(new Blob(chunks,{type:recorder.mimeType}),'aster-cove-exploration.'+(recorder.mimeType.includes('mp4')?'mp4':'webm'));};
 recorder.start(); setTimeout(()=>recorder.stop(),12000);
};

const study=document.createElement('button');study.textContent='Record movement study';controls.append(study);
study.onclick=()=>{
 const act=window.asterCove.act;
 act({type:'return_to_landing'});
 study.disabled=true;
 setTimeout(()=>{
  document.querySelector('#captureVideo').click();
  for(const [ms,action] of [[1000,{type:'walk_to',x:-1,z:14}],[3200,{type:'walk_to',x:-4,z:14}],[5400,{type:'walk_to',x:-1,z:14}],[7500,{type:'hop'}],[8800,{type:'walk_to',x:-1,z:17}]])setTimeout(()=>act(action),ms);
  setTimeout(()=>{study.disabled=false;},12500);
 },1200);
};
