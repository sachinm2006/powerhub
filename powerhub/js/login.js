document.addEventListener('DOMContentLoaded', () => {
  const emailBtn = document.getElementById('show-email');
  const phoneBtn = document.getElementById('show-phone');
  const emailSection = document.getElementById('email-section');
  const phoneSection = document.getElementById('phone-section');

  emailBtn.addEventListener('click', () => {
    emailBtn.classList.add('active'); phoneBtn.classList.remove('active'); emailSection.classList.remove('hidden'); phoneSection.classList.add('hidden');
  })
  phoneBtn.addEventListener('click', () => {
    phoneBtn.classList.add('active'); emailBtn.classList.remove('active'); phoneSection.classList.remove('hidden'); emailSection.classList.add('hidden');
  })

  // ----- email sign-in -----
  const emailLoginBtn = document.getElementById('email-login');
  emailLoginBtn && emailLoginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    if(!email || !pass) return alert('Please enter email and password');
    try{
      // Requires firebase-config.js to initialize firebase
      const result = await firebase.auth().signInWithEmailAndPassword(email, pass);
      alert('Signed in as ' + result.user.email);
      window.location.href = 'index.html';
    }catch(err){
      console.error(err); alert('Sign-in failed: '+err.message);
    }
  })

  // ----- phone sign-in (OTP) -----
  let recaptchaVerifier = null;
  let confirmationResult = null;
  const phoneSendBtn = document.getElementById('phone-send');
  const phoneVerifyBtn = document.getElementById('phone-verify');

  phoneSendBtn && phoneSendBtn.addEventListener('click', async () => {
    const phone = document.getElementById('phone').value;
    if(!phone) return alert('Enter phone number with country code, e.g. +1 555 555 1212');

    try{
      // create invisible reCAPTCHA
      if(!recaptchaVerifier){
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {size: 'invisible'});
        recaptchaVerifier.render();
      }

      confirmationResult = await firebase.auth().signInWithPhoneNumber(phone.replace(/\s+/g,''), recaptchaVerifier);
      document.getElementById('otp').classList.remove('hidden');
      document.getElementById('phone-verify').classList.remove('hidden');
      alert('OTP sent to ' + phone);
    }catch(err){
      console.error(err); alert('Phone auth error: ' + err.message);
    }
  })

  phoneVerifyBtn && phoneVerifyBtn.addEventListener('click', async () => {
    const code = document.getElementById('otp').value;
    if(!code) return alert('Enter OTP');
    try{
      const confirmed = await confirmationResult.confirm(code);
      alert('Phone sign-in success: ' + confirmed.user.phoneNumber);
      window.location.href = 'index.html';
    }catch(err){console.error(err);alert('OTP verification error: '+ err.message)}
  })

})
