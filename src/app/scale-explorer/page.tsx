'use client';

import React from 'react';

export default function ScaleExplorerPage() {
  React.useEffect(() => {
    // Redirect to the actual Scale Explorer HTML file
    window.location.href = '/scale-explorer/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div 
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}
        />
        <h2>Loading Scale Explorer...</h2>
        <p>If you are not redirected automatically, <a href="/scale-explorer/index.html">click here</a>.</p>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
} 