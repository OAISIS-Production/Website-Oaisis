import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/scroll';

interface Paragraph {
  lines: Array<Array<{ text: string; emphasis?: boolean }>>;
  className?: string;
  style?: React.CSSProperties;
}

const P1: Paragraph = {
  lines: [
    [{ text: 'Every era of business has its operating layer.' }],
    [{ text: 'Paper.' }, { text: ' Spreadsheets.' }, { text: ' Software.' }, { text: ' Now intelligence.' }],
  ],
};

const P2: Paragraph = {
  lines: [
    [
      { text: 'Most companies are bolting AI onto the side of how they already work.' },
      { text: ' Adding a chatbot. Buying a copilot. Hoping it sticks.' },
      { text: " It doesn't." },
    ],
    [
      { text: " The companies that win this era won't be the ones that " },
      { text: 'use', emphasis: true },
      { text: ' AI. They’ll be the ones whose operating layer ' },
      { text: 'is', emphasis: true },
      { text: ' AI.' },
    ],
  ],
};

function splitIntoWords(line: Array<{ text: string; emphasis?: boolean }>) {
  const tokens: Array<{ word: string; emphasis: boolean }> = [];
  line.forEach(({ text, emphasis = false }) => {
    text.split(/(\s+)/).forEach((piece) => {
      if (piece.trim().length === 0) {
        if (tokens.length) tokens[tokens.length - 1].word += piece;
        return;
      }
      tokens.push({ word: piece, emphasis });
    });
  });
  return tokens;
}

interface RevealParagraphProps {
  paragraph: Paragraph;
  size: 'lg' | 'xl';
  color?: string;
}

function RevealParagraph({ paragraph, size, color = '#2A1F38' }: RevealParagraphProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const wordEls = ref.current.querySelectorAll<HTMLSpanElement>('[data-word]');
    if (wordEls.length === 0) return;

    if (prefersReduced) {
      wordEls.forEach((el) => {
        el.style.opacity = '1';
        el.style.filter = 'blur(0px)';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { opacity: 0, filter: 'blur(8px)', y: 6 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );
    }, ref);

    return () => {
      ctx.revert();
    };
  }, []);

  const sizeStyle: React.CSSProperties =
    size === 'xl'
      ? {
          fontSize: 'clamp(28px, 4.4vw, 44px)',
          fontWeight: 200,
          letterSpacing: '-0.4px',
          lineHeight: 1.35,
        }
      : {
          fontSize: 'clamp(22px, 3.4vw, 34px)',
          fontWeight: 200,
          letterSpacing: '-0.3px',
          lineHeight: 1.4,
        };

  return (
    <div
      ref={ref}
      style={{
        color,
        ...sizeStyle,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {paragraph.lines.map((line, lineIdx) => {
        const tokens = splitIntoWords(line);
        return (
          <p key={lineIdx} style={{ margin: lineIdx > 0 ? '0.4em 0 0' : 0 }}>
            {tokens.map((tok, i) => (
              <span
                key={`${lineIdx}-${i}`}
                data-word
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  fontWeight: tok.emphasis ? 400 : 'inherit',
                  fontStyle: tok.emphasis ? 'italic' : 'normal',
                  color: tok.emphasis ? '#1A6B4A' : 'inherit',
                  opacity: 0,
                  filter: 'blur(8px)',
                  willChange: 'opacity, filter, transform',
                }}
              >
                {tok.word}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const finalRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!finalRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      finalRef.current.style.opacity = '1';
      finalRef.current.style.transform = 'translateY(0)';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        finalRef.current,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: finalRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5EFE0 0%, #FAF7F0 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="manifesto-ambient absolute pointer-events-none"
        style={{
          top: '15%',
          left: '-10%',
          width: 380,
          height: 380,
          background: 'radial-gradient(circle, rgba(26,107,74,0.10) 0%, rgba(26,107,74,0) 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden="true"
        className="manifesto-ambient-2 absolute pointer-events-none"
        style={{
          bottom: '20%',
          right: '-8%',
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(200,173,126,0.16) 0%, rgba(200,173,126,0) 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        className="relative mx-auto px-6 flex flex-col justify-center"
        style={{ maxWidth: 720, minHeight: '180vh', paddingTop: '20vh', paddingBottom: '20vh', gap: 'clamp(80px, 14vh, 180px)' }}
      >
        <RevealParagraph paragraph={P1} size="lg" />
        <RevealParagraph paragraph={P2} size="xl" />
        <p
          ref={finalRef}
          style={{
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 300,
            letterSpacing: '-0.6px',
            color: '#1A6B4A',
            lineHeight: 1.15,
            margin: 0,
            opacity: 0,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          That's what we build.
        </p>
      </div>
    </section>
  );
}
