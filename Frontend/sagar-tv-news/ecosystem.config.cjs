module.exports = {
    apps: [
        {
            name: "myapp",
            script: "npm run preview",
            env: {
                PORT: 4173,
                NODE_ENV: "production",
            },
        },
    ],
};
