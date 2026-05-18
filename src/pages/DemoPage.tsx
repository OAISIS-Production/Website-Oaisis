import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Glass from '../components/ui/Glass';
import InnerPageShell from '../components/ui/InnerPageShell';

interface FormState {
  name: string;
  company: string;
  what: string;
  email: string;
}

const FIELDS: Array<{ id: keyof FormState; label: string; type: string; placeholder: string }> = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Chris Whatley' },
  { id: 'company', label: 'Company', type: 'text', placeholder: 'OAISIS' },
  { id: 'what', label: 'What you do', type: 'text', placeholder: 'CEO of a 12-truck HVAC company' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'chris@example.com' },
];

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.6)',
  border: '1px solid rgba(37,99,168,0.15)',
  borderRadius: 10,
  padding: '12px 16px',
  fontSize: 14,
  color: '#0F2A4A',
  width: '100%',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

export default function DemoPage() {
  const [form, setForm] = useState<FormState>({ name: '', company: '', what: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Demo form submission (stub):', form);
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById('calendar-embed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  return (
    <InnerPageShell
      eyebrow="Book a demo"
      headline="See Oaisis OS in your company."
      subhead="A 30-minute conversation. We'll show you what Oaisis OS looks like deployed to your operation specifically. No generic demo. No deck."
      maxWidth={760}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto"
        style={{ maxWidth: 600 }}
      >
        <Glass variant="glow" style={{ padding: 'clamp(36px, 5vw, 52px)' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block mb-2"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#2563A8',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    value={form[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#2563A8';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,168,0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(37,99,168,0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}

              <button type="submit" className="btn-primary-emerald w-full">
                Book your demo
                <ArrowRight className="w-4 h-4" />
              </button>

              <p
                className="text-center"
                style={{
                  fontSize: 12,
                  color: 'rgba(15,42,74,0.6)',
                  letterSpacing: '0.3px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                We respond within one business day.
              </p>
            </form>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-5" style={{ color: '#2563A8' }}>
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <p
                className="mb-3"
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#0F2A4A',
                  letterSpacing: '-0.2px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Got it, {form.name.split(' ')[0] || 'there'}.
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'rgba(15,42,74,0.78)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Pick a time below — or we'll reach out within one business day.
              </p>
            </div>
          )}
        </Glass>
      </motion.div>

      <div className="mx-auto" style={{ maxWidth: 760, marginTop: 32 }}>
        <div
          id="calendar-embed"
          data-provider="cal.com"
          data-fallback-provider="calendly"
          style={{
            minHeight: submitted ? 480 : 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'min-height 0.4s ease',
          }}
        >
          <Glass
            variant="default"
            className="w-full text-center"
            style={{ padding: 'clamp(28px, 4vw, 36px)' }}
          >
            <p
              className="mb-3"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#2563A8',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Calendar
            </p>
            {submitted ? (
              <>
                <p
                  className="mb-2"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#0F2A4A',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Calendar embed loads here.
                </p>
                <p
                  className="mx-auto"
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'rgba(15,42,74,0.7)',
                    maxWidth: '52ch',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Cal.com or Calendly — wired before public launch. Until then, the form above routes to our inbox and we reply within one business day.
                </p>
              </>
            ) : (
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: 'rgba(15,42,74,0.7)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Fill out the form above to reveal time slots.
              </p>
            )}
          </Glass>
        </div>
      </div>
    </InnerPageShell>
  );
}
