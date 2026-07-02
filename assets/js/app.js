/* Student Details Locker - Shared App JS */
(function(){
  // Apply saved theme
  const theme = localStorage.getItem('sl_theme') || 'light';
  if(theme === 'dark') document.body.classList.add('dark-mode');
})();

// ---- Toast ----
function slToast(msg, type='info'){
  const t = document.createElement('div');
  t.className = 'sl-toast ' + type;
  t.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':type==='error'?'times-circle':'info-circle'} me-2"></i>${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(), 300); }, 2800);
}

// ---- Loader ----
function slLoader(show){
  let l = document.getElementById('sl-full-loader');
  if(!l){
    l = document.createElement('div');
    l.id = 'sl-full-loader';
    l.className = 'full-loader';
    l.innerHTML = '<span class="loader"></span>';
    document.body.appendChild(l);
  }
  l.classList.toggle('show', !!show);
}

// ---- Password visibility toggle ----
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.toggle-pw');
  if(!btn) return;
  const input = btn.parentElement.querySelector('input');
  if(!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.innerHTML = input.type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// ---- Sidebar toggle ----
document.addEventListener('click', (e)=>{
  if(e.target.closest('#sidebarToggle')){
    document.querySelector('.sl-sidebar')?.classList.toggle('open');
    document.querySelector('.sl-backdrop')?.classList.toggle('show');
  }
  if(e.target.classList.contains('sl-backdrop')){
    document.querySelector('.sl-sidebar')?.classList.remove('open');
    e.target.classList.remove('show');
  }
});

// ---- Logout ----
function slLogout(){
  localStorage.removeItem('sl_user');
  slToast('Logged out successfully', 'success');
  setTimeout(()=>location.href='index.html', 600);
}

// Mark active sidebar link
document.addEventListener('DOMContentLoaded', ()=>{
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.sl-sidebar a.nav-item').forEach(a=>{
    if(a.getAttribute('href') === page) a.classList.add('active');
  });
  // Personalize welcome
  const user = JSON.parse(localStorage.getItem('sl_user') || '{}');
  document.querySelectorAll('[data-user-name]').forEach(el=>{
    el.textContent = user.name || 'Student';
  });
});

// ---- Theme switch ----
function slSetTheme(mode){
  document.body.classList.toggle('dark-mode', mode==='dark');
  localStorage.setItem('sl_theme', mode);
}
