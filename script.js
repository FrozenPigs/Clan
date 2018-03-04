///////////////////////////////////////////////////////////////////////////////
//                     DATABASE CONNECTION AND FUNCTIONS                     //
///////////////////////////////////////////////////////////////////////////////
var config = {
  apiKey: "AIzaSyCl0LyHxILTzSGeQhGqK_kT0XbYpouME5w",
  authDomain: "clan-2f8a2.firebaseapp.com",
  databaseURL: "https://clan-2f8a2.firebaseio.com",
  projectId: "clan-2f8a2",
  storageBucket: "clan-2f8a2.appspot.com",
  messagingSenderId: "697169726732"
};
firebase.initializeApp(config);                                                         // inform the database of the app
var ref = firebase.database().ref();                                                    // database reference used for reading

function setDatabase(percentages, user) {                                               // set the database values for a person
  var zeros = [];                                                                       // array to hold zeros from percentages array
  for (var i = 0; i < percentages.length; i++) {                                        // loop over array of percentages
    if (percentages[i] === 0) {                                                         // if array element is 0
      zeros.push(percentages[i]);                                                       // add to the zeros array
    }
  }
  percentages = percentages.filter(Boolean).concat(zeros);                              // remove booleans from percentages and re add 0s
  firebase.database().ref(user).set({                                                   // get reference for users database entry and set
    "stars": $('#editStars').val(),                                                     // set stars to new value
    "percentages": percentages,                                                         // set percentages to new value
    "description": $('#editDescription').val(),                                         // set description to new value
    "warnings": $('#editWarnings').val(),
    "townhall": $('#editTownHall').val(),
    "barbarian": $('#editBarbarian').val(),
    "archer": $('#editArcher').val(),
    "wallbreaker": $('#editWallBreaker').val(),
    "giant": $('#editGiant').val(),
    "goblin": $('#editGoblin').val(),
    "baloon": $('#editBaloon').val(),
    "wizard": $('#editWizard').val(),
    "healer": $('#editHealer').val(),
    "dragon": $('#editDragon').val(),
    "peka": $('#editPeka').val(),
    "babydragon": $('#editBabyDragon').val(),
    "miner": $('#editMiner').val()
  });
  reloadContent(user);                                                                  // reload page contents due to values changing
}


function writeUserData() {                                                              // prepares the user data for writing the the database
  var user = $('#person').html();                                                       // get users name
  ref.once('value').then(function(snapshot) {                                           // read from database
    var snapval = snapshot.val()[user];                                                 // get users database entry
    var percentages = snapval.percentages;                                              // get the users attack percentages
    percentages.push(parseInt($("#percent1").val()), parseInt($("#percent2").val()));   // add the 2 new entered percentages to the array
    setDatabase(percentages, user);                                                     // set the new values in the database
  });
}

///////////////////////////////////////////////////////////////////////////////
//                                PAGE LOADING                               //
///////////////////////////////////////////////////////////////////////////////
function reloadContent(user) {
  $('#person').html(user);                                                              // set heading to user name
  ref.once('value').then(function(snapshot){                                            // get database snapshot
    var snapval = snapshot.val()[user];                                                 // get database values
    var averagePercent = 0;                                                             // sum for average percentages
    for (var i = 0; i < snapval.percentages.length; i++){                               // loop over percentages
      averagePercent += snapval.percentages[i];                                         // add up percentages
    }
    $('#townHall').html(snapval.townhall);
    $('#warnings').html(snapval.warnings);
    $('#barbarian').html(snapval.barbarian);
    $('#archer').html(snapval.archer);
    $('#wallBreaker').html(snapval.wallbreaker);
    $('#giant').html(snapval.giant);
    $('#goblin').html(snapval.goblin);
    $('#baloon').html(snapval.baloon);
    $('#wizard').html(snapval.wizard);
    $('#healer').html(snapval.healer);
    $('#dragon').html(snapval.dragon);
    $('#peka').html(snapval.peka);
    $('#babyDragon').html(snapval.babydragon);
    $('#miner').html(snapval.miner);
    
    $("#avgper").html((averagePercent/snapval.percentages.length).toFixed(2));          // set the percentage to the average percentage to 2 desimals
    $('#stars').html(snapval.stars);                                                    // set the stars to the database value
    $("#description").html(snapval.description);                                        // set the description
    
    $('#editTownHall').val(snapval.townhall);
    $('#editWarnings').val(snapval.warnings);
    $('#editBarbarian').val(snapval.barbarian);
    $('#editArcher').val(snapval.archer);
    $('#editWallBreaker').val(snapval.wallbreaker);
    $('#editGiant').val(snapval.giant);
    $('#editGoblin').val(snapval.goblin);
    $('#editBaloon').val(snapval.baloon);
    $('#editWizard').val(snapval.wizard);
    $('#editHealer').val(snapval.healer);
    $('#editDragon').val(snapval.dragon);
    $('#editPeka').val(snapval.peka);
    $('#editBabyDragon').val(snapval.babydragon);
    $('#editMiner').val(snapval.miner);
    
    $("#editStars").val(snapval.stars);                                                 // set the form for editing stars to the star value
    $("#editDescription").val(snapval.description);                                     // set the form for editing description to the description value

  });
}

function reloadSidebar() {                                                              // reloads the sidebar of clan members
  ref.once('value').then(function(snapshot) {                                           // one time call for database snapshot
    var snapval = snapshot.val();                                                       // get values from database snapshot
    for (var key in snapval) {                                                          // loop keys in the database
      document.getElementById('people').insertRow(-1).insertCell(0).id = key;           // add table element with id of the member
      $('#' + key).attr('class', 'users');                                              // set class to person
      $("#" + key).html(key).attr('onclick', 'reloadContent(innerHTML);');              // add member to cell, and make clicking reload content
   }
  });
}


///////////////////////////////////////////////////////////////////////////////
//                                     MISC                                  //
///////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {                                                          // when document loaded execute function
  reloadSidebar();                                                                      // load the side bar of clan members
  $(document).on('submit', '#edit', function() {                                        // when submit button with id edit clicked execute function
    writeUserData();                                                                    // writes values to database
    return false;                                                                       // return to document
  });
});