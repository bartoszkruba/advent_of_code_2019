const fs = require('fs')

const asteroids = []

fs.readFileSync('puzzle_inputs.txt').toString().split('\n').forEach((line, col) => {
    line.split('').forEach((c, row) => {
        if (c === '#')
            asteroids.push([col, row])
    })
})

const findSolutions = (asteroids) => {
    let highest = 0

    asteroids.forEach(a1 => {
        const deltas = asteroids.filter(a2 => a2 != a1).map(a2 => [a1[0] - a2[0], a1[1] - a2[1]])

        const visible = new Set(deltas.map(f => Math.atan2(f[0], f[1])))

        if (highest < visible.size) highest = visible.size
    })

    const solution1 = highest

    return { solution1 }
}

const { solution1 } = findSolutions(asteroids)

console.log('Part One Solution: ' + solution1)
