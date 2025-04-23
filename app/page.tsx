// app/page.tsx
"use client";

import { useState } from 'react';
import IDForm from '../components/IDForm';
import IDCard from '../components/IDCard';
import DownloadableIDCard from '../components/DownloadableIDCard';

interface UserData {
  name: string;
  githubUsername: string;
  email: string;
  image: string | null;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDownloadVersion, setShowDownloadVersion] = useState(false);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    // Reset to showing the styled version first
    setShowDownloadVersion(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
            Keploy API Fellowship
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
            Onboarding and ID Card Collection
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              
                <a href="#form-section"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                Generate Your ID Card
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div id="form-section" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Details</h2>
            <IDForm onSubmit={handleFormSubmit} />
          </div>

          {/* ID Card Preview Section */}
          <div>
            {userData && userData.image ? (
              <div className="sticky top-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Fellowship ID Card</h2>
                  
                  {/* Toggle between styled and downloadable versions */}
                  <button
                    onClick={() => setShowDownloadVersion(!showDownloadVersion)}
                    className="text-sm text-orange-600 hover:text-orange-800"
                  >
                    {showDownloadVersion ? "Show Styled Version" : "Show Download Version"}
                  </button>
                </div>
                
                {showDownloadVersion ? (
                  <DownloadableIDCard
                    name={userData.name}
                    githubUsername={userData.githubUsername}
                    image={userData.image}
                  />
                ) : (
                  <IDCard 
                    name={userData.name}
                    githubUsername={userData.githubUsername}
                    image={userData.image}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-100 rounded-xl border-2 border-dashed border-orange-300">
                <div className="text-center p-6">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 0 01.707.293l5.414 5.414a1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-orange-700">No ID card generated yet</h3>
                  <p className="mt-1 text-sm text-orange-400">
                    Fill out the form to generate your personalized fellowship ID card.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}