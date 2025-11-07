window.onload = function(){
    let originalCanvas = this.document.getElementById('originalCanvas');
    let originalContext = originalCanvas.getContext('2d');
    
    let targetCanvas = this.document.getElementById('targetCanvas');
    let targetContext = targetCanvas.getContext('2d');

    let image = new Image();
    image.src = 'cat.jpg';

    let w;
    let h;

    let kernel = [
            [-1,-1, -1],
            [-1, 8, -1],
            [-1,-1, -1]
    ]
    
    image.onload = function(){
        w = image.width;
        h = image.height;

        originalCanvas.width = w;
        originalCanvas.height = h;
        
        targetCanvas.width = w;
        targetCanvas.height = h;

        originalContext.drawImage(image,0,0);

        process();
    }
        
  
        
    function process(){
            let imageData = originalContext.getImageData(0,0,w,h);
            
            let pixels = imageData.data; //this is a 1D array containing RGBA values for each pixel
            let output = new Uint8ClampedArray(pixels.length); 

            for(let y=1; y<h-1; y++){ //avoid the edges
                for(let x=1; x<w-1;x++){

                    let sum=0;

                        for(let ky = -1; ky<=1; ky++){
                            for(let kx = -1; kx<=1; kx++){
                                let idx = ((y+ky)*w+(x+kx))*4;
                                let r = pixels[idx];
                                let g = pixels[idx+1];
                                let b = pixels[idx+2];
                                //g+=20;
                                //b+=150;
                                //r+=100;
                                // let r = pixels[idx] 
                                //example operation: average the red values of the neighboring pixels
                               // sum+=pixels[index]*kernel[ky+1][kx+1];
                               sum += r*kernel[ky+1][kx+1];
                        }
                    }

                    let index = (y*w+x)*4; //everything is represented in groups of 4 (r,g,b,a)
                    sum = Math.max(0, Math.min(255, sum));
                    
                    output[index]=sum;
                    output[index+1]=sum;
                    output[index+2]=sum;
                    output[index+3]=sum;
            }
        }
        let newImageData = new ImageData(output, w, h);
        console.log(newImageData);
        targetContext.putImageData(newImageData,0,0);
        originalContext.putImageData(newImageData,0,0);
    }
    //console.log();
}

