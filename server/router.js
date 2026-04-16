

import { handleGameRoutes } from "./routes/gameRoutes.js"
import { handleRoundsRoutes } from "./routes/roundsRoutes.js"
import { handleLeaderboardRoutes } from "./routes/leaderboardRoutes.js"
// import { serveStatic } from "./static.js" serva statiska html?

export async function handleRequest(req) {
    // Recieves incoming request and deligates to specifik handler

    const url = new URL(req.url); // req.url = "http://localhost:8000/game/x"
    const path = url.pathname;

    if (path.startsWith("/game")) return handleGameRoutes(req);
    if (path.startsWith("/rounds")) return handleRoundsRoutes(req);
    if (path.startsWith("/leaderboard")) return handleLeaderboardRoutes(req);


    return new Response("Not found", { status: 404 })
}