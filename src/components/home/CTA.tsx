import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Let's work together
          </h2>
          <p className="text-muted-foreground mb-8">
            Have a project in mind? I'd love to hear about it. 
            Let's discuss how we can collaborate.
          </p>
          <Button asChild variant="hero">
            <Link to="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
