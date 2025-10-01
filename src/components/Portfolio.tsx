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
import { MouseFollower } from "@/components/MouseFollower";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Card3D } from "@/components/Card3D";
import { RoboTurtle } from "@/components/RoboTurtle";

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
      title: "AI Neural Network Dashboard",
      description: "Real-time machine learning model visualization with interactive 3D neural network graphs",
      tech: ["React", "Three.js", "Python", "TensorFlow"],
      link: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Quantum Computing Simulator",
      description: "Web-based quantum circuit simulator with drag-and-drop interface",
      tech: ["TypeScript", "WebGL", "Quantum.js"],
      link: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Blockchain Visualizer",
      description: "3D blockchain explorer with real-time transaction monitoring",
      tech: ["Next.js", "D3.js", "Web3", "Solidity"],
      link: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  const skills = [
    "React", "TypeScript", "Python", "Machine Learning", "Blockchain", 
    "Three.js", "WebGL", "Node.js", "GraphQL", "Docker", "Kubernetes"
  ];

  return (
    <div className="min-h-screen matrix-bg">
      <ScrollProgress />
      <MouseFollower />
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
              Software Engineer · Cloud & AI · Creative Technologist
            </motion.h2>
            <motion.p
              className="text-lg text-black max-w-2xl mx-auto mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
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
                            src="/headshot1.jpg"
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
                        I'm a software developer and creative technologist passionate about building tools that solve real problems. I've interned at PwC as a Cloud and AI Engineer and participated in programs like Amazon's CodePath and MLT. I serve as Event Coordinator for Code: Black, connecting underrepresented students to tech opportunities, and I'm a member of the QUEST Honors Program.
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {["Python", "TypeScript", "React", "Node.js", "Cloud (AWS, Azure)", "AI/ML", "Figma", "Leadership", "Event Planning", "Photography"].map((skill, index) => (
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real projects based on Daniel's background */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card3D className="perspective-1000">
                <Card className="cyber-glow group h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-neon-cyan" />
                  First Generation Investors Website
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Designed and deployed 3 core UI pages (Admin, Student, Tutor), boosting platform usability by 35% for 50+ active users. Integrated React frontend with Firebase and FastAPI backend, enabling real-time updates across 100+ weekly tutoring sessions and improving data sync reliability by 95%.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Firebase</Badge>
                    <Badge variant="secondary" className="text-xs">FastAPI</Badge>
                    <Badge variant="secondary" className="text-xs">Figma</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="matrix" size="sm" asChild>
                      <a href="https://github.com/thatsdan1/forage-jpmc-swe-task-1" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
                </Card>
              </Card3D>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card3D className="perspective-1000">
                <Card className="cyber-glow group h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-neon-cyan" />
                  CareerVillage AI Coach Prototype
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Full-stack AI-powered coaching platform offering personalized career advice, mock interviews, resume help, and goal setting for 1,000+ underserved learners. Achieved 62.6% engagement rate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">OpenAI GPT-4</Badge>
                    <Badge variant="secondary" className="text-xs">JSearch API</Badge>
                    <Badge variant="secondary" className="text-xs">Power BI</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="matrix" size="sm" asChild>
                      <a href="https://www.loom.com/share/f1fba208a7d84bcf99886626c5ad5122" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Demo Video
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
                </Card>
              </Card3D>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card3D className="perspective-1000">
                <Card className="cyber-glow group h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-neon-cyan" />
                  ThroughDansLens Photography Portfolio
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Built and launched a full-stack booking site that boosted client bookings by 50% within 6 months. Designed backend with Node.js and AWS RDS for session scheduling and email automation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">HTML/CSS</Badge>
                    <Badge variant="secondary" className="text-xs">JavaScript</Badge>
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">AWS RDS</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="matrix" size="sm" asChild>
                      <a href="https://www.throughdanlens.com/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live Site
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
                </Card>
              </Card3D>
            </motion.div>
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
                className="md:grid md:grid-cols-2 md:gap-8 items-center"
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
                          <h3 className="text-2xl font-bold text-gradient mb-2">University of Maryland</h3>
                          <p className="text-neon-cyan mb-3 font-medium">B.S. Computer Science & Immersive Media Design</p>
                          <ul className="space-y-2 text-foreground/80">
                            <li className="flex items-start gap-2">
                              <span className="text-neon-cyan mt-1">▹</span>
                              <span>QUEST Honors Program: Experiential learning & innovation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-neon-purple mt-1">▹</span>
                              <span>Event Coordinator, Code: Black (leadership, community)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-neon-green mt-1">▹</span>
                              <span>Diazporic Dance Team (West African culture & performance)</span>
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

              {/* Experience Card */}
              <motion.div
                className="md:grid md:grid-cols-2 md:gap-8 items-center mt-12 md:mt-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="hidden md:block"></div>
                <div className="hidden md:flex justify-center">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-neon-purple shadow-lg shadow-neon-purple/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
                <div>
                  <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-neon-purple/30 hover:border-neon-purple transition-all duration-300 hover:shadow-2xl hover:shadow-neon-purple/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-2xl font-bold">💼</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gradient mb-2">Professional & Program Experience</h3>
                          <ul className="space-y-2 text-foreground/80 mt-3">
                            <li className="flex items-start gap-2">
                              <span className="text-neon-purple mt-1">▹</span>
                              <span>Cloud & AI Engineer Intern, PwC</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-neon-pink mt-1">▹</span>
                              <span>Amazon CodePath: SWE & Cloud Engineering</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-neon-cyan mt-1">▹</span>
                              <span>MLT (Management Leadership for Tomorrow): Tech Prep</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-neon-green mt-1">▹</span>
                              <span>Founder, Through Dan Lens (creative brand)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
            © 2024 Daniel Odetoye. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;