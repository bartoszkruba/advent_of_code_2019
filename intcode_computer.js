const readline = require('readline')

class IntcodeComputer {
    instructions = {
        99: {
            parameterCount: 0,
            callback: (memory, params) => 'finish'
        },
        1: {
            parameterCount: 3,
            callback: (memory, params) => memory[params[2]] = params[0] + params[1]
        },
        2: {
            parameterCount: 3,
            callback: (memory, params) => memory[params[2]] = params[0] * params[1]
        },
        3: {
            parameterCount: 1,
            callback: (memory, params) => {
                console.log('input:')
                memory[params[0]] = readline() 
            }
        },
        4: {
            parameterCount: 0,
            callback: (memory, params, output) => output.push(params[0])
        }
    }

    compute(memory) {
        const output = []

        let i = 0
        while (true) {
            let optcode = (memory[i] + '').padStart(2, '0')
            const instruction = +optcode.slice(-2)

            const { parameterCount, callback } = this.instructions[instruction]

            optcode = optcode.padStart(2 + parameterCount, '0')
            const parameterModes = optcode.slice(0, -2).split('').reverse().map(v => +v)

            if (instruction != 3 || instruction != 4)
                parameterModes[parameterModes.length - 1] = 1

            const params = []

            for (let j = 0; j < parameterCount; j++) {
                const v = memory[i + j + 1]
                switch (parameterModes[j]) {
                    case 0:
                        params.push(memory[memory[i + j + 1]])
                        break
                    case 1:
                        params.push(memory[i + j + 1])
                        break
                }
            }

            if (callback(memory, params, output) == 'finish')
                break

            i += parameterCount + 1
        }

        return output
    }
}

module.exports = IntcodeComputer