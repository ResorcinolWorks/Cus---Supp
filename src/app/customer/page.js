'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { classifyPizza } from '../../lib/pizzaClassifier';

// Icons
const PhoneIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ChatIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const SendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
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

const CameraIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const DominoTileIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="18" height="40" rx="3" fill="#E31837" stroke="#fff" strokeWidth="2"/>
    <circle cx="13" cy="14" r="3" fill="#fff"/>
    <circle cx="13" cy="34" r="3" fill="#fff"/>
    <rect x="26" y="4" width="18" height="40" rx="3" fill="#006491" stroke="#fff" strokeWidth="2"/>
    <circle cx="35" cy="14" r="3" fill="#fff"/>
    <circle cx="35" cy="24" r="3" fill="#fff"/>
    <circle cx="35" cy="34" r="3" fill="#fff"/>
  </svg>
);

const CustomerAvatar = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="url(#avatarGrad)" stroke="#E31837" strokeWidth="3"/>
    <ellipse cx="60" cy="35" rx="32" ry="20" fill="#4A3728"/>
    <path d="M28 45 Q30 25 60 22 Q90 25 92 45" fill="#4A3728"/>
    <ellipse cx="60" cy="55" rx="28" ry="30" fill="#FFD5B8"/>
    <ellipse cx="48" cy="50" rx="6" ry="7" fill="#fff"/>
    <ellipse cx="72" cy="50" rx="6" ry="7" fill="#fff"/>
    <circle cx="49" cy="51" r="3.5" fill="#3B2F2F"/>
    <circle cx="73" cy="51" r="3.5" fill="#3B2F2F"/>
    <circle cx="50" cy="49" r="1.5" fill="#fff"/>
    <circle cx="74" cy="49" r="1.5" fill="#fff"/>
    <path d="M42 42 Q48 39 54 42" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M66 42 Q72 39 78 42" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M60 55 Q62 60 60 63 Q58 60 60 55" fill="#E8B89D"/>
    <path d="M48 70 Q60 82 72 70" stroke="#C96A4B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="40" cy="65" rx="6" ry="4" fill="#FFB6B6" opacity="0.6"/>
    <ellipse cx="80" cy="65" rx="6" ry="4" fill="#FFB6B6" opacity="0.6"/>
    <path d="M30 95 Q30 85 60 85 Q90 85 90 95 L90 120 L30 120 Z" fill="#006491"/>
    <path d="M50 85 L60 100 L70 85" fill="#E31837"/>
    <defs>
      <linearGradient id="avatarGrad" x1="0" y1="0" x2="120" y2="120">
        <stop offset="0%" stopColor="#FFF5F0"/>
        <stop offset="100%" stopColor="#FFE5DC"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function CustomerAgentPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState('chat');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const chatEndRef = useRef(null);
  const callTimerRef = useRef(null);

  // Image upload states
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    title: 'Customer Support',
    tagline: 'Customer Agent',
    welcomeTitle: 'Hi there! 👋',
    welcomeText: 'How can we help you today? Ask about orders, complaints, or upload a pizza photo for quality check.',
    agentName: 'Jay',
    agentRole: 'Support Agent',
    placeholder: 'Describe your issue...',
    color: '#E31837',
    gradient: 'linear-gradient(135deg, #E31837 0%, #ff3d5a 100%)',
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isCallActive) {
      callTimerRef.current = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    } else {
      clearInterval(callTimerRef.current);
      setCallDuration(0);
    }
    return () => clearInterval(callTimerRef.current);
  }, [isCallActive]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Send text message - connects to /api/customer/chat endpoint
  async function sendText() {
    if (!text.trim()) return;
    const userText = text;
    setText('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    
    try {
      const res = await fetch('/api/customer/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'agent', text: data.response || 'Thank you for your message. Our support team will assist you shortly.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'agent', text: 'Thank you for your message. Our support agent will assist you shortly.' }]);
    }
  }

  // Start voice call - connects to /api/customer/call endpoint
  async function startCall() {
    setIsCallActive(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Connect to voice API endpoint
      await fetch('/api/customer/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' }),
      });
    } catch (err) {
      console.log('Microphone access needed for voice calls');
    }
  }

  async function endCall() {
    setIsCallActive(false);
    await fetch('/api/customer/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'end' }),
    }).catch(() => {});
  }

  // Pizza quality analysis - uses ML model + /api/upload endpoint
  async function analyzeAndSend() {
    if (!image || !preview) return;

    setLoading(true);

    try {
      const img = new window.Image();
      img.src = preview;
      await new Promise((res) => (img.onload = res));

      const result = await classifyPizza(img);

      const verdict =
        result.label.toLowerCase().includes('over')
          ? 'FAIL (Overcooked/Burnt Pizza)'
          : 'PASS (Normal Pizza)';

      const formData = new FormData();
      formData.append('image', image);
      formData.append('verdict', verdict);
      formData.append('confidence', result.confidence.toString());

      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          text: `🍕 Pizza Quality Check Complete!\n\n**Verdict:** ${verdict}\n**Confidence:** ${(result.confidence * 100).toFixed(1)}%\n\nOur quality team has been notified and will review this.`,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'Sorry, there was an issue analyzing the image. Please try again.' },
      ]);
    }

    setImage(null);
    setPreview(null);
    setLoading(false);
  }

  const switchToCall = () => { setMode('call'); setMessages([]); };
  const switchToChat = () => { setMode('chat'); if (isCallActive) endCall(); };

  return (
    <div style={styles.page}>
      <div style={styles.bgImageWrapper}>
        <Image src="/pizza-bg.jpg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div style={styles.gradientOverlay}>
        <div style={styles.circle1} />
        <div style={styles.circle2} />
        <div style={styles.circle3} />
      </div>

      <div style={styles.container}>
        <header style={styles.logoHeader}>
          <button style={styles.backBtn} onClick={() => router.push('/')}>
            <BackIcon size={20} />
          </button>
          <div style={styles.logoCenter}>
            <Image src="/dominos-logo.png" alt="Domino's" width={160} height={50} style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} priority />
            <p style={styles.tagline}>{config.tagline}</p>
          </div>
          <div style={{ width: 44 }} />
        </header>

        <main style={styles.card}>
          <div style={styles.modeSwitcher}>
            <button style={{ ...styles.modeBtn, ...(mode === 'chat' ? { ...styles.modeBtnActive, background: config.gradient } : {}) }} onClick={switchToChat}>
              <ChatIcon size={22} />
              <span>Chat</span>
            </button>
            <button style={{ ...styles.modeBtn, ...(mode === 'call' ? { ...styles.modeBtnActive, background: config.gradient } : {}) }} onClick={switchToCall}>
              <PhoneIcon size={22} />
              <span>Call</span>
            </button>
          </div>

          {mode === 'call' ? (
            <div style={styles.callContainer}>
              {!isCallActive ? (
                <div style={styles.preCallScreen}>
                  <div style={styles.avatarWrapper}><CustomerAvatar size={130} /></div>
                  <h2 style={styles.title}>Voice Support</h2>
                  <p style={styles.subtitle}>Talk to our support agent directly</p>
                  <button style={{ ...styles.startCallBtn, background: config.gradient }} onClick={startCall}>
                    <PhoneIcon size={24} />
                    <span>Start Call</span>
                  </button>
                  <p style={styles.note}>🎧 Ensure microphone is enabled</p>
                </div>
              ) : (
                <div style={styles.activeCallScreen}>
                  <div style={styles.callCircle1} />
                  <div style={styles.callCircle2} />
                  <div style={styles.agentAvatarLarge}>
                    <HeadsetIcon size={50} />
                    <div style={styles.avatarRing} />
                  </div>
                  <div style={styles.callerInfo}>
                    <div style={styles.callerName}>{config.agentName}</div>
                    <div style={styles.callerRole}>{config.agentRole}</div>
                  </div>
                  <div style={styles.callTimer}>
                    <div style={styles.timerDot} />
                    <span>{formatDuration(callDuration)}</span>
                  </div>
                  <div style={styles.voiceWave}>
                    {[...Array(7)].map((_, i) => (
                      <div key={i} style={{...styles.voiceBar, animationDelay: `${i * 0.1}s`}} />
                    ))}
                  </div>
                  <button style={{ ...styles.endCallBtn, background: config.gradient }} onClick={endCall}>
                    <EndCallIcon />
                    <span>End Call</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div style={{ ...styles.chatHeader, background: config.gradient }}>
                <div style={styles.headerLeft}>
                  <div style={styles.agentAvatar}><HeadsetIcon size={22} /></div>
                  <div>
                    <div style={styles.headerTitle}>{config.title}</div>
                    <div style={styles.headerStatus}>
                      <span style={styles.statusDot} />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {messages.length === 0 ? (
                <div style={styles.welcomeSection}>
                  <div style={styles.avatarWrapper}><CustomerAvatar size={110} /></div>
                  <h2 style={styles.welcomeTitle}>{config.welcomeTitle}</h2>
                  <p style={styles.welcomeText}>{config.welcomeText}</p>
                  
                  {/* Pizza Upload Section */}
                  <div style={styles.uploadSection}>
                    <label style={styles.uploadLabel}>
                      <CameraIcon size={20} />
                      <span>Upload Pizza Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={loading}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setImage(file);
                          setPreview(URL.createObjectURL(file));
                        }}
                      />
                    </label>
                    <p style={styles.uploadHint}>Check if your pizza is burnt or overcooked</p>
                  </div>

                  {preview && (
                    <div style={styles.previewSection}>
                      <img src={preview} alt="Pizza Preview" style={styles.previewImage} />
                      <button style={styles.analyzeBtn} onClick={analyzeAndSend} disabled={loading}>
                        {loading ? 'Analyzing...' : '🔍 Inspect Pizza Quality'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={styles.chat}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ ...styles.messageRow, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      {m.role === 'agent' && <div style={styles.agentAvatarSmall}><DominoTileIcon size={18} /></div>}
                      <div style={m.role === 'user' ? { ...styles.userBubble, background: config.gradient } : styles.agentBubble}>
                        {m.text.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                  
                  {preview && (
                    <div style={styles.chatPreview}>
                      <img src={preview} alt="Preview" style={styles.chatPreviewImage} />
                      <button style={styles.smallAnalyzeBtn} onClick={analyzeAndSend} disabled={loading}>
                        {loading ? '...' : '🔍'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div style={styles.inputBar}>
                <label style={styles.uploadIcon}>
                  <CameraIcon size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    disabled={loading}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setImage(file);
                      setPreview(URL.createObjectURL(file));
                    }}
                  />
                </label>
                <input
                  value={text}
                  placeholder={config.placeholder}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendText()}
                  style={styles.input}
                />
                <button style={{ ...styles.sendBtn, background: config.gradient, opacity: text.trim() ? 1 : 0.5 }} onClick={sendText} disabled={!text.trim()}>
                  <SendIcon />
                </button>
              </div>
            </>
          )}
        </main>

        <footer style={styles.footer}>
          <span>📞 1800-208-1234</span>
          <span style={styles.footerDot}>•</span>
          <span>24/7 Support</span>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'clamp(16px, 4vw, 32px)', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito', 'Rubik', sans-serif" },
  bgImageWrapper: { position: 'fixed', inset: 0, zIndex: 0 },
  gradientOverlay: { position: 'fixed', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(0, 100, 145, 0.97) 0%, rgba(0, 85, 125, 0.98) 50%, rgba(0, 65, 100, 0.99) 100%)' },
  circle1: { position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(227, 24, 55, 0.25) 0%, transparent 70%)', top: '-200px', right: '-100px', animation: 'float 8s ease-in-out infinite' },
  circle2: { position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 150, 200, 0.3) 0%, transparent 70%)', bottom: '-100px', left: '-50px', animation: 'float 10s ease-in-out infinite reverse' },
  circle3: { position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 120, 170, 0.35) 0%, transparent 70%)', top: '40%', left: '10%', animation: 'float 12s ease-in-out infinite' },
  container: { width: '100%', maxWidth: 'min(440px, 94vw)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 2 },
  logoHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.2))' },
  backBtn: { width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' },
  logoCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  tagline: { color: '#fff', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' },
  card: { background: 'rgba(255, 255, 255, 0.98)', borderRadius: 'clamp(20px, 5vw, 28px)', boxShadow: '0 30px 60px rgba(0, 60, 100, 0.25)', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 'clamp(480px, 62vh, 560px)', border: '2px solid rgba(227, 24, 55, 0.15)' },
  modeSwitcher: { display: 'flex', padding: '14px', gap: '10px', background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' },
  modeBtn: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 'clamp(14px, 3.5vw, 18px)', borderRadius: 16, border: 'none', background: '#fff', color: '#64748b', fontSize: 'clamp(15px, 3.8vw, 17px)', fontWeight: 800, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  modeBtnActive: { color: '#fff', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)', transform: 'translateY(-2px)' },
  chatHeader: { padding: 'clamp(14px, 3.5vw, 18px) clamp(18px, 4.5vw, 24px)' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 14 },
  agentAvatar: { width: 48, height: 48, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  headerTitle: { color: '#fff', fontSize: 'clamp(16px, 4vw, 19px)', fontWeight: 800, fontFamily: "'Nunito', sans-serif" },
  headerStatus: { color: 'rgba(255, 255, 255, 0.9)', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 },
  statusDot: { width: 9, height: 9, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' },
  welcomeSection: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 30px)', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' },
  avatarWrapper: { marginBottom: 20, filter: 'drop-shadow(0 10px 25px rgba(227,24,55,0.2))' },
  welcomeTitle: { fontSize: 'clamp(24px, 6vw, 30px)', fontWeight: 900, fontFamily: "'Nunito', sans-serif", color: '#1e293b', marginBottom: 8 },
  welcomeText: { fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, color: '#64748b', marginBottom: 16, maxWidth: 300 },
  uploadSection: { marginTop: 12 },
  uploadLabel: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'linear-gradient(135deg, #E31837 0%, #ff3d5a 100%)', color: '#fff', borderRadius: 30, cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(227, 24, 55, 0.3)' },
  uploadHint: { marginTop: 8, fontSize: 12, color: '#94a3b8', fontWeight: 600 },
  previewSection: { marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  previewImage: { width: 160, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' },
  analyzeBtn: { padding: '12px 24px', background: 'linear-gradient(135deg, #006491 0%, #0088c2 100%)', color: '#fff', border: 'none', borderRadius: 30, fontWeight: 700, cursor: 'pointer', fontSize: 14, boxShadow: '0 4px 15px rgba(0, 100, 145, 0.3)' },
  title: { fontSize: 'clamp(24px, 6vw, 28px)', fontWeight: 900, fontFamily: "'Nunito', sans-serif", color: '#1e293b', marginBottom: 8 },
  subtitle: { fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, color: '#64748b', marginBottom: 28 },
  note: { marginTop: 20, fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: '#94a3b8' },
  chat: { flex: 1, padding: 'clamp(14px, 3.5vw, 18px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' },
  messageRow: { display: 'flex', alignItems: 'flex-end', gap: 10, animation: 'slideUp 0.4s ease-out forwards' },
  agentAvatarSmall: { width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #E31837 0%, #c41230 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(227, 24, 55, 0.3)' },
  userBubble: { maxWidth: '78%', padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px)', borderRadius: '22px 22px 4px 22px', fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, lineHeight: 1.5, color: '#fff', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)' },
  agentBubble: { maxWidth: '78%', padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px)', borderRadius: '22px 22px 22px 4px', fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, lineHeight: 1.5, background: '#fff', color: '#1e293b', border: '2px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)' },
  chatPreview: { display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: '#f1f5f9', borderRadius: 12 },
  chatPreviewImage: { width: 60, height: 60, objectFit: 'cover', borderRadius: 8 },
  smallAnalyzeBtn: { width: 40, height: 40, borderRadius: '50%', border: 'none', background: '#006491', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 16 },
  inputBar: { padding: 'clamp(14px, 3.5vw, 18px)', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12, background: '#fff', alignItems: 'center' },
  uploadIcon: { width: 44, height: 44, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.3s ease' },
  input: { flex: 1, padding: 'clamp(14px, 3.5vw, 18px) clamp(18px, 4.5vw, 24px)', borderRadius: 30, border: '2px solid #e2e8f0', fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, fontFamily: "'Nunito', sans-serif", background: '#f8fafc', color: '#1e293b', transition: 'all 0.3s ease' },
  sendBtn: { width: 'clamp(52px, 14vw, 60px)', height: 'clamp(52px, 14vw, 60px)', borderRadius: '50%', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  callContainer: { flex: 1, display: 'flex', flexDirection: 'column' },
  preCallScreen: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(28px, 6vw, 40px)', textAlign: 'center', background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)' },
  startCallBtn: { display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px, 4.5vw, 22px) clamp(36px, 9vw, 50px)', borderRadius: 50, border: 'none', color: '#fff', fontSize: 'clamp(17px, 4.2vw, 20px)', fontWeight: 800, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', boxShadow: '0 10px 35px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  activeCallScreen: { flex: 1, background: 'linear-gradient(180deg, #006491 0%, #004A6E 50%, #003854 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: 'clamp(36px, 8vw, 50px) clamp(20px, 5vw, 30px)', position: 'relative', overflow: 'hidden' },
  callCircle1: { position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', top: '-150px', right: '-150px' },
  callCircle2: { position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(227,24,55,0.15) 0%, transparent 70%)', bottom: '-100px', left: '-100px' },
  agentAvatarLarge: { width: 'clamp(100px, 26vw, 120px)', height: 'clamp(100px, 26vw, 120px)', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', backdropFilter: 'blur(10px)' },
  avatarRing: { position: 'absolute', inset: -18, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', animation: 'pulse 2s ease-in-out infinite' },
  callerInfo: { textAlign: 'center', position: 'relative', zIndex: 1 },
  callerName: { fontSize: 'clamp(28px, 7vw, 34px)', fontWeight: 900, fontFamily: "'Nunito', sans-serif", color: '#fff', marginBottom: 4 },
  callerRole: { fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 600, color: 'rgba(255, 255, 255, 0.75)' },
  callTimer: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 32px', background: 'rgba(0,0,0,0.25)', borderRadius: 35, fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 800, color: '#fff', fontFamily: 'monospace', position: 'relative', zIndex: 1 },
  timerDot: { width: 14, height: 14, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 15px #4ade80', animation: 'pulse 1s infinite' },
  voiceWave: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, height: 50, position: 'relative', zIndex: 1 },
  voiceBar: { width: 7, background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)', borderRadius: 4, animation: 'voicePulse 0.6s ease-in-out infinite' },
  endCallBtn: { display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px, 4.5vw, 22px) clamp(36px, 9vw, 50px)', borderRadius: 50, border: 'none', color: '#fff', fontWeight: 800, fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(16px, 4vw, 18px)', cursor: 'pointer', boxShadow: '0 12px 35px rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 'clamp(14px, 3.5vw, 18px)', background: 'rgba(255, 255, 255, 0.95)', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,100,145,0.2)', backdropFilter: 'blur(10px)', color: '#1e293b', fontSize: 'clamp(13px, 3.2vw, 15px)', fontWeight: 700 },
  footerDot: { color: '#E31837' },
};
