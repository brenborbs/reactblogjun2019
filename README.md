## React Blog June 2019 with Graphql and MongoDB

This is a fullstack Recipe App using React, NodeJS, ExpressJS, Apollo and Graphql
Back-end started!

add variables.env file

```js
MONGO_URI=
SECRET=
```

To run the app:

run node.js backend

```js
npm run server
```

to run both server and client

```js
npm run dev
```

## App Screenshots

<img src="app.png" alt="BlogGraphql">
<img src="app2.png" alt="BlogGraphql">
<img src="app3.png" alt="BlogGraphql">
<img src="app4.png" alt="BlogGraphql">
<img src="app5.png" alt="BlogGraphql">

1st commit: Project Set-up

- Initialise express server
- Connected app to mlab database
- Created mongoose schemas
- Added Apollo express middleware
- Created Graphql Schemas, bodyparser and Rootquery type
- Made 1st mutation (create Recipe)
- Made 1st query (getRecipe)

2nd commit:

- Create react app client
- Signin and Signout functionalities
- Added token localstorage for signin/get currentuser

3rd commit:

- Signin and Signout front-end functionalities
- Added navbar and auth/unauth routes
- Added withSession component and functionalities

4th commit:

- Search blog functionality
- Add new blog functionality
- improvement of signin/signout pages

5th commit:

- Create New Blog functionality
- Imrpove layout on some pages
- Dashboard at profile page

6th commit:

- Added ScrollTopTop
- Added simple footer
- Added react-share social media icons

To Do's after 5th commit:

- fix edit blog modal
- fix search blog results
- work on adding disqus to react graphql app
