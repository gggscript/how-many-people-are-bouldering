# How many people are bouldering?

Programmatically find out how many people are in a bouldering gym

## Usage

You need [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Install with `npm install how-many-people-are-bouldering`

```js
const Bouldering = require('how-many-people-are-bouldering')

// Bouldering.gyms is an Array of all supported gyms
// you can also find this data in gyms.json
const myFavoriteGym = Bouldering.gyms.find((gym) => gym.name === 'Berlin Magicmountain')

Bouldering.getOccupancy(myFavoriteGym).then((result) => console.log(result))

// Because Berlin Magicmount uses Boulderado's API (myFavoriteGym.api.type === 'boulderado')
// -> the result will be absolute
const exampleAbsoluteResult = {
  type: 'absolute',
  current: 69,
  max: 130,
}
const exampleRelativeResult = {
  type: 'relative',
  percentage: 15,
}
```
