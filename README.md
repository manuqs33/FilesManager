## Purpose

This repo was elaborated to tackle a technical test. It consisted in using some pre-created endpoints to fetch some data with an Express API, validate it, and show it in a React Front End.

The requirements included using Node 14 in the Back End, which meant having to use the https library instead of the Fetch API, and Node 16 in the Front End, which involved some adaptation to be able to use a Vite JS - React build.

### Functional aspects

The purpose of this app is to gather, sanitize, and format information from a number of CSV files. It scans the files, and shows in a general table valid lines from these files. Lines are considered valid if:

- They have 4 elements, following this column schema: **file,text,number,hex**
- They follow an appropriate csv format, not having any trailing commas or similar format breach.
- The elements are valid elements of their data type, especially in the last two cases, decimal numbers and hexadecimal numbers. This seemed the right way to simulate a function of an app that evaluates the validity of the involved data.

We’ve also included in the app the possibility of filtering the search and taking a look at the complete list of available files in the server, and filtering the search to a specific file. In this case, the user will also gain additional information, such as knowing if the file exists but doesn’t have valid lines or if there was an error retrieving it (and of which type).

### Commands

The project can be run with:

```bash
docker-compose up
```

which uses dev commands to spin up client and server in a local enviroment. Using the commands in the Dockerfile, the containers can also be run. In the case of the server, it runs `npm start` and in the client it builds the project and then runs `preview` to spin an environment closer to production (but not ready to work as a production server in itself).

From the server folder, the following command:

```bash
npm test
```

runs the Mocha and Chai test suite. The server must be off at that moment, since the test will spin it up, test, and then shut it down. 

### Technical considerations

The node versions for each part of the app (14 for server and 16 for client) were respected, as well as the required packages. Some additional packages were added to add some functions and customization. Looking forward to comments and criticism about what could be improved. 
