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
    let chosenAstroidDeltas = null
    let chosen = null

    asteroids.forEach(a1 => {
        const deltas = asteroids.filter(a2 => a2 != a1).map(a2 => [a1[0] - a2[0], a1[1] - a2[1]])

        const visible = new Set(deltas.map(d => Math.atan2(d[0], d[1])))

        if (highest < visible.size) {
            highest = visible.size
            chosenAstroidDeltas = deltas
            chosen = a1
        }
    })

    const solution1 = highest

    groupedAsteroids = []

    chosenAstroidDeltas.forEach(d => {
        const angle = Math.atan2(d[0], d[1])

        const a = groupedAsteroids.find(v => v.angle === angle)
        if (a) a.asteroids.push(d)
        else groupedAsteroids.push({ angle, asteroids: [d] })
    })

    groupedAsteroids.sort((a, b) => a.angle - b.angle)
    groupedAsteroids.forEach(a => a.asteroids.sort((a, b) => Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2)) - Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2))))

    const vaporized = []
    let i = groupedAsteroids.findIndex(a => a.asteroids[0][0] >= 1 && a.asteroids[0][1] === 0)

    while (vaporized.length < 200) {
        if (groupedAsteroids[i].asteroids.length) vaporized.push(groupedAsteroids[i].asteroids.shift())

        i++
        if (i == groupedAsteroids.length) i = 0
    }

    const lastVaporized = vaporized.pop()

    const solution2 = (chosen[1] - lastVaporized[1]) * 100 + (chosen[0] - lastVaporized[0])

    return { solution1, solution2 }
}

const { solution1, solution2 } = findSolutions(asteroids)

console.log('Part One Solution: ' + solution1)
console.log('Part Two Solution: ' + solution2)
