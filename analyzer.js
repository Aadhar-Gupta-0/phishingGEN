(function(root){'use strict';
const SHORTENERS=new Set(['bit.ly','tinyurl.com','t.co','is.gd','ow.ly','cutt.ly']);
function analyzeUrl(input){
  if(typeof input!=='string'||input.length>2048) return {valid:false,flags:['Enter a URL shorter than 2,048 characters.']};
  const trimmed=input.trim();
  if(!trimmed) return {valid:false,flags:['Enter a URL to inspect.']};
  let url;
  try{url=new URL(trimmed);}catch{return {valid:false,flags:['Enter a complete URL including https:// or http://.']};}
  if(!['http:','https:'].includes(url.protocol)) return {valid:false,flags:['Only HTTP and HTTPS addresses can be checked.']};
  const host=url.hostname.toLowerCase();
  const flags=[];
  // These invisible characters can change how a URL appears in messages.
  if (/[\u202a-\u202e\u2066-\u2069]/.test(trimmed))
    flags.push('Bidirectional text controls can disguise the visible link order.');
  if (/[\u0000-\u001f\u007f]/.test(trimmed))
    flags.push('Hidden control characters may change how the URL is interpreted.');
  if(url.protocol==='http:') flags.push('This URL uses HTTP, which does not encrypt the connection.');
  if(url.username||url.password) flags.push('The URL contains user-info before @. This can conceal the real destination hostname.');
  if(/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)||host.startsWith('[')) flags.push('The destination is an IP address rather than a familiar domain name.');
  if(host.startsWith('xn--')||host.includes('.xn--')) flags.push('The hostname uses punycode; carefully verify possible lookalike characters.');
  if(SHORTENERS.has(host)) flags.push('A link shortener hides the final destination until opened.');
  if(host.split('.').length>=5) flags.push('Many subdomain levels can make the real registered domain harder to identify.');
  if(url.port&& !['80','443'].includes(url.port)) flags.push('This URL includes a nonstandard network port.');
  if(trimmed.length>180) flags.push('Very long links can hide suspicious details.');
  if(/(?:^|\/)(?:login|verify|reset|confirm|account|security)(?:[\/?#-]|$)/i.test(url.pathname)) flags.push('Account-related path: verify the domain independently before entering information.');
  return {valid:true,hostname:host,flags,warning:'Heuristic checks cannot determine whether a link is safe. Never enter passwords without independently verifying the destination.'};
}
root.PhishingAwareness={analyzeUrl};if(typeof module!=='undefined')module.exports=root.PhishingAwareness;
})(typeof globalThis!=='undefined'?globalThis:this);
