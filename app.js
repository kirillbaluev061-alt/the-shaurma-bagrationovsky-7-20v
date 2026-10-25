'use strict';
const ADDRESS='Багратионовский пр., 7, корп. 20В, Москва';
const ROUTE_ADDRESS='Багратионовский пр., 7, корп. 20В, Москва';
const PHONE='+7 (977) 181-86-44';
const route='https://yandex.ru/maps/?mode=routes&rtext=~'+encodeURIComponent(ROUTE_ADDRESS)+'&rtt=auto';
document.querySelectorAll('[data-route]').forEach(a=>a.href=route);
let toastTimer;
function toast(message){const el=document.querySelector('.toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4200);}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const text=button.dataset.copy==='address'?ADDRESS:PHONE;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const input=document.createElement('textarea');input.value=text;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw new Error('copy');}toast(button.dataset.copy==='address'?'Адрес скопирован':'Номер скопирован');}
  catch{toast('Не удалось скопировать. '+text);}
}));
const dialog=document.querySelector('#photo-dialog');
const media=document.querySelector('#dialog-media');
const title=document.querySelector('#dialog-title');
const note=document.querySelector('#dialog-note');
function openPhoto(name,content,description){title.textContent=name;media.replaceChildren(content);note.textContent=description;dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('[data-dish]').forEach(button=>button.addEventListener('click',()=>{
  const photo=button.querySelector('.food-crop').cloneNode(true);
  const price=button.querySelector('.card-price').innerText.replace('\n',' · ');
  openPhoto(button.querySelector('h3').textContent,photo,price);
}));
document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{
  const image=document.createElement('img');image.src=button.dataset.gallery==='interior'?'interior.png':'exterior.png';image.alt=button.dataset.gallery==='interior'?'Интерьер The Shaurma':'The Shaurma снаружи';
  openPhoto(button.dataset.gallery==='interior'?'Внутри The Shaurma':'The Shaurma снаружи',image,ADDRESS);
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));


