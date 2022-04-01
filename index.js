
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')




canvas.height = 576 * 2 //window.innerHeight
//canvas.height = window.innerHeight

canvas.width = 1024 * 2 //window.innerWidth
//canvas.width = window.innerHeight * 1.778

const offset = {
    x: -500,
    y: -1900
}

const collisionMap = []
const boundarys = []

const battleMap = []
const battleZones = []

fetch('./riftmon..tmj')
    .then(response => response.json())
    .then(data => {
        data.layers.forEach(layer => {

            if (layer.name === "Collisions") {

                for (let i = 0; i < layer.data.length; i += 50) {
                    collisionMap.push(layer.data.slice(i, i + 50))
                }

                collisionMap.forEach((row, i) => {
                    row.forEach((symbol, j) => {
                        if (symbol != 0) {
                            boundarys.push(new Boundary({
                                position: {
                                    x: j * Boundary.width + offset.x,
                                    y: i * Boundary.height + offset.y
                                }
                            }))
                        }
                    })
                })
                movables = [...movables, ...boundarys]

            } else if (layer.name === "battleZones") {
                for (let i = 0; i < layer.data.length; i += 50) {
                    battleMap.push(layer.data.slice(i, i + 50))
                }

                battleMap.forEach((row, i) => {
                    row.forEach((symbol, j) => {
                        if (symbol != 0) {
                            battleZones.push(new Boundary({
                                position: {
                                    x: j * Boundary.width + offset.x,
                                    y: i * Boundary.height + offset.y
                                }
                            }))
                        }
                    })
                })
                movables = [...movables, ...battleZones]

            }
        })
    });







const img = new Image()
img.src = "./images/riftmon.png"

const foregroundImg = new Image()
foregroundImg.src = "./images/foreground.png"


const playerImgDown = new Image()
playerImgDown.src = "./images/playerDown.png"

const playerImgUp = new Image()
playerImgUp.src = "./images/playerUp.png"

const playerImgLeft = new Image()
playerImgLeft.src = "./images/playerLeft.png"

const playerImgRight = new Image()
playerImgRight.src = "./images/playerRight.png"



const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImgDown,
    frames: {
        max: 4
    },
    sprites: {
        up: playerImgUp,
        down: playerImgDown,
        left: playerImgLeft,
        right: playerImgRight
    }
})

const background = new Sprite({
    position: { x: offset.x, y: offset.y }, image: img
})

const foreground = new Sprite({
    position: { x: offset.x, y: offset.y }, image: foregroundImg
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ctrl: {
        pressed: false
    }
}

let movables = [background, foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}
let speed = 6

const getFPS = () =>
    new Promise(resolve =>
        requestAnimationFrame(t1 =>
            requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
        )
    )

// Calling the function to get the FPS
getFPS().then(fps => {
    speed = (6 / (fps / 60))
    console.log("🚀 ~ file: index.js ~ line 148 ~ speed", speed)
    player.speed = Math.round(fps / 60)
});

function animate() {
    /*    setTimeout(function () {}, 1000 / 60); */
    window.requestAnimationFrame(animate)
    background.draw()

    boundarys.forEach(boundary => {
        boundary.draw()
    })

    battleZones.forEach(battleZone => {
        battleZone.draw()
    })


    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false


    //keys.ctrl.pressed ? speed = 9 : speed = 6

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: battleZone
                })) {
                console.log('battle')
                break
            }
        }
    }
    if (keys.w.pressed && lastkey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + speed
                        }
                    }
                })) {
                console.log('colliding')
                moving = false
                break
            }
        }


        if (moving)
            movables.forEach(moveable => {
                moveable.position.y += speed
            })
    }

    else if (keys.a.pressed && lastkey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + speed,
                            y: boundary.position.y
                        }
                    }
                })) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach(moveable => {
                moveable.position.x += speed
            })
    }

    else if (keys.s.pressed && lastkey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - speed
                        }
                    }
                })) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach(moveable => {
                moveable.position.y -= speed
            })
    }

    else if (keys.d.pressed && lastkey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - speed,
                            y: boundary.position.y
                        }
                    }
                })) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach(moveable => {
                moveable.position.x -= speed
            })
    }


}
animate()
let lastkey = ''
window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = "w"
            break
        case 'a':
            keys.a.pressed = true
            lastkey = "a"
            break
        case 's':
            keys.s.pressed = true
            lastkey = "s"
            break
        case 'd':
            keys.d.pressed = true
            lastkey = "d"
            break
        case 'Control':
            keys.ctrl.pressed = true
            //lastkey = "ctrl"
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'Control':
            keys.ctrl.pressed = false
            break
    }
})

/* window.addEventListener('resize', function (event) {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
}, true); */

