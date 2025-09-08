// Menu toggle functionality
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      nav.classList.remove("active");

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic form validation
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const empresa = document.getElementById("empresa").value;
    const servicio = document.getElementById("servicio-interes").value;
    const mensaje = document.getElementById("mensaje").value;

    if (!nombre || !email || !empresa || !servicio || !mensaje) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Simulate form submission
    alert(
      "¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto."
    );
    contactForm.reset();
  });
}

// Newsletter form handling
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    if (!emailInput.value) {
      alert("Por favor, introduzca su dirección de correo electrónico.");
      return;
    }

    // Simulate subscription
    alert("¡Gracias por suscribirse a nuestro newsletter!");
    emailInput.value = "";
  });
}

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".card, .valor-item, .tech-card, .caso-card"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize elements for animation
document
  .querySelectorAll(".card, .valor-item, .tech-card, .caso-card")
  .forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll);
// Initial check on page load
window.addEventListener("load", animateOnScroll);

// Variables globales
const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotContainer = document.getElementById("chatbot-container");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");
const chatbotClose = document.getElementById("chatbot-close");

// Respuestas predefinidas para simular IA
const responses = {
  hola: [
    "¡Hola! ¿En qué puedo ayudarte hoy?",
    "¡Hola! Me da gusto saludarte. ¿Cómo puedo asistirte?",
  ],
  servicios: [
    "En NovaMind ofrecemos diversos servicios de IA:",
    "- Modelos de lenguaje avanzados (NovaMind LM)",
    "- Soluciones de IA personalizadas",
    "- Consultoría estratégica",
    "- Integración e implementación",
    "- Capacitación y formación",
    "¿Te interesa alguno en particular?",
  ],
  consultoría: [
    "Nuestro servicio de consultoría ayuda a las empresas a identificar oportunidades, definir estrategias y crear roadmaps para integrar IA en sus procesos de negocio. Incluye talleres de ideación, análisis de viabilidad y planes de implementación.",
  ],
  precios: [
    "Los precios varían según el proyecto y servicios requeridos. Para obtener una cotización personalizada, podemos programar una reunión con uno de nuestros especialistas. ¿Te gustaría que te contactemos?",
  ],
  contacto: [
    "Puedes contactarnos a través de:",
    "- Email: info@novamind.ai",
    "- Teléfono: +1 (800) 123-4567",
    "- Dirección: 123 Innovation Drive, Tech City",
    "¿Te gustaría que te contactemos ahora?",
  ],
  gracias: [
    "¡De nada! Estoy aquí para ayudar.",
    "¡Fue un placer! No dudes en preguntar si necesitas más ayuda.",
    "¡Gracias a ti! ¿Hay algo más en lo que pueda asistirte?",
  ],
  default: [
    "Interesante. ¿Podrías proporcionar más detalles?",
    "Comprendo. Déjame ayudarte con eso.",
    "NovaMind puede asistirte con eso. ¿Te gustaría conocer más sobre nuestros servicios?",
  ],
};

// Temas clave para reconocimiento de intención simulada
const topics = {
  servicios: ["servicio", "servicios", "qué ofrecen", "qué hacen", "productos"],
  consultoría: [
    "consultoría",
    "consultoria",
    "asesoría",
    "asesoria",
    "estrategia",
  ],
  precios: [
    "precio",
    "precios",
    "costo",
    "costos",
    "cotización",
    "cotizacion",
    "cuánto cuesta",
    "valor",
  ],
  contacto: [
    "contacto",
    "hablar",
    "llamar",
    "email",
    "correo",
    "teléfono",
    "telefono",
    "dirección",
    "direccion",
  ],
  gracias: [
    "gracias",
    "thank you",
    "agradecido",
    "agradecida",
    "te lo agradezco",
  ],
};

// Inicialización del chatbot
document.addEventListener("DOMContentLoaded", function () {
  // Event listeners
  chatbotBtn.addEventListener("click", toggleChatbot);
  chatbotClose.addEventListener("click", toggleChatbot);

  // Mensaje inicial después de un breve tiempo
  setTimeout(() => {
    addMessage(
      "¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros servicios de IA, consultoría, precios o ponerte en contacto con nuestro equipo.",
      "bot"
    );
    addGeneralSuggestions();
  }, 1500);
});

// Alternar visibilidad del chatbot
function toggleChatbot() {
  chatbotContainer.classList.toggle("active");
}

// Manejar tecla Enter en el input
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Enviar respuesta rápida
function sendQuickReply(text) {
  userInput.value = text;
  sendMessage();
}

// Enviar mensaje
function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Agregar mensaje del usuario al chat
  addMessage(message, "user");
  userInput.value = "";

  // Simular "pensamiento" de la IA
  showTypingIndicator();

  // Responder después de un breve retraso
  setTimeout(() => {
    hideTypingIndicator();
    generateResponse(message);
  }, 1000 + Math.random() * 1000);
}

// Agregar mensaje al chat
function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender + "-message");
  messageElement.textContent = text;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mostrar indicador de escribiendo
function showTypingIndicator() {
  typingIndicator.style.display = "flex";
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Ocultar indicador de escribiendo
function hideTypingIndicator() {
  typingIndicator.style.display = "none";
}

// Generar respuesta automática
function generateResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();
  let responseFound = false;

  // Detectar intención basada en palabras clave
  for (const [topic, keywords] of Object.entries(topics)) {
    for (const keyword of keywords) {
      if (lowerCaseMessage.includes(keyword)) {
        const possibleResponses = responses[topic];
        const randomResponse =
          possibleResponses[
            Math.floor(Math.random() * possibleResponses.length)
          ];
        addMessage(randomResponse, "bot");
        responseFound = true;

        // Añadir sugerencias de seguimiento
        addFollowUpSuggestions(topic);
        return;
      }
    }
  }

  // Respuesta por defecto si no se detecta intención clara
  if (!responseFound) {
    const defaultResponses = responses["default"];
    const randomResponse =
      defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    addMessage(randomResponse, "bot");

    // Mostrar sugerencias generales
    addGeneralSuggestions();
  }
}

// Añadir sugerencias de seguimiento
function addFollowUpSuggestions(topic) {
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("suggestions-title");
  suggestionsContainer.textContent = "Puedo ayudarte con:";

  const quickReplies = document.createElement("div");
  quickReplies.classList.add("quick-replies");

  let followUps = [];

  switch (topic) {
    case "servicios":
      followUps = [
        "NovaMind LM",
        "IA personalizada",
        "Consultoría",
        "Integración",
        "Capacitación",
      ];
      break;
    case "consultoría":
      followUps = [
        "Talleres",
        "Análisis de viabilidad",
        "Plan de implementación",
        "Precios consultoría",
      ];
      break;
    case "precios":
      followUps = [
        "Cotización personalizada",
        "Contactar con ventas",
        "Planes empresariales",
      ];
      break;
    case "contacto":
      followUps = [
        "Email",
        "Teléfono",
        "Formulario de contacto",
        "Agendar reunión",
      ];
      break;
    default:
      followUps = ["Servicios", "Consultoría", "Precios", "Contacto"];
  }

  followUps.forEach((suggestion) => {
    const quickReply = document.createElement("div");
    quickReply.classList.add("quick-reply");
    quickReply.textContent = suggestion;
    quickReply.onclick = () => sendQuickReply(suggestion);
    quickReplies.appendChild(quickReply);
  });

  chatMessages.appendChild(suggestionsContainer);
  chatMessages.appendChild(quickReplies);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Añadir sugerencias generales
function addGeneralSuggestions() {
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("suggestions-title");
  suggestionsContainer.textContent = "También puedes preguntar sobre:";

  const quickReplies = document.createElement("div");
  quickReplies.classList.add("quick-replies");

  const suggestions = [
    "Servicios de IA",
    "Consultoría estratégica",
    "Precios",
    "Contacto",
    "Casos de éxito",
  ];

  suggestions.forEach((suggestion) => {
    const quickReply = document.createElement("div");
    quickReply.classList.add("quick-reply");
    quickReply.textContent = suggestion;
    quickReply.onclick = () => sendQuickReply(suggestion);
    quickReplies.appendChild(quickReply);
  });

  chatMessages.appendChild(suggestionsContainer);
  chatMessages.appendChild(quickReplies);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
