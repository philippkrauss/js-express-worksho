# Section 9: Serving Static Files
see https://expressjs.com/en/4x/api.html#express.static

`curl http://localhost:3000/assets/test.txt`

## Example: ETag handling
configure express using etag: true

```
curl -i http://localhost:3000/assets/test.txt                                             
...
ETag: W/"12-180e182d832"
...
```
`curl -i --header 'If-None-Match: W/"12-180e182d832"' http://localhost:3000/assets/test.txt`
