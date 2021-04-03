var filter = d3.select("#asdrop"); 
// gives a starting reference for display on load
var samp = "Fox";
channel = [];
console.log("1");

d3.json("/stephen_data").then((data) => {
  // Creates variables to hold the peices of data. 
  
  for (i = 0; i < data.length; i++) {
      var shows = data[i]
      
      channel.push(shows[2]);
    }

   console.log(channel);

  // grabs data for drop down
  var valfilt = channel.filter((value, index, self) => self.indexOf(value) === index);
  var valdrop = valfilt.sort((a, b) => a - b);
  // creates drop down
  valdrop.forEach(function (values) {     
      filter.append('option').text(values);
  });
});

// handles changes
function optionChanged(sample) {
  samp = sample;
  console.log(samp);
  Plot();
};

Plot();

function Plot (){
  title = [];
  channel = [];
  shows = [];
  index_data_sel = [];
  data_sel = [];
  imdb = [];
  rotten_tomatoes = [];
  awards = [];

  d3.json("http://127.0.0.1:5000/stephen_data").then((data) => {
    // Creates variables to hold the pieces of data. 
    //array of every channel
    for (i = 0; i < data.length; i++) {
        var shows = data[i]

        channel.push(shows[2]);
      }

        //create an array for each channel
        for (i = 0; i < data.length; i++) {

          shows = data[i]

          if (shows[2] == samp) {
              index_data_sel.push(i);
          }
        }
      //   creates a year select data array of arrays
        index_data_sel.forEach(function (values) {
          data_sel.push(data[values]);
      });

      // creates year data storage for variables for visuals
      data_sel.forEach(function (values){       
        title.push(values[1])
        imdb.push(values[4])

        rotten_tomatoes.push(values[5])

        awards.push(values[3])
     
        });

        console.log(title);
        console.log(imdb);
        console.log(rotten_tomatoes);
        console.log(awards);

  var trace1 = {
    y: title,
    x: rotten_tomatoes,
    text: title,
    name: "Rotten Tomatoes Score",
    type: "bar",
    orientation: "h"
  };

var trace2 = {
    y: title,
    x: awards,
    text: title,
    name: "Emmy Nominations",
    type: "bar",
    orientation: "h"
  };

var trace3 = {
      x: imdb,
      y: title,
      text: title,
      name: "IMDb Score",
      type: "bar",
      orientation: "h"
  };

var chartData = [trace1,trace2,trace3]

var layout = {
    title: "Emmy Awards by Rating",
    yaxis: {automargin: true}
   };

  Plotly.newPlot("asplot", chartData, layout);

  });
};
