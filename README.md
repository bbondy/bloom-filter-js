# bloom-filter-js

## Installation

    npm install bloom-filter-js

## Usage

    let BloomFilter = require('bloom-filter-js');

    let b = new BloomFilter();
    b.add('Brian');
    b.add('Ronald');
    b.add('Bondy');

    // Probably will print true
    console.log(b.exists('Brian'));

    // Definitely will print false
    console.log(b.exists('Brian Ronald'));

    // Serialize and deserialize
    let json = JSON.stringify(b.toJSON());

    // Create an ew BloomerFilter form a previous serialization
    let b2 = BloomFilter.from(JSON.parse(json));

    // Will print the same as b.exists
    console.log(b2.exists('Brian'));
    console.log(b2.exists('Brian Ronald'));
