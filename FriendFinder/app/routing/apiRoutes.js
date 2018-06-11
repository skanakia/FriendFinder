var path = require("path");
var friendList = require("../data/friend");



module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friendList);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var newResponses = newFriend.answers;
        var newTotal = 0;
        var match = {
            name: "",
            photo: "",
            score: 10000
        }
  

        for(var i = 0; i < friendList.length; i++){
            newTotal = 0;
            for(var j = 0; j < newResponses.length; j++){
                newTotal += Math.abs(newResponses[j] - friendList[i].answers[j]);
                // console.log(newTotal);
            }
            if(newTotal < match.score){
                match.score = newTotal;
                // console.log(match.score);
                match.name = friendList[i].name;
                match.photo = friendList[i].photo;
            }
        }

        friendList.push(newFriend);
        res.json(match);
    });
};

