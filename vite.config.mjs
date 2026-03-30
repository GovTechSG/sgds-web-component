import { defineConfig, createLogger } from "vite";
import postcssLit from "rollup-plugin-postcss-lit";
import replace from "@rollup/plugin-replace";
import fs from "fs";
import path from "path";

const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
  if (msg.includes("Default and named imports from CSS files are deprecated")) return;
  originalWarning(msg, options);
};

export default defineConfig({
  plugins: [
    replace({
      ".css": ".css?inline",
      preventAssignment: true
    }),
    postcssLit({ include: ["**/*.css", "**/*.css?*"] }),
    {
      name: "playground-middleware",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use("/api/playground-files", (req, res, next) => {
          try {
            const playgroundDir = path.resolve("./playground");
            const files = [];

            const recursivelyFindHtmlFiles = (dir, folderName = null) => {
              const entries = fs.readdirSync(dir, { withFileTypes: true });
              entries.forEach(entry => {
                if (
                  entry.isFile() &&
                  entry.name.endsWith(".html") &&
                  entry.name !== "index.html" &&
                  !entry.name.startsWith(".")
                ) {
                  files.push({
                    filename: entry.name,
                    folder: folderName,
                    url: folderName ? `./playground/${folderName}/${entry.name}` : `./playground/${entry.name}`,
                    title: entry.name.replace(".html", "")
                  });
                } else if (entry.isDirectory() && !entry.name.startsWith(".")) {
                  recursivelyFindHtmlFiles(path.join(dir, entry.name), entry.name);
                }
              });
            };

            recursivelyFindHtmlFiles(playgroundDir);
            files.sort((a, b) => {
              if (a.folder !== b.folder) {
                return (a.folder || "").localeCompare(b.folder || "");
              }
              return a.title.localeCompare(b.title);
            });

            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(files));
            console.log(files.length);
          } catch (error) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: [
      {
        find: /^~(.*)$/,
        replacement: "$1"
      }
    ]
  },
  define: {
    "process.env.VITE_ENV": JSON.stringify(process.env.VITE_ENV)
  },
  customLogger: logger,
  build: {
    cssCodeSplit: false
  }
});
