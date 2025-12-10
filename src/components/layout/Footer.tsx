import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

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
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
