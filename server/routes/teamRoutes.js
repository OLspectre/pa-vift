

export async function handleTeamRoutes(req) {
    const url = new URL(req);
    const path = url.pathname;
    const method = url.method;

    if (method == "POST" && pathname == "/register") {

        const res = registerValidation(req.body);

        if (res) {
            return window.location.href = "/pages/rules.html";
        }
    }
}