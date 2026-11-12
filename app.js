'use strict';
const input=document.getElementById('url'),report=document.getElementById('result'),flags=document.getElementById('flags');
function inspect(){
  const info=PhishingAwareness.analyzeUrl(input.value);
  flags.replaceChildren();
  if(!info.valid){report.textContent='Please correct the input.';}
  else{report.textContent=info.flags.length+' potential red flag(s) identified for '+info.hostname+'. This is NOT a safety verdict.';}
  for(const explanation of info.flags){const li=document.createElement('li');li.textContent=explanation;flags.appendChild(li);}
  if(info.valid){const li=document.createElement('li');li.textContent=info.warning;flags.appendChild(li);}
}
document.getElementById('analyze').addEventListener('click',inspect);
document.getElementById('clear').addEventListener('click',()=>{input.value='';report.textContent='Enter a URL and analyze its red flags.';flags.replaceChildren();input.focus();});
document.getElementById('example').addEventListener('click',()=>{input.value='https://accounts.example.com@security-check.invalid/login';inspect();});
