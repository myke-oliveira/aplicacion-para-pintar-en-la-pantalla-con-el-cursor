const WIDTH = 1000, HEIGHT=618
const SHAPE = 'round'
const LINE_WIDTH = 3
const LINE_COLOR = 'white'


class Drawing {
    constructor(canvas) {
        this.canvas = canvas
        this.canvas.width = WIDTH
        this.canvas.height = HEIGHT
        this.pencilDown = false
        this.lines = []
    }
    
    startLine() {
        this.pencilDown = true
        this.lines.push([])
    }

    endLine() {
        this.pencilDown = false
    }

    continueLine(x, y) {
        if (!this.pencilDown) {
            return
        }

        this.lines.at(-1).push({x, y})
        this.showDrawing()
    }

    showDrawing() {
        const context = this.canvas.getContext('2d')
        context.lineJoin = context.lineCap = SHAPE
        context.lineWidth = LINE_WIDTH
        context.strokeStyle = LINE_COLOR

        context.beginPath()
        for (const line of this.lines) {
            context.moveTo(line[0].x, line[0].y)
            for (const point of line) {
                context.lineTo(point.x, point.y)
            }
        }
        context.stroke()
    }
}

canvas = document.querySelector('canvas');
const drawing = new Drawing(canvas)

canvas.addEventListener('mousedown', function (event) {
    event.preventDefault()
    drawing.startLine()
})

canvas.addEventListener('mouseup', function (event) {
    event.preventDefault()
    drawing.endLine()
})

canvas.addEventListener('mousemove', function (event) {
    event.preventDefault()
    drawing.continueLine(event.layerX, event.layerY)
})