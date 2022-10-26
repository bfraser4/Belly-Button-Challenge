function init() {
    // 1) Read in samples.json using D3 library
    url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
    
    // Use d3 to select the dropdown element '#selDataset'
    let selector = d3.select("#selDataset");

    // Fetch JSON data, console log it
    d3.json('samples.json').then(function(data){
        var sampleValues = data.names;
        console.log(data);

        sampleValues.forEach((sample) => {
            selector
            .append('option')
            .text(sample)
            .property('value', sample);
        });
        var firstSample = sampleValues[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
    }

    init();
    // Fetch new data each time a row sample is selected
    function optionChanged(newSample){
        buildMetadata(newSample);
        buildCharts(newSample);
    }

    function buildMetadata(sample) {
        d3.json(url).then((data) => {
            var metadata = data.metadata; 
            // Filter the data for the object with the desired sample number
            var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
            var result = resultArray[0];
            // Use d3 to select the panel with id of '#sample-metadata'
            var panel = d3.select('#sample-metadata');
            // Use .html("") to clear any existing metadata
            panel.html("");
            // Inside the loop, use d3 to append new tags for each key value
            Object.entries(result).forEach(([key, value]) => {
                panel.append("h6").text(`${key}: ${value}`);
            });
        });
    };

    function buildCharts(sample){
        d3.json('samples.json').then((data) => {
            // put the data into variables
            // filter the data using 'samples'
            let samples = data.samples;
            let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
            // grab the first entry [0]
            let result = resultArray[0];
            let otu_ids = result.otu_ids;
            let otu_labels = result.otu_labels.slice(0,10).reverse();
            let sample_values = result.sample_values.slice(0,10).reverse();
            let bubble_labels = result.otu_labels;
            let bubble_values = result.sample_values;

            let yData = result.otu_ids.slice(0,10);
            let yLabels = [];
            yData.forEach(function(sample){
                yLabels.push(`OTU${sample}`);
            });

            let trace1 = {
                x: sample_values.slice(0,10).reverse(),
                y: yLabels.reverse(),
                text: result.otu_labels.slice(0,10),
                name: "Belly Button Bacteria", 
                type: "bar", 
                orientation: 'h',
                marker: {
                    color: 'blueviolet'
                }
                
        };

        let traceData = [trace1];

        Plotly.newPlot("bar", traceData)

            let layout = {
            title: "Belly Button Bacteria"
            };

            Plotly.newPlot("bar", traceData, layout);
            // Build a Bubble Chart
            let bubbleData = [{
                x: otu_ids,
                y: bubble_values,
                text: bubble_labels,
                mode: 'markers', 
                marker: {
                    size: bubble_values,
                    color: bubble_values,
                    colorscale: 'Bluered'
                    
                }
        
            }];

            let bubbleLayout = {
                title: "Bacteria Present",
                xaxis: {title: "OTU ID"}, 
            };
            Plotly.newPlot('bubble', bubbleData, bubbleLayout)
    });
}