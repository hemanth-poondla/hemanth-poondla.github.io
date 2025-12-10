import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Trophy, Heart, Gamepad2, Music } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const experience = [
  { 
    year: "2023 - Present", 
    title: "Senior Product Engineer", 
    company: "Temenos India Pvt. Ltd.",
    description: "Leading Supply Chain Finance UX development, corporate origination features, and mentoring teams."
  },
  { 
    year: "2020 - 2023", 
    title: "Software Development Engineer", 
    company: "Temenos India Pvt. Ltd.",
    description: "Developed Trade Finance features including Import/Export LC, Guarantees, and Collections."
  },
  { 
    year: "2019 - 2020", 
    title: "Associate Software Development Engineer", 
    company: "Kony India Pvt. Ltd.",
    description: "Built Online and Mobile Banking modules for User Management and Foreign Exchange."
  },
];

const achievements = [
  { icon: Trophy, title: "Rank 1 Performance", desc: "Maintained top rank for two consecutive years" },
  { icon: Trophy, title: "Team Excellence Award", desc: "Q4 2020 Release - Temenos" },
  { icon: Trophy, title: "Chess Champion", desc: "Won office-level chess competition twice" },
  { icon: Trophy, title: "HackerRank Stars", desc: "Silver 3★ Problem Solving, Silver 4★ Python" },
];

const hobbies = [
  { icon: Gamepad2, title: "Chess", desc: "Elite league player on Chess.com. Two-time office champion with a passion for strategic thinking." },
  { icon: Heart, title: "Cricket", desc: "Passionate cricket enthusiast. Was the captain of my college cricket team and love weekend matches." },
  { icon: Music, title: "Music", desc: "Enjoy listening to diverse genres. Music helps me stay focused during coding sessions." },
];

const About = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Hero Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="w-32 h-32 rounded-full bg-secondary mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl font-serif text-muted-foreground">HP</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4">
              Hemanth Poondla
            </h1>
            
            <p className="font-mono text-sm text-muted-foreground mb-6">
              SENIOR PRODUCT ENGINEER
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Hyderabad, India
              </span>
              <span>•</span>
              <span>6+ Years Experience</span>
              <span>•</span>
              <span>Banking Domain</span>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              A quality-driven Computer Science graduate with a proven track record of developing 
              responsive web applications for enterprise banking products. I bring advanced technology 
              skills, a collaborative approach, and a commitment to meaningful contributions.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              At Temenos, I enhance Supply Chain Finance through Unified UX, develop corporate 
              origination features, and lead code refactoring initiatives. Previously, I spearheaded 
              Trade Finance development and mentored teams of developers. I stay current with industry 
              trends to ensure our products remain competitive and innovative.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="rounded-full" asChild>
                <a href="mailto:poondlahemanth1@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  poondlahemanth1@gmail.com
                </a>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <a href="tel:+919885747107">
                  <Phone className="mr-2 h-4 w-4" />
                  +91 9885747107
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-serif text-center mb-12">Experience</h2>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-border pl-6 py-2"
                >
                  <p className="font-mono text-xs text-muted-foreground mb-1">{item.year}</p>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-serif text-center mb-12">Achievements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 border border-border rounded-2xl"
                >
                  <div className="p-2 bg-secondary rounded-lg shrink-0">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hobbies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-serif text-center mb-4">Beyond Code</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              When I'm not building banking solutions, you'll find me strategizing on the chessboard 
              or cheering on the cricket field.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 border border-border rounded-2xl"
                >
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <hobby.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{hobby.title}</h3>
                  <p className="text-sm text-muted-foreground">{hobby.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-serif mb-6">Let's Connect</h2>
            <p className="text-muted-foreground mb-8">
              Whether it's about a project, opportunity, or just a game of chess - I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="rounded-full" asChild>
                <a href="https://linkedin.com/in/hemanth-poondla" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <a href="https://github.com/hemanth-poondla" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button className="rounded-full" asChild>
                <a href="mailto:poondlahemanth1@gmail.com">
                  Get in Touch
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
