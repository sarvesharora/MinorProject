function dijkstrar() {
    reuse();
    let time = 10;
    if (speed == 0) {
        time = 100;
    } else if (speed == 1) {
        time = 50;
    } else {
        time = 10;
    }
    aStarSearch(nodes, rs, cs, re, ce, 0, time);
}
function bestfirstsearchr() {
    reuse();
    let time = 10;
    if (speed == 0) {
        time = 100;
    } else if (speed == 1) {
        time = 50;
    } else {
        time = 10;
    }
    aStarSearch(nodes, rs, cs, re, ce, 2, time);
}
