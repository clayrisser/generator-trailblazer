# trailblazer _Alpha_

A pragmatic implementation of TrailsJS for rapid development

Loosely based on a SailsJS workflow

Please &#9733; this repo if you found it useful &#9733; &#9733; &#9733;

## Features
* Automatic restart during development
* Built in oAuth and Registration
* Automatic API documentation with swagger
* Custom responses
* Boom error handling
* Automatic endpoint creation with footprints
* Express for the server
* Waterline for the ORM
* Mongo for the database
* Super efficient docker support


## Setup

```sh
sudo yarn global add generator-trailblazer # or `sudo npm install -g generator-trailblazer`
mkdir my-app
yo trailblazer
cd my-app
yarn start # or `npm start`
```


## Dependencies

* [Docker](https://www.docker.com/)
* [NPM](https://nodejs.org/)
* [Node](https://www.npmjs.com/)


## Usage

### Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Start the development server          |
| `npm run data`  | Run the database                      |
| `npm run lint`  | Lint the code                         |
| `npm run test`  | Test the code                         |
| `npm run build` | Build the docker container            |
| `npm run run`   | Run the docker container              |
| `npm run ssh`   | SSH into the docker container         |
| `npm run essh`  | SSH into the running docker container |
| `npm run push`  | Push the docker container             |

### Clustering

You can cluster the docker container across multiple servers using an orchestration platform

#### [Docker Swarm](https://docs.docker.com/engine/swarm/)

```sh
docker stack deploy --compose-file ./docker-compose.yml trailblazer
docker service scale trailblazer_some-trailblazer=3
```

#### [Rancher](http://rancher.com/)

##### Without Internal Load Balancer

_docker-compose.yml_
```yml
some-trailblazer:
  image: jamrizzi/trailblazer:latest
  ports:
    - 80:3000
  links:
    - some-mongo:db
    
some-mongo:
  image: mongo:latest
  volumes:
    - /volumes/trailblazer_some-trailblazer:/data/db
```

_rancher-compose.yml_
```yml
some-trailblazer:
  scale: 3
```

##### With Internal HaProxy Load Balancer

_docker-compose.yml_
```yml
some-trailblazer:
  image: jamrizzi/trailblazer:latest
  links:
    - some-mongo:db
    
some-mongo:
  image: mongo:latest
  volumes:
    - /volumes/trailblazer_some-trailblazer:/data/db
    
load-balancer:
  image: rancher/lb-service-haproxy:v0.7.1
  ports:
    - 80:80/tcp
  labels:
    io.rancher.container.agent.role: environmentAdmin
    io.rancher.container.create_agent: 'true'
```

_rancher-compose.yml_
```yml
some-trailblazer:
  scale: 3
load-balancer:
  start_on_create: true
  lb_config:
    port_rules:
    - hostname: trailblazer.example.com
      path: ''
      protocol: http
      service: trailblazer/some-trailblazer
      source_port: 80
      target_port: 3000
```

#### [Kubernetes](https://kubernetes.io/)

#### [Mesos](http://mesos.apache.org/)

### External Database

If you want to use an external database instead of the linked mongo container, override the following environment variables

| Name           | Default Value | Description                      |
| -------------- | ------------- | -------------------------------- |
| MONGO_HOST     | 'db'          | Host for mongo database          |
| MONGO_PORT     | 27017         | Port for mongo database          |
| MONGO_DATABASE | 'trailblazer' | Database name for mongo database |


## Support

Submit an [issue](https://github.com/jamrizzi/trailblazer/issues/new)


## Buy Me Coffee

A ridiculous amount of coffee was consumed in the process of building this project.

Add some fuel at [coffee.jamrizzi.com](https://coffee.jamrizzi.com/) if you'd like to keep me going!


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

[MIT License](https://github.com/jamrizzi/readme/blob/master/LICENSE)

[Jam Risser](https://jamrizzi.com) &copy; 2017


## Credits

* [Jam Risser](https://jamrizzi.com) - Author
* Built with [TrailsJS](https://trailsjs.io/)
* Loosly based on [SailsJS](http://sailsjs.com/)


## Changelog

0.0.3 (2017-08-17)
* Added docker support

0.0.3 (2017-08-05)
* Refactored to es6

0.0.1 (2017-02-24)
* Initial release
