import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/meoeynkl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage("Thanks! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection.');
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hyderabad, India',
      href: null,
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'revanthkumars64@gmail.com',
      href: 'mailto:revanthkumars64@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8431005243',
      href: 'tel:+918431005243',
    },
  ];

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300';

  return (
    <section id="contact" className="py-20 md:py-28">
      <h2 className="text-3xl md:text-4xl font-bold text-white section-heading mb-4">
        Get In Touch
      </h2>
      <p className="text-slate-400 mb-14 max-w-2xl">
        Interested in working together or have a question? Feel free to reach out — I'm always
        open to discussing new opportunities and ideas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── Left: Contact cards ── */}
        <div className="lg:col-span-2 space-y-4">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="card-glow p-5 rounded-2xl flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/10">
                <item.icon size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-slate-200 hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    {item.value}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" />
                  </a>
                ) : (
                  <p className="text-sm text-slate-200">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Extra CTA */}
          <div className="card-glow p-5 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm text-slate-400 leading-relaxed">
              Prefer a quick chat? Connect with me on{' '}
              <a
                href="https://in.linkedin.com/in/revanth-kumar-s-a43672218"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                LinkedIn
              </a>{' '}
              for a faster response.
            </p>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="card-glow p-6 md:p-8 rounded-2xl space-y-5 animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me more..."
                className={inputClasses + ' resize-none'}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {submitMessage && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${
                  submitStatus === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
