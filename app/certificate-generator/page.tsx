'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Great_Vibes } from 'next/font/google';

const verifiedEmails = new Set([
    'amaan.bhati@keploy.io',
    'mahallepratik683@gmail.com',
]);

const generateCertificateId = () => `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

const formatDate = (d: Date) => `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });

const Certificate = ({ name, program, signer, date }: any) => {
  return (
    <div
      id="certificate"
      className="bg-white"
      style={{
        width: 'min(1000px, 95vw)',
        height: 'auto',
        aspectRatio: '1000 / 700',
        position: 'relative',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}
    >
      {/* Background geometric patterns */}
      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
        viewBox="0 0 1000 700" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orangeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8500" />
            <stop offset="100%" stopColor="#ffbe0b" />
          </linearGradient>
          <linearGradient id="orangeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd60a" />
            <stop offset="100%" stopColor="#ff8500" />
          </linearGradient>
        </defs>
        <polygon points="700,0 1000,0 1000,200" fill="url(#orangeGrad1)" opacity="0.15" />
        <polygon points="0,500 0,700 300,700" fill="url(#orangeGrad2)" opacity="0.15" />
        <polygon points="0,400 100,450 0,500" fill="url(#orangeGrad1)" opacity="0.1" />
        <polygon points="900,100 950,150 900,200" fill="url(#orangeGrad2)" opacity="0.1" />
      </svg>

      {/* Inner decorative border */}
      <div className="inner-border" style={{ position: 'absolute', top: 'clamp(16px, 4vw, 40px)', left: 'clamp(16px, 4vw, 40px)', right: 'clamp(16px, 4vw, 40px)', bottom: 'clamp(16px, 4vw, 40px)', border: '2px solid #eab308', opacity: 0.9, zIndex: 2 }} />

      {/* Content */}
      <div className="content-root" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        {/* Header with Logo */}
        <img className="logo"
          src="/assets/images/keploy-logo.png"
          alt="Keploy Logo"
          style={{ position: 'absolute', top: 'clamp(20px, 5.6vw, 56px)', left: 'clamp(20px, 5.6vw, 56px)', width: 'clamp(110px, 14vw, 140px)', height: 'auto', objectFit: 'contain', imageRendering: 'crisp-edges' as any }}
          crossOrigin="anonymous"
        />



        {/* Main Content */}
        <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(60px, 10vw, 100px) clamp(24px, 8vw, 80px) 0', textAlign: 'center' }}>
          <div className="cert-title" style={{ fontFamily: 'serif', fontSize: 'clamp(28px, 6vw, 60px)', fontWeight: 800, color: '#111827', marginBottom: 10, letterSpacing: 6 }}>CERTIFICATE</div>
          <div className="cert-subtitle" style={{ fontFamily: 'serif', fontSize: 'clamp(12px, 2.2vw, 18px)', color: '#6b7280', letterSpacing: 6, marginBottom: 12, textTransform: 'uppercase' }}>OF PARTICIPATION</div>

          <div className="present-text" style={{ fontSize: 'clamp(12px, 2vw, 18px)', color: '#374151', marginBottom: 12 }}>We are proud to present this to</div>

          <div className="name-block" style={{ marginBottom: 16 }}>
            <div className="name-accent-top" style={{ width: 'clamp(40px, 8vw, 64px)', height: 3, background: '#b67d4b', margin: '0 auto 12px' }} />
            <div className="participant-name" style={{ fontFamily: 'serif', fontSize: 'clamp(24px, 5vw, 48px)', fontWeight: 800, color: '#7a4b2a', marginBottom: 14, lineHeight: 1.15 }}>{name}</div>
            <div className="name-underline" style={{ width: 'min(380px, 70%)', height: 2, background: '#8b5e3c', margin: '18px auto 0' }} />
          </div>

          <div className="body-paragraph" style={{ maxWidth: 640, color: '#374151', fontSize: 'clamp(12px, 1.6vw, 16px)', lineHeight: 1.6, marginBottom: 18 }}>
            <div style={{ marginBottom: 10 }}>
              for successfully participating <span style={{ fontWeight: 600, color: '#7a4b2a' }}>{program}</span>!
            </div>
            <div>
              Your dedication and hard work have made a significant impact, and we are truly grateful for your support.
            </div>
          </div>

          <div style={{ width: 80, height: 4, background: '#b67d4b', borderRadius: 9999 }} />
        </div>

        {/* Footer with centered Signature and Date on right */}
        <div className="footer-block" style={{ position: 'relative', padding: '0 48px 64px', height: 146 }}>
          {/* Centered signer with signature text */}
          <div className="signer-block" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 68, textAlign: 'center' }}>
            <div className={greatVibes.className} style={{ fontSize: 'clamp(28px,3.2vw,40px)', color: '#2f2f2f', marginBottom: 12, lineHeight: 1 }}>Neha Gupta</div>
            <div style={{ fontWeight: 700, color: '#7a4b2a', fontSize: 16, marginBottom: 2 }}>Neha Gupta</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>CEO, Keploy.io</div>
          </div>

          {/* Date on the right */}
          <div className="date-block" style={{ position: 'absolute', right: 48, bottom: 64, textAlign: 'right' }}>
            <div style={{ color: '#374151', fontWeight: 600 }}>{date}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Date of Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CertificateGenerator() {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    signer: 'Neha Gupta'
  });
  const [certificateGenerated, setCertificateGenerated] = useState<boolean | null>(null);
  const [certificateId, setCertificateId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const { name, email } = formData;

    if (!name || !email) {
      alert('Please fill all required fields.');
      return;
    }

    if (!verifiedEmails.has(email.trim().toLowerCase())) {
      setCertificateGenerated(false);
      return;
    }

    setCertificateId(generateCertificateId());
    setCertificateGenerated(true);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('certificate');
    if (!element) return;
    setIsGenerating(true);

    try {
      const prevWidth = (element as HTMLElement).style.width;
      const prevHeight = (element as HTMLElement).style.height;
      const prevAspect = (element as HTMLElement).style.aspectRatio as any;
      (element as HTMLElement).style.width = '1000px';
      (element as HTMLElement).style.height = '700px';
      (element as HTMLElement).style.aspectRatio = 'auto' as any;
      const width = 1000;
      const height = 700;
      const canvas = await html2canvas(element, { 
        scale: 4,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('landscape', 'px', [width, height]);
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${formData.name.replace(/\s+/g, '_')}_keploy_api_fellowship_certificate.pdf`);
      (element as HTMLElement).style.width = prevWidth;
      (element as HTMLElement).style.height = prevHeight;
      (element as HTMLElement).style.aspectRatio = prevAspect;
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPNG = async () => {
    const element = document.getElementById('certificate');
    if (!element) return;

    const prevWidth = (element as HTMLElement).style.width;
    const prevHeight = (element as HTMLElement).style.height;
    const prevAspect = (element as HTMLElement).style.aspectRatio as any;
    (element as HTMLElement).style.width = '1000px';
    (element as HTMLElement).style.height = '700px';
    (element as HTMLElement).style.aspectRatio = 'auto' as any;

    const canvas = await html2canvas(element, { scale: 4, useCORS: true, backgroundColor: '#ffffff', scrollY: -window.scrollY });
    const link = document.createElement('a');
    link.download = `${formData.name.replace(/\s+/g, '_')}_keploy_api_fellowship_certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    (element as HTMLElement).style.width = prevWidth;
    (element as HTMLElement).style.height = prevHeight;
    (element as HTMLElement).style.aspectRatio = prevAspect;
  };

  return (
    <div className="min-h-screen relative" style={{ padding: '40px 16px' }}>
      <style>{`
        .cg-input::placeholder { color: rgba(255,255,255,0.8); }
        .cg-btn { background: #f97316; }
        .cg-btn:hover { background: #ea580c; }
        .download-actions { display: flex; gap: 16px; justify-content: center; width: 100%; }
        @media (max-width: 520px) {
          .download-actions { flex-direction: column; gap: 12px; }
          .download-actions button { width: 92vw; margin: 0 auto; }
        }
      `}</style>
      {/* Background image visible only when certificate not generated */}
      {!certificateGenerated && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('https://res.cloudinary.com/dqwbkjfuh/image/upload/v1750324750/orange-painting_edknnl.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}

      {/* Pre-generation Form (inline styled for consistency) */}
      {!certificateGenerated && (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <h1 style={{ color: '#ffffff', fontSize: 32, fontWeight: 800, textShadow: '0 2px 6px rgba(0,0,0,0.3)', marginBottom: 8 }}>Keploy API Fellowship Certificate</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 12, textShadow: '0 1px 3px rgba(0,0,0,0.25)' }}>Enter your details to generate your certificate</p>

          <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}
            style={{
              width: 'min(420px, 95vw)',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              borderRadius: 14,
              padding: 18,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff'
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                name="name"
                type="text"
                placeholder="Participant Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="cg-input"
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.25)',
                  color: '#fff', outline: 'none'
                }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="cg-input"
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.25)',
                  color: '#fff', outline: 'none'
                }}
              />

              <button type="submit"
                className="cg-btn"
                style={{
                  width: '100%', color: '#fff', fontWeight: 700,
                  padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer'
                }}
              >
                Generate Certificate
              </button>
            </div>

            {certificateGenerated === false && (
              <div style={{ marginTop: 12, padding: 10, borderRadius: 10, border: '1px solid rgba(254,226,226,0.8)', background: 'rgba(254,226,226,0.35)', color: '#7f1d1d' }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>Certificate generation unsuccessful:</strong>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Ensure you are using a verified email address.</li>
                  <li>Contact the program administrator if you believe this is an error.</li>
                </ul>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Certificate Preview */}
      {certificateGenerated && (
        <div className="flex flex-col items-center">
          <div ref={certificateRef} className="mt-8">
            <Certificate 
              name={formData.name} 
              program="Keploy API Fellowship Program"
              signer={formData.signer}
              date={formatDate(new Date())}
            />
          </div>

          <div className="download-actions" style={{ marginTop: 24 }}>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              style={{
                backgroundColor: isGenerating ? '#fb923c' : '#f97316',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: 8,
                fontWeight: 600,
                border: 'none',
                cursor: isGenerating ? 'wait' : 'pointer'
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ea580c'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = isGenerating ? '#fb923c' : '#f97316'; }}
            >
              {isGenerating ? 'Generating…' : 'Download PDF'}
            </button>
            <button
              onClick={handleDownloadPNG}
              style={{
                backgroundColor: '#16a34a',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: 8,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#15803d'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#16a34a'; }}
            >
              Download PNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 