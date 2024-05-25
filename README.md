<h1 align="center">BeAPIzer</h1>

<br>

`BeAPIzer` is a generic back end api for CRUD applications that comes with k8s pre-integration and TLS support.<br>
Users that are looking for quick api prototyping using a real database, will now be able to quickly create highly customizable, production ready CRUD apis for their front end applications.<br>

Beeing at early development stages, the project comes already with full `mongodb` support. <br>
Still, we are aiming to hopefully include integrations with all kinds of data sources and streaming technologies in the futures including relational databases, NoSql databases, files, data streaming frameworks to name a few.<br>

Besides, we are working on `OpenApi` and `AsyncApi` support as well in order to be in line with the latest API standards.<br>

For the record, the project was initially created based on a need of a tool that help quickly prototyping production-like APIs to accelerate front end development. It has then evolved into something that we deemed worth sharing with the community.<br>

Please support the project and do not hesiate to contribute. <br>

## Create backend CRUD APIs

`BeAPIzer` allows the creation of CRUD apis using entity definitions. <br>
The creation workflow is described in the first six steps:
1. clone `beapizer` project
2. Customize the project by creating specific business entities and plainge them into a new dedicated folder (for instance, the example that comes with `beapizer` uses a folder named `$workingFolder/beapizer/beapizer-test/` as a placeholder for the customizations) 
3. register your entities using the `beapizer` singleton `entity-api-metadata-registrator` as done in `$workingFolder/beapizer/beapizer-test/register-entities.js`
4. bootstrap a `beapizer-server` in a seperate entrypoint file as detailed in `$workingFolder/beapizer/beapizer-test/beapizer-service.js`. This file will be the execution entrypoint of your api server(ex. `node beapizer-test/beapizer-service.js`). 
> Your api server will need to have all the entities available beforehand so you may want to register them first then import `beapizer-server`. (look at `node beapizer-test/beapizer-service.js` to build some intuitions)
5. update the existing k8s deployment file with your business specific parameters as described below:
    -   `API_ROOT_RESOURCE_PATH`: the root api URL (ex: `/myapi/v1`).
    -   `MAX_PAGE_SIZE`: maximum number of element retrieved from the data source in a GET query
    -   `SERVER_TIMEOUT`: the api timeout
    -   `DS_DIALECT`: the datasource dialect (currently only `mongodb` is supported)
    -   `DS_URL`: the datasource connection URL
    -   `CERT_KEY`: the tls certification key full location path. (Optional)
    -   `CA_CERT`: the root certificate full location path.(Optional)
    -   `TLS_CERT`: the server certificate full location path.(Optional)
6. build a container image & deploy it to kubernetes. Use the `Dockerfile` and the `k8s deployment file` that are already available in the `beapizer` project.
7. Query your API. [Further readings are available here about the api request specifications (pagination, page size limit, retrived fields, filters, composite fields retrieval...)](docs/beapizer-query-specification.md)

## TLS support
`BeAPIzer` supports self-signed certificates as well as CA-Signed certificates.<br>
The certificate locations are configured using the following environment variables:
-   `CERT_KEY`: the tls certification key full location path. (Optional)
-   `CA_CERT`: the root certificate full location path.(Optional)
-   `TLS_CERT`: the server certificate full location path.(Optional)

Further details about creating Self-Signed and CA-Signed Certificates for your development API server can be found in the [certificate section](docs/certificate-creation.md).


## API Customizations

In order to create your own entities CRUD API, you may want to create your customization in a seperate folder as depicted in the folder `beaper-test`.<br>
The customization process is made up of three parts:
1.  implement your entities as shown in the beapizer example `beapizer-test/models\`
2.  register your entities using `EntityAPIMDataRegistrator` class that comes bundled within `beapizer` (as shown in `beapizer-test/register-entities.js`)
3.  create your api service by importing your registered entities along with the beapizer server (as done in `beapizer/beapizer-service.js`). Please keep the exact order of import as the api server will need the entities to be registered beforehand.


You may want to look at the example that comes bundled within this project- in the following location `beapizer-test`- to build some intuitions regarding the overall usages and the available capabilities of `BeAPIzer`. <br>

## Project Roadmap
Depending on the priorities, these are the main features that are likely to be implemented in the futures:
1. Oath2 support
2. New data sources support (relational databases, NoSql databases, files, data streaming frameworks)
3. `OpenAPI` and `AsyncAPI` support (latest versions)
4. Code generation capabilities using `OpenAPI`/`AsyncAPI` definitions
5. Support for deployment on cloud providers (`aws`, `azure` and `gcp`)
6. Support for other programming languages such as `python`, `Golang` and `java` (But does it really matter!?)

## Contributors

Pull requests are always welcome! Please base pull requests against the `main` branch and follow the [contributing guide](https://github.com/houcemlaw/beapizer/blob/main/CONTRIBUTING.md).

## Run the project locally

### Prerequisite

Since we are using k8s for deploying the application, we are creating the application container image using `podman` but feel free to use any container build tool that is available to you such as `docker`. <br>

Execute the following script to generate and import the container image into k8s reachable local repository:

> Note that we are using the version `1.0.0` for the build, but you may want to update your application version accordingly before proceeding to the build.

```sh
version=1.0.0
sh build-local.sh $version
```

### Deploy your application to Kubernetes

#### Prerequisites

You should have already created a fully configured kubernetes environment in order to be able to proceed further. <br>

#### Deploy and expose internally - ClusterIP service

The deployment file `beapizer-clusterip.yaml` will create a deployment with 1 replicas and expose it internally through a ClusterIP service.<br/>

```sh
kubectl apply -f beapizer-clusterip.yaml
```

#### Deploy and expose externally - NodePort service

The deployment file `beapizer-nodeport.yaml` will create a deployment with 1 replicas and expose it externally through a NodePort service.<br/>

```sh
kubectl apply -f beapizer-nodeport.yaml
```

### Other considerations

Although default deployment files come with extensive properties such as resource quotas and logging, they rely on the local registry for pulling images.<br>
So, according to your needs, you may want to modify these deployment files in order to meet your application requirements (pull from remote registry, deployment replicas, deployment strategy, serviceaccount, resources quotas, logging, volumes, persistentvolumes, namespaces, services, ports, network policies...) .<br>





