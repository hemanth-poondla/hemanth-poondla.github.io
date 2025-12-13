import { motion } from "framer-motion";
import { Code2, Server, Building2 } from "lucide-react";

const skills = [
  { 
    category: "Frontend", 
    icon: Code2,
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"] 
  },
  { 
    category: "Backend", 
    icon: Server,
    items: ["Node.js", "Java", "Python", "DBMS", "REST APIs"] 
  },
  { 
    category: "Domain", 
    icon: Building2,
    items: ["Banking Applications", "Trade Finance", "Supply Chain Finance", "Corporate Banking"] 
  },
];

export function Skills() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm text-muted-foreground mb-2 tracking-widest uppercase">Expertise</p>
          <h2 className="text-3xl font-heading font-semibold tracking-tight">Technical Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-secondary">
                  <skill.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-medium">
                  {skill.category}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
