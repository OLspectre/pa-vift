import { handleRequest } from "./server/router.js";

// deno run --allow-net --allow-read --allow-write index.js
Deno.serve(handleRequest);

