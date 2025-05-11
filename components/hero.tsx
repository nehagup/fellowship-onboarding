'use client';
import React, { useRef, useState } from 'react';
import NextImage from 'next/image';

const loadingStates = [
  { text: "Checking the registration Status" },
  { text: "Checking your acceptance into the program" },
  { text: "Checking if you have star marked our repository" },
];

interface UserData {
  name: string;
  github: string;
  email: string;
  image: string;
  generated: boolean;
}

interface HeroProps {
  onDataUpdate: (newData: Partial<UserData>) => void;
  userData: UserData;
}

export default function Hero({ onDataUpdate, userData }: HeroProps) {
  const { name, github, email, image, generated } = userData;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onDataUpdate({ image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const checkGitHubStar = async (username: string): Promise<boolean> => {
    if (!username) return false;
    const sanitizedUsername = username.trim().replace(/\s+/g, '');
    if (!sanitizedUsername) return false;

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`https://api.github.com/user/starred/keploy/keploy`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': sanitizedUsername
        }
      });

      if (response.status === 401 || response.status === 403) {
        const page1Response = await fetch(`https://api.github.com/users/${sanitizedUsername}/starred?per_page=100&page=1`);
        if (!page1Response.ok) return false;

        const starredRepos = await page1Response.json();
        return starredRepos.some((repo: any) => repo.full_name.toLowerCase() === 'keploy/keploy');
      }

      return response.status === 204;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!name || !github || !email || !image) {
      alert('Please fill all fields and upload a picture.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const hasStarred = await checkGitHubStar(github);
      if (!hasStarred) {
        setError("You need to star the Keploy repository to generate an ID card.");
        return;
      }
      onDataUpdate({ generated: true });
    } catch (error) {
      setError("There was an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  /* ultra‑HD factor (tweak up to 6‑8 if you ever need poster‑size) */
  const scale = 5;               // 350×500 → 1750×2500 px
  const baseW = 350;
  const baseH = 500;

  canvas.width  = baseW * scale;
  canvas.height = baseH * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);       // draw in logical units

  /* helper */
  const load = (src: string) =>
    new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  (async () => {
    ctx.clearRect(0, 0, baseW, baseH);
    const cx = baseW / 2;

    const [bg, logo, avatar] = await Promise.all([
      load('/assets/images/card-background.png'),
      load('/assets/images/keploy-logo.png'),
      load(image),
    ]);

    ctx.drawImage(bg, 0, 0, baseW, baseH);
    ctx.drawImage(logo, cx - 60, 20, 120, 40);

    const headingY = 80;
    const grad = ctx.createLinearGradient(20, headingY, 280, headingY);
    grad.addColorStop(0, '#ff8800');
    grad.addColorStop(1, '#ff5500');
    ctx.fillStyle = grad;
    ctx.font = 'bold 26px Helvetica';
    ctx.textAlign = 'center';
    ctx.fillText('API Fellowship', cx, headingY + 8);

    const r = 70, avatarY = 180;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, avatarY, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, cx - r, avatarY - r, r * 2, r * 2);
    ctx.restore();

    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px Helvetica';
    ctx.fillText(name, cx, avatarY + r + 30);

    ctx.fillStyle = '#ff8800';
    ctx.font = '16px Helvetica';
    ctx.fillText(`@${github.trim().replace(/\s+/g, '')}`, cx, avatarY + r + 50);

    const baseY = baseH - 70;
    ctx.fillStyle = '#999999';
    ctx.font = 'italic 14px Helvetica';
    ctx.fillText('API Fellow - Cohort 2025', cx, baseY);

    ctx.strokeStyle = 'rgba(255,136,0,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, baseY + 15);
    ctx.lineTo(baseW - 50, baseY + 15);
    ctx.stroke();

    ctx.fillStyle = '#777777';
    ctx.font = '12px Helvetica';
    ctx.fillText('Keploy.io', cx, baseY + 30);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `${name.replace(/\s/g, '_')}_keploy_id_hd.png`;
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
      },
      'image/png',
      1 /* quality ignored by PNG but keeps signature */
    );
  })();
};

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden pb-24">
      {/* <div className="absolute inset-0 -z-10">
        <NextImage
          src="/assets/images/orange-painting.jpg"
          alt="Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div> */}


      <div className='absolute inset-0 -z-10'>
      <NextImage src ="/assets/images/orange-painting.jpg" alt='background of the input form'
      fill priority 
      style = { { objectFit: 'cover'}}
      />
      </div>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="relative backdrop-blur-xl bg-white/10 border border-white/30 p-8 rounded-2xl shadow-xl space-y-6 w-full max-w-md z-10 mt-20">
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-bold text-white">
            Keploy API Fellowship
          </h1>
          <p className="text-lg text-white/80 mt-2">Onboarding and ID Card Collection</p>
        </div>

        <div className="relative space-y-6">
          {["name", "github", "email"].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-white/90 mb-2 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={field === "github" ? "user-name" : `Your ${field}`}
                className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white/70 border border-white/20 focus:ring-2 focus:ring-orange-300 focus:outline-none transition shadow-sm"
                value={userData[field as keyof UserData] as string}
                onChange={(e) => onDataUpdate({ [field]: e.target.value })}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Profile Picture</label>
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center hover:border-orange-500 transition bg-orange-50/10">
              {image ? (
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden relative shadow-md">
                    <NextImage
                      src={image}
                      alt="Preview"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="96px"
                    />
                    
                  </div>
                  <label className="text-orange-100 hover:text-orange-500 cursor-pointer text-sm mt-2 font-medium">
                    Change Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="text-white/70 mb-2">Click to upload image</div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {error && (
  <div className="mb-6 p-4 bg-gray-800/50 border border-orange-300 rounded-lg text-orange-200">
    <p className="mb-2">{error}</p>
    <a
      href="https://github.com/keploy/keploy"
      target="_blank"
      rel="noopener noreferrer"
      className="text-orange-400 hover:text-orange-600 underline font-medium"
    >
      Star the repository here
    </a>
    <p className="text-sm mt-2 text-white/70">
      If you have already starred the repository and still facing issues, please wait a few minutes or contact us on <a className="text-orange-100" href="https://join.slack.com/t/keploy/shared_invite/zt-357qqm9b5-PbZRVu3Yt2rJIa6ofrwWNg">Slack</a>
    </p>
  </div>
)}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-900 hover:to-orange-700 shadow-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-orange-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Checking Star and Register Status...' : 'Generate ID Card'}
          </button>

          <div className="mt-4 text-sm text-white/70 text-center">
            <p>If there is an issue in generating your badge, reach out to us on our <a className="text-indigo-100" href="https://join.slack.com/t/keploy/shared_invite/zt-357qqm9b5-PbZRVu3Yt2rJIa6ofrwWNg">Slack Channel</a></p>
          </div>
        </div>
      </form>

      {generated && (
        <div className="mt-10 flex flex-col items-center space-y-6 z-10">
          <div className="relative pt-8 pb-6 px-6 rounded-xl shadow-xl w-80 flex flex-col items-center overflow-hidden bg-black">
            <div className="absolute inset-0">
              <NextImage
                src="/assets/images/card-background.png"
                alt="Card background"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            <div className="relative z-10 w-24 h-10 mb-0">
              <NextImage
                src="/assets/images/keploy-logo.png"
                alt="Keploy Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-3 w-full">
              <h2 className="text-2xl mt-1 font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent font-[Helvetica]">
                API Fellowship
              </h2>
              <div className="border-4 border-orange-500/30 rounded-full p-1 shadow-lg shadow-orange-500/20">
                <div className="relative rounded-full w-32 h-32 overflow-hidden">
                  <NextImage
                    src={image}
                    alt="user"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="128px"
                  />
                </div>
              </div>
              <div className="text-xl font-bold text-white -mt-1 mb-0">{name}</div>
              <div className="text-orange-500 font-medium">@{github.trim().replace(/\s+/g, '')}</div>
              <div className="mt-3 text-sm text-gray-400 italic">API Fellow Cohort 2025</div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-2"></div>
              <div className="text-xs text-gray-500">Keploy.io</div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-lg transition flex items-center space-x-2 shadow-md hover:shadow-orange-300"
          >
            <span>Download ID Card</span>
          </button>

          <canvas ref={canvasRef} width={350} height={500} style={{ display: 'none' }} />
        </div>
      )}
    </main>
  );
}
