const STORAGE_KEY='carteiraBentoDataV3';
const LEGACY_KEYS=['carteiraBentoDataV2','carteiraBentoDataV1'];
const defaultData={
  transactions:[],
  assets:[],
  investments:[],
  goals:[],
  preferences:{
    categories:{
      income:['Salário','Vale-refeição','Vale-alimentação','Freelance','Aluguel recebido','Outras receitas'],
      expense:['Restaurante','Supermercado','Moradia','Transporte','Saúde','Lazer','Assinaturas','Outras despesas'],
      passive:['Dividendos','Juros','Aluguel','Rendimentos']
    },
    sources:['Conta corrente','Dinheiro','Cartão de crédito','Vale-refeição','Vale-alimentação','PIX']
  }
};
let state=loadState();

function normalizeState(data){
  const normalized={...structuredClone(defaultData),...(data||{})};
  normalized.preferences={
    ...structuredClone(defaultData.preferences),
    ...((data||{}).preferences||{})
  };
  normalized.preferences.categories={
    ...structuredClone(defaultData.preferences.categories),
    ...(normalized.preferences.categories||{})
  };
  normalized.transactions=(normalized.transactions||[]).map(t=>({
    source:t.source||'Conta corrente',
    ...t
  }));
  return normalized;
}

function loadState(){
  try{
    let raw=localStorage.getItem(STORAGE_KEY);
    if(!raw){
      for(const key of LEGACY_KEYS){
        raw=localStorage.getItem(key);
        if(raw) break;
      }
    }
    return normalizeState(raw?JSON.parse(raw):null);
  }catch{
    return structuredClone(defaultData);
  }
}
function saveState(){
  state=normalizeState(state);
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
      state=normalizeState(JSON.parse(reader.result));
      saveState();
      showToast('Backup importado com sucesso.');
    }catch{
      alert('Arquivo de backup inválido.');
    }
  };
  reader.readAsText(file);
}
