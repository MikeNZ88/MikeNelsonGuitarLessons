export default function ScaleToolPage() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 9999,
      backgroundColor: 'white'
    }}>
      <iframe 
        src="/scale-explorer/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Guitar Scale Explorer"
      />
    </div>
  );
} 