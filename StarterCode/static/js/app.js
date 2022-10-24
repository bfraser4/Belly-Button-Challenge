// 1) Read in samples.json using D3 library
url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch JSON data, console log it
d3.json(url).then(function(data){
    console.log(data);
});

// 2) Create a horizontal bar chart with a dropdown menu
// sample_values as values 
// otu_ids as labels
// otu_labels as hovertext 
function buildMetadata(sample){
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let results = metadata.filter(selDataset => selDataset.id == sample);
        let result = results[0];
        let panel = d3.select('#sample-metadata');
        panel.html("");
        Object.values(result).forEach(([key, value]) => {panel.append('h5').text(`${key}: ${value}`)});
    });
}

    function buildCharts(sample){
        d3.json(url).then(data => {
            console.log(data);
            sample = data.sample;
            let filter = sample.filter(row => row.id == sample);
            let result = filter[0];
            let otu_ids = result.otu_ids;
            let otu_labels = result.otu_labels;
            let sample_values = result.sample_values;

            let yticks = otu_ids.slice(0,10).map(otuID => "OTU" + otuID).reverse();
            let xticks = sample_values.slice(0,10).reverse();

        let trace1 = {
            y: yticks,
            x: xticks,
            text: otu_labels.slice(0,10).reverse(), 
            type: 'bar',
            orientation:'h'
        };

        let bar_chart = [trace1];

        let layout = {
        width: 400,
        height: 600
        }

        Plotly.newPlot('bar', bar_chart, layout)
    });
}



// 3) Create a bubble chart that displays each sample
// otu_ids for the x values
// sample_values for the y values 
// sample_values for the marker size 
// otu_ids for the marker colors 
// otu_labels for the text values 

// 4) Display the sample metadata 
function init(){
    d3.json(url).then(data => {
        dropdown = d3.select('#selDataset')
        _name = data.names
         _name.forEach((name) => {
            dropdown.append('option').text(name).property('value', name);

        let sample = _name[0];
        Metadata(sample);
        buildCharts(sample);
        
         })

    })
}
// 5) Display each key-value pair from the metadata JSON object somewhere on the page

// 6) Update all the plots when a new sample is selected