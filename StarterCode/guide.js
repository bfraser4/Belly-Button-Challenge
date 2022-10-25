function buildMetadata(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        
    let metadata = data.metadata;
        // Filter the data for the object with the desired sample number
    ​
        // Use d3 to select the panel with id of `#sample-metadata`
        
    ​
        // Use `.html("") to clear any existing metadata
        
    ​
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
    ​
    ​
        // BONUS: Build the Gauge Chart ... give this a try if you have time.  Otherwise don't add anything.
        
      });
}
      function buildCharts(sample) {
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        //   put the data into a variable
        //   filter the data using 'sample'
        //   grab the first entry [0]
      
          let otu_ids = result.otu_ids;
          let otu_labels = result.otu_labels;
          let sample_values = result.sample_values;
      
          // Build a Bubble Chart
        //   https://plotly.com/javascript/bubble-charts/
      
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      
            // slice the data down to 10 items  
            //you will probably want to reverse them to get them into desc order
          let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
          //create trace
     
            // create layout  (title is enough)
    ​
            // draw your plot Plotly.newPlot()
          
        });
      }
      
      function init(){
        //use d3 to select the dropdown element ($selDataset)
    ​
        // Use the list of sample names to populate the select options
    ​
        //loop through names from sample names
        //append option 
    ​
        // use the first sample from the list to build the intial plots
        // run build charts
        // run build metadata
      }
    ​
      function optionChanged(newSample){
        //Fetch new data each time a row sample is selected
        // run build charts
        // run build metadata
      }
    ​
      init()