import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight, Download } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/TypingText";
import { EditableText } from "@/components/EditableText";

const experience = [
  { 
    id: "job1",
    year: "2023 - Present", 
    title: "Senior Product Engineer", 
    company: "Temenos India Pvt. Ltd.",
    location: "Hyderabad, India",
    description: "Leading Supply Chain Finance UX development, corporate origination features, and mentoring teams.",
    responsibilities: [
      "Enhancing Unified UX for Supply Chain Finance applications",
      "Developing corporate origination features for enterprise banking",
      "Leading code refactoring initiatives for improved maintainability",
      "Mentoring junior developers and conducting code reviews",
      "Collaborating with product managers on feature specifications",
    ],
    tools: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "SASS", "Git", "Jira"],
  },
  { 
    id: "job2",
    year: "2020 - 2023", 
    title: "Software Development Engineer", 
    company: "Temenos India Pvt. Ltd.",
    location: "Hyderabad, India",
    description: "Developed Trade Finance features including Import/Export LC, Guarantees, and Collections.",
    responsibilities: [
      "Built comprehensive Trade Finance modules from scratch",
      "Implemented Import/Export LC, Guarantees, and Collections features",
      "Optimized application performance and user experience",
      "Participated in agile ceremonies and sprint planning",
      "Wrote unit tests and maintained code quality standards",
    ],
    tools: ["React", "JavaScript", "CSS3", "REST APIs", "Git", "Jenkins"],
  },
  { 
    id: "job3",
    year: "2019 - 2020", 
    title: "Associate Software Development Engineer", 
    company: "Kony India Pvt. Ltd.",
    location: "Hyderabad, India",
    description: "Built Online and Mobile Banking modules for User Management and Foreign Exchange.",
    responsibilities: [
      "Developed User Management and Foreign Exchange modules",
      "Created responsive UI components for mobile banking",
      "Integrated RESTful APIs for banking transactions",
      "Collaborated with QA team for testing and bug fixes",
      "Documented technical specifications and user guides",
    ],
    tools: ["JavaScript", "Kony Visualizer", "HTML5", "CSS3", "REST APIs"],
  },
];

const Work = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="font-mono text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
              <Briefcase className="h-4 w-4" />
              CAREER JOURNEY
            </p>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">
              <TypingText text="Work Experience" speed={80} pauseTime={3000} />
            </h1>
            <p className="text-lg text-muted-foreground">
              <EditableText 
                id="work_intro" 
                defaultValue="6+ years of crafting enterprise-grade banking applications, from Trade Finance to Supply Chain solutions."
                className="text-lg text-muted-foreground"
              />
            </p>
          </motion.div>

          {/* Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <Button asChild size="lg" className="rounded-full group">
              <a href="/resume.pdf" download="Hemanth_Poondla_Resume.pdf">
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-border" />

              {experience.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

                  {/* Content card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`ml-8 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                    } p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors`}
                  >
                    {/* Year badge */}
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <EditableText 
                        id={`${job.id}_year`} 
                        defaultValue={job.year}
                        className="font-mono text-sm text-muted-foreground"
                      />
                    </div>

                    <h3 className="text-xl font-semibold mb-1">
                      <EditableText id={`${job.id}_title`} defaultValue={job.title} className="text-xl font-semibold" />
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      <EditableText id={`${job.id}_company`} defaultValue={job.company} className="text-primary font-medium" />
                    </p>
                    
                    <div className={`flex items-center gap-1 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <MapPin className="h-3 w-3" />
                      <EditableText id={`${job.id}_location`} defaultValue={job.location} className="text-sm text-muted-foreground" />
                    </div>

                    <p className="text-muted-foreground mb-4">
                      <EditableText id={`${job.id}_desc`} defaultValue={job.description} className="text-muted-foreground" />
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold mb-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1">
                        {job.responsibilities.map((resp, i) => (
                          <li 
                            key={i} 
                            className={`flex items-start gap-2 text-sm text-muted-foreground ${
                              index % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                            }`}
                          >
                            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <EditableText 
                              id={`${job.id}_resp_${i}`} 
                              defaultValue={resp}
                              className="text-sm text-muted-foreground"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {job.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 text-xs font-mono bg-secondary rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-16 text-center"
          >
            <h2 className="text-2xl font-serif mb-8">Education</h2>
            <div className="p-6 border border-border rounded-2xl">
              <p className="font-mono text-sm text-muted-foreground mb-2">
                <EditableText id="edu_year" defaultValue="2015 - 2019" className="font-mono text-sm text-muted-foreground" />
              </p>
              <h3 className="text-lg font-semibold mb-1">
                <EditableText id="edu_degree" defaultValue="B.Tech in Computer Science & Engineering" className="text-lg font-semibold" />
              </h3>
              <p className="text-muted-foreground">
                <EditableText id="edu_college" defaultValue="KL University, Vijayawada" className="text-muted-foreground" />
              </p>
              <p className="text-sm text-primary mt-2">
                <EditableText id="edu_cgpa" defaultValue="CGPA: 9.32" className="text-sm text-primary" />
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
