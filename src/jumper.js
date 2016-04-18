'use strict'

module.exports = (state) => {

    const jump = (direction, speed) => {
        // default direction is up
        if (direction === undefined) {
            // console.log('no direction, setting to up')
            direction = -1
        }
        if (state.y > state.maxY) {
            // console.log('reached bottom, done jumping')
            state.y = state.maxY
            state.isJumping = false
            return
        }
        if (state.y <= state.minY) {
            requestAnimationFrame(() => {
                // console.log('reached top, go back down')
                direction = 1
                state.y += speed * direction
                jump(direction, speed)
            })
            return
        }
        if (direction === 1) {
            requestAnimationFrame(() => {
                // console.log('going down')
                state.y += speed * direction
                jump(direction, speed)
            })
            return
        }
        if (direction === -1) {
            requestAnimationFrame(() => {
                // console.log('going up')
                state.y += speed * direction
                jump(direction, speed)
            })
            return
        }
    }

    return { jump }
}
