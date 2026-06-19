import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Check, 
  ChevronDown, 
  Sparkles, 
  User, 
  Map, 
  ExternalLink,
  Send,
  Copy,
  MessageSquare,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Camera,
  Music
} from 'lucide-react';

import GateScreen from './components/GateScreen';
import ScratchCard from './components/ScratchCard';
import CountdownTimer from './components/CountdownTimer';
import MusicPlayer from './components/MusicPlayer';
import HostDashboard from './components/HostDashboard';
import { RSVP } from './types';

// @ts-ignore
import brideGroom1 from '../assets/bride-groom-1.jpg';
// @ts-ignore
import brideGroom2 from '../assets/bride-groom-2.jpg';
// @ts-ignore
import brideGroom3 from '../assets/bride-groom-3.jpg';

// Fully immersive, highly accurate Telugu and English culture translations dictionary
const TRANSLATIONS = {
  en: {
    title: "Sprudhar Reddy & Preethi Wedding",
    weddingInvitation: "Wedding Invitation",
    weAreGettingMarried: "We have decided on forever",
    bride: "Preethi",
    groom: "Sprudhar Reddy",
    and: "&",
    scrollDown: "Scroll Down",
    namaskar: "Namaskar",
    quote: "🌸 Join us for a magical celebration of love, happiness, and togetherness. Let’s create beautiful memories together on this unforgettable day! ✨💍",
    scratchToReveal: "Scratch To Reveal",
    scratchHint: "Rub gold to reveal secret venue/date",
    foreverBegins: "Our Forever Begins",
    photosCaption: "Captured moments of our laughter",
    invitedTitle: "You're Invited!",
    marriageDate: "July 01, 2026",
    marriageTimeText: "Wednesday • 6:00 PM onwards",
    diningTimeText: "Dining • 7:00 PM onwards",
    ceremonyDesc: "Join us as we stand together, holding hands to take the sacred vows of lifetime union.",
    programTimeline: "Program Timeline",
    flowOfCelebration: "The flow of celebration",
    theVenue: "The Venue (for Groom Ceremony)",
    venueDetails: "Pamulpahad Village, Modgulapalli, Nalgonda",
    viewOnMap: "View on Google Maps",
    preEventsTitle: "Pre-Wedding Events",
    preEventsDesc: "Other festive gatherings",
    celebrateWithUs: "Celebrate with us",
    kindlyRSVP: "Kindly RSVP",
    rsvpHint: "Please respond on or before the wedding day",
    fullNameLabel: "Your Full Name",
    villageLabel: "Your Village Name",
    enterName: "Enter your name",
    enterVillage: "Enter your village",
    willYouAttend: "Will you be attending?",
    yesAttend: "I'll be there! 👍",
    noAttend: "Sorry, I can't make it 😔",
    submitRSVP: "Submit RSVP & Prepare Forwarding",
    rsvpSuccess: "RSVP Saved!",
    rsvpSuccessDesc: "Your attendance reply has been recorded locally. Thank you for celebrating with us!",
    toastError: "Please enter your name and village.",
    submitAnother: "Submit Another RSVP",
    forwardTitle: "Forward RSVP as Message",
    forwardDesc: "Forward your confirmation details to the hosts at 9398246486:",
    sendViaWhatsApp: "Send via WhatsApp",
    sendViaSMS: "Send via Regular SMS",
    footerMessage: "We can't wait to celebrate with you!",
    orCopy: "Or Copy Message Text",
    copied: "Copied to clipboard!",
    sangeet: "Sangeet Ceremony",
    haldi: "Haldi Ceremony",
    groomCeremony: "Groom Ceremony",
    sangeetDetails: "June 29, 2026 • 6:00 PM onwards",
    haldiDetails: "June 30, 2026 • 6:00 PM",
    groomCeremonyDetails: "June 30, 2026 • 11:00 AM",
    atPamulpahad: "At Pamulpahad",
    pamulpahadVillage: "Pamulpahad Village, Modgulapalli, Nalgonda",
  },
  te: {
    title: "స్ప్రుధర్ రెడ్డి & ప్రీతి వివాహం",
    weddingInvitation: "కళ్యాణ మహోత్సవ ఆహ్వాన పత్రిక",
    weAreGettingMarried: "నేడే మా కళ్యాణం",
    bride: "ప్రీతి",
    groom: "స్ప్రుధర్ రెడ్డి",
    and: "మరియు",
    scrollDown: "క్రిందికి స్క్రోల్ చేయండి",
    namaskar: "నమస్కారం",
    quote: "🌸 ప్రేమ, సంతోషం మరియు కలయికల కలబోతగా జరగబోవు మా శుభకార్యానికి మిమ్మల్ని ఆహ్వానిస్తున్నాము. మా జీవితాంతం గుర్తిండిపోయే ఈ మధుర క్షణాలలో మమ్మల్ని ఆశీర్వదించండి! ✨💍",
    scratchToReveal: "స్క్రాచ్ చేసి వీక్షించండి",
    scratchHint: "బంగారు వన్నెను తుడిచి వివాహ వేదికను తెలుసుకోండి",
    foreverBegins: "మా నూతన జీవితం",
    photosCaption: "మా ప్రేమ ప్రయాణంలోని ముచ్చటైన కొన్ని క్షణాలు",
    invitedTitle: "మీకు ఇదే మా సాదర ఆహ్వానం!",
    marriageDate: "జులై 01, 2026",
    marriageTimeText: "బుధవారం • సాయంత్రం 6:00 గంటలకు",
    diningTimeText: "భోజన సమయం • రాత్రి 7:00 గంటల నుండి",
    ceremonyDesc: "నూతన దాంపత్య జీవితంలోకి అడుగుపెడుతున్న మా జంటను మీ అమూల్యమైన ఆశీస్సులతో దీవించవలసిందిగా ప్రార్థన.",
    programTimeline: "కార్యక్రమాల పట్టిక",
    flowOfCelebration: "వివాహ వేడుకల ప్రయాణం",
    theVenue: "వేదిక (for Groom Ceremony)",
    venueDetails: "పాములపహాడ్ గ్రామం, మాడుగులపల్లి మండలం, నల్గొండ జిల్లా",
    viewOnMap: "గూగుల్ మ్యాప్స్‌లో చూడండి",
    preEventsTitle: "వివాహానికి ముందస్తు వేడుకలు",
    preEventsDesc: "ఉల్లాసభరితమైన పండుగ వాతావరణం",
    celebrateWithUs: "మాతో కలిసి పండగ చేసుకోండి",
    kindlyRSVP: "మీ ఉనికిని ధృవీకరించండి (RSVP)",
    rsvpHint: "దయచేసి వివాహ దినానికి ముందే తెలియజేయండి",
    fullNameLabel: "మీ పూర్తి పేరు",
    villageLabel: "మీ గ్రామం పేరు",
    enterName: "మీ పేరు రాయండి",
    enterVillage: "మీ ఊరి పేరు రాయండి",
    willYouAttend: "మీరు వివాహానికి విచ్చేస్తున్నారా?",
    yesAttend: "తప్పకుండా వస్తున్నాము! 👍",
    noAttend: "రానందుకు క్షమించండి 😔",
    submitRSVP: "సమర్పించండి & మెసేజ్ సిద్ధంచేయండి",
    rsvpSuccess: "వివరాలు నమోదైనవి!",
    rsvpSuccessDesc: "మీ వివరాలు విజయవంతంగా నమోదైనవి. మాతో వేడుక పంచుకోబోతున్నందుకు ధన్యవాదాలు!",
    toastError: "దయచేసి మీ పేరు మరియు గ్రామం పేరు నమోదు చేయండి.",
    submitAnother: "మరొకరి వివరాలు చేర్చండి",
    forwardTitle: "సమాచారాన్ని ఫోన్‌కు ఫార్వర్డ్ చేయండి",
    forwardDesc: "మీ RSVP సమాచారాన్ని 9398246486 నెంబరుకు మెసేజ్ రూపంలో పంపండి:",
    sendViaWhatsApp: "వాట్సాప్ (WhatsApp) ద్వారా పంపు",
    sendViaSMS: "సాధారణ ఎస్ఎమ్ఎస్ (SMS) ద్వారా పంపు",
    footerMessage: "మిమ్మల్ని కలుసుకోవడానికి ఎదురుచూస్తున్నాము!",
    orCopy: "లేదా మెసేజ్ టెక్స్ట్ కాపీ చేయండి",
    copied: "క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!",
    sangeet: "సంగీత్ వేడుక",
    haldi: "హల్దీ వేడుక",
    groomCeremony: "పెళ్ళికుమారుడి వేడుక (Groom Ceremony)",
    sangeetDetails: "జూన్ 29, 2026 • సాయంత్రం 6:00 గంటల నుండి",
    haldiDetails: "జూన్ 30, 2026 • సాయంత్రం 6:00 గంటలకు",
    groomCeremonyDetails: "జూన్ 30, 2026 • ఉదయం 11:00 గంటలకు",
    atPamulpahad: "పాములపహాడ్ వద్ద",
    pamulpahadVillage: "పాములపహాడ్ గ్రామం, మాడుగులపల్లి, నల్గొండ జిల్లా",
  }
};

const DEFAULT_PHOTOS = [
  {
    url: brideGroom1,
    captionEn: "✨ Cozy Seated Wedding Portrait on decorated Sofa 💕",
    captionTe: "✨ కళ్యాణ పీఠంపై ముచ్చటైన నూతన దంపతులు 💍"
  },
  {
    url: brideGroom2,
    captionEn: "🍰 Sweet Wedding Cake Cutting Ceremony under a glowing lotus 🌸",
    captionTe: "🍰 మంగళకరమైన వివాహ మధుర క్షణాలు - కేక్ కట్టింగ్ వేడుక 🎉"
  },
  {
    url: brideGroom3,
    captionEn: "🌸 Beautiful Moments of Love and Togetherness 💕",
    captionTe: "🌸 అనురాగ బంధం - మధుర క్షణాల కలబోత 💍"
  }
];

export default function App() {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [isGateOpened, setIsGateOpened] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgLoadError, setImgLoadError] = useState(false);

  useEffect(() => {
    setImgLoadError(false);
  }, [currentSlide]);

  const [formName, setFormName] = useState('');
  const [formVillage, setFormVillage] = useState('');
  const [formAttending, setFormAttending] = useState<'yes' | 'no'>('yes');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rsvpUpdateCounter, setRsvpUpdateCounter] = useState(0);
  const [toastMsg, setToastMsg] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  // Dynamic state for wedding photos customizer
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('wedding_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return DEFAULT_PHOTOS;
  });

  const handlePhotosChange = (newPhotos: any[] | null) => {
    if (newPhotos === null) {
      localStorage.removeItem('wedding_photos');
      setPhotos(DEFAULT_PHOTOS);
    } else {
      localStorage.setItem('wedding_photos', JSON.stringify(newPhotos));
      setPhotos(newPhotos);
    }
  };

  // Dynamic state for custom background music track
  const [customAudio, setCustomAudio] = useState(() => {
    return localStorage.getItem('wedding_audio') || '';
  });

  const handleAudioChange = (newAudio: string | null) => {
    if (newAudio === null) {
      localStorage.removeItem('wedding_audio');
      setCustomAudio('');
    } else {
      localStorage.setItem('wedding_audio', newAudio);
      setCustomAudio(newAudio);
    }
  };

  // Floating petals/sparks state
  interface Particle {
    id: number;
    left: string;
    delay: string;
    duration: string;
    size: string;
    type: 'heart' | 'sparkle';
  }
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate lovely background floating petals and hearts
    const newParticles: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${10 + Math.random() * 15}px`,
      type: Math.random() > 0.6 ? 'heart' : 'sparkle'
    }));
    setParticles(newParticles);

    // Auto seed default mock RSVPs if empty
    const existing = localStorage.getItem('wedding_rsvps');
    if (!existing || JSON.parse(existing).length === 0) {
      const mockData: RSVP[] = [
        {
          id: '1',
          fullName: 'Jashwanth Reddy',
          village: 'Pamulpahad',
          attending: 'yes',
          message: 'Happy wedding! Extremely happy to celebrate with Sprudhar and Preethi!',
          submittedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: '2',
          fullName: 'Srinivas Rao',
          village: 'Modgulapalli',
          attending: 'yes',
          message: 'Hearty congratulations to the beautiful couple! Looking forward to July 1st!',
          submittedAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
      localStorage.setItem('wedding_rsvps', JSON.stringify(mockData));
    }

    // Interval for photo carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const saved = localStorage.getItem('wedding_photos');
        let currentLen = 3;
        try { if (saved) currentLen = JSON.parse(saved).length; } catch(e){}
        return (prev + 1) % currentLen;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleRSVPFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = TRANSLATIONS[lang];
    if (!formName.trim() || !formVillage.trim()) {
      triggerToast(t.toastError);
      return;
    }

    const newRSVP: RSVP = {
      id: Math.random().toString(36).substring(2, 9),
      fullName: formName.trim(),
      village: formVillage.trim(),
      attending: formAttending,
      message: formMessage.trim() || '',
      submittedAt: new Date().toISOString()
    };

    const raw = localStorage.getItem('wedding_rsvps');
    let list: RSVP[] = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = [];
      }
    }
    list.unshift(newRSVP);
    localStorage.setItem('wedding_rsvps', JSON.stringify(list));

    setIsSubmitted(true);
    setRsvpUpdateCounter((prev) => prev + 1);
    
    // Smooth toast
    triggerToast(lang === 'te' ? 'RSVP నమోదు విజయవంతమైంది!' : 'Your RSVP has been saved successfully!');
  };

  return (
    <div id="wedding-platform" className="min-h-screen bg-[#110101] flex items-center justify-center py-4 px-2 sm:py-8 sm:px-4 relative overflow-hidden">
      
      {/* Deep cinematic background graphic glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#4A0404] rounded-full blur-3xl opacity-30 pointer-events-none -translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B0000]/40 rounded-full blur-3xl opacity-35 pointer-events-none translate-x-12 translate-y-12"></div>

      {/* Elegant side banner description for widescreen viewing */}
      <div className="hidden lg:flex flex-col max-w-sm mr-8 text-stone-200 select-none z-10 space-y-6">
        <div>
          <span className="font-display text-[#D4AF37] font-semibold tracking-widest text-xs uppercase bg-[#D02B2B]/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
            {lang === 'te' ? 'డిజిటల్ వివాహ ఆహ్వాన పత్రిక' : 'Digital Wedding Invitation'}
          </span>
          <h1 className="font-display text-2.5xl font-bold tracking-wide mt-3 text-white leading-tight">
            {lang === 'te' ? 'స్ప్రుధర్ రెడ్డి & ప్రీతి వివాహం' : "Sprudhar Reddy & Preethi's Wedding Invite"}
          </h1>
          <p className="font-serif-luxury text-amber-400 italic mt-2 text-sm">
            “Two souls, one destiny.”
          </p>
        </div>
        
        <p className="font-sans text-xs text-stone-300 leading-relaxed">
          {lang === 'te' 
            ? 'ఈ ఆహ్వాన పత్రికను తెలుగు మరియు ఇంగ్లీష్ భాషలలో వీక్షించవచ్చు. రిసప్షన్, సంగీత్, హల్దీ మరియు వివాహ సమయాల పూర్తి సమాచారం ఇందులో పొందుపరచబడినది. RSVP సమాచారాన్ని సమర్పించి నేరుగా క్రోడీకరించవచ్చు.'
            : 'Welcome to our interactive wedding invitation. Seamlessly translate between translation states, experience real gold scratch card reveals, countdown to the big day, view interactive map coordinates, and instantly forward RSVPs.'
          }
        </p>

        <div className="border-t border-white/15 pt-4 space-y-4">
          <div className="flex gap-3 text-xs">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">{lang === 'te' ? 'వివాహ తేదీ' : 'Date of Marriage'}</p>
              <p className="text-amber-200">01 July 2026 (Wednesday)</p>
            </div>
          </div>

          <div className="flex gap-3 text-xs">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-stone-100">{lang === 'te' ? 'కళ్యాణ వేదిక' : 'Ceremony Venue'}</p>
              <p className="text-stone-300">Pamulpahad, Modgulapalli, Nalgonda</p>
            </div>
          </div>
        </div>

        {/* Global responsive Language Picker on sidebar */}
        <div className="bg-stone-900/60 p-3.5 rounded-xl border border-[#D4AF37]/20 text-xs flex flex-col gap-2">
          <p className="text-stone-300 font-medium">Select Invitation Language / భాషను ఎంచుకోండి:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLang('en')}
              className={`py-1.5 px-3 rounded-lg font-bold text-xs cursor-pointer transition-all ${lang === 'en' ? 'bg-[#D4AF37] text-[#4A0404]' : 'bg-white/5 text-stone-400 hover:text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('te')}
              className={`py-1.5 px-3 rounded-lg font-bold text-xs cursor-pointer transition-all ${lang === 'te' ? 'bg-[#D4AF37] text-[#4A0404]' : 'bg-white/5 text-stone-400 hover:text-white'}`}
            >
              తెలుగు (Telugu)
            </button>
          </div>
        </div>
      </div>

      {/* Main smartphone mockup container */}
      <div id="smartphone-frame" className="relative w-full max-w-[430px] rounded-3xl overflow-hidden border-8 border-stone-800 bg-[#FCF8F2] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col min-h-[820px] max-h-[920px]">
        
        {/* Sticky Premium Dual Bilingual Toggle on top corner of Phone */}
        <div className="absolute top-3 right-3 z-40 flex items-center bg-[#4A0404]/85 backdrop-blur-md rounded-full p-1 border border-[#D4AF37]/40 shadow-xl pointer-events-auto">
          <button 
            id="phone-lang-en"
            onClick={() => setLang('en')} 
            className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${lang === 'en' ? 'bg-gradient-to-r from-amber-400 to-[#D4AF37] text-[#4A0404] scale-105' : 'text-stone-300'}`}
          >
            EN
          </button>
          <button 
            id="phone-lang-te"
            onClick={() => setLang('te')} 
            className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${lang === 'te' ? 'bg-gradient-to-r from-amber-400 to-[#D4AF37] text-[#4A0404] scale-105' : 'text-stone-300'}`}
          >
            తెలుగు
          </button>
        </div>

        {/* Floating background petals */}
        {isGateOpened && particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none z-15 opacity-0 text-[#C71585]"
            style={{
              left: p.left,
              animation: `float ${p.duration} linear ${p.delay} infinite`,
              fontSize: p.size,
            }}
          >
            {p.type === 'heart' ? (
              <Heart className="fill-current text-[#e0115f]/15" style={{ width: p.size, height: p.size }} />
            ) : (
              <Sparkles className="text-[#D4AF37]/20" style={{ width: p.size, height: p.size }} />
            )}
          </div>
        ))}

        {/* 1. Gate Screen Gatekeeper */}
        <GateScreen onOpen={() => setIsGateOpened(true)} lang={lang} />

        {/* Inner Content - Scrollable View */}
        <div id="invitation-scrollable-area" className="flex-1 overflow-y-auto relative scroll-smooth flex flex-col bg-[#FCF8F2] pb-6">
          
          {/* Scroll progress bar indicator */}
          <div className="sticky top-0 left-0 right-0 h-1 z-30 bg-stone-200">
            <div className="h-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-600 w-full animate-pulse"></div>
          </div>

          {/* 2. COVER PAGE (Red Luxury Theme) */}
          <section id="cover-section" className="relative h-[650px] shrink-0 bg-[#3d0303] text-stone-100 flex flex-col justify-between p-6 overflow-hidden">
            {/* Elegant vignette / radial wash */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#180000_100%)]"></div>
            
            {/* Elegant corner decals */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg"></div>

            {/* Glowing gold lanterns */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FAF0E6]/10 to-transparent flex justify-around pointer-events-none opacity-40">
              <span className="w-1.5 h-12 bg-[#D4AF37] rounded-b-md"></span>
              <span className="w-1 h-20 bg-[#D4AF37] rounded-b-md"></span>
              <span className="w-1.5 h-16 bg-[#D4AF37] rounded-b-md"></span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                <div className="flex justify-center mb-1">
                  <span className="h-px w-8 bg-[#D4AF37]/50 self-center"></span>
                  <Heart className="w-4 h-4 mx-2 text-[#D4AF37] fill-current animate-pulse" />
                  <span className="h-px w-8 bg-[#D4AF37]/50 self-center"></span>
                </div>

                <p className="font-display text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium leading-[2]">
                  {TRANSLATIONS[lang].weAreGettingMarried}
                </p>

                <div className="py-6 space-y-2 select-none">
                  {/* Groom Name */}
                  <h2 className="font-cursive text-5xl sm:text-6xl text-amber-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    {TRANSLATIONS[lang].groom}
                  </h2>
                  <p className="font-serif-luxury text-[#D4AF37] italic text-xl font-light">
                    {TRANSLATIONS[lang].and}
                  </p>
                  {/* Bride Name */}
                  <h2 className="font-cursive text-5xl sm:text-6xl text-amber-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    {TRANSLATIONS[lang].bride}
                  </h2>
                </div>

                <span className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent block mx-auto"></span>
              </motion.div>
            </div>

            {/* Bottom floating elements */}
            <div className="flex flex-col items-center justify-end h-20 z-10 pb-4 select-none">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center text-stone-300 pointer-events-none"
              >
                <span className="font-serif-luxury text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/75">
                  {TRANSLATIONS[lang].scrollDown}
                </span>
                <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
              </motion.div>
            </div>
          </section>

          {/* 3. INTRODUCTORY GREETING & MAGIC SCRATCH TO REVEAL */}
          <section id="greeting-section" className="py-12 px-6 text-center bg-[#FCF8F2] relative border-b border-stone-200">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-stone-200/20 to-transparent"></div>
            
            <div className="max-w-xs mx-auto space-y-4">
              <span className="font-cursive text-3.5xl text-amber-700 block transition-all">
                {TRANSLATIONS[lang].namaskar}
              </span>
              
              <p className="font-serif-luxury italic text-stone-700 text-sm leading-relaxed px-1">
                {TRANSLATIONS[lang].quote}
              </p>

              <div className="py-2 flex items-center justify-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="inline-block w-5 h-2 rounded-full bg-amber-600"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
              </div>
            </div>

            {/* Interactive Scratch card slot */}
            <div className="mt-8">
              <h4 className="font-display text-[#4A0404] text-xs uppercase font-bold tracking-widest mb-3">
                {TRANSLATIONS[lang].scratchToReveal}
              </h4>
              <ScratchCard 
                revealText={lang === 'te' ? "జులై 01, 2026 • సాయంత్రం 6:00" : "July 01, 2026 • 6:00 PM"} 
                lang={lang} 
              />
            </div>
          </section>

          {/* 4. CHRONICLES OF LOVE (Polaroid Gallery & Slideshow) */}
          <section id="gallery-section" className="py-12 bg-stone-50 border-b border-stone-200 text-center relative overflow-hidden">
            {/* Diagonal elegant stripe */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <h3 className="font-display text-[#4A0404] text-xs font-bold tracking-[0.2em] uppercase mb-1">
              Our Forever Begins
            </h3>
            <p className="font-serif-luxury italic text-xs text-stone-500 mb-8">
              Captured moments of our laughter
            </p>

            {/* Polaroid Box Card */}
            <div className="max-w-xs mx-auto relative px-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, rotate: -2, y: 10 }}
                  animate={{ opacity: 1, rotate: Math.sin(currentSlide) * 3, y: 0 }}
                  exit={{ opacity: 0, rotate: 2, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-4 pb-8 rounded-md shadow-lg border border-stone-200 w-full"
                >
                  <div className="aspect-[4/3] bg-stone-100 rounded overflow-hidden relative border border-stone-200/50">
                    {imgLoadError ? (
                      <div className="absolute inset-0 bg-[radial-gradient(#aa771c_0.8px,transparent_0.8px)] [background-size:10px_10px] bg-stone-50/80 flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-[#D4AF37]/30 rounded">
                        <div className="w-10 h-10 rounded-full bg-[#FCF8F2] flex items-center justify-center text-[#aa771c] mb-1.5 border border-[#D4AF37]/30 shadow-2xs">
                          <Sparkles className="w-4 h-4 animate-pulse text-[#4A0404]" />
                        </div>
                        <div className="font-display font-bold text-[11px] text-[#4A0404] uppercase tracking-wider">
                          {lang === 'te' ? "కళ్యాణోత్సవం" : "Traditional Wedding"}
                        </div>
                        <div className="text-[15px] font-cursive text-stone-700 font-bold mt-0.5" style={{ textShadow: '0 0 1px rgba(0,0,0,0.05)' }}>
                          Sprudhar & Preethi
                        </div>
                        <div className="text-[9px] text-[#aa771c] font-bold uppercase tracking-widest mt-1 bg-amber-50 px-2 py-0.5 rounded border border-[#D4AF37]/15">
                          {currentSlide === 0 
                            ? (lang === 'te' ? "🛋️ వధూవరుల సోఫా చిత్రం" : "🛋️ Seated Sofa Portrait")
                            : currentSlide === 1 
                            ? (lang === 'te' ? "🎂 కేక్ కట్టింగ్ వేడుక" : "🎂 Cake Cutting Ceremony")
                            : (lang === 'te' ? "💍 ఏడడుగుల మంగళబంధం" : "💍 Sacred Wedding Vows")
                          }
                        </div>
                        <span className="text-[8px] text-stone-500 mt-2 max-w-[190px] leading-relaxed font-medium">
                          {lang === 'te' 
                            ? "క్రింది 'ఫోటోలను మార్చండి' ద్వారా దంపతుల ఫోటోలను లోడ్ చేయండి! 🌸" 
                            : "Tap 'Customize & Upload' below to load the photo files directly! 📸"
                          }
                        </span>
                      </div>
                    ) : (
                      <img
                        src={photos[currentSlide]?.url || DEFAULT_PHOTOS[currentSlide].url}
                        alt="Sprudhar and Preethi Wedding Gallery Image"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => setImgLoadError(true)}
                      />
                    )}
                    
                    {/* Dark gradient wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="font-cursive text-xl text-stone-700">
                      {TRANSLATIONS[lang].groom} & {TRANSLATIONS[lang].bride}
                    </p>
                    <p className="font-sans text-[11px] text-[#aa771c] font-medium tracking-wide mt-1 px-1">
                      {lang === 'te' 
                        ? (photos[currentSlide]?.captionTe || DEFAULT_PHOTOS[currentSlide].captionTe) 
                        : (photos[currentSlide]?.captionEn || DEFAULT_PHOTOS[currentSlide].captionEn)
                      }
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots pager indicator */}
              <div className="flex justify-center gap-1.5 mt-5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    id={`slide-dot-${i}`}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      i === currentSlide ? 'bg-[#4A0404] w-4' : 'bg-stone-300'
                    }`}
                    aria-label={`Show slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Inline Photo Uploader Panel for beautiful image overrides */}
              <div className="mt-8 max-w-sm mx-auto">
                <button
                  type="button"
                  id="toggle-photo-uploader-btn"
                  onClick={() => setIsUploaderOpen(!isUploaderOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/50 rounded-full bg-[#FCF8F2] hover:bg-[#FAF1E6] text-stone-700 text-xs font-medium shadow-xs transition-all duration-300 cursor-pointer text-[#4A0404]"
                >
                  <Camera className="w-3.5 h-3.5 text-[#aa771c] animate-pulse" />
                  {lang === 'te' 
                    ? "✨ ఫోటోలను మార్చండి (Upload Uploaded Photos)"
                    : "✨ Customize & Upload Your Photos"
                  }
                </button>

                <AnimatePresence>
                  {isUploaderOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="bg-[#FCF8F2] border border-[#D4AF37]/30 rounded-2xl p-4 text-left shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-[#D4AF37]/15 pb-2">
                          <h4 className="font-display font-bold text-[#4A0404] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-[#aa771c]" /> 
                            {lang === 'te' ? "ఫొటోల ఎడిటర్" : "Wedding Gallery Customizer"}
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(lang === 'te' ? "మళ్ళీ అసలు ఫోటోలకు మార్చాలా?" : "Reset photos back to defaults?")) {
                                handlePhotosChange(null);
                              }
                            }}
                            className="text-[9px] font-bold text-[#aa771c] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <RotateCcw className="w-2.5 h-2.5" /> {lang === 'te' ? "రీసెట్" : "Reset Default"}
                          </button>
                        </div>

                        <p className="text-[10px] text-stone-600 leading-relaxed">
                          {lang === 'te' 
                            ? "మీరు అప్‌లోడ్ చేయాలనుకుంటున్న వధూవరుల జంట ఫోటోను ఎంచుకోండి. అవి వెంటనే ప్రధాన శీర్షిక స్లైడ్‌లలో అప్‌డేట్ అవుతాయి!" 
                            : "Choose the photos of the lovely couple onto your device. They will immediately show beautifully in the Polaroid slides."
                          }
                        </p>

                        <div className="space-y-3">
                          {photos.map((photo, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-stone-200/60 shadow-2xs space-y-2">
                              <div className="flex items-center gap-2.5">
                                <span className="text-[10px] font-bold bg-[#FAF1E6] text-[#aa771c] px-2 py-0.5 rounded-md">
                                  {lang === 'te' ? `స్లైడ్ ${i+1}` : `Slide ${i+1}`}
                                </span>
                                <span className="text-[10px] font-medium text-stone-500">
                                  {i === 0 
                                    ? (lang === 'te' ? "🛋️ వధూవరులు సోఫా ఫోటో" : "🛋️ Seated on Sofa")
                                    : i === 1 
                                    ? (lang === 'te' ? "🎂 కేక్ కట్టింగ్ వేడుక" : "🎂 Cake Cutting Ceremony")
                                    : (lang === 'te' ? "💍 ఏడడుగుల మంగళబంధం" : "💍 Sacred Wedding Vows")
                                  }
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-stone-50 border border-stone-200 overflow-hidden flex-shrink-0">
                                  <img 
                                    src={photo.url} 
                                    alt="Slide thumbnail" 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                <div className="flex-1">
                                  <input
                                    id={`main-file-input-${i}`}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          if (event.target?.result) {
                                            const updated = [...photos];
                                            updated[i] = {
                                              ...updated[i],
                                              url: event.target.result as string
                                            };
                                            handlePhotosChange(updated);
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`main-file-input-${i}`}
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FAF1E6] bg-[#aa771c] hover:bg-[#8f6214] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                                  >
                                    <Upload className="w-3 h-3 text-white" />
                                    {lang === 'te' ? "ఫోటో అప్‌లోడ్" : "Upload Image"}
                                  </label>
                                </div>
                              </div>

                              {/* Custom Cap editor */}
                              <div className="pt-1">
                                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">
                                  {lang === 'te' ? 'ఫోటో వివరణ శీర్షిక (Caption)' : 'Slide Caption / Message'}
                                </label>
                                <input
                                  type="text"
                                  className="w-full text-[10px] border border-stone-150 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#aa771c] bg-stone-50/50 text-stone-700"
                                  value={lang === 'te' ? photo.captionTe : photo.captionEn}
                                  onChange={(e) => {
                                    const updated = [...photos];
                                    if (lang === 'te') {
                                      updated[i] = { ...updated[i], captionTe: e.target.value };
                                    } else {
                                      updated[i] = { ...updated[i], captionEn: e.target.value };
                                    }
                                    handlePhotosChange(updated);
                                  }}
                                  placeholder={lang === 'te' ? 'మంచి మాట రాయండి...' : 'Enter sweet slide caption...'}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Beautiful Embedded Background Music Customizer */}
                        <div id="home-music-customizer-slot" className="border-t border-[#D4AF37]/20 pt-3 relative">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-display font-bold text-[#4A0404] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                              <Music className="w-3.5 h-3.5 text-[#aa771c] animate-bounce" /> 
                              {lang === 'te' ? "నేపథ్య సంగీత ఎడిటర్" : "Background Song Customizer"}
                            </h4>
                            {customAudio && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(lang === 'te' ? "మళ్ళీ అసలు పెళ్లి సంగీతాన్ని ప్లే చేయాలా?" : "Restore default wedding song?")) {
                                    handleAudioChange(null);
                                  }
                                }}
                                className="text-[9px] font-bold text-[#aa771c] hover:underline flex items-center gap-0.5 cursor-pointer"
                              >
                                <RotateCcw className="w-2.5 h-2.5" /> {lang === 'te' ? "రీసెట్" : "Reset Default"}
                              </button>
                            )}
                          </div>

                          <p className="text-[9px] text-stone-600 leading-normal mb-2">
                            {lang === 'te' 
                              ? "మీకు నచ్చిన పెళ్లి పాటల ఆడియో ఫైల్‌ను (.mp3/.wav) ఇక్కడ అప్‌లోడ్ చేసి పెళ్లి కార్డు నేపథ్య సంగీతంగా అమర్చుకోండి!" 
                              : "Upload your wedding song (.mp3/.wav) from your device! It will immediately load as the digital card melody!"
                            }
                          </p>

                          <div className="bg-white p-2.5 rounded-xl border border-stone-200/60 shadow-3xs space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                id="homepage-audio-upload-input"
                                type="file"
                                accept="audio/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      if (event.target?.result) {
                                        handleAudioChange(event.target.result as string);
                                        setToastMsg(lang === 'te' ? "🎵 మీ పెళ్లి పాట విజయవంతంగా లోడ్ అయింది!" : "🎵 Your custom wedding song is successfully loaded!");
                                        setTimeout(() => setToastMsg(''), 4000);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              <label
                                htmlFor="homepage-audio-upload-input"
                                className="inline-flex items-center justify-center gap-1 w-full text-[10px] font-bold text-[#FAF1E6] bg-[#aa771c] hover:bg-[#8f6214] px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-3xs text-center"
                              >
                                <Upload className="w-3 h-3 text-white" />
                                {lang === 'te' ? "🎵 పెళ్లి పాట ఆడియో అప్‌లోడ్" : "🎵 Upload Custom Song File"}
                              </label>
                            </div>

                            {customAudio ? (
                              <div className="text-[8px] text-emerald-700 bg-emerald-50 border border-emerald-100 p-1.5 rounded-md font-semibold flex items-center gap-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                {lang === 'te' ? "సంగీతం లోడ్ అయింది! కార్డ్ ఓపెన్ చేయగానే ప్లే అవుతుంది." : "Custom song is active! Will auto-play on card reveal."}
                              </div>
                            ) : (
                              <div className="text-[8px] text-stone-400 italic">
                                {lang === 'te' ? "ప్రస్తుతం నేపథ్య సంగీతం 'కళ్యాణ వైభోగమే' గీతం ప్లే అవుతోంది." : "Currently playing 'Kalyanam Vaibhogam' theme song."}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* 5. COUNTDOWN TIMER */}
          <section id="countdown-section" className="py-8 bg-amber-50/45 border-b border-stone-200">
            {/* Wedding Date: July 01, 2026 at 6:00 PM */}
            <CountdownTimer targetDate="2026-07-01T18:00:00" lang={lang} />
          </section>

          {/* 6. CEREMONY DETAILS ( Wednesday, July 01, 2026 ) */}
          <section id="details-section" className="py-12 bg-[#FCF8F2] border-b border-stone-200 text-center relative px-6">
            <div className="max-w-xs mx-auto space-y-4">
              <span className="font-display text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                {TRANSLATIONS[lang].invitedTitle}
              </span>

              <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md space-y-4 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-600"></div>
                
                {/* Time detail */}
                <p className="font-serif-luxury text-[#4A0404] font-bold text-xs uppercase tracking-wide">
                  {TRANSLATIONS[lang].marriageTimeText}
                </p>

                {/* Highlighted Venue block above Dining style */}
                <div className="bg-amber-50/70 border-2 border-[#D4AF37]/50 rounded-xl p-3.5 space-y-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#aa771c] flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-600 animate-bounce" />
                    {lang === 'te' ? 'కళ్యాణ వేదిక' : 'Marriage Venue'}
                  </span>
                  <h4 className="font-display text-[#4A0404] text-sm font-black tracking-wide leading-snug">
                    {lang === 'te' ? 'విశ్వక్సేన్ రిట్రీట్ & కన్వెన్షన్, హైదరాబాద్' : 'Vishwaksen Retreat & Convention, Hyderabad'}
                  </h4>
                </div>

                {/* Dining detail */}
                <p className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded inline-block font-bold">
                  {TRANSLATIONS[lang].diningTimeText}
                </p>
                
                <div className="h-px bg-stone-100 my-1"></div>
                <p className="font-sans text-xs text-stone-500 leading-relaxed font-light">
                  {TRANSLATIONS[lang].ceremonyDesc}
                </p>
              </div>
            </div>
          </section>

          {/* 7. PROGRAM TIMELINE */}
          <section id="timeline-section" className="py-12 px-6 bg-[#FCF8F2] border-b border-stone-200">
            <div className="max-w-xs mx-auto text-center mb-8">
              <h3 className="font-display text-[#4A0404] text-xs font-bold tracking-[0.2em] uppercase">
                {TRANSLATIONS[lang].programTimeline}
              </h3>
              <p className="font-serif-luxury italic text-xs text-stone-500 mt-1">
                {TRANSLATIONS[lang].flowOfCelebration}
              </p>
            </div>

            <div className="max-w-xs mx-auto relative pl-8 border-l border-dashed border-[#D4AF37]/50 space-y-8 text-left py-2">
              {/* Event 1 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline circle badge */}
                <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow">
                  <Clock className="w-3 h-3 text-[#aa771c]" />
                </span>
                
                <div>
                  <h4 className="font-display text-[#4A0404] text-sm font-semibold">
                    {lang === 'te' ? 'అతిథుల ఆహ్వానం & పరిచయాలు' : 'Guest Arrival & Refreshments'}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                    {lang === 'te' ? 'సాయంత్రం 5:30 గంటలకు' : '5:30 PM'}
                  </span>
                  <p className="font-sans text-xs text-stone-500 mt-1 leading-relaxed">
                    {lang === 'te' ? 'శుభ ముహూర్తానికి ముందే విచ్చేసి ఆసీనులు కాగలరు.' : 'Please arrive early to secure your seats and enjoy warm welcoming drinks.'}
                  </p>
                </div>
              </motion.div>

              {/* Event 2 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#4A0404] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow">
                  <Heart className="w-3 h-3 text-amber-200 fill-current" />
                </span>
                
                <div>
                  <h4 className="font-display text-[#4A0404] text-sm font-semibold">
                    {lang === 'te' ? 'కళ్యాణ మహోత్సవం (Holy Ceremony)' : 'Lagna Muhurtham & Royal Wedding'}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                    {lang === 'te' ? 'సాయంత్రం 6:00 గంటలకు' : '6:00 PM'}
                  </span>
                  <p className="font-sans text-xs text-stone-500 mt-1 leading-relaxed">
                    {lang === 'te' 
                      ? 'స్ప్రుధర్ రెడ్డి మరియు ప్రీతిల పవిత్రా బంధం సతీసమేతుడై సుముహూర్తమున జరుగును.' 
                      : 'The holy knot tie followed by the auspicious traditional Jeelakarra Bellam & sacred vows.'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Event 3 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow">
                  <Clock className="w-3 h-3 text-[#aa771c]" />
                </span>
                
                <div>
                  <h4 className="font-display text-[#4A0404] text-sm font-semibold">
                    {lang === 'te' ? 'రాయల్ వివాహ విందు' : 'Royal Marriage Banquet Dinner'}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                    {lang === 'te' ? 'రాత్రి 7:00 గంటల నుండి' : '7:00 PM onwards'}
                  </span>
                  <p className="font-sans text-xs text-stone-500 mt-1 leading-relaxed">
                    {lang === 'te' 
                      ? 'వధూవరులను ఆశీర్వదించి ప్రత్యేక సాంప్రదాయ పిండివంటల భోజన విందును స్వీకరించగలరు.' 
                      : 'Join us for a luxurious traditional royal wedding feast to celebrate the newlyweds.'
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 8. INTERACTIVE VENUE & MAP */}
          <section id="venue-section" className="py-12 bg-stone-50 border-b border-stone-200 text-center px-6">
            <div className="max-w-xs mx-auto mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                {TRANSLATIONS[lang].theVenue}
              </span>
              <h3 className="font-display text-[#4A0404] text-base font-bold tracking-wider mt-1">
                {TRANSLATIONS[lang].venueDetails}
              </h3>
              <p className="font-serif-luxury italic text-[11px] text-stone-600 mt-1">
                {lang === 'te' ? 'మాడుగులపల్లి ప్రక్కన, నల్గొండ జిల్లా' : 'Modgulapalli, Nalgonda, Telangana.'}
              </p>
            </div>

            {/* Embedded Active Google Map Frame */}
            <div className="max-w-xs mx-auto rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md aspect-video relative bg-stone-100">
              <iframe
                id="google-maps-embed-frame"
                src="https://maps.google.com/maps?q=Pamulpahad%20Village%2C%20Modgulapalli%2C%20Nalgonda&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="Pamulpahad Venue Map Location"
              ></iframe>
            </div>

            {/* Button */}
            <div className="mt-5">
              <a
                href="https://maps.app.goo.gl/SoyG1dekPu1FAoPE6?g_st=ac"
                target="_blank"
                rel="noreferrer"
                id="view-google-maps-link"
                className="inline-flex items-center gap-1.5 bg-[#4A0404] text-[#D4AF37] hover:bg-[#8B0000] transition-colors font-sans text-xs font-semibold px-4 py-2.5 rounded-full shadow cursor-pointer border border-[#D4AF37]/30 animate-pulse"
              >
                <Map className="w-3.5 h-3.5 text-amber-400" />
                {TRANSLATIONS[lang].viewOnMap}
                <ExternalLink className="w-3 h-3 opacity-75" />
              </a>
            </div>
          </section>

          {/* 9. PRE-WEDDING VOWS & CEREMONIES */}
          <section id="events-section" className="py-12 bg-[#FCF8F2] border-b border-stone-200 px-6">
            <div className="max-w-xs mx-auto text-center mb-6">
              <h3 className="font-display text-[#4A0404] text-xs font-bold tracking-[0.2em] uppercase">
                {TRANSLATIONS[lang].preEventsTitle}
              </h3>
              <p className="font-serif-luxury italic text-xs text-stone-500 mt-1">
                {TRANSLATIONS[lang].preEventsDesc}
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-3.5">
              {[
                { 
                  title: TRANSLATIONS[lang].sangeet, 
                  date: TRANSLATIONS[lang].sangeetDetails, 
                  place: TRANSLATIONS[lang].atPamulpahad 
                },
                { 
                  title: TRANSLATIONS[lang].groomCeremony, 
                  date: TRANSLATIONS[lang].groomCeremonyDetails, 
                  place: TRANSLATIONS[lang].pamulpahadVillage 
                },
                { 
                  title: TRANSLATIONS[lang].haldi, 
                  date: TRANSLATIONS[lang].haldiDetails, 
                  place: TRANSLATIONS[lang].atPamulpahad 
                },
              ].map((ev, i) => (
                <div
                  key={ev.title}
                  id={`pre-wedding-item-${i}`}
                  className="bg-white rounded-xl p-3 px-4 border border-stone-200 shadow-sm flex items-center justify-between text-left relative"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-[#b38728] to-[#aa771c] rounded-l-xl"></div>
                  
                  <div className="pr-2">
                    <h4 className="font-display text-xs font-bold text-stone-800">
                      {ev.title}
                    </h4>
                    <span className="text-[9px] text-stone-400 block max-w-[140px] truncate">
                      {ev.place}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-sans text-amber-800 font-bold">
                      {ev.date.split(' • ')[0] || ev.date}
                    </p>
                    <p className="text-[9px] text-stone-500 font-mono">
                      {ev.date.split(' • ')[1] || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 11. RSVP FORM ("Send a Message" / Village input field) */}
          <section id="rsvp-section" className="py-12 px-6 bg-[#FCF8F2] relative">
            <div className="max-w-xs mx-auto text-center mb-8">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                {TRANSLATIONS[lang].celebrateWithUs}
              </span>
              <h3 className="font-display text-[#4A0404] text-lg font-bold tracking-wider mt-1">
                {TRANSLATIONS[lang].kindlyRSVP}
              </h3>
              <p className="font-serif-luxury italic text-xs text-stone-500 mt-1">
                {TRANSLATIONS[lang].rsvpHint}
              </p>
            </div>

            <form id="rsvp-submission-form" onSubmit={handleRSVPFormSubmit} className="max-w-xs mx-auto space-y-4">
              {/* Full Name */}
              <div className="space-y-1 text-left">
                <label htmlFor="rsvp-fullname" className="text-xs font-medium text-stone-700 flex items-center gap-1.5 font-bold">
                  <User className="w-3.5 h-3.5 text-stone-400" /> {TRANSLATIONS[lang].fullNameLabel}
                </label>
                <input
                  id="rsvp-fullname"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={TRANSLATIONS[lang].enterName}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3.5 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-[#D4AF37]"
                />
              </div>

              {/* Village Name (Replaces Email as requested!) */}
              <div className="space-y-1 text-left">
                <label htmlFor="rsvp-village" className="text-xs font-medium text-stone-700 flex items-center gap-1.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" /> {TRANSLATIONS[lang].villageLabel}
                </label>
                <input
                  id="rsvp-village"
                  type="text"
                  required
                  value={formVillage}
                  onChange={(e) => setFormVillage(e.target.value)}
                  placeholder={TRANSLATIONS[lang].enterVillage}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3.5 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-[#D4AF37]"
                />
              </div>

              {/* Attending Selection */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-stone-700 block font-bold">
                  {TRANSLATIONS[lang].willYouAttend}
                </label>
                
                <div id="rsvp-attendance-toggles" className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    id="rsvp-attending-yes-btn"
                    type="button"
                    onClick={() => setFormAttending('yes')}
                    className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      formAttending === 'yes'
                        ? 'bg-[#4A0404] text-amber-200 border-[#D4AF37]'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {TRANSLATIONS[lang].yesAttend}
                  </button>

                  <button
                    id="rsvp-attending-no-btn"
                    type="button"
                    onClick={() => setFormAttending('no')}
                    className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      formAttending === 'no'
                        ? 'bg-stone-700 text-stone-100 border-stone-700'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {TRANSLATIONS[lang].noAttend}
                  </button>
                </div>
              </div>

              {/* Optional Custom Message input */}
              <div className="space-y-1 text-left">
                <label htmlFor="rsvp-message" className="text-xs font-medium text-stone-700 block font-bold">
                  {lang === 'te' ? 'శుభాకాంక్షల సందేశం (ఐచ్ఛికం)' : 'Congratulatory Note (Optional)'}
                </label>
                <textarea
                  id="rsvp-message"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={lang === 'te' ? 'మీ శుభాకాంక్షలను ఇక్కడ తెలియజేయండి' : 'Type special prayers or wishes...'}
                  rows={2}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3.5 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-[#D4AF37]"
                />
              </div>

              {/* Submit Button */}
              <button
                id="rsvp-submit-btn"
                type="submit"
                className="w-full bg-[#4A0404] text-[#D4AF37] hover:bg-[#8B0000] transition-colors py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow cursor-pointer border border-[#D4AF37]/30"
              >
                {TRANSLATIONS[lang].submitRSVP}
              </button>
            </form>

            {/* Seamless Interactive Forwarding Dialog & Overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  id="rsvp-success-overlay"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-[#FCF8F2] flex flex-col justify-start p-5 text-center overflow-y-auto z-25 min-h-full"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 mt-4 shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                  
                  <span className="font-display font-medium text-[#4A0404] text-md block leading-tight">
                    {TRANSLATIONS[lang].rsvpSuccess}
                  </span>
                  
                  <p className="font-sans text-[11px] text-stone-600 mt-1 max-w-[280px] mx-auto leading-relaxed">
                    {TRANSLATIONS[lang].rsvpSuccessDesc}
                  </p>

                  <div className="bg-stone-50 border border-[#D4AF37]/30 rounded-xl p-4 my-3 text-left max-w-xs mx-auto shrink-0 shadow-sm relative">
                    <div className="absolute top-1 right-1">
                      <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono">
                        9398246486
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-amber-900 border-b border-dashed border-stone-200 pb-1 mb-2">
                      {TRANSLATIONS[lang].forwardTitle}
                    </p>
                    <p className="text-[10.5px] font-mono leading-relaxed text-stone-700 whitespace-pre-wrap select-all">
                      {lang === 'te' 
                        ? `శుభోదయం! స్ప్రుధర్ రెడ్డి మరియు ప్రీతిల కళ్యాణ నిమిత్తం నా RSVP సమాచారం:\n• నా పేరు: ${formName || 'అతిథి'}\n• నా ఊరి పేరు: ${formVillage || 'గ్రామం'}\n• నేను వస్తున్నానా: ${formAttending === 'yes' ? 'తప్పకుండా వస్తున్నాము 👍' : 'రానందుకు క్షమించండి 😔'}${formMessage ? '\n• నా సందేశం: ' + formMessage : ''}`
                        : `Hello! Here is my RSVP response for Sprudhar Reddy & Preethi's Wedding:\n• Name: ${formName || 'Guest'}\n• Village: ${formVillage || 'Village'}\n• Attending: ${formAttending === 'yes' ? "Yes, I'll be there! 👍" : "Sorry, I can't attend 😔"}${formMessage ? '\n• Wish: ' + formMessage : ''}`
                      }
                    </p>
                  </div>

                  {/* Forward Buttons on Phone mockup */}
                  <div className="space-y-2 max-w-xs mx-auto w-full shrink-0">
                    <button
                      onClick={() => {
                        const txt = lang === 'te' 
                          ? `శుభోదయం! స్ప్రుధర్ రెడ్డి మరియు ప్రీతిల కళ్యాణ నిమిత్తం నా RSVP సమాచారం:\n• నా పేరు: ${formName || 'అతిథి'}\n• నా ఊరి పేరు: ${formVillage || 'గ్రామం'}\n• నేను వస్తున్నానా: ${formAttending === 'yes' ? 'తప్పకుండా వస్తున్నాము 👍' : 'రానందుకు క్షమించండి 😔'}${formMessage ? '\n• నా సందేశం: ' + formMessage : ''}`
                          : `Hello! Here is my RSVP response for Sprudhar Reddy & Preethi's Wedding:\n• Name: ${formName || 'Guest'}\n• Village: ${formVillage || 'Village'}\n• Attending: ${formAttending === 'yes' ? "Yes, I'll be there! 👍" : "Sorry, I can't attend 😔"}${formMessage ? '\n• Wish: ' + formMessage : ''}`;
                        window.open(`https://api.whatsapp.com/send?phone=9398246486&text=${encodeURIComponent(txt)}`, '_blank');
                      }}
                      className="w-full bg-[#128C7E] text-white hover:bg-[#075E54] font-sans font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {TRANSLATIONS[lang].sendViaWhatsApp}
                    </button>

                    <button
                      onClick={() => {
                        const txt = lang === 'te' 
                          ? `శుభోదయం! స్ప్రుధర్ రెడ్డి మరియు ప్రీతిల కళ్యాణ నిమిత్తం నా RSVP సమాచారం:\n• నా పేరు: ${formName || 'అతిథి'}\n• నా ఊరి పేరు: ${formVillage || 'గ్రామం'}\n• నేను వస్తున్నానా: ${formAttending === 'yes' ? 'తప్పకుండా వస్తున్నాము 👍' : 'రానందుకు క్షమించండి 😔'}${formMessage ? '\n• నా సందేశం: ' + formMessage : ''}`
                          : `Hello! Here is my RSVP response for Sprudhar Reddy & Preethi's Wedding:\n• Name: ${formName || 'Guest'}\n• Village: ${formVillage || 'Village'}\n• Attending: ${formAttending === 'yes' ? "Yes, I'll be there! 👍" : "Sorry, I can't attend 😔"}${formMessage ? '\n• Wish: ' + formMessage : ''}`;
                        window.open(`sms:9398246486?body=${encodeURIComponent(txt)}`, '_blank');
                      }}
                      className="w-full bg-[#3b2d18] text-amber-200 hover:bg-stone-800 font-sans font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all border border-amber-300/30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {TRANSLATIONS[lang].sendViaSMS}
                    </button>

                    <button
                      onClick={() => {
                        const txt = lang === 'te' 
                          ? `శుభోదయం! స్ప్రుధర్ రెడ్డి మరియు ప్రీతిల కళ్యాణ నిమిత్తం నా RSVP సమాచారం:\n• నా పేరు: ${formName || 'అతిథి'}\n• నా ఊరి పేరు: ${formVillage || 'గ్రామం'}\n• నేను వస్తున్నానా: ${formAttending === 'yes' ? 'తప్పకుండా వస్తున్నాము 👍' : 'రానందుకు క్షమించండి 😔'}${formMessage ? '\n• నా సందేశం: ' + formMessage : ''}`
                          : `Hello! Here is my RSVP response for Sprudhar Reddy & Preethi's Wedding:\n• Name: ${formName || 'Guest'}\n• Village: ${formVillage || 'Village'}\n• Attending: ${formAttending === 'yes' ? "Yes, I'll be there! 👍" : "Sorry, I can't attend 😔"}${formMessage ? '\n• Wish: ' + formMessage : ''}`;
                        navigator.clipboard.writeText(txt);
                        triggerToast(TRANSLATIONS[lang].copied);
                      }}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans text-[11px] font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {TRANSLATIONS[lang].orCopy}
                    </button>
                  </div>

                  <button
                    id="submit-another-rsvp-btn"
                    onClick={() => {
                      setFormName('');
                      setFormVillage('');
                      setFormMessage('');
                      setIsSubmitted(false);
                    }}
                    className="text-xs text-amber-900 bg-amber-100/60 font-bold mt-5 px-5 py-2.5 rounded-full cursor-pointer hover:bg-amber-200/80 mx-auto block shrink-0"
                  >
                    {TRANSLATIONS[lang].submitAnother}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* 12. ELEGANT FOOTER GREETING & MONOGRAM SCREEN */}
          <section id="footer-section" className="py-12 px-6 bg-[#3d0303] text-stone-100 text-center relative overflow-hidden shrink-0 mt-auto">
            <div className="absolute inset-0 bg-[#180000]/65"></div>
            
            <div className="max-w-xs mx-auto space-y-6 relative z-10">
              <span className="font-cursive text-4xl text-amber-200 block">
                {TRANSLATIONS[lang].footerMessage}
              </span>

              <div className="space-y-1">
                <p className="font-display text-sm tracking-widest text-[#D4AF37]">
                  {TRANSLATIONS[lang].groom} & {TRANSLATIONS[lang].bride}
                </p>
              </div>
            </div>
          </section>

          {/* 13. HOST ANALYTICS PERSISTENCE VIEW (At back-end floor) */}
          <HostDashboard 
            onRSVPUpdateTrigger={rsvpUpdateCounter} 
            photos={photos} 
            onPhotosChange={handlePhotosChange} 
            audioUrl={customAudio}
            onAudioChange={handleAudioChange}
          />

        </div>
      </div>

      {/* Floating Background Soundtrack Music Widget */}
      <MusicPlayer autoPlayTrigger={isGateOpened} audioUrl={customAudio} />

      {/* Toast Feedback Alerts Notification Block */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            id="toast-notification-banner"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 border border-[#D4AF37]/50 text-amber-100 text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 max-w-sm"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 animate-bounce" />
            <span className="font-medium">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
