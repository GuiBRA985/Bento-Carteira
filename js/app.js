function renderAll(){
  renderDashboardMetrics();renderHealth();renderRecentTransactions();renderTransactions();
  renderAssets();renderInvestments();renderGoals();renderAssetSummary();
  requestAnimationFrame(drawChart);
}

document.addEventListener('DOMContentLoaded',()=>{
  $$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>switchSection(btn.dataset.section)));
  $$('[data-section-jump]').forEach(btn=>btn.addEventListener('click',()=>switchSection(btn.dataset.sectionJump)));
  $('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
  $('#closeModal').onclick=closeModal;
  $('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal()});

  $('#newEntryBtn').onclick=openTransaction;
  $('#newEntryBtn2').onclick=openTransaction;
  $('#newAssetBtn').onclick=openAsset;
  $('#newInvestmentBtn').onclick=openInvestment;
  $('#newGoalBtn').onclick=openGoal;

  $('#transactionFilter').onchange=renderTransactions;
  $('#chartPeriod').onchange=drawChart;

  $('#clearBtn').onclick=()=>{if(confirm('Isso apagará todos os dados salvos neste navegador. Continuar?')){resetState();showToast('Todos os dados foram apagados.')}};
  $('#exportBtn').onclick=()=>{exportBackup();showToast('Backup exportado.')};
  $('#importInput').onchange=e=>{if(e.target.files[0])importBackup(e.target.files[0])};

  $('#createUserBtn').onclick=()=>openModal({
    eyebrow:'CONTA BENTO',
    title:'Criar usuário',
    fields:[
      {name:'name',label:'Seu nome',full:true},
      {name:'email',label:'E-mail',type:'email',full:true},
      {name:'password',label:'Senha',type:'password',full:true}
    ],
    onSubmit:()=>showToast('Cadastro demonstrativo. A integração com Supabase virá na próxima etapa.')
  });

  window.addEventListener('resize',()=>{if(currentSection==='dashboard')drawChart()});
  renderAll();
});
