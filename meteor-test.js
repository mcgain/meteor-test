List = new Meteor.Collection("list");

if (Meteor.is_client) {
  Template.listable.list_title = function() {
    return "Movies";
  }
      
  Template.listable.rows = function() {
    var result = "";
    var rows = List.find({});
    result = result + "<table>";
    rows.forEach(function(obj) {
      result = result + "<tr>";
      for (var prop in obj) {
        if ((obj.hasOwnProperty(prop)) && (prop[0] !== "_")) {
          if (prop[0] !== "_") {
            result = result + "<td>" + obj[prop] + "</td>";
          }
        }
      }
      result = result + "</tr>";
    });
    result = result + "</table>";
    return result;
  }

}
if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (List.find().count() === 0) {
      var titles = ["Ada Lovelace",
        "Grace Hopper",
        "Marie Curie",
        "Carl Friedrich Gauss",
        "Nikola Tesla",
        "Claude Shannon"];
      for (var i = 0; i < titles.length; i++){
        List.insert({
          title: titles[i], 
          score: Math.floor(Math.random()*10)*5
        });
      }
    }
  });
}
