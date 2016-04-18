'use strict'

// this code is run in ../gulped
const hero = require('../src/hero')
const enemy = require('../src/enemy')

const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')

let score = 0
let gameover = false
// TODO speed needs to be calculated in each game loop, but is laggy for now..
let speed = 3

// the hero
let john

let enemies = []
let enemyStartX = canvas.width
const maxEnemyWaitTime = 1000
// starts with 3, and will grow
let enemySize = 3

ctx.font = '140px monospace'
const paintScore = (ctx) => {
    ctx.fillStyle = '#FFF'
    ctx.fillText(score, ((canvas.width / 2) - ctx.measureText(score).width / 2) - 2, 125)
    ctx.fillStyle = '#EEE'
    ctx.fillText(score, ((canvas.width / 2) - ctx.measureText(score).width / 2) - 1, 126)
    ctx.fillStyle = '#BBB'
    ctx.fillText(score, ((canvas.width / 2) - ctx.measureText(score).width / 2) + 2, 129)
    ctx.fillStyle = '#CCC'
    ctx.fillText(score, ((canvas.width / 2) - ctx.measureText(score).width / 2) + 1, 128)
    ctx.fillStyle = '#DDD'
    ctx.fillText(score, ((canvas.width / 2) - ctx.measureText(score).width / 2), 127)
}
const paint = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paintScore(ctx)
    john.paint(ctx)
    enemies.forEach((e) => e.paint(ctx))
}

const addEnemyAfterMaxWaitTime = () => {
    if (enemies.length < 2) {
        addEnemy()
    }
    setTimeout(addEnemyAfterMaxWaitTime, maxEnemyWaitTime)
}

const addEnemy = () => {
    // first get rid of old enemies that passed the screen
    enemies = enemies.filter((e) => e.state.x >= 0)
    // then add a new enemy
    enemies.push(enemy(enemyStartX, enemySize))
    // pauseEnemyCreation()
    if (enemySize < 30) {
        enemySize += 0.25
    }
    score++
}

const gameLoop = () => {

    if (gameover) {
        alert('You\'re hit!\nScore: ' + score)
        window.location.reload()
        return
    }

    if (Math.random() > 0.987) {
        addEnemy()
    }

    // TODO try this out without lagging the game
    // let newTimeSinceStart = performance.now()
    // let deltaTime = (newTimeSinceStart - oldTimeSinceStart) / 1000
    // let distance = speed * deltaTime

    enemies.forEach((e, i) => {
        e.move(speed)
        // game is over if not high enough when enemy and john at same x
        if (john.state.maxY - john.state.y < e.state.size
            && e.state.x - john.state.x < (e.state.size - 1)
            && e.state.x - john.state.x >= (2 - e.state.size)) {
            gameover = true
        }
    })

    paint()

    requestAnimationFrame(gameLoop)
}

const jump = () => {
    if (!john.state.isJumping) {
        // isJumping is set back to false in hero.js
        john.state.isJumping = true
        john.jump(undefined, 2)
    }
}

const init = () => {
    john = hero()
    addEnemyAfterMaxWaitTime()
    window.addEventListener('click', jump, false)
    window.addEventListener('keyup', jump, false)
    requestAnimationFrame(gameLoop)
}

init()
