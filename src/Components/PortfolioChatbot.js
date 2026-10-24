import React from "react";
import { LanguageContext } from "../i18n";

const copy = {
  en: {
    title: "Portfolio assistant",
    status: "Here to help you explore",
    greeting: "Hi! I can help you explore Pradeep’s experience, projects, and technical skills. What would you like to know?",
    prompts: ["Experience", "Technical stack", "Projects", "Contact"],
    placeholder: "Ask about Pradeep’s work…",
    send: "Send message",
    privacy: "Powered by Google Gemini’s free tier. Google may use submitted content to improve its products; avoid private or sensitive information.",
    thinking: "Thinking…",
    offline: "The AI assistant is temporarily unavailable. Here’s a quick answer from the portfolio:",
    open: "Open portfolio assistant",
    close: "Close portfolio assistant",
    intro: "Pradeep is a Java software engineer and consultant in France, focused on reliable backend systems, secure data exchange, and production delivery.",
    experience: "At BNP Paribas, Pradeep develops Java and Spring services, REST APIs, and IBM MQ orchestration. He also builds and maintains 12 Spring Batch applications processing around 200,000 records a day, and contributes to Kubernetes delivery and production support.",
    skills: "His core stack includes Java, Spring Boot, Spring Batch, REST APIs, IBM MQ, PostgreSQL, COS/S3, PGP with Bouncy Castle, HashiCorp Vault, Docker, Kubernetes, GitLab CI/CD, JUnit, and Mockito.",
    projects: "Independent projects include a React e-commerce app, a Java banking system, a Python computer-vision ID extractor, Android development work, and a Spring Batch CSV processor. The portfolio’s Projects section links to their GitHub repositories.",
    research: "Pradeep co-authored the IEEE conference paper “A Semantic User-Centered Mobile Services and Data Collection from Textual Images.” You can find it in the portfolio’s publication section.",
    education: "Pradeep holds a Master’s degree in Software Engineering and Digital Transformation from ESIGELEC (2024), and a Bachelor of Technology from Sri Manakula Vinayagar Engineering College (2021).",
    contact: "You can reach Pradeep through the contact and meeting request form at the bottom of this portfolio.",
    cv: "Use the “View CV” option in the hero section or footer to choose the English or French PDF.",
    fallback: "I can help with Pradeep’s experience, technical stack, projects, education, research, CV, or contact details. Try one of those topics.",
  },
  fr: {
    title: "Assistant du portfolio",
    status: "Pour découvrir son parcours",
    greeting: "Bonjour ! Je peux vous aider à découvrir l’expérience, les projets et les compétences techniques de Pradeep. Que souhaitez-vous savoir ?",
    prompts: ["Expérience", "Compétences", "Projets", "Contact"],
    placeholder: "Posez une question sur son parcours…",
    send: "Envoyer le message",
    privacy: "Propulsé par l’offre gratuite de Google Gemini. Google peut utiliser les contenus envoyés pour améliorer ses produits ; évitez les données privées ou sensibles.",
    thinking: "Réflexion…",
    offline: "L’assistant IA est temporairement indisponible. Voici une réponse rapide basée sur le portfolio :",
    open: "Ouvrir l’assistant du portfolio",
    close: "Fermer l’assistant du portfolio",
    intro: "Pradeep est ingénieur logiciel Java et consultant en France. Il conçoit des systèmes backend fiables, des échanges de données sécurisés et des solutions exploitées en production.",
    experience: "Chez BNP Paribas, Pradeep développe des services Java et Spring, des API REST et des services d’orchestration IBM MQ. Il conçoit et maintient également 12 applications Spring Batch traitant environ 200 000 enregistrements par jour, et contribue aux déploiements Kubernetes et au support de production.",
    skills: "Ses principales technologies : Java, Spring Boot, Spring Batch, API REST, IBM MQ, PostgreSQL, COS/S3, PGP avec Bouncy Castle, HashiCorp Vault, Docker, Kubernetes, GitLab CI/CD, JUnit et Mockito.",
    projects: "Ses projets personnels comprennent un site e-commerce React, un système bancaire Java, un extracteur d’identité en vision par ordinateur avec Python, des projets Android et un traitement CSV Spring Batch. La section Projets du portfolio renvoie aux dépôts GitHub.",
    research: "Pradeep est coauteur de l’article de conférence IEEE « A Semantic User-Centered Mobile Services and Data Collection from Textual Images », présenté dans la section Publications du portfolio.",
    education: "Pradeep est diplômé d’un master en génie logiciel et transformation numérique à l’ESIGELEC (2024) et d’un Bachelor of Technology au Sri Manakula Vinayagar Engineering College (2021).",
    contact: "Vous pouvez contacter Pradeep avec le formulaire de contact ou de demande de rendez-vous en bas du portfolio.",
    cv: "Utilisez l’option « Voir mon CV » dans la section d’accueil ou le pied de page pour choisir le CV anglais ou français.",
    fallback: "Je peux vous renseigner sur l’expérience, les compétences, les projets, la formation, les publications, le CV ou les coordonnées de Pradeep. Essayez l’un de ces sujets.",
  },
};

function answerQuestion(value, text) {
  const q = text.toLowerCase();
  if (/contact|email|e-mail|meet|meeting|rendez|contacter|coordonn|joindre/.test(q)) return value.contact;
  if (/cv|resume|résumé|curriculum|resume|résumé/.test(q)) return value.cv;
  if (/project|projet|github|portfolio project/.test(q)) return value.projects;
  if (/skill|stack|technolog|outil|compétence|competence|java|spring|kubernetes|mq/.test(q)) return value.skills;
  if (/research|paper|publication|conference|conférence|ieee|article/.test(q)) return value.research;
  if (/education|study|degree|formation|étude|etude|dipl[oô]me|master/.test(q)) return value.education;
  if (/experience|expérience|career|work|parcours|bnp|batch|production/.test(q)) return value.experience;
  if (/who|about|intro|présente|present|pradeep|bonjour|hello/.test(q)) return value.intro;
  return value.fallback;
}

export default function PortfolioChatbot() {
  const { language } = React.useContext(LanguageContext);
  const text = copy[language] || copy.en;
  const [isOpen, setIsOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [messages, setMessages] = React.useState([{ id: 0, from: "assistant", text: text.greeting }]);
  const [isThinking, setIsThinking] = React.useState(false);
  const listRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [isOpen, messages]);

  async function sendMessage(message) {
    const value = message.trim();
    if (!value || isThinking) return;
    const userMessage = { id: Date.now(), from: "user", text: value };
    const history = [...messages.filter((item) => item.id !== 0), userMessage]
      .slice(-8)
      .map((item) => ({ role: item.from === "assistant" ? "model" : "user", text: item.text }));
    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsThinking(true);
    let reply;
    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(18000),
      });
      if (!response.ok) throw new Error("Assistant unavailable");
      const result = await response.json();
      if (typeof result.reply !== "string" || !result.reply.trim()) throw new Error("Empty assistant reply");
      reply = result.reply.trim();
    } catch {
      // Keep the portfolio assistant useful locally and when the free API quota is unavailable.
      reply = `${text.offline}\n\n${answerQuestion(text, value)}`;
    }
    setMessages((current) => [...current, { id: Date.now() + 1, from: "assistant", text: reply }]);
    setIsThinking(false);
  }

  return (
    <div className="portfolio-chatbot">
      {isOpen && (
        <section className="chat-panel" aria-label={text.title}>
          <header className="chat-header">
            <span className="chat-avatar" aria-hidden="true">PD</span>
            <span className="chat-heading"><strong>{text.title}</strong><small><i />{text.status}</small></span>
            <button className="chat-close" type="button" aria-label={text.close} onClick={() => setIsOpen(false)}>×</button>
          </header>
          <div className="chat-messages" ref={listRef} aria-live="polite" aria-relevant="additions">
            {messages.map((message) => (
              <p className={`chat-message ${message.from}`} key={message.id}>{message.text}</p>
            ))}
            {isThinking && <p className="chat-message chat-thinking" role="status">{text.thinking}<span aria-hidden="true">…</span></p>}
            {messages.length === 1 && <div className="chat-prompts">{text.prompts.map((prompt) => <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>{prompt}<span aria-hidden="true">↗</span></button>)}</div>}
          </div>
          <form className="chat-compose" onSubmit={(event) => { event.preventDefault(); sendMessage(draft); }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={text.placeholder} aria-label={text.placeholder} disabled={isThinking} />
            <button type="submit" aria-label={text.send} disabled={!draft.trim() || isThinking}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10 17 3l-4 14-3-6-7-1Zm7 1 7-8" /></svg></button>
          </form>
          <p className="chat-privacy">{text.privacy}</p>
        </section>
      )}
      <button className={`chat-launcher${isOpen ? " is-open" : ""}`} type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? text.close : text.open} aria-expanded={isOpen}>
        {isOpen ? <span aria-hidden="true">×</span> : <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.75L4 20l1.45-4.2A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" /></svg><span className="chat-launcher-label">{language === "fr" ? "Une question ?" : "Ask me anything"}</span><i className="chat-launcher-dot" /> </>}
      </button>
    </div>
  );
}
