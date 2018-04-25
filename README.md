# dlc

Next.js based downloadable contents (DLC) distribution service.

## Usage

1.  Put your goodies on `/contents` directory.
2.  Create an app with `heroku create` and setup code and files via `heroku config`.

```
heroku create
heroku config:set DLC_CODE=SecretDownloadCode DLC_FILENAME=goodies.zip
```

3.  Deploy your app with `git push`.

```
git add .
git commit -m 'dlc'
git push heroku master
```

Now you can download the content with code `SecretDownloadCode`:

```
curl -O http://<heroku-app-url>/download?code=SecretDownloadCode
```

## Development

```
yarn install
yarn run dev
```
