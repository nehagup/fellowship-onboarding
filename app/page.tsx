'use client';

import { useRef, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [generated, setGenerated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (name && github && email && image) {
      setGenerated(true);
    } else {
      alert('Please fill all fields and upload a picture.');
    }
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(1, '#201206');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative elements
    ctx.fillStyle = 'rgba(255, 136, 0, 0.05)';
    ctx.beginPath();
    ctx.arc(50, 50, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width - 50, canvas.height - 50, 120, 0, Math.PI * 2);
    ctx.fill();

    // Heading
    const orangeGradient = ctx.createLinearGradient(20, 40, 280, 40);
    orangeGradient.addColorStop(0, '#ff8800');
    orangeGradient.addColorStop(1, '#ff5500');
    ctx.fillStyle = orangeGradient;
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Keploy API Fellowship', canvas.width / 2, 50);

    // Image - BIGGER
    const img = new Image();
    img.src = image;
    img.onload = () => {
      // Draw circle with border
      const x = canvas.width / 2;
      const y = 140;
      const radius = 80; // Increased from 70

      // Shadow
      ctx.shadowColor = 'rgba(255, 136, 0, 0.6)';
      ctx.shadowBlur = 15;
      
      // Circle clip and image
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Circle border
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Name - BIGGER
      ctx.fillStyle = 'white';
      ctx.font = 'bold 26px sans-serif'; // Increased from 22px
      ctx.textAlign = 'center';
      ctx.fillText(name, x, 260); // Adjusted position

      // GitHub username
      ctx.fillStyle = '#ff8800';
      ctx.font = '16px sans-serif';
      ctx.fillText(`@${github}`, x, 290); // Adjusted position
      
      // Cohort text
      ctx.fillStyle = '#999999';
      ctx.font = 'italic 14px sans-serif';
      ctx.fillText('Cohort 2025 API Fellow', x, 320); // Adjusted position

      // Add decorative line
      ctx.strokeStyle = 'rgba(255, 136, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(50, 370); // Adjusted position
      ctx.lineTo(canvas.width - 50, 370); // Adjusted position
      ctx.stroke();

      // Add Keploy small text
      ctx.fillStyle = '#777777';
      ctx.font = '12px sans-serif';
      ctx.fillText('Keploy.io', x, 400); // Adjusted position

      // Download
      const link = document.createElement('a');
      link.download = `${name.replace(/\s/g, '_')}_keploy_id.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800 flex flex-col items-center p-8 space-y-8">
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
              onChange={(e) => setGithub(e.target.value)}
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
          
          <button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-orange-300"
          >
            Generate ID Card
          </button>
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