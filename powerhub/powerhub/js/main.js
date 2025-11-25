// Main page interactions (tilt effects, simple UI helpers)
document.addEventListener('DOMContentLoaded', () => {
  // CTA smooth scroll (if needed) and small interactions
  document.querySelectorAll('.glass-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.classList.add('hovering'))
    btn.addEventListener('mouseleave', () => btn.classList.remove('hovering'))
  })

  // simple tilt effect for elements with .tilt based on mouse position
  const tilts = document.querySelectorAll('.tilt');
  tilts.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = (y / rect.height) * -8;
      const ry = (x / rect.width) * 10;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
    })
    el.addEventListener('mouseleave', () => el.style.transform = '')
  })

  // equipment row - allow drag scroll
  const rows = document.querySelectorAll('.equipment-row');
  rows.forEach(row => {
    let isDown = false, startX, scrollLeft;
    row.addEventListener('mousedown', (e) => {
      isDown = true; row.classList.add('active'); startX = e.pageX - row.offsetLeft; scrollLeft = row.scrollLeft;
    })
    row.addEventListener('mouseleave', () => { isDown = false; row.classList.remove('active') })
    row.addEventListener('mouseup', () => { isDown = false; row.classList.remove('active') })
    row.addEventListener('mousemove', (e) => {
      if(!isDown) return; e.preventDefault(); const x = e.pageX - row.offsetLeft; const walk = (x - startX) * 1.2; row.scrollLeft = scrollLeft - walk; 
    })
  })

  // ----------------- Firebase auth UI (if firebase present) -----------------
  function setupAuthUI(){
    if(typeof firebase === 'undefined' || !firebase.auth) return false;
    const userArea = document.getElementById('user-area');
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        if(userArea) userArea.innerHTML = `<a class="glass-btn" href="login.html">Login</a>`;
        return;
      }
      const display = user.email || user.phoneNumber || 'Member';
      if(userArea) userArea.innerHTML = `
        <div class="user-pill">
          <span class="user-name">${display}</span>
          <button id="signout-btn" class="glass-btn">Sign out</button>
        </div>
      `;

      const signOutBtn = document.getElementById('signout-btn');
      signOutBtn && signOutBtn.addEventListener('click', async () => {
        try{ await firebase.auth().signOut(); window.location.href = 'index.html'; }catch(e){console.error(e); alert('Sign-out error')}
      });
    })
    return true;
  }

  // try to wire auth UI (some pages load firebase-config later) — poll for availability up to a short timeout
  let tried = 0;
  const tryAuthInterval = setInterval(()=>{
    if(setupAuthUI() || tried++ > 8) clearInterval(tryAuthInterval);
  }, 300);
})
