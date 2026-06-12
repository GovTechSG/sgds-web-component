import { createServer, type ViteDevServer } from "vite";

export async function startViteServer(port: number): Promise<ViteDevServer> {
  const server = await createServer({
    server: { port, strictPort: true }
  });
  await server.listen();
  console.log(`Vite dev server running at http://localhost:${port}`);
  return server;
}

export async function stopViteServer(server: ViteDevServer): Promise<void> {
  await server.close();
  console.log("Vite dev server stopped.");
}
