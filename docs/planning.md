# Signal Planning

## Feedback to Signal Developers

1. Run markdown lint on the README
2. User Stories are used in many different ways, some more context would be good

## Evaluation Criteria

Prioritized list of evaluation criteria:

- [1] User stories accepted by PM
- [1] Simplicity and good design patterns and architectural principles
- [2] Test one component with an automated test
- [2] Easy for the reviewer to run or deploy
- [3] Solid readme
- [3] Good commits that show the progression
- [4] Illustrates Git and Github best practices
- [4] Proficiency with current versions of tools, frameworks, and languages
- [5] Apply one DevOps principle
- [5] Demonstrate one Security best practice

Reasons for prioritization:

- Highest priority to most impactful, hardest to change decisions
- Second priority to pragmatic operational aspects of coding
- Third priority to maintenance considerations
- Fourth priority to technology
- Lowest priority to showing specific area capabilities

## Technology

- API: Node/Koa, API Blueprint, Jest and Dredd
    - Koa on Node is my most familiar API framework (other than Java)
    - Koa is:
        - built by the Express team to fill in the gaps in that minimal framework
        - small, expandable, and utilizes modern Javascript natively (ES6/async)
    - API Blueprint is:
        - smaller and less complicated than swagger (the #1 API documentation system)
        - fully supports JSON Schema (the swagger schema), as well as MSON (the APIB schema)
        - can be transformed into swagger automatically if necessary
        - fully supported by Dredd and Apiary (the most popular API test tool and doc platform)
    - Jest is a unit test framework that:
        - mocks all dependencies by default, requiring less work to set up
        - supports expect and most other standard test assertion types
        - widely adopted through its tight integration with React
        - plugins are available for Koa and Vue
    - Dredd:
        - supports a Test Driven Development (TDD) workflow
        - API documentation can be generated from the tests
        - plugins for CircleCI and Apiary are available

- Front End: Vue, Axios, and Jest
    - Vue is:
        - my most familiar Web framework
        - the smallest of the top 3 frameworks (Angular, React, Vue)
    - Vue-cli is a set of command line tools:
        - to generate a reactive web app quickly
    - Vue-cli service is a plugin for vue-cli that:
        - automates the serve, watch and debug cycle
        - builds static single page application sites to dist (using webpack)
    - Axios is a high level abstraction on top of Ajax with modern syntax
    - Jest is a unit test framework (see the API section for rationale)

## Data

Open data from the [Canada Food Guide](https://open.canada.ca/data/en/dataset/e5f4a98e-0ccf-4e5e-9912-d308b46c5a7f) is provided under the `/data` folder.

### UTF8 Conversion

This data is in WinLatin1 (CP1252) rather than UTF8 (1/2 symbols) and was converted to conform to an all-UTF8 policy.

A product comparison was performed to select the appropriate UTF8 library and [to-utf-8](https://www.npmjs.com/package/to-utf-8) was chosen to convert the data. The time taken for the library comparison was not logged as development time.

I would convert this on the fly in the API if the data were frequently updated, but since it is updated infrequently, I did a one-time conversion instead.

### Restructuring as JSON

Although the incoming data is organized as relational tables in CSV, the only requirement is for multiple readers of the data and no writers, and for infrequent updates of the data. It is therefore easier and faster to transform the data to JSON and access it that way from within our javascript.

We could use SQL to join and transform the data into JSON, but there are already many good tools for converting CSV to JSON, so using a relational DB for this one time conversion would be overkill.

A library comparison was made between JSON manipulation libraries and [JMESPath - JSON Queries](http://jmespath.org) and [JSON-Function (Inner Join)](https://worn.gitbook.io/json-function/) were chosen for JSON manipulation. The time taken for the library comparison was not logged as development time.

## Interface

A user interface is not required but is considered optional for candidates who wish to demonstrate their client side superpowers.

I decided to implement a basic UI using the framework I am most familiar with (Vue). In order to quickly develop a skeleton app, I decided to use the Vue CLI to automate a number of tasks.

The UI is very rudimentary, but provides a means of testing the API in an integration setting, rather than just using Dredd, Postman or equivalent.

## Submissions

- [Jeremy Squires Signal Repo](https://github.com/jeremysquires/signal)

*If private repo please add `jchang-sensorup`, `kanluo`, `liangsteve`, `thespencercox` as external collaborators*