import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Heart, Volume2, VolumeX, Star, Moon, Flower2, Sparkles as SparklesIcon,
  Play, Pause, X, ChevronLeft, ChevronRight, Gift as GiftIcon, RotateCcw
} from "lucide-react";

/* =========================================================================
   CONFIG — edit everything here. The page updates automatically.
   ========================================================================= */
const CONFIG = {
  yourName: "Mansi",
  partnerName: "Ankit",
  musicUrl: "", // put a hosted mp3 URL here to enable real background music
  startDate: "2022-04-14T00:00:00",
  welcome: {
    title: "For Ankit",
    subtitle: "A little surprise, made with all my heart, just for you.",
  },
  letter: `My Ankit,

Happy B'day sweetheart ❤️✨🫂
No matter where life takes us, I always want to stand by your side, support you, and celebrate every little moment with you. 🤝❤️
Stay the amazing, caring, and wonderful person you are. Never stop smiling because your smile is my favorite. 😊💕
Today is your day so justttt enjoy it Cutiepie😘
Always yours,
Mansi`,
  gifts: [
    { id: "chocolate", emoji: "🍫", label: "Chocolate", message: "A box of your favorite dark chocolate, waiting for our next movie night." },
    { id: "teddy", emoji: "🧸", label: "Teddy Bear", message: "Something soft to hug whenever you feel like it. Consider it my stand-in for the nights I fall asleep first." },
    { id: "flowers", emoji: "💐", label: "Flowers", message: "Peonies, because you once said they looked like the inside of a sunrise." },
    { id: "ring", emoji: "💍", label: "A Promise", message: "Not the ring yet — just the promise that it's coming, one day." },
    { id: "coupon", emoji: "🎟️", label: "Love Coupon", message: "Redeemable anytime for one full day of my undivided attention, no phone, no excuses." },
    { id: "hug", emoji: "🤗", label: "A Hug", message: "Consider yourself hugged. Tightly. For much longer than is socially normal." },
    { id: "kiss", emoji: "💋", label: "A Kiss", message: "One kiss, saved up just for you, delivered right now." },
    { id: "playlist", emoji: "🎵", label: "A Playlist", message: "Every song that has ever reminded me of you, in the order I found them." },
  ],
  photos: [
    { src: "https://picsum.photos/seed/us1/500/650", caption: "The day we met" },
    { src: "https://picsum.photos/seed/us2/500/400", caption: "First trip together" },
    { src: "https://picsum.photos/seed/us3/500/700", caption: "That rainy afternoon" },
    { src: "https://picsum.photos/seed/us4/500/500", caption: "Your favorite coffee shop" },
    { src: "https://picsum.photos/seed/us5/500/600", caption: "Late night talks" },
    { src: "https://picsum.photos/seed/us6/500/450", caption: "Silly faces only" },
    { src: "https://picsum.photos/seed/us7/500/680", caption: "Sunset, your favorite" },
    { src: "https://picsum.photos/seed/us8/500/520", caption: "That big warm hug" },
    { src: "https://picsum.photos/seed/us9/500/600", caption: "Just us, being us" },
  ],
  timeline: [
    { icon: "❤️", title: "First Meet", date: "April 2022", text: "A group chat, a bad joke, and somehow it stuck." },
    { icon: "💬", title: "First Chat", date: "April 2022", text: "Three hours felt like three minutes." },
    { icon: "🌸", title: "First Date", date: "June 2022", text: "You laughed so hard you nearly knocked over the table." },
    { icon: "📸", title: "Favorite Memory", date: "December 2023", text: "The trip we still talk about all the time." },
    { icon: "💖", title: "Today", date: "Still going", text: "Closer than ever, and still going strong." },
  ],
  reasons: [
    "Your smile", "Your kindness", "Your ridiculous laugh", "How much you care",
    "Your patience with me", "The way you say my name", "Your terrible puns",
    "Simply everything about you",
  ],
  songs: [
    { title: "Perfect", artist: "Ed Sheeran", art: "🎧" },
    { title: "All of Me", artist: "John Legend", art: "🎼" },
    { title: "Say You Won't Let Go", artist: "James Arthur", art: "🎹" },
    { title: "Better Together", artist: "Jack Johnson", art: "🎸" },
  ],
  secrets: [
    { key: "star", icon: "star", label: "the star", message: "Even on our worst days, I never once wanted anyone else." },
    { key: "moon", icon: "moon", label: "the moon", message: "I look at the moon sometimes, knowing you might be looking at it too." },
    { key: "heart", icon: "heart", label: "the heart", message: "You are, without competition, the best thing that has happened to me." },
    { key: "flower", icon: "flower", label: "the flower", message: "I am not going anywhere. Not now, not ever." },
  ],
  endingMessage: "Thank you for being the most beautiful part of my life.",
};

/* =========================================================================
   Shared bits
   ========================================================================= */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap');

    .surprise-root { font-family: 'Poppins', sans-serif; color: #4A2545; }
    .font-hand { font-family: 'Dancing Script', cursive; }

    .bg-cream { background-color: #FFF8F3; }
    .bg-blush { background-color: #F6C9D6; }
    .bg-lavender { background-color: #DCC9F0; }
    .bg-peach { background-color: #FBD2AE; }
    .text-plum { color: #4A2545; }
    .text-gold { color: #C9922E; }
    .border-gold { border-color: #D9A857; }
    .bg-dream-gradient {
      background: linear-gradient(135deg, #FFF8F3 0%, #F6C9D6 35%, #DCC9F0 70%, #FBD2AE 100%);
      background-size: 300% 300%;
      animation: gradientShift 18s ease infinite;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes floatUp {
      0% { transform: translateY(10vh) translateX(0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.9; }
      90% { opacity: 0.9; }
      100% { transform: translateY(-110vh) translateX(20px) rotate(340deg); opacity: 0; }
    }
    .floating-heart {
      position: absolute; bottom: 0; animation-name: floatUp; animation-timing-function: linear; animation-iteration-count: infinite;
      pointer-events: none; user-select: none;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.15; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.15); }
    }
    .sparkle-dot { position: absolute; animation-name: twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; pointer-events: none; }

    @keyframes confettiFall {
      0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    .confetti-piece { position: fixed; top: 0; animation-name: confettiFall; animation-timing-function: ease-in; pointer-events: none; z-index: 200; }

    @keyframes pulseHeart {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.12); }
    }
    .pulse-heart { animation: pulseHeart 1.8s ease-in-out infinite; }

    @keyframes blinkCursor {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .ink-cursor { animation: blinkCursor 0.9s step-start infinite; }

    @keyframes revealUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .reveal { animation: revealUp 0.8s ease-out both; }

    @keyframes flapOpen {
      from { transform: rotateX(0deg); }
      to { transform: rotateX(180deg); }
    }
    .flap-open { animation: flapOpen 0.9s ease-in forwards; transform-origin: top; }

    .scroll-fade {
      opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .scroll-fade.is-visible { opacity: 1; transform: translateY(0); }

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #FFF8F3; }
    ::-webkit-scrollbar-thumb { background: #F6C9D6; border-radius: 8px; }

    @media (prefers-reduced-motion: reduce) {
      .floating-heart, .sparkle-dot, .confetti-piece, .pulse-heart, .bg-dream-gradient { animation: none !important; }
      .scroll-fade { transition: none; opacity: 1; transform: none; }
    }
  `}</style>
);

const HEART_COLORS = ["#F6C9D6", "#DCC9F0", "#FBD2AE", "#D9A857", "#E8A0B4"];

function FloatingHearts({ count = 14, className = "" }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 10,
        color: HEART_COLORS[i % HEART_COLORS.length],
      })),
    [count]
  );
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color: h.color,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function Sparkles({ count = 20 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 4,
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <span
          key={d.id}
          className="sparkle-dot rounded-full bg-white"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}

function Confetti({ trigger }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const colors = ["#F6C9D6", "#DCC9F0", "#FBD2AE", "#D9A857", "#E8A0B4", "#FFFFFF"];
    const newPieces = Array.from({ length: 45 }).map((_, i) => ({
      id: `${trigger}-${i}`,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 2 + Math.random() * 1.5,
      delay: Math.random() * 0.4,
      rounded: Math.random() > 0.5,
    }));
    setPieces(newPieces);
    const t = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(t);
  }, [trigger]);

  if (pieces.length === 0) return null;
  return (
    <>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.rounded ? "50%" : "2px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// Scroll-reveal wrapper using IntersectionObserver
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`scroll-fade ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-6">
      <span className="w-16 h-px bg-gold opacity-60" />
      <Heart size={16} className="mx-3 text-gold" fill="#D9A857" />
      <span className="w-16 h-px bg-gold opacity-60" />
    </div>
  );
}

/* =========================================================================
   Loading Screen
   ========================================================================= */
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 500);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 220);
    return () => clearInterval(interval);
  }, [onDone]);

  const shown = Math.min(100, Math.round(progress));

  return (
    <div className="fixed inset-0 z-50 bg-dream-gradient flex items-center justify-center overflow-hidden">
      <FloatingHearts count={16} />
      <Sparkles count={24} />
      <div className="relative text-center px-6">
        <Heart size={46} className="mx-auto mb-6 text-white pulse-heart" fill="#ffffff" />
        <p className="font-hand text-4xl md:text-5xl mb-6 text-plum">Preparing your surprise...</p>
        <div className="w-64 md:w-80 h-2 bg-white/50 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full rounded-full bg-gold transition-all duration-200 ease-out"
            style={{ width: `${shown}%`, backgroundColor: "#D9A857" }}
          />
        </div>
        <p className="mt-3 text-sm tracking-widest text-plum/70">{shown}%</p>
      </div>
    </div>
  );
}

/* =========================================================================
   Welcome / Hero
   ========================================================================= */
function Welcome({ onOpen }) {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) {
        if (!next) audioRef.current.play().catch(() => { });
        else audioRef.current.pause();
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-dream-gradient flex items-center justify-center overflow-hidden reveal">
      {CONFIG.musicUrl ? <audio ref={audioRef} src={CONFIG.musicUrl} loop muted={muted} /> : null}
      <FloatingHearts count={18} />
      <Sparkles count={26} />

      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 bg-white/70 hover:bg-white rounded-full p-3 shadow-md transition"
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <VolumeX size={20} className="text-plum" /> : <Volume2 size={20} className="text-plum" />}
      </button>

      <div className="relative text-center px-6 max-w-2xl">
        <p className="font-hand text-2xl md:text-3xl text-gold mb-2">A surprise for</p>
        <h1 className="font-hand text-6xl md:text-8xl mb-6 text-plum leading-tight">{CONFIG.welcome.title}</h1>
        <p className="text-base md:text-lg text-plum/80 mb-10 leading-relaxed">{CONFIG.welcome.subtitle}</p>
        <div className="text-5xl mb-10">🌷💌🌙</div>
        <button
          onClick={onOpen}
          className="bg-plum text-white px-8 py-4 rounded-full font-medium tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-transform"
          style={{ backgroundColor: "#4A2545" }}
        >
          Open Your Surprise 💖
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   Love Letter (signature moment)
   ========================================================================= */
function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!opened) return;
    let i = 0;
    const full = CONFIG.letter;
    const interval = setInterval(() => {
      i += 1;
      setTypedText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [opened]);

  return (
    <section className="relative min-h-screen bg-cream flex items-center justify-center px-6 py-20 overflow-hidden">
      <FloatingHearts count={6} />
      <Reveal className="w-full max-w-xl">
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-10 text-plum">A Letter, Just for You</h2>

        {!opened ? (
          <div className="flex flex-col items-center">
            <button
              onClick={() => setOpened(true)}
              className="group relative"
              aria-label="Open the envelope"
              style={{ perspective: "800px" }}
            >
              <div className="w-72 h-48 md:w-80 md:h-52 bg-blush rounded-md shadow-xl relative overflow-hidden border border-white/60">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom right, transparent 49%, rgba(255,255,255,0.5) 50%, transparent 51%), linear-gradient(to bottom left, transparent 49%, rgba(255,255,255,0.5) 50%, transparent 51%)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#C9922E", transform: "translate(-50%, -50%)" }}
                >
                  {CONFIG.yourName[0]}
                </div>
              </div>
              <p className="mt-4 text-sm text-plum/70 tracking-wide">Tap the envelope to open it</p>
            </button>
          </div>
        ) : (
          <div className="reveal bg-white/80 rounded-lg shadow-2xl p-8 md:p-10 border border-blush relative" style={{ backdropFilter: "blur(2px)" }}>
            <div className="absolute -top-3 -left-3 text-3xl">🌸</div>
            <div className="absolute -bottom-3 -right-3 text-3xl">🌸</div>
            <p className="font-hand text-xl md:text-2xl leading-relaxed whitespace-pre-line text-plum">
              {typedText}
              {!typingDone && <span className="ink-cursor">|</span>}
            </p>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* =========================================================================
   Virtual Gifts
   ========================================================================= */
function Gifts() {
  const [openGift, setOpenGift] = useState(null);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleOpen = (gift) => {
    setOpenGift(gift);
    setConfettiKey((k) => k + 1);
  };

  return (
    <section className="relative bg-lavender/40 py-24 px-6">
      <Confetti trigger={confettiKey} />
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-3 text-plum">A Few Little Gifts</h2>
        <p className="text-center text-plum/70 mb-14">Tap each box to open it</p>
      </Reveal>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {CONFIG.gifts.map((gift, i) => (
          <Reveal key={gift.id} className={`transition-delay`}>
            <button
              onClick={() => handleOpen(gift)}
              className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center gap-2 hover:-translate-y-1 active:scale-95 transition-all border border-blush/50"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-4xl">{gift.emoji}</span>
              <span className="text-sm font-medium text-plum/80">{gift.label}</span>
            </button>
          </Reveal>
        ))}
      </div>

      {openGift && (
        <div
          className="fixed inset-0 z-40 bg-plum/40 flex items-center justify-center px-6"
          onClick={() => setOpenGift(null)}
        >
          <div
            className="reveal bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-3 right-3 text-plum/50 hover:text-plum" onClick={() => setOpenGift(null)}>
              <X size={20} />
            </button>
            <div className="text-6xl mb-4">{openGift.emoji}</div>
            <h3 className="font-hand text-3xl mb-3 text-plum">{openGift.label}</h3>
            <p className="text-plum/80 leading-relaxed">{openGift.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================================
   Memory Gallery
   ========================================================================= */
function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const close = () => setLightboxIndex(null);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + CONFIG.photos.length) % CONFIG.photos.length),
    []
  );
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % CONFIG.photos.length), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  return (
    <section className="relative bg-cream py-24 px-6">
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-3 text-plum">Our Memories</h2>
        <p className="text-center text-plum/70 mb-14">Every one of these means something</p>
      </Reveal>

      <div className="max-w-5xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
        {CONFIG.photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="block w-full break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl relative group"
          >
            <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-sm font-medium">{photo.caption}</span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-40 bg-plum/90 flex items-center justify-center px-4" onClick={close}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white" onClick={close}>
            <X size={28} />
          </button>
          <button
            className="absolute left-4 md:left-10 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={32} />
          </button>
          <div className="max-w-2xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={CONFIG.photos[lightboxIndex].src}
              alt={CONFIG.photos[lightboxIndex].caption}
              className="max-h-[70vh] mx-auto rounded-lg shadow-2xl"
            />
            <p className="text-white/90 mt-4 font-hand text-2xl">{CONFIG.photos[lightboxIndex].caption}</p>
          </div>
          <button
            className="absolute right-4 md:right-10 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}

/* =========================================================================
   Timeline
   ========================================================================= */
function Timeline() {
  return (
    <section className="relative bg-peach/30 py-24 px-6">
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-16 text-plum">Our Story So Far</h2>
      </Reveal>
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/50 md:-translate-x-1/2" />
        <div className="space-y-10">
          {CONFIG.timeline.map((item, i) => (
            <Reveal key={i}>
              <div className={`relative flex items-start md:items-center gap-5 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gold -translate-x-1/2 shadow" style={{ backgroundColor: "#D9A857" }} />
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                  <div className={`bg-white rounded-xl shadow-md p-5 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-hand text-2xl text-plum mt-1">{item.title}</h3>
                    <p className="text-xs text-gold tracking-wide uppercase mb-1">{item.date}</p>
                    <p className="text-sm text-plum/70">{item.text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Reasons I Love You (tilt cards)
   ========================================================================= */
function ReasonCard({ text, index }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -14;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    setStyle({ transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)` });
  };
  const handleLeave = () => setStyle({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)" });

  return (
    <Reveal>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ ...style, transition: "transform 0.15s ease-out", borderColor: "#D9A857" }}
        className="bg-white rounded-xl border-2 shadow-md p-6 h-full flex items-center gap-3 cursor-default"
      >
        <Heart size={18} className="text-gold shrink-0" fill="#D9A857" />
        <p className="text-plum/85 font-medium">{text}</p>
      </div>
    </Reveal>
  );
}

function Reasons() {
  return (
    <section className="relative bg-cream py-24 px-6">
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-3 text-plum">Reasons I Love You</h2>
        <p className="text-center text-plum/70 mb-14">Just a few — the list is actually endless</p>
      </Reveal>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
        {CONFIG.reasons.map((reason, i) => (
          <ReasonCard key={i} text={reason} index={i} />
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Love Counter
   ========================================================================= */
function useCountdownSince(startDate) {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const start = new Date(startDate).getTime();
    const tick = () => {
      const now = Date.now();
      let ms = Math.max(0, now - start);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      ms -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(ms / (1000 * 60 * 60));
      ms -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(ms / (1000 * 60));
      ms -= minutes * 1000 * 60;
      const seconds = Math.floor(ms / 1000);
      setDiff({ days, hours, minutes, seconds });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startDate]);
  return diff;
}

function LoveCounter() {
  const { days, hours, minutes, seconds } = useCountdownSince(CONFIG.startDate);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <section className="relative bg-dream-gradient py-24 px-6 text-center">
      <FloatingHearts count={8} />
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl mb-3 text-plum">Time Together</h2>
        <p className="text-plum/70 mb-12">And counting, every single second</p>
      </Reveal>
      <div className="relative max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {units.map((u) => (
          <div key={u.label} className="bg-white/80 rounded-2xl shadow-lg py-6 px-2">
            <p className="text-3xl md:text-4xl font-semibold text-plum tabular-nums">{u.value}</p>
            <p className="text-xs md:text-sm tracking-widest uppercase text-gold mt-1">{u.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Playlist
   ========================================================================= */
function Playlist() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const togglePlay = (i) => {
    if (playingIndex === i) {
      setPlayingIndex(null);
      clearInterval(intervalRef.current);
      return;
    }
    setPlayingIndex(i);
    setProgress(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1.5));
    }, 150);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <section className="relative bg-lavender/40 py-24 px-6">
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-3 text-plum">Our Playlist</h2>
        <p className="text-center text-plum/70 mb-14">Songs that sound like us</p>
      </Reveal>
      <div className="max-w-lg mx-auto space-y-3">
        {CONFIG.songs.map((song, i) => (
          <Reveal key={i}>
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-peach flex items-center justify-center text-2xl shrink-0">{song.art}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-plum truncate">{song.title}</p>
                <p className="text-xs text-plum/60 truncate">{song.artist}</p>
                <div className="h-1.5 bg-cream rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full"
                    style={{ width: `${playingIndex === i ? progress : 0}%`, backgroundColor: "#D9A857", transition: "width 0.15s linear" }}
                  />
                </div>
              </div>
              <button
                onClick={() => togglePlay(i)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: "#4A2545" }}
                aria-label={playingIndex === i ? "Pause" : "Play"}
              >
                {playingIndex === i ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Secret Messages
   ========================================================================= */
const SECRET_ICON_MAP = { star: Star, moon: Moon, heart: Heart, flower: Flower2 };

function SecretMessages() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative bg-cream py-24 px-6 overflow-hidden">
      <Reveal>
        <h2 className="font-hand text-4xl md:text-5xl text-center mb-3 text-plum">Hidden Messages</h2>
        <p className="text-center text-plum/70 mb-14">Tap a symbol to find what's hiding inside</p>
      </Reveal>
      <div className="max-w-md mx-auto grid grid-cols-4 gap-4">
        {CONFIG.secrets.map((s) => {
          const Icon = SECRET_ICON_MAP[s.icon] || Star;
          return (
            <button
              key={s.key}
              onClick={() => setActive(s)}
              className="aspect-square bg-white rounded-2xl shadow-md flex items-center justify-center hover:scale-105 hover:shadow-xl active:scale-95 transition-all"
            >
              <Icon size={28} className="text-gold" style={{ color: "#C9922E" }} />
            </button>
          );
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-40 bg-plum/40 flex items-center justify-center px-6" onClick={() => setActive(null)}>
          <div className="reveal bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-plum/50 hover:text-plum" onClick={() => setActive(null)}>
              <X size={20} />
            </button>
            <p className="text-xs uppercase tracking-widest text-gold mb-3">You found {active.label}</p>
            <p className="font-hand text-2xl text-plum leading-relaxed">{active.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================================
   Ending
   ========================================================================= */
function Ending({ onReplay }) {
  return (
    <section className="relative min-h-screen bg-plum flex items-center justify-center px-6 py-24 overflow-hidden" style={{ backgroundColor: "#3A1C38" }}>
      <FloatingHearts count={16} />
      <Sparkles count={40} />
      <div className="relative text-center max-w-xl">
        <Heart size={64} className="mx-auto mb-8 pulse-heart" style={{ color: "#F6C9D6" }} fill="#F6C9D6" />
        <p className="font-hand text-4xl md:text-5xl text-white leading-relaxed mb-10">{CONFIG.endingMessage}</p>
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/40 px-6 py-3 rounded-full transition"
        >
          <RotateCcw size={16} />
          Watch it again
        </button>
      </div>
    </section>
  );
}

/* =========================================================================
   App
   ========================================================================= */
export default function App() {
  const [stage, setStage] = useState("loading"); // loading -> welcome -> content
  const contentRef = useRef(null);

  const handleReplay = () => {
    setStage("loading");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  };

  return (
    <div className="surprise-root min-h-screen w-full">
      <GlobalStyles />
      {stage === "loading" && <LoadingScreen onDone={() => setStage("welcome")} />}
      {stage === "welcome" && <Welcome onOpen={() => setStage("content")} />}
      {stage === "content" && (
        <div ref={contentRef}>
          <LoveLetter />
          <SectionDivider />
          <Gifts />
          <Gallery />
          <SectionDivider />
          <Timeline />
          <Reasons />
          <LoveCounter />
          <Playlist />
          <SecretMessages />
          <Ending onReplay={handleReplay} />
        </div>
      )}
    </div>
  );
}
