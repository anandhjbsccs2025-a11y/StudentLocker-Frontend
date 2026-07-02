/* Shared layout injector for dashboard pages */
const STUDENT_MENU = [
  ['student-dashboard.html','fa-th-large','Dashboard'],
  ['profile.html','fa-user','Profile'],
  ['edit-profile.html','fa-user-edit','Edit Profile'],
  ['personal-documents.html','fa-id-card','Personal Documents'],
  ['online-certificates.html','fa-cloud','Online Certificates'],
  ['offline-certificates.html','fa-folder-open','Offline Certificates'],
  ['academic-certificates.html','fa-graduation-cap','Academic Certificates'],
  ['upload-document.html','fa-upload','Upload Document'],
  ['change-password.html','fa-lock','Change Password'],
  ['change-email.html','fa-envelope','Change Email'],
  ['settings.html','fa-cog','Settings'],
  ['notifications.html','fa-bell','Notifications'],
];
const TEACHER_MENU = [
  ['teacher-dashboard.html','fa-th-large','Dashboard'],
  ['add-student.html','fa-user-plus','Add Student'],
  ['search-student.html','fa-search','Search Student'],
  ['verify-student.html','fa-user-check','Verify Student'],
  ['profile.html','fa-user','Profile'],
  ['settings.html','fa-cog','Settings'],
  ['notifications.html','fa-bell','Notifications'],
];

function renderLayout(){
  const app = document.querySelector('[data-layout]');
  if(!app) return;
  const role = app.getAttribute('data-layout'); // 'student' | 'teacher'
  const menu = role==='teacher' ? TEACHER_MENU : STUDENT_MENU;
  const user = JSON.parse(localStorage.getItem('sl_user')||'{}');
  const name = user.name || (role==='teacher'?'Teacher':'Student');

  const sidebar = `
    <aside class="sl-sidebar">
      <a class="sl-brand" href="${role==='teacher'?'teacher-dashboard.html':'student-dashboard.html'}">
        <i class="fas fa-graduation-cap"></i> Student Locker
      </a>
      <nav>
        ${menu.map(([h,i,l])=>`<a class="nav-item" href="${h}"><i class="fas ${i}"></i>${l}</a>`).join('')}
        <a class="nav-item" href="#" onclick="event.preventDefault();slLogout()"><i class="fas fa-sign-out-alt"></i>Logout</a>
      </nav>
    </aside>
    <div class="sl-backdrop"></div>
  `;
  const navbar = `
    <header class="sl-navbar">
      <button class="icon-btn d-lg-none" id="sidebarToggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
      <div class="sl-brand d-lg-none"><i class="fas fa-graduation-cap"></i></div>
      <div class="d-none d-md-block">
        <strong>Welcome, ${role==='teacher'?'Prof. ':''}<span data-user-name>${name}</span></strong>
        <div class="text-muted" style="font-size:.85rem">${role==='teacher'?'Teacher':'Student'} Portal</div>
      </div>
      <div class="spacer"></div>
      <a href="notifications.html" class="icon-btn" aria-label="Notifications"><i class="fas fa-bell"></i><span class="badge-dot"></span></a>
      <a href="profile.html" class="icon-btn" aria-label="Profile"><i class="fas fa-user-circle" style="font-size:1.4rem"></i></a>
      <button class="icon-btn" onclick="slLogout()" aria-label="Logout"><i class="fas fa-sign-out-alt"></i></button>
    </header>
  `;
  const content = app.innerHTML;
  app.classList.add('sl-app');
  app.innerHTML = sidebar + `<main class="sl-main">${navbar}<div class="sl-content">${content}</div></main>`;
}
document.addEventListener('DOMContentLoaded', renderLayout);
