function openTransaction(){
  openModal({
    title:'Novo lançamento',
    fields:[
      {name:'description',label:'Descrição',placeholder:'Ex.: Salário, supermercado...',full:true},
      {name:'type',label:'Tipo',type:'select',options:[{value:'income',label:'Receita'},{value:'expense',label:'Despesa'},{value:'passive',label:'Renda passiva'}]},
      {name:'category',label:'Categoria',placeholder:'Ex.: Moradia'},
      {name:'value',label:'Valor',type:'number',step:'0.01'},
      {name:'date',label:'Data',type:'date',value:today()}
    ],
    onSubmit:d=>{state.transactions.push({...d,id:newId(),value:Number(d.value)});saveState();showToast('Lançamento salvo.');}
  });
}
function renderTransactions(){
  const filter=$('#transactionFilter').value;
  const items=[...state.transactions].filter(t=>filter==='all'||t.type===filter).sort((a,b)=>b.date.localeCompare(a.date));
  const body=$('#transactionsTable');
  if(!items.length){body.innerHTML='<tr><td colspan="6"><div class="empty-state">Nenhum lançamento encontrado.</div></td></tr>';return;}
  body.innerHTML=items.map(t=>`<tr>
    <td><strong>${escapeHtml(t.description)}</strong></td>
    <td>${escapeHtml(t.category)}</td>
    <td>${formatDate(t.date)}</td>
    <td><span class="badge ${t.type}">${typeLabel(t.type)}</span></td>
    <td class="amount ${t.type==='expense'?'negative':'positive'}">${t.type==='expense'?'-':'+'} ${money(t.value)}</td>
    <td><button class="delete-btn" onclick="removeItem('transactions','${t.id}')">×</button></td>
  </tr>`).join('');
}
function renderRecentTransactions(){
  const el=$('#recentTransactions');
  const items=[...state.transactions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  if(!items.length){el.innerHTML='<div class="empty-state">Nenhum lançamento ainda.</div>';return;}
  el.innerHTML=items.map(t=>`<div class="list-item">
    <div class="item-left"><div class="item-icon">${t.type==='income'?'↗':t.type==='passive'?'◆':'↘'}</div>
    <div><div class="item-title">${escapeHtml(t.description)}</div><div class="item-sub">${escapeHtml(t.category)} • ${formatDate(t.date)}</div></div></div>
    <div class="amount ${t.type==='expense'?'negative':'positive'}">${t.type==='expense'?'-':'+'} ${money(t.value)}</div>
  </div>`).join('');
}
