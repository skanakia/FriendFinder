var path = require("path");
var friendList = require("../data/friend");

// var app = express();


module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friendList);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var newResponses = newFriend.answers;
        var newTotal = 0;
        var bestScore = 10000000;
        var bestName = "";
        var bestPhoto = "";
        var index = -1;

        for(var i = 0; i < friendList.length; i++){
            NewTotal = 0;
            for(var j = 0; j < newFriend.answers.length; j++){
                var diff = Math.abs(newFriend.answers[j] - friendList[i].answers[j]);
                newTotal += diff;
            }
            if(newTotal < bestScore){
                bestScore = NewTotal;
                bestName = friendList[i].name;
                bestPhoto = friendList[i].photo;
                index = i;
            }
        }
        
        console.log('Best Match: ' + bestName);
        console.log("link to best photo: " + bestPhoto)
        friendList.push(newFriend);
        res.json(friendList[index]);
    });
};

