# bloom-filter-js

## Installation

    npm install bloom-filter-js

## Usage

    let b = new BloomFilter();
    b.add('Brian');
    b.add('Ronald');
    b.add('Bondy');
    // expect(b.exists('Brian')).toBe(true);
    // expect(b.exists('Brian Ronald')).toBe(false);

