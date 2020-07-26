# Social-Circle

*Social Circle makes social distancing easier by helping you count the friends of your friends.*

### It's easy:
1. Signup with your email
1. Add your friends
1. *(Your friends add their friends, and so on)*
1. Receive an email with a breakdown of your social network!

### How does this help me social distance?

Whenever you see someone in-person, your risk of getting sick from them is more than just the one person; you’re also exposing yourself to everyone they’ve seen in the past couple weeks. Even if they’ve been careful, one of their friends might not be.

Don't let yourself get surprised. Be confident in knowing that when you hang out with your friends, you’re not accidentally exposing yourself to more people than you thought. 

Social distance smarter with Social Circle.

### What's the math behind it?

The size of your social circle starts at zero. For every person you add, the size of your social circle grows by one.

When your friend adds someone new, that person is automatically included in the count of your social circle.

At the end, you’ll see the total number of people in your social circle.


# Contributing

## Get setup

1. `git clone` this repository
1. `npm install` the top-level packages
1. `cd client` and `npm install` the client packages

## Run locally

1. `cd client` and `npm start` (hot-reloading client, for development only)

2. In another terminal, `npm run server`

3. In your browser, go `localhost:3000` 

> Note: This setup uses a hot-reloading client for easier development.
> To simulate production, skip step 1 and manually build the client bundle instead: `npm run build`.
> Then, visit the app at `localhost:8080`


## Run tests
After following the steps under **Get setup**
1. Install Docker Desktop and run it
1. `npm test`
