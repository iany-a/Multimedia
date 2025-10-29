window.onload = function() {
    let canvas = this.document.getElementById('chartCanvas');
    let context = canvas.getContext('2d');
    console.log(context);

    let width = canvas.width;
    let height = canvas.height;

    let xIncrement=150;
    let yIncrement = 100;

    let dataIncrement = 20;
    let data=[];

    function clearCanvas(){
        context.clearRect(0,0,width, height);
    }

    function drawHorizontalLines(){
         context.lineWidth = 1;
        context.strokeStyle = 'gray';
          for(let i = yIncrement; i<height; i+=yIncrement){
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(width, i);
            context.stroke();
        }

    }

  

    function generateRandomNumber(){
        return Math.random()*height;
    }

    function generateData(){
        for (let i=0; i<=width; i+=dataIncrement){
            data[i/dataIncrement] = generateRandomNumber();
        }
    }

    function drawVerticalLines(){
        context.lineWidth = 1;
        context.strokeStyle = 'gray';
        for(let i = xIncrement; i<width; i+=xIncrement){
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, height);
            context.stroke();
        }
    }

   function drawChart(){
        context.strokeStyle = 'green';
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(0, height- data[0]);
        for(let i= 1; i<data.length; i++){
            context.lineTo(i*dataIncrement, height-data[i]);
        }
        context.stroke();
    }

    function draw(){
        clearCanvas();
        drawHorizontalLines();
        drawVerticalLines();
        drawChart();
     
    }

    this.setInterval(function() {
        let newValue = generateRandomNumber();
        data.push(newValue);
        data.shift();
        draw();
    }, 1000);

    generateData();
    console.log(data);
    draw();






}    

