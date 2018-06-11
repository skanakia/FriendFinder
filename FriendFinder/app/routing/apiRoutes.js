var path = require("path");
var friendList = require("../data/friend");

// var app = express();


module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friendList);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var newScore = newFriend.answers;
        var newTotal = 0;
        var bestScore = 10000000;
        var bestName = "";
        var bestPhoto = "";

        for(var i = 0; i < friendList.length; i++){
            NewTotal = 0;

            for(var j = 0; j < newScore.length; j++){
                var diff = Math.abs(newScore[j] - friendList[i].answers[j]);
                newTotal += diff;
            }
            if(newTotal < bestScore){
                bestScore = NewTotal;
                bestName = friendList[i].name;
                bestPhoto = friendList[i].photo;
            }
        }
        console.log('Best Match: ' + bestName);
        console.log("link to best photo: " + bestPhoto)
        friendList.push(newFriend);
        
    });
};

