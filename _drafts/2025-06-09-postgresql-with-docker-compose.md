---
title: "Illustrated Guide to Postgres with Compose"
slug: illustrated-compose-postgres
date: 2025-06-08
layout: default
---

`sqlx` is a package for Go which provides a set of extensions on top of the excellent built-in `database/sql` package.

Examining Go idioms is the focus of this document, so there is no presumption being made that any SQL herein is actually a recommended way to use a database. It will not cover setting up a Go development environment, basic Go information about syntax or semantics, or SQL itself.

Finally, the standard `err` variable will be used to indicate that errors are being returned, but for brevity they will be ignored. You should make sure to check all errors in an actual program.

- How to run postgres using docker?
- Which size to give the container?
- How to persist data?
    - Init scripts?
    - Best practices?
    - Production ready?

---

- Run a local containerized database
- Access the shell of a containerized database
- Connect to a containerized database from your host
- Connect to a containerized database from another container
- Persist database data in a volume
- Build a customized database image
- Use Docker Compose to run a database

---

- PostgreSQL ("Postgres") is an object-relational database management system
- As a database server, its primary function is to store data, securely and supporting best practices, and retrieve it later, as requested by other software applications, be it those on the same computer or those running on another computer across a network (including the Internet)
- It can handle workloads ranging from small single-machine applications to large Internet-facing applications with many concurrent users
- Recent versions also provide replication of the database itself for security and scalability
- The image's page provides detailed instructions on how to run the container, customize your setup, and configure the database according to your needs
    - https://hub.docker.com/_/postgres
- 

---

- Using a local containerized database offers flexibility and ease of setup, letting you mirror production environments closely without the overhead of traditional database installations
- Docker simplifies this process, enabling you to deploy, manage, and scale databases in isolated containers with just a few commands
- The PostgreSQL Docker Official Image is available on Docker Hub
- Docker Official Images are a curated set images that follow best practices, ensuring that you have access to the latest features and security updates

- When you have a database running inside a Docker container, you may need to access its shell to manage the database, execute commands, or perform administrative tasks
- Docker provides a straightforward way to do this using the docker exec command
- Additionally, if you prefer a graphical interface, you can use Docker Desktop's GUI

```bash
docker exec \
    -it some-postgres \
    bash
```

- `docker exec` tells Docker you want to execute a command in a running container
- `-it` ensures that the terminal you're accessing is interactive, so you can type commands into it
- `some-postgres` is the name of your PostgreSQL container
- If you named your container differently when you ran it, use that name instead
- `bash` is the command you want to run inside the container
- It opens up a bash shell that lets you interact with the container's file system and installed applications
- After executing this command, you will be given access to the bash shell inside your PostgreSQL container, from which you can manage your PostgreSQL server directly
- You can run exit to return to your terminal
- Once you've accessed the container's terminal, you can run any tools available in that container (like `psql`)

- Connecting to a containerized database from your host machine involves mapping a port inside the container to a port on your host machine
- This process ensures that the database inside the container is accessible via the host machine's network
- For PostgreSQL, the default port is 5432
- By exposing this port, you can use various database management tools or applications on your host machine to interact with your PostgreSQL database

```bash
docker run \
    --name some-postgres \
    -p 5433:5432
    -e POSTGRES_PASSWORD=mysecretpassword \
    -d postgres:17.5
```

- `-p 5433:5432` maps port 5433 on the host to port 5432 in the container
- To verify the port is mapped, run `docker ps`
- Now any application running on your host can access the PostgreSQL service in the container at localhost:5433

- Connecting to a containerized database from another container is also common
- Docker's networking capabilities make it easy to establish this connection without having to expose the database to the host network
- This is achieved by placing both the database container and the container that needs to access it on the same Docker network
- Create a Docker network named my-network:

```bash
docker network \
    create my-network
```

- Run your database container and specify the network using the `--network` option
- This runs the container on the my-network network

```bash
docker run \
    --name some-postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    --network my-network \
    -d postgres:17.5
```

- Run your other containers and specify the network using the `--network` option
- Persisting database data in a Docker volume is necessary for ensuring that your data survives container restarts and removals
- A Docker volume lets you store database files outside the container's writable layer, making it possible to upgrade the container, switch bases, and share data without losing it
- To run your database container with a volume attached, include the `-v` option with your docker run command, specifying a volume name and the path where the database stores its data inside the container
- If the volume doesn't exist, Docker automatically creates it for you.
- Run the container and attach the volume:

```bash
docker run \
    --name some-postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    --network my-network \
    -v my-db-volume:/var/lib/postgresql/data \
    -d postgres:17.5
```

- This command mounts the volume named `my-db-volume` to the `/var/lib/postgresql/data` directory in the container
- Stop and remove the container:

```bash
docker remove \
    --force some-postgres
```

- Without a volume, the table you created would be lost when removing the container
- Start a new container with the volume attached:

```bash
docker run \
    --name some-postgres \
    -v my-db-volume:/var/lib/postgresql/data \
    -d postgres:17.5
```

- This time, you don't need to specify any environment variables as the configuration is saved in the volume
- At this point, any PostgreSQL container that mounts the `my-db-volume` will be able to access and save persisted data

- Customizing your database image lets you include additional configuration, scripts, or tools alongside the base database server
- This is particularly useful for creating a Docker image that matches your specific development or production environment needs
- The following example outlines how to build and run a custom PostgreSQL image that includes a table initialization script
- To build and run your custom image:
    1. Create a file named `Dockerfile` in your project directory
    2. Create a script file to initialize a table in the database

```sql
CREATE TABLE IF NOT EXISTS mydb.myothertable (
  column_name VARCHAR(255)
);

INSERT INTO mydb.myothertable (column_name) VALUES ('other_value');
```

```yaml
# syntax=docker/dockerfile:1

# Use the base image postgres:17.5
FROM postgres:17.5

# Set environment variables
ENV POSTGRES_DB mydb

# Copy custom scripts or configuration files from your host to the container
COPY ./scripts/ /docker-entrypoint-initdb.d/
```

- You use the `COPY` instruction to add custom configuration files or scripts into the container
- In this example, files from your host's `./scripts/` directory are copied into the container's `/docker-entrypoint-initdb.d/` directory
- In this directory, `.sh`, `.sql`, and `.sql.gz` scripts are executed when the container is started for the first time

- Run the following command to build the image:

```bash
docker build -t my-custom-postgres .
```

- The period (.) at the end of the command specifies the current directory as the context for the build, where Docker looks for the Dockerfile and any other files needed for the build
- Run your image:

```bash
docker run \
    --name some-postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -d my-custom-postgres
```

- Verify that your container is running:

```bash
docker ps
```

- Verify that your initialization script was ran:

```bash
docker exec \
    some-postgres psql \
    -u root \
    -p mysecretpassword \
    -e "SELECT * FROM mydb.myothertable;"
```

- You should see output like the following:

```bash
column_name
other_value
```

- There is no volume mounted for the `my-custom-postgres` image
- Any container ran using your `my-custom-postgres` image will have the table initialized when first started

- Docker Compose is a tool for defining and running multi-container Docker applications
- With a single command, you can configure all your application's services (like databases, web apps, etc.) and manage them
- To run your containers with Docker Compose:
    1. Create a Docker Compose file (`compose.yaml`) in your project directory; this file will define the services, networks, and volumes
    2. Run Docker Compose using the `docker compose up` command

```yaml
services:
  db:
    image: postgres:17.5
    restart: always
    environment:
      POSTGRES_PASSWORD: my-secret-pw
      POSTGRES_DB: mydb
    ports:
      - 5433:5432
    volumes:
      - my-db-volume:/var/lib/postgresql/data

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    depends_on:
      - db

volumes:
  my-db-volume:
```

- `db` is the name of the service
- `image: postgres:17.5` specifies that the service uses the latest PostgreSQL image from Docker Hub
- `environment` lists the environment variables used by PostgreSQL to initialize the database, such as the root password and the database name
- `ports` maps port 5433 on the host to port 5432 in the container, allowing you to connect to the database from your host machine
- `volumes` mounts my-db-volume to `/var/lib/postgresql/data` inside the container to persist database data
- In addition to the database service, there is an `adminer` service
- By default Compose sets up a single network for your app
- Each container for a service joins the default network and is both reachable by other containers on that network, and discoverable by the service's name

---

- 

## Resources

You will want to install Docker and Docker Compose if not already installed on your system:

    - ...

There are other resources of excellent information about using PostgreSQL with Docker:
    
    - [https://docs.docker.com/guides/databases/](https://docs.docker.com/guides/databases/)
    - [https://github.com/docker/awesome-compose/tree/master/postgresql-pgadmin](https://github.com/docker/awesome-compose/tree/master/postgresql-pgadmin)

- If you need help getting started with Docker itself, I recommend these resources:
    
    - ...

## Getting started

- 

### Running a Postgres instance

- You can start a Postgres container using the CLI:

```bash
docker run \
    --name some-postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -d postgres:17.5
```

- `--name some-postgres` assigns the name `some-postgres` to the container
- `-e POSTGRES_PASSWORD=mysecretpassword` sets the superuser password for PostgreSQL to `mysecretpassword`

### Environment variables

- The Docker Official PostgreSQL image can be used with several environment variables
- Docker specific variables will only have an effect if you start the container with a data directory that is empty
- Any pre-existing database will be left untouched on container startup

| Variable                   | Purpose                                                                                       | Default                    |
|----------------------------|-----------------------------------------------------------------------------------------------|----------------------------|
| `POSTGRES_PASSWORD`        | **Required**. Sets the password for the PostgreSQL superuser (`postgres`).                    | —                          |
| `POSTGRES_USER`            | Sets the name of the superuser. Creates a database with the same name if `POSTGRES_DB` unset. | `postgres`                 |
| `POSTGRES_DB`              | Name for the default database created at first startup.                                       | Same as `POSTGRES_USER`    |
| `POSTGRES_INITDB_ARGS`     | Additional arguments to pass to `initdb` during database initialization.                      | —                          |
| `POSTGRES_INITDB_WALDIR`   | Sets a different location for the transaction log (WAL).                                      | Subdirectory of `PGDATA`   |
| `POSTGRES_HOST_AUTH_METHOD`| Sets authentication method for host connections (`md5`, `scram-sha-256`, `trust`, etc.).      | `scram-sha-256`            |
| `PGDATA`                   | Location where database files are stored.                                                     | `/var/lib/postgresql/data` |

Notes:

- 
- A superuser password may not be required on local, but will always be required if connecting from a different host/container
- The default user and database are created in the entrypoint with `initdb`
- By default the transaction log is stored in a subdirectory of the main Postgres data folder (`PGDATA`)
- Mount the data volume at `/var/lib/postgresql/data` and not at `/var/lib/postgresql`
- Thi is because mounts at the latter path WILL NOT PERSIST database data when the container is re-created
- The Dockerfile that builds the image declares a volume at `/var/lib/postgresql/data` and if no data volume is mounted at that path then the container runtime will automatically create an anonymous volume⁠ that is not reused across container re-creations
- Data will be written to the anonymous volume rather than your intended data volume and won't persist when the container is deleted and re-created

### Docker Compose

- To verify that your container is running, run `docker ps` in a terminal
- You can also use Docker compose to achieve the same result:

```yaml
# Use postgres/example user/password credentials

services:

  db:
    image: postgres
    restart: always
    # set shared memory limit when using docker compose
    shm_size: 128mb
    # or set shared memory limit when deploy via swarm stack
    #volumes:
    #  - type: tmpfs
    #    target: /dev/shm
    #    tmpfs:
    #      size: 134217728 # 128*2^20 bytes = 128Mb
    environment:
      POSTGRES_PASSWORD: example

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

- Run `docker compose up` and wait for it to initialize completely
- Then visit http://localhost:8080 or http://host-ip:8080 (as appropriate)
- A complete Docker Compose file with explanations is given further below

## Data persistence

- Ephemeral container filesystem (optional)
- Volume mounts
- Bind mounts


## Docker Compose Basics

- Tool for defining and running multi-container applications
- Streamlined and efficient development and deployment experience
- Simplifies the control of your entire application stack, making it easy to manage services, networks, and volumes in a single YAML configuration file
- It also commands for managing the whole lifecycle of your application:
    - Start, stop, and rebuild services
    - View the status of running services
    - Stream the log output of running services
    - Run a one-off command on a service

- Compose file (YAML configuration file) used to configure your application’s services
- Compose CLI used to create and start the services from the configuration

- The default path for a Compose file is `compose.yaml` (preferred) that is placed in the working directory
- Compose also supports `compose.yml`, `docker-compose.yaml` and `docker-compose.yml` for backwards compatibility of earlier versions
- If both files exist, Compose prefers the canonical `compose.yaml`

- You can use fragments and extensions to keep your Compose file efficient and easy to maintain

- Multiple Compose files can be merged together to define the application model.
- The combination of YAML files is implemented by appending or overriding YAML elements based on the Compose file order you set
- Simple attributes and maps get overridden by the highest order Compose file, lists get merged by appending
- Relative paths are resolved based on the first Compose file's parent folder, whenever complimentary files being merged are hosted in other folders
- As some Compose file elements can both be expressed as single strings or complex objects, merges apply to the expanded form

- If you want to reuse other Compose files, or factor out parts of your application model into separate Compose files, you can also use include
- This is useful if your Compose application is dependent on another application which is managed by a different team, or needs to be shared with others

- Using the CLI, you can manage the lifecycle of your multi-container applications defined in the compose.yaml file
- The CLI commands enable you to start, stop, and configure your applications effortlessly

Key commands

- To start all the services defined in your `compose.yaml` file:

```bash
docker compose up
```

- To stop and remove the running services:

```bash
docker compose down
```

- If you want to monitor the output of your running containers and debug issues, you can view the logs with:

```bash
docker compose logs
```

- To list all the services along with their current status:

```bash
docker compose ps
```

- 

## Setting up PostgreSQL with Docker Compose

- Writing a docker-compose.yml for Postgres (File Structure)
- Configuring environment variables
- Exposing ports and setting up volumes
- Using initialization scripts (Initialization Scripts)
- Inspecting logs and troubleshooting

## Connecting applications to Postgres

- Linking other services (e.g., web app, admin tools) (Multi-Service Setup)
- Docker Compose networking basics

## Persisting and backing up data

- Managing Docker volumes
- Backup and restore procedures
- Maintenance (PostgreSQL)

## Common issues and troubleshooting

- Health checks
- Debugging container issues
- Performance

## Next steps

- Container security
- Developer experience
- Scaling up with Compose
- Introduction to orchestration (optional, for advanced readers)

## Credits

- [https://docs.docker.com/guides/databases/](https://docs.docker.com/guides/databases/)
- [https://github.com/docker-library/docs/blob/master/postgres/README.md](https://github.com/docker-library/docs/blob/master/postgres/README.md)
- [https://docs.docker.com/compose/intro/compose-application-model/](https://docs.docker.com/compose/intro/compose-application-model/)
- []()
