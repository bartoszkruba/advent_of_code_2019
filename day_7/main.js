const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)
const computer = new IntcodeComputer()

const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

const findSolutions = async (inputs, computer) => {
    let highest = 0

    for (permutation of permutator([0, 1, 2, 3, 4])) {
        let input = 0
        
        for (phase of permutation) {
            const output = await computer.compute(inputs.map(v => v), [phase, input])
            input = output.pop()
        }
        if (highest < input) highest = input
    }

    const solution1 = highest

    return {solution1}
}

findSolutions(inputs, computer).then(({solution1}) => {
    console.log('Part One Solution: ' + solution1)
    process.exit()
})