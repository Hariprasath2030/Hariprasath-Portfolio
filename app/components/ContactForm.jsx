"use client";

import { useState } from "react";

export default function ContactForm({ content, email }) {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Portfolio enquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      "",
      data.get("message"),
    ].join("\n");
    setStatus("Your email app should open with the message prepared. Nothing is sent automatically from this site.");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form reveal delay-1" onSubmit={handleSubmit}>
      <p className="form-notice">
        <strong>{content.formNoticeTitle}</strong> {content.formNoticeBody}{" "}
        <a href={`mailto:${email}`} className="text-link">{email}</a> directly.
      </p>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">{content.nameLabel}</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder={content.namePlaceholder} required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">{content.emailLabel}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={content.emailPlaceholder} required />
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="contact-message">{content.messageLabel}</label>
          <textarea id="contact-message" name="message" placeholder={content.messagePlaceholder} required />
        </div>
      </div>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit">
          {content.submitLabel} <span className="arrow" aria-hidden="true">↗</span>
        </button>
        <p className="form-status" aria-live="polite">{status}</p>
      </div>
    </form>
  );
}
