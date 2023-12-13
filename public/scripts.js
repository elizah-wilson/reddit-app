window.open(displayAllPosts())   // runs displayAllPosts function when window is opened

function displayAllPosts() {    // function that contains fetch for the array that is appended to the base url/html page
    fetch("/posts")                 // added this function to the all subreddit onclick attribute so that it will take you back to the "homepage" if user clicks into a subreddit and wants to go back
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            displayPosts(json)
        })
        .catch((error) => {
            console.log(error)
        })
}

// add functionality to upvote buttons
function upvote(PostId) {      // fetch the change in the backend in this functionf so that the data change happens when the button is clicked   
    fetch(`/upvote/${PostId}`)
        .then((response) => {
        })
        .catch((error) => {
            console.log(`error: ${error}`)
        })                                                  // the use of the PostId in both the fetch and the function allows for the upvotes to be updated in the backend and the frontend simultaneously. 
    // need this in the same function, so that at the same time, the front end is updated so you dont have to refresh in order to see the change in upvotes
    const postUpvoteTag = document.getElementById(PostId)   // this is grabbing the upvote tag (upvote paragraph) by the id of the paragraph element so that once the button is clicked we can increment it or decrease it by 1 for each click
    postUpvoteTag.innerText = Number(postUpvoteTag.innerText) + 1
}
// to add functionality to downvote buttons
function downvote(PostId) {
    fetch(`/downvote/${PostId}`)
        .then((response) => {
        })
        .catch((error) => {
            console.log(`error: ${error}`)
        })

    const postUpvoteTag = document.getElementById(PostId)
    postUpvoteTag.innerText = Number(postUpvoteTag.innerText) - 1
}
//add function to subreddit buttons/links
function goToSubreddit(subreddit) {

    fetch(`/subreddit/${subreddit}`)
        .then((response) => {
            return response.json()
        })
        .then((sr) => {
            displayPosts(sr)
        })
        .catch((error) => {
            console.log(`error: ${error}`)
        })
}
// we removed this code from the posts fetch ^ so that we can reuse it in a function˯
function displayPosts(posts) {

    const postContainer = document.getElementById("post-container")
    postContainer.innerHTML = ""                                    //makes the postContainer div is empty, this is the first step that is done once this function is active 

    posts.forEach((post) => {                                       //then this for loop will run and create specific posts

        const postSubreddit = post.subreddit
        const postImage = post.image
        const postTitle = post.title
        const postUpvotes = post.upvotes
        const postAuthor = post.author
        const postId = post.id

        //  create html elements
        let postDiv = document.createElement("div")
        let postUpvoteDiv = document.createElement("div")
        let upvoteBttn = document.createElement("button")
        let downvoteBttn = document.createElement("button")
        let postUpvoteTag = document.createElement("p")
        let postImgTag = document.createElement("img")
        let postInfoDiv = document.createElement("div")
        let postTitleTag = document.createElement("h3")
        let postDetailDiv = document.createElement("div")
        let postAuthorTag = document.createElement("a")
        let postSubredditTag = document.createElement("a")

        // format our html - actually put the elements onto the HTML documents 
        postDiv.appendChild(postUpvoteDiv)
        postDiv.appendChild(postImgTag)
        postDiv.appendChild(postInfoDiv)

        postUpvoteDiv.appendChild(upvoteBttn)
        postUpvoteDiv.appendChild(postUpvoteTag)
        postUpvoteDiv.appendChild(downvoteBttn)

        postInfoDiv.appendChild(postTitleTag)
        postInfoDiv.appendChild(postDetailDiv)

        postDetailDiv.appendChild(postAuthorTag)
        postDetailDiv.appendChild(postSubredditTag)

        // add classes and attributes to html elements
        postDiv.classList.add("post")
        postUpvoteDiv.classList.add("upvote-container")
        postUpvoteTag.classList.add("upvotes")
        upvoteBttn.classList.add("upvote-bttn")
        downvoteBttn.classList.add("downvote-bttn")
        postImgTag.classList.add("post-image")
        postInfoDiv.classList.add("post-info")
        postTitleTag.classList.add("post-title")
        postDetailDiv.classList.add("post-details")
        postAuthorTag.classList.add("post-author")
        postSubredditTag.classList.add("post-subreddit")

        postAuthorTag.setAttribute("href", "")
        postSubredditTag.setAttribute("href", "")

        postUpvoteTag.id = postId // adding an element id (id="postId"), using the object key PostId to give the element the same id/ NOT another id key to the object

        // add content into elements
        postUpvoteTag.innerText = postUpvotes
        upvoteBttn.innerText = "⬆️"
        downvoteBttn.innerText = "⬇️"
        postImgTag.src = postImage
        postTitleTag.innerText = postTitle
        postAuthorTag.innerText = `by ${postAuthor}`
        postSubredditTag.innerText = `to r/${postSubreddit}`

        // put posts into element on html doc

        postContainer.appendChild(postDiv) // this will fill in the postContainer again

        //add functionality to buttons
        upvoteBttn.setAttribute("onclick", `upvote(${postId})`)
        downvoteBttn.setAttribute("onclick", `downvote(${postId})`)
    })
}

function displayUsers() {
    const usersContainer = document.getElementById("users-container") 

    fetch("/users")
        .then((response) => {
            return response.json()
        })
        .then((users) => {

            users.forEach(user => {

                const postContainer = document.getElementById("post-container")
                postContainer.innerHTML = ""

                const userCard = document.createElement("div")
                const author = document.createElement("h2")
                const link = document.createElement("a")
                const bio = document.createElement("p")

                author.innerText = user.author
                link.innerText = user.link
                bio.innerText = user.bio

                userCard.appendChild(author)
                userCard.appendChild(link)
                userCard.appendChild(bio)
                usersContainer.appendChild(userCard)

                link.setAttribute("href", "#")
                userCard.classList.add("user-card")
                bio.classList.add("bio-card")
            })
        })
}