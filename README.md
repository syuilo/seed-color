seed-color
-------------------------------

[![][npm-badge]][npm-link]
[![][mit-badge]][mit]

Generate random color from a seed.
For example, such as when you want to generate a unique color from the values, such as IP address and ID.

## Install
``` shell
$ npm install seed-color --save
```

## Example
``` javascript
const seedColor = require('seed-color');

seedColor('hima').toHex(); // #d72c5d
seedColor('saku').toHex(); // #ae6e6c
```

### On TypeScript
Type definition are bundled.
``` typescript
import seedColor from 'seed-color';
```

## License
[MIT](LICENSE)

[npm-link]:  https://www.npmjs.com/package/seed-color
[npm-badge]: https://img.shields.io/npm/v/seed-color.svg?style=flat-square
[mit]:       http://opensource.org/licenses/MIT
[mit-badge]: https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
