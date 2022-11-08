// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["path/to/script.py", arg1, arg2, ...]);
// Then all you have to do is make sure that you import sys in your python script, and then you can access arg1 using sys.argv[1], arg2 using sys.argv[2], and so on.

// To send data back to node just do the following in the python script:

// print(dataToSendBack)
// sys.stdout.flush()
// And then node can listen for data using:

// pythonProcess.stdout.on('data', (data) => {
//  // Do something with the data returned from python script
// });

const { spawn } = require('child_process'); 

function cleanWarning(error) {
  return error.replace(/Detector is not able to detect the language reliably.\n/g,"");
}



module.exports = function getColsAndTypes(filename) {

  return new Promise((resolve, reject) => {
    
    const pythonProcess = spawn('python', [`./py/testing.py`, filename])

    let result = "";
    let resultError = "";
        
    pythonProcess.stdout.on('data', function(data) {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        resultError += cleanWarning(data.toString());
    });

    pythonProcess.stdout.on("end", function(){
      if(resultError == "") {
        resolve(JSON.parse(result));
      }

      else{
        const error = new Error(resultError);
        console.error(error);
        reject(resultError);
      }
    })
  })
}


