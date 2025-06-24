'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
// import Image from 'next/image';

const verifiedEmails = new Set([
  'amaanbhati49@gmail.com',
  'amaan.bhati@keploy.io'
]);


const generateBadgeId = () => `BADGE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export default function BadgeGenerator() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', github: '', email: '', task1: '', task2: '' });
  const [badgeGenerated, setBadgeGenerated] = useState<boolean | null>(null);
  const [badgeId, setBadgeId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const { name, github, email, task1, task2 } = formData;

    if (!name || !github || !email || !task1 || !task2) {
      alert('Please fill all fields.');
      return;
    }

    if (!verifiedEmails.has(email.trim().toLowerCase())) {
      setBadgeGenerated(false);
      return;
    }

    setBadgeId(generateBadgeId());
    setBadgeGenerated(true);
  };

  const handleDownload = async () => {
    if (!badgeRef.current) return;

    const canvas = await html2canvas(badgeRef.current, { scale: 3 });
    const link = document.createElement('a');
    link.download = 'keploy-opensource101-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen relative py-10 px-4">
      {/* Background image visible only when badge not generated */}
      {!badgeGenerated && (
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://res.cloudinary.com/dqwbkjfuh/image/upload/v1750324750/orange-painting_edknnl.jpg')] bg-cover bg-center" />
        </div>
      )}

      <h1 className="relative z-10 text-4xl font-bold text-center text-white-100 mb-6">
        Keploy - Software Testing 101 Badge
      </h1>

      {/* Glassmorphic Form */}
      {!badgeGenerated && (
        <div className="relative z-10 max-w-md mx-auto backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-2xl p-6 space-y-4 text-white">
          {['name', 'github', 'email', 'task1', 'task2'].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={
                field === 'task1'
                  ? 'Task 1 URL'
                  : field === 'task2'
                  ? 'Task 2 URL'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/80 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          ))}

          <button
            onClick={handleGenerate}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md"
          >
            Generate Badge
          </button>

          {badgeGenerated === false && (
            <div className="mt-6 p-4 rounded-lg border border-red-400 bg-red-100/40 backdrop-blur-md text-sm text-red-900">
              <strong className="block font-semibold mb-1">Badge generation unsuccessful:</strong>
              <ul className="list-disc list-inside">
                <li>Ensure you submitted the assignment before the deadline, <strong>24th June 11AM</strong>.</li>
                <li>Use the <strong>same email ID</strong> you submitted in the form.</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Badge Preview */}
      {badgeGenerated && (
        <div className="flex flex-col items-center ">
          <div
            ref={badgeRef}
            className="w-[350px] h-[350px] bg-white shadow-xl rounded-2xl flex items-center justify-center relative mt-20"
          >
            <div className="w-[300px] h-[300px] mt-2 bg-gradient-to-br from-orange-100 to-white rounded-full flex flex-col items-center justify-center text-center p-6 relative border-[6px] border-orange-200">
              {/* Ribbon */}
              <div className="absolute top-0 w-10 h-4 bg-orange-500 rounded-b-xl" />
              {/* Stars */}
              <div className=" text-orange-400 text-sm">★★★</div>
              {/* Logo */}
              <img
                src="/assets/images/keploy-logo.png"
                alt="Keploy Logo"
                className="w-18 h-8 object-contain"
                crossOrigin="anonymous"
              />
              <p className="text-[16px] tracking-widest font-semibold text-gray-800 mt-0">API FELLOWSHIP</p>
              <h2 className="text-[23px] font-bold text-orange-600 my-1 mb-0">Software Testing 101</h2>
              <h3 className=" font-bold text-gray-800 text-[20px] mb-0">{formData.name}</h3>
              <p className="text-[11px] text-gray-600 -mt-1">HANDS-ON LEARNING</p>
              <p className="text-[10px] text-gray-500">{new Date().toLocaleDateString()}</p>
              {/* <p className="text-[13px] mt-2 text-gray-400 italic">{badgeId}</p> */}
              <div className="absolute bottom-2 -mt-[20px] w-12 h-1 bg-orange-400 rounded-full" />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}