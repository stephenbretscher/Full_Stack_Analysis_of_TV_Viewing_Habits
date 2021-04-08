// Instructions: Plot a sunburst chart to display Emmy Nominations by Network and Program

// Create empty containers to house data
labels = []
parents = []
value_layer = []

// Initialize the page with default plot
function init() {

  // Use .then as a chain to pass a function to read the data --> creates a promise to represent potential responses
  d3.json("http://127.0.0.1:5000/sunburst_data").then((data) => {

    // Iterate over each row, collecting values for plotting
    for (let i = 0; i < data.length; i++) {
        // Call each value in aray by index and append to empty containers
        labels.push(data[i][2]);
        parents.push(data[i][3]);

        //// Format the data and convert to numerical (use '+' as shorthand for parseint())
        value_layer.push(+data[i][4]);
      };
        // Confirm data is being read in
        console.log('label');
        console.log(labels);
        console.log('parents');
        console.log(parents);
        console.log('value_layer');
        console.log(value_layer);

        // Build Plot
        var data = [{
          type: "sunburst",
          labels: labels.slice(0,72),
          parents: parents.slice(0,72),
          values:  value_layer.slice(0,72),
          outsidetextfont: {size: 30, color: "#377eb8"},
          insidetextfont: {size: 24, color: "black"},
          leaf: {opacity: 0.4},
          marker: {line: {width: 2}},
          textposition: 'inside',
          insidetextorientation: 'radial'
        }];

        var layout = {
          text: "Emmy Nominations By Network And Program",
          margin: {l: 0, r: 0, b: 0, t: -500},
          autosize: false,
          width: 1000,
          height: 1000,
          sunburstcolorway:[
            "#636efa", "#00cc96",
            "#ab63fa","#19d3f3", 
            "#e763fa","#FECB52","#FFA15A"
          ],
          extendsunburstcolorway: true
        };
        
        Plotly.newPlot('sunburstPlot', data, layout);

  })};

// Initialize Plot
init();

