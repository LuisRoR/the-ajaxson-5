
var riddleAnswer = '5'; // Global variable for riddle answer

var ajaxson5 = new Vue({
    el: '#mount-point',
    data: function () {
        return {
            tagValue: null,
            errorMessage: null,
            loading: false,
            imgSrc: null,
        };
    },
    methods: {
        fetchGif: function() {
            //Validate riddle
            if (this.validate()) {
        
                // get the user's input text from the DOM
                var searchQuery = ""; // TODO should be e.g. "dance"
                searchQuery = document.getElementById("query-box").value;
                
                //assign user's input text from DOM to tagValue
                tagValue = searchQuery;

                // configure a few parameters to attach to our request
                var api_key = "dc6zaTOxFJmzC";
                var tag = ""; // TODO should be e.g. "jackson 5 dance"
                tag += "jackson 5" + " " + tagValue;

                // TODO what do we want this URL to be?
                fetch(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${tag}`)
                    .then(response => response.ok ? response.json() : Promise.reject(response))
                    .then(results => {
                        // if the response comes back successfully, the code in here will execute.

                        console.log("we received a response!");
                        console.log(results);
                        // TODO
                        // 1. set the imgSrc value in our data to the GIF's image_url inside results
                        this.imgSrc = results.data.image_url;

                        // 2. clear the error message and loading state (since our request just succeede)
                        this.errorMessage = "";
                        this.loading =false;
                    }) //end fetch
                    .catch(err => {
                        // if something went wrong, the code in here will execute instead of the success function

                        this.loading = false;
                        this.errorMessage = 'Sorry, could not load GIF. Try again!';
                    }); //end .catch
                // TODO We've just made a request, so this is a good time to
                // set "loading = true"
                this.loading = true;  
            } //end if validate
            else {
                //wrong answer from riddle
                this.loading = false;
                this.imgSrc = null;
                this.errorMessage = 'No gifs for you';
            } //end else

        }, //end fetchGif

        validate: function() {
            //get riddle answer from user
            var five = document.getElementById("riddle-id").value;
            
            if (five === riddleAnswer) {
                document.getElementById("riddle-id").style.borderColor="black",
                document.getElementById("riddle-id").style.color="black";
                document.getElementById("riddle-label").style.color="black";

                return true;
            }
            else {
                document.getElementById("riddle-id").style.borderColor="red",
                document.getElementById("riddle-id").style.color="red";
                document.getElementById("riddle-label").style.color="red";

                return false
            }
        }, //end validate method
    }, //end method declaration
});
