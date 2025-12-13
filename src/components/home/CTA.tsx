import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl border border-border bg-card text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex p-3 rounded-2xl bg-secondary mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-4">
              Let's work together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have a project in mind? I'd love to hear about it. 
              Let's discuss how we can collaborate and build something great.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <a href="mailto:poondlahemanth1@gmail.com">
                  poondlahemanth1@gmail.com
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
