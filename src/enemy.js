'use strict'

const mover = require('./mover')

module.exports = (x, size) => {

    let state = {
        x,
        size,
        rotate: 10
    }
    //
    // const paint = (ctx) => {
    //     ctx.beginPath()
    //     ctx.rect(state.x, 130 - state.size, state.size, state.size)
    //     ctx.fillStyle = '#E91E63'
    //     ctx.fill()
    //     ctx.closePath()
    // }

    let diffToLeft = (state.size / 2 * -1)
    const paint = (ctx) => {
        ctx.save()
        ctx.translate(state.x + state.size / 2, (130 - state.size) + state.size / 2)
        ctx.rotate(state.rotate * Math.PI / 180)

        ctx.fillStyle = '#B71C1C'
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
        mover(state)
    )

}
