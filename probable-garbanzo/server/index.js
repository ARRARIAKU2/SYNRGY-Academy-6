"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("node:http"));
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const WEBSITE_URL = "http://localhost:3000";
function serveHtml(res, filename) {
    const home = fs.readFileSync(path.join(__dirname, "..", "public", `${filename}.html`), { encoding: "utf8" });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
}
function notFound(res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found!" }));
}
const contentTypeDefault = {
    ".css": "text/css",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpg",
    ".png": "image/png",
    ".js": "text/javascript",
};
function getURL(req) {
    const url = new URL(`${WEBSITE_URL}${req.url}`);
    return url;
}
const server = http.createServer((req, res) => {
    var _a;
    const reqUrl = (_a = req.url) !== null && _a !== void 0 ? _a : "";
    const url = getURL(req);
    if (req.method === "POST") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Berhasil Ditambahkan!" }));
        return;
    }
    const publicFolder = ["css", "images", "scripts"];
    const isAccesingPublicFolder = publicFolder.some((folder) => reqUrl.includes(folder));
    if (isAccesingPublicFolder) {
        const fileText = fs.readFileSync(path.join(__dirname, "..", "public", reqUrl));
        const extName = path.extname(reqUrl);
        res.writeHead(200, { "Content-Type": contentTypeDefault[extName] });
        res.end(fileText);
        return;
    }
    switch (url.pathname) {
        case "/":
            serveHtml(res, "index");
            break;
        case "/cars":
            serveHtml(res, "cars");
            break;
        default:
            notFound(res);
    }
});
server.listen(3000);
