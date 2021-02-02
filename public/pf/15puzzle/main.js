'use strict'
{
    var canvas = document.getElementById("stage");
    var context;
    var image;
    var IMAGE_URL ='15puzzle.png'
    var tiles = [];
    var ROW_CNT = 4;
    var COL_CNT = 4;
    var PIC_WIDTH = 280;
    var PIC_HEIGHT = 280;
    var TILE_WIDTH = PIC_WIDTH / COL_CNT;
    var TILE_HEIGHT = PIC_HEIGHT / ROW_CNT;
    var UDLR = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0]
    ];
    var moveCnt = 64;
  
    function initTiles(){
        var row, col;

        for(row = 0; row < ROW_CNT; row++){
            tiles[row] = [];
            for(col = 0; col < COL_CNT; col++){
                tiles[row][col] = row * ROW_CNT + col;
            }
        }

    }
    function drawPuzzle(){

        var row,col;
        var sx,sy,dx,dy;

        for(row = 0; row < ROW_CNT; row++){
            for(col = 0; col < COL_CNT; col++){
                dx = col * TILE_WIDTH;
                dy = row * TILE_HEIGHT;
                
                sx = (tiles[row][col] % COL_CNT) * TILE_WIDTH;
                sy = Math.floor(tiles[row][col] / COL_CNT) * TILE_HEIGHT;

                context.drawImage(image, sx, sy, TILE_WIDTH, TILE_HEIGHT, dx, dy, TILE_WIDTH, TILE_HEIGHT);
            }
        }
    }
    function checkResult(){
        var row, col;
        for(row = 0; row < ROW_CNT; row++){
            for(col = 0; col < COL_CNT; col++){
                if(row === ROW_CNT - 1 && col === COL_CNT - 1){
                    return true;
                }
                if(tiles[row][col] !== row * ROW_CNT +col){
                    return false;
                }
            }
        }
    }
    function shuffle(cnt){
        var blankRow, blankCol;
        var targetPosition;
        var targetRow, targetCol;

        blankRow = 0;
        blankCol = 0;

        while(true){
            targetPosition = Math.floor(Math.random() * UDLR.length);
            targetRow = blankRow + UDLR[targetPosition][1];
            targetCol = blankCol + UDLR[targetPosition][0];
            if(targetRow < 0 || targetRow >= ROW_CNT){
                continue;
            }
            if(targetCol < 0 || targetCol >= COL_CNT){
                continue;
            }
            tiles[blankRow][blankCol] = tiles[targetRow][targetCol];
            tiles[targetRow][targetCol] = 0;
            blankRow = targetRow;
            blankCol = targetCol;
            if(!--cnt){
                break;
            }
        }
    }
    
    if(!canvas.getContext){
            alert('Canvas is not supported ...');

        }
        context = canvas.getContext('2d');
        
        image = document.createElement('img');
        image.src = IMAGE_URL;
        image.addEventListener('load',() =>{
            initTiles();
            shuffle(moveCnt);
            drawPuzzle();
    });

    canvas.addEventListener('click', (e) =>{
        var x, y;
        var row, col;
        var i;
        var targetRow;
        var targetCol;
        x = e.offsetX;
        y = e.offsetY;
        row = Math.floor(y / TILE_HEIGHT);
        col = Math.floor(x / TILE_WIDTH);

        console.log(row, col, tiles[row][col]);

        for(i = 0; i < UDLR.length; i++){
            targetRow = row + UDLR[i][1];
            targetCol = col + UDLR[i][0];
            if(targetRow < 0 || targetRow >= ROW_CNT){
                continue;
            }
            if(targetCol < 0 || targetCol >= COL_CNT){
                continue;
            }
            if(tiles[targetRow][targetCol] === 0){
                tiles[targetRow][targetCol] = tiles[row][col];
                tiles[row][col] = 0;
                drawPuzzle();
            }
        }
    });
}
