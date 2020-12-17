"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3_proxy_1 = __importDefault(require("s3-proxy"));
if (!process.env['S3_BUCKET']) {
    throw new Error("S3_BUCKET undefined");
}
const s3 = new aws_sdk_1.default.S3();
const app = express_1.default();
const bucket = process.env['S3_BUCKET'];
app.get('/', async (_req, res) => {
    const objs = await s3.listObjectsV2({ Bucket: bucket }).promise();
    res.contentType('text/html');
    console.log(objs);
    const content = objs.Contents.map(item => `<a href="${item.Key}">${item.Key}</a><br/>`).join('');
    console.log(content);
    res.end('<!doctype html><html><head></head><body>' + content + '</body></html>');
});
app.get('/*', (req, res, next) => {
    console.log(req.headers);
    next();
}, s3_proxy_1.default({
    bucket: bucket,
    proxyKey: false,
}));
app.listen(3000);
console.log('app listening on port 3000');
