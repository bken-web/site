/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Cpu, 
  Globe, 
  Layers, 
  LineChart, 
  Menu, 
  MessageSquare, 
  Monitor, 
  Plus, 
  ShieldCheck, 
  Smartphone, 
  Zap,
  X,
  Linkedin,
  Twitter,
  Instagram,
  MoveRight,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Global UI Elements ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 noise-overlay pointer-events-none z-[999]" />
);

const GridBackground = () => (
  <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
);

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-white/40 flex items-center gap-3", className)}>
    <div className="w-8 h-px bg-current" />
    {children}
  </span>
);

const SectionHeading = ({ title, subtitle, label }: { title: string, subtitle?: string, label?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-16 md:mb-32">
      {label && <Label className="mb-8">{label}</Label>}
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance leading-[0.95]"
      >
        {title} <br />
        {subtitle && <span className="opacity-30 italic font-serif font-normal">{subtitle}</span>}
      </motion.h2>
    </div>
  );
};

// --- Components ---

const Logo = ({ className = "h-8", size = "md", showText = true }: { className?: string, size?: "sm" | "md" | "hero", showText?: boolean }) => {
  const logoSize = size === "hero" ? "w-32 h-32" : size === "md" ? "w-10 h-10" : "w-8 h-8";
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative group transition-transform duration-500 hover:scale-105 flex items-center justify-center", logoSize)}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#1e3a5f" className="group-hover:fill-[#336699] transition-colors" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="1" className="opacity-40 group-hover:opacity-100 transition-opacity" />
          <text x="50" y="58" textAnchor="middle" fill="white" style={{ fontSize: size === 'hero' ? '28px' : '24px', fontWeight: '400', fontFamily: 'Inter, sans-serif' }}>b.</text>
        </svg>
      </div>
      {showText && size !== "hero" && (
        <span className={cn(
          "font-display font-medium tracking-tight text-white",
          size === "md" ? "text-xl" : "text-lg"
        )}>
          bken <span className="opacity-40 font-light">consulting</span>
        </span>
      )}
    </div>
  );
};

const MagneticButton = ({ children, className, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }) => {
  const variants = {
    primary: 'bg-white text-black hover:bg-white/90',
    outline: 'border border-white/20 text-white hover:bg-white/5',
    ghost: 'text-white/60 hover:text-white'
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'px-8 py-4 rounded-full font-display font-medium text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6 px-6 md:px-12 flex items-center justify-between",
      scrolled ? "bg-[#1e3a5f]/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent"
    )}>
      <Logo size="sm" />
      
      <div className="hidden md:flex items-center gap-12">
        {['Expertise', 'Process', 'Manifesto', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </div>

      <MagneticButton 
        variant="outline" 
        className="hidden md:flex py-2 px-6"
        onClick={() => window.location.href = '#contact'}
      >
        Start Audit
      </MagneticButton>

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
        {menuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0B1220]/95 backdrop-blur-2xl z-[110] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <Logo size="sm" />
              <button onClick={() => setMenuOpen(false)} className="text-white p-2">
                <X />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {['Expertise', 'Process', 'Manifesto', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMenuOpen(false)}
                  className="text-5xl font-display font-bold hover:italic hover:pl-8 transition-all duration-500"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="pt-12 border-t border-white/10">
              <Label className="mb-4">Social</Label>
              <div className="flex gap-8">
                <Linkedin />
                <Twitter />
                <Instagram />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CinematicStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Beat 1: b.ken reveal (0 - 0.2)
  const bkenOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const bkenScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

  // Beat 2: Awareness Question (0.35 - 0.7)
  const questionOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.65, 0.75], [0, 1, 1, 0]);
  const questionScale = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0.95, 1, 1, 1.05]);
  const questionY = useTransform(scrollYProgress, [0.35, 0.45], [40, 0]);

  // Beat 3: The Solution / b.ken mission (0.75 - 1.0)
  const missionOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const missionScale = useTransform(scrollYProgress, [0.75, 0.85], [0.9, 1]);

  return (
    <section ref={containerRef} className="h-[500vh] bg-transparent relative snap-start">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background Gradients for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(58,123,213,0.15),transparent_70%)]" />
        <div className="absolute inset-0 opacity-20">
           <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400" 
            alt="Architecture" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-[#336699]/80 mix-blend-multiply" />
        </div>
        
        {/* BEAT 1: b.ken */}
        <motion.div
          style={{ 
            opacity: bkenOpacity, 
            scale: bkenScale, 
            filter: useTransform(scrollYProgress, [0.05, 0.2], ["blur(0px)", "blur(20px)"]),
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Logo size="hero" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] uppercase tracking-[15px] text-white font-bold block ml-[15px] opacity-60"
          >
            Modernizing Finance
          </motion.div>
        </motion.div>

        {/* BEAT 2: Awareness Question */}
        <motion.div
          style={{ opacity: questionOpacity, scale: questionScale, y: questionY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 text-center"
        >
          <Label className="mb-8 text-white">The Member Question</Label>
          <h2 className="text-4xl md:text-7xl text-white font-display font-medium leading-tight tracking-tighter text-balance">
            How are you engaging <br /> <span className="opacity-40 font-serif italic text-white">the next generation?</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-10 leading-relaxed font-sans">
            In a digital-first economy, members expect more than a place to store money. They expect education, simulation, and high-performance digital tools.
          </p>
        </motion.div>

        {/* BEAT 3: Solution Transition */}
        <motion.div
          style={{ opacity: missionOpacity, scale: missionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center z-40 px-6 text-center"
        >
          <Label className="mb-8 text-white">Our Mission</Label>
          <h2 className="text-4xl md:text-7xl text-white font-display font-medium leading-tight tracking-tighter text-balance">
            We architect <br /> <span className="opacity-40 font-serif italic text-white flex justify-center items-center gap-4">financial authority <ArrowRight className="w-12 h-12 md:w-20 md:h-20 stroke-1" /></span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-10 leading-relaxed font-sans">
            Bridging the gap between community trust and digital innovation through bespoke edtech and gamified literacy.
          </p>
        </motion.div>

        {/* Scroll Progress Indicator for Intro */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [1, 1, 1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4"
        >
          <div className="w-px h-12 bg-gradient-to-b from-blue-accent/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

const CapabilityItem: React.FC<{ title: string, description: string, index: number }> = ({ title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="p-10 bg-white/5 border border-white/5 flex flex-col gap-6 group hover:border-white/20 transition-colors"
    >
      <div className="text-white/40 font-mono text-xs">{String(index + 1).padStart(2, '0')}</div>
      <h3 className="text-2xl font-display font-bold text-white">{title}</h3>
      <p className="text-white/60 font-sans leading-relaxed text-sm">{description}</p>
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-4 h-4 text-white" />
      </div>
    </motion.div>
  );
};

const Capabilities = () => {
  const capabilities = [
    { title: 'Website Redesign Strategy', description: 'Strategic review and redesign direction for institutions with outdated or cluttered digital footprints.' },
    { title: 'Financial Education Microsites', description: 'Specialized digital experiences promoting financial literacy, student programs, and community learning.' },
    { title: 'Landing Pages & Campaigns', description: 'High-converting pages for checking growth, youth banking, and community outreach initiatives.' },
    { title: 'Website Clarity Audit', description: 'A focused, practical review identifying first-impression issues, mobile friction, and conversion gaps.' },
    { title: 'Member Engagement Engines', description: 'Interactive tools designed to turn passive visitors into active community members.' },
    { title: 'Technical Modernization', description: 'Upgrading core digital infrastructure to maintain security, speed, and institutional authority.' },
  ];

  return (
    <section id="expertise" className="py-32 md:py-64 bg-transparent relative z-10 snap-start">
      <div className="container mx-auto px-6">
        <SectionHeading 
          label="Services"
          title="Digital redesign for"
          subtitle="Community Institutions."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {capabilities.map((cap, i) => (
            <CapabilityItem key={i} title={cap.title} description={cap.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, category, image, index, link }: { title: string, category: string, image: string, index: number, link?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[16/10] overflow-hidden bg-white/5 rounded-3xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
      <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
        <span className="text-white/60 font-mono text-[9px] uppercase tracking-[0.3em] mb-4">{category}</span>
        <h3 className="text-4xl md:text-5xl font-display font-medium group-hover:italic transition-all duration-500">{title}</h3>
        {link && (
          <motion.a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            Visit Live Site <ArrowUpRight className="w-3 h-3" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const SelectedWorks = () => {
  return (
    <section className="py-32 md:py-64 container mx-auto px-6 relative z-10 snap-start">
      <SectionHeading 
        label="Selected Works"
        title="Institutional"
        subtitle="Innovation."
      />
      <div className="grid md:grid-cols-2 gap-12">
        <ProjectCard 
          index={0}
          category="EdTech Platform"
          title="Pelican Financial Skills"
          image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
          link="https://pelcu-pfin.netlify.app/"
        />
        <ProjectCard 
          index={1}
          category="Simulation Engine"
          title="CU Budgeting Sim"
          image="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1200"
          link="https://sims.stocktrak.com/ccu/"
        />
        <ProjectCard 
          index={2}
          category="Member Portal"
          title="Vanguard Credit Union"
          image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
        />
        <ProjectCard 
          index={3}
          category="Financial Literacy"
          title="StockTrak Integration"
          image="https://images.unsplash.com/photo-1611974717483-9b9aa9369f4c?auto=format&fit=crop&q=80&w=1200"
        />
      </div>
    </section>
  );
};

const StatItem = ({ label, value, suffix }: { label: string, value: string, suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const [glitchText, setGlitchText] = useState("");
  const [isGlitch, setIsGlitch] = useState(false);
  const numericValue = parseFloat(value);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (isInView && isNumeric) {
      const startTime = performance.now();
      const duration = 2500;
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4); // Quartic ease out
        setDisplayValue(Math.floor(easeOut * numericValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, numericValue, isNumeric]);

  useEffect(() => {
    if (!isInView) return;

    const chars = "ABCDEF0123456789!@#$%^&*";
    
    const triggerGlitch = () => {
      setIsGlitch(true);
      
      const targetLen = value.length;
      let randomStr = "";
      for (let i = 0; i < targetLen; i++) {
        randomStr += chars[Math.floor(Math.random() * chars.length)];
      }
      setGlitchText(randomStr);

      setTimeout(() => {
        setIsGlitch(false);
      }, 70 + Math.random() * 150);

      const nextDelay = 3000 + Math.random() * 7000;
      setTimeout(triggerGlitch, nextDelay);
    };

    const initialTimeout = setTimeout(triggerGlitch, 4000 + Math.random() * 4000);
    return () => clearTimeout(initialTimeout);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-8">
      <div className="text-6xl md:text-8xl font-display font-bold mb-4 flex items-baseline">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={cn("text-white transition-all duration-75 font-mono tabular-nums tracking-tighter", isGlitch ? "opacity-70" : "opacity-100")}
        >
          {isGlitch ? glitchText : (isNumeric ? displayValue : value)}
        </motion.span>
        <span className="text-white/40">{suffix}</span>
      </div>
      <Label className="text-white/30 whitespace-nowrap">{label}</Label>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-32 md:py-64 relative z-10 border-y border-white/5 bg-gradient-to-b from-transparent via-blue-accent/5 to-transparent overflow-hidden snap-start">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value="25" suffix="+" label="Credit Unions Modernized" />
          <StatItem value="85" suffix="%" label="Average Member Engagement" />
          <StatItem value="1" suffix="M+" label="Students Educated" />
          <StatItem value="100" suffix="%" label="Platform Uptime" />
        </div>
      </div>
    </section>
  );
};

const PillarItem: React.FC<{ title: string, description: string, icon: any, index: number }> = ({ title, description, icon: Icon, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="p-12 border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-white/20 transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-[#336699]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-[#336699]" />
      </div>
      <h3 className="text-2xl font-display font-medium mb-4">{title}</h3>
      <p className="text-white/40 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
};

const StrategicBlueprint = () => {
  const pillars = [
    { icon: Zap, title: "Velocity", description: "Rapid deployment cycles that keep your institution ahead of the market curve." },
    { icon: ShieldCheck, title: "Authority", description: "Building digital trust through cinematic design and robust security standards." },
    { icon: MessageSquare, title: "Retention", description: "Interactive edtech tools that keep members engaged and loyal for the long term." },
    { icon: LineChart, title: "Impact", description: "Quantifiable growth backed by data-driven member acquisition engines." }
  ];

  return (
    <section className="py-32 md:py-64 bg-[#0B1220] relative z-10 snap-start">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div className="md:w-1/2">
            <SectionHeading 
              label="Strategic Blueprint"
              title="The Pillars of"
              subtitle="Digital Maturity."
            />
          </div>
          <p className="md:w-1/3 text-white/40 text-lg mb-12 font-sans leading-relaxed">
            We don't just build websites; we architect comprehensive ecosystems designed for institutional dominance and member empowerment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {pillars.map((pillar, i) => (
            <PillarItem key={i} title={pillar.title} description={pillar.description} icon={pillar.icon} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const InstitutionalHits = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const projects = [
    {
      title: "Pelican Financial",
      tags: ["EdTech", "Simulation", "Literacy"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
      video: "https://mad-creative-agency.com/wp-content/uploads/2023/01/altar-1080p.mp4"
    },
    {
      title: "CU Budgeting Sim",
      tags: ["Gamification", "UX", "Product"],
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1200",
      video: "https://mad-creative-agency.com/wp-content/uploads/2025/08/farm_rio__brooklyn_opening_2024-1080p.mp4"
    },
    {
      title: "Vanguard Portal",
      tags: ["Security", "Architecture", "Cloud"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
      video: "https://mad-creative-agency.com/wp-content/uploads/2025/08/robyn_ai-1080p.mp4"
    },
    {
      title: "StockTrak Engine",
      tags: ["API", "Data", "Modernization"],
      image: "https://images.unsplash.com/photo-1611974717483-9b9aa9369f4c?auto=format&fit=crop&q=80&w=1200",
      video: "https://mad-creative-agency.com/wp-content/uploads/2025/08/bellhop-1080p.mp4"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="h-[400vh] relative z-10 cursor-none snap-start"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Custom Cursor Overlay */}
        <motion.div
          className="fixed top-0 left-0 w-32 h-32 rounded-full bg-white text-black z-[200] flex flex-col items-center justify-center pointer-events-none mix-blend-difference"
          style={{
            x: cursorPos.x - 64,
            y: cursorPos.y - 64,
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.5
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5, opacity: { duration: 0.2 } }}
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase mb-1">Drag</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 86 14" width="40" height="8">
            <path fill="currentColor" d="M72.294 4.398c.006-.764 1.032-1.168 1.988-.782l5.917 2.39c1.105.446 1.28 1.58.304 1.964l-5.957 2.341c-.976.384-2.3-.3-2.293-1.183l.04-4.73Z" />
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M1.887 8.31C7.999 4.303 15.024.3 24.458 5.492c3.136 1.725 5.843 3.33 9.761 4.344 3.046.79 8.137-2.49 10.235-3.712 3.406-1.985 5.107-3.042 11.388-3.042 6.28 0 8.553 4.368 17.646 4.368" />
          </svg>
        </motion.div>

        <div className="container mx-auto px-6 mb-12">
          <SectionHeading 
            label="The Portfolio"
            title="Institutional"
            subtitle="Innovation."
          />
        </div>

        <div className="relative">
          <motion.div 
            style={{ x: xOffset }}
            className="flex gap-12 px-[10vw]"
          >
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                className="flex-shrink-0 w-[80vw] md:w-[55vw] group relative"
              >
                <div className="aspect-[16/10] overflow-hidden bg-white/5 relative rounded-2xl">
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" 
                    alt={project.title}
                  />
                  
                  <video 
                    src={project.video} 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20">
                    <div className="flex gap-4 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-display font-medium text-white group-hover:italic transition-all duration-700 ease-[0.16,1,0.3,1]">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 w-[40vw] flex flex-col items-center justify-center border border-white/5 bg-white/5 rounded-2xl backdrop-blur-sm">
               <div className="p-12 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 mb-8">End of line</p>
                  <h3 className="text-4xl font-display mb-12">See how we transform <br /><span className="italic font-serif opacity-40">identities.</span></h3>
                  <MagneticButton className="px-12 bg-white text-black hover:bg-white/90">View Archive</MagneticButton>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const modernX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={containerRef} className="relative h-[150vh] flex flex-col items-center justify-center pt-32 overflow-hidden snap-start">
      {/* Parallax Typography Background */}
      <motion.div 
        style={{ x: modernX }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0 whitespace-nowrap"
      >
        <span className="text-[40vw] font-black font-display leading-none">MODERN</span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6">
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-[#336699]" />
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] font-mono">Strategy-Led Website Design</span>
          </motion.div>
        </div>
        
        <h1 className="text-display mb-12 text-center text-white">
          Modern websites for <br />
          <span className="opacity-40 italic font-serif">banks and credit unions.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12 text-center">
          <p className="text-white/60 text-lg md:text-2xl max-w-2xl leading-relaxed font-sans">
            bken consulting helps community-focused financial institutions upgrade outdated websites into clean, trustworthy digital experiences built for clarity and growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
          <MagneticButton className="px-10 py-5 bg-white text-black hover:bg-white/90">
            Start a Website Audit
          </MagneticButton>
          <button className="px-10 py-5 border border-white/20 text-white hover:bg-white/5 transition-all rounded-full font-mono uppercase tracking-widest text-[10px]">
            See Sample Work
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const ExpertiseCard = ({ title, description, icon: Icon, tags }: { title: string, description: string, icon: any, tags: string[] }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-card p-8 md:p-12 flex flex-col h-full group"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors duration-500">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-3xl font-display font-medium mb-6">{title}</h3>
      <p className="text-white/40 leading-relaxed mb-8 font-sans flex-grow">{description}</p>
      <div className="flex flex-wrap gap-3 mt-auto">
        {tags.map(tag => (
          <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Expertise = () => {
  return (
    <section id="expertise" className="py-32 md:py-64 container mx-auto px-6 relative z-10 snap-start">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <SectionHeading 
            label="Expertise"
            title="It's not just design."
            subtitle="It is strategy."
          />
          <p className="text-white/60 text-xl mb-12 leading-relaxed font-sans">
            Most web designers can make a site look good. We understand the financial space—from marketing needs to community trust-building and relationship positioning.
          </p>
          <div className="space-y-8">
            {[
              "Financial education positioning",
              "Community trust and relationship building",
              "Clear paths for member/customer action",
              "Simplified navigation for complex services"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#336699]/20 flex items-center justify-center shrink-0 group-hover:bg-[#336699] transition-colors duration-500">
                  <ShieldCheck className="w-5 h-5 text-[#336699] group-hover:text-white transition-colors" />
                </div>
                <span className="font-display font-medium text-xl text-white/80 group-hover:text-white transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#336699]/10 opacity-20 blur-3xl rounded-full" />
          <div className="glass-card p-8 md:p-12 aspect-[4/3] flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center gap-3 opacity-20">
              <div className="w-3 h-3 rounded-full bg-red-800" />
              <div className="w-3 h-3 rounded-full bg-yellow-800" />
              <div className="w-3 h-3 rounded-full bg-green-800" />
              <div className="ml-4 h-1.5 w-32 bg-white/20 rounded-full" />
            </div>
            
            <div className="flex-grow flex flex-col gap-6 mt-12">
              <div className="h-1/2 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
              <div className="grid grid-cols-3 gap-6 h-1/4">
                <div className="bg-white/5 rounded-xl border border-white/10" />
                <div className="bg-[#336699]/40 rounded-xl border border-[#336699]/20" />
                <div className="bg-white/5 rounded-xl border border-white/10 opacity-30" />
              </div>
            </div>

            <div className="absolute top-12 right-12 opacity-40">
              <Logo size="sm" showText={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ApproachStep = ({ number, title, description }: { number: string, title: string, description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row gap-8 md:gap-24 py-16 border-t border-white/10 group cursor-default"
    >
      <div className="text-white/60 font-serif italic text-4xl group-hover:pl-4 transition-all duration-500">{number}</div>
      <div className="md:w-1/3">
        <h3 className="text-3xl font-display font-bold group-hover:text-white transition-colors duration-500">{title}</h3>
      </div>
      <div className="md:w-1/2">
        <p className="text-white/40 text-lg leading-relaxed font-sans">{description}</p>
      </div>
    </motion.div>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-32 md:py-64 bg-white/5 backdrop-blur-sm relative z-10 border-y border-white/5 snap-start">
      <div className="container mx-auto px-6">
        <SectionHeading 
          label="The Process"
          title="The architecture of"
          subtitle="Transformation."
        />

        <div className="flex flex-col">
          <ApproachStep 
            number="01"
            title="Institutional Extraction"
            description="We dive deep into your member data, institutional culture, and strategic goals to extract the core elements that define your community impact."
          />
          <ApproachStep 
            number="02"
            title="Educational Architecture"
            description="Developing a Blueprint for your digital ecosystem that prioritizes gamified literacy, accessibility, and high-conversion member journeys."
          />
          <ApproachStep 
            number="03"
            title="Simulation Foundry"
            description="Our engineers and designers build realistic financial environments and edtech tools with banking-grade precision and cinematic flair."
          />
          <ApproachStep 
            number="04"
            title="Member Deployment"
            description="Launching your new digital legacy, backed by robust systems that turn member education into sustained institutional growth."
          />
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section id="manifesto" className="py-32 md:py-64 bg-soft-white text-[#1e3a5f] relative z-20 snap-start">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col gap-12">
          <Label className="text-[#336699]/40">The Manifesto</Label>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[#1e3a5f] text-4xl md:text-7xl font-display font-medium leading-[1.1] text-balance"
          >
            Digital trust is earned through <span className="italic font-serif text-[#336699]">education and innovation</span>—the new architecture of membership.
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <p className="text-[#1e3a5f]/80 text-xl md:text-2xl font-sans leading-relaxed">
              Visibility is basic. Capability is premium. In the financial sector, the difference between a tool and a partner is the quality of the digital experience you provide.
            </p>
            <div className="flex flex-col gap-8">
               <p className="text-[#1e3a5f]/70 text-xl font-sans leading-relaxed">
                We believe in the power of cinematic storytelling paired with technical excellence. Every interaction should feel intentional, every page a testament to your standard of work.
              </p>
              <div className="w-16 h-px bg-[#1e3a5f]/20" />
              <div className="font-display font-bold uppercase tracking-widest text-xs">BKEN Consulting Group</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrandIdentity = () => {
  const colors = [
    { name: "Sapphire Blue", hex: "#336699", role: "Primary / Institutional Authority", class: "bg-[#336699]" },
    { name: "Charcoal", hex: "#333333", role: "Typography / Structure", class: "bg-[#333333]" },
    { name: "Slate Gray", hex: "#545A60", role: "Secondary / Technical Detail", class: "bg-[#545A60]" },
    { name: "Light Gray", hex: "#C1C6C9", role: "Borders / Subtle UI", class: "bg-[#C1C6C9]" },
    { name: "Sky Blue", hex: "#87CEEB", role: "Accent / Energy", class: "bg-[#87CEEB]" },
  ];

  return (
    <section id="brand" className="py-32 md:py-64 bg-white text-[#333333] relative z-20 snap-start">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
          <div className="lg:w-1/3">
            <Label className="text-[#336699]/40 mb-8">Brand Kit</Label>
            <h2 className="text-[#333333] mb-12 text-5xl md:text-7xl">Institutional Standards.</h2>
            <p className="text-[#545A60] text-xl leading-relaxed mb-12 font-sans">
              Our identity is built on a foundation of clarity, trust, and technical precision. Every element is architected to reflect the standards our partners expect.
            </p>
            <div className="pt-12 border-t border-zinc-200">
              <Logo className="mb-8" />
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#545A60]/60">
                  <span>Typography</span>
                  <span>Poppins / Lora</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#545A60]/60">
                  <span>Version</span>
                  <span>1.0.4 (Edge)</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#545A60]/60">
                  <span>Master Revision</span>
                  <span>May 16, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 overflow-hidden rounded-3xl shadow-xl">
            {colors.map((color, i) => (
              <div key={i} className="bg-white p-10 flex flex-col gap-12 group hover:bg-zinc-50 transition-all duration-500">
                <div className={cn("w-20 h-20 rounded-2xl shadow-inner transition-transform group-hover:scale-110", color.class)} />
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">{color.name}</h3>
                  <div className="text-[10px] font-mono text-[#336699] uppercase tracking-[0.2em] mb-4">{color.hex}</div>
                  <p className="text-[#545A60]/60 text-sm leading-relaxed">{color.role}</p>
                </div>
              </div>
            ))}
            <div className="bg-[#336699] p-10 flex flex-col justify-center items-center text-center text-white">
              <Logo size="hero" className="opacity-10 absolute pointer-events-none" />
              <h3 className="text-2xl font-display font-medium relative z-10">Bespoke <br /> System</h3>
              <p className="text-white/60 text-xs mt-4 relative z-10">Built for bken consulting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0B1220] pt-32 pb-12 relative z-10 px-6 md:px-12 border-t border-white/5 snap-start">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-32">
          <div className="md:w-1/2">
            <h2 className="text-5xl md:text-8xl mb-12">Let's build <br /><span className="opacity-30 italic font-serif">the future.</span></h2>
            <div className="flex gap-4">
              <MagneticButton className="px-12 rounded-2xl group">
                Begin Project <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </MagneticButton>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 md:w-1/3">
            <div className="flex flex-col gap-6">
              <Label className="mb-2">Contact</Label>
              <a href="mailto:info@bkenconsulting.com" className="text-xl md:text-2xl hover:text-blue-accent transition-colors">info@bkenconsulting.com</a>
              <span className="text-white/40">Remote / Global</span>
            </div>
            <div className="flex flex-col gap-6">
              <Label className="mb-2">Connect</Label>
              <a href="#" className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                <span className="text-[10px] uppercase tracking-widest">LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="#" className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                <span className="text-[10px] uppercase tracking-widest">Twitter</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="#" className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                <span className="text-[10px] uppercase tracking-widest">Instagram</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <Logo size="sm" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">© 2026 bken consulting | Last Updated: May 16, 2026</span>
          </div>
          <div className="flex gap-12">
            <a href="#brand" className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Brand Kit</a>
            <a href="#" className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ClarityAudit = () => {
  return (
    <section className="py-32 md:py-64 bg-[#336699] relative overflow-hidden snap-start">
      <div className="absolute -bottom-20 -left-20 text-white opacity-10 select-none pointer-events-none">
        <BarChart3 size={600} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-black/20 backdrop-blur-3xl border border-white/10 p-12 md:p-32 rounded-[3.5rem] shadow-2xl">
            <Label className="text-white/60 mb-12 justify-center">Strategic Offer</Label>
            <h2 className="text-display text-white mb-12">
              Website <br /> Clarity Audit
            </h2>
            <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-sans leading-relaxed">
              Identify what is confusing, outdated, or underperforming. We’ll deliver a strategic report showing what to improve first.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <MagneticButton 
                className="px-12 py-6 bg-white text-[#336699] hover:bg-white/90 text-lg"
              >
                Request Your Audit
              </MagneticButton>
              <div className="flex items-center gap-4 text-white/60 font-mono tracking-widest text-[10px] uppercase">
                <ShieldCheck className="w-5 h-5 text-white/40" />
                <span>Institutional Trust Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen bg-transparent selection:bg-white/20">
      <NoiseOverlay />
      <GridBackground />
      <Navbar />
      
      <main className="relative z-10">
        <CinematicStory />
        <Hero />
        <InstitutionalHits />
        <Capabilities />
        <SelectedWorks />
        <Stats />
        <StrategicBlueprint />
        <ClarityAudit />
        <BrandIdentity />
        <Expertise />
        <Process />
        <Manifesto />
        <Footer />
      </main>

      {/* Parallax background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-10 bg-[radial-gradient(circle_at_center,_#3a7bd51a_0%,_transparent_70%)]" />
    </div>
  );
}
