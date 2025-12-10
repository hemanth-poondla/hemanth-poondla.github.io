import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullName = "Hemanth Poondla";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullName.length) {
        setDisplayText(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-6"
          >
            Hi, I'm{" "}
            <span className="inline-block">
              {displayText}
              <span className="border-r-2 border-foreground animate-blink ml-1" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-mono text-muted-foreground mb-4"
          >
            SENIOR PRODUCT ENGINEER
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl"
          >
            With over 6 years of experience, I specialize in building enterprise-grade 
            banking applications at Temenos. From Trade Finance to Supply Chain solutions, 
            I craft seamless user experiences for corporate and retail banking products.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground mb-10 leading-relaxed max-w-2xl"
          >
            Currently enhancing Unified UX for Supply Chain Finance, mentoring developers, 
            and driving innovation in corporate origination products. I believe in clean code, 
            thoughtful design, and continuous learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Button asChild variant="hero">
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline">
              <Link to="/about">
                About Me
              </Link>
            </Button>
            <Button asChild variant="heroOutline">
              <a href="mailto:poondlahemanth1@gmail.com">
                Get in Touch
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border"
          >
            <div>
              <p className="text-2xl font-serif">6+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-serif">Temenos</p>
              <p className="text-sm text-muted-foreground">Current Company</p>
            </div>
            <div>
              <p className="text-2xl font-serif">Banking</p>
              <p className="text-sm text-muted-foreground">Domain Expertise</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
