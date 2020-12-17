S3Proxy
-------

Proxy s3 contents using your web server.

### Why?

* If you're using AWS Lightsail, it will save a bit of money as proxied traffic
  won't get charged under 1TB/month/3.5USD lightsail quota.
* It provides pretty decent file listing, which can serve a great media
  repository server, while freeing up your disk space in Lightsail.
  
### Features

It supports proxy of HTTP Range headers, which allows you to browse back and
forth without heavy loading/buffering.

### How?

S3_BUCKET=<your-bucket-name> node dist/index.js

### License

Great AGPL-3.0-or-later, so feel free to fork and release your version! (with
same AGPL-3.0-or-later license)
