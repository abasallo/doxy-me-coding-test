# doxy.me - Take-Home Challenge - Senior

You are building a backend for a Product Review Hub.

The entities involved are:

 - Users
 - Products
 - Reviews

A given user should be able to:

 - Sign In, sign up
 - Create, Update, and Delete a user’s own products
 - Create and Read reviews
 - See all products and search for products efficiently (regardless of which users own them)

Using NodeJS and a relational database, your task is to build an API to CRUD all
entities, and, if you feel up to the challenge, ensure that product search is optimized.

Extra credit for logging middleware, a custom decorator validating entity ownership, and
a utility for assisting with testing (see below).

## Requirements

### Infrastructure/Tooling

 - NodeJS
 - Relational DB - any type, up to you 😉
 - ORM - any type, up to you 😉
 - Include database migrations
 - Docker-Compose file to run DB, App, and any other necessary services (mostly for our testing)

### Functionality

 - Protocol: HTTP (as opposed to WebSockets)
 - CRUD with model validation
 - Simple Authentication via Passport/JWT (Username + Password)
 - Centralized Error handling
 - 1 test suite for product search

### Extra credit

 - Search is optimized (Caching, Indexes, etc.)
 - Logging mechanism that supports context (https://www.npmjs.com/package/nodecls as an option)
 - Custom decorator for verifying entity ownership (eg. that the user making the request owns the entity being requested — likely used with products)
 - Factory approach for preparing test data

## Closing

We're looking for a deep understanding of the problem and an ability to build a solution that is optimized and well-structured. 

We are also looking for coding proficiency and an ability to select the right patterns and tools to solve the problem.
Good luck! 🍀
