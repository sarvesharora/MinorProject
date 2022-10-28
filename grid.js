let rows = 27;
let cols = 60;
nodes = [];
let main_area = document.getElementById("main_area");
let speed = 2;
let rs = 15,
    cs = 10,
    re = 10,
    ce = 30;
let start_wall = false, make_this_start_node = false, make_this_end_node = false;
window.addEventListener( "mouseup", () =>
{
    console.log( "mouse uping" );
    start_wall = false;
});
function make_wall ( e )
{
    if ( start_wall && !make_this_start_node &&!make_this_end_node)
    {
        // console.log( e.srcElement );
        let ele = e.srcElement;
        let r = parseInt( ele.getAttribute( "data-row" ) );
        let c = parseInt( ele.getAttribute( "data-col" ) );
        ele.classList.add( "wall" );
        nodes[r][c].isWall = true;
    }
    
}
function toggle_start_node ()
{
    make_this_start_node = !make_this_start_node;
}
function toggle_end_node ()
{
    make_this_end_node = !make_this_end_node;
}
function make_this_start_node_func ( e )
{
    console.log( "idhar bhi aagya" );
    if ( make_this_start_node )
    {
        console.log( "anadar" );
        nodes[rs][cs].divRef.classList = ["node"];
        nodes[rs][cs].isStart = false;
        let ele = e.srcElement;
        let r = parseInt( ele.getAttribute( "data-row" ) );
        let c = parseInt( ele.getAttribute( "data-col" ) );
        nodes[r][c].isStart = true;
        nodes[r][c].divRef.classList.add( "start_node" );
        console.log( r, c );
        rs = r;
        cs = c;
        toggle_start_node();
    }
}
function make_this_end_node_func (e)
{
    if (make_this_end_node) {
        nodes[re][ce].divRef.classList = ["node"];
        nodes[re][ce].isEnd = false;
        let ele = e.srcElement;
        let r = parseInt(ele.getAttribute("data-row"));
        let c = parseInt(ele.getAttribute("data-col"));
        nodes[r][c].isEnd = true;
        nodes[r][c].divRef.classList.add("end_node");
        console.log(r, c);
        re = r;
        ce = c;
        toggle_end_node();
    }
}
for (let i = 0; i < rows; i++) {
    let row_div = document.createElement("div");
    row_div.className = "row_div";
    let node_list = [];
    for (let j = 0; j < cols; j++) {
        let col_div = document.createElement( "div" );
        col_div.setAttribute( "data-row", i );
        col_div.setAttribute( "data-col", j );
        col_div.addEventListener( "click", make_this_start_node_func );
        col_div.addEventListener("click", make_this_end_node_func);
        col_div.addEventListener( "mousedown", (e) =>
        {
            console.log( "mouse dowining" );
            start_wall = true;
            make_wall(e);
        } )
        
        col_div.addEventListener( "mouseover",make_wall );
        col_div.className = "node";
        row_div.appendChild(col_div);
        node_list.push([]);
        node_list[j] = new Noden(col_div, i, j);
        if (i == rs && j == cs) {
            col_div.classList.add("start_node");
            node_list[j].isStart = true;
        }
        if (i == re && j == ce) {
            col_div.classList.add("end_node");
            node_list[j].isEnd = true;
        }
    }
    main_area.appendChild(row_div);
    nodes.push(node_list);
}
// console.log(nodes);
function reuse ()
{
    for (let i = 0; i < rows; i++) {
        for ( let j = 0; j < cols; j++ )
        {
            let div = nodes[i][j];
            nodes[i][j].isVisited = false;
            div.divRef.className = "node";
            if ( i == rs && j == cs )
            {
                nodes[i][j].divRef.classList.add("start_node");
                nodes[i][j].isStart = true;
            }
            if (i == re && j == ce) {
                nodes[i][j].divRef.classList.add("end_node");
                nodes[i][j].isEnd = true;
            }
            if ( nodes[i][j].isWall )
            {
                nodes[i][j].divRef.classList.add( "wall" );
            }
        }
    }
}
