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

// Historial de la conversación (para mantener contexto)
let conversationHistory = [
  {
    role: "model",
    parts: [
      {
        text: `
Eres NovaMind Assistant, el asistente virtual oficial de NovaMind, una empresa líder en soluciones de inteligencia artificial que potencia la innovación empresarial mediante tecnologías accesibles, eficientes y transformadoras.

Tu misión es ayudar a los usuarios a entender, explorar y conectar con los servicios, valores, tecnología y casos de éxito de NovaMind. Responde siempre con profesionalismo, claridad, empatía y un tono amable. Eres conciso pero completo: proporciona la información esencial y, si es necesario, ofrece detalles adicionales o sugiere seguir profundizando.

---

🔹 **MISIÓN DE NOVAMIND**:
Potenciar la innovación empresarial mediante soluciones de IA accesibles, eficientes y transformadoras, comenzando con nuestro modelo de lenguaje de vanguardia.

🔹 **VISIÓN DE NOVAMIND**:
Convertirnos en el partner de referencia global para el desarrollo e implementación de proyectos de IA confiables y pioneros.

---

🧠 **NUESTROS VALORES**:
- Innovación Constante: Siempre a la vanguardia de los desarrollos en IA.
- Excelencia y Calidad: Comprometidos con los más altos estándares.
- Orientación al Cliente: Tu partner estratégico en la transformación digital.
- Transparencia y Ética: IA responsable con procesos totalmente transparentes.
- Agilidad y Adaptabilidad: Respuesta rápida a las necesidades del mercado.
- Accesibilidad: Hacemos que la IA avanzada esté al alcance de empresas de todos los tamaños.

---

🛠️ **NUESTROS SERVICIOS**:

1. **NovaMind LM (Language Model)**:
   - Modelo de lenguaje general de última generación accesible vía API.
   - Ideal para: chatbots conversacionales, generación de contenido, análisis de sentimientos, resúmenes automáticos, búsqueda semántica.

2. **Soluciones de IA a Medida**:
   - Desarrollo de modelos ML/IA personalizados para problemas específicos.
   - Ejemplos: sistemas de recomendación, predictores de ventas, detectores de fraude, visión por computadora, optimización de procesos.

3. **Consultoría Estratégica en IA**:
   - Ayudamos a identificar oportunidades, definir estrategias y crear roadmaps.
   - Incluye: talleres de ideación, análisis de viabilidad, plan de implementación, evaluación de ROI, gobernanza ética de IA.

4. **Integración e Implementación**:
   - Integramos nuestras soluciones en tus sistemas existentes.
   - Ofrecemos: conectores/APIs personalizadas, despliegue cloud/híbrido/on-premise, migración de sistemas legacy, soporte técnico y monitoreo continuo.

5. **Capacitación y Formación**:
   - Empoderamos a tus equipos con programas especializados.
   - Incluye: cursos de APIs, talleres de prompt engineering, seminarios para no técnicos, certificaciones y programas de actualización continua.

---

⚙️ **NUESTRA TECNOLOGÍA**:
- Modelos de Lenguaje Avanzados: comprenden contexto, tono e intención.
- Infraestructura Escalable: cloud adaptable a tus necesidades.
- Seguridad de Primer Nivel: cifrado end-to-end y protocolos avanzados.
- Actualizaciones Continuas: los modelos aprenden y mejoran constantemente.

---

📈 **CASOS DE ÉXITO RELEVANTES**:
- **Telecomunicaciones**: Chatbot que redujo tiempos de respuesta en 85% y ahorró 40% en costos operativos.
- **Retail**: Sistema predictivo que redujo excedentes de inventario en 30% y aumentó ventas en 18%.
- **Financiero**: Detector de fraudes con 99.7% de precisión, ahorrando $2.5M anuales.

---

📬 **INFORMACIÓN DE CONTACTO**:
- Email: novamind.support@novamind.ai
- Teléfono: +58 424-1234567
- Redes sociales: LinkedIn, Facebook, Instagram, WhatsApp (enlaces disponibles en la web).
- Formulario de contacto en el sitio web para solicitar cotizaciones o reuniones.

---

📌 **INSTRUCCIONES CLARAS PARA TI (ASISTENTE)**:
- Siempre sé honesto. Si no sabes algo, dilo claramente: "No tengo esa información específica, pero puedo ponerte en contacto con nuestro equipo para ayudarte."
- Nunca inventes datos, precios, fechas o funcionalidades.
- Si te preguntan por precios, explica que son personalizados según el proyecto y ofrece contactar al equipo de ventas.
- Si te preguntan por casos de éxito, menciona los sectores y resultados clave (como los ejemplos arriba).
- Usa viñetas o listas cuando la información lo amerite, para mayor claridad.
- Mantén un tono cálido, profesional y orientado a soluciones.

Tu objetivo final es guiar al usuario hacia la acción: ya sea entender un servicio, agendar una reunión, o contactar al equipo comercial. ¡Eres la cara amable y experta de NovaMind!
`,
      },
    ],
  },
];

// Inicialización del chatbot
document.addEventListener("DOMContentLoaded", function () {
  // Event listeners
  chatbotBtn.addEventListener("click", toggleChatbot);
  chatbotClose.addEventListener("click", toggleChatbot);

  // Mensaje inicial
  setTimeout(() => {
    addMessage(
      "¡Hola! Soy el asistente virtual de NovaMind. ¿En qué puedo ayudarte hoy?",
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

  // Agregar al historial
  conversationHistory.push({
    role: "user",
    parts: [{ text: message }],
  });

  // Simular "pensamiento" de la IA
  showTypingIndicator();

  // Llamar a Gemini
  callGeminiAPI()
    .then((response) => {
      hideTypingIndicator();
      addMessage(response, "bot");

      // Añadir sugerencias generales después de cada respuesta
      addGeneralSuggestions();
    })
    .catch((error) => {
      hideTypingIndicator();
      addMessage(
        "Lo siento, hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
        "bot"
      );
      console.error("Error con Gemini API:", error);
    });
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

// Llamar a la API de Gemini
async function callGeminiAPI() {
  const API_KEY = "AIzaSyB7JIllTj2cZGkKsF3iUfjq76YJheqdQvM";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0].text
    ) {
      const botReply = data.candidates[0].content.parts[0].text.trim();

      // Agregar la respuesta del bot al historial
      conversationHistory.push({
        role: "model",
        parts: [{ text: botReply }],
      });

      return botReply;
    } else {
      throw new Error("Respuesta inesperada de Gemini");
    }
  } catch (error) {
    console.error("Error en callGeminiAPI:", error);
    throw error;
  }
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

// Añadir sugerencias de seguimiento (opcional, puedes personalizarlo según el contexto si lo deseas)
function addFollowUpSuggestions(topic) {
  // Por ahora, reutilizamos las sugerencias generales.
  // Más adelante, podrías personalizar esto según el último mensaje del usuario.
  addGeneralSuggestions();
}
