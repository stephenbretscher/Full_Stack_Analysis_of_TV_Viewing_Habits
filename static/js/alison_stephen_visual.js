
// function unpack(rows, index) {
//   return rows.map(function(row) {
//     return row[index];
//   });
// }



d3.json("http://127.0.0.1:5000/stephen_data").then((importedData) => {
    console.log(importedData);
    var data = importedData
    var title_test = data[0][1];
    var rotten_tomatoes_test = data[0][5];



    console.log(title_test)
    console.log(rotten_tomatoes_test)
    console.log(typeof title)

   
    title = []
    rotten_tomatoes = []
    imdb = []
    awards = []

    for (i = 0; i < data.length; i++) {
      var title_point = data[i][1]
      title.push(title_point)

      var tomato_point = data[i][5]
      rotten_tomatoes.push(tomato_point)

      var imdb_point = data[i][4]
      imdb.push(imdb_point)

      var award_point = data[i][3]
      awards.push(award_point)

    };

      console.log(title)
      console.log(rotten_tomatoes)



//////////////////////////////////////////////////////////////////////////////
    // data.sort(function(a, b) {
    //   return parseFloat(b.No) - parseFloat(a.No);
    // });
  
    // Reverse the array due to Plotly's defaults
    // data = data.reverse();
  
    // Trace1 for the Greek Data
    var trace1 = {
      y: title.slice(0,10),
      x: rotten_tomatoes.slice(0,10),
      text: title,
      name: "Rotten Tomatoes Score",
      type: "bar",
      orientation: "h"
    };

    var trace2 = {
      y: title.slice(0,10),
      x: awards.slice(0,10),
      text: title,
      name: "Emmy's",
      type: "bar",
      orientation: "h"
    };

    var trace3 = {
        x: imdb.slice(0,10),
        y: title.slice(0,10),
        text: data.map(row => row.imdb),
        name: "IMDb Score",
        type: "bar",
        orientation: "h"
    };
  
    
    var chartData = [trace1, trace2, trace3]
    
     var layout = {
      title: "Emmy Awards by Rating",
      yaxis: {automargin: true}
     };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("a_s_plot", chartData, layout);
  });