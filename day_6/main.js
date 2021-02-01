const fs = require('fs')
const orbits = {}
const totalPlanets = new Set()

fs.readFileSync('puzzle_inputs.txt').toString().split('\n').forEach(s => {
    const planets = s.split(')')

    orbits[planets[1]] = planets[0]
    totalPlanets.add(planets[0])
    totalPlanets.add(planets[1])
})

const orbitCount = (orbits, planet, total = 0) => {
    if (!(planet in orbits)) return total
    return orbitCount(orbits, orbits[planet], total + 1)
}

const findSolutions = (orbits, totalPlanets) => {
    let total = 0
    for (planet of totalPlanets) {
        total += orbitCount(orbits, planet)
    }

    const solution1 = total

    return {solution1}
}

const {solution1} = findSolutions(orbits, totalPlanets)

console.log('Part One Solution: ' + solution1)
