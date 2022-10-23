class cell {
    constructor(parent_i,parent_j,f,g,h) {
        this.parent_i = parent_i;
        this.parent_j = parent_j;
        this.f = f;
        this.g = g;
        this.h = h;
    }
}

function isValid ( r, c )
{
    return (( r >= 0 ) && ( r < rows ) && ( c >= 0 ) && ( c < cols )&& (nodes[r][c].isWall==false));
}

function isDestination ( r, c, endr, endc )
{
    if ( r == endr && c == endc )
    {
        return true;
    }
    return false;
}

function calculateHValue ( r, c, endr, endc, isAstar )
{
    if ( isAstar ==1)
    {
        return Math.abs( r - endr ) + Math.abs( c - endc );
    } else if(isAstar == 2)
    {
        return Math.abs(r - rs) + Math.abs(c - cs);
    } else
    {
        return 0;
    }
}
async function tracePath (cellDetails,row,col)
{
    // console.log( "oh punjabi" );
    let Path = [];
    while ( !(cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col))
    {
        Path.push( [row, col] );
        let temp_row = cellDetails[row][col].parent_i;
        let temp_col = cellDetails[row][col].parent_j;
        row = temp_row;
        col = temp_col;
    }
    Path.push( [row, col] ); 
    Path.reverse();
    while ( Path.length != 0 )
    {
        let p = Path.shift();
        nodes[p[0]][p[1]].divRef.classList.remove( "node-check" );
        nodes[p[0]][p[1]].divRef.classList.remove("node-current");
        await new Promise((done) => setTimeout(() => done(), 50)); 
        nodes[p[0]][p[1]].divRef.classList.add("node-path");
    }
}
async function aStarSearch ( nodes, sr, sc, er, ec ,isAstar)
{
    let n = nodes.length, m = nodes[0].length;
    let closedList = [], cellDetails = [];
    for ( let i = 0; i < n; i++ )
    {
        closedList[i] = new Array();
        cellDetails[i] = new Array();
        for ( let j = 0; j < m; j++ )
        {
            closedList[i][j] = false;
            cellDetails[i][j] = new cell( -1, -1, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        }
    }
    console.log( closedList );
    console.log( cellDetails );
    let i = sr, j = sc;
    console.log( typeof( i ) );
	cellDetails[i][j].f = 0.0;
	cellDetails[i][j].g = 0.0;
	cellDetails[i][j].h = 0.0;
	cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;
    
    openList = [];
    openList.push( [0.0, i, j] );
    let foundDest = false;
    while ( openList.length != 0 )
    {
        await new Promise((done) => setTimeout(() => done(), 50));
        openList.sort();
        let p = openList.shift();
        // console.log( p ,openList.length);
        i = p[1];
        j = p[2];
        closedList[i][j] = true;
        let X = [0, 0, 1, -1];
        let Y = [ 1, -1, 0, 0];
        let gNew, hNew, fNew;
        for ( let diri = 0; diri < 4; diri++ )
        {
            let newi = parseInt( i ) + parseInt( X[diri] );
            let newj = parseInt( j ) + parseInt( Y[diri] );
            if ( isValid( newi, newj ) )
            {
                nodes[newi][newj].divRef.classList.add("node-current");
                setTimeout(() => {
                    nodes[newi][newj].divRef.classList.add("node-check");
                }, 1500);
				if (isDestination(newi, newj, er,ec) == true) {
					cellDetails[newi][newj].parent_i = i;
					cellDetails[newi][newj].parent_j = j;
					console.log("The destination cell is found\n");
					tracePath(cellDetails, er,ec);
					foundDest = true;
					return;
				}
                else if ( closedList[newi][newj] == false && isValid( newi, newj ) == true )
                {
					gNew = cellDetails[i][j].g + 1.0;
					hNew = calculateHValue(newi, newj, er,ec,isAstar);
                    fNew = gNew + hNew;
                    if ( cellDetails[newi][newj].f == Number.MAX_VALUE || cellDetails[newi][newj].f > fNew )
                    {
                        openList.push( [fNew, newi, newj] );
                        cellDetails[newi][newj].f = fNew;
						cellDetails[newi][newj].g = gNew;
						cellDetails[newi][newj].h = hNew;
						cellDetails[newi][newj].parent_i = i;
						cellDetails[newi][newj].parent_j = j;
					}
				}
			}
		}
    }
    if (!foundDest )
    {
        console.log( "are nhi chl rha hai" );
    }
}

function astarr ()
{
    reuse();
    aStarSearch(nodes, rs, cs,re,ce,1);
}
