# Book API

## Project Setup

Follow these steps to set up the project on your local machine:

```bash
git clone https://github.com/Hammerten/books-api.git
cd books-api
```

Create a copy of the `.env.example` file and name it `.env`:

```bash
cp .env.example .env
```

Edit the newly created `.env` file to configure your environment variables.

Use Docker Compose to set up the project's dependencies:

```bash
docker-compose up
```

Install project dependencies using Yarn:

```bash
yarn install
```

## Prerequisites

Ensure you have the following prerequisites installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Yarn](https://yarnpkg.com/)

## API Documentation

API documentation is available through Swagger. Access it at [http://localhost:<port>/api](http://localhost:<port>/api) after starting the application.

## Customization

Adjust service ports by modifying the `.env` file. Find the relevant section and update the port numbers as needed.
