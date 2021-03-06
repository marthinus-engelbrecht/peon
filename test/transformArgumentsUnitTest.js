import transformArguments from '../source/transformArguments';
import * as ErrorTypes from '../source/constants/errorTypes';

describe(`Given the processArguments function is executed with arguments and help text`, function() {
    let args, result, expectedResult;

    describe(`with 'run' at position 3rd position`, function() {
        let generatorPath = '/generatorPath';

        beforeEach(function() {
            args = [ '/Users/Marthinus/.nvm/versions/node/v5.9.0/bin/node',
                '/Users/Marthinus/.nvm/versions/node/v5.9.0/bin/peon',
                'run',
                generatorPath,
                '--argument1',
                'value1',
                '--argument2',
                'value2',
                '--argument3',
                '--argument4',
                'value4' ];

            result = transformArguments(args);
        });

        it(`it should return the options and the path to the generator`, function() {

            let optionsMap = new Map([
                [ 'argument1', 'value1' ],
                [ 'argument2', 'value2' ],
                [ 'argument3', 'true' ],
                [ 'argument4', 'value4' ]
            ]);

            expectedResult = [ generatorPath, optionsMap ];

            expect(result).toEqual(expectedResult);
        });

    });

    describe(`with 'run' not at the 3rd position`, function() {
        it(`it should throw an error`, function() {
            args = [ '/Users/Marthinus/.nvm/versions/node/v5.9.0/bin/node',
                '/Users/Marthinus/.nvm/versions/node/v5.9.0/bin/peon',
                '--argument1',
                'value1',
                '--argument2',
                'value2',
                '--argument3',
                '--argument4',
                'value4' ];

            var error = {
                name: ErrorTypes.INVALID_COMMAND,
                message: `'${args[ 2 ]}' is not a valid command`
            };

            expect(transformArguments.bind(this, args)).toThrow(error);
        });
    });
});

