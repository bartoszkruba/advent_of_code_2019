const fs = require('fs')

const positions = {}
const velocities = {}

fs.readFileSync('puzzle_inputs.txt').toString().split('\n').forEach((line, indx) => {
    const position = []

    line.replace(/>| |<|=|x|y|z/g, '').split(',').forEach((v, indx) => position[indx] = +v)

    positions[indx] = position
    velocities[indx] = [0, 0, 0]
})

const generatePairs = arr => {
    const pairs = []
    for (let i = 0; i < arr.length; i++) for (let j = 1 + i; j < arr.length; j++) pairs.push([arr[i], arr[j]])
    return pairs
}

const findSolutions = (positions, velocities) => {
    const pairs = generatePairs(Object.keys(positions))

    for (let i = 0; i < 1000; i++) {
        for (pair of pairs) {
            position1 = positions[pair[0]]
            position2 = positions[pair[1]]

            velocity1 = velocities[pair[0]]
            velocity2 = velocities[pair[1]]

            for (let j = 0; j < 3; j++) {
                if (position1[j] > position2[j]) {
                    velocity2[j] += 1
                    velocity1[j] -= 1
                } else if (position1[j] < position2[j]) {
                    velocity2[j] -= 1
                    velocity1[j] += 1
                }
            }
        }

        for (key in positions) {
            for (let i = 0; i < 3; i++) {
                positions[key][i] += velocities[key][i]
            }
        }
    }

    let total = 0

    for (key in positions) {
        let potential = 0
        let kinetic = 0
        for (let i = 0; i < 3; i++) {
            potential += Math.abs(positions[key][i])
            kinetic += Math.abs(velocities[key][i])

        }

        total += potential * kinetic
    }

    const solution1 = total

    return {solution1}
}

const {solution1} = findSolutions(positions, velocities)
console.log('Part One Solution: ' + solution1)

