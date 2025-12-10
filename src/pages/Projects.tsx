import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const projects = [
  {
    id: "trip-captain",
    title: "Trip Captain",
    description: "AI-powered travel planning platform",
    tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    liveUrl: "https://tripcaptain.co.in",
    githubUrl: "#",
  },
  {
    id: "style-sync",
    title: "Style Sync",
    description: "Smart wardrobe management application",
    tech: ["React", "Node.js", "MongoDB", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "dashboard-pro",
    title: "Dashboard Pro",
    description: "Enterprise analytics dashboard",
    tech: ["Next.js", "D3.js", "PostgreSQL", "GraphQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Component library with theming",
    tech: ["React", "Storybook", "TypeScript"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "task-flow",
    title: "Task Flow",
    description: "Project management with Kanban",
    tech: ["React", "DnD Kit", "Zustand"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "ecommerce-ui",
    title: "E-Commerce UI",
    description: "Modern storefront design",
    tech: ["Next.js", "Stripe", "Tailwind"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const Projects = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mb-16"
          >
            <p className="text-muted-foreground text-sm mb-2">Work</p>
            <h1 className="text-4xl font-semibold tracking-tight mb-4">
              Projects
            </h1>
            <p className="text-muted-foreground">
              A selection of projects I've worked on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="block border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-colors"
                >
                  <div className="relative h-48 bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-1 group-hover:underline underline-offset-4">
                      {project.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-secondary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
