var filter = d3.select("#selDataset"); 

// gives a starting reference for display on load
var samp = "2016"


d3.json("http://127.0.0.1:5000/2").then((data) => {
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

});

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

    full_filter_imdb = [];
    full_filter_reel = [];

    imdb_top_titles = [];
    reel_top_titles = [];

    imdb_top_plat_disp = [];
    reel_top_plat_disp = [];
    
        // do I need a delete existing graph line here????

    d3.html('');
        
        
    d3.json("http://127.0.0.1:5000/2").then((data) => {
        // Creates variables to hold the peices of data. 
        
        for (i = 0; i < data.length; i++) {
            var shows = data[i]
            
            show_years.push(shows[2]);
          }
         

        


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

        // get the total number of shows per platform for that year
        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

        prime_tot = countOccurrences(onprime, true)
        netflix_tot = countOccurrences(onnetflix, true)
        disney_tot = countOccurrences(ondisney, true)
        hulu_tot = countOccurrences(onhulu, true)


        console.log(prime_tot);

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
        var imdb_ind = findIndicesOfMax(imdb_ratings, 10);
        // console.log(imdb_ind);

        // get the 10 greatest imdb scores
        for (var i = 0; i < imdb_ind.length; i++)
            imdbtop.push(imdb_ratings[imdb_ind[i]]);
        
        // console.log(imdbtop);

        // get indices of 10 greatest reel elements
        var reel_ind = findIndicesOfMax(reel_ratings, 10);
        // console.log(reel_ind);

        // get the 10 greatest reel scores
        for (var i = 0; i < reel_ind.length; i++)
            reeltop.push(reel_ratings[reel_ind[i]]);
        
        // console.log(reeltop);


        // get the full data for top ten reel scores

        reel_ind.forEach(function (values){
            full_filter_reel.push(data_sel[values]);
        });

        // get the full data for top ten imdb scores

        imdb_ind.forEach(function (values){
            full_filter_imdb.push(data_sel[values]);
        });

        console.log(full_filter_imdb);
        
        // get the titles and platform labels for the imdb graph

        full_filter_imdb.forEach(function (values){
            imdb_top_titles.push(values[1]);


                var platdisplay = "";
                
                if (values[5] == true){
                    platdisplay += "prime ";
                }

                else if (values[6] == true){
                    platdisplay += "netflix ";
                }

                else if (values[7] == true){
                    platdisplay += "disney+ ";
                }

                else if (values[8] == true){
                    platdisplay += "hulu ";
                }

           
         imdb_top_plat_disp.push(platdisplay);
        });

        // get the titles and platform labels for the reel graph

        full_filter_reel.forEach(function (values){
            reel_top_titles.push(values[1]);


                var platdisplay = "";
                
                if (values[5] == true){
                    platdisplay += "prime ";
                }

                else if (values[6] == true){
                    platdisplay += "netflix ";
                }

                else if (values[7] == true){
                    platdisplay += "disney+ ";
                }

                else if (values[8] == true){
                    platdisplay += "hulu ";
                }

           
         reel_top_plat_disp.push(platdisplay);
        });
        
        console.log(reel_top_titles);
        console.log(reel_top_plat_disp);


        


        // IMDB CHART BUILD

        // formats the x, y ticks and labels for the imdb bar chart 

        var yticks = imdb_top_titles;
        var xticks = imdbtop;
        var labels = imdb_top_plat_disp;

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
            title: `top 10 IMDB Rated Shows For ${samp}`,
            xaxis: {
                tickmode: "linear",
                tick0: 0.25,
                dtick: 0.25
              },
            yaxis: {
                automargin: true
            }
        };
        
        Plotly.newPlot('bar', data, layout);

        // REEL CHART BUILD

        // formats the x, y ticks and labels for the Reel bar chart 

        var yticks = reel_top_titles;
        var xticks = reeltop;
        var labels = reel_top_plat_disp;

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
            title: `top 10 Reel Rated Shows For ${samp}`,
            xaxis: {
                tickmode: "linear",
                tick0: 0,
                dtick: 5
              },
            
            yaxis: {
                automargin: true
            }
        };
        
        Plotly.newPlot('c_visual', data, layout);



        // PLATFORMS TOTAL CHART

        // creates the readable formating
        var demoinfo = ` Prime: ${prime_tot} <br> Netflix: ${netflix_tot} <br> Disney+: ${disney_tot} <br> Hulu: ${hulu_tot}`

        document.getElementById('sample-metadata').innerHTML = demoinfo;

    });

};