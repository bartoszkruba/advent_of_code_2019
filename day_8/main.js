const fs = require('fs')

const width = 25
const height = 6
const totalPixels = fs.readFileSync('puzzle_inputs.txt').toString().split('').length
const totalLayers = totalPixels / (width * height)

const layers = []
for (let i = 0; i < totalLayers; i++) {
    const layer = []
    for (let j = 0; j < height; j++) {
        layer.push([])
    }
    layers.push(layer)
}
let i = 0
fs.readFileSync('puzzle_inputs.txt').toString().split('').forEach(pxl => {
    const layerN = Math.floor(i / (width * height))
    const rowN = Math.floor((i - (layerN * width * height)) / width)
    const colN = i % width

    layers[layerN][rowN].push(+pxl)
    i++
})

const countOccurences = (layer, n) => layer.map(row => row.filter(v => v === n).length).reduce((a, b) => a + b, 0)

const findSolutions = layers => {
    let lowest = width * height
    let indx = -1

    for (let i = 0; i < layers.length; i++) {
        layer = layers[i]
        const occurences = countOccurences(layer, 0)
        if (lowest > occurences) {
            lowest = occurences
            indx = i
        }
    }

    const solution1 = countOccurences(layers[indx], 1) * countOccurences(layers[indx], 2)

    const finalImage = []
    for (let i = 0; i < height; i++) {
        finalImage.push([])
    }

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            let k = 0
            while (true) {
                const v = layers[k][j][i]
                if (v == 0 || v == 1) {
                    finalImage[j][i] = v
                    break
                }
                k++
            }
        }
    }

    return {solution1, finalImage}
}

const {solution1, finalImage} = findSolutions(layers) 

console.log('Part One Solution: ' + solution1)
console.log('Part Two Solution: ')
for (row of finalImage) {
    for (v of row){
        process.stdout.write(v == 0 ? ' ': '*')
    }
    console.log()
}