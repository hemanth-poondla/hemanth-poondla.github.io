import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, href: "https://github.com/hemanth-poondla", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/hemanth-poondla", label: "LinkedIn" },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Message sent",
      description: "Thank you. I'll get back to you soon.",
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mb-16"
          >
            <p className="text-muted-foreground text-sm mb-2">Contact</p>
            <h1 className="text-4xl font-semibold tracking-tight mb-4">
              Get in touch
            </h1>
            <p className="text-muted-foreground">
              Have a project in mind or want to collaborate? 
              Send me a message.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      required
                      className="h-12 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-12 rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    name="subject"
                    placeholder="Project inquiry"
                    required
                    className="h-12 rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="resize-none rounded-lg"
                  />
                </div>
                
                <Button type="submit" className="w-full h-12 rounded-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-4">Email</h2>
                <a
                  href="mailto:poondlahemanth1@gmail.com"
                  className="text-foreground hover:underline underline-offset-4"
                >
                  poondlahemanth1@gmail.com
                </a>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-4">Location</h2>
                <p className="text-foreground">Hyderabad, India</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-4">Phone</h2>
                <a
                  href="tel:+919885747107"
                  className="text-foreground hover:underline underline-offset-4"
                >
                  +91 9885747107
                </a>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-4">Social</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
