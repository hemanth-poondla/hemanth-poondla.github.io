import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Send, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TypingText } from "@/components/TypingText";
import profileImage from "@/assets/profile.jpg";
const WEB3FORMS_ACCESS_KEY = "733101df-ea65-4f6f-8e6f-fa0d6a1fa8c0";

const socialLinks = [
  { icon: Github, href: "https://github.com/hemanth-poondla", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/hemanth-poondla", label: "LinkedIn" },
];

const WinkEmoji = () => (
  <motion.span
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    className="inline-block text-4xl"
  >
    😉
  </motion.span>
);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setShowSuccess(false), 4000);
        toast({
          title: "Message sent! 🎉",
          description: "Thank you! I'll get back to you soon.",
        });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Oops! 😅",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mb-16"
          >
            {/* Profile Picture */}
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-border mb-6 flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={profileImage} alt="Hemanth Poondla" className="w-full h-full object-cover" />
            </motion.div>
            
            <p className="text-muted-foreground text-sm mb-2 tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Contact
            </p>
            <h1 className="text-4xl font-semibold tracking-tight mb-4">
              <TypingText text="Get in touch" />
            </h1>
            <p className="text-muted-foreground text-lg">
              Have a project in mind or want to collaborate? 
              Send me a message. I promise I don't bite! 🙂
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl border border-border"
                  >
                    <WinkEmoji />
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-semibold mt-4"
                    >
                      Thanks for reaching out!
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-muted-foreground mt-2"
                    >
                      I'll get back to you soon ✨
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                <input type="hidden" name="subject" value="New Contact Form Submission" />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="h-12 rounded-lg transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-12 rounded-lg transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    name="subject"
                    placeholder="Project inquiry"
                    required
                    className="h-12 rounded-lg transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="resize-none rounded-lg transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-lg group" 
                  disabled={isSubmitting}
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">Email</h2>
                <a
                  href="mailto:poondlahemanth1@gmail.com"
                  className="text-foreground hover:underline underline-offset-4 text-lg"
                >
                  poondlahemanth1@gmail.com
                </a>
              </motion.div>

              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">Location</h2>
                <p className="text-foreground text-lg">Hyderabad, India 🇮🇳</p>
              </motion.div>

              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">Phone</h2>
                <p className="text-foreground text-lg">
                  +91 98857•••••
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Available via email or contact form)
                </p>
              </motion.div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">Social</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div 
                className="pt-8 border-t border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                  <span className="ml-1">🚀</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and opportunities.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
