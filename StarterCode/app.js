function init() {
    // 1) Read in samples.json using D3 library
    url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
    
    let selector = d3.select("#selDataset");

    // // Fetch JSON data, console log it
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

    function optionChanged(newSample){
        buildMetadata(newSample);
        buildCharts(newSample);
    }

    function buildMetadata(sample) {
        d3.json(url).then((data) => {
            var metadata = data.metadata; 
            var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
            var result = resultArray[0];
            var panel = d3.select('#sample-metadata');

            panel.html("");

            Object.entries(result).forEach(([key, value]) => {
                panel.append("h6").text(`${key}: ${value}`);
            });
        });
    };

    function buildCharts(sample){
        d3.json('samples.json').then((data) => {
            let samples = data.samples;
            let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
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
                orientation: 'h' 
        };

        let traceData = [trace1];

        Plotly.newPlot("bar", traceData)

            let layout = {
            title: "Belly Button Bacteria"
            };

            Plotly.newPlot("bar", traceData, layout);

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