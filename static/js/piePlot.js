var data = [{
    values: [1836, 2605, 280, 1285],
    labels: ['Netflix', 'Amazon', 'Disney Plus', 'Hulu'],
    type: 'pie'
}];

var layout = {
    title:"Streaming Service Libary of TV Shows as of February 2021",
    height: 400,
    width: 500
};

Plotly.newPlot('myDiv', data, layout);