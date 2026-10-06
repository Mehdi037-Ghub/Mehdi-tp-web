const indices={
journal:{
titre:"Journal du professeur",
description:"Des recherches secrètes sur la modification de la mémoire."
},
laboratoire:{
titre:"Laboratoire secret",
description:"Une installation scientifique cachée sous Blackwood."
},
subject07:{
titre:"Dossier SUBJECT 07",
description:"Un dossier confidentiel révèle ton lien avec Blackwood."
},
memory06:{
titre:"MEMORY 06",
description:"Un souvenir corrompu provenant de ton enfance."
}
};
let indicesTrouves=JSON.parse(localStorage.getItem("blackwoodIndices"))||[];
let narrationEnCours=false;
let narrationTerminee=false;
let narrationId=0;
function ajouterIndice(id){
if(!indices[id]||indicesTrouves.includes(id))return;
indicesTrouves.push(id);
localStorage.setItem("blackwoodIndices",JSON.stringify(indicesTrouves));
setTimeout(()=>afficherNotification(id),1800);
mettreAJourDossier();
}
function afficherNotification(id){
const notification=document.createElement("div");
notification.className="indice-notification";
notification.innerHTML=`
<div class="notification-top">◇ NOUVEL INDICE DÉCOUVERT</div>
<div class="notification-title">${indices[id].titre}</div>
<div class="notification-description">${indices[id].description}</div>
`;
document.body.appendChild(notification);
setTimeout(()=>{
notification.classList.add("notification-visible");
},50);
setTimeout(()=>{
notification.classList.remove("notification-visible");
setTimeout(()=>notification.remove(),600);
},4500);
}
function creerDossier(){
const bouton=document.createElement("button");
bouton.className="dossier-button";
bouton.id="dossierButton";
bouton.innerHTML=`
<span>DOSSIER</span>
<strong>${indicesTrouves.length}/4</strong>
`;
bouton.addEventListener("click",ouvrirDossier);
document.body.appendChild(bouton);
const dossier=document.createElement("div");
dossier.className="dossier-overlay";
dossier.id="dossierOverlay";
dossier.innerHTML=`
<div class="dossier-panel">
<button class="dossier-close" id="dossierClose">×</button>
<div class="dossier-symbol">◇</div>
<div class="dossier-small-title">BLACKWOOD</div>
<h2>DOSSIER D'ENQUÊTE</h2>
<div class="dossier-line"></div>
<div class="dossier-progress">
<span>INDICES RÉCUPÉRÉS</span>
<strong id="dossierProgress">${indicesTrouves.length} / 4</strong>
</div>
<div class="dossier-list" id="dossierList"></div>
<button class="dossier-bottom-close" id="dossierBottomClose">FERMER LE DOSSIER</button>
</div>
`;
document.body.appendChild(dossier);
document.getElementById("dossierClose").addEventListener("click",fermerDossier);
document.getElementById("dossierBottomClose").addEventListener("click",fermerDossier);
dossier.addEventListener("click",event=>{
if(event.target===dossier){
fermerDossier();
}
});
mettreAJourDossier();
}
function mettreAJourDossier(){
const bouton=document.getElementById("dossierButton");
const progression=document.getElementById("dossierProgress");
const liste=document.getElementById("dossierList");
if(bouton){
bouton.innerHTML=`
<span>DOSSIER</span>
<strong>${indicesTrouves.length}/4</strong>
`;
}
if(progression){
progression.textContent=`${indicesTrouves.length} / 4`;
}
if(liste){
liste.innerHTML="";
Object.keys(indices).forEach((id,index)=>{
const trouve=indicesTrouves.includes(id);
const element=document.createElement("div");
element.className=trouve?"dossier-item trouve":"dossier-item verrouille";
if(trouve){
element.innerHTML=`
<div class="dossier-item-number">0${index+1}</div>
<div class="dossier-item-content">
<strong>${indices[id].titre}</strong>
<p>${indices[id].description}</p>
</div>
<div class="dossier-item-status">✓</div>
`;
}else{
element.innerHTML=`
<div class="dossier-item-number">0${index+1}</div>
<div class="dossier-item-content">
<strong>INFORMATION VERROUILLÉE</strong>
<p>???</p>
</div>
<div class="dossier-item-status">?</div>
`;
}
liste.appendChild(element);
});
}
}
function ouvrirDossier(){
const dossier=document.getElementById("dossierOverlay");
if(dossier){
dossier.classList.add("dossier-ouvert");
}
}
function fermerDossier(){
const dossier=document.getElementById("dossierOverlay");
if(dossier){
dossier.classList.remove("dossier-ouvert");
}
}
function recommencerPartie(){
localStorage.removeItem("blackwoodIndices");
indicesTrouves=[];
sessionStorage.setItem("blackwoodAudioActive","true");
sessionStorage.setItem("blackwoodMusicTime","0");
}
function obtenirMusique(){
return document.querySelector("audio");
}
function changerVolumeMusique(volume,duree=500){
const musique=obtenirMusique();
if(!musique)return;
const depart=musique.volume;
const difference=volume-depart;
const debut=performance.now();
function animation(temps){
const progression=Math.min((temps-debut)/duree,1);
musique.volume=Math.max(0,Math.min(1,depart+difference*progression));
if(progression<1){
requestAnimationFrame(animation);
}
}
requestAnimationFrame(animation);
}
function reglerMusique(){
const musique=obtenirMusique();
if(!musique)return;
musique.volume=0.55;
const position=parseFloat(sessionStorage.getItem("blackwoodMusicTime"));
if(!isNaN(position)){
musique.addEventListener("loadedmetadata",()=>{
if(musique.duration){
musique.currentTime=position%musique.duration;
}
},{once:true});
}
musique.addEventListener("timeupdate",()=>{
sessionStorage.setItem("blackwoodMusicTime",musique.currentTime);
});
if(sessionStorage.getItem("blackwoodAudioActive")==="true"){
musique.play().catch(()=>{});
}
}
function trouverVoixHomme(){
const voix=window.speechSynthesis.getVoices();
const priorites=[
"Microsoft Paul",
"Paul",
"Microsoft Henri",
"Henri",
"Microsoft Gerard",
"Gerard",
"Microsoft Jean",
"Jean",
"Microsoft Antoine",
"Antoine",
"Microsoft Thierry",
"Thierry",
"Microsoft Fabrice",
"Fabrice",
"Microsoft Rémy",
"Rémy"
];
for(const nom of priorites){
const resultat=voix.find(v=>
v.lang.toLowerCase().startsWith("fr")&&
v.name.toLowerCase().includes(nom.toLowerCase())
);
if(resultat){
return resultat;
}
}
return voix.find(v=>
v.lang.toLowerCase().startsWith("fr")&&
!v.name.toLowerCase().includes("denise")&&
!v.name.toLowerCase().includes("hortense")&&
!v.name.toLowerCase().includes("julie")&&
!v.name.toLowerCase().includes("eloise")&&
!v.name.toLowerCase().includes("sylvie")&&
!v.name.toLowerCase().includes("ariane")
)||voix.find(v=>v.lang.toLowerCase().startsWith("fr"))||null;
}
function obtenirPhrases(){
const contenu=document.querySelector(".scene-content, .ending-content");
if(!contenu)return[];
const elements=contenu.querySelectorAll(":scope > p:not(.ending-type), :scope > .final-message");
const phrases=[];
elements.forEach(element=>{
const morceaux=element.textContent.trim().match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g);
if(morceaux){
morceaux.forEach(phrase=>{
const texte=phrase.trim();
if(texte){
phrases.push({
texte:texte,
element:element
});
}
});
}
});
return phrases;
}
function analyserPhrase(texte){
const phrase=texte.toLowerCase();
let rate=0.96;
let pitch=0.8;
let volume=1;
let pauseAvant=80;
let pauseApres=180;
let musique=0.25;
if(
phrase.includes("silence")||
phrase.includes("brouillard")||
phrase.includes("abandonné")||
phrase.includes("obscurité")||
phrase.includes("étrangement")
){
rate=0.91;
pitch=0.76;
pauseAvant=180;
pauseApres=300;
musique=0.23;
}
if(
phrase.includes("soudain")||
phrase.includes("quelque chose")||
phrase.includes("bruit")||
phrase.includes("derrière toi")||
phrase.includes("clignote")
){
rate=0.9;
pitch=0.72;
pauseAvant=250;
pauseApres=350;
musique=0.21;
}
if(
phrase.includes("tu reconnais")||
phrase.includes("c'est toi")||
phrase.includes("subject 07")||
phrase.includes("sujet 07")
){
rate=0.86;
pitch=0.69;
pauseAvant=350;
pauseApres=500;
musique=0.2;
}
if(
phrase.includes("souvenir")||
phrase.includes("mémoire")||
phrase.includes("vérité")||
phrase.includes("enfance")
){
rate=0.9;
pitch=0.74;
pauseAvant=200;
pauseApres=350;
musique=0.22;
}
if(
phrase.includes("tu cours")||
phrase.includes("plus le temps")||
phrase.includes("quitter")||
phrase.includes("fuir")||
phrase.includes("fuite")
){
rate=1.06;
pitch=0.8;
pauseAvant=40;
pauseApres=100;
musique=0.3;
}
if(phrase.includes("cet enfant, c'est toi")){
rate=0.82;
pitch=0.66;
pauseAvant=500;
pauseApres=700;
musique=0.18;
}
if(phrase.includes("blackwood ne t'a jamais oublié")){
rate=0.78;
pitch=0.63;
pauseAvant=650;
pauseApres=900;
musique=0.17;
}
return{
rate,
pitch,
volume,
pauseAvant,
pauseApres,
musique
};
}
function mettrePhraseEnValeur(element){
document.querySelectorAll(".narration-active").forEach(item=>{
item.classList.remove("narration-active");
});
if(element){
element.classList.remove("narration-lue");
element.classList.add("narration-active");
}
}
function marquerParagrapheLu(element,phrases,index){
if(!element)return;
const resteDuParagraphe=phrases.slice(index+1).some(phrase=>phrase.element===element);
if(!resteDuParagraphe){
element.classList.remove("narration-active");
element.classList.add("narration-lue");
}
}
function retirerMiseEnValeur(){
document.querySelectorAll(".narration-active").forEach(item=>{
item.classList.remove("narration-active");
});
}
function parlerPhrase(phrases,index,voix,id){
if(id!==narrationId)return;
if(index>=phrases.length){
narrationEnCours=false;
narrationTerminee=true;
retirerMiseEnValeur();
changerVolumeMusique(0.55,1200);
return;
}
const phrase=phrases[index];
const reglages=analyserPhrase(phrase.texte);
mettrePhraseEnValeur(phrase.element);
changerVolumeMusique(reglages.musique,350);
setTimeout(()=>{
if(id!==narrationId)return;
const lecture=new SpeechSynthesisUtterance(phrase.texte);
lecture.lang="fr-FR";
lecture.rate=reglages.rate;
lecture.pitch=reglages.pitch;
lecture.volume=reglages.volume;
if(voix){
lecture.voice=voix;
}
lecture.onstart=()=>{
narrationEnCours=true;
};
lecture.onend=()=>{
marquerParagrapheLu(phrase.element,phrases,index);
setTimeout(()=>{
parlerPhrase(phrases,index+1,voix,id);
},reglages.pauseApres);
};
lecture.onerror=()=>{
narrationEnCours=false;
retirerMiseEnValeur();
changerVolumeMusique(0.55,700);
};
window.speechSynthesis.resume();
window.speechSynthesis.speak(lecture);
},reglages.pauseAvant);
}
function lancerNarration(){
if(document.body.classList.contains("home"))return;
if(narrationEnCours||narrationTerminee)return;
const phrases=obtenirPhrases();
if(!phrases.length){
changerVolumeMusique(0.55,800);
return;
}
window.speechSynthesis.cancel();
window.speechSynthesis.resume();
narrationId++;
const id=narrationId;
narrationEnCours=true;
const voix=trouverVoixHomme();
changerVolumeMusique(0.25,700);
setTimeout(()=>{
parlerPhrase(phrases,0,voix,id);
},700);
}
function activerAudio(){
sessionStorage.setItem("blackwoodAudioActive","true");
const musique=obtenirMusique();
if(musique){
musique.volume=narrationEnCours?0.25:0.55;
musique.play().catch(()=>{});
}
if(
"speechSynthesis" in window&&
!document.body.classList.contains("home")&&
!narrationEnCours&&
!narrationTerminee
){
window.speechSynthesis.resume();
lancerNarration();
}
}
function preparerInteractionAudio(){
document.addEventListener("click",activerAudio,{once:true});
document.addEventListener("keydown",activerAudio,{once:true});
}
document.addEventListener("keydown",event=>{
if(event.key==="Escape"){
fermerDossier();
}
});
window.addEventListener("beforeunload",()=>{
narrationId++;
window.speechSynthesis.cancel();
const musique=obtenirMusique();
if(musique){
sessionStorage.setItem("blackwoodMusicTime",musique.currentTime);
}
});
document.addEventListener("DOMContentLoaded",()=>{
if(!document.body.classList.contains("home")){
creerDossier();
}
const startButton=document.querySelector(".start-button");
if(startButton){
startButton.addEventListener("click",recommencerPartie);
}
reglerMusique();
preparerInteractionAudio();
if(
"speechSynthesis" in window&&
!document.body.classList.contains("home")
){
const essayerNarration=()=>{
if(!narrationEnCours&&!narrationTerminee){
lancerNarration();
}
};
const voixDisponibles=window.speechSynthesis.getVoices();
if(voixDisponibles.length){
setTimeout(essayerNarration,500);
}else{
window.speechSynthesis.addEventListener("voiceschanged",()=>{
setTimeout(essayerNarration,300);
},{once:true});
}
setTimeout(essayerNarration,1500);
}
});