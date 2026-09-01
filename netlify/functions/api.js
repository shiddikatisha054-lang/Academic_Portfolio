const portfolioData = require("../../data.json");

const json = (statusCode, body) => ({
    statusCode,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
});

exports.handler = async function (event) {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS"
            },
            body: ""
        };
    }

    if (event.httpMethod !== "GET") {
        return json(405, { message: "Method not allowed" });
    }

    const requestPath = new URL(event.rawUrl || "https://localhost" + event.path).pathname;
    const path = requestPath.replace(/^\/api\/?/, "").replace(/\/$/, "");

    if (path === "") {
        return json(200, {
            message: "Academic Portfolio REST API is running.",
            endpoints: ["/api/profile", "/api/education", "/api/skills", "/api/projects", "/api/projects/:id"]
        });
    }

    if (path === "profile") return json(200, portfolioData.profile);
    if (path === "education") return json(200, portfolioData.education);
    if (path === "skills") return json(200, portfolioData.skills);
    if (path === "projects") return json(200, portfolioData.projects);

    const projectMatch = path.match(/^projects\/(\d+)$/);
    if (projectMatch) {
        const project = portfolioData.projects.find((item) => item.id === Number(projectMatch[1]));
        return project ? json(200, project) : json(404, { message: "Project not found" });
    }

    return json(404, { message: "Endpoint not found" });
};
