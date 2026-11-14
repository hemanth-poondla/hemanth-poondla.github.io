import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { SystemsTabs } from "@/components/home/SystemsTabs";
import { Products } from "@/components/home/Products";
import { Roadmap } from "@/components/home/Roadmap";
import { AboutStrip } from "@/components/home/AboutStrip";
import { Travel } from "@/components/home/Travel";
import { Cta } from "@/components/home/Cta";

const Index = () => (
  <Layout secondaryGlow>
    <Hero />
    <SystemsTabs />
    <Products />
    <Roadmap />
    <AboutStrip />
    <Travel />
    <Cta />
  </Layout>
);

export default Index;
