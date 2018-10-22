class Jigsaw {
    constructor(width, height) {

        var canvas = this.canvas = document.createElement('canvas');
        // document.body.appendChild(this.canvas);
        canvas.width = width || document.body.offsetWidth * 2;
        canvas.height = height || document.body.offsetHeight * 2;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        this.context = canvas.getContext("2d");

        this.drawQueue = [];
    }

    fillText(text, style) {
        style = style || {};
        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag);

        this.pubDraw(timeTag, {
            text: text,
            x: style.x || 0,
            y: style.y || 0,
            fontSize: style.fontSize || '12px',
            color: style.color,
            center: style.center || false
        })
    }

    drawImage(imgUrl, style) {
        var img = new Image();
        img.src = imgUrl;

        style = style || {};
        var center = style.center;
        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag);

        img.onload = function() {
            var width = style.width || img.width;
            var height = style.height || (img.height/img.width * width);
            var centerX = 0;

            if (center) {
                var centerX = this.canvas.width / 2 - width / 2;
            }

            this.pubDraw(timeTag, {
                img: img, 
                x: centerX || style.x || 0,
                y: style.y || 0,
                width: width,
                height: height
            })
            
        }.bind(this);
    }

    subDraw(tag) {
        var drawOpt = null;
        this.drawQueue.push({
            tag: tag,
            drawOpt: null
        });
    }

    pubDraw(tag, drawOpt) {

        this.drawQueue.forEach(item => {
            // console.log(tag);
            if (item.tag == tag) {
                item.drawOpt = drawOpt;
            }
        })

        this.runDraw();
        
    }

    runDraw() {
        
        while(this.drawQueue[0] && this.drawQueue[0].drawOpt) {
            var drawOpt = this.drawQueue[0].drawOpt;

            if (drawOpt.img) {
                this.context.drawImage(drawOpt.img, drawOpt.x, drawOpt.y, drawOpt.width, drawOpt.height);
            } else if (drawOpt.text) {
                var fontFamily = drawOpt.fontFamily || 'Arial';
                this.context.font = drawOpt.fontSize + ' ' + fontFamily;
                this.context.fillStyle = drawOpt.color || 'black';
                if (drawOpt.center) {
                    this.context.textAlign = 'center';
                    this.context.fillText(drawOpt.text, this.canvas.width / 2, drawOpt.y);
                } else {
                    this.context.fillText(drawOpt.text, drawOpt.x, drawOpt.y);
                }

            }

            var dataURL = this.canvas.toDataURL('image/jpeg');
            this.imgOnload && this.imgOnload(dataURL);
            this.drawQueue.shift();
        }
    }

    
}

export default Jigsaw;