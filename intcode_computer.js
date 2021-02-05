const { timeStamp } = require('console');
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const getLine = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => {
        console.log('input')
        return ((await getLineGen.next()).value)
    };
})();

class IntcodeComputer {
    relativeBase = 0
    computing = false
    inputs = []
    output = []

    inputCallback = getLine

    instructions = {
        99: {
            parameterCount: 0,
            writes: false,
            callback: (memory, params) => 'finish'
        },
        1: {
            parameterCount: 3,
            writes: true,
            callback: (memory, params, writePos) => memory[writePos] = params[0] + params[1]
        },
        2: {
            parameterCount: 3,
            writes: true,
            callback: (memory, params, writePos) => {
                memory[writePos] = params[0] * params[1]
            }
        },
        3: {
            parameterCount: 1,
            writes: true,
            callback: async (memory, params, writePos) => {
                if (this.inputs.length === 0) {
                    memory[writePos] = +(await this.inputCallback())
                } else {
                    memory[writePos] = this.inputs.shift()
                }
            }
        },
        4: {
            parameterCount: 1,
            writes: false,
            callback: (memory, params) => this.output.push(params[0])
        },
        5: {
            parameterCount: 2,
            writes: false,
            callback: (memory, params) => {
                if (params[0] !== 0) return 'jump:' + params[1]
            }
        },
        6: {
            parameterCount: 2,
            writes: false,
            callback: (memory, params) => {
                if (params[0] === 0) return 'jump:' + params[1]
            }
        },
        7: {
            parameterCount: 3,
            writes: true,
            callback: (memory, params, writePos) => params[0] < params[1] ? memory[writePos] = 1 : memory[writePos] = 0
        },
        8: {
            parameterCount: 3,
            writes: true,
            callback: (memory, params, writePos) => params[0] === params[1] ? memory[writePos] = 1 : memory[writePos] = 0
        },
        9: {
            parameterCount: 1,
            writes: false,
            callback: (memory, params) => this.relativeBase += params[0]
        }
    }

    async compute(memory, inputs = []) {
        this.computing = true
        this.inputs = inputs
        this.relativeBase = 0

        let i = 0
        while (true) {
            let optcode = (memory[i] + '').padStart(2, '0')
            const instruction = +optcode.slice(-2)

            const { parameterCount, callback, writes } = this.instructions[instruction]

            optcode = optcode.padStart(2 + parameterCount, '0')
            const parameterModes = optcode.slice(0, -2).split('').reverse().map(v => +v)

            let writePos = undefined
            if (writes) {
                const mode = parameterModes.slice(-1)[0]
                switch (mode) {
                    case 0:
                        writePos = memory[i + parameterModes.length]
                        break
                    case 2:
                        writePos = memory[i + parameterModes.length] + this.relativeBase
                        break
                }
                if (!writePos) writePos = 0
            }

            const params = []

            for (let j = 0; j < parameterCount; j++) {
                let param;
                switch (parameterModes[j]) {
                    case 0:
                        param = memory[memory[i + j + 1]]
                        break
                    case 1:
                        param = memory[i + j + 1]
                        break
                    case 2:
                        param = memory[memory[i + j + 1] + this.relativeBase]
                        break
                }

                if (param === undefined) param = 0
                params.push(param)
            }

            const result = await callback(memory, params, writePos)

            if (result == 'finish')
                break
            else if (typeof (result) == 'string' && result.includes('jump')) {
                i = +result.split(':')[1]
                continue
            }

            i += parameterCount + 1
        }

        this.computing = false
        return this.output
    }
}

module.exports = IntcodeComputer