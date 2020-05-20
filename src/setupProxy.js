const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        "/livy",
        proxy({
            target: "http://172.30.11.127:8998",
            changeOrigin: true,
            pathRewrite: {
                "^/livy": "/"
            }
        })
    );
};
