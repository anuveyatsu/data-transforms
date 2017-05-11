const vegadataflow = require('../build/vega-dataflow.js');

// Using the same dataset as in filter example, lets apply mapping on a field:

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


var df = new vegadataflow.Dataflow(),
    e = vegadataflow.field('e'),
    f = vegadataflow.field('f'),
    formula1 = vegadataflow.accessor(d => { return d.a * 10; }, ['a']),
    formula2 = vegadataflow.accessor(d => { return d.b / 10; }, ['b']),
    col = df.add(tx.Collect),
    fa = df.add(tx.Formula, {expr: formula1, as: 'e', pulse: col}),
    fb = df.add(tx.Formula, {expr: formula2, as: 'f', pulse: fa});

df.pulse(col, changeset().insert(data)).run();

console.log(col.value.map(e));
console.log(col.value.map(f));
