import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Plane, Shirt, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "trip-captain",
    title: "Trip Captain",
    subtitle: "AI-Powered Travel Planning",
    description: "An intelligent travel planning platform that leverages AI to create personalized itineraries with real-time collaboration and smart recommendations.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "OpenAI"],
    icon: Plane,
    liveUrl: "https://tripcaptain.werde.app/",
  },
  {
    id: "wardrobe-by-werde",
    title: "Wardrobe by werde",
    subtitle: "Smart Wardrobe Management",
    description: "Intelligent styling app that helps organize your wardrobe and provides AI-powered outfit recommendations based on weather and occasion.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "AI/ML"],
    icon: Shirt,
    liveUrl: "https://wardrobe.werde.app/",
  },
  {
    id: "settle-by-werde",
    title: "Settle by werde",
    subtitle: "Expense Splitting Made Easy",
    description: "A smart expense splitting app that helps you track shared expenses with friends, split bills effortlessly, and settle up with ease.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    icon: Wallet,
    liveUrl: "https://settle.werde.app/",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-2 tracking-widest uppercase">Selected Work</p>
            <h2 className="text-3xl font-heading font-semibold tracking-tight">Featured Projects</h2>
          </div>
          <Link
            to="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group h-full p-8 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-secondary">
                    <project.icon className="w-6 h-6" />
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </a>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {project.subtitle}
                </p>
                <h3 className="text-2xl font-heading font-semibold mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-secondary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="rounded-full">
                    <Link to="/projects">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center md:hidden"
        >
          <Link
            to="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
