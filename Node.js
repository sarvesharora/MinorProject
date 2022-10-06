class Node {
    constructor(divRef, row, col,isWall = false,isStart = false, isEnd = false, isVisited = false) {
        this.divRef = divRef;
        this.row = row;
        this.col = col;
        this.isWall = isWall;
        this.isStart = isStart;
        this.isEnd = isEnd;
        this.isVisited = isVisited;
    }
}