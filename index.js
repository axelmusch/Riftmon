
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

canvas.width = 1024 * 2 //window.innerWidth
canvas.height = 576 * 2 //window.innerHeight

const collisionMap = []
for (let i = 0; i < collisions.length; i += 50) {
    collisionMap.push(collisions.slice(i, i + 50))
}

const offset = {
    x: -500,
    y: -1900
}

const boundarys = []
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

const img = new Image()
img.src = "./images/riftmon.png"

const foregroundImg = new Image()
foregroundImg.src = "./images/foreground.png"


const playerImg = new Image()
playerImg.src = "./images/playerDown.png"



const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImg,
    frames: {
        max: 4
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
}

const movables = [background, ...boundarys, foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()

    boundarys.forEach(boundary => {
        boundary.draw()
        if (rectangularCollision({ rectangle1: player, rectangle2: boundary })) {
            console.log('colliding')
        }
    })
    player.draw()
    foreground.draw()

    let moving = true
    if (keys.w.pressed && lastkey === 'w') {
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
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
                moveable.position.y += 3
            })
    }

    else if (keys.a.pressed && lastkey === 'a') {
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
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
                moveable.position.x += 3
            })
    }

    else if (keys.s.pressed && lastkey === 's') {
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
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
                moveable.position.y -= 3
            })
    }

    else if (keys.d.pressed && lastkey === 'd') {
        for (let i = 0; i < boundarys.length; i++) {
            const boundary = boundarys[i]
            if (rectangularCollision(
                {
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
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
                moveable.position.x -= 3
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
    }
})

/* window.addEventListener('resize', function (event) {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
}, true); */

