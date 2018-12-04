#!/bin/bash
cd /Users/claire/personfilter
npm run build
zip -q -r dist.zip dist
scp dist.zip root@server2:/usr/local/nginx
