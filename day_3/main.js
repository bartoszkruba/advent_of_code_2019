const fs = require('fs')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split('\n').map(line => line.split(','))


const wire_coordinates = []

for (input of inputs) {
    position = [0, 0]
    const coords = new Set()

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

            coords.add(position[0] + "|" + position[1])
        }
    }

    wire_coordinates.push(coords)
}

corssings = new Set()

const lowest = [...wire_coordinates[0]].filter(coordinate => wire_coordinates[1].has(coordinate))
                        .map(crossing => Math.abs(+crossing.split('|')[0]) + Math.abs(+crossing.split('|')[1]))
                        .sort()[0]

console.log(lowest)