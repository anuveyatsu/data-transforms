const vegadataflow = require('../build/vega-dataflow.js');

// Lets create a dataset with 100 rows and take a sample of 10 from it:

var tx = vegadataflow.transforms,
    changeset = vegadataflow.changeset;

var n = 100,
    sampleSize = 10,
    data = Array(n),
    i;

for(i=0; i<n; i++) data[i] = {v:Math.random()};

var df = new vegadataflow.Dataflow(),
    s = df.add(tx.Sample, {size: sampleSize});

df.pulse(s, changeset().insert(data)).run();

console.log(s.value);
