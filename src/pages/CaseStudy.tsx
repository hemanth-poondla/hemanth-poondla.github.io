import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const projectsData: Record<string, {
  title: string;
  description: string;
  problem: string;
  solution: string;
  learnings: string[];
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}> = {
  "trip-captain": {
    title: "Trip Captain",
    description: "AI-powered travel planner creating personalized itineraries.",
    problem: "Planning trips is time-consuming. Users spend hours researching destinations and organizing logistics.",
    solution: "Built an intelligent travel assistant that understands preferences and generates optimized itineraries with real-time pricing.",
    learnings: [
      "Complex state management for multi-step flows",
      "API rate limiting and optimization",
      "Accessible component design",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    liveUrl: "https://tripcaptain.co.in",
    githubUrl: "#",
  },
  "style-sync": {
    title: "Style Sync",
    description: "Smart wardrobe management and outfit coordination.",
    problem: "People feel they have nothing to wear despite full closets.",
    solution: "Created a visual wardrobe organizer with AI-powered outfit suggestions based on weather and occasion.",
    learnings: [
      "Image recognition implementation",
      "Drag-and-drop interface design",
      "Performance optimization for images",
    ],
    tech: ["React", "Node.js", "MongoDB", "TensorFlow.js", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
  "dashboard-pro": {
    title: "Dashboard Pro",
    description: "Enterprise analytics with real-time visualization.",
    problem: "Teams struggle with fragmented data and static reports.",
    solution: "Built a modular dashboard with real-time streaming and role-based access.",
    learnings: [
      "D3.js for complex visualizations",
      "WebSocket for real-time updates",
      "Responsive dashboard layouts",
    ],
    tech: ["Next.js", "D3.js", "PostgreSQL", "GraphQL", "Redis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    liveUrl: "#",
    githubUrl: "#",
  },
};

const CaseStudy = () => {
  const { id } = useParams();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
          <Button asChild variant="outline">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <div className="max-w-2xl mb-12">
              <h1 className="text-4xl font-semibold tracking-tight mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {project.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden bg-secondary mb-16"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          <div className="max-w-2xl space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Problem</h2>
              <p className="text-foreground">{project.problem}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Solution</h2>
              <p className="text-foreground">{project.solution}</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-sm bg-secondary rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Key Learnings</h2>
              <ul className="space-y-2">
                {project.learnings.map((learning) => (
                  <li key={learning} className="text-foreground">
                    {learning}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 pt-8 border-t border-border"
            >
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Site
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default CaseStudy;
