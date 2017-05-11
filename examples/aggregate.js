const vegadataflow = require('../build/vega-dataflow.js');

// We have dataset with 4 fields - a, b, c and d. Lets apply different
// aggregation methods on them - count, sum, min and max:

var tx = vegadataflow.transforms,
    changeset = vegadataflow.changeset;

var data = [
 {
   "a": 17.76,
   "b": 20.14,
   "c": 17.05,
   "d": 17.79
 },
 {
   "a": 19.19,
   "b": 21.29,
   "c": 19.19,
   "d": 19.92
 },
 {
   "a": 20.33,
   "b": 22.9,
   "c": 19.52,
   "d": 21.12
 },
 {
   "a": 20.15,
   "b": 20.72,
   "c": 19.04,
   "d": 19.31
 },
 {
   "a": 17.93,
   "b": 18.09,
   "c": 16.99,
   "d": 17.01
 }
];

var a = vegadataflow.field('a'),
    b = vegadataflow.field('b'),
    c = vegadataflow.field('c'),
    d = vegadataflow.field('d');

var df = new vegadataflow.Dataflow(),
    col = df.add(tx.Collect),
    agg = df.add(tx.Aggregate, {
            fields: [a, b, c, d],
            ops: ['count', 'sum', 'min', 'max'],
            pulse: col
          }),
    out = df.add(tx.Collect, {pulse: agg});

df.pulse(col, changeset().insert(data)).run();

console.dir(out.value);
