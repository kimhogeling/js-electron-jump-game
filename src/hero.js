'use strict'

const jumper = require('./jumper')

module.exports = () => {

    let state = {
        maxY: 120,
        minY: 80,
        y: 120,
        x: 60,
        isJumping: false,
        isStepping: false,
        size: 10,
        rotate: 4
    }

    let diffToLeft = (state.size / 2 * -1)
    const paint = (ctx) => {
        ctx.save()
        ctx.translate(state.x + state.size / 2, state.y + state.size / 2)
        ctx.rotate(state.rotate * Math.PI / 180)

        ctx.fillStyle = '#3F51B5'
        ctx.fillRect(diffToLeft, diffToLeft, state.size, state.size)

        ctx.restore()
    }

    const step = () => {
        state.rotate *= -1
        state.isStepping = !state.isStepping
        setTimeout(step, 300)
    }

    step()

    return Object.assign(
        { paint, state },
        jumper(state)
    )

}
