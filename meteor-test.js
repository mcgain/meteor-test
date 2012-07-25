List = new Meteor.Collection("list");

if (Meteor.is_client) {
  Template.listable.list_title = function() {
    return "Movies";
  }
      
  Template.listable.rows = function() {
    var result = "";
    var rows = List.find({});
    rows.forEach(function(obj) {
      result = result + "<tr>";
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          result = result + "<td>" + obj[prop] + "</td>";
          (prop + " = " + obj[prop]);
        }
      }
      result = result + "</tr>";
    });
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
