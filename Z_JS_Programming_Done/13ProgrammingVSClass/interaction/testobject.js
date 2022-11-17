console.log("testobject js called")


class TestObject{
    constructor(canvas){

        this.xMouse = 0;
        this.yMouse = 0;


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));

    }

    mDown(e){
        console.log("mouse down event");
        console.log("xMouse is :"+this.xMouse);
        console.log("yMouse is :"+this.yMouse);
    }

    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
        console.log("mouse move event");
    }

    mUp(e){
        console.log("mouse up event");

    }


}