var trainName = "";
var trainDest = "";
var trainFreq;
var firstTime;
var nextArrival; 
var minAway;

//function adds a new row and populates it a train's schedule data.
function addTrainSchedule(a , b, c, dCal, eCal) {
    var trow = $("<tr>");
    //add five table elements
    var cname = $("<td>");
    cname.text(a);
    var cdest = $("<td>");
    cdest.text(b);
    var cfreq = $("<td>");
    cfreq.text(c);
    var carriv = $("<td>");
    carriv.text(dCal);
    var caway = $("<td>");
    caway.text(eCal);
    //append table elements to the table row
    trow.append(cname, cdest, cfreq, carriv, caway);
    //append all the created elements to the table body.
    $("tbody").append(trow);
}

//functions returns the next arrival time for a specific train schedule
function calculateArrival(tFreq, fTrain) {
    var currTime = moment();
    //console.log("current time is " + currTime.format("HH:mm A"));
    var currArrival = moment(fTrain, "HH:mm");
    //console.log("First train time is " + fTrain);
    console.log("The train frequency is " + tFreq + " minutes");
    console.log("The current time is " + currTime.format("HH:mm"));
    console.log("The first train time is " + currArrival.format("HH:mm")); //how to convert first train time to a moment object??????
    console.log("The difference between the current time and the first train time is " + currTime.diff(currArrival, "minutes") + " minutes.");
    while((currTime.diff(currArrival, "minutes")) >= 0) {
       //add train frequency time to get the next probable arrival time
       currArrival.add(tFreq, "minutes");
       //console.log("Next arrival time: " + currArrival.format("HH:mm"));
    }
    console.log(currArrival);
    return currArrival;
    //return "23:45 AM";
}


function calculateMinAway(a1, b1) {
    return a1.dif(b1, "minutes")
}

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
    firstTime = $("#time-input").val().trim();

    //push input values to the databse
    database.ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainFreq: trainFreq,
        firstTime: firstTime
    })
})

//listen for changes to the database after a push to the child nodes(data)
database.ref().on("child_added", function(childSnapshot) {
    //see object in the child snaptshot.
    console.log(childSnapshot.val());
    console.log("Train frequency is a " + typeof(childSnapshot.val().trainFreq));
    var tFreqInt = parseInt(childSnapshot.val().trainFreq);
    var fTime = childSnapshot.val().firstTime;
    //calculate the next arrival time, based on current time.
    nextArrival = calculateArrival(tFreqInt, fTime);
    console.log(nextArrival.format("HH:mm"));
    console.log(nextArrival.diff(moment(), "minutes", true));
    //calculate the number of minutes the next train will take to arrive. 
    minAway = nextArrival.diff(moment(), "minutes"); 
    //Note that moment.diff() truncates decimal places. That's why minAway seems to be off by 1 minute.
    console.log("The next train is " + minAway + " minutes away");
    addTrainSchedule(childSnapshot.val().trainName, childSnapshot.val().trainDest, childSnapshot.val().trainFreq, nextArrival.format("hh:mm A"), minAway);

})