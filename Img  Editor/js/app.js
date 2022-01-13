// Global variables
var temp_choice = document.querySelectorAll(".templates");
var pages = document.querySelectorAll(".pages");

var buttons = document.querySelectorAll('.sub-list');   //for left side button
var checks= document.querySelectorAll('.crop-option div');  //for crop
var effect_range = document.querySelectorAll('.effects-div .sub-effect'); //For effect ranges

var cropRect, mainImg, activeObject;
var canvas, canvas_height, canvas_width;
// Global variables end


// Canvas setup
function initCanvas(){
    canvas_width=document.querySelector(".second").offsetWidth;
    canvas_height=document.querySelector(".second").offsetHeight;

    canvas = new fabric.Canvas('canvas', {
        width: canvas_width,
        height: canvas_height,
        preserveObjectStacking: true,
    });
    canvas.setBackgroundImage('./img/bg.png', canvas.renderAll.bind(canvas), {
        backgroundImageStretch: false
    });
}
// Canvas setup end


//Simple template(template1)
function initTemplate1(){
    document.querySelector("#canvas_img").addEventListener("click",function(){
        document.querySelector('.files').click();
        addImgForEmptyCanvas(0,0,canvas.width,canvas.height);
    });    

    function addImgForEmptyCanvas(left,top,scaleX,scaleY){
        document.querySelector('.files').addEventListener("change", function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (f) {
                var data = f.target.result;                    
                fabric.Image.fromURL(data, function (img) {
                    oImg = img.set({
                        left: left, 
                        top: top,
                        scaleX: scaleX / img.width,
                        scaleY: scaleY / img.height});
                        mainImg=img;
                        canvas.add(oImg).renderAll();
                    }); 
                };
            reader.readAsDataURL(file);
        });
    }
}
//Simple template (template2) end

//Template 2
function initTemplate2(){
    var box_height=canvas.height*0.15;
    var box_width=canvas.width;

    var shadowText1 = new fabric.Text("I'm a text with shadow", {
        backgroundColor: 'red',
        textAlign: 'center',
        borderColor: 'red',
        fill:'#000',
        stroke: '#fff',
        strokeWidth: 4,
        paintFirst: 'stroke',
        shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
        selectable: false,
        editable: true
    });
    shadowText1.width=canvas.width;
    shadowText1.height=box_height;

    var shadowText2 = new fabric.Text("I'm a text with shadow2", {
        backgroundColor: 'red',
        textAlign: 'center',
        borderColor: 'red',
        fill:'#000',
        stroke: '#fff',
        strokeWidth: 4,
        paintFirst: 'stroke',
        shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
        top: canvas.height-box_height,
        selectable:false,
    });
    shadowText2.width=canvas.width;
    shadowText2.height=box_height;

    var rect = new fabric.Rect({
        width: 100,
        height: 100,
        selectable: false
    });

    var rect=fabric.Image.fromURL('./img/add.png',function(img) {
        var plus = img.set({
            scaleY:0.3,
            scaleX: 0.3,
            selectable: false,
            editable:false
        })
        canvas.add(plus).renderAll();
        canvas.centerObject(plus);
        plus.on('mousedown', function(e) { 
            document.querySelector('.files').click();
            addImg(0,box_height,canvas_width,(canvas_height-(2*box_height)));
            canvas.remove(plus)
        });
    })

    canvas.add(shadowText1,shadowText2);
}
//Template 2 end

//Template 3
function initTemplate3(){
    var box_width=canvas_width*0.10;
    var box_height=canvas_height;
 
    var shadowText1 = new fabric.Text("I'm a text with shadow", {
        backgroundColor: 'red',
        textAlign: 'center',
        borderColor: 'red',
        fill:'#000',
        stroke: '#fff',
        strokeWidth: 4,
        paintFirst: 'stroke',
        top: canvas_height,
        angle: -90,
        shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
        selectable: false     
    });
    shadowText1.width=canvas_height;
    shadowText1.height=box_width;

    var shadowText2 = new fabric.Text("I'm a text with shadow2", {
        backgroundColor: 'red',
        textAlign: 'center',
        borderColor: 'red',
        fill:'#000',
        stroke: '#fff',
        strokeWidth: 4,
        paintFirst: 'stroke',
        shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
        left:canvas_width,
        angle: 90,
        selectable:false,
    });
    shadowText2.width=canvas_height;
    shadowText2.height=box_width;

    var rect=fabric.Image.fromURL('./img/add.png',function(img) {
        var plus = img.set({
            scaleY:0.3,
            scaleX: 0.3,
            selectable: false,
            editable:false
        })
        canvas.add(plus).renderAll();
        canvas.centerObject(plus);
        plus.on('mousedown', function(e) { 
            document.querySelector('.files').click();
            addImg(box_width,0,(canvas_width-(2*box_width)),canvas_height);
            canvas.remove(plus)
        });
    })

    canvas.add(shadowText1,shadowText2);

}
//Template 3 end


// Editor's left side buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {

      // Button Hightlight
      if(button.getAttribute("status")=="on"){
        button.setAttribute("status","off");
      }else{
        button.setAttribute("status","on");
      }
      button.children[1].style.display="block";
      // Button Hightlight

      // Individual buttons functionality
      if(button.classList.contains("pen")){
        if(button.getAttribute('status')=="on"){
          canvas.isDrawingMode= true
        }else{
          canvas.isDrawingMode= false
        }
      }else if(button.classList.contains("text")){
        if(button.getAttribute('status')=="on"){
          var t1 = new fabric.Textbox('MyText', {
            width: 150,
            top: 5,
            left: 5,
            fontSize: 20,
            textAlign: 'center',
          });
          canvas.add(t1);
        }
      }else if(button.classList.contains("shapes")){
        document.querySelector(".shapes-box").classList.toggle("on");
      }else if(button.classList.contains("crop")){
        if(button.getAttribute('status')=="on"){
          document.querySelector(".crop-option").style.display="flex";
          cropRect = new fabric.Rect({
            fill: 'rgba(0,0,0,0.3)',
            originX: 'left',
            originY: 'top',
            stroke: 'black',
            opacity: 1,
            width: 200,
            height: 200,
            hasRotatingPoint: false,
            transparentCorners: false,
            cornerColor: 'white',
            cornerStrokeColor: 'black',
            borderColor: 'black',
          });
          cropRect.scaleToWidth(300);
          canvas.centerObject(cropRect);
          cropRect.visible = true;
          canvas.add(cropRect);
        }
      }else if(button.classList.contains("effects")){
        if(button.getAttribute('status')=="on"){
          effectDiv.style.display="flex";
        }else{
          effectDiv.style.display="none";
        }
      }
    });
  });
// Editor's left side buttons end

//Add image
function addImg(left,top,scaleX,scaleY){
    document.querySelector('.files').addEventListener("change", function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;                    
            fabric.Image.fromURL(data, function (img) {
                oImg = img.set({
                    left: left, 
                    top: top,
                    editable:false,
                    selectable:false,
                    scaleX: scaleX / img.width,
                    scaleY: scaleY / img.height});
                    mainImg=img;
                    canvas.add(oImg).renderAll();
                }); 
            };
        reader.readAsDataURL(file);
    });
}
//Add image end

// Crop funciton

checks.forEach((check) => {
    check.addEventListener('click', (e) => {
        if(check.classList.contains("tick")){
        let rect = new fabric.Rect({
            left: cropRect.left,
            top: cropRect.top,
            width: cropRect.getScaledWidth(),
            height: cropRect.getScaledHeight(),
            absolutePositioned: true
        });

        mainImg.clipPath = rect;
        canvas.remove(cropRect);
        canvas.renderAll();
        document.querySelector(".crop-option").style.display="none";

        }else if(check.classList.contains("cross")){
        canvas.remove(cropRect);
        document.querySelector(".crop-option").style.display="none";
        }
    });
});

// Crop funciton end



// Template choice
temp_choice.forEach((template) => {
    template.addEventListener('click', (e) => {
        for(let i=0;i<pages.length;i++){
            pages[i].style.display="none";
        }
        var a=template.getAttribute('val');

        pages[1].style.display="flex";

        setTimeout(initCanvas,100);
          
        if(a==1){
            setTimeout(initTemplate1,100); 
        }else if(a==2){
            setTimeout(initTemplate2,100);
        }else if(a==3){
            setTimeout(initTemplate3,100);
        }
    });
});
// Template choice end

var patterns=document.querySelectorAll(".patterns");
patterns.forEach((pattern) => {
    pattern.addEventListener('click', (e) => {
        if(pattern.getAttribute('pattern-type')=="cir"){
            canvas.add(new fabric.Circle({
                left: canvas.width / 2,
                top: canvas.height / 2,
                fill: '#26a69a',
                radius: 50,
                originX: 'center',
                originY: 'center',
                strokeWidth: 0
            }));
        }else if(pattern.getAttribute('pattern-type')=="rect"){
            canvas.add(new fabric.Rect({
                left: canvas.width / 2,
                top: canvas.height / 2,
                fill: '#ffa726',
                width: 100,
                height: 100,
                originX: 'center',
                originY: 'center',
                strokeWidth: 0
            }));
        }else if(pattern.getAttribute('pattern-type')=="tri"){
             canvas.add(new fabric.Triangle({
                left: canvas.width / 2,
                top: canvas.height / 2,
                fill: '#78909c',
                width: 100,
                height: 100,
                originX: 'center',
                originY: 'center',
                strokeWidth: 0
            }));
        } 
    });
});

document.querySelector(".reset").addEventListener("click",function(){
    activeObject = canvas.getActiveObject();
    canvas.remove(activeObject); 
})

var colorbox=document.querySelector(".colorbox")
colorbox.addEventListener('input',changeColor);
function changeColor(){
    activeObject = canvas.getActiveObject();
    color=colorbox.value;
    activeObject.set('fill',color);
    canvas.requestRenderAll();
}