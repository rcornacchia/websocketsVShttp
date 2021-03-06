var start, end;
var avg = 0;
var total = 0;
var count = 0;

new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        email: null, // Email address used for grabbing an avatar
        username: null, // Our username
        joined: false // True if email and username have been filled in
    },

    created: function() {
        var self = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.addEventListener('message', function (e) {
            var msg = JSON.parse(e.data);
            end = performance.now();
            var time = end - start;
            console.log(time + " milliseconds.");

            total += time;
            avg = total / count;
            console.log(count, avg)
        });
    },

    methods: {
        send: function () {
            // if (this.newMsg != '') {
            count++;

            start = performance.now();
            this.ws.send(
                JSON.stringify({
                    x: 101.3, //$('<p>').html(this.newMsg).text() // Strip out html
                    y: 103.4
                }
            ));
            this.newMsg = ''; // Reset newMsg
            // }
        },

        join: function () {
            // if (!this.email) {
            //     Materialize.toast('You must enter an email', 2000);
            //     return
            // }
            // if (!this.username) {
            //     Materialize.toast('You must choose a username', 2000);
            //     return
            // }
            this.email = 'rob'; //'$('<p>').html(this.email).text()';
            this.username = 'rob'; //$('<p>').html(this.username).text();
            this.joined = true;
        },

        gravatarURL: function(email) {
            return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
        }
    }
});