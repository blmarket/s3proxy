import express from 'express';
import AWS from 'aws-sdk';
import s3Proxy from 's3-proxy';

if (!process.env['S3_BUCKET']) {
  throw new Error("S3_BUCKET undefined");
}

const s3 = new AWS.S3();
const app = express();
const bucket = process.env['S3_BUCKET'];

app.get('/', async (_req, res) => {
  const objs = await s3.listObjectsV2({ Bucket: bucket }).promise();
  res.contentType('text/html');
  console.log(objs);
  const content = objs.Contents!.map(item => `<a href="${item.Key}">${item.Key}</a><br/>`).join('');
  console.log(content);
  res.end('<!doctype html><html><head></head><body>' + content + '</body></html>');
});

app.get('/*', (req, res, next) => {
  console.log(req.headers);
  next();
}, s3Proxy({
  bucket: bucket,
  proxyKey: false,
}));

app.listen(3000);
console.log('app listening on port 3000');
