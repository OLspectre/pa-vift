// import { getClue, submitAnswer } from "../controllers/gameController.js"

export async function handleGameRoutes(req) {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    if (method === "GET" && path === "/game/clue") return getClue(req)

        
    if (method === "POST" && path === "/game/answer") return submitAnswer(req)

    return new Response("Not found", { status: 404 })
}