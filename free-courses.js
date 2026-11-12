// Free-course addition. Uses existing Appwrite Auth; progress remains on this browser.
// No Stripe, payment keys, database migration or new backend functions are introduced.
(()=>{
 const ids=[11,12],isFree=id=>ids.includes(Number(id));
 let user=null,freeState={courses:{},entitlements:{}},pending=null;
 const original={cs,save,owned,checkout:beginCheckout,portal:renderPortal,media:videoBlock,history:restoreHistory,certificate:certificateMarkup,learner:$('learner').onclick};
 const key=()=>user?'ssFreeCoursesV1:'+user.$id:null;
 function reset(){user=null;freeState={courses:{},entitlements:{}};exam=null;}
 function activate(account){user=account;try{freeState=JSON.parse(localStorage.getItem(key())||'{"courses":{},"entitlements":{}}')}catch{freeState={courses:{},entitlements:{}}}freeState.courses=freeState.courses||{};freeState.entitlements=freeState.entitlements||{};}
 cs=function(id){if(!isFree(id))return original.cs(id);return freeState.courses[id]||(freeState.courses[id]={completed:[],answers:{},reflections:{},started:Date.now(),finalScore:null,feedback:null,attempts:[]})};
 save=function(){original.save();if(user)localStorage.setItem(key(),JSON.stringify(freeState))};
 owned=function(id){return isFree(id)?!!user&&freeState.entitlements[id]===true:original.owned(id)};
 beginCheckout=async function(id){if(!isFree(id))return original.checkout(id);pending=id;
  try{activate(await ssAppwriteRequest('/account'));enrol()}catch{reset();go('login');$('freeAuthStatus').textContent='Sign in or create an account to enrol on this free course.'}
 };
 function enrol(){if(!user||!isFree(pending))return;const id=pending;freeState.entitlements[id]=true;pending=null;save();draw();renderPortal();openCourse(id)}
 restoreHistory=function(st){if(st?.page==='lesson'&&isFree(st.course)&&!owned(st.course))return detail(st.course,{fromHistory:true});return original.history(st)};
 videoBlock=function(m){
  if(!isFree(currentCourse))return original.media(m);
  let media=`<figure class="free-media"><img src="${esc(m.image)}" alt="${esc(m.imageAlt||m.title)}"><figcaption>${esc(m.subtitle)}</figcaption></figure>`;
  if(m.video){try{const url=new URL(m.video,location.href);if(url.protocol==='https:'||url.origin===location.origin){if(/\.(mp4|webm)(?:\?|$)/i.test(url.href))media+=`<video class="free-video" controls preload="metadata" src="${esc(url.href)}"></video>`;else if(['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com'].includes(url.hostname))media+=`<iframe class="free-video" src="${esc(url.href)}" title="${esc(m.title)} demonstration" allowfullscreen loading="lazy"></iframe>`}}catch{}}
  else media+='<p class="video-later">Supporting video to follow. You can complete the written learning and activities now.</p>';
  return media;
 };
 certificateMarkup=function(id){if(!isFree(id))return original.certificate(id);if(!owned(id)||cs(id).completed.length!==SS_CONTENT[id].modules.length||cs(id).finalScore<80)return '<p>Complete the course and pass the final assessment first.</p>';
  const previous=state.profile;try{state.profile={name:user.name||'SS Training Learner',email:user.email};return original.certificate(id)}finally{state.profile=previous}
 };
 renderPortal=function(){original.portal();if(!C.length)return;
  const available=C.filter(c=>owned(c.id));
  if($('continueCourse')){const active=available.find(c=>cs(c.id).completed.length)||available[0];$('continueCourse').onclick=()=>openCourse(active.id)}
  if(available.length){$('portal').insertAdjacentHTML('beforeend',`<div class="free-dashboard"><h2>Choose your learning</h2>${available.map(c=>`<button class="soft" data-resume="${c.id}">${esc(c.title)} · ${c.hours} CPD hours</button>`).join('')}</div>`);document.querySelectorAll('[data-resume]').forEach(b=>b.onclick=()=>openCourse(+b.dataset.resume))}
  if(user)$('portal').insertAdjacentHTML('beforeend','<p class="free-storage-note">Free-course progress is saved on this browser for your account. It does not yet sync between devices. Keep this browser’s data until account-wide storage is connected.</p>');
  if(user&&$('signout'))$('signout').onclick=async()=>{try{save();await ssAppwriteRequest('/account/sessions/current',{method:'DELETE'});reset();SS_ADMIN_AUTHORISED=false;draw();go('home')}catch{alert('Unable to sign out. Please retry.')}};
 };
 const login=$('login').querySelector('.login');
 login.insertAdjacentHTML('beforeend','<div class="free-account"><h3>Free course account</h3><p>Use the email and password fields above. New learners: enter your name below, then create an account.</p><label>Full name for your certificate<input id="freeName" autocomplete="name" maxlength="120"></label><button class="soft" id="freeSignIn">Sign in to free courses</button><button class="soft" id="freeRegister">Create free learner account</button><p id="freeAuthStatus" role="status"></p></div>');
 async function signIn(create){const email=$('loginEmail').value.trim(),password=$('loginPassword').value,name=$('freeName').value.trim();if(!email||!password)throw Error('Enter your email and password.');if(create){if(!name)throw Error('Enter your name for the certificate.');await ssAppwriteRequest('/account',{method:'POST',body:JSON.stringify({userId:'unique()',email,password,name})})}
  save();reset();await ssCreateSession(email,password);activate(await ssAppwriteRequest('/account'));$('loginPassword').value='';$('freeAuthStatus').textContent='Signed in.';if(pending)enrol();else{draw();renderPortal();go('portal')}
 }
 async function auth(create){const buttons=[$('freeRegister'),$('freeSignIn'),$('learner')];buttons.forEach(b=>b.disabled=true);try{await signIn(create)}catch(e){$('freeAuthStatus').textContent=e.message}finally{buttons.forEach(b=>b.disabled=false)}}
 $('freeSignIn').onclick=()=>auth(false);$('freeRegister').onclick=()=>auth(true);
 $('learner').onclick=()=>pending?auth(false):original.learner();
 // Clear the free learner context when switching to the administrator identity.
 const adminLogin=$('admin').onclick;$('admin').onclick=async()=>{save();reset();return adminLogin()};
 const adminOut=$('adminSignOut');if(adminOut){const old=adminOut.onclick;adminOut.onclick=async()=>{save();reset();return old()}}
 ssAppwriteRequest('/account').then(a=>{activate(a);draw();renderPortal()}).catch(()=>{});
})();
