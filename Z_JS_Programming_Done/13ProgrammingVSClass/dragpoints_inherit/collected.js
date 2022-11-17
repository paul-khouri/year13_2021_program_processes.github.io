console.log('init js file has been called')
// ----------------- set up code includes resolution management
var myScale = 0

function setupCanvas (canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1
  myScale = dpr
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect()
  console.log(rect.width)
  console.log(rect.height)
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  var ctx = canvas.getContext('2d')
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr)
  return ctx
}
// basic drawing on the canvas with no functions

 // Now this line will be the same size on the page
  // but will look sharper on high-DPI devices!
var ctx = setupCanvas(document.querySelector('#myCanvas'))
var canvas = document.querySelector('#myCanvas')
const width = canvas.width / myScale
const height = canvas.height / myScale

// -----------------------------
var colArray = [
  [
    'rgba(255,255,255,1)', 'rgba(153,153,153,1)', 'rgba(0,0,0,1)',
    'rgba(204,0,0,1)', 'rgba(255,204,51,1)', 'rgba(51,51,255,1)',
    'rgba(0,153,204,1)', 'rgba(255,255,153,1)', 'rgba(255,255,102,1)'
  ],
  [
    'rgba(255,255,255,0.67)', 'rgba(153,153,153,0.67)', 'rgba(0,0,0,0.67)',
    'rgba(204,0,0,0.67)', 'rgba(255,204,51,0.67)', 'rgba(51,51,255,0.67)',
    'rgba(0,153,204,0.67)', 'rgba(255,255,153,0.67)', 'rgba(255,255,102,0.67)'
  ],
  [
    'rgba(255,255,255,0.33)', 'rgba(153,153,153,0.33)', 'rgba(0,0,0,0.33)',
    'rgba(204,0,0,0.33)', 'rgba(255,204,51,0.33)', 'rgba(51,51,255,0.33)',
    'rgba(0,153,204,0.33)', 'rgba(255,255,153,0.33)', 'rgba(255,255,102,0.33)'
  ]
]

console.log('point js file has been called')
    // super class
class Point {
    // class Point xC,yC,r, stroke, fill, over, canvas
  constructor (xC, yC, r, stroke, fill, over, canvas) {
    this.xC = xC
    this.yC = yC
    this.r = r
    this.stroke = stroke
    this.fill = fill
    this.over = over
    this.inBounds = false

    this.element = canvas
    this.xMouse = 0
    this.yMouse = 0
    this.element.addEventListener('mousedown', this.mDown.bind(this))
    this.element.addEventListener('mousemove', this.mMove.bind(this))
    this.element.addEventListener('mouseup', this.mUp.bind(this))
  }

  mDown (e) {
    if (this.inBounds) {
      Point.taken = this
    }
  }
  mMove (e) {
    this.xMouse = e.offsetX
    this.yMouse = e.offsetY
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.xC, this.yC, this.r)
  }
  mUp (e) {
    Point.taken = ''
  }
  update () {
    if (Point.taken === this) {
      this.xC = this.xMouse
      this.yC = this.yMouse
    }

    this.draw()
  }
  draw () {
    if (this.inBounds || Point.taken === this) {
      ctx.fillStyle = this.over
    } else {
      ctx.fillStyle = this.fill
    }
    ctx.strokeStyle = this.stroke
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(this.xC, this.yC, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

  drawRect (x, y, w, h, col, toStroke) {
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = col
    ctx.fill()
    if (toStroke) {
      ctx.strokeStyle = this.stroke
      ctx.stroke()
    }
    ctx.restore()
  }

  boundsCheck (x1, y1, x2, y2, r) {
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    if (d < r) {
      return true
    } else {
      return false
    }
  }
    // these allow other parts of the program to get the xC  and yC values of the point
  getX () {
    return this.xC
  }

  getY () {
    return this.yC
  }
    }
Point.taken = ''

    // -------------------------------------------------------------

class MoveRectangle extends Point {
  constructor (xC, yC, r, stroke, fill, over, canvas, w, h) {
    super(xC, yC, r, stroke, fill, over, canvas)
    this.w = w
    this.h = h
  }

  draw () {
    super.drawRect(this.xC - this.w / 2, this.yC - this.h / 2, this.w, this.h, this.fill)
    super.draw()
  }
    }
    // --------------------------------------------------------------

class SelectRectangle extends Point {
  constructor (xC, yC, r, stroke, fill, over, canvas, w, h) {
    super(xC, yC, r, stroke, fill, over, canvas)
    this.w = w
    this.h = h

    if (Math.abs(this.w) < Math.abs(this.h)) {
      this.r = Math.abs(this.w / 2)
    } else {
      this.r = Math.abs(this.h / 2)
    }
  }

  draw () {
    var toStroke = false
    if (this.inBounds || Point.taken === this) {
      ctx.fillStyle = this.over
      toStroke = true
    } else {
      ctx.fillStyle = this.fill
    }
    super.drawRect(this.xC - this.w / 2, this.yC - this.h / 2, this.w, this.h, this.fill, toStroke)
    ctx.fillStyle = 'rgba(255,255,255,0)'
    ctx.beginPath()
    ctx.arc(this.xC, this.yC, this.r, 0, 2 * Math.PI)
    ctx.fill()
  }
    }

    // --------------------------------------------------------------------

class SelectRectangleRotate extends Point {
  constructor (xC, yC, r, stroke, fill, over, canvas, w, h, ang) {
    super(xC, yC, r, stroke, fill, over, canvas)
    this.w = w
    this.h = h
    this.ang = ang

    if (Math.abs(this.w) < Math.abs(this.h)) {
      this.r = Math.abs(this.w / 2)
    } else {
      this.r = Math.abs(this.h / 2)
    }
  }

  update () {
    super.update()
    this.ang += 0.5
  }

  draw () {
    var toStroke = false
    if (this.inBounds || Point.taken === this) {
      ctx.fillStyle = this.over
      toStroke = true
    } else {
      ctx.fillStyle = this.fill
    }
    this.drawShape(this.xC - this.w / 2, this.yC - this.h / 2, this.w, this.h, this.fill, toStroke, this.ang)
    this.drawShape(this.xC - this.w / 2, this.yC - this.h / 2, this.w, this.h, this.fill, toStroke, -0.5 * this.ang)
    this.drawShape(this.xC - this.w / 2, this.yC - this.h / 2, this.w, this.h, this.fill, toStroke, -0.25 * this.ang)
    this.drawShape(this.xC - this.w / 2, this.yC - this.h / 2, this.w, this.h, this.fill, toStroke, 0.5 * this.ang)
    ctx.fillStyle = 'rgba(255,255,255,0)'
    ctx.beginPath()
    ctx.arc(this.xC, this.yC, this.r, 0, 2 * Math.PI)
    ctx.fill()
  }

  drawShape (x, y, w, h, col, toStroke, ang) {
    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(ang * Math.PI / 180)
    ctx.beginPath()
    ctx.rect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = col
    ctx.fill()
    if (toStroke) {
      ctx.lineWidth = 0.5
      ctx.strokeStyle = this.stroke
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(w / 2 + 2 * Math.abs(w / 5), 0, Math.abs(w / 5), 0, 2 * Math.PI)
    if (toStroke) {
      ctx.stroke()
    }
    ctx.fill()
    ctx.beginPath()
    ctx.arc(-w / 2 - 2 * Math.abs(h / 5), 0, Math.abs(h / 5), 0, 2 * Math.PI)
    if (toStroke) {
      ctx.stroke()
    }
    ctx.fill()
    ctx.restore()
  }
    }

console.log('main js file has been called for pages')

// object Set
var objectSet = []

// class Point x,y,r, stroke, fill, over, canvas
var PointOne = new Point(200, 200, 10, colArray[0][6], colArray[0][4], colArray[0][5], canvas)
var PointTwo = new Point(300, 200, 10, colArray[0][3], colArray[0][4], colArray[0][5], canvas)
var MROne = new MoveRectangle(400, 200, 10, colArray[0][3], colArray[0][4], colArray[0][6], canvas, 100, 150)
var SROne = new SelectRectangle(400, 400, 10, colArray[0][5], colArray[0][6], colArray[0][7], canvas, 100, 150)
var SRTwo = new SelectRectangle(200, 400, 10, colArray[0][0], colArray[0][1], colArray[0][2], canvas, 100, 150)
var SRRotOne = new SelectRectangleRotate(600, 400, 10, colArray[0][0], colArray[2][7], colArray[0][2], canvas, 100, 25, 20)
objectSet.push(PointOne, PointTwo, MROne, SROne, SRTwo, SRRotOne)

function animate () {
  ctx.clearRect(0, 0, width, height)
  for (var i = 0; i < objectSet.length; i++) {
    objectSet[i].update()
  }

  window.requestAnimationFrame(animate)
}
animate()
