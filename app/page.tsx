'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSquareRoundedX } from '@tabler/icons-react';

const loadingStates = [
  { text: "Verifying your details" },
  { text: "Checking GitHub profile" },
  { text: "Confirming repository star" },
  { text: "Generating your ID card" },
  { text: "Finalizing..." },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: { text: string }[];
  value?: number;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className="text-left flex gap-2 mb-4"
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && <CheckIcon className="text-black dark:text-white" />}
              {index <= value && (
                <CheckFilled
                  className={
                    value === index
                      ? "text-black dark:text-lime-500 opacity-100"
                      : "text-black dark:text-white"
                  }
                />
              )}
            </div>
            <span
              className={
                value === index
                  ? "text-black dark:text-lime-500 opacity-100"
                  : "text-black dark:text-white"
              }
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
}: {
  loadingStates: { text: string }[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center  bg-black"
        >
          <div className="h-96 relative">
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>
          <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const checkGitHubStar = async (username: string): Promise<boolean> => {
    if (!username) return false;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.github.com/user/starred/keploy/keploy`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': username
        }
      });
      
      if (response.status === 401 || response.status === 403) {
        const page1Response = await fetch(`https://api.github.com/users/${username}/starred?per_page=100&page=1`);
        
        if (!page1Response.ok) {
          console.error("Error fetching user's starred repos:", page1Response.status);
          return false;
        }
        
        const starredRepos = await page1Response.json();
        
        return starredRepos.some((repo: any) => 
          repo.full_name.toLowerCase() === 'keploy/keploy'
        );
      }
      
      return response.status === 204;
      
    } catch (error) {
      console.error("Error checking GitHub star:", error);
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
    
        const minDelay = new Promise(resolve => setTimeout(resolve, 7000)); // 3 sec min delay
        const hasStarredPromise = checkGitHubStar(github);
    
        const [hasStarred] = await Promise.all([hasStarredPromise, minDelay]);
    
        if (!hasStarred) {
          setError("You need to star the Keploy repository to generate an ID card. Please star it here: https://github.com/keploy/keploy");
          return;
        }
    
        setGenerated(true);
    
      } catch (error) {
        console.error("Error during generation:", error);
        setError("There was an error processing your request. Please try again later or contact devrel@keploy.io");
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

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(1, '#201206');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 136, 0, 0.05)';
    ctx.beginPath();
    ctx.arc(50, 50, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width - 50, canvas.height - 50, 120, 0, Math.PI * 2);
    ctx.fill();

    const orangeGradient = ctx.createLinearGradient(20, 40, 280, 40);
    orangeGradient.addColorStop(0, '#ff8800');
    orangeGradient.addColorStop(1, '#ff5500');
    ctx.fillStyle = orangeGradient;
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Keploy API Fellowship', canvas.width / 2, 50);

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const x = canvas.width / 2;
      const y = 140;
      const radius = 80;

      ctx.shadowColor = 'rgba(255, 136, 0, 0.6)';
      ctx.shadowBlur = 15;
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
      
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(name, x, 260);

      ctx.fillStyle = '#ff8800';
      ctx.font = '16px sans-serif';
      ctx.fillText(`@${github}`, x, 290);
      
      ctx.fillStyle = '#999999';
      ctx.font = 'italic 14px sans-serif';
      ctx.fillText('Cohort 2025 API Fellow', x, 320);

      ctx.strokeStyle = 'rgba(255, 136, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, 370);
      ctx.lineTo(canvas.width - 50, 370);
      ctx.stroke();

      ctx.fillStyle = '#777777';
      ctx.font = '12px sans-serif';
      ctx.fillText('Keploy.io', x, 400);

      const link = document.createElement('a');
      link.download = `${name.replace(/\s/g, '_')}_keploy_id.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800 flex flex-col items-center p-8 space-y-8">
      <MultiStepLoader loadingStates={loadingStates} loading={isLoading} />

      {isLoading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setIsLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Keploy API Fellowship
        </h1>
        <p className="text-lg text-gray-600 mt-2">Onboarding and ID Card Collection</p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white border border-orange-100 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-orange-50/50"></div>
        <div className="relative">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-3 rounded-lg bg-white border border-orange-200 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">GitHub Username</label>
            <input
              type="text"
              placeholder="github-username"
              className="w-full p-3 rounded-lg bg-white border border-orange-200 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              value={github}
              onChange={(e) => {
                setGithub(e.target.value);
                if (error) setError(null);
              }}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full p-3 rounded-lg bg-white border border-orange-200 text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-600 mb-1">Profile Picture</label>
            <div className="border-2 border-dashed border-orange-200 rounded-lg p-4 text-center hover:border-orange-400 transition bg-orange-50/50">
              {image ? (
                <div className="flex flex-col items-center">
                  <img src={image} alt="Preview" className="w-24 h-24 rounded-full object-cover mb-2" />
                  <label className="text-orange-500 hover:text-orange-600 cursor-pointer text-sm">
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
                If you have already starred the repository and still facing issues, please wait a few minutes for GitHub's API to update or contact devrel@keploy.io
              </p>
            </div>
          )}
          
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-orange-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            Generate ID Card
          </button>

          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>⭐ You must star the <a href="https://github.com/keploy/keploy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Keploy repository</a> to generate your ID card</p>
          </div>
        </div>
      </form>

      {generated && (
        <div className="mt-6 flex flex-col items-center space-y-6">
          <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-xl shadow-xl w-80 flex flex-col items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-xl"></div>
            
            <div className="relative z-10 flex flex-col items-center space-y-4 w-full">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Keploy API Fellowship
              </h2>
              
              <div className="border-4 border-orange-500/30 rounded-full p-1 shadow-lg shadow-orange-500/20">
                <img 
                  src={image} 
                  alt="user" 
                  className="rounded-full w-32 h-32 object-cover" 
                />
              </div>
              
              <div className="text-xl font-bold text-white">{name}</div>
              <div className="text-orange-500 font-medium">@{github}</div>
              <div className="text-sm text-gray-400 italic">Cohort 2025 API Fellow</div>
              
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