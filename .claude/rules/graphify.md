# Graphify knowledge graph

- For questions about architecture, file relationships, or "where does X live / what uses X", use the `graphify` skill first.
- If `graphify-out/` has no `graph.json`, run `/graphify .` once before answering, then query the graph.
- If `graphify-out/graph.json` exists, read `graphify-out/GRAPH_REPORT.md` and query the graph before grepping the codebase.
- After large refactors (new modules, moved files), rerun `/graphify .` to refresh the graph.
- Never read `graphify-out/cache/` directly.
