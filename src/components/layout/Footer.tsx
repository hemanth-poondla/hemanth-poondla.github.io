import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/hemanth-poondla", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/hemanth-poondla", label: "LinkedIn" },
  { icon: Mail, href: "mailto:poondlahemanth1@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link to="/" className="text-lg font-serif">Hemanth Poondla</Link>
            <p className="text-sm text-muted-foreground">
              Senior Product Engineer
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by a proud Indian
            <span className="ml-1">🇮🇳</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
