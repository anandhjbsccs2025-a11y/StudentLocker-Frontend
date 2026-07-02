/* Dashboard-specific interactions */

// ---- Document store (localStorage) ----
const DOC_KEY = 'sl_docs';
function getDocs(){ try{return JSON.parse(localStorage.getItem(DOC_KEY)||'[]')}catch(e){return []} }
function saveDocs(list){ localStorage.setItem(DOC_KEY, JSON.stringify(list)) }
function addDoc(doc){ const l = getDocs(); l.push(Object.assign({id:Date.now(), uploaded:new Date().toISOString()}, doc)); saveDocs(l); return l }
function deleteDoc(id){ saveDocs(getDocs().filter(d=>d.id!==id)) }
function countByCategory(cat){ return getDocs().filter(d=>d.category===cat).length }

// Render count badges on dashboard cards
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-doc-count]').forEach(el=>{
    const cat = el.getAttribute('data-doc-count');
    el.textContent = countByCategory(cat) + ' documents';
  });
});

// ---- Student store (teacher side) ----
const STUD_KEY = 'sl_students';
function getStudents(){
  try{
    const s = JSON.parse(localStorage.getItem(STUD_KEY)||'null');
    if(s) return s;
  }catch(e){}
  const seed = [
    {id:1, name:'Aarav Kumar', reg:'CS21001', dept:'CSE', cls:'III-A', umis:'UMIS100001', email:'aarav@college.edu', verified:true},
    {id:2, name:'Diya Sharma', reg:'EC21014', dept:'ECE', cls:'III-B', umis:'UMIS100002', email:'diya@college.edu', verified:false},
    {id:3, name:'Rohan Verma', reg:'ME21033', dept:'MECH', cls:'II-A', umis:'UMIS100003', email:'rohan@college.edu', verified:true},
    {id:4, name:'Isha Patel', reg:'CS21050', dept:'CSE', cls:'II-B', umis:'UMIS100004', email:'isha@college.edu', verified:false},
  ];
  localStorage.setItem(STUD_KEY, JSON.stringify(seed));
  return seed;
}
function saveStudents(list){ localStorage.setItem(STUD_KEY, JSON.stringify(list)) }
