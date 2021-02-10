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

    reset() {
        this.direction = 0
        this.position = [0, 0]
    }
}

const findSolutions = async inputs => {
    let panel = {}

    const robot = new Robot()
    const computer = new IntcodeComputer()

    let minX, maxX, minY, maxY = 0

    computer.inputCallback = () => {
        panel[robot.position[0] + '|' + robot.position[1]] = computer.output.shift()

        robot.turn(computer.output.shift())
        robot.move()

        if (robot.position[0] < minX) minX = robot.position[0]
        else if (robot.position[0] > maxX) maxX = robot.position[0]

        if (robot.position[1] < minY) minY = robot.position[1]
        else if (robot.position[1] > maxY) maxY = robot.position[1]

        const key = robot.position[0] + '|' + robot.position[1]
        if (key in panel) return panel[key]
        else return 0
    }

    let output = await computer.compute(inputs.map(v => +v), [0])
    panel[robot.position[0] + '|' + robot.position[1]] = output.shift()

    const solution1 = Object.keys(panel).length

    minX = maxX = minY = maxY = 0
    robot.reset()
    computer.output = []
    panel = {}
    output = await computer.compute(inputs.map(v => +v), [1])
    panel[robot.position[0] + '|' + robot.position[1]] = output.shift()

    const paint = []
    for (let i = 0; i <= maxY - minY; i++) {
        let s = []
        for (let j = 0; j <= maxX - minX; j++) {
            s.push(' ')
        }
        paint.push(s)
    }

    for (key in panel) {
        const x = +key.split('|')[0] - minX
        const y = paint.length - (+key.split('|')[1] - minY) - 1
        if (panel[key] === 1) paint[y][x] = '#'
    }

    let solution2 = ''

    paint.forEach(line => solution2 += line.join('') + '\n')

    return { solution1, solution2 }
}

findSolutions(inputs).then(({ solution1, solution2 }) => {
    console.log('Part One Solution: ' + solution1)

    console.log('Part Two Solution: \n')
    console.log(solution2)

    process.exit()
})
