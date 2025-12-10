import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "trip-captain",
    title: "Trip Captain",
    description: "AI-powered travel planning platform",
    tech: ["React", "TypeScript", "Tailwind"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    link: "https://tripcaptain.co.in",
  },
  {
    id: "style-sync",
    title: "Style Sync",
    description: "Smart wardrobe management app",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    link: "#",
  },
  {
    id: "dashboard-pro",
    title: "Dashboard Pro",
    description: "Enterprise analytics dashboard",
    tech: ["Next.js", "D3.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "#",
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
            <p className="text-muted-foreground text-sm mb-2">Selected Work</p>
            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          </div>
          <Link
            to="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            View all →
          </Link>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="group block border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-colors"
              >
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-2 group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-secondary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
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
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
