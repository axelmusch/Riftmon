
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

canvas.width = 1024 * 2
canvas.height = 576 * 2

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const img = new Image()
img.src = "./images/riftmon.png"

const playerImg = new Image()
playerImg.src = "./images/pien.png"


class Sprite {
    constructor({
        position,
        velocity,
        image
    }) {
        this.position = position
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }

}

const background = new Sprite({ position: { x: -500, y: -1900 }, image: img })

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

function animate() {
    window.requestAnimationFrame(animate)
    console.log('ani')
    background.draw()
    ctx.drawImage(playerImg,
        0,
        0,
        playerImg.width / 3,
        playerImg.height / 4,
        canvas.width / 2 - (playerImg.width / 3 / 2) * 2.5,
        canvas.height / 2 - (playerImg.height / 4 / 2) * 2.5,
        (playerImg.width / 3) * 2.5,
        (playerImg.height / 4) * 2.5
    )


    if (keys.w.pressed && lastkey === 'w') background.position.y += 3
    else if (keys.a.pressed && lastkey === 'a') background.position.x += 3
    else if (keys.s.pressed && lastkey === 's') background.position.y -= 3
    else if (keys.d.pressed && lastkey === 'd') background.position.x -= 3


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

