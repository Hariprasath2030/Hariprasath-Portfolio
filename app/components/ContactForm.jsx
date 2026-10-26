"use client";

import { useState } from "react";
import { profile } from "../data/portfolio";

export default function ContactForm() {
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
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form reveal delay-1" onSubmit={handleSubmit}>
      <p className="form-notice">
        <strong>Email delivery is not configured on this site.</strong> Use the form to prepare a draft in your email app, or email{" "}
        <a href={`mailto:${profile.email}`} className="text-link">{profile.email}</a> directly.
      </p>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Name" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="contact-message">What would you like to discuss?</label>
          <textarea id="contact-message" name="message" placeholder="A few details about your project or idea..." required />
        </div>
      </div>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit">
          Prepare email <span className="arrow" aria-hidden="true">↗</span>
        </button>
        <p className="form-status" aria-live="polite">{status}</p>
      </div>
    </form>
  );
}
