// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Calculate dynamic years since foundation (2008)
function calculateYearsSinceFoundation() {
  const foundationYear = 2008;
  const currentYear = new Date().getFullYear();
  return currentYear - foundationYear;
}

// Update years dynamically on page load
document.addEventListener('DOMContentLoaded', function() {
  const years = calculateYearsSinceFoundation();
  
  // Update all elements with years
  const yearElements = document.querySelectorAll('.years-dynamic, [data-years="dynamic"]');
  yearElements.forEach(element => {
    element.textContent = years;
  });
  
  // Update specific text content that mentions years
  const experienceTexts = document.querySelectorAll('.experience-years');
  experienceTexts.forEach(element => {
    element.innerHTML = element.innerHTML.replace(/\d+\s*anos?/gi, `${years} anos`);
  });
  
  // Update translations with dynamic years
  if (typeof translations !== 'undefined') {
    Object.keys(translations).forEach(lang => {
      // Update aboutText1 for all languages
      if (translations[lang].aboutText1) {
        translations[lang].aboutText1 = translations[lang].aboutText1.replace(/\d+\s*anos?/gi, `${years} anos`);
      }
      
      // Update any other text that might contain years
      Object.keys(translations[lang]).forEach(key => {
        if (typeof translations[lang][key] === 'string' && translations[lang][key].includes('15 anos')) {
          translations[lang][key] = translations[lang][key].replace(/15\s*anos?/gi, `${years} anos`);
        }
      });
    });
  }

  // Force refresh of hero image to bypass cache
  setTimeout(() => {
    const heroImage = document.getElementById('carouselImage');
    if (heroImage) {
      const newTimestamp = Date.now();
      const baseSrc = heroImage.src.split('?')[0]; // Remove existing query params
      const newSrc = `${baseSrc}?v=${newTimestamp}&refresh=true`;
      
      // Create a new image to preload and force cache refresh
      const tempImg = new Image();
      tempImg.onload = function() {
        heroImage.src = newSrc;
      };
      tempImg.src = newSrc;
    }
  }, 500); // Small delay to ensure DOM is ready

  // Insert current year wherever .current-year exists
  const currentYearEls = document.querySelectorAll('.current-year');
  if (currentYearEls && currentYearEls.length) {
    const y = new Date().getFullYear();
    currentYearEls.forEach(el => { el.textContent = y; });
  }
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Get theme from localStorage or default to light
let currentTheme = localStorage.getItem("theme") || "light";

// Apply saved theme on load
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
  body.classList.remove("light-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
} else {
  body.classList.add("light-mode");
  body.classList.remove("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}

// Theme toggle event
themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Troca o logo conforme o tema
document.addEventListener("DOMContentLoaded", function () {
  const logoImg = document.getElementById("mainLogo");
  const body = document.body;
  function updateLogo() {
    // Usar sempre o logo local da pasta public/img/
    logoImg.src = "public/img/myclinic-logo.png";
  }
  updateLogo();
  document.getElementById("themeToggle").addEventListener("click", function () {
    setTimeout(updateLogo, 100); // Aguarda troca de classe
  });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mainNav = document.getElementById("mainNav");

mobileMenuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  });
});

// Header scroll effect
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Form Validation Function
function validateFormData(data) {
  const errors = [];
  
  // Nome completo - obrigatório e mínimo 2 caracteres
  if (!data.name || data.name.trim().length < 2) {
    errors.push(getValidationMessage('nameRequired'));
  }
  
  // Email - obrigatório e formato válido
  if (!data.email || data.email.trim().length === 0) {
    errors.push(getValidationMessage('emailRequired'));
  } else if (!isValidEmail(data.email)) {
    errors.push(getValidationMessage('emailInvalid'));
  }
  
  // Telefone - obrigatório e formato básico
  if (!data.phone || data.phone.trim().length < 7) {
    errors.push(getValidationMessage('phoneRequired'));
  } else if (!isValidPhone(data.phone)) {
    errors.push(getValidationMessage('phoneInvalid'));
  }
  
  // Serviço - obrigatório
  if (!data.service || data.service.trim().length === 0) {
    errors.push(getValidationMessage('serviceRequired'));
  }
  
  if (errors.length > 0) {
    return {
      isValid: false,
      message: `<strong>❌ Erro no Formulário:</strong><br><br>${errors.join('<br>')}<br><br><small>📝 Por favor, corrija os campos acima e tente novamente.</small>`
    };
  }
  
  return { isValid: true };
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Phone validation function (Angola format)
function isValidPhone(phone) {
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Angola phone format: +244 followed by 9 digits, or just 9 digits starting with 9
  const phoneRegex = /^(\+244)?[9][0-9]{8}$/;
  return phoneRegex.test(cleanPhone);
}

// Get validation messages based on current language
function getValidationMessage(key) {
  const messages = {
    pt: {
      nameRequired: "• <strong>Nome:</strong> É obrigatório (mínimo 2 caracteres)",
      emailRequired: "• <strong>Email:</strong> É obrigatório",
      emailInvalid: "• <strong>Email:</strong> Formato inválido (exemplo: nome@email.com)",
      phoneRequired: "• <strong>Telefone:</strong> É obrigatório",
      phoneInvalid: "• <strong>Telefone:</strong> Formato inválido (exemplo: +244 912 345 678)",
      serviceRequired: "• <strong>Serviço:</strong> Por favor, selecione um serviço"
    },
    en: {
      nameRequired: "• <strong>Name:</strong> Required (minimum 2 characters)",
      emailRequired: "• <strong>Email:</strong> Required",
      emailInvalid: "• <strong>Email:</strong> Invalid format (example: name@email.com)",
      phoneRequired: "• <strong>Phone:</strong> Required",
      phoneInvalid: "• <strong>Phone:</strong> Invalid format (example: +244 912 345 678)",
      serviceRequired: "• <strong>Service:</strong> Please select a service"
    },
    jp: {
      nameRequired: "• <strong>名前:</strong> 必須（最低2文字）",
      emailRequired: "• <strong>メール:</strong> 必須",
      emailInvalid: "• <strong>メール:</strong> 無効な形式（例: name@email.com）",
      phoneRequired: "• <strong>電話:</strong> 必須",
      phoneInvalid: "• <strong>電話:</strong> 無効な形式（例: +244 912 345 678）",
      serviceRequired: "• <strong>サービス:</strong> サービスを選択してください"
    }
  };
  
  return messages[currentLanguage]?.[key] || messages.pt[key];
}

// Contact Form Handling with API Integration
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : 'Enviar Pedido';
    if (submitButton) {
      submitButton.textContent = getLoadingMessage();
      submitButton.disabled = true;
    }

    try {
      const resp = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let result = {};
      try { result = await resp.json(); } catch (e) { /* ignore */ }

      if (resp.ok && result.success) {
        showNotification(getSuccessMessage(data), 'success', 8000);
        contactForm.reset();
      } else {
        const msg = (result && result.message) ? result.message : getErrorMessage();
        showNotification(msg, 'error', 7000);
      }
    } catch (error) {
      console.error('Error sending to /api/send-email:', error);
      showNotification(getErrorMessage(), 'error', 7000);
    } finally {
      if (submitButton) {
        submitButton.textContent = originalText || 'Enviar Pedido';
        submitButton.disabled = false;
      }
    }
  });

}); // Fim do DOMContentLoaded para o formulário

// Get success message based on current language
function getSuccessMessage(data) {
  const contactInfo = `
    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 14px;">
      <strong>📞 Contactos MyClinic:</strong><br>
      +244 928 616 519 • +244 933 000 331<br>
      📧 geral@myclinic.ao<br>
      📍 Largo Serpa Pinto & Shopping Fortaleza
    </div>
  `;
  
  const messages = {
    pt: `<strong>✅ Marcação Realizada com Sucesso!</strong><br><br>
         Obrigado por escolher a MyClinic! Recebemos o seu pedido de marcação e entraremos em contacto consigo nas próximas 24 horas para confirmar a sua consulta.<br><br>
         <small>📝 Se necessitar de atendimento urgente, contacte-nos directamente.</small>${contactInfo}`,
    en: `<strong>✅ Appointment Successfully Scheduled!</strong><br><br>
         Thank you for choosing MyClinic! We have received your appointment request and will contact you within the next 24 hours to confirm your consultation.<br><br>
         <small>📝 If you need urgent care, please contact us directly.</small>${contactInfo}`,
    jp: `<strong>✅ 予約が正常に完了しました！</strong><br><br>
         MyClinicをお選びいただきありがとうございます！予約リクエストを受け取りました。24時間以内にご連絡して診察を確認いたします。<br><br>
         <small>📝 緊急の場合は直接お電話ください。</small>${contactInfo}`,
  };
  return messages[currentLanguage] || messages.pt;
}

// Get loading message based on current language
function getLoadingMessage() {
  const messages = {
    pt: "Processando marcação...",
    en: "Processing appointment...",
    jp: "予約を処理中...",
  };
  return messages[currentLanguage] || messages.pt;
}

// Get error message based on current language  
function getErrorMessage() {
  const contactInfo = `
    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 14px;">
      <strong>📞 Contacte-nos Directamente:</strong><br>
      +244 928 616 519<br>
      +244 933 000 331<br>
      📧 geral@myclinic.ao<br><br>
      <strong>📍 Visite-nos:</strong><br>
      • Largo Serpa Pinto, Luanda<br>
      • Shopping Fortaleza - Piso 2
    </div>
  `;
  
  const messages = {
    pt: `<strong>❌ Erro no Sistema</strong><br><br>
         Não foi possível processar a sua marcação online neste momento. Isto pode ser um problema temporário da nossa plataforma.<br><br>
         <strong>🏥 Não se preocupe!</strong> Por favor, contacte-nos directamente pelos meios abaixo para marcar a sua consulta.${contactInfo}`,
    en: `<strong>❌ System Error</strong><br><br>
         We couldn't process your online appointment at this time. This may be a temporary issue with our platform.<br><br>
         <strong>🏥 Don't worry!</strong> Please contact us directly using the information below to schedule your appointment.${contactInfo}`,
    jp: `<strong>❌ システムエラー</strong><br><br>
         現在オンライン予約を処理することができませんでした。これは一時的なプラットフォームの問題かもしれません。<br><br>
         <strong>🏥 ご心配なく！</strong>以下の情報で直接お電話いただき、予約をお取りください。${contactInfo}`,
  };
  return messages[currentLanguage] || messages.pt;
}

// Show notification function (Toast/Flash Messages)
function showNotification(message, type = 'info', duration = 5000) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.toast-notification');
  existingNotifications.forEach(notification => {
    notification.classList.add('toast-hiding');
    setTimeout(() => notification.remove(), 300);
  });

  // Get icon and colors based on type
  const notificationConfig = {
    success: {
      icon: '🎉',
      bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderColor: '#10b981'
    },
    error: {
      icon: '❌',
      bgColor: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      borderColor: '#ef4444'
    },
    info: {
      icon: 'ℹ️',
      bgColor: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      borderColor: '#3b82f6'
    },
    warning: {
      icon: '⚠️',
      bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      borderColor: '#f59e0b'
    }
  };

  const config = notificationConfig[type] || notificationConfig.info;

  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'toast-notification';
  notification.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon">${config.icon}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  // Apply dynamic styles
  notification.style.background = config.bgColor;
  notification.style.borderLeft = `4px solid ${config.borderColor}`;

  // Add to page
  document.body.appendChild(notification);

  // Show animation
  setTimeout(() => {
    notification.classList.add('toast-show');
  }, 10);

  // Auto remove after duration
  const timeoutId = setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.add('toast-hiding');
      setTimeout(() => notification.remove(), 300);
    }
  }, duration);

  // Clear timeout on manual close
  notification.addEventListener('click', (e) => {
    if (e.target.closest('.toast-close')) {
      clearTimeout(timeoutId);
      notification.classList.add('toast-hiding');
      setTimeout(() => notification.remove(), 300);
    }
  });
}

// Add animation to service cards on hover
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add animation to team cards on hover
const teamCards = document.querySelectorAll(".team-card");
teamCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => imageObserver.observe(img));
}

// Add active state to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Cache busting timestamp para garantir carregamento da nova imagem
const imageTimestamp = Date.now();

const carouselSlidesData = {
  pt: [
    {
      src: `public/img/17 anos MyClinic.png?v=${imageTimestamp}`,
      text: null, // Sem texto para o banner principal - Nova imagem do PDF
    },
    {
      src: `public/img/crianca-afro-feliz-no-check-up-regular-dos-dentes-na-clinica-odontologica.jpg?v=${imageTimestamp}`,
      text: `
        <h2>Cuidado Infantil</h2>
        <h1>Ortodontia Pediátrica</h1>
        <p>Nosso compromisso é com o sorriso saudável das crianças. Oferecemos tratamentos especializados em ortodontia pediátrica para garantir dentes alinhados e saudáveis desde cedo.</p>
        <a href="#services" class="btn btn-primary btn-lg">Saiba Mais</a>
      `,
    },
    {
      src: `public/img/pov-paciente-visitando-clinica-odontologica-para-cirurgia-de-tratamento-da-massa-afetada-medico-e-enfermeira-trabalhando-juntos-em-um-consultorio-ortodontico-moderno-acendendo-lampada-e-examinando-pessoa-que-usa-mascara-de-protecao.jpg?v=${imageTimestamp}`,
      text: `
        <h2>Seu Sorriso em Boas Mãos</h2>
        <h1>Excelência em Tratamentos Dentários</h1>
        <p>Oferecemos um atendimento especializado e personalizado para garantir a saúde e a estética do seu sorriso.</p>
        <a href="#about" class="btn btn-primary btn-lg">Saiba Mais</a>
      `,
    },
  ],
  en: [
    {
      src: `public/img/17 anos MyClinic.png?v=${imageTimestamp}`,
      text: null, // No text for the main banner - Nova imagem do PDF
    },
    {
      src: `public/img/crianca-afro-feliz-no-check-up-regular-dos-dentes-na-clinica-odontologica.jpg?v=${imageTimestamp}`,
      text: `
        <h2>Child Care</h2>
        <h1>Pediatric Orthodontics</h1>
        <p>Our commitment is to the healthy smiles of children. We offer specialized treatments in pediatric orthodontics to ensure straight and healthy teeth from an early age.</p>
        <a href="#services" class="btn btn-primary btn-lg">Learn More</a>
      `,
    },
    {
      src: `public/img/pov-paciente-visitando-clinica-odontologica-para-cirurgia-de-tratamento-da-massa-afetada-medico-e-enfermeira-trabalhando-juntos-em-um-consultorio-ortodontico-moderno-acendendo-lampada-e-examinando-pessoa-que-usar-mascara-de-protecao.jpg?v=${imageTimestamp}`,
      text: `
        <h2>Your Smile in Good Hands</h2>
        <h1>Excellence in Dental Treatments</h1>
        <p>We offer specialized and personalized care to ensure the health and aesthetics of your smile.</p>
        <a href="#about" class="btn btn-primary btn-lg">Learn More</a>
      `,
    },
  ],
  jp: [
    {
      src: `public/img/17 anos MyClinic.png?v=${imageTimestamp}`,
      text: null, // メインバナーのテキストはありません - Nova imagem do PDF
    },
    {
      src: `public/img/crianca-afro-feliz-no-check-up-regular-dos-dentes-na-clinica-odontologica.jpg?v=${imageTimestamp}`,
      text: `
        <h2>お子様のケア</h2>
        <h1>小児矯正歯科</h1>
        <p>私たちの使命は、子どもたちの健康な笑顔を守ることです。幼い頃からまっすぐで健康な歯を保証するために、小児矯正歯科の専門治療を提供しています。</p>
        <a href="#services" class="btn btn-primary btn-lg">詳しく見る</a>
      `,
    },
    {
      src: `public/img/pov-paciente-visitando-clinica-odontologica-para-cirurgia-de-tratamento-da-massa-afetada-medico-e-enfermeira-trabalhando-juntos-em-um-consultorio-ortodontico-moderno-acendendo-lampada-e-examinando-pessoa-que-usa-mascara-de-protecao.jpg?v=${imageTimestamp}`,
      text: `
        <h2>あなたの笑顔を、安心してお任せください</h2>
        <h1>優れた歯科治療</h1>
        <p>あなたの笑顔の健康と美しさを保証するために、専門的で個別化されたケアを提供します。</p>
        <a href="#about" class="btn btn-primary btn-lg">詳しく見る</a>
      `,
    },
  ],
};

let carouselIndex = 0;
const carouselImage = document.getElementById("carouselImage");
const carouselText = document.getElementById("carouselText");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
let carouselTimer;

function showCarouselSlide(index) {
  // Pega os slides do idioma atual
  const currentSlides = carouselSlidesData[currentLanguage];
  const slide = currentSlides[index];

  carouselImage.src = slide.src;

  if (slide.text) {
    carouselText.innerHTML = slide.text;
    carouselText.classList.remove("hide");
  } else {
    carouselText.innerHTML = "";
    carouselText.classList.add("hide");
  }
}

function nextSlide() {
  const currentSlides = carouselSlidesData[currentLanguage];
  carouselIndex = (carouselIndex + 1) % currentSlides.length;
  showCarouselSlide(carouselIndex);
  resetCarouselTimer();
}

function prevSlide() {
  const currentSlides = carouselSlidesData[currentLanguage];
  carouselIndex =
    (carouselIndex - 1 + currentSlides.length) % currentSlides.length;
  showCarouselSlide(carouselIndex);
  resetCarouselTimer();
}

function resetCarouselTimer() {
  clearTimeout(carouselTimer);
  carouselTimer = setTimeout(nextSlide, 7000);
}

carouselNext.addEventListener("click", nextSlide);
carouselPrev.addEventListener("click", prevSlide);

// Inicialização
showCarouselSlide(carouselIndex);
carouselTimer = setTimeout(nextSlide, 7000);

// =================== FIM DO CÓDIGO ATUALIZADO ===================

const languageBtn = document.getElementById("languageBtn");
const languageDropdown = document.getElementById("languageDropdown");
const currentLangDisplay = document.getElementById("currentLang");
const languageOptions = document.querySelectorAll(".language-option");

// 2. Lógica para abrir/fechar o dropdown ao clicar no botão
languageBtn.addEventListener("click", (event) => {
  // Impede que o clique se propague e feche o menu imediatamente (Passo 3)
  event.stopPropagation();
  // Alterna a classe 'active' para mostrar/esconder o dropdown
  languageDropdown.classList.toggle("active");
});

// 3. Lógica para fechar o dropdown quando o usuário clica em qualquer outro lugar da tela
document.addEventListener("click", (event) => {
  // Se o clique não foi dentro do botão nem dentro do dropdown, feche o menu
  if (
    !languageDropdown.contains(event.target) &&
    !languageBtn.contains(event.target)
  ) {
    languageDropdown.classList.remove("active");
  }
});

// 4. Lógica para selecionar um idioma e atualizar o botão
languageOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    // Obter o código do idioma do atributo data-lang
    const newLang = option.getAttribute("data-lang");
    const langText = option.querySelector("span:last-child").textContent;

    // Atualiza o texto do botão principal com o novo idioma
    currentLangDisplay.textContent = newLang.toUpperCase();

    currentLanguage = newLang; // Atualiza a variável global de idioma
    showCarouselSlide(carouselIndex); // Recarrega o slide com a nova tradução

    // =============== CÓDIGO RESTAURADO: CHAMADA À FUNÇÃO DE TRADUÇÃO =================
    if (typeof translatePage === "function") {
      // Garante que a função existe
      translatePage(newLang);
    }
    // =================================================================================

    // Fecha o dropdown após a seleção
    localStorage.setItem("language", newLang);

    languageDropdown.classList.remove("active");
  });
});

// =============================================
// ===== REVIEWS CAROUSEL =====
// =============================================

document.addEventListener('DOMContentLoaded', function() {
  const reviewsTrack = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  const indicators = document.querySelectorAll('.indicator');
  const reviewItems = document.querySelectorAll('.review-item');
  
  if (!reviewsTrack || !prevBtn || !nextBtn) return;

  let currentReview = 0;
  const totalReviews = reviewItems.length;

  // Update carousel display
  function updateCarousel() {
    // Remove active class from all items and indicators
    reviewItems.forEach((item, index) => {
      item.classList.remove('active');
      if (indicators[index]) {
        indicators[index].classList.remove('active');
      }
    });

    // Add active class to current item and indicator
    if (reviewItems[currentReview]) {
      reviewItems[currentReview].classList.add('active');
    }
    if (indicators[currentReview]) {
      indicators[currentReview].classList.add('active');
    }

    // Transform the track for smooth transition
    const translateX = -currentReview * (100 / totalReviews);
    reviewsTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Next review
  function nextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    updateCarousel();
  }

  // Previous review
  function prevReview() {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    updateCarousel();
  }

  // Go to specific review
  function goToReview(index) {
    currentReview = index;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextReview);
  prevBtn.addEventListener('click', prevReview);

  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToReview(index);
    });
  });

  // Auto-play functionality (optional)
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextReview, 5000); // Change every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Start auto-play
  startAutoPlay();

  // Pause auto-play on hover
  const carouselContainer = document.querySelector('.reviews-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevReview();
    } else if (e.key === 'ArrowRight') {
      nextReview();
    }
  });

  // Initialize
  updateCarousel();
});
