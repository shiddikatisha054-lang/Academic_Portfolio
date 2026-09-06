const express = require("express");
const portfolioData = require("./data.json");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/api", function (request, response) {
    response.json({
        message: "Academic Portfolio REST API is running.",
        endpoints: ["/api/profile", "/api/education", "/api/skills", "/api/projects", "/api/projects/:id"]
    });
});

app.get("/api/profile", function (request, response) {
    response.json(portfolioData.profile);
});

app.get("/api/education", function (request, response) {
    response.json(portfolioData.education);
});

app.get("/api/skills", function (request, response) {
    response.json(portfolioData.skills);
});

app.get("/api/projects", function (request, response) {
    response.json(portfolioData.projects);
});

app.get("/api/projects/:id", function (request, response) {
    const projectId = Number(request.params.id);

    const project = portfolioData.projects.find(function (item) {
        return item.id === projectId;
    });

    if (project) {
        response.json(project);
    } else {
        response.status(404).json({
            message: "Project not found"
        });
    }
});

app.listen(PORT, function () {
    console.log("Server is running on http://localhost:" + PORT);
});
