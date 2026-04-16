import { serveDir } from "jsr:@std/http/file-server";

export function serveStatic(req) {

    return serveDir(req, {
        fsRoot: "../client",
        urlRoot: ""
    })

}