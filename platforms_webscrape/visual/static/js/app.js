var filter = d3.select("#selDataset"); 

// gives a starting reference for display on load
var samp = "2021"

// handles changes
function optionChanged(sample) {
    samp = sample;

    console.log(samp);

    renderProccess();

};

// displays on load
renderProccess();


function renderProccess(){ 

    show_years = [];
    index_data_sel = [];
    data_sel = [];

    var show_titles = [];
    var imdb_ratings = [];
    var reel_ratings = [];
    var onprime = [];
    var onnetflix = [];
    var ondisney = [];
    var onhulu = [];

    imdbtop =[];
    reeltop = [];

    
    
        // do I need a delete existing graph line here????

    d3.html('');

    d3.json("platforms_whole.json").then((data) => {
        // Creates variables to hold the peices of data. 
        
        for (i = 0; i < data.length; i++) {
            var shows = data[i]
            
            show_years.push(shows[2]);
          }
         

        

      

        // grabs data for drop down
        var valfilt = show_years.filter((value, index, self) => self.indexOf(value) === index);
        var valdrop = valfilt.sort((a, b) => a - b);
      

        
    
        // creates drop down
        valdrop.forEach(function (values) {
            filter.append('option').text(values);
        });


        // finds indexes for year selected
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
            
            imdb_ratings.push(values[3]);
            reel_ratings.push(values[4]);
            onprime.push(values[5]);
            onnetflix.push(values[6]);
            ondisney.push(values[7]);
            onhulu.push(values[8]); 
        });

        

        // function to get top ten scores and there index's
        

        function findIndicesOfMax(inp, count) {
            var outp = [];
            for (var i = 0; i < inp.length; i++) {
                outp.push(i); // add index to output array
                if (outp.length > count) {
                    outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
                    outp.pop(); // remove the last index (index of smallest element in output array)
                }
            }
            return outp;
        }

        
        // get indices of 10 greatest imdb elements
        var indices = findIndicesOfMax(imdb_ratings, 10);
        console.log(indices);

        // get the 10 greatest imdb scores
        for (var i = 0; i < indices.length; i++)
            imdbtop.push(imdb_ratings[indices[i]]);
        
        console.log(imdbtop);

        // get indices of 10 greatest imdb elements
        var indices = findIndicesOfMax(reel_ratings, 10);
        console.log(indices);

        // get the 10 greatest imdb scores
        for (var i = 0; i < indices.length; i++)
            reeltop.push(reel_ratings[indices[i]]);
        
        console.log(reeltop);




        var resultArray = samples.filter(sampleObj => sampleObj.id == samp);


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
        // var xticksbub = otu_ids.slice(0, 10);
        // xticksbub.push.apply(xticksbub, otu_ids.slice(Math.max(otu_ids.length - 10, 1)));

        // var yticksbub = sample_values.slice(0, 10);
        // yticksbub.push.apply(yticksbub, sample_values.slice(Math.max(sample_values.length - 10, 1)));

        // var labelsbub = otu_labels.slice(0, 10);
        // labelsbub.push.apply(labelsbub, otu_labels.slice(Math.max(otu_labels.length - 10, 1)));


        // console.log(xticksbub);
        // console.log(labelsbub);
        // console.log(yticksbub);

        // // plots data
        // var trace1 = {
        //     x: xticksbub,
        //     y: yticksbub,
        //     mode: 'markers',
        //     marker: {
        //       color: xticksbub,  
        //       size: yticksbub,
        //       colorscale: "Earth"
        //     },
        //     text: labelsbub
        //   };
          
        //   var data = [trace1];
          
        //   var layout = {
        //     title: 'First Ten and Last Ten Samples',
        //     xaxis: {
        //         title: "OTU ID"
        //     },
        //     showlegend: false,
        //     height: 600,
        //     width: 1200
        //   };
          
        //   Plotly.newPlot('bubble', data, layout);

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

    });

};

