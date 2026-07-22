const STORAGE_KEY='carteiraBentoDataV2';
const defaultData={transactions:[],assets:[],investments:[],goals:[]};
let state=loadState();

function loadState(){
  try{return {...defaultData,...(JSON.parse(localStorage.getItem(STORAGE_KEY))||{})};}
  catch{return structuredClone(defaultData);}
}
function saveState(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  renderAll();
}
function resetState(){
  state=structuredClone(defaultData);
  saveState();
}
function exportBackup(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`carteira-bento-backup-${today()}.json`;a.click();
  URL.revokeObjectURL(url);
}
function importBackup(file){
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const parsed=JSON.parse(reader.result);
      state={...defaultData,...parsed};
      saveState();
      showToast('Backup importado com sucesso.');
    }catch{
      alert('Arquivo de backup inválido.');
    }
  };
  reader.readAsText(file);
}
