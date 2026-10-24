import React from "react";
import { LanguageContext, withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const meetingTimes = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

function getParisToday() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function Contact() {
  const { language } = React.useContext(LanguageContext);
  function getRequest(event) {
    event.preventDefault();
    const formElement = event.currentTarget.tagName === "FORM" ? event.currentTarget : event.currentTarget.form;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return null;
    }
    const form = new FormData(formElement);
    return {
      name: form.get("name"), email: form.get("email"), date: form.get("date"),
      time: form.get("time"), duration: Number(form.get("duration")),
      topic: form.get("topic") || (language === "fr" ? "Non précisé" : "Not specified"),
    };
  }

  function handleEmailRequest(event) {
    const request = getRequest(event);
    if (!request) return;
    const { name, email, date, time, duration, topic } = request;
    const subject = language === "fr" ? `Demande de rendez-vous de ${name}` : `Meeting request from ${name}`;
    const body = language === "fr" ? [
      "Bonjour Pradeep,", "", "Je souhaite demander un rendez-vous.", "",
      `Nom : ${name}`, `E-mail : ${email}`, `Date souhaitée : ${date}`,
      `Heure souhaitée : ${time} (Europe/Paris)`, `Durée : ${duration} minutes`, `Sujet : ${topic}`,
      "", "Merci de me confirmer si cet horaire vous convient.",
    ].join("\n") : [
      "Hi Pradeep,", "", "I’d like to request a meeting.", "",
      `Name: ${name}`, `Email: ${email}`, `Preferred date: ${date}`,
      `Preferred time: ${time} (Europe/Paris)`, `Meeting length: ${duration} minutes`, `Topic: ${topic}`,
      "", "Please let me know if this time works for you.",
    ].join("\n");

    // mailto uses URI percent-encoding; URLSearchParams encodes spaces as "+",
    // which some mail clients display literally instead of converting to spaces.
    const mailto = `mailto:pradeepdeivamani03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`;
    window.location.href = mailto;
  }

  function handleCalendarRequest(event) {
    const request = getRequest(event);
    if (!request) return;
    const { name, email, date, time, duration, topic } = request;
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    const start = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const end = new Date(start.getTime() + duration * 60_000);
    const calendarDate = (value) => value.toISOString().slice(0, 19).replace(/[-:]/g, "").replace(".000", "");
    const details = language === "fr"
      ? `Rendez-vous demandé par ${name} (${email}).\n\nSujet : ${topic}\n\nDemande envoyée depuis le portfolio de Pradeep Deivamani. Les horaires sont en heure de Paris (Europe/Paris). Le rendez-vous sera confirmé lorsque Pradeep acceptera l’invitation.`
      : `Meeting requested by ${name} (${email}).\n\nTopic: ${topic}\n\nRequested through Pradeep Deivamani’s portfolio. Times are in Europe/Paris. The meeting is confirmed when Pradeep accepts the invitation.`;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: language === "fr"
        ? `Demande de rendez-vous : ${topic === "Non précisé" ? "Premier échange" : topic}`
        : `Meeting request: ${topic === "Not specified" ? "Introductory conversation" : topic}`,
      dates: `${calendarDate(start)}/${calendarDate(end)}`,
      ctz: "Europe/Paris",
      details,
      add: "pradeepdeivamani03@gmail.com",
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="section-wrap contact-section">
      <div className="meeting-layout">
        <div className="meeting-intro">
          <div className="eyebrow">08 / LET’S CONNECT</div>
          <h2>Good work starts with a <span className="accent-text">conversation.</span></h2>
          <p>Choose a preferred time and send a calendar invitation. I’ll confirm the meeting by accepting it.</p>
          <div className="meeting-facts">
            <div><span className="fact-icon">◷</span><span><strong>15 or 30 minutes</strong><small>Choose the length that suits you</small></span></div>
            <div><span className="fact-icon">⌖</span><span><strong>Paris time</strong><small>Times shown in Europe/Paris</small></span></div>
            <div><span className="fact-icon"><ArrowIcon /></span><span><strong>Calendar invitation</strong><small>I’ll receive your invite and confirm by accepting</small></span></div>
          </div>
          <a className="meeting-email" href="mailto:pradeepdeivamani03@gmail.com">pradeepdeivamani03@gmail.com <ArrowIcon /></a>
        </div>

        <form className="meeting-form" onSubmit={handleCalendarRequest}>
          <div className="form-heading"><span className="project-type">MEETING REQUEST</span><span className="form-step">01 <i>/ 01</i></span></div>
          <h3>Find a time to talk</h3>
          <div className="form-grid">
            <label className="form-field">
              <span>Your name</span>
              <input name="name" autoComplete="name" placeholder="Jane Smith" required />
            </label>
            <label className="form-field">
              <span>Email address</span>
              <input type="email" name="email" autoComplete="email" placeholder="jane@company.com" required />
            </label>
            <label className="form-field">
              <span>Preferred date</span>
              <input type="date" name="date" min={getParisToday()} required />
            </label>
            <label className="form-field">
              <span>Preferred time <i>Paris</i></span>
              <select name="time" defaultValue="" required>
                <option value="" disabled>Select a time</option>
                {meetingTimes.map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
            </label>
            <label className="form-field">
              <span>Meeting length</span>
              <select name="duration" defaultValue="15">
                <option value="15">15 minutes · Intro chat</option>
                <option value="30">30 minutes · Project discussion</option>
              </select>
            </label>
            <label className="form-field form-field-wide">
              <span>What would you like to discuss? <i>Optional</i></span>
              <textarea name="topic" rows="3" placeholder="A role, project, or idea…" />
            </label>
          </div>
          <div className="meeting-actions">
            <button className="button button-primary meeting-submit" type="submit">Create calendar invite <ArrowIcon /></button>
            <button className="button button-quiet meeting-submit-email" type="button" onClick={handleEmailRequest}>Email request instead</button>
          </div>
          <p className="form-note">Google Calendar opens a ready-to-send invitation to Pradeep. The meeting is confirmed when he accepts. Email is available as a fallback.</p>
        </form>
      </div>
    </section>
  );
}

export default withTranslations(Contact);
