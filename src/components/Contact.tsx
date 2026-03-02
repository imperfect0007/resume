import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ status: string; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/meoeynkl', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      if (res.ok) {
        setResult({ status: 'ok', text: '✓ Message sent successfully! Connection established.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setResult({ status: 'err', text: '✗ Error: Connection refused. Try again.' });
      }
    } catch {
      setResult({ status: 'err', text: '✗ Error: Network unreachable.' });
    }
    setIsSubmitting(false);
  };

  const inputCls = 'w-full bg-transparent border-b-2 border-os-border text-os-text placeholder:text-os-dim py-2.5 sm:py-1.5 text-[16px] sm:text-xs font-mono focus:outline-none focus:border-os-green transition-colors min-h-[44px] sm:min-h-0';

  return (
    <div className="p-4 sm:p-6 font-mono text-xs bg-os-bg h-full overflow-auto">
      <div className="text-os-muted mb-3 text-[11px] sm:text-xs">$ ssh revanth@contact.dev</div>
      <div className="text-os-green mb-1">Connected to revanth@contact.dev</div>
      <div className="text-os-dim mb-4">Escape character is '^]'.</div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
        {[
          { l: 'EMAIL', v: 'revanthkumars64@gmail.com', c: 'text-os-yellow' },
          { l: 'PHONE', v: '+91 8431005243', c: 'text-os-cyan' },
          { l: 'LOCATION', v: 'Hyderabad, India', c: 'text-os-green' },
        ].map((c) => (
          <div key={c.l} className="px-3 py-2 rounded border border-os-border/60 bg-os-panel">
            <div className="text-[9px] text-os-dim uppercase tracking-wider mb-1">{c.l}</div>
            <div className={`text-xs ${c.c}`}>{c.v}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className="text-os-dim mb-1 block"><span className="text-os-green">$</span> NAME</label><input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="your_name" className={inputCls} /></div>
          <div><label className="text-os-dim mb-1 block"><span className="text-os-green">$</span> EMAIL</label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@domain.com" className={inputCls} /></div>
        </div>
        <div><label className="text-os-dim mb-1 block"><span className="text-os-green">$</span> SUBJECT</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="message_subject" className={inputCls} /></div>
        <div><label className="text-os-dim mb-1 block"><span className="text-os-green">$</span> MESSAGE</label><textarea name="message" value={formData.message} onChange={handleChange} required rows={3} placeholder="Type your message..." className={`${inputCls} resize-none`} /></div>
        <button type="submit" disabled={isSubmitting} className="min-h-[48px] px-5 py-3 sm:py-2 text-sm sm:text-xs font-semibold rounded-xl border-2 border-os-green/50 text-os-green hover:bg-os-green/10 disabled:opacity-50 transition-colors touch-manipulation">
          {isSubmitting ? 'Sending...' : '$ send --message'}
        </button>
        {result && <div className={`mt-2 ${result.status === 'ok' ? 'text-os-green' : 'text-os-red'}`}>{result.text}</div>}
      </form>
    </div>
  );
};

export default Contact;
