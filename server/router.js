

import { handleGameRoutes } from "./routes/gameRoutes.js"
import { handleTeamRoutes } from "./routes/teamRoutes.js"
// import { handleLeaderboardRoutes } from "./routes/leaderboardRoutes.js"
import { serveStatic } from "./static.js";

export async function handleRequest(req) {
    // Recieves incoming request and deligates to specifik handler

    const url = new URL(req.url); // req.url = "http://localhost:8000/game/"
    const path = url.pathname;

    if (path.startsWith("/game")) return handleGameRoutes(req);
    if (path.startsWith("/team")) return handleTeamRoutes(req);


    if (path.startsWith("/rounds")) return handleRoundsRoutes(req);
    if (path.startsWith("/leaderboard")) return handleLeaderboardRoutes(req);


    return serveStatic(req); // Om ingen specifik path matchar
}