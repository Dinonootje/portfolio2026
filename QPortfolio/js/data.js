/*
 * Projectdata voor Quinten's portfolio.
 * Pas hier titels, beschrijvingen, tags en links aan zodra er echte
 * projecten zijn. "accent" is een CSS-kleur (gebruik var(--purple),
 * var(--blue) of var(--yellow)).
 */
window.PROJECTS = [
  {
    title: "Prompt Playground",
    description: "Experimenteeromgeving om te leren hoe verschillende prompts het gedrag van een AI-model beinvloeden.",
    accent: "var(--purple)",
    tags: ["JavaScript", "AI", "Leerproject"],
    status: "In ontwikkeling",
    link: "#"
  },
  {
    title: "Chat Widget UI",
    description: "Herbruikbare chatinterface-component, gebouwd als basis voor toekomstige AI-integraties.",
    accent: "var(--blue)",
    tags: ["HTML", "CSS", "UI"],
    status: "Live",
    link: "#"
  },
  {
    title: "Dataset Verkenner",
    description: "Klein hulpmiddel om openbare datasets te doorzoeken en te visualiseren als voorbereiding op ML-experimenten.",
    accent: "var(--yellow)",
    tags: ["Python", "Data", "Leerproject"],
    status: "In ontwikkeling",
    link: "#"
  },
  {
    title: "Portfolio AI-interface",
    description: "Dit portfolio zelf: een chat-gestuurde interface met slash-commando's, gebouwd in vanilla JS.",
    accent: "var(--purple)",
    tags: ["JavaScript", "CSS", "Design"],
    status: "Live",
    link: "#"
  }
];

/*
 * Contactgegevens — placeholders, later invullen.
 */
window.CONTACT = {
  email: "jouw@email.nl",
  github: "https://github.com/jouw-gebruikersnaam",
  linkedin: "https://linkedin.com/in/jouw-naam"
};

/*
 * Vaardigheden voor het /skills commando.
 * "learning: true" toont een gele "leert nog"-badge.
 */
window.SKILLS = [
  { name: "HTML & CSS", learning: false },
  { name: "JavaScript", learning: false },
  { name: "Python", learning: true },
  { name: "Prompt engineering", learning: true },
  { name: "Machine learning basis", learning: true }
];
