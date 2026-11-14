export interface RoadmapItem {
  title: string;
  status: "in progress" | "designing";
  eta: string;
  description: string;
  tech: string[];
}

export const building: RoadmapItem[] = [
  { title: "Blog MCP Server", status: "in progress", eta: "Aug 2026", description: "A second MCP server, this one over the travel journal — list, fetch and search posts, plus blog analytics, read-only for any agent.", tech: ["MCP", "Supabase"] },
  { title: "Document RAG Assistant", status: "in progress", eta: "Q4 2026", description: "Retrieval assistant over my travel-research corpus — chunking, embeddings and vector search with cited answers.", tech: ["RAG", "Embeddings", "Vector DB"] },
  { title: "Agentic Trip Planner", status: "designing", eta: "Q1 2027", description: "A LangGraph agent chaining the RAG assistant and MCP tools into a structured, budget-aware trip proposal.", tech: ["LangGraph", "RAG", "MCP"] },
];
