### Vega Dataflow usage for DP views

Vega has quite a lot of data transform functions available, however, most of them require complicated JSON descriptor to use. Although we may implement them in the future, at the moment we could start with the most basic and essential ones:

**List of transforms that we could use:**

* Aggregate
* Filter
* Formula (applies given formula to dataset)
* Sample

To run examples on local machine, please clone this repo and run one of scripts using Node in `/examples/` directory:

```bash
$ node ./examples/filter.js
```

### Suggestion on usage from datapackage.json

Our current simple view layout:

```javascript=
{
  name: 'sample',
  resource: [0],
  specType: 'simple',
  spec: {
    type: 'line',
    group: 'a',
    series: ['b', 'c']
  }
}
```

We could add `transform` property that would be a specification for transforms to be applied. Each transform would have slightly different properties:

#### Aggregate

```javascript=
{
  ...
  transform: {
    type: 'aggregate',
    fields: ['a', 'b'],
    operations: ['sum', 'min']
  },
  ...
}
```
For `aggregate` transform, a publisher should pass a field name and an operation to be applied. Operations should be one of https://vega.github.io/vega/docs/transforms/aggregate/

#### Filter

```javascript=
{
  ...
  transform: {
    type: 'filter',
    expr: 'data.fieldName > 10'
  },
  ...
}
```
For `filter` type expression should evaluate to true or false so only truthy values will be kept.

#### Formula

```javascript=
{
  ...
  transform: {
    type: 'formula',
    expr: ['data.fieldName * 2', 'data.fieldName + 10'],
    as: ['x', 'y']
  },
  ...
}
```

For `formula` type, a field will be mapped with given expression and output will be stored in new fields that are specified in `as` property.

#### Sample

```javascript=
  ...
  transform: {
    type: 'sample',
    size: 'some integer'
  },
  ...
```
In `sample` type, only size of a sample is needed.
