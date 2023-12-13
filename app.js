/* 
    to do list:
 - set up basic UI (html)☑️
 - create posts (array??) ☑️ --> preemptively creating data (initial data) for your website so that user won't get a blank app - aka seeding
 - display those post on the webpage ☑️
        a. create a path that can used to share data ☑️
        b. fetch data using path ☑️
        c. create html elements in javascript☑️
 - create buttons to upvote or downvote posts ☑️
        a. add 2 buttons (input) to each upvote element☑️
                -> create onclick function for buttons☑️
                -> create function that will add a vote for upvotes ☑️
                    and subtract a vote for a downvote ☑️
                -> fetch post request to API to update ☑️
                    - figure out what post is being updated ☑️
                -> create routes for upvoting and downvoting ☑️
                -> convert string to number ☑️
 - view specific subreddits
    a. add navbar to our html for user to select diff subreddits☑️
    b. create route that returns posts from a specific subreddit ☑️
    c. add more posts into posts array to get multiple in each subreddit category ☑️
    d. display posts from subreddit on our webpage
 - last: CSS
*/

const express = require("express")
const path = require("path")
const app = express()

const posts = [
    //this is in strings, so that we can skip the step of stringifying data when we send it to another server   
    {
        "upvotes": "100",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "$100 Billion dollar lottery ticket winner",
        "author": "devan",
        "subreddit": "news",
        "id": "1"
        //in a large data set, giving each object a unique identifier allows you keep track of what object we're working with
    },
    {
        "upvotes": "299",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Cantaloupe recalled due to salmonella",
        "author": "FDA",
        "subreddit": "news",
        "id": "2"
    },
    {
        "upvotes": "9455",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Holiday Festival this Weekend",
        "author": "OH!",
        "subreddit": "news",
        "id": "3"
    },
    {
        "upvotes": "300",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "GTA 6 Announced",
        "author": "steve",
        "subreddit": "gaming",
        "id": "4"
    },
    {
        "upvotes": "3400",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Tomb Raider: Case Study of Sexualization of Female Protagonists",
        "author": "gamergirl99",
        "subreddit": "gaming",
        "id": "5"
    },
    {
        "upvotes": "29",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Bugs Removed in Sudoku Mobile App",
        "author": "BackoftheCerealBoxGames",
        "subreddit": "gaming",
        "id": "6"
    },
    {
        "upvotes": "10000",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Andre 3000 New Album",
        "author": "sarah",
        "subreddit": "music",
        "id": "7"
    },
    {
        "upvotes": "5322",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Louisville Native Artist opens for NoName",
        "author": "theelocals",
        "subreddit": "music",
        "id": "8"
    },
    {
        "upvotes": "1870",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "The poplarization of Afrobeats in western countries",
        "author": "playlistplaya",
        "subreddit": "music",
        "id": "9"
    },
    {
        "upvotes": "23",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Big Snow Storm",
        "author": "WLKYnews",
        "subreddit": "weather",
        "id": "10"
    },
    {
        "upvotes": "54985",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Tornado Warning: Eastern Kentuckians Ordered to Evacuate",
        "author": "EKU",
        "subreddit": "weather",
        "id": "11"
    },
    {
        "upvotes": "121",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Activities to do on Sunny Days in Louisville",
        "author": "theelocals",
        "subreddit": "weather",
        "id": "12"
    },
    {
        "upvotes": "444",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Building a house under a rock ledge",
        "author": "blackberry819",
        "subreddit": "oddlysatisfying",
        "id": "13"
    },
    {
        "upvotes": "6126",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Pets that look like their guardians",
        "author": "puppytoebeans",
        "subreddit": "oddlysatisfying",
        "id": "14"
    },
    {
        "upvotes": "908",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "GRWM ASMR",
        "author": "chronically-online",
        "subreddit": "oddlysatisfying",
        "id": "15"
    },
    {
        "upvotes": "3",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "POV: Every streetlight turns green",
        "author": "swiperight",
        "subreddit": "oddlysatisfying",
        "id": "16"
    },
    {
        "upvotes": "500",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "10 Movies at Cinemark Theaters This Month",
        "author": "watchmojo",
        "subreddit": "movies",
        "id": "17"
    },
    {
        "upvotes": "51600",
        "image": "https://townsquare.media/site/442/files/2016/10/The-Cat-in-the-Hat.jpg?w=980&q=75",
        "title": "Beyonce will attend NYC Renaissance Tour Movie Premiere",
        "author": "watchmojo",
        "subreddit": "movies",
        "id": "18"
    }
]

const users = [
    {
        "author": "devan",
        "link": "u/devan",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    },
    {
        "author": "FDA",
        "link": "u/FDA",
        "bio": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
        "author": "OH!",
        "link": "u/OH!",
        "bio": " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
    },
    {
        "author": "steve",
        "link": "u/steve",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "author": "gamergirl99",
        "link": "u/gamergirl99",
        "bio": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "author": "BackoftheCerealBoxGames",
        "link": "u/BackoftheCerealBoxGames",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
    },
    {
        "author": "sarah",
        "link": "u/sarah",
        "bio": "Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in."
    },
    {
        "author": "theelocals",
        "link": "u/theelocals",
        "bio": "Duis at tellus at urna condimentum mattis pellentesque id. Facilisis volutpat est velit egestas dui id."
    },
    {
        "author": "playlistplaya",
        "link": "u/playlistplaya",
        "bio": "Fringilla ut morbi tincidunt augue interdum."
    },
    {
        "author": "WLKYnews",
        "link": "u/WLKYnews",
        "bio": "Eget mi proin sed libero."
    },
    {
        "author": "EKU",
        "link": "u/EKU",
        "bio": "Lobortis elementum nibh tellus molestie."
    },
    {
        "author": "blackberry819",
        "link": "u/blackberry819",
        "bio": "Et leo duis ut diam quam nulla porttitor. "
    },
    {
        "author": "puppytoebeans",
        "link": "u/puppytoebeans",
        "bio": "Ultrices vitae auctor eu augue ut lectus"
    },
    {
        "author": "chronically-online",
        "link": "u/chronically-online",
        "bio": "Nascetur ridiculus mus mauris vitae."
    },
    {
        "author": "swiperight",
        "link": "u/swiperight",
        "bio": "Sem fringilla ut morbi tincidunt augue interdum velit euismod."
    },
    {
        "author": "watchmojo",
        "link": "u/watchmojo",
        "bio": "Faucibus et molestie ac feugiat sed lectus. Volutpat blandit aliquam etiam erat velit scelerisque in dictum."
    },
]

app.use(express.static(path.join(__dirname, '/public'))) // this allows the app to access and use the public file by creating a path that joins the public file to the end of the path?

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'))
})

//create a route that sends all posts (data) to the front end (javascript)
app.get("/posts", (req, res) => {
    res.send(posts)
})

// making more specific routes so that only the data that is updated/selected is sent to the app and back to js vs. the entire posts array

// create a route for upvoting
app.get("/upvote/:id", (req, res) => { //whenever a request gets made(button is clicked), we want to update the number of upvotes on the webpage
    const id = req.params.id           // create a variable 

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            let upvotes = Number(posts[i].upvotes) // to convert datatype to a number, since the data that is being used ^ is a string and the number will only be added to the end of the string 
            upvotes += 1
            posts[i].upvotes = upvotes.toString() // converts it back to a string so that the data can be sent 
        }
    }

})

// create a route for downvoting
app.get("/downvote/:id", (req, res) => {
    const id = req.params.id

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            let downvotes = Number(posts[i].upvotes)
            downvotes -= 1
            posts[i].upvotes = downvotes.toString()    // at this point, each time you visit this route, it increments the upvotes number by 1. need to then refresh root url to see changes 
        }                                              // after we use this route in a function that is applied to the onclick of each button, we can access this route by clicking the downvote button, but you have to refresh page to get each vote update
    }                                                  // only updating in the backend 
})


// can only do a res.send once, so when you try to send multiple objects to another route, you get an error. create a variable that holds all of the selected objects in an array. that allows you to send one object in one get request  
app.get("/subreddit/:subreddit", (req, res) => {
    const subreddit = req.params.subreddit
    const srPosts = []

    for (i = 0; i < posts.length; i++) {
        if (posts[i].subreddit === subreddit) {
            srPosts.push(posts[i]) // push - adds item to end of an array for each iteration 
        }
    }
    res.send(srPosts)
})

// route for users data
app.get("/users", (req, res) => {
    res.send(users)
})









app.listen(3000)
console.log("express is running and listening on port 3000")