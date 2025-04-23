// components/IDCard.tsx
"use client";

import { useRef, useState } from 'react';

interface IDCardProps {
  name: string;
  githubUsername: string;
  image: string;
}

export default function IDCard({ name, githubUsername, image }: IDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [uniqueId] = useState(`KAFP-${Math.floor(10000 + Math.random() * 90000)}`);
  
  const downloadCard = async () => {
    try {
      // Dynamically import html2canvas only when needed
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      
      if (!cardRef.current) return;

      // Clone the card to avoid modifying the original
      const clonedCard = cardRef.current.cloneNode(true) as HTMLElement;
      
      // Apply inline styles to all elements
      const applyInlineStyles = (element: HTMLElement) => {
        const computedStyle = window.getComputedStyle(element);
        
        // Set explicit background-color and color as hex values
        element.style.backgroundColor = 
          element.classList.contains('bg-orange-600') ? '#ea580c' : 
          element.classList.contains('bg-gray-900') ? '#111827' : 
          computedStyle.backgroundColor;
        
        element.style.color = 
          element.classList.contains('text-orange-300') ? '#fdba74' : 
          element.classList.contains('text-white') ? '#ffffff' : 
          element.classList.contains('text-gray-400') ? '#9ca3af' : 
          computedStyle.color;
        
        // Handle border colors
        if (element.classList.contains('border-orange-500')) {
          element.style.borderColor = '#f97316';
        }
        
        // Process all child elements
        Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) {
            applyInlineStyles(child);
          }
        });
      };
      
      // Apply styles to the cloned card
      applyInlineStyles(clonedCard);
      
      // Add the cloned card to the document temporarily for capture
      document.body.appendChild(clonedCard);
      clonedCard.style.position = 'absolute';
      clonedCard.style.left = '-9999px';
      
      // Capture the cloned card
      const canvas = await html2canvas(clonedCard, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        backgroundColor: '#111827',
        logging: false
      });
      
      // Remove the cloned card
      document.body.removeChild(clonedCard);
      
      const link = document.createElement('a');
      link.download = `keploy-fellowship-id-${githubUsername}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error generating ID card image:", error);
      alert("There was an error generating your ID card: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div 
        ref={cardRef}
        className="w-72 bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col items-center p-6 border border-orange-500/30"
      >
        <div className="w-full flex justify-center items-center mb-6">
          <div className="relative h-12">
            <h1 className="text-white text-xl font-bold tracking-wider text-center">
              KEPLOY API FELLOWSHIP
            </h1>
            {/* <div className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-600"></div> */}
          </div>
        </div>
        
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6">
          {image && (
            <img
              src={image}
              alt={`${name}'s profile`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="flex flex-col items-center space-y-2 w-full">
          <h2 className="text-white text-2xl font-bold truncate max-w-full">
            {name}
          </h2>
          <p className="text-orange-300 text-lg font-medium">
            @{githubUsername}
          </p>
          
          <div className="mt-4 w-full px-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Fellowship ID</span>
              <span className="text-white text-sm font-medium">{uniqueId}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Cohort</span>
              <span className="text-white text-sm font-medium">2025</span>
            </div>
          </div>
          
          <div className="mt-4 bg-orange-600 w-full py-3 rounded-md">
            <p className="text-white text-center text-xs font-medium">API FELLOW</p>
          </div>
        </div>
      </div>

      <button 
        onClick={downloadCard}
        className="px-6 py-3 bg-orange-600 text-white rounded-md shadow-md hover:bg-orange-700 transition-colors">
        Download ID Card
      </button>
    </div>
  );
}