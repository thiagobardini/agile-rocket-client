## Description
CRM - Custom Relation Management 
<br>
Manage Accounts and Opportunities administrative tasks, and close more deals faster.

## Technologies used for the Application.
- HTML
- SCSS
- JavaScript
- React
- Axios
- Bootstrap
- Passport
- Mongo DB



## Important Links

- [Agile Rocket Client Repo](https://github.com/thiagobardini/agile-rocket-client)
- [Agile Rocket API Repo](https://github.com/thiagobardini/agile-rocket-api)
- [Deployed Agile Rocket API](https://mysterious-sierra-58663.herokuapp.com/)
- [Deployed Agile Rocket Client](https://thiagobardini.github.io/agile-rocket-client/#/)

## User Stories
- As a user, I want to be able to sign in/up.
- As a user, I want to be able to change my password.
- As a user, I want to be able to login/logout successfully.
- As a user, I want to be able to create a new Account.
- As a user, I want to be able to have multiple accounts.
- As a user, I want to be able to update a Account I own.
- As a user, I want to be able to delete a Account I own.

- One User will have many Accounts
- Account will have one User
- Account will have many Opportunities
- Opportunities will have one Account
- One Dashboard will have many Users
- One Dashboard will have many Accounts
- One Dashboard will have many Opportunities

## Set up and installation
1. Download this application.
2. Unzip the application.
3. Move into the folder and run the command `git init`.
4. Install dependencies with `npm install`.
5. `git add` and `git commit` your changes.
6. Run the development server with `npm start`.
7. Optional download of the  [API Back-end](https://github.com/thiagobardini/agile-rocket-api "API Back-end JobLogger")

## Deployment

Before deploying, you first need to make sure the  `homepage`  key in your  `package.json`  is pointing to the correct value. It should be the url of your deployed application.

To deploy you should first make sure you are on the  `master`  branch with a clean working directory, then you can run  `npm run deploy`  and wait to see if it runs successfully.

## Structure

The top-level  `App`  component stores the currently authenticated user in state, as well as data related to the flash messages.  `App`  renders the  `Header`  component, and a list of routes, each of which render a component from  `src/components`. The  `src/api`  directory has a component file,  `auth.js`, which contains all the needed  `axios`  calls pertaining to authentication.

## Features

### `<AuthenticatedRoute />`
This application contains a handy component for creating routes that require a
user to be authenticated before visiting. This component lives in
`src/auth/components/AuthenticatedRoute.js` and is already required in `App`.
It's a thin wrapper around React Router's `<Route />` component. The only
difference is that it expects a prop called `user`, and if that prop is falsy,
it will render a `<Redirect />` that takes the user to `/`. **To use
it, you must pass it the user as a prop!**

### `<AutoAlertDismiss />` Component

This application also already contains a component that displays user messages.
Messages are configurable via redux actions.  This component can be found in
`src/components/AutoAlertDismiss/AutoAlertDismiss.js`. **There is no need to add
this component to your app. It is already required in `App`.**  A single
component instance is used to manage all alerts application-wide. The alert can be used by passing the `alertMsg` method to a rendered route.  The `alertMsg` method expects an object with a `heading`, `message`, and a `variant` property.

### `src/apiConfig.js`

This file will determine whether you're in a production or development
environment and choose an API URL accordingly. Don't forget to replace the
`production` URL with your deployed API's URL.

## API Routes
| Verb   | URI Pattern        | Request Body      | Headers   | Action              |
|--------|--------------------|-------------------|-----------|---------------------|
| POST   | `/sign-up`         | **credentials**   | N/A       | user sign-up        |
| POST   | `/sign-in`         | **credentials**   | N/A       | user sign-in        |
| DELETE | `/sign-out`        | N/A               | **Token** | user sign-out       |
| PATCH  | `/change-password` | **passwords**     | **Token** | change-password     |
|        |                    |                   |           |                     |
| GET    | `/accounts`           | N/A               | N/A       | index accounts         |
| GET    | `/accounts/:id`       | N/A               | N/A       | show single account    |
| POST   | `/accounts`           | `post: {}`        | **Token** | create account         |
| PATCH  | `/accounts/:id`       | post              | **Token** | update account         |
| DELETE | `/accounts/:id`       | N/A               | **Token** | remove account         |
|        |                    |                   |           |                     |
| GET    | `/opportunities`        | N/A               | **Token** | index account opportunities |
| GET    | `/opportunities/:id`    | N/A               | **Token** | show account opportunity   |
| POST   | `/opportunities`        | `opportunity: {}`     | **Token** | create account opportunity |
| PATCH  | `/opportunities/:id`    | opportunity           | **Token** | update account opportunity |
| DELETE | `/opportunities/:id`    | N/A               | **Token** | delete account opportunity |

### Unsolved Problems
- I want to improve styling.
- Version 2, I am still working on - I still need to create some features as create multiple opportunities/show all/update/delete for opportunities.
- For version 3, I want to create some charts and data reports.


## Wireframes
![](https://i.imgur.com/7YSv902.png)
![](https://i.imgur.com/SfQ5aC1.png)
![](https://i.imgur.com/OjVbpjq.png)
![](https://i.imgur.com/o1rPn0T.png)
![](https://i.imgur.com/T2hMBFZ.png)
## ERD
![](https://i.imgur.com/NqYzWFc.png)
