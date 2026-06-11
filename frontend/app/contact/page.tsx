"use client";

import { useEffect, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { Spotlight } from "@/components/ui/spotlight";
import { contactPageStyles } from "@/public/dummyStyles";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Initialize EmailJS with your public key
  useEffect(() => {
    const publicKey = "G32nRmL7Q_6ikfpJc";
    if (publicKey) emailjs.init(publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      // add extra template variables here if your EmailJS template expects them
    };

    const serviceId = "service_50zokcb";
    const templateId = "template_363um7v";

    try {
      if (!serviceId || !templateId) {
        throw new Error("EmailJS service or template ID not configured.");
      }

      // Send via EmailJS
      await emailjs.send(serviceId, templateId, templateParams);

      // Save to local Express backend database
      try {
        await fetch(`${API_BASE_URL}/api/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });
      } catch (backendErr) {
        console.error("Backend message saving failed:", backendErr);
      }

      // success: reset form / UI
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFocused(null);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setShowErrorModal(true);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Helper function for label classes
  const getLabelClass = (fieldName: string) => {
    const baseClass = contactPageStyles.formLabelBase;
    const focusedClass =
      focused === fieldName || formData[fieldName as keyof typeof formData]
        ? contactPageStyles.formLabelFocused
        : contactPageStyles.formLabelUnfocused;
    return `${baseClass} ${focusedClass}`;
  };

  return (
    <div className={contactPageStyles.pageContainer}>
      {/* Spotlight for background glow depth */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#0FFF50" />

      <div className={contactPageStyles.contentContainer}>
        {/* Form Container with Boxes Background */}
        <div className={contactPageStyles.formOuterContainer}>
          {/* Background Effect - Only behind form */}
          <div className={contactPageStyles.backgroundOverlay} />
          <Boxes />

          {/* Header */}
          <div className={contactPageStyles.headerContainer}>
            <h1 className={contactPageStyles.headerTitle}>Get in Touch</h1>
            <p className={contactPageStyles.headerSubtitle}>
              Have a project in mind or just want to say hi? I&apos;d love to hear
              from you.
            </p>
          </div>

          {/* Contact Methods */}
          <div className={contactPageStyles.contactMethodsGrid}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=toadityakumarsahoo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={contactPageStyles.contactCard}
            >
              <div className={contactPageStyles.contactIconContainer}>
                <svg
                  className={contactPageStyles.contactIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className={contactPageStyles.contactLabel}>Email</p>
                <p className={contactPageStyles.contactValue}>
                  toadityakumarsahoo@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://x.com/AdiTheNalanda"
              target="_blank"
              rel="noopener noreferrer"
              className={contactPageStyles.contactCard}
            >
              <div className={contactPageStyles.contactIconContainer}>
                <svg
                  className={contactPageStyles.contactIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className={contactPageStyles.contactLabel}>Twitter</p>
                <p className={contactPageStyles.contactValue}>@AdiTheNalanda</p>
              </div>
            </a>
          </div>

          {/* Form with relative positioning to stay above background */}
          <form
            onSubmit={handleSubmit}
            className={contactPageStyles.formContainer}
          >
            <div className={contactPageStyles.formGrid}>
              {/* Name Field */}
              <div className={contactPageStyles.formFieldContainer}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className={contactPageStyles.formInput}
                  placeholder="John Doe"
                  required
                />
                <label htmlFor="name" className={getLabelClass("name")}>
                  Name
                </label>
              </div>

              {/* Email Field */}
              <div className={contactPageStyles.formFieldContainer}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={contactPageStyles.formInput}
                  placeholder="john@example.com"
                  required
                />
                <label htmlFor="email" className={getLabelClass("email")}>
                  Email
                </label>
              </div>
            </div>

            {/* Subject Field */}
            <div className={contactPageStyles.formFieldContainer}>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                className={contactPageStyles.formInput}
                placeholder="Project Collaboration"
                required
              />
              <label htmlFor="subject" className={getLabelClass("subject")}>
                Subject
              </label>
            </div>

            {/* Message Field */}
            <div className={contactPageStyles.formFieldContainer}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                rows={6}
                className={contactPageStyles.formTextarea}
                placeholder="Tell me about your project..."
                required
              />
              <label htmlFor="message" className={getLabelClass("message")}>
                Message
              </label>
            </div>

            {/* Submit Button */}
            <div className={contactPageStyles.submitButtonContainer}>
              <button
                type="submit"
                className={contactPageStyles.submitButton}
                disabled={sending}
                aria-busy={sending}
              >
                <span className={contactPageStyles.submitButtonText}>
                  {sending ? "Sending..." : "Send Message"}
                  <svg
                    className={contactPageStyles.submitButtonIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Alternative Text - Outside the Boxes background */}
        <p className={contactPageStyles.alternativeText}>
          Prefer to schedule a call?{" "}
          <a href="#" className={contactPageStyles.alternativeLink}>
            9005-123-456
          </a>
        </p>
      </div>

      {/* Premium custom Success / Error Modals */}
      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
        {showErrorModal && (
          <ErrorModal onClose={() => setShowErrorModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom Premium Success Modal Component
function SuccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-500/25 bg-zinc-950 p-6 shadow-[0_0_50px_rgba(16,185,129,0.15)] z-10 text-center"
      >
        {/* Soft neon background glow */}
        <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/60 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Green Circle & Checkmark */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <motion.div
            initial={{ scale: 0.5, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="h-9 w-9 text-emerald-400" />
          </motion.div>
        </div>

        {/* Text Details */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-100 via-emerald-400 to-[#0FFF50] bg-clip-text text-transparent mb-2">
          Successfully Sent!
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed px-2 mb-6">
          Thank you for reaching out! Your message has been received. Aditya will respond shortly.
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 font-bold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] active:scale-95 cursor-pointer"
        >
          Awesome
        </button>
      </motion.div>
    </div>
  );
}

// Custom Premium Error Modal Component
function ErrorModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-rose-500/25 bg-zinc-950 p-6 shadow-[0_0_50px_rgba(244,63,94,0.15)] z-10 text-center"
      >
        {/* Soft neon background glow */}
        <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/60 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Red Circle & X icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-450 mb-4 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          <motion.div
            initial={{ scale: 0.5, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <XCircle className="h-9 w-9 text-rose-400" />
          </motion.div>
        </div>

        {/* Text Details */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-100 to-rose-450 bg-clip-text text-transparent mb-2">
          Sending Failed
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed px-2 mb-6">
          Something went wrong and we couldn&apos;t deliver your message. Please try again.
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-450 hover:bg-rose-500 hover:text-zinc-950 font-bold transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.1)] active:scale-95 cursor-pointer"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
