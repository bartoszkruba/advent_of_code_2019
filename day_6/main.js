const fs = require('fs')
const orbits = {}
const totalPlanets = new Set()

fs.readFileSync('puzzle_inputs.txt').toString().split('\n').forEach(s => {
    const planets = s.split(')')

    orbits[planets[1]] = planets[0]
    totalPlanets.add(planets[0])
    totalPlanets.add(planets[1])
})

const orbitList = (orbits, planet, list = []) => {
    if (!(planet in orbits)) return list

    list.push(orbits[planet])
    return orbitList(orbits, orbits[planet], list)
}

const findSolutions = (orbits, totalPlanets) => {
    let total = 0
    for (planet of totalPlanets) {
        total += orbitList(orbits, planet).length
    }

    const solution1 = total

    const myOrbits = orbitList(orbits, 'YOU')
    const santasOrbits = orbitList(orbits, 'SAN')

    let solution2
    for (planet of myOrbits) {
        if (santasOrbits.includes(planet)) {
            solution2 = myOrbits.indexOf(planet) + santasOrbits.indexOf(planet)
            break
        }
    }

    return { solution1, solution2 }
}

const { solution1, solution2 } = findSolutions(orbits, totalPlanets)

console.log('Part One Solution: ' + solution1)
console.log('Part Two Solution: ' + solution2)
