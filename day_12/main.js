const fs = require('fs')

const positions = {}
const velocities = {}

fs.readFileSync('test_inputs.txt').toString().split('\n').forEach((line, indx) => {
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

const timeStep = (positions, velocities, pairs) => {
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

const findPatternLength = history => {
    let length = 1

    while (true) {
        const h = history.length % length !== 0 ? history.slice(0, -(history.length % length)) : history.map(v => v)
        const repetitions = h.length / length;
        const pattern = h.slice(0, length).join('')

        if (pattern.repeat(repetitions) === h.join('')) {
            return length
        };

        length++
    }
}

const findSolutions = (positions, velocities) => {
    const pairs = generatePairs(Object.keys(positions))

    let initial = ''
    for (let key in positions) {
        for (v of positions[key]) initial += v
    }

    for (let key in velocities) {
        for (v of velocities[key]) initial += v
    }

    let positionsCopy = JSON.parse(JSON.stringify(positions))
    let velocitiesCopy = JSON.parse(JSON.stringify(velocities))

    const history = []
    for (let i = 0; i < Object.keys(positions).length * 3; i++) history.push([])

    for (let i = 0; i < 1000; i++) {
        timeStep(positionsCopy, velocitiesCopy, pairs)

        let i = 0
        for (let key in positionsCopy)
            for (let j = 0; j < positions[0].length; j++) history[+key * 3 + j].push(positionsCopy[key][j])
    }

    let patternLengths = history.map(h => findPatternLength(h))
    let step = patternLengths.pop()
    let i = step

    while (patternLengths.length > 0) {
        patternLengths = patternLengths.filter(l => {
            if (i % l === 0) {
                step = i
                return false
            }
            return true
        })
        if (patternLengths.length > 0)
            i += step
    }
    console.log(i)

    let total = 0

    for (key in positions) {
        let potential = 0
        let kinetic = 0
        for (let i = 0; i < 3; i++) {
            potential += Math.abs(positionsCopy[key][i])
            kinetic += Math.abs(velocitiesCopy[key][i])

        }

        total += potential * kinetic
    }

    const solution1 = total


    return { solution1 }
}

const { solution1 } = findSolutions(positions, velocities)
console.log('Part One Solution: ' + solution1)

