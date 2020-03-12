export default [
    {
        input: 'src/burdui.js',

        output: [
            {
                format: 'umd',
                name: 'burdui',
                file: 'build/burdui.js',
                indent: '\t'
            }
        ]
    }
];