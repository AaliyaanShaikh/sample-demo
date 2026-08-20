/**
 * Next.js uses `.next` for both `next dev` and `next build`. Running a production
 * build while the dev server is up races on that folder and often breaks the site
 * (500s, missing CSS, ENOENT manifests).
 *
 * Skip: SKIP_BUILD_GUARD=1 npm run build
 * Port: BUILD_GUARD_PORT=3001 npm run build
 */
import net from "node:net";

const port = process.env.BUILD_GUARD_PORT ?? process.env.PORT ?? "3001";

if (process.env.SKIP_BUILD_GUARD === "1") {
  process.exit(0);
}

function isPortOpen(host, portNum) {
  return new Promise((resolve) => {
    const socket = net.createConnection({
      port: Number(portNum),
      host,
    });
    socket.setTimeout(500);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

const busy = await isPortOpen("127.0.0.1", port);

if (busy) {
  console.error(`
[!] Something is already listening on port ${port} (often \`npm run dev\`).

    Building now would write to the same ".next" directory the dev server uses and
    can corrupt it — blank pages, raw HTML, Internal Server Error, missing CSS.

    Fix:
      1. Stop the dev server (Ctrl+C in that terminal)
      2. Run: npm run build

    If you must build anyway:
      SKIP_BUILD_GUARD=1 npm run build
`);
  process.exit(1);
}

process.exit(0);
