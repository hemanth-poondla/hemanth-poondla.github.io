/**
 * Skill-cluster data — kept free of any three/WebGL imports so SkillSpace can
 * import it without pulling the heavy 3D module into the main bundle. Only
 * SkillGraph3D (dynamically imported) brings in three.
 */
export interface Cluster {
  id: string;
  label: string;
  color: string;
  dir: [number, number, number];
  proof: string;
  skills: string[];
}

const u = (v: [number, number, number]): [number, number, number] => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};

export const CLUSTERS: Cluster[] = [
  { id: "ai", label: "AI / GenAI", color: "#8b7dff", dir: u([0.95, 0.26, 0.32]), proof: "Shipped a RAG docs assistant and AI code-review tooling at Temenos; OpenAI powers Trip Captain.", skills: ["LangChain", "LangGraph", "RAG", "Embeddings", "OpenAI API", "MCP", "Vector Search"] },
  { id: "fe", label: "Frontend", color: "#22d3ee", dir: u([-0.7, 0.66, 0.28]), proof: "6+ years of production banking UI, including a top-ranked Supply Chain Finance redesign.", skills: ["React", "TypeScript", "Tailwind", "UI / UX"] },
  { id: "be", label: "Backend / Data", color: "#4ade80", dir: u([0.24, -0.82, 0.5]), proof: "The APIs and Supabase data layer behind five live products.", skills: ["Node.js", "Supabase", "REST", "SQL"] },
  { id: "domain", label: "Domain", color: "#c99a3a", dir: u([-0.52, -0.32, -0.8]), proof: "Deep Trade Finance and corporate-banking domain knowledge.", skills: ["Trade Finance", "Banking"] },
];
