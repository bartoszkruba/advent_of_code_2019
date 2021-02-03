const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)
const computer = new IntcodeComputer()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

    highest = 0

    const setupInputCallback = (computer, previous, next = null, nextPhase = null) => {
        computer.inputCallback = async () => {
            if (next && !next.computing) {
                next.compute(inputs.map(v => v), [nextPhase, computer.output.pop()])
            }
            while (!previous.output.length) await sleep(1)
            return previous.output.pop()
        }
    }

    for (permutation of permutator([5, 6, 7, 8, 9])) {
        const computerA = new IntcodeComputer()
        const computerB = new IntcodeComputer()
        const computerC = new IntcodeComputer()
        const computerD = new IntcodeComputer()
        const computerE = new IntcodeComputer()

        setupInputCallback(computerA, computerE, computerB, permutation[1])
        setupInputCallback(computerB, computerA, computerC, permutation[2])
        setupInputCallback(computerC, computerB, computerD, permutation[3])
        setupInputCallback(computerD, computerC, computerE, permutation[4])
        setupInputCallback(computerE, computerD)

        await computerA.compute(inputs.map(v => v), [permutation[0], 0])

        while (!computerE.output.length) { await sleep(1) }

        const result = computerE.output.pop()

        if (highest < result) highest = result
    }

    const solution2 = highest

    return { solution1, solution2 }
}

findSolutions(inputs, computer).then(({ solution1, solution2 }) => {
    console.log('Part One Solution: ' + solution1)
    console.log('Part Two Solution: ' + solution2)
    process.exit()
})