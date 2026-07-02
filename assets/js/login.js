/* Login + registration handlers */
function handleLogin(formId, role){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const emailEl = form.querySelector('[name="email"]');
    const pwEl = form.querySelector('[name="password"]');
    const email = (emailEl?.value || '').trim();
    const pw = pwEl?.value || '';
    if(!isEmail(email)) return slToast('Please enter a valid email', 'error');
    if(pw.length < 6) return slToast('Password must be at least 6 characters', 'error');
    slLoader(true);
    setTimeout(()=>{
      slLoader(false);
      const name = email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, c=>c.toUpperCase());
      localStorage.setItem('sl_user', JSON.stringify({name, email, role}));
      slToast('Login successful', 'success');
      setTimeout(()=>location.href = role==='teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html', 500);
    }, 900);
  });
}

function handleRegister(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  const pw = form.querySelector('input[name="password"]') || form.password;
  const meter = form.querySelector('.pw-meter');
  if(pw && meter) bindStrengthMeter(pw, meter);
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(!data.fullName || data.fullName.length < 3) return slToast('Enter your full name', 'error');
    if(!data.registerNumber) return slToast('Register number required', 'error');
    if(!data.department) return slToast('Select a department', 'error');
    if(!isEmail(data.email)) return slToast('Enter a valid college email', 'error');
    if(!isMobile(data.mobile)) return slToast('Enter a valid 10-digit mobile', 'error');
    if(data.password !== data.confirmPassword) return slToast('Passwords do not match', 'error');
    if(passwordStrength(data.password) < 2) return slToast('Password too weak', 'error');
    slLoader(true);
    setTimeout(()=>{
      slLoader(false);
      slToast('Registration successful! Redirecting to login...', 'success');
      setTimeout(()=>location.href='index.html', 900);
    }, 900);
  });
}
