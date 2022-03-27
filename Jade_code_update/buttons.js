/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} w radius of ball
 * @param {number} h radius of ball
 * @param {string} fill fill colour
 * @param {string} over hover over  colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text  button text
 * @param {string} text  button text colour
 */
class ButtonBase extends InteractiveObject{
    constructor(x,y, w, h, fill, over, selected, stroke, text, textColour){
        super()
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over=over;
        this.selected = selected;
        this.currentFill = fill
        this.stroke=stroke;
        this.text = text;
        this.textColour = textColour
        this.inBounds = false
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let fill = this.currentFill
        this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, this.text,this.textColour )

        if(this.inBounds){
            this.currentFill = this.over
        }else{
            this.currentFill = this.fill
        }


        /*
        if(InteractiveButton.selected === this){
            this.currentFill = this.selected
        }else if(this.inBounds ){
            this.currentFill = this.over
        }

         */
    }
    mClick() {
        // check mouse in bounds
        if(this.inBounds){
            InteractiveButton.selected = this;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m > x && x_m < x + w && y_m > y && y_m < y +h){
            return true
        }else{
            return false
        }
    }
    draw(x,y, w,h,c,s, txt, txtCol){
        ctx.beginPath()
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle = c;
        ctx.fill();
        ctx.stroke();

        let myFont= "bold 20px 'Trebuchet MS', Verdana, sans-serif  ";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;

        ctx.fillStyle = txtCol;
        ctx.fillText(txt,  x+ w/2 ,y+h/2);
    }
}

class OptionsButton extends ButtonBase{
    constructor(x,y, w, h, fill, over, selected, stroke, text, textColour) {
        super(x,y, w, h, fill, over, selected, stroke, text, textColour);
    }

}
OptionsButton.selected = null;


