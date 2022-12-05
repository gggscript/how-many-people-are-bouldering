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
## Support

### 2 APIs

- [Boulderado](src/apis/boulderado.ts) (21 gyms)
- [Webclimber](src/apis/webclimber.ts) (10 gyms)

### 31 Gyms

- [Aalen Kletterhalle](https://kletterhalle-aalen.de)
- [Berlin Magicmountain](https://www.magicmountain.de)
- [Biberach DAV](https://www.sparkassen-dome-biberach.de)
- [Burgoberbach Boulder Hall](https://boulderhall.de)
- [Duisburg Einstein](https://duisburg.einstein-boulder.com)
- [Erlangen DAV](https://www.kletter-und-vereinszentrum.de)
- [Erlangen Der Steinbock](https://www.dersteinbock-erlangen.de)
- [Frankfurt Kletterbar](https://kletterbar-offenbach.de)
- [Hannover Kletterbar](https://kletterbar-hannover.de)
- [Hersbruck Raiffeisebank](https://www.raiffeisenbank-kletterwelt.de)
- [Ingolstadt DAV](https://www.dav-ringsee.de)
- [Kiel Kletterbar](https://kletterbar-kiel.de)
- [Kirchheim Stuntwerk](https://stuntwerk-kirchheim.de)
- [Koeln Kletterfabrik](https://www.kletterfabrik.koeln)
- [Koeln Stuntwerk](https://stuntwerk-koeln.de)
- [Konstanz Der Steinbock](https://www.dersteinbock-konstanz.de)
- [Krefeld Stuntwerk](https://stuntwerk-krefeld.de)
- [Memmingen DAV](https://boulderhalle-memmingen.de)
- [Munich Einstein](https://muenchen.einstein-boulder.com)
- [Nuernberg Boulderhalle](https://www.boulderhalle-e4.de)
- [Nuernberg climbing factory](https://climbing-factory.de/startseite.html)
- [Nuernberg Der Steinbock](https://www.dersteinbock-nuernberg.de)
- [Passau Der Steinbock](https://www.dersteinbock-passau.de)
- [Recklinghausen Einstein](https://recklinghausen.einstein-boulder.com)
- [Regensburg DAV](https://www.kletterzentrum-regensburg.de)
- [Reutlingen DAV](https://www.kletterzentrum-reutlingen.de)
- [Rosenheim Stuntwerk](https://stuntwerk-rosenheim.de)
- [Ulm Einstein](https://ulm.einstein-boulder.com)
- [VELS Boulderhalle](https://vels-stuttgart.de)
- [Wuerzburg Rock Inn](https://rockinn-wuerzburg.de)
- [Zirndorf Der Steinbock](https://www.dersteinbock-zirndorf.de)

