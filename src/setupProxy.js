const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        "/livy",
        proxy({
            target: "http://localhost:8998",
            changeOrigin: true,
            pathRewrite: {
                "^/livy": "/"
            }
        })
    );
    
    app.use(
        "/imports",
        proxy({
            target: "http://localhost:8000",
            changeOrigin: true,
            pathRewrite: {
                "^/imports": "/"
            }
        })
    );
};