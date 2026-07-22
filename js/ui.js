let currentSection='dashboard';

function switchSection(id){
  currentSection=id;
  $$('.content-section').forEach(s=>s.classList.toggle('active',s.id===id));
  $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.section===id));
  const titles={dashboard:'Visão geral',transactions:'Lançamentos',assets:'Patrimônio',investments:'Investimentos',goals:'Metas'};
  $('#pageTitle').textContent=titles[id];
  $('#sidebar').classList.remove('open');
  if(id==='dashboard')requestAnimationFrame(drawChart);
}
function fieldHtml(f){
  const cls=f.full?'form-field full':'form-field';
  if(f.type==='select'){
    return `<div class="${cls}"><label>${f.label}</label><select name="${f.name}" required>${f.options.map(o=>`<option value="${o.value}">${o.label}</option>`).join('')}</select></div>`;
  }
  return `<div class="${cls}"><label>${f.label}</label><input name="${f.name}" type="${f.type||'text'}" ${f.step?`step="${f.step}"`:''} ${f.value!==undefined?`value="${f.value}"`:''} ${f.placeholder?`placeholder="${f.placeholder}"`:''} ${f.required===false?'':'required'}></div>`;
}
function openModal(config){
  $('#modalEyebrow').textContent=config.eyebrow||'NOVO REGISTRO';
  $('#modalTitle').textContent=config.title;
  const form=$('#dynamicForm');
  form.innerHTML=`<div class="form-grid">${config.fields.map(fieldHtml).join('')}</div><div class="form-actions"><button type="button" class="ghost" id="cancelForm">Cancelar</button><button type="submit" class="primary">Salvar</button></div>`;
  $('#modalBackdrop').classList.add('show');
  $('#cancelForm').onclick=closeModal;
  form.onsubmit=e=>{e.preventDefault();config.onSubmit(Object.fromEntries(new FormData(form)));closeModal();};
}
function closeModal(){$('#modalBackdrop').classList.remove('show');}
