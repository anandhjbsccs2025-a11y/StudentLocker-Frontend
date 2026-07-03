/* Renders category document pages */
function renderDocPage(category, tiles){
  const grid = document.getElementById('docGrid');
  const docs = getDocs().filter(d=>d.category===category);

  // Document permissions
  // Personal documents: upload, view and download are all allowed.
  // (This page implements View + Download; Upload UI is handled elsewhere.)
  const canUpload = category === 'personal';
  const canView = category === 'personal';
  const canDownload = category === 'personal';



  grid.innerHTML = tiles.map(t=>{
    const found = docs.find(d=>d.title===t.title);
    return `
      <div class="sl-card doc-card">
        <div class="sl-icon-circle"><i class="fas ${t.icon}"></i></div>
        <h5>${t.title}</h5>
        <p class="text-muted small mb-0">${found?('Uploaded: '+new Date(found.uploaded).toLocaleDateString()):'Not uploaded yet'}</p>
        <div class="actions">
          ${found?``:`<span class="text-muted small">Not uploaded yet</span>`}


          ${found?`
            ${canView ? `
              <button class="btn btn-outline-primary" onclick="previewDoc(${found.id})"><i class="fas fa-eye me-1"></i>View</button>
            ` : ''}
            ${canDownload ? `
              <button class="btn btn-outline-primary" onclick="downloadDoc(${found.id})"><i class="fas fa-download me-1"></i>Download</button>
            ` : ''}
            <button class="btn btn-outline-danger" onclick="removeDoc(${found.id})"><i class="fas fa-trash me-1"></i>Delete</button>
          `:''}

        </div>
      </div>`;
  }).join('');
}

function previewDoc(id){
  const d = getDocs().find(x=>x.id===id); if(!d) return;
  const body = document.getElementById('previewBody');
  if(d.dataUrl && d.type && d.type.startsWith('image/')){
    body.innerHTML = `<img src="${d.dataUrl}" class="img-fluid rounded" alt="preview">`;
  } else if(d.dataUrl && d.type === 'application/pdf'){
    body.innerHTML = `<iframe src="${d.dataUrl}" style="width:100%;height:70vh;border:0"></iframe>`;
  } else {
    body.innerHTML = `<div class="text-center p-4"><i class="fas fa-file-alt fa-3x text-primary mb-3"></i><h5>${d.title}</h5><p class="text-muted">Preview not available</p></div>`;
  }
  document.getElementById('previewTitle').textContent = d.title;
  new bootstrap.Modal(document.getElementById('previewModal')).show();
}
function downloadDoc(id){
  const d = getDocs().find(x=>x.id===id); if(!d) return;
  if(d.dataUrl){
    const a = document.createElement('a'); a.href = d.dataUrl; a.download = d.filename || d.title; a.click();
  } else slToast('No file to download','error');
}
function removeDoc(id){
  if(!confirm('Delete this document?')) return;
  deleteDoc(id); slToast('Document deleted','success');
  location.reload();
}
