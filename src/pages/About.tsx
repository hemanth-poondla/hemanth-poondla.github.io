import { motion } from "framer-motion";
import { MapPin, Trophy, Heart, Gamepad2, Music, Plane, BookOpen, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TypingText } from "@/components/TypingText";
import { TravelMap } from "@/components/TravelMap";
import { EditableText } from "@/components/EditableText";
import profileImage from "@/assets/profile.jpg";

const achievements = [
  { icon: Trophy, id: "ach1", title: "Rank 1 Performance", desc: "Top rank for two consecutive years" },
  { icon: Trophy, id: "ach2", title: "Chess Champion", desc: "Won office-level competition twice" },
  { icon: Trophy, id: "ach3", title: "HackerRank Stars", desc: "Silver 3★ Problem Solving" },
];

const interests = [
  { icon: Gamepad2, id: "int1", title: "Chess", desc: "Elite league player. Strategy is my playground." },
  { icon: Heart, id: "int2", title: "Cricket", desc: "Former college team captain. Weekend warrior." },
  { icon: Music, id: "int3", title: "Music", desc: "Diverse genres keep me in the zone." },
  { icon: Plane, id: "int4", title: "Travel", desc: "50+ places explored and counting!" },
  { icon: BookOpen, id: "int5", title: "Philosophy", desc: "Traditional values, modern perspective." },
];

const lifeLessons = [
  { id: "lesson1", text: "Quality over quantity, always." },
  { id: "lesson2", text: "Stay curious, stay humble." },
  { id: "lesson3", text: "Family first, everything else follows." },
  { id: "lesson4", text: "Hard work beats talent when talent doesn't work hard." },
  { id: "lesson5", text: "Every place has a story. Listen to it." },
];

const About = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div 
              className="w-32 h-32 rounded-full bg-secondary mx-auto mb-8 flex items-center justify-center overflow-hidden border-2 border-border"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={profileImage} alt="Hemanth Poondla" className="w-full h-full object-cover" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4">
              <span className="block h-[1.2em]">
                <TypingText text="About Me" speed={80} />
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
              <motion.span 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-4 w-4" />
                <EditableText id="about_location" defaultValue="Hyderabad, India" className="text-sm text-muted-foreground" />
              </motion.span>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              <EditableText 
                id="about_intro1" 
                defaultValue="A simple guy who loves building things that matter. Born and raised in Hyderabad, deeply rooted in Indian traditions, and endlessly curious about the world."
                className="text-xl text-muted-foreground"
              />
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <EditableText 
                id="about_intro2" 
                defaultValue="When I'm not crafting banking solutions at Temenos, you'll find me plotting my next chess move, planning travel adventures, or cheering for cricket. I believe in working hard, staying grounded, and never stopping learning."
                className="text-muted-foreground"
              />
            </p>
          </motion.div>

          {/* Quick Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20"
          >
            <div className="grid sm:grid-cols-3 gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="text-center p-6 border border-border rounded-2xl hover:border-primary/50 transition-colors"
                >
                  <motion.div 
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 10 }}
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                  <h3 className="font-semibold mb-1">
                    <EditableText id={`${item.id}_title`} defaultValue={item.title} className="font-semibold" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <EditableText id={`${item.id}_desc`} defaultValue={item.desc} className="text-sm text-muted-foreground" />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-serif text-center mb-4">Beyond Code</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              <EditableText id="interests_intro" defaultValue="Life is more than just work. Here's what keeps me going." className="text-muted-foreground" />
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {interests.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-4 border border-border rounded-2xl hover:border-primary/50 transition-colors"
                >
                  <motion.div 
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                  <h3 className="font-semibold text-sm mb-1">
                    <EditableText id={`${item.id}_title`} defaultValue={item.title} className="font-semibold text-sm" />
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    <EditableText id={`${item.id}_desc`} defaultValue={item.desc} className="text-xs text-muted-foreground" />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Travel Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-serif text-center mb-4">
              <span className="block h-[1.2em]">
                <TypingText text="My Travel Footprint" speed={80} pauseTime={3000} />
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              <EditableText 
                id="travel_intro" 
                defaultValue="From the Himalayas to Cape Town, exploring the world one adventure at a time 🌍"
                className="text-muted-foreground"
              />
            </p>
            <TravelMap />
          </motion.div>

          {/* Life Lessons / Wisdom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-serif text-center mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Life Lessons
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              <EditableText id="lessons_intro" defaultValue="Things I believe in. My code of life." className="text-muted-foreground" />
            </p>
            <div className="space-y-4">
              {lifeLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/50 transition-colors"
                >
                  <span className="text-primary font-mono">0{index + 1}</span>
                  <p className="text-muted-foreground italic">
                    "<EditableText id={lesson.id} defaultValue={lesson.text} className="text-muted-foreground" />"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
