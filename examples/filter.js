const vegadataflow = require('../build/vega-dataflow.js');

// Using the dataset from aggregation example, lets filter values of field `a`
// that are not greater than 19:

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

var a = vegadataflow.field('a');

var filter1 = vegadataflow.accessor(d => { return d.a > 19 }, ['a']);

var df = new vegadataflow.Dataflow(),
    ex = df.add(null),
    col = df.add(tx.Collect),
    fil = df.add(tx.Filter, {expr: ex, pulse: col}),
    out = df.add(tx.Collect, {pulse: fil});

df.pulse(col, changeset().insert(data));
df.update(ex, filter1).run();

console.log(out.value);
