'use client';
import React, { useRef, useState } from 'react';
import NextImage from 'next/image';
// import { SparklesCore } from './ui/sparkles';

const loadingStates = [
  {
   text: "Checking the registration Status",
  },
  {
    text: "Checking your acceptance into the program",
  },
  {
    text: "Checking if you have star marked our repository",
  },
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

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const x = canvas.width / 2;

    const bgImg = new window.Image();
    bgImg.src = '/assets/images/card-background.png';

    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      const logo = new window.Image();
      logo.src = '/assets/images/keploy-logo.png';

      logo.onload = () => {
        // Draw logo at top
        ctx.drawImage(logo, x - 60, 20, 120, 40);

        // Heading text below logo
        const headingY = 80;
        const gradient = ctx.createLinearGradient(20, headingY, 280, headingY);
        gradient.addColorStop(0, '#ff8800');
        gradient.addColorStop(1, '#ff5500');
        ctx.fillStyle = gradient;
        ctx.font = 'bold 26px Helvetica';
        ctx.textAlign = 'center';
        ctx.fillText('API Fellowship', x, headingY + 8);

        // Load user image
        const img = new window.Image();
        img.src = image;
        img.onload = () => {
          const y = 180;
          const radius = 70;

          // Draw circular image
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
          ctx.restore();

          // User name
          ctx.fillStyle = 'white';
          ctx.font = 'bold 28px Helvetica';
          ctx.fillText(name, x, y + radius + 30); // slightly reduced margin

          // GitHub username
          ctx.fillStyle = '#ff8800';
          ctx.font = '16px Helvetica';
          const sanitizedGithub = github.trim().replace(/\s+/g, '');
          ctx.fillText(`@${sanitizedGithub}`, x, y + radius + 50);

          // Stick bottom elements to end of card
          const baseY = canvas.height - 70;
          ctx.fillStyle = '#999999';
          ctx.font = 'italic 14px Helvetica';
          ctx.fillText('API Fellow - Cohort 2025', x, baseY);

          ctx.strokeStyle = 'rgba(255, 136, 0, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(50, baseY + 15);
          ctx.lineTo(canvas.width - 50, baseY + 15);
          ctx.stroke();

          ctx.fillStyle = '#777777';
          ctx.font = '12px Helvetica';
          ctx.fillText('Keploy.io', x, baseY + 30);

          // Trigger download
          const link = document.createElement('a');
          link.download = `${name.replace(/\s/g, '_')}_keploy_id.png`;
          link.href = canvas.toDataURL();
          link.click();
        };
      };
    };
  };

  return (
    <main className="bg-gradient-to-br from-white to-orange-50 text-gray-800 flex flex-col items-center p-8 space-y-8 min-h-screen relative">
      {/* Orange gradient circles in background */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-orange-200 to-orange-100 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-l from-orange-200 to-orange-100 opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-40 h-40 rounded-full bg-gradient-to-tr from-orange-300 to-orange-100 opacity-20 blur-2xl"></div>
      
      <div className="text-center mt-10 relative z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Keploy API Fellowship
        </h1>
        <p className="text-lg text-gray-600 mt-2">Onboarding and ID Card Collection</p>
      </div>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className="relative backdrop-blur-md bg-white/70 border border-orange-200 p-8 rounded-2xl shadow-lg space-y-6 w-full max-w-md z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-orange-50/80 rounded-2xl pointer-events-none" />
        {/* Inputs */}
        <div className="relative space-y-6">
          {["name", "github", "email"].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={field === "github" ? "user-name" : `Your ${field}`}
                className="w-full p-3 rounded-lg bg-white/80 border border-orange-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none transition shadow-sm"
                value={userData[field as keyof UserData] as string}
                onChange={(e) => onDataUpdate({ [field]: e.target.value })}
              />
            </div>
          ))}
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center hover:border-orange-500 transition bg-orange-50/80">
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
                  <label className="text-orange-600 hover:text-orange-700 cursor-pointer text-sm mt-2 font-medium">
                    Change Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="text-gray-500 mb-2">Click to upload image</div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
          {error && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-300 rounded-lg text-orange-800">
              <p className="mb-2">{error}</p>
              <a
                href="https://github.com/keploy/keploy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 underline font-medium"
              >
                Star the repository here
              </a>
              <p className="text-sm mt-2 text-gray-600">
                If you have already starred the repository and still facing issues, please wait a few minutes for GitHub&apos;s API to update or contact to us on our <a href=''>Slack Channel</a>
              </p>
            </div>
          )}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-orange-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Checking Star and Register Status...' : 'Generate ID Card'}
          </button>
          <div className="mt-4 text-sm text-gray-600 text-center">
            {/* <p>⭐ You must star the <a href="https://github.com/keploy/keploy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Keploy repository</a> to generate your ID card</p> */}
            <p>If there is an issue in generating your badge, reach out to us on our <a href="">Slack Channel</a></p>
          </div>
        </div>
      </form>

      {/* Rendered Card */}
      {generated && (
        <div className="mt-6 flex flex-col items-center space-y-6 z-10">
          <div className="relative pt-8 pb-6 px-6 rounded-xl shadow-xl w-80 flex flex-col items-center overflow-hidden bg-black">
            {/* Background image */}
            <div className="absolute inset-0">
              <NextImage
                src="/assets/images/card-background.png"
                alt="Card background"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            {/* Logo */}
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
              <div className="text-orange-500 font-medium mt-100">@{github.trim().replace(/\s+/g, '')}</div>
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