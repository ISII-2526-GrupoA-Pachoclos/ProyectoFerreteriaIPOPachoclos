document.addEventListener('DOMContentLoaded', () => {
  const panelLogin = document.getElementById('panel-login');
  const panelRegister = document.getElementById('panel-register');
  const confirmationMessage = document.getElementById('confirmation-message');
  const confirmationTitle = document.getElementById('confirmation-title');
  const confirmationText = document.getElementById('confirmation-text');

  const switchToRegister = document.getElementById('switch-to-register');
  const switchToLogin = document.getElementById('switch-to-login');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const btnBackToHome = document.getElementById('btn-back-to-home');

  // Variables para controlar los overlays de error
  let errorLoginOverlay = null;
  let errorRegisterOverlay = null;

  // Función para mostrar error en un campo
  function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputWrapper = document.getElementById(inputId)?.closest('.input-wrapper');
    
    if (errorElement && message) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
      inputWrapper?.classList.add('error');
    }
  }

  // Función para limpiar error de un campo
  function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputWrapper = document.getElementById(inputId)?.closest('.input-wrapper');
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
      inputWrapper?.classList.remove('error');
    }
  }

  // Función para limpiar todos los errores
  function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(error => {
      error.textContent = '';
      error.classList.remove('show');
    });
    document.querySelectorAll('.input-wrapper').forEach(wrapper => {
      wrapper.classList.remove('error');
    });
  }

  // Función para mostrar popup de error de usuario no registrado (Login)
  function showErrorLoginPopup() {
    if (errorLoginOverlay) return;

    errorLoginOverlay = document.createElement('div');
    Object.assign(errorLoginOverlay.style, {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 10000,
      animation: 'fadeIn 0.2s ease-in-out'
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      width: '90%', maxWidth: '450px', background: '#fff',
      borderRadius: '12px', padding: '40px 32px', position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)', textAlign: 'center',
      animation: 'slideIn 0.3s ease-out'
    });

    const icon = document.createElement('div');
    icon.innerHTML = '🚫';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '20px';

    const messageText = document.createElement('p');
    messageText.textContent = 'Usted no está registrado en nuestro sistema.';
    Object.assign(messageText.style, {
      fontSize: '18px', color: '#333', marginBottom: '28px',
      lineHeight: '1.5', fontWeight: '500'
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Aceptar';
    Object.assign(closeBtn.style, {
      padding: '12px 32px', background: '#ff4444', color: '#fff',
      border: 'none', borderRadius: '25px', fontSize: '16px',
      fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(255, 68, 68, 0.3)'
    });

    closeBtn.addEventListener('mouseover', () => {
      closeBtn.style.background = '#ff2222';
      closeBtn.style.transform = 'translateY(-2px)';
      closeBtn.style.boxShadow = '0 6px 16px rgba(255, 68, 68, 0.4)';
    });

    closeBtn.addEventListener('mouseout', () => {
      closeBtn.style.background = '#ff4444';
      closeBtn.style.transform = 'translateY(0)';
      closeBtn.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.3)';
    });

    closeBtn.addEventListener('click', closeErrorLoginPopup);

    panel.appendChild(icon);
    panel.appendChild(messageText);
    panel.appendChild(closeBtn);
    errorLoginOverlay.appendChild(panel);
    document.body.appendChild(errorLoginOverlay);

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar popup de error de usuario no registrado (Login)
  function closeErrorLoginPopup() {
    if (!errorLoginOverlay) return;
    errorLoginOverlay.remove();
    errorLoginOverlay = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Función para mostrar popup de error de usuario ya registrado (Registro)
  function showErrorRegisterPopup() {
    if (errorRegisterOverlay) return;

    errorRegisterOverlay = document.createElement('div');
    Object.assign(errorRegisterOverlay.style, {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 10000,
      animation: 'fadeIn 0.2s ease-in-out'
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      width: '90%', maxWidth: '450px', background: '#fff',
      borderRadius: '12px', padding: '40px 32px', position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)', textAlign: 'center',
      animation: 'slideIn 0.3s ease-out'
    });

    const icon = document.createElement('div');
    icon.innerHTML = '⚠️';
    icon.style.fontSize = '64px';
    icon.style.marginBottom = '20px';

    const messageText = document.createElement('p');
    messageText.textContent = 'Este usuario ya está registrado en nuestro sistema. Por favor, inicia sesión o utiliza un correo electrónico diferente.';
    Object.assign(messageText.style, {
      fontSize: '18px', color: '#333', marginBottom: '28px',
      lineHeight: '1.5', fontWeight: '500'
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Aceptar';
    Object.assign(closeBtn.style, {
      padding: '12px 32px', background: '#ff8c42', color: '#fff',
      border: 'none', borderRadius: '25px', fontSize: '16px',
      fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(255, 140, 66, 0.3)'
    });

    closeBtn.addEventListener('mouseover', () => {
      closeBtn.style.background = '#ff7722';
      closeBtn.style.transform = 'translateY(-2px)';
      closeBtn.style.boxShadow = '0 6px 16px rgba(255, 140, 66, 0.4)';
    });

    closeBtn.addEventListener('mouseout', () => {
      closeBtn.style.background = '#ff8c42';
      closeBtn.style.transform = 'translateY(0)';
      closeBtn.style.boxShadow = '0 4px 12px rgba(255, 140, 66, 0.3)';
    });

    closeBtn.addEventListener('click', closeErrorRegisterPopup);

    panel.appendChild(icon);
    panel.appendChild(messageText);
    panel.appendChild(closeBtn);
    errorRegisterOverlay.appendChild(panel);
    document.body.appendChild(errorRegisterOverlay);

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar popup de error de usuario ya registrado (Registro)
  function closeErrorRegisterPopup() {
    if (!errorRegisterOverlay) return;
    errorRegisterOverlay.remove();
    errorRegisterOverlay = null;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Validar email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validar contraseña
  function validatePassword(password) {
    // Contraseña: 8-20 caracteres, al menos una letra y un número
    if (password.length < 8) {
      return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres.' };
    }
    if (password.length > 20) {
      return { valid: false, message: 'La contraseña no puede tener más de 20 caracteres.' };
    }
    if (!/[a-zA-Z]/.test(password)) {
      return { valid: false, message: 'La contraseña debe contener al menos una letra.' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'La contraseña debe contener al menos un número.' };
    }
    // Caracteres no permitidos
    if (/[<>'"\\]/.test(password)) {
      return { valid: false, message: 'La contraseña contiene caracteres no permitidos: < > \' " \\' };
    }
    return { valid: true };
  }

  // Validar nombre
  function validateName(name) {
    if (name.trim().length < 3) {
      return { valid: false, message: 'El nombre debe tener al menos 3 caracteres.' };
    }
    if (name.trim().length > 100) {
      return { valid: false, message: 'El nombre no puede tener más de 100 caracteres.' };
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/.test(name)) {
      return { valid: false, message: 'El nombre solo puede contener letras, espacios y guiones.' };
    }
    return { valid: true };
  }

  // Validar fecha de nacimiento (DD/MM/YYYY)
  function validateBirthdate(birthdate) {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = birthdate.match(dateRegex);
    
    if (!match) {
      return { valid: false, message: 'El formato debe ser DD/MM/YYYY (ejemplo: 15/03/1990).' };
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    if (month < 1 || month > 12) {
      return { valid: false, message: 'El mes debe estar entre 01 y 12.' };
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return { valid: false, message: `El día debe estar entre 01 y ${daysInMonth} para el mes ${month}.` };
    }

    const date = new Date(year, month - 1, day);
    const today = new Date();
    
    if (date >= today) {
      return { valid: false, message: 'La fecha de nacimiento debe ser anterior a hoy.' };
    }

    const age = today.getFullYear() - year;
    if (age < 18) {
      return { valid: false, message: 'Debes ser mayor de 18 años para registrarte.' };
    }

    if (age > 120) {
      return { valid: false, message: 'La fecha de nacimiento no es válida.' };
    }

    return { valid: true };
  }

  // Validar DNI/NIE
  function validateDNI(dni) {
    dni = dni.toUpperCase().replace(/\s/g, '');
    
    // Formato: 8 dígitos + letra
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;
    
    if (!dniRegex.test(dni) && !nieRegex.test(dni)) {
      return { valid: false, message: 'El formato debe ser 12345678A o X1234567A.' };
    }

    // Validar letra del DNI
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let number;

    if (nieRegex.test(dni)) {
      // Convertir NIE a número
      const niePrefix = { 'X': 0, 'Y': 1, 'Z': 2 };
      number = niePrefix[dni.charAt(0)] + dni.substr(1, 7);
    } else {
      number = dni.substr(0, 8);
    }

    const calculatedLetter = letters[parseInt(number) % 23];
    const providedLetter = dni.charAt(dni.length - 1);

    if (calculatedLetter !== providedLetter) {
      return { valid: false, message: `La letra del DNI/NIE no es correcta. Debería ser ${calculatedLetter}.` };
    }

    return { valid: true };
  }

  // Validar dirección
  function validateAddress(address) {
    if (address.trim().length < 10) {
      return { valid: false, message: 'La dirección debe tener al menos 10 caracteres.' };
    }
    if (address.trim().length > 200) {
      return { valid: false, message: 'La dirección no puede tener más de 200 caracteres.' };
    }
    return { valid: true };
  }

  // Formatear fecha mientras se escribe
  const birthdateInput = document.getElementById('register-birthdate');
  if (birthdateInput) {
    birthdateInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      if (value.length >= 5) {
        value = value.slice(0, 5) + '/' + value.slice(5, 9);
      }
      
      e.target.value = value;
    });
  }

  // Formatear DNI mientras se escribe (convertir a mayúsculas)
  const dniInput = document.getElementById('register-dni');
  if (dniInput) {
    dniInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
  }

  // Validación en tiempo real para login
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');

  loginEmail?.addEventListener('blur', () => {
    const value = loginEmail.value.trim();
    clearError('login-email');
    
    if (value && !validateEmail(value)) {
      showError('login-email', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "' + value + '" no incluye el signo "@".');
    }
  });

  loginPassword?.addEventListener('blur', () => {
    const value = loginPassword.value;
    clearError('login-password');
    
    if (value) {
      const validation = validatePassword(value);
      if (!validation.valid) {
        showError('login-password', validation.message);
      }
    }
  });

  // Validación en tiempo real para registro
  const registerName = document.getElementById('register-name');
  const registerBirthdate = document.getElementById('register-birthdate');
  const registerDni = document.getElementById('register-dni');
  const registerAddress = document.getElementById('register-address');
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');

  registerName?.addEventListener('blur', () => {
    const value = registerName.value.trim();
    clearError('register-name');
    
    if (value) {
      const validation = validateName(value);
      if (!validation.valid) {
        showError('register-name', validation.message);
      }
    }
  });

  registerBirthdate?.addEventListener('blur', () => {
    const value = registerBirthdate.value.trim();
    clearError('register-birthdate');
    
    if (value) {
      const validation = validateBirthdate(value);
      if (!validation.valid) {
        showError('register-birthdate', validation.message);
      }
    }
  });

  registerDni?.addEventListener('blur', () => {
    const value = registerDni.value.trim();
    clearError('register-dni');
    
    if (value) {
      const validation = validateDNI(value);
      if (!validation.valid) {
        showError('register-dni', validation.message);
      }
    }
  });

  registerAddress?.addEventListener('blur', () => {
    const value = registerAddress.value.trim();
    clearError('register-address');
    
    if (value) {
      const validation = validateAddress(value);
      if (!validation.valid) {
        showError('register-address', validation.message);
      }
    }
  });

  registerEmail?.addEventListener('blur', () => {
    const value = registerEmail.value.trim();
    clearError('register-email');
    
    if (value && !validateEmail(value)) {
      showError('register-email', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "' + value + '" no incluye el signo "@".');
    }
  });

  registerPassword?.addEventListener('blur', () => {
    const value = registerPassword.value;
    clearError('register-password');
    
    if (value) {
      const validation = validatePassword(value);
      if (!validation.valid) {
        showError('register-password', validation.message);
      }
    }
  });

  // Limpiar errores al enfocar
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
      const inputId = input.id;
      if (inputId) {
        clearError(inputId);
      }
    });
  });

  // Cambiar entre paneles de login y registro
  switchToRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    clearAllErrors();
    panelLogin.classList.add('hidden');
    panelRegister.classList.remove('hidden');
    confirmationMessage.classList.add('hidden');
  });

  switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    clearAllErrors();
    panelRegister.classList.add('hidden');
    panelLogin.classList.remove('hidden');
    confirmationMessage.classList.add('hidden');
  });

  // Botones de limpiar inputs
  document.querySelectorAll('.btn-clear').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input) {
        input.value = '';
        const inputId = input.id;
        if (inputId) {
          clearError(inputId);
        }
      }
      input?.focus();
    });
  });

  // Submit Login con simulación de base de datos (50% probabilidad de error)
  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();

    let hasErrors = false;
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    // Validar email
    if (!email) {
      showError('login-email', 'El correo electrónico es obligatorio.');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      showError('login-email', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "' + email + '" no incluye el signo "@".');
      hasErrors = true;
    }

    // Validar contraseña
    if (!password) {
      showError('login-password', 'La contraseña es obligatoria.');
      hasErrors = true;
    } else {
      const validation = validatePassword(password);
      if (!validation.valid) {
        showError('login-password', validation.message);
        hasErrors = true;
      }
    }

    // Si no hay errores de validación, simular verificación en base de datos
    if (!hasErrors) {
      // Generar número aleatorio (0 o 1) para simular 50% de probabilidad
      const isRegistered = Math.random() < 0.5;

      if (isRegistered) {
        // Usuario encontrado en la "base de datos"
        showConfirmation('¡Inicio de sesión exitoso!', 'Has iniciado sesión correctamente en tu cuenta de Ferretería Duviso.');
      } else {
        // Usuario no encontrado en la "base de datos"
        showErrorLoginPopup();
      }
    }
  });

  // Submit Register con simulación de base de datos (50% probabilidad de usuario ya registrado)
  formRegister?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();

    let hasErrors = false;

    // Validar nombre
    const name = registerName.value.trim();
    if (!name) {
      showError('register-name', 'El nombre y apellidos son obligatorios.');
      hasErrors = true;
    } else {
      const validation = validateName(name);
      if (!validation.valid) {
        showError('register-name', validation.message);
        hasErrors = true;
      }
    }

    // Validar fecha de nacimiento
    const birthdate = registerBirthdate.value.trim();
    if (!birthdate) {
      showError('register-birthdate', 'La fecha de nacimiento es obligatoria.');
      hasErrors = true;
    } else {
      const validation = validateBirthdate(birthdate);
      if (!validation.valid) {
        showError('register-birthdate', validation.message);
        hasErrors = true;
      }
    }

    // Validar DNI
    const dni = registerDni.value.trim();
    if (!dni) {
      showError('register-dni', 'El DNI/NIE es obligatorio.');
      hasErrors = true;
    } else {
      const validation = validateDNI(dni);
      if (!validation.valid) {
        showError('register-dni', validation.message);
        hasErrors = true;
      }
    }

    // Validar dirección
    const address = registerAddress.value.trim();
    if (!address) {
      showError('register-address', 'La dirección es obligatoria.');
      hasErrors = true;
    } else {
      const validation = validateAddress(address);
      if (!validation.valid) {
        showError('register-address', validation.message);
        hasErrors = true;
      }
    }

    // Validar email
    const email = registerEmail.value.trim();
    if (!email) {
      showError('register-email', 'El correo electrónico es obligatorio.');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      showError('register-email', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "' + email + '" no incluye el signo "@".');
      hasErrors = true;
    }

    // Validar contraseña
    const password = registerPassword.value;
    if (!password) {
      showError('register-password', 'La contraseña es obligatoria.');
      hasErrors = true;
    } else {
      const validation = validatePassword(password);
      if (!validation.valid) {
        showError('register-password', validation.message);
        hasErrors = true;
      }
    }

    // Si no hay errores de validación, simular verificación en base de datos
    if (!hasErrors) {
      // Generar número aleatorio para simular 50% de probabilidad de usuario ya registrado
      const isAlreadyRegistered = Math.random() < 0.5;

      if (isAlreadyRegistered) {
        // Usuario ya existe en la "base de datos"
        showErrorRegisterPopup();
      } else {
        // Usuario no existe, proceder con el registro
        showConfirmation('¡Registro completado!', 'Tu cuenta ha sido creada correctamente. Bienvenido a Ferretería Duviso.');
      }
    }
  });

  function showConfirmation(title, text) {
    panelLogin.classList.add('hidden');
    panelRegister.classList.add('hidden');
    confirmationMessage.classList.remove('hidden');
    confirmationTitle.textContent = title;
    confirmationText.textContent = text;
  }

  // Volver al inicio (cerrar overlay)
  btnBackToHome?.addEventListener('click', () => {
    try {
      if (window !== window.parent) {
        window.parent.postMessage({ type: 'close-account' }, '*');
      } else {
        window.location.href = '../index.html';
      }
    } catch (err) {
      window.location.href = '../index.html';
    }
  });

  // Escape cierra overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Cerrar popup de error de login si está abierto
      if (errorLoginOverlay) {
        closeErrorLoginPopup();
      }
      // Cerrar popup de error de registro si está abierto
      else if (errorRegisterOverlay) {
        closeErrorRegisterPopup();
      }
      // Cerrar overlay de cuenta
      else {
        try {
          if (window !== window.parent) {
            window.parent.postMessage({ type: 'close-account' }, '*');
          }
        } catch (err) {}
      }
    }
  });
});