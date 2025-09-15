MCP Tools for LionSTour

This repository includes ready‑to‑use Model Context Protocol (MCP) server configurations to give your AI assistants safe, scoped tools for working with this codebase.

Included servers
- filesystem: Read/write within this repo only (scoped via basePath).
- git: Inspect repo history, diffs, branches, and status.
- postgres (optional): Query your local DB using `DATABASE_URL`.

How to use
1) OpenAI App / Workbench
   - Copy `.mcp/openai.mcp.json` to your OpenAI MCP config location, or paste its `mcpServers` block into your existing config.
   - Replace `<ABSOLUTE_REPO_PATH>` with your local path to this repo.
   - Ensure `npx` is available, and install servers on first run as needed.

2) Claude Desktop
   - Copy `.mcp/claude.mcp.json` into your Claude config (merging with your existing config):
     • macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
     • Windows: `%APPDATA%/Claude/claude_desktop_config.json`
     • Linux: `~/.config/Claude/claude_desktop_config.json`
   - Replace `<ABSOLUTE_REPO_PATH>` with your local path to this repo.

3) Continue (VS Code / JetBrains)
   - Add the contents of `.mcp/continue.mcp.yaml` under `mcpServers` in your `.continue/config.yaml`.
   - `${workspaceFolder}` expands to your current project folder; no path edits needed.

Postgres server (optional)
- Requires `uv` (preferred) or Python with `mcp-server-postgres` installed. Set `DATABASE_URL` in your shell or `.env.local`.
- Enable by removing `disabled: true` in the template and ensuring the command is available (e.g., `uvx mcp-server-postgres`).

Security notes
- Do not commit secrets. The templates reference `DATABASE_URL` but do not include values.
- Filesystem and git servers are scoped to this repository path; review before enabling write access in your client.

Troubleshooting
- First run may prompt to install servers: `npx -y @modelcontextprotocol/server-filesystem` and `npx -y @modelcontextprotocol/server-git`.
- If a server fails to start, ensure the command exists on your PATH and the base path is correct.

