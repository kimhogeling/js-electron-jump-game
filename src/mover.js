'use strict'

module.exports = (state) => {

    const move = (distance) => {
        state.x -= distance
    }

    return { move }

}
