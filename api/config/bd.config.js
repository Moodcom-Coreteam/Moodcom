module.exports = {
    db: {
        dev: "mongodb://127.0.0.1:27017/test_projet",
        prod: {
            mongo: "mongodb://root:polytech69@51.91.121.249:27017/moodcom",
            auth: "?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false"
        }
    }
}