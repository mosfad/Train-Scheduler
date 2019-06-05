var trainName = "";
var trainDest = "";
var trainFreq;
var nextArrival; 
var minAway;

var counter = 0;
console.log("starting javascript");
var config = { 
    apiKey: "AIzaSyAInc73ZmtCFcrsWioGj4QhWW0-UAGyJ2Q",
    authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
    databaseURL: "https://secondfirebaseproject-69c7d.firebaseio.com/",
    storageBucket: "secondfirebaseproject-69c7d.appspot.com/"
};
//Initialize firebase;    
firebase.initializeApp(config);

//setup reference to databalse;
var database = firebase.database();

//push values to the database when user adds a train.
$("#add-train").on("click", function() {
    trainName = $("#name-input").val().trim();
    trainDest = $("#dest-input").val().trim();
    trainFreq = $("#freq-input").val().trim();

    //push input values to the databse
    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainFreq: trainFreq
    })
})

//listen for changes to the database after a push to the child nodes(data)
database.ref().on("child_added", function(childSnapshot) {
    //see object in the child snaptshot.
    console.log(childSnapshot.val());
})