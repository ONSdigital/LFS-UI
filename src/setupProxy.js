
const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        "/sessions",
        proxy({
            target: "http://172.21.187.231:8998",
            changeOrigin: true
        })
    );
};
