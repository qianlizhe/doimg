'use strict';

const Png = require('./src/png');
const fs = require('fs');
module.exports = {
    Gif: require('./src/gif'),
    Png: require('./src/png'),
    Jpeg: require('./src/jpeg'),
};



// const Png = require('doimg').Png;

fs.readFile('test/png/test.png', (err, data) => {
    if (err) throw err;
    console.log(data);

    let png = new Png(data);

    console.log('width=', png.width); // 图像宽度
    console.log('height=', png.height); // 图像高度
    console.log(' 图像深度，即每个通道包含的位数=', png.bitDepth); // 图像深度，即每个通道包含的位数
    console.log('颜色类型，0 - 灰度，2 - rgb，3 - 索引，4 - 灰度+aloha，6 - rgba=', png.colorType); // 颜色类型，0 - 灰度，2 - rgb，3 - 索引，4 - 灰度+aloha，6 - rgba
    console.log('是否使用alpha通道=', png.alpha); // 是否使用alpha通道

    const pixels = png.decode(); // 像素数据

    console.log(`typeof pixels=${typeof pixels},0=${typeof pixels[0][0]},json=${JSON.stringify(pixels[0][0])}`);
    // console.log(` pixels.keys=${Object.keys(pixels) }`);

    let xMin=png.width,yMin=png.height,xMax=0,yMax=0;
    for(let x=0;x<png.width;x++){
        let i=0,j=png.height-1;

        while(i<png.height-1&&pixels[x][i][3]<=0){
            i++;
        }
        const down=pixels[x][i][3];
        if(down>0&&i<yMin){
            yMin=i;
        }

        while(j>=i&&pixels[x][j][3]<=0){
            j--;
        }
        const up=pixels[x][j][3];
        if(up>0&&j>yMax){
            yMax=j;
        }

      
    }

    for(let y=0;y<png.height;y++){
        let i=0,j=png.width-1;

        while(i<png.width-1&&pixels[i][y][3]<=0){
            i++;
        }
        const left=pixels[i][y][3];
        if(left>0&&i<xMin){
            xMin=i;
        }

        while(j>=i&&pixels[j][y][3]<=0){
            j--;
        }
        const right=pixels[j][y][3];
        if(right>0&&j>xMax){
            xMax=j;
        }
    }

    const rect={
        left:xMin,
        right:png.width-xMax,
        top:png.height-yMax,
        bottom:yMin,
        width:xMax-xMin,
        height:yMax-yMin
    }
    console.log(`xMin=${JSON.stringify(xMin)},xMax=${JSON.stringify(xMax)},yMin=${JSON.stringify(yMin)},yMax=${JSON.stringify(yMax)},rect=${JSON.stringify(rect)}`);

});


