import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import AmbientBlobs from '../components/ui/AmbientBlobs';
import Glass from '../components/ui/Glass';
import GlowLogo from '../components/ui/GlowLogo';

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
  border: '1px solid rgba(26,107,74,0.15)',
  borderRadius: 10,
  padding: '12px 16px',
  fontSize: 14,
  color: '#2A1F38',
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
    // Placeholder: when wired, POST to /api/demo or similar.
    // For now, we just reveal the calendar and scroll to it.
    console.log('Demo form submission (stub):', form);
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById('calendar-embed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  return (
    <main className="relative overflow-hidden">
      <AmbientBlobs
        blobs={[
          { color: 'green', size: 280, top: '8%', right: '8%' },
          { color: 'blue', size: 240, top: '50%', left: '5%' },
          { color: 'tan', size: 220, bottom: '5%', right: '10%' },
        ]}
      />

      <div className="relative mx-auto px-6" style={{ maxWidth: 600, padding: '80px 24px 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Glass variant="glow" style={{ padding: 'clamp(36px, 5vw, 52px)' }}>
            <div className="flex justify-center mb-5">
              <GlowLogo size={64} glow="green" />
            </div>

            <p
              className="mb-3 text-center"
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#1A6B4A',
              }}
            >
              Book a demo
            </p>

            <h1
              className="display-heading text-brand-text mb-4 text-center"
              style={{ fontSize: 'clamp(26px, 4vw, 32px)' }}
            >
              See Pro OS in your business.
            </h1>

            <p
              className="text-brand-text-sec mb-8 text-center mx-auto"
              style={{ fontSize: 14, lineHeight: 1.7, maxWidth: '46ch' }}
            >
              A 30-minute conversation. We'll show you what Pro OS looks like deployed to your operation specifically. No generic demo. No deck.
            </p>

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
                        color: '#4D4060',
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
                        e.currentTarget.style.borderColor = '#1A6B4A';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,139,85,0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(26,107,74,0.15)';
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
                  style={{ fontSize: 11, color: '#8A7DA0', letterSpacing: '0.3px' }}
                >
                  {/* Form POST: stubbed. Wire to /api/demo (Resend or webhook) when ready. */}
                  We respond within one business day.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="flex justify-center mb-5" style={{ color: '#1A6B4A' }}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <p
                  className="mb-3"
                  style={{ fontSize: 18, fontWeight: 400, color: '#0F4D35', letterSpacing: '-0.2px' }}
                >
                  Got it, {form.name.split(' ')[0] || 'there'}.
                </p>
                <p className="text-brand-text-sec mb-2" style={{ fontSize: 14, lineHeight: 1.7 }}>
                  Pick a time below — or we'll reach out within one business day.
                </p>
              </div>
            )}
          </Glass>
        </motion.div>
      </div>

      <div className="relative mx-auto px-6" style={{ maxWidth: 760, padding: '24px 24px 100px' }}>
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
          {/*
            CALENDAR EMBED SLOT
            ──────────────────
            When Chris picks a provider, replace this block.

            Cal.com option:
              <Cal calLink="oaisis/demo" config={{layout: 'month_view'}} />
              (requires `@calcom/embed-react` install + Cal init in main.tsx)

            Calendly option:
              <div className="calendly-inline-widget"
                   data-url="https://calendly.com/oaisis/demo"
                   style={{ minWidth: '320px', height: '630px' }} />
              (requires script tag https://assets.calendly.com/assets/external/widget.js)

            Fallback (no JS embed): a styled <a href={calendarUrl} className="btn-primary-emerald" target="_blank" />

            For now, show a styled placeholder so the page reads complete.
          */}
          <Glass
            variant="default"
            className="w-full text-center"
            style={{ padding: 'clamp(28px, 4vw, 36px)' }}
          >
            <p
              className="mb-3"
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#2563A8',
              }}
            >
              Calendar
            </p>
            {submitted ? (
              <>
                <p className="text-brand-text mb-2" style={{ fontSize: 15, fontWeight: 500 }}>
                  Calendar embed loads here.
                </p>
                <p className="text-brand-text-sec mx-auto" style={{ fontSize: 13, lineHeight: 1.7, maxWidth: '52ch' }}>
                  Cal.com or Calendly — wired before public launch. Until then, the form above routes to our inbox and we reply within one business day.
                </p>
              </>
            ) : (
              <p className="text-brand-text-sec" style={{ fontSize: 13, lineHeight: 1.7 }}>
                Fill out the form above to reveal time slots.
              </p>
            )}
          </Glass>
        </div>
      </div>
    </main>
  );
}
