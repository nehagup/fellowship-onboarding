'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Alex_Brush } from 'next/font/google';

const verifiedEmails = new Set([
  'amaan.bhati@keploy.io',
  'mahallepratik683@gmail.com',
  'aarab.nishchal@gmail.com',
  '2206424@kiit.ac.in',
  'devabdulx@gmail.com',
  'abhayrathore036@gmail.com',
  'adarshsikreewal1211@gmail.com',
  '22051308@kiit.ac.in',
  'adityabahadur294@gmail.com',
  'prakashaditya061@gmail.com',
  '22052616@kiit.ac.in',
  'amanraj1227@gmail.com',
  '22051055@kiit.ac.in',
  'ananyaritu51@gmail.com',
  'andrew@consarnproject.com',
  'tuanafk2006@gmail.com',
  '22052093@kiit.ac.in',
  'anjupathak9810@gmail.com',
  '22053140@kiit.ac.in',
  '22052706@kiit.ac.in',
  'annashapaul65855@gmail.com',
  'anthonyrozario62@gmail.com',
  'anuragofficial260@gmail.com',
  'anushaamar1111@gmail.com',
  '2205712@kiit.ac.in',
  '22053227@kiit.ac.in',
  'arinkishore7@gmail.com',
  '22051754@kiit.ac.in',
  'singhaarka0@gmail.com',
  'arpreet4114@gmail.com',
  '22054363@kiit.ac.in',
  '22052626@kiit.ac.in',
  '22052101@kiit.ac.in',
  'aryanv.india1@gmail.com',
  '2205190@kiit.ac.in',
  'ashishsingh009876@gmail.com',
  'eatulrajput@gmail.com',
  '22054295@kiit.ac.in',
  'dasayush483@gmail.com',
  'kumar.ayushx24@gmail.com',
  'ayushmans012@gmail.com',
  'debarjunpal134@gmail.com',
  'deepsikha1104@gmail.com',
  'devanshbajpai07@gmail.com',
  'mdl.dhruba@gmail.com',
  'utsuronoyume@gmail.com',
  '22051158@kiit.ac.in',
  '22052724@kiit.ac.in',
  'gkrcoder@gmail.com',
  'hansikachaudhary20@gmail.com',
  'hranjan3246@gmail.com',
  'harshitbamotra.01@gmail.com',
  '22052982@kiit.ac.in',
  'harshit.kr.singh.work@gmail.com',
  '22052983@kiit.ac.in',
  '2205732@kiit.ac.in',
  '22052388@kiit.ac.in',
  'roykaushik354@gmail.com',
  '22052732@kiit.ac.in',
  '22051081@kiit.ac.in',
  'kanimeena678@gmail.com',
  'krishsenpai7@gmail.com',
  '22054339@kiit.ac.in',
  '22053178@kiit.ac.in',
  '22052471@kiit.ac.in',
  'maithilibprojects@gmail.com',
  '2206353@kiit.ac.in',
  'manveer7saggu@gmail.com',
  '2205751@kiit.ac.in',
  'agrawalmohak988@gmail.com',
  'mohamedimthiyas62696@gmail.com',
  'monasrimohandoss@gmail.com',
  'mratyunjaychouhan45@gmail.com',
  'mridulagarwal20082004@gmail.com',
  'nehabommireddy@gmail.com',
  'omaasinha.99@gmail.com',
  'p2005p5499p@gmail.com',
  '22054406@kiit.ac.in',
  '22052485@kiit.ac.in',
  'pranjalbarnwaldev@gmail.com',
  '22053615@kiit.ac.in',
  'kotalpratik@gmail.com',
  '22051178@kiit.ac.in',
  'rajpriyanshu1204@gmail.com',
  'lragesh28@gmail.com',
  '2470251@kiit.ac.in',
  '22052842@kiit.ac.in',
  '22052576@kiit.ac.in',
  'ramankumar7c@gmail.com',
  '22052140@kiit.ac.in',
  'deyricky36@gmail.com',
  'rishikesh2747@gmail.com',
  '22052668@kiit.ac.in',
  '2228053@kiit.ac.in',
  'mauryapriyadarshi2004@gmail.com',
  '22051187@kiit.ac.in',
  'dripclade@gmail.com',
  'samriddhi.singh1222@gmail.com',
  'sanjanabiswasiscute@gmail.com',
  '2205846@kiit.ac.in',
  'sahadribhattacharyya@gmail.com',
  '2229061@kiit.ac.in',
  'shafaqueakhtar43@gmail.com',
  'shaswatjha12345@gmail.com',
  '22052854@kiit.ac.in',
  '22051621@kiit.ac.in',
  '22053194@kiit.ac.in',
  '2230290@kiit.ac.in',
  '22052155@kiit.ac.in',
  'shritisadhu@gmail.com',
  '2230121@kiit.ac.in',
  'shubhamsahoo401@gmail.com',
  '22051027@kiit.ac.in',
  '33sorbojitmondal@gmail.com',
  'soumyodeep89s@gmail.com',
  '22051289@kiit.ac.in',
  '100sumanghosh@gmail.com',
  'swapsnil12@gmail.com',
  '22054184@kiit.ac.in',
  'thiyathiya088@gmail.com',
  '2470404@kiit.ac.in',
  'uddipta278@gmail.com',
  '2205951@kiit.ac.in',
  'utkarshshah000@gmail.com',
  'varun.mohanta323@gmail.com',
  '22053301@kiit.ac.in',
  'vipulsingh.1404@gmail.com',
  'singhvishalk165@gmail.com',
  'yashigarg016@gmail.com',
  'ybhatter@scu.edu',
  'prasadyuvraj8805@gmail.com',
  'xq1@williams.edu',
]);

const generateCertificateId = () => `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

const formatDate = (d: Date) => `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
const alexBrush = Alex_Brush({ weight: '400', subsets: ['latin'] });

const Certificate = ({ name, program, signer, date }: any) => {
  return (
    <div
      id="certificate"
      className="bg-white"
      style={{
        width: '100%',
        maxWidth: '1000px',
        aspectRatio: '1000 / 700',
        position: 'relative',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        minHeight: '280px'
      }}
    >
      <style>{`
        /* Mobile First Responsive Design */
        #certificate {
          font-size: 14px;
        }
        
        /* Extra small phones (320px and below) */
        @media (max-width: 320px) {
          #certificate { min-height: 200px !important; }
          #certificate .logo { 
            width: 30px !important; 
            top: 8px !important; 
            left: 8px !important; 
          }
          #certificate .cert-title { 
            font-size: 14px !important; 
            letter-spacing: 1px !important;
            margin-bottom: 4px !important;
          }
          #certificate .cert-subtitle { 
            font-size: 6px !important; 
            letter-spacing: 1px !important;
            margin-bottom: 4px !important;
          }
          #certificate .present-text { 
            font-size: 7px !important;
            margin-bottom: 4px !important;
          }
          #certificate .name-accent-top { 
            width: 20px !important; 
            height: 1px !important; 
            margin-bottom: 3px !important; 
          }
          #certificate .participant-name { 
            font-size: 12px !important;
            margin-bottom: 3px !important;
            line-height: 1 !important;
          }
          #certificate .name-underline { 
            width: 50% !important; 
            height: 1px !important;
            margin-top: 4px !important; 
          }
          #certificate .body-paragraph { 
            font-size: 6px !important; 
            line-height: 1.3 !important;
            margin-bottom: 4px !important;
            padding: 0 4px !important;
          }
          #certificate .main-content { 
            padding: 8px 4px 20px !important;
          }
          #certificate .footer-block { 
            padding: 0 4px 8px !important;
            height: 40px !important;
          }
          #certificate .signer-block { 
            bottom: 4px !important;
          }
          #certificate .signer-block .signature-name { 
            font-size: 10px !important;
            margin-bottom: 1px !important;
          }
          #certificate .signer-block .signer-name { 
            font-size: 5px !important;
            margin-bottom: 1px !important;
          }
          #certificate .signer-block .signer-title { 
            font-size: 5px !important;
          }
          #certificate .inner-border {
            top: 4px !important;
            left: 4px !important;
            right: 4px !important;
            bottom: 4px !important;
            border-width: 1px !important;
          }
          #certificate .decorative-line {
            width: 30px !important;
            height: 2px !important;
          }
        }

        /* Small phones (up to 480px) */
        @media (min-width: 321px) and (max-width: 480px) {
          #certificate { min-height: 250px !important; }
          #certificate .logo { 
            width: 35px !important; 
            top: 12px !important; 
            left: 12px !important; 
          }
          #certificate .cert-title { 
            font-size: 16px !important; 
            letter-spacing: 1.5px !important;
            margin-bottom: 6px !important;
          }
          #certificate .cert-subtitle { 
            font-size: 7px !important; 
            letter-spacing: 1.5px !important;
            margin-bottom: 6px !important;
          }
          #certificate .present-text { 
            font-size: 8px !important;
            margin-bottom: 6px !important;
          }
          #certificate .name-accent-top { 
            width: 25px !important; 
            height: 2px !important; 
            margin-bottom: 4px !important; 
          }
          #certificate .participant-name { 
            font-size: 14px !important;
            margin-bottom: 6px !important;
          }
          #certificate .name-underline { 
            width: 55% !important; 
            height: 1px !important;
            margin-top: 6px !important; 
          }
          #certificate .body-paragraph { 
            font-size: 8px !important; 
            line-height: 1.4 !important;
            margin-bottom: 6px !important;
            padding: 0 8px !important;
          }
          #certificate .main-content { 
            padding: 12px 8px 30px !important;
          }
          #certificate .footer-block { 
            padding: 0 8px 12px !important;
            height: 50px !important;
          }
          #certificate .signer-block { 
            bottom: 8px !important;
          }
          #certificate .signer-block .signature-name { 
            font-size: 16px !important;
            margin-bottom: 1px !important;
          }
          #certificate .signer-block .signer-name { 
            font-size: 8px !important;
            margin-bottom: 2px !important;
          }
          #certificate .signer-block .signer-title { 
            margin-bottom: 2px !important;
            font-size: 8px !important;
          }
          #certificate .inner-border {
            top: 8px !important;
            left: 8px !important;
            right: 8px !important;
            bottom: 8px !important;
          }
          #certificate .decorative-line {
            width: 40px !important;
            height: 2px !important;
          }
        }

        /* Tablets and larger phones */
        @media (min-width: 481px) and (max-width: 768px) {
          #certificate .logo { 
            width: clamp(40px, 7vw, 70px) !important; 
            top: clamp(15px, 3.5vw, 25px) !important; 
            left: clamp(15px, 3.5vw, 25px) !important; 
          }
          #certificate .cert-title { 
            font-size: clamp(20px, 5vw, 32px) !important; 
            letter-spacing: 3px !important;
          }
          #certificate .cert-subtitle { 
            font-size: clamp(9px, 2vw, 14px) !important; 
            letter-spacing: 2px !important;
          }
          #certificate .present-text { 
            font-size: clamp(10px, 2.5vw, 16px) !important;
          }
          #certificate .participant-name { 
            font-size: clamp(18px, 4vw, 28px) !important;
          }
          #certificate .body-paragraph { 
            font-size: clamp(10px, 2.2vw, 14px) !important; 
            line-height: 1.5 !important;
          }
          #certificate .signer-block .signature-name { 
            font-size: clamp(20px, 4vw, 32px) !important;
          }
          #certificate .signer-block .signer-name { 
            font-size: clamp(10px, 2vw, 12px) !important;
          }
          #certificate .signer-block .signer-title { 
            font-size: clamp(10px, 2vw, 12px) !important;
          }
        }
      `}</style>

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
      <div className="inner-border" style={{
        position: 'absolute',
        top: 'clamp(8px, 3vw, 40px)',
        left: 'clamp(8px, 3vw, 40px)',
        right: 'clamp(8px, 3vw, 40px)',
        bottom: 'clamp(8px, 3vw, 40px)',
        border: '2px solid #eab308',
        opacity: 0.9,
        zIndex: 2
      }} />

      {/* Content */}
      <div className="content-root" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        {/* Header with Logo */}
        <img className="logo"
          src="/assets/images/keploy-logo.png"
          alt="Keploy Logo"
          style={{
            position: 'absolute',
            top: 'clamp(20px, 5vw, 65px)',
            left: 'clamp(20px, 5vw, 65px)',
            width: 'clamp(50px, 10vw, 120px)',
            height: 'auto',
            objectFit: 'contain',
            imageRendering: 'crisp-edges' as any,
            zIndex: 15
          }}
          crossOrigin="anonymous"
        />

        {/* Main Content */}
        <div className="main-content" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(20px, 8vw, 100px) clamp(12px, 6vw, 80px) 0',
          textAlign: 'center'
        }}>
          <div className="cert-title" style={{
            fontFamily: 'serif',
            fontSize: 'clamp(18px, 5vw, 60px)',
            fontWeight: 800,
            color: '#111827',
            marginBottom: 'clamp(4px, 2vw, 10px)',
            letterSpacing: 'clamp(2px, 1vw, 6px)'
          }}>CERTIFICATE</div>

          <div className="cert-subtitle" style={{
            fontFamily: 'serif',
            fontSize: 'clamp(8px, 2vw, 18px)',
            color: '#6b7280',
            letterSpacing: 'clamp(2px, 1vw, 6px)',
            marginBottom: 'clamp(6px, 2vw, 12px)',
            textTransform: 'uppercase'
          }}>OF PARTICIPATION</div>

          <div className="present-text" style={{
            fontSize: 'clamp(9px, 2vw, 18px)',
            color: '#374151',
            marginBottom: 'clamp(6px, 2vw, 12px)'
          }}>We are proud to present this to</div>

          <div className="name-block" style={{ marginBottom: 'clamp(8px, 3vw, 16px)' }}>
            <div className="name-accent-top" style={{
              width: 'clamp(30px, 6vw, 64px)',
              height: 'clamp(2px, 0.5vw, 3px)',
              background: '#b67d4b',
              margin: '0 auto clamp(4px, 2vw, 12px)'
            }} />

            <div className="participant-name" style={{
              fontFamily: 'serif',
              fontSize: 'clamp(16px, 4vw, 48px)',
              fontWeight: 800,
              color: '#7a4b2a',
              marginBottom: 'clamp(6px, 2vw, 14px)',
              lineHeight: 1.15,
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}>{name}</div>

            <div className="name-underline" style={{
              width: 'clamp(60%, 15vw, 70%)',
              height: 'clamp(1px, 0.3vw, 2px)',
              background: '#8b5e3c',
              margin: 'clamp(6px, 2vw, 18px) auto 0'
            }} />
          </div>

          <div className="body-paragraph" style={{
            maxWidth: '90%',
            color: '#374151',
            fontSize: 'clamp(9px, 1.8vw, 16px)',
            lineHeight: 'clamp(1.4, 0.3vw, 1.6)',
            marginBottom: 'clamp(8px, 3vw, 18px)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: 'clamp(4px, 1vw, 10px)' }}>
              for participating in <span style={{ fontWeight: 600, color: '#7a4b2a' }}>{program}</span>!
            </div>
            <div>
              Your dedication and hard work have made a significant impact, and we are truly grateful for your support.
            </div>
          </div>

          <div className="decorative-line" style={{
            width: 'clamp(50px, 8vw, 80px)',
            height: 'clamp(2px, 0.5vw, 4px)',
            background: '#b67d4b',
            borderRadius: 9999
          }} />
        </div>

        {/* Footer with centered Signature */}
        <div className="footer-block" style={{
          position: 'relative',
          padding: '0 clamp(8px, 4vw, 48px) clamp(12px, 4vw, 64px)',
          height: 'clamp(60px, 12vw, 146px)'
        }}>
          <div className="signer-block" style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 'clamp(10px, 4vw, 60px)',
            textAlign: 'center'
          }}>
            <div className={`${alexBrush.className} signature-name`} style={{
              fontSize: 'clamp(16px, 3vw, 44px)',
              color: '#25303f',
              marginBottom: 'clamp(2px, 1vw, 12px)',
              lineHeight: 1
            }}>Neha Gupta</div>

            <div className="signer-name" style={{
              fontWeight: 700,
              color: '#7a4b2a',
              fontSize: 'clamp(8px, 1.5vw, 12px)',
              marginBottom: 2
            }}>Neha Gupta</div>

            <div className="signer-title" style={{
              fontSize: 'clamp(8px, 1.5vw, 12px)',
              color: '#6b7280'
            }}>CEO, Keploy.io</div>
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
      const prevStyles = {
        width: (element as HTMLElement).style.width,
        height: (element as HTMLElement).style.height,
        aspectRatio: (element as HTMLElement).style.aspectRatio,
        minHeight: (element as HTMLElement).style.minHeight
      };

      (element as HTMLElement).style.width = '1000px';
      (element as HTMLElement).style.height = '700px';
      (element as HTMLElement).style.aspectRatio = 'auto';
      (element as HTMLElement).style.minHeight = '700px';

      const width = 1000;
      const height = 700;
      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY,
        width: width,
        height: height
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('landscape', 'px', [width, height]);
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${formData.name.replace(/\s+/g, '_')}_keploy_api_fellowship_certificate.pdf`);

      // Restore previous styles
      (element as HTMLElement).style.width = prevStyles.width;
      (element as HTMLElement).style.height = prevStyles.height;
      (element as HTMLElement).style.aspectRatio = prevStyles.aspectRatio;
      (element as HTMLElement).style.minHeight = prevStyles.minHeight;
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

    const prevStyles = {
      width: (element as HTMLElement).style.width,
      height: (element as HTMLElement).style.height,
      aspectRatio: (element as HTMLElement).style.aspectRatio,
      minHeight: (element as HTMLElement).style.minHeight
    };

    (element as HTMLElement).style.width = '1000px';
    (element as HTMLElement).style.height = '700px';
    (element as HTMLElement).style.aspectRatio = 'auto';
    (element as HTMLElement).style.minHeight = '700px';

    const canvas = await html2canvas(element, {
      scale: 4,
      useCORS: true,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY,
      width: 1000,
      height: 700
    });
    const link = document.createElement('a');
    link.download = `${formData.name.replace(/\s+/g, '_')}_keploy_api_fellowship_certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Restore previous styles
    (element as HTMLElement).style.width = prevStyles.width;
    (element as HTMLElement).style.height = prevStyles.height;
    (element as HTMLElement).style.aspectRatio = prevStyles.aspectRatio;
    (element as HTMLElement).style.minHeight = prevStyles.minHeight;
  };

  return (
    <div className="min-h-screen relative" style={{ padding: 'clamp(16px, 4vw, 40px) clamp(8px, 2vw, 16px)' }}>
      <style>{`
        .cg-input::placeholder { color: rgba(255,255,255,0.8); }
        .cg-btn { background: #f97316; }
        .cg-btn:hover { background: #ea580c; }
        .download-actions { 
          display: flex; 
          gap: clamp(8px, 3vw, 16px); 
          justify-content: center; 
          width: 100%;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .download-actions { flex-direction: column; align-items: center; }
          .download-actions button { 
            width: clamp(200px, 80vw, 300px); 
            margin: 0 auto; 
          }
        }
      `}</style>

      {/* Background image visible only when certificate not generated */}
      {!certificateGenerated && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: "url('https://res.cloudinary.com/dqwbkjfuh/image/upload/v1750324750/orange-painting_edknnl.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}

      {/* Pre-generation Form */}
      {!certificateGenerated && (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: 'clamp(20px, 6vw, 32px)',
            fontWeight: 800,
            textShadow: '0 2px 6px rgba(0,0,0,0.3)',
            marginBottom: 8,
            textAlign: 'center',
            lineHeight: 1.2
          }}>Keploy API Fellowship Certificate</h1>

          <p style={{
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 12,
            textShadow: '0 1px 3px rgba(0,0,0,0.25)',
            fontSize: 'clamp(12px, 3vw, 16px)',
            textAlign: 'center'
          }}>Enter your details to generate your certificate</p>

          <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}
            style={{
              width: 'clamp(280px, 90vw, 420px)',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              borderRadius: 14,
              padding: 'clamp(14px, 4vw, 18px)',
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
                  width: '100%',
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.25)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: 'clamp(12px, 3vw, 16px)'
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
                  width: '100%',
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.25)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: 'clamp(12px, 3vw, 16px)'
                }}
              />

              <button type="submit"
                className="bg-[#1a0e1f] hover:bg-[#2b1535] text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-200 font-semibold py-3 px-4 rounded-lg transition shadow-md shadow-orange-900 hover:shadow-orange-500 border border-orange-800"
                style={{
                  width: '100%',
                  color: '#fff',
                  fontWeight: 700,
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'clamp(12px, 3vw, 16px)'
                }}
              >
                Generate Certificate
              </button>
            </div>

            {certificateGenerated === false && (
              <div style={{
                marginTop: 12,
                padding: 'clamp(8px, 2vw, 10px)',
                borderRadius: 10,
                border: '1px solid rgba(254,226,226,0.8)',
                background: 'rgba(254,226,226,0.35)',
                color: '#7f1d1d',
                fontSize: 'clamp(11px, 2.5vw, 14px)'
              }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>Certificate generation unsuccessful:</strong>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>This certificate is only issued to the participants who have submitted all the 5 assignments in the program.</li>
                  <li>Ensure you are using the registered email address.</li>
                  <li>Contact the program administrator if you believe this is an error.</li>
                </ul>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Certificate Preview */}
      {certificateGenerated && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div ref={certificateRef} style={{ marginTop: 'clamp(12px, 3vw, 32px)', width: '100%' }}>
            <Certificate
              name={formData.name}
              program="Keploy API Fellowship Program"
              signer={formData.signer}
              date={formatDate(new Date())}
            />
          </div>

          <div className="download-actions" style={{ marginTop: 'clamp(16px, 4vw, 24px)' }}>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              style={{
                backgroundColor: isGenerating ? '#fb923c' : '#f97316',
                color: '#fff',
                padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
                borderRadius: 8,
                fontWeight: 600,
                border: 'none',
                cursor: isGenerating ? 'wait' : 'pointer',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                if (!isGenerating) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ea580c';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = isGenerating ? '#fb923c' : '#f97316';
              }}
            >
              {isGenerating ? 'Generating…' : 'Download PDF'}
            </button>
            <button
              onClick={handleDownloadPNG}
              style={{
                backgroundColor: '#16a34a',
                color: '#fff',
                padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
                borderRadius: 8,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(12px, 2.5vw, 16px)',
                minWidth: '120px'
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