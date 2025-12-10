import { motion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const experience = [
  { year: "2024", title: "Senior Frontend Developer", company: "Tech Startup" },
  { year: "2022", title: "Frontend Developer", company: "Digital Agency" },
  { year: "2021", title: "Junior Developer", company: "Software Company" },
  { year: "2020", title: "CS Degree", company: "University" },
];

const About = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="sticky top-24">
                <div className="w-64 h-64 rounded-2xl overflow-hidden bg-secondary mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  Based in India
                </div>
                <Button variant="outline" className="rounded-lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-muted-foreground text-sm mb-2">About</p>
              <h1 className="text-4xl font-semibold tracking-tight mb-6">
                Building digital products with purpose
              </h1>
              
              <div className="space-y-4 text-muted-foreground mb-12">
                <p>
                  I'm a frontend developer with 4+ years of experience building 
                  web applications. I focus on creating clean, performant, and 
                  accessible user interfaces.
                </p>
                <p>
                  My work spans from startups to enterprise clients, always with 
                  an emphasis on quality code and thoughtful design.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-sm font-medium text-muted-foreground mb-6">Experience</h2>
                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <motion.div
                      key={item.year + item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex gap-4"
                    >
                      <span className="text-sm text-muted-foreground w-12 shrink-0">
                        {item.year}
                      </span>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-4">Values</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Quality over quantity</li>
                  <li>User-centered design</li>
                  <li>Clean, maintainable code</li>
                  <li>Continuous learning</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
