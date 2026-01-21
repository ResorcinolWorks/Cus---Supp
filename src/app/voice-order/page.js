'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Icons
const PhoneIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EndCallIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
  </svg>
);

const HeadsetIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

const BackIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

const MicIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" x2="12" y1="19" y2="22"/>
  </svg>
);

const PizzaIcon = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3"/>
    <circle cx="32" cy="32" r="22" fill="#FBBF24"/>
    <circle cx="24" cy="26" r="5" fill="#DC2626"/>
    <circle cx="40" cy="28" r="4" fill="#DC2626"/>
    <circle cx="28" cy="40" r="4.5" fill="#DC2626"/>
    <circle cx="42" cy="38" r="3.5" fill="#DC2626"/>
    <circle cx="32" cy="32" r="3" fill="#22C55E"/>
    <path d="M32 4 L32 60 M4 32 L60 32" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4"/>
  </svg>
);

export default function VoiceOrderPage() {
  const router = useRouter();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const [micPermission, setMicPermission] = useState(null);
  const callTimerRef = useRef(null);

  const config = {
    agentName: 'Maya',
    agentRole: 'Order Agent',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  };

  // Auto-start call on page load
  useEffect(() => {
    startCall();
    return () => {
      clearInterval(callTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isCallActive && !isConnecting) {
      callTimerRef.current = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    } else {
      clearInterval(callTimerRef.current);
    }
    return () => clearInterval(callTimerRef.current);
  }, [isCallActive, isConnecting]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-start voice call - connects to /api/voice-order/call endpoint
  async function startCall() {
    setIsConnecting(true);
    setIsCallActive(true);
    
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      
      // Connect to voice order API
      await fetch('/api/voice-order/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' }),
      });
      
      // Simulate connection delay
      setTimeout(() => {
        setIsConnecting(false);
      }, 1500);
      
    } catch (err) {
      setMicPermission(false);
      setIsCallActive(false);
      setIsConnecting(false);
    }
  }

  async function endCall() {
    setIsCallActive(false);
    setCallDuration(0);
    clearInterval(callTimerRef.current);
    
    await fetch('/api/voice-order/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'end' }),
    }).catch(() => {});
    
    router.push('/');
  }

  async function retryCall() {
    setMicPermission(null);
    startCall();
  }

  return (
    <div style={styles.page}>
      <div style={styles.bgImageWrapper}>
        <Image src="/pizza-bg.jpg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div style={{ ...styles.gradientOverlay, background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.97) 0%, rgba(4, 120, 87, 0.98) 50%, rgba(6, 95, 70, 0.99) 100%)' }}>
        <div style={{ ...styles.circle1, background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)' }} />
        <div style={{ ...styles.circle2, background: 'radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)' }} />
        <div style={{ ...styles.circle3, background: 'radial-gradient(circle, rgba(5, 150, 105, 0.35) 0%, transparent 70%)' }} />
      </div>

      <div style={styles.container}>
        <header style={styles.logoHeader}>
          <button style={styles.backBtn} onClick={() => { if (isCallActive) endCall(); else router.push('/'); }}>
            <BackIcon size={20} />
          </button>
          <div style={styles.logoCenter}>
            <Image src="/dominos-logo.png" alt="Domino's" width={160} height={50} style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} priority />
            <p style={styles.tagline}>Voice Order</p>
          </div>
          <div style={{ width: 44 }} />
        </header>

        <main style={styles.card}>
          {micPermission === false ? (
            // Microphone permission denied
            <div style={styles.errorScreen}>
              <div style={styles.errorIcon}>🎤</div>
              <h2 style={styles.errorTitle}>Microphone Required</h2>
              <p style={styles.errorText}>Please allow microphone access to place your order via voice.</p>
              <button style={{ ...styles.retryBtn, background: config.gradient }} onClick={retryCall}>
                <MicIcon size={20} />
                <span>Enable Microphone</span>
              </button>
              <button style={styles.backHomeBtn} onClick={() => router.push('/')}>
                Back to Home
              </button>
            </div>
          ) : (
            // Active call screen
            <div style={styles.activeCallScreen}>
              <div style={styles.callCircle1} />
              <div style={styles.callCircle2} />
              
              {isConnecting ? (
                // Connecting state
                <>
                  <div style={styles.connectingWrapper}>
                    <div style={styles.pizzaSpinner}>
                      <PizzaIcon size={80} />
                    </div>
                  </div>
                  <div style={styles.connectingInfo}>
                    <div style={styles.connectingText}>Connecting...</div>
                    <div style={styles.connectingSubtext}>Preparing your order assistant</div>
                  </div>
                  <div style={styles.loadingDots}>
                    <span style={{ ...styles.dot, animationDelay: '0s' }} />
                    <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
                    <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
                  </div>
                </>
              ) : (
                // Connected state
                <>
                  <div style={styles.agentAvatarLarge}>
                    <HeadsetIcon size={50} />
                    <div style={styles.avatarRing} />
                  </div>
                  <div style={styles.callerInfo}>
                    <div style={styles.callerName}>{config.agentName}</div>
                    <div style={styles.callerRole}>{config.agentRole}</div>
                  </div>
                  <div style={{ ...styles.callTimer, background: 'rgba(16, 185, 129, 0.3)' }}>
                    <div style={{ ...styles.timerDot, background: '#34d399', boxShadow: '0 0 15px #34d399' }} />
                    <span>{formatDuration(callDuration)}</span>
                  </div>
                  <div style={styles.orderHint}>
                    <span>🍕</span>
                    <span>Say your order - &quot;I&apos;d like a large pepperoni pizza&quot;</span>
                  </div>
                  <div style={styles.voiceWave}>
                    {[...Array(7)].map((_, i) => (
                      <div key={i} style={{...styles.voiceBar, animationDelay: `${i * 0.1}s`, background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)'}} />
                    ))}
                  </div>
                </>
              )}
              
              <button style={{ ...styles.endCallBtn, background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' }} onClick={endCall}>
                <EndCallIcon />
                <span>End Call</span>
              </button>
            </div>
          )}
        </main>

        <footer style={styles.footer}>
          <span>🍕 Order by Voice</span>
          <span style={{ color: '#10b981' }}>•</span>
          <span>Fast & Easy</span>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito', 'Rubik', sans-serif" },
  bgImageWrapper: { position: 'fixed', inset: 0, zIndex: 0 },
  gradientOverlay: { position: 'fixed', inset: 0, zIndex: 1 },
  circle1: { position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', top: '-200px', right: '-100px', animation: 'float 8s ease-in-out infinite' },
  circle2: { position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', bottom: '-100px', left: '-50px', animation: 'float 10s ease-in-out infinite reverse' },
  circle3: { position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', top: '40%', left: '10%', animation: 'float 12s ease-in-out infinite' },
  container: { width: '100%', maxWidth: 'min(440px, 94vw)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 2 },
  logoHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.2))' },
  backBtn: { width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' },
  logoCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  tagline: { color: '#fff', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' },
  card: { background: 'rgba(255, 255, 255, 0.98)', borderRadius: 'clamp(20px, 5vw, 28px)', boxShadow: '0 30px 60px rgba(0, 100, 80, 0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 'clamp(480px, 62vh, 560px)', border: '2px solid rgba(16, 185, 129, 0.2)' },
  
  errorScreen: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px, 6vw, 40px)', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' },
  errorIcon: { fontSize: 60, marginBottom: 20 },
  errorTitle: { fontSize: 'clamp(22px, 5.5vw, 26px)', fontWeight: 900, color: '#1e293b', marginBottom: 12 },
  errorText: { fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, color: '#64748b', marginBottom: 28, maxWidth: 280 },
  retryBtn: { display: 'flex', alignItems: 'center', gap: 10, padding: '16px 32px', borderRadius: 50, border: 'none', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', marginBottom: 16 },
  backHomeBtn: { padding: '12px 24px', background: 'transparent', border: '2px solid #e2e8f0', borderRadius: 30, color: '#64748b', fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  
  activeCallScreen: { flex: 1, background: 'linear-gradient(180deg, #059669 0%, #047857 50%, #065f46 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: 'clamp(30px, 7vw, 45px) clamp(20px, 5vw, 30px)', position: 'relative', overflow: 'hidden' },
  callCircle1: { position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', top: '-150px', right: '-150px' },
  callCircle2: { position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)', bottom: '-100px', left: '-100px' },
  
  connectingWrapper: { position: 'relative', zIndex: 1 },
  pizzaSpinner: { animation: 'spin 3s linear infinite' },
  connectingInfo: { textAlign: 'center', position: 'relative', zIndex: 1 },
  connectingText: { fontSize: 'clamp(24px, 6vw, 30px)', fontWeight: 900, color: '#fff', marginBottom: 8 },
  connectingSubtext: { fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, color: 'rgba(255,255,255,0.8)' },
  loadingDots: { display: 'flex', gap: 8, position: 'relative', zIndex: 1 },
  dot: { width: 12, height: 12, borderRadius: '50%', background: '#34d399', animation: 'bounce 0.6s ease-in-out infinite' },
  
  agentAvatarLarge: { width: 'clamp(100px, 26vw, 120px)', height: 'clamp(100px, 26vw, 120px)', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', backdropFilter: 'blur(10px)' },
  avatarRing: { position: 'absolute', inset: -18, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', animation: 'pulse 2s ease-in-out infinite' },
  callerInfo: { textAlign: 'center', position: 'relative', zIndex: 1 },
  callerName: { fontSize: 'clamp(28px, 7vw, 34px)', fontWeight: 900, fontFamily: "'Nunito', sans-serif", color: '#fff', marginBottom: 4 },
  callerRole: { fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)' },
  callTimer: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 32px', borderRadius: 35, fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 800, color: '#fff', fontFamily: 'monospace', position: 'relative', zIndex: 1 },
  timerDot: { width: 14, height: 14, borderRadius: '50%', animation: 'pulse 1s infinite' },
  orderHint: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#fff', position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)' },
  voiceWave: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: 50, position: 'relative', zIndex: 1 },
  voiceBar: { width: 7, borderRadius: 4, animation: 'voicePulse 0.6s ease-in-out infinite' },
  endCallBtn: { display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px, 4.5vw, 22px) clamp(36px, 9vw, 50px)', borderRadius: 50, border: 'none', color: '#fff', fontWeight: 800, fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(16px, 4vw, 18px)', cursor: 'pointer', boxShadow: '0 12px 35px rgba(239, 68, 68, 0.4)', position: 'relative', zIndex: 1, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 'clamp(14px, 3.5vw, 18px)', background: 'rgba(255, 255, 255, 0.95)', borderRadius: 16, boxShadow: '0 4px 20px rgba(16,185,129,0.2)', backdropFilter: 'blur(10px)', color: '#1e293b', fontSize: 'clamp(13px, 3.2vw, 15px)', fontWeight: 700 },
};
