# dlc

Node.js based download code service.

## Usage

1. Put your goodies on `/contents` directory.
2. Create an app with `heroku` and setup code and files via `heroku config`.

```
heroku create
heroku config:set DLC_CODE=SecretDownloadCode DLC_FILENAME=goodies.zip
```

3. Deploy your app with `git`.

```
git add .
git commit -m 'DLC'
git push heroku master
```

Now you can download the content with code `SecretDownloadCode`:

```
curl -O http://<now-url>/download?code=SecretDownloadCode
```