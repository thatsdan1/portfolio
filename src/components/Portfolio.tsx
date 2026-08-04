import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  ExternalLink,
  Code,
  Cpu,
  Zap,
  Bot,
  Terminal,
  Rocket
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ParallaxLayer } from "@/components/ParallaxSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Card3D } from "@/components/Card3D";
import { RoboTurtle } from "@/components/RoboTurtle";

// Full class strings so Tailwind's JIT can see them at build time.
const ACCENTS = {
  cyan: {
    dot: "bg-neon-cyan shadow-neon-cyan/50",
    glow: "from-neon-cyan to-neon-purple",
    border: "border-neon-cyan/30 hover:border-neon-cyan hover:shadow-neon-cyan/20",
    badge: "from-neon-cyan to-neon-purple",
    bullet: "text-neon-cyan",
    heading: "text-neon-cyan",
  },
  purple: {
    dot: "bg-neon-purple shadow-neon-purple/50",
    glow: "from-neon-purple to-neon-pink",
    border: "border-neon-purple/30 hover:border-neon-purple hover:shadow-neon-purple/20",
    badge: "from-neon-purple to-neon-pink",
    bullet: "text-neon-purple",
    heading: "text-neon-purple",
  },
  green: {
    dot: "bg-neon-green shadow-neon-green/50",
    glow: "from-neon-green to-neon-cyan",
    border: "border-neon-green/30 hover:border-neon-green hover:shadow-neon-green/20",
    badge: "from-neon-green to-neon-cyan",
    bullet: "text-neon-green",
    heading: "text-neon-green",
  },
  pink: {
    dot: "bg-neon-pink shadow-neon-pink/50",
    glow: "from-neon-pink to-neon-purple",
    border: "border-neon-pink/30 hover:border-neon-pink hover:shadow-neon-pink/20",
    badge: "from-neon-pink to-neon-purple",
    bullet: "text-neon-pink",
    heading: "text-neon-pink",
  },
} as const;

type Accent = keyof typeof ACCENTS;

type Job = {
  org: string;
  role: string;
  location: string;
  period: string;
  icon: string;
  accent: Accent;
  points: string[];
};

const TimelineCard = ({ job, align }: { job: Job; align: "left" | "right" }) => {
  const a = ACCENTS[job.accent];
  const right = align === "right";
  return (
    <div className="relative inline-block group">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${a.glow} blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
      ></div>
      <div
        className={`relative bg-card/90 backdrop-blur-sm p-6 rounded-2xl border-2 ${a.border} transition-all duration-300 hover:shadow-2xl`}
      >
        <div className={`flex items-start gap-4 ${right ? "md:flex-row-reverse" : ""}`}>
          <div
            className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${a.badge} rounded-lg flex items-center justify-center shadow-lg`}
          >
            <span className="text-2xl font-bold">{job.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gradient mb-1">{job.org}</h3>
            <p className={`${a.heading} font-medium`}>{job.role}</p>
            <p className="text-xs font-mono text-foreground/60 mb-3">
              {job.location} · {job.period}
            </p>
            <ul className="space-y-2 text-foreground/80">
              {job.points.map((point) => (
                <li
                  key={point}
                  className={`flex items-start gap-2 ${right ? "md:flex-row-reverse md:text-right" : ""}`}
                >
                  <span className={`${a.bullet} mt-1 flex-shrink-0`}>{right ? "◃" : "▹"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "8bdfe077-715a-4c22-bee7-e6ea8e6ac099", 
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: "dodetoye@icloud.com",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email me directly at dodetoye@icloud.com",
        variant: "destructive",
      });
    }
  };

  const projects = [
    {
      title: "Safo Sports NIL Platform",
      period: "June 2025 – Present",
      description:
        "Co-founded an AI-powered NIL platform connecting college athletes with brands. Built the React/TypeScript frontend, Spring Boot backend, matching service, secure auth, and real-time profile management. Shipped a hybrid rule-based + LLM matching engine that scores athlete-brand fit across sport, reach, engagement, and geography.",
      tech: ["React", "TypeScript", "Spring Boot", "FastAPI", "Claude API", "AWS ECS"],
      cta: { label: "Learn More", href: "https://www.safosportsgroup.com/" },
    },
    {
      title: "CareerVillage AI Coach Prototype",
      period: "June 2025 – July 2025",
      description:
        "AI-powered career guidance platform for 1,000+ underserved learners, integrating mock interview simulations, resume review bots, and personalized goal-tracking workflows. Analyzed behavioral data across 3 core features to reach 62.6% user retention, 2× mock interview completions, and +40% resume tool engagement.",
      tech: ["React", "Node.js", "OpenAI GPT-4", "JSearch API", "Power BI"],
      cta: {
        label: "Demo Video",
        href: "https://www.loom.com/share/f1fba208a7d84bcf99886626c5ad5122",
      },
    },
    {
      title: "Internal Benefits Review Portal",
      period: "Jan 2026 – Mar 2026",
      description:
        "Authored a system design document for a centralized internal portal at DC DHS, translating operational needs (processing 83,000+ monthly SNAP households) into an authentication, authorization, and reporting architecture.",
      tech: ["Blazor (.NET 9)", "ASP.NET", "SQL Server", "Power BI", "DAX"],
      cta: null,
    },
    {
      title: "ThroughDansLens Photography",
      period: "April 2023 – Present",
      description:
        "Built and launched a full-stack booking site that boosted client bookings by 50% within 6 months. Designed the backend with Node.js and AWS RDS for session scheduling and automated email notifications.",
      tech: ["JavaScript", "Node.js", "AWS RDS", "HTML/CSS"],
      cta: { label: "Live Site", href: "https://www.throughdanlens.com/" },
    },
  ];

  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "C",
    "C#",
    "OCaml",
    "React",
    "Node.js",
    "Spring Boot",
    "FastAPI",
    ".NET / Blazor",
    "SQL",
    "AWS",
    "MCP Services",
    "Power BI",
    "Git",
    "Linux",
  ];

  const timeline: Job[] = [
    {
      org: "JP Morgan Chase & Co",
      role: "Software Engineer Program Intern — Corporate Technology",
      location: "Chicago, IL",
      period: "June 2026 – August 2026",
      icon: "💼",
      accent: "purple",
      points: [
        "Built an LLM-powered agentic AI system using JPMC's internal MCP SDK to automate client dataset onboarding for the RDaaS platform, replacing a manual, person-dependent workflow across ~20 data domains.",
        "Architected and deployed an MCP server with 16 tools across 4 skill domains, enabling plain-English interaction with Smart Flow and RDaaS enterprise backend systems.",
        "Developed a three-layer AI Challenge application while maintaining full ownership of all AI-generated code.",
      ],
    },
    {
      org: "Safo Sports Group",
      role: "Founding Engineer",
      location: "College Park, MD",
      period: "June 2025 – Present",
      icon: "🚀",
      accent: "cyan",
      points: [
        "Co-founded an AI-powered NIL platform connecting college athletes with brands.",
        "Built the React/TypeScript frontend, Spring Boot backend, matching service, secure auth, and real-time profile management.",
        "Designed a hybrid rule-based + LLM matching engine deployed on AWS ECS behind a Spring Boot proxy.",
      ],
    },
    {
      org: "DC Department of Human Services",
      role: "Software Developer Intern — Coding it Forward Fellow",
      location: "Washington, DC",
      period: "Jan 2026 – Mar 2026",
      icon: "🏛️",
      accent: "green",
      points: [
        "Implemented role-based access control for an internal DHS portal using Blazor Server (.NET 9) and ASP.NET Core Identity, defining 3 roles with claims-based authorization and policy-driven routing.",
        "Improved system observability by troubleshooting monitoring and alerting configurations, strengthening notification routing and incident response readiness.",
      ],
    },
    {
      org: "PricewaterhouseCoopers (PwC)",
      role: "Cloud & AI Engineering Intern",
      location: "Washington, DC",
      period: "June 2025 – July 2025",
      icon: "☁️",
      accent: "pink",
      points: [
        "Analyzed 10,000+ user-interaction and performance rows in Power BI, boosting AI agent adaptability (+27%) and engagement (+15%).",
        "Collaborated with 4+ cross-functional teams applying MLOps and human-centered AI, lifting feature discoverability (+40%) and cutting model error (-12%) and iteration time (-30%).",
      ],
    },
  ];

  return (
    <div className="min-h-screen matrix-bg">
      <ScrollProgress />
      <FloatingParticles />

      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Multiple Turtles with different properties - Hidden on mobile for performance */}
        <div className="hidden md:block">
          <RoboTurtle speed={2} size={180} delay={0} colorScheme="cyan" />
          <RoboTurtle speed={1.5} size={150} delay={3000} colorScheme="purple" />
          <RoboTurtle speed={2.5} size={120} delay={6000} colorScheme="green" />
          <RoboTurtle speed={1.8} size={160} delay={9000} colorScheme="pink" />
        </div>
        {/* Show just one smaller turtle on mobile */}
        <div className="md:hidden">
          <RoboTurtle speed={2} size={120} delay={0} colorScheme="cyan" />
        </div>
        {/* Parallax Background Layers */}
        <ParallaxLayer speed={-0.5} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </ParallaxLayer>

        <ParallaxLayer speed={-0.3} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
        </ParallaxLayer>

        {/* Mouse-tracking 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-16 h-16 border-2 border-neon-cyan rotate-45 opacity-30"
            style={{ x, y }}
            animate={{
              rotate: [45, 225, 45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-12 h-12 border-2 border-neon-purple rotate-12 opacity-40"
            style={{
              x: useTransform(x, (val) => val * -0.5),
              y: useTransform(y, (val) => val * -0.5)
            }}
            animate={{
              rotate: [12, 192, 12],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 left-40 w-20 h-20 border-2 border-neon-green rotate-90 opacity-35"
            style={{
              x: useTransform(x, (val) => val * 0.8),
              y: useTransform(y, (val) => val * 0.8)
            }}
            animate={{
              rotate: [90, 450, 90],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-4 text-neon-cyan"
              whileHover={{ scale: 1.05 }}
            >
              <Terminal className="w-6 h-6" />
              <span className="font-mono text-sm">danielodetoye.com</span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Daniel Odetoye
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-mono text-neon-purple mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Software Engineer · AI & Agentic Systems · Full-Stack
            </motion.h2>
            <motion.p
              className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              CS @ University of Maryland. I build agentic AI systems and full-stack
              platforms — most recently at JP Morgan Chase, and as a founding engineer
              at Safo Sports Group.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="cyber" size="lg" className="cyber-glow" onClick={scrollToProjects}>
                <Rocket className="w-5 h-5" />
                Projects
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="neon" size="lg" asChild>
                <a href={`${import.meta.env.BASE_URL}Daniel Odetoye Resume.pdf`} download>
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        className="py-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-neon-purple rounded-full animate-float animation-delay-1000 opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-neon-green rounded-full animate-float animation-delay-2000 opacity-50"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-neon-pink rounded-full animate-float animation-delay-3000 opacity-30"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-16 right-16 w-8 h-8 border border-neon-cyan/30 rotate-45 animate-spin-slow opacity-20"></div>
          <div className="absolute bottom-20 left-16 w-6 h-6 border border-neon-purple/30 rotate-12 animate-spin-slow animation-delay-1000 opacity-25"></div>
          <div className="absolute top-1/3 left-1/2 w-4 h-4 border border-neon-green/30 rotate-90 animate-spin-slow animation-delay-2000 opacity-15"></div>
          
          {/* Matrix-style lines */}
          <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-transparent via-neon-cyan to-transparent animate-pulse-slow opacity-30"></div>
          <div className="absolute bottom-0 right-1/3 w-px h-16 bg-gradient-to-t from-transparent via-neon-purple to-transparent animate-pulse-slow animation-delay-1000 opacity-25"></div>
          <div className="absolute top-1/2 left-0 w-12 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse-slow animation-delay-2000 opacity-20"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              About Me
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          {/* Creative diagonal split layout */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Diagonal split background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 skew-y-3"></div>

              <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-neon-cyan/20 rounded-2xl overflow-hidden">
                {/* Hexagonal corner accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-cyan/10 to-transparent clip-path-hexagon"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-neon-purple/10 to-transparent clip-path-hexagon"></div>

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Profile Picture with hexagonal frame */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative w-48 h-48 md:w-56 md:h-56">
                        {/* Hexagonal border effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-green rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neon-cyan/70 shadow-2xl shadow-neon-cyan/30">
                          <img
                            src={`${import.meta.env.BASE_URL}headshot1.jpg`}
                            alt="Daniel Odetoye"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        {/* Corner brackets */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neon-cyan"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neon-purple"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neon-green"></div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neon-pink"></div>
                      </div>
                    </motion.div>

                    {/* Text Content with modern spacing */}
                    <div className="flex-1 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <Bot className="w-8 h-8 text-neon-cyan" />
                          </motion.div>
                          <h3 className="text-3xl md:text-4xl font-bold text-gradient">Hi, I'm Daniel!</h3>
                        </div>
                        <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-transparent"></div>
                      </div>

                      <p className="text-foreground/90 leading-relaxed text-base md:text-lg">
                        Hey, I'm Daniel. I'm a Computer Science student at the
                        University of Maryland, and I mostly spend my time making
                        things — software, photos, events, whatever's in front of me.
                      </p>
                      <p className="text-foreground/90 leading-relaxed text-base md:text-lg">
                        The part I actually like is taking something messy that only
                        works because one specific person knows how to do it, and
                        turning it into something that just runs. That's the itch,
                        whether it's an AI system or a booking page for a photo shoot.
                      </p>
                      <p className="text-foreground/90 leading-relaxed text-base md:text-lg">
                        Outside of code you'll find me behind a camera, on a basketball
                        court, or somewhere loud with good food and West African music.
                        I also do a lot of community work on campus, mostly helping
                        other students find their way into tech.
                      </p>

                      <div className="p-4 bg-gradient-to-r from-neon-green/10 to-transparent border-l-4 border-neon-green rounded-r">
                        <p className="font-mono text-neon-green text-sm flex items-center gap-2">
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {'> '}
                          </motion.span>
                          Open to Software Engineering roles & collaborations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Skills Section - Creative Grid */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative bg-gradient-to-r from-neon-purple/5 to-neon-cyan/5 rounded-2xl p-8 border border-neon-purple/20">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-8 h-8 text-neon-purple" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gradient">Skills & Technologies</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <div className="relative p-4 bg-card/50 backdrop-blur-sm rounded-lg border-2 border-neon-cyan/30 hover:border-neon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                        <p className="relative text-center text-sm font-medium text-foreground group-hover:text-neon-cyan transition-colors">
                          {skill}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        ref={projectsRef}
        className="py-20 px-4 bg-darker-surface"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Projects
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <Card3D className="perspective-1000">
                  <Card className="cyber-glow group h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-neon-cyan flex-shrink-0" />
                        {project.title}
                      </CardTitle>
                      <p className="text-xs font-mono text-neon-purple">{project.period}</p>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        {project.cta && (
                          <div className="flex gap-2">
                            <Button variant="matrix" size="sm" asChild>
                              <a href={project.cta.href} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                                {project.cta.label}
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EDUCATION & EXPERIENCE SECTION */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Education & Experience
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-green mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          {/* Creative Timeline Style */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-green hidden md:block"></div>

            <div className="space-y-12">
              {/* Education Card */}
              <motion.div
                className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:text-right">
                  <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-neon-cyan/30 hover:border-neon-cyan transition-all duration-300 hover:shadow-2xl hover:shadow-neon-cyan/20">
                      <div className="flex items-start gap-4 md:flex-row-reverse">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-2xl font-bold">🎓</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gradient mb-1">University of Maryland</h3>
                          <p className="text-neon-cyan font-medium">B.S. Computer Science</p>
                          <p className="text-xs font-mono text-foreground/60 mb-3">College Park, MD · Expected May 2027</p>
                          <ul className="space-y-2 text-foreground/80">
                            <li className="flex items-start gap-2 md:flex-row-reverse md:text-right">
                              <span className="text-neon-cyan mt-1">▹</span>
                              <span>QUEST Honors Program · MLT Ascend Scholar</span>
                            </li>
                            <li className="flex items-start gap-2 md:flex-row-reverse md:text-right">
                              <span className="text-neon-purple mt-1">▹</span>
                              <span>Treasurer, UMD Code Black</span>
                            </li>
                            <li className="flex items-start gap-2 md:flex-row-reverse md:text-right">
                              <span className="text-neon-green mt-1">▹</span>
                              <span>National Society of Black Engineers · ColorStack@UMD</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex justify-center">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-neon-cyan shadow-lg shadow-neon-cyan/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="hidden md:block"></div>
              </motion.div>

              {/* Experience Cards */}
              {timeline.map((job, index) => {
                const isRight = index % 2 === 0;
                return (
                  <motion.div
                    key={job.org}
                    className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center"
                    initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    {isRight && <div className="hidden md:block"></div>}
                    {!isRight && (
                      <div className="md:text-right">
                        <TimelineCard job={job} align="right" />
                      </div>
                    )}
                    <div className="hidden md:flex justify-center">
                      <motion.div
                        className={`w-6 h-6 rounded-full shadow-lg ${ACCENTS[job.accent].dot}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </div>
                    {isRight && (
                      <div>
                        <TimelineCard job={job} align="left" />
                      </div>
                    )}
                    {!isRight && <div className="hidden md:block"></div>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Connect with Me
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-neon-green to-neon-cyan mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          {/* Creative Banner Layout */}
          <div className="space-y-8">
            {/* Contact Form - Full Width Creative Banner */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-green/10 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>

              <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl border-2 border-neon-cyan/30 overflow-hidden hover:border-neon-cyan transition-all duration-300 hover:shadow-2xl hover:shadow-neon-cyan/20">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-neon-cyan/50 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-neon-purple/50 rounded-br-3xl"></div>

                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-xl flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-gradient">Send a Message</h3>
                      <p className="text-foreground/70">Let's build something amazing together</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-card/50 border-2 border-neon-cyan/30 focus:border-neon-cyan h-12 rounded-xl"
                        required
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        type="email"
                        placeholder="your.email@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-card/50 border-2 border-neon-cyan/30 focus:border-neon-cyan h-12 rounded-xl"
                        required
                      />
                    </motion.div>
                    <motion.div className="md:col-span-2" whileFocus={{ scale: 1.01 }}>
                      <Textarea
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-card/50 border-2 border-neon-cyan/30 focus:border-neon-cyan min-h-[140px] rounded-xl"
                        required
                      />
                    </motion.div>
                    <motion.div
                      className="md:col-span-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" variant="cyber" className="w-full h-14 text-lg rounded-xl">
                        <Mail className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4 font-mono text-center">
                    📧 Messages sent to: dodetoye@icloud.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links & Resume - Creative Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* GitHub Banner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <a href="https://github.com/thatsdan1" target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm rounded-2xl border-2 border-neon-purple/30 hover:border-neon-purple overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neon-purple/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 text-center">
                      <motion.div
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-purple to-neon-pink rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-neon-purple/50 transition-shadow"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Github className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-gradient mb-2">GitHub</h4>
                      <p className="text-sm text-foreground/70">View my code & projects</p>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* LinkedIn Banner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <a href="https://linkedin.com/in/danielodetoye" target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm rounded-2xl border-2 border-neon-cyan/30 hover:border-neon-cyan overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neon-cyan/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 text-center">
                      <motion.div
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-neon-cyan/50 transition-shadow"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Linkedin className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-gradient mb-2">LinkedIn</h4>
                      <p className="text-sm text-foreground/70">Connect professionally</p>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Resume Download Banner */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <a href={`${import.meta.env.BASE_URL}Daniel Odetoye Resume.pdf`} download className="block group">
                  <div className="relative h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm rounded-2xl border-2 border-neon-green/30 hover:border-neon-green overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neon-green/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-6 text-center">
                      <motion.div
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-green to-neon-cyan rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-neon-green/50 transition-shadow"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Download className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-gradient mb-2">Resume</h4>
                      <p className="text-sm text-foreground/70">Download my CV</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-neon-cyan/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Daniel Odetoye. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;