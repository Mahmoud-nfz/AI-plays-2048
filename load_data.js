let SIMULATION_SPEED = 10 ;
const speeds = [1000,500,250,100,50,10,5,0] ;
const dp = new Map();

function saveTraining(){    
    // convert the Map object to a JSON string
    const json = JSON.stringify(Array.from(dp.entries()));
    
    // create a new Blob object from the JSON string
    const blob = new Blob([json], { type: 'application/json' });
    
    // create a new URL for the blob
    const url = URL.createObjectURL(blob);
    
    // create a new link element to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'myMap.json';
    
    // add the link to the document and click it to start the download
    document.body.appendChild(link);
    link.click();
    
    // clean up by revoking the URL
    URL.revokeObjectURL(url);
}

// // use fetch to load the contents of model.json
// fetch('model.json')
//   .then(response => response.json()) // parse the JSON data
//   .then(data => {
//     // loop over the data and set each key/value pair in the Map object
//     data.forEach(([key, value]) => {
//       dp.set(key, value);
//     });

//     // do something with the loaded Map object
//     console.log(dp);
//   })
//   .catch(error => console.error(error));
