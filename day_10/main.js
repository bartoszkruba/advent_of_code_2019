const fs = require('fs')

const asteroids = []

fs.readFileSync('puzzle_inputs.txt').toString().split('\n').forEach((line, col) => {
    line.split('').forEach((c, row) => {
        if (c === '#')
            asteroids.push([col, row])
    })
})

const gcd_two_numbers = (x, y) => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

const lcm_two_numbers = (x, y) => {
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

const lcm = arr => {
    let common = lcm_two_numbers(arr[0], arr[1])

    for (v of arr.slice(2)) {
        common = lcm_two_numbers(common, v)
    }

    return common
}

const findSolutions = (asteroids) => {
    let highest = 0
    asteroids.forEach(a1 => {
        const fractions = asteroids.filter(a2 => a2 != a1).map(a2 => [a1[0] - a2[0], a1[1] - a2[1]])

        const cm = lcm(fractions.filter(f => f[0] !== 0 && f[1] !== 0).map(f => f[1]))

        const normalized = fractions
            .map(f => {
                const factor = (f[1] === 0) ? 1 : parseInt(Math.abs(cm / f[1]))

                return [f[0] * factor, f[1] * factor]
            })
            .map(f => {
                if (f[1] === 0 && f[0] === 0) return f
                if (f[1] === 0) return (f[0] < 0) ? [-1, 0] : [1, 0]
                if (f[0] === 0) return (f[1] < 0) ? [0, -1] : [0, 1]

                return f
            })
            .map(f => f[0] + '|' + f[1])

        const unique = new Set(normalized)
        if (highest < unique.size) highest = unique.size
    })

    const solution1 = highest

    return { solution1 }
}

const { solution1 } = findSolutions(asteroids)

console.log('Part One Solution: ' + solution1)
