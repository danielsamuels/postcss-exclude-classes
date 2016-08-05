import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('ensure the class is removed', t => {
    return run(t, '.remove-me { }', '', {
        blacklist: ['.remove-me']
    });
});

test('ensure the nested class is removed', t => {
    return run(t, '.parent .remove-me { }', '', {
        blacklist: ['.remove-me']
    });
});

test('ensure the class is not removed', t => {
    return run(t, '.dont-remove-me { }', '.dont-remove-me { }', {
        blacklist: ['.remove-me']
    });
});

test('ensure the class is not removed without blacklist', t => {
    return run(t, '.dont-remove-me { }', '.dont-remove-me { }', {});
});
