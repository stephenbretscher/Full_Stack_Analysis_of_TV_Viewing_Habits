var filter = d3.select("#selDataset"); 

// gives a starting reference for display on load
var samp = "940"

// handles changes
function optionChanged(sample) {
    samp = sample;

    console.log(samp);

    renderProccess();

};

// displays on load
renderProccess();


function renderProccess(){ 

    // do I need a delete existing graph line here????

    d3.html('');

    d3.json("samples.json").then((data) => {
        // Create a variable that holds the samples array. 
        var samples = data.samples;
        
        // Create a variable that holds the metadata array. 

        var metadata = data.metadata;


        // grabs data for drop down
        var valdrop = samples.map(item => item.id)
        .filter((value, index, self) => self.indexOf(value) === index);
    
    
        // creates drop down
        valdrop.forEach(function (values) {
            filter.append('option').text(values);
        });

        // grabs the samples based on input
        var resultArray = samples.filter(sampleObj => sampleObj.id == samp);

        console.log(resultArray);

        // adds the first sample to a variable
        var result = resultArray[0];

        // gathers variables that hold the chart value parts
        var otu_ids = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;

        // reformats the x, y ticks and labels for the bar chart in decending order and adds the OTU to the y ticks

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var xticks = sample_values.slice(0, 10).reverse();
        var labels = otu_labels.slice(0, 10).reverse();

        console.log(yticks);
        console.log(xticks);
        console.log(labels);

        var trace1 = {
            x: xticks,
            y: yticks,
            text: labels,
            orientation: 'h',
            type: 'bar'
        };

        var data = [trace1] 

        var layout = {
            title: 'top 10 OTUs Found'
        };
        
        Plotly.newPlot('bar', data, layout);


        // bubble chart generation

        // grabs data
        var xticksbub = otu_ids.slice(0, 10);
        xticksbub.push.apply(xticksbub, otu_ids.slice(Math.max(otu_ids.length - 10, 1)));

        var yticksbub = sample_values.slice(0, 10);
        yticksbub.push.apply(yticksbub, sample_values.slice(Math.max(sample_values.length - 10, 1)));

        var labelsbub = otu_labels.slice(0, 10);
        labelsbub.push.apply(labelsbub, otu_labels.slice(Math.max(otu_labels.length - 10, 1)));


        console.log(xticksbub);
        console.log(labelsbub);
        console.log(yticksbub);

        // plots data
        var trace1 = {
            x: xticksbub,
            y: yticksbub,
            mode: 'markers',
            marker: {
              color: xticksbub,  
              size: yticksbub,
              colorscale: "Earth"
            },
            text: labelsbub
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'First Ten and Last Ten Samples',
            xaxis: {
                title: "OTU ID"
            },
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', data, layout);

        //   demographic chart

        // grabs the metadata based on input
        var resultArray2 = metadata.filter(metaObj => metaObj.id == samp);

        console.log(resultArray2);

        var result2 = resultArray2[0];

        // parses out all demografic variables

        var age = result2.age;
        var bbtype = result2.bbtype;
        var ethnicity = result2.ethnicity;
        var gender = result2.gender;
        var id = result2.id;
        var location = result2.location;
        var wfreq = result2.wfreq;

        // creates the readable formating
        var demoinfo = ` id: ${id} <br> ethnicity: ${ethnicity} <br> gender: ${gender} <br> age: ${age} <br> location: ${location} <br> bbtype: ${bbtype} <br> wfreq: ${wfreq}`

        document.getElementById('sample-metadata').innerHTML = demoinfo;


        // BONUS Wash frequency 

        var data = [
            {
            //   domain: { x: [0, 1], y: [0, 1] },
            
              title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              value: wfreq,
              
            //   delta: { reference: 380 },
              gauge: {
                axis: { range: [null, 9], ticks: 9},
                steps: [
                  { range: [0, 1], color: "lightgray" },
                  { range: [1, 2], color: "gray" },
                  { range: [2, 3], color: "lightgray" },
                  { range: [3, 4], color: "gray" },
                  { range: [4, 5], color: "lightgray" },
                  { range: [5, 6], color: "gray" },
                  { range: [6, 7], color: "lightgray" },
                  { range: [7, 8], color: "gray" },
                  { range: [8, 9], color: "lightgray" }
                ],
                threshold: {
                  line: { color: "red", width: 3 },
                  thickness: 0.75,
                  value: wfreq

                }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data, layout);
        

    });

};

