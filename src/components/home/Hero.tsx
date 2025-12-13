import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Code2, Github, Linkedin, Mail, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditableText } from "@/components/EditableText";

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullName = "Hemanth Poondla";
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullName.length) {
          setDisplayText(fullName.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullName.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <EditableText id="hero_status" defaultValue="Available for opportunities" className="text-sm" />
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <EditableText id="hero_location" defaultValue="Hyderabad, India" className="text-sm text-muted-foreground" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold leading-[1.1] tracking-tight mb-6"
            >
              {/* Fixed height container to prevent layout shift on mobile */}
              <span className="block">Hi, I'm</span>
              <span className="block h-[1.2em]">
                {displayText}
                <span className="border-r-2 border-foreground animate-blink ml-0.5" />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <EditableText id="hero_role" defaultValue="Senior Product Engineer" className="text-lg font-medium" />
              <span className="text-muted-foreground">at</span>
              <EditableText id="hero_company" defaultValue="Temenos" className="text-lg font-medium" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl"
            >
              <EditableText 
                id="hero_tagline" 
                defaultValue="Crafting elegant solutions for complex banking problems. Building experiences that matter, one line of code at a time."
                className="text-lg text-muted-foreground"
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button asChild variant="hero" size="lg">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume.pdf" download="Hemanth_Poondla_Resume.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/hemanth-poondla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/hemanth-poondla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:poondlahemanth1@gmail.com"
                className="p-2.5 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Stats */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="p-6 rounded-2xl border border-border bg-card">
                <Code2 className="w-6 h-6 text-muted-foreground mb-4" />
                <p className="text-3xl font-heading font-semibold mb-1">
                  <EditableText id="hero_years" defaultValue="6+" className="text-3xl font-heading font-semibold" />
                </p>
                <p className="text-sm text-muted-foreground">
                  <EditableText id="hero_years_label" defaultValue="Years Experience" className="text-sm text-muted-foreground" />
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card">
                <Briefcase className="w-6 h-6 text-muted-foreground mb-4" />
                <p className="text-3xl font-heading font-semibold mb-1">
                  <EditableText id="hero_domain" defaultValue="Banking" className="text-3xl font-heading font-semibold" />
                </p>
                <p className="text-sm text-muted-foreground">
                  <EditableText id="hero_domain_label" defaultValue="Domain Expertise" className="text-sm text-muted-foreground" />
                </p>
              </div>
              <div className="col-span-2 p-6 rounded-2xl border border-border bg-card">
                <p className="text-sm text-muted-foreground mb-3">Current Focus</p>
                <p className="text-base leading-relaxed">
                  <EditableText 
                    id="hero_focus" 
                    defaultValue="Enhancing Unified UX for Supply Chain Finance, mentoring developers, and driving innovation in corporate origination products."
                    className="text-base"
                  />
                </p>
              </div>
              <div className="col-span-2 p-6 rounded-2xl border border-border bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "JavaScript", "Tailwind", "Node.js", "Java"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-sm bg-background rounded-full border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
