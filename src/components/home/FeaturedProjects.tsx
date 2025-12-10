import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "trip-captain",
    title: "Trip Captain",
    subtitle: "AI-Powered Travel Planning",
    description: "An intelligent travel planning platform that leverages AI to create personalized itineraries with real-time collaboration and smart recommendations.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "OpenAI"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    liveUrl: "https://www.tripcaptain.co.in/",
  },
  {
    id: "style-sync",
    title: "Style Sync",
    subtitle: "Smart Wardrobe Management",
    description: "Intelligent styling app that helps organize your wardrobe and provides AI-powered outfit recommendations based on weather and occasion.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "AI/ML"],
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    liveUrl: "https://outfit-oracle-70.lovable.app/",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">SELECTED WORK</p>
            <h2 className="text-3xl font-serif tracking-tight">Projects</h2>
          </div>
          <Link
            to="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-colors">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <p className="font-mono text-xs text-muted-foreground mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="text-2xl font-serif mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-secondary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Live Demo
                        </a>
                      </Button>
                      <Button asChild variant="ghost" size="sm" className="rounded-full">
                        <Link to={`/projects`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-64 md:h-auto bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
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
