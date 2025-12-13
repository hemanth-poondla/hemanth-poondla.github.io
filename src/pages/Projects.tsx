import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/TypingText";

const projects = [
  {
    id: "trip-captain",
    title: "Trip Captain",
    subtitle: "AI-Powered Travel Planning",
    description: "Trip Captain is an intelligent travel planning platform that leverages AI to create personalized itineraries. Users can input their preferences, budget, and travel dates to receive comprehensive trip plans including accommodations, activities, and local recommendations. The platform features real-time collaboration, smart suggestions based on weather and local events, and seamless booking integration.",
    features: [
      "AI-powered itinerary generation",
      "Real-time collaboration for group trips",
      "Smart budget optimization",
      "Local recommendations and hidden gems",
      "Weather-aware planning",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    liveUrl: "https://www.tripcaptain.co.in/",
  },
  {
    id: "style-sync",
    title: "Style Sync",
    subtitle: "Smart Wardrobe Management",
    description: "Style Sync revolutionizes how you manage your wardrobe. This intelligent styling application helps users organize their clothing, get AI-powered outfit recommendations based on weather, occasion, and personal style preferences. The app learns from your choices to provide increasingly personalized suggestions, making getting dressed effortless and stylish.",
    features: [
      "Digital wardrobe organization",
      "AI-powered outfit recommendations",
      "Weather-based styling suggestions",
      "Occasion-specific outfit planning",
      "Style analytics and insights",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "AI/ML Integration", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    liveUrl: "https://fit-oracle-70.lovable.app/",
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
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <p className="font-mono text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              SELECTED WORK
            </p>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">
              <TypingText text="Projects" speed={100} pauseTime={3000} />
            </h1>
            <p className="text-lg text-muted-foreground">
              Personal projects I've built to explore new technologies and solve real-world problems. 
              Each project represents my passion for creating meaningful digital experiences.
            </p>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <motion.div 
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-border group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <Button asChild className="rounded-full">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Live Site
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-mono text-xs text-muted-foreground mb-2">
                    {project.subtitle}
                  </p>
                  <h2 className="text-3xl font-serif mb-4">{project.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-primary mt-1">✦</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-secondary rounded-full hover:bg-primary/10 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <Button asChild variant="outline" className="rounded-full group">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      View Project
                    </a>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* More projects coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-24 py-16 border border-dashed border-border rounded-2xl"
          >
            <motion.span 
              className="text-4xl mb-4 block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🚀
            </motion.span>
            <p className="text-lg font-semibold mb-2">More projects coming soon!</p>
            <p className="text-muted-foreground">
              Currently cooking up something exciting. Stay tuned!
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
