const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

class Robot {
    position = [0, 0]
    direction = 0

    turn(dirCommand) {
        if (dirCommand === 0) {
            this.direction--
        } else {
            this.direction++
        }

        if (this.direction < 0) this.direction = 3
        else if (this.direction > 3) this.direction = 0
    }

    move() {
        switch (this.direction) {
            case 0:
                this.position[1] += 1
                break
            case 1:
                this.position[0] += 1
                break
            case 2:
                this.position[1] -= 1
                break
            case 3:
                this.position[0] -= 1
                break
        }
    }
}

const findSolutions = async inputs => {
    let panel = {}

    const robot = new Robot()
    const computer = new IntcodeComputer()

    computer.inputCallback = () => {
        panel[robot.position[0] + '|' + robot.position[1]] = computer.output.shift()

        robot.turn(computer.output.shift())
        robot.move()

        const key = robot.position[0] + '|' + robot.position[1]
        if (key in panel) return panel[key]
        else return 0
    }

    const output = await computer.compute(inputs.map(v => +v), [0])
    panel[robot.position[0] + '|' + robot.position[1]] = output.shift()

    const solution1 = Object.keys(panel).length

    return { solution1 }
}

findSolutions(inputs).then(({ solution1 }) => {
    console.log('Part One Solution: ' + solution1)

    process.exit()
})
