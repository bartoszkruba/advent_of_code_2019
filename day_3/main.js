const fs = require('fs')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split('\n').map(line => line.split(','))

const wireCoordinates = (inputs) => {
    const wireCoordinates = []

    for (input of inputs) {
        position = [0, 0]
        const coords = {}

        let totalSteps = 0
        for (point of input) {
            direction = point[0]
            value = +point.slice(1)

            for (let i = 0; i < value; i++) {
                switch (direction) {
                    case 'R':
                        position[0] += 1
                        break
                    case 'L':
                        position[0] -= 1
                        break
                    case 'U':
                        position[1] += 1
                        break
                    case 'D':
                        position[1] -= 1
                        break
                }
                
                totalSteps++
                key = position[0] + "|" + position[1]
                if (!(key in coords)) coords[key] = totalSteps
            }
        }

        wireCoordinates.push(coords)
    }

    return wireCoordinates
}


const findSolutions = (inputs) => {
    const coordinates = wireCoordinates(inputs)

    const crossings = Object.keys(coordinates[0]).filter(coordinate => coordinate in coordinates[1])

    const closest = crossings.map(crossing => Math.abs(+crossing.split('|')[0]) + Math.abs(+crossing.split('|')[1]))
        .sort((a, b) => a - b)[0]

    const fastests = crossings.map(coord => coordinates[0][coord] + coordinates[1][coord])
        .sort((a, b) => a - b)[0]

    return {closest, fastests}
}

const {closest, fastests} = findSolutions(inputs)
console.log('Part One Solution: ' + closest)
console.log('Part Two Solution: ' + fastests)