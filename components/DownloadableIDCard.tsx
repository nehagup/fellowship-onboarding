// components/DownloadableIDCard.tsx
"use client";

import { useRef } from 'react';

interface DownloadableIDCardProps {
  name: string;
  githubUsername: string;
  image: string;
}

export default function DownloadableIDCard({ name, githubUsername, image }: DownloadableIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const downloadCard = async () => {
    try {
      // Only import html2canvas when it's needed
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      
      if (!cardRef.current) return;
      
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `keploy-fellowship-id-${githubUsername}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error generating ID card:", error);
      alert(`Error: Could not generate the ID card. Please try using the "Take Screenshot" option or try a different browser.`);
    }
  };

  // Generate a random 5-digit ID that remains stable
  const fellowshipId = `KAFP-${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Inline styles only approach - no Tailwind CSS at all
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '24px'
    },
    card: {
      width: '288px',
      backgroundColor: '#111827', // dark gray
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: '24px',
      border: '1px solid rgba(249, 115, 22, 0.3)' // orange with transparency
    },
    header: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '24px'
    },
    headerContent: {
      position: 'relative' as const,
      height: '48px'
    },
    title: {
      color: '#ffffff',
      fontSize: '20px',
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      textAlign: 'center' as const
    },
    titleUnderline: {
      position: 'absolute' as const,
      bottom: '-8px',
      left: '0',
      right: '0',
      height: '4px',
      backgroundColor: '#ea580c' // orange-600
    },
    imageContainer: {
      position: 'relative' as const,
      width: '128px',
      height: '128px',
      borderRadius: '50%',
      overflow: 'hidden',
    //   border: '4px solid #ea580c', // orange-600
      marginBottom: '24px'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const
    },
    nameContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '8px',
      width: '100%'
    },
    name: {
      color: '#ffffff',
      fontSize: '24px',
      fontWeight: 'bold',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const
    },
    username: {
      color: '#fdba74', // orange-300
      fontSize: '18px',
      fontWeight: '500'
    },
    infoContainer: {
      marginTop: '16px',
      width: '100%',
      padding: '0 16px'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '8px',
      borderBottom: '1px solid #374151' // gray-700
    },
    infoLabel: {
      color: '#9ca3af', // gray-400
      fontSize: '14px'
    },
    infoValue: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '500'
    },
    roleContainer: {
      marginTop: '16px',
      backgroundColor: '#ea580c', // orange-600
      width: '100%',
      padding: '12px 0',
      borderRadius: '6px'
    },
    role: {
      color: '#ffffff',
      textAlign: 'center' as const,
      fontSize: '12px',
      fontWeight: '500'
    },
    downloadButton: {
      padding: '12px 24px',
      backgroundColor: '#ea580c', // orange-600
      color: '#ffffff',
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500'
    },
    screenshotButton: {
      padding: '12px 24px',
      backgroundColor: '#4b5563', // gray-600
      color: '#ffffff',
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      marginTop: '12px'
    }
  };

  return (
    <div style={styles.container}>
      <div ref={cardRef} style={styles.card}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>
              KEPLOY API FELLOWSHIP
            </h1>
            {/* <div style={styles.titleUnderline}></div> */}
          </div>
        </div>
        
        <div style={styles.imageContainer}>
          {image && (
            <img
              src={image}
              alt={`${name}'s profile`}
              style={styles.image}
            />
          )}
        </div>
        
        <div style={styles.nameContainer}>
          <h2 style={styles.name}>
            {name}
          </h2>
          <p style={styles.username}>
            @{githubUsername}
          </p>
          
          <div style={styles.infoContainer}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Fellowship ID</span>
              <span style={styles.infoValue}>{fellowshipId}</span>
            </div>
            <div style={{...styles.infoRow, marginTop: '8px'}}>
              <span style={styles.infoLabel}>Cohort</span>
              <span style={styles.infoValue}>2025</span>
            </div>
          </div>
          
          <div style={styles.roleContainer}>
            <p style={styles.role}>API FELLOW</p>
          </div>
        </div>
      </div>

      <button 
        onClick={downloadCard}
        style={styles.downloadButton}
      >
        Download ID Card
      </button>
      
      <button
        onClick={() => alert("Please take a screenshot of your ID card if the download button doesn't work.")}
        style={styles.screenshotButton}
      >
        Take Screenshot Instead
      </button>
    </div>
  );
}