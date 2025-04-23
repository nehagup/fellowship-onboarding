// components/IDForm.tsx
"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  githubUsername: string;
  email: string;
  image: string | null;
}

interface IDFormProps {
  onSubmit: (data: FormData) => void;
}

export default function IDForm({ onSubmit }: IDFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    githubUsername: '',
    email: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-orange-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder=" Enter Your Name"
          />
        </div>

        <div>
          <label htmlFor="githubUsername" className="block text-sm font-medium text-orange-700">
            GitHub Username
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-orange-800 text-sm">
              @
            </span>
            <input
              type="text"
              id="githubUsername"
              name="githubUsername"
              required
              value={formData.githubUsername}
              onChange={handleChange}
              className="flex-1 block w-full px-3 py-2 text-orange-400 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="github-username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-orange-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-orange-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-700">
            Profile Photo
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div 
              onClick={triggerFileInput} 
              className="flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded-full cursor-pointer hover:border-orange-500 transition-colors"
            >
              {previewImage ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Upload</p>
                </div>
              )}
              <input
                id="image"
                name="image"
                type="file"
                required
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={triggerFileInput}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Choose Photo
              </button>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Generate ID Card
          </button>
        </div>
      </form>
    </div>
  );
}