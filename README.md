# Sample-Node-Server

A node server with following routes

  - login - user login
  - createjsonpatch - patch a given json with a given patch
  - createthumbnail - takes a image url and converts to thumbnail



### Requirement

This required following to work properly:

* [system] - 64bit prefered
* [node.js] - version 6 lts +
### Environment variables

This app is currently supports following environment variables

| Variable | Description | Default value
| ------ | ------ | ------ |
| TOKEN_SECRET | Secret value to sign jwt tokens | pretty-little-secret
| TOKEN_EXPIRES_IN | jwt token expiry time | 2h
| APP_PORT | Port on which server need to listen | 7000
| LOG_LEVEL | [Logging levels](https://github.com/winstonjs/winston#logging-levels) for app  | info

### Installation

This app requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
```
If for some reason npm install fails while using node-glyp while installing a module called spark, please follow [spark installation](http://sharp.dimens.io/en/stable/install/). Mostly is works on most 64 system out of box.

To run test
```sh
$ npm test
```

To start the server
```sh
$ npm start
```
### Docker
This app-server is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 7000 (or what ever configred via env vars), so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
docker build -t uzil/demo-server .
```
This will create the dillinger image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 7000 of the Docker:

```sh
docker run -d -p 8000:7000 --restart="always" uzil/demo-server
```

### Docker hub

You can fetch the container directly from hub.docker.com
```sh
docker pull uzil/demo-server
```
And run

