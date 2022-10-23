let path1 = [],path2 = [];
async function bibfs (nodes,sr,sc,er,ec)
{
    let n = nodes.length, m = nodes[0].length;
    let q1 = [], q2 = [];
    let Y = [0, 0, -1, 1];
    let X = [1, -1, 0, 0];
    q1.push([nodes[sr][sc], [nodes[sr][sc]]]);
    q2.push( [nodes[er][ec], [nodes[er][ec]]] );
    path1[sr][sc] = nodes[sr][sc];
    path2[er][ec] = nodes[er][ec];
    let V = Array(n)
        .fill()
        .map(() => Array(m).fill(0));
    V[sr][sc] = 1;
    V[er][ec] = 2;
    while ( q1.length != 0 || q2.length != 0 )
    {
        await new Promise((done) => setTimeout(() => done(), 50));  
        //q1
        let siq1 = q1.length;
        for ( let i = 0; i < siq1; i++ )
        {
            let fri = q1.shift();
            let fr = fri[0];
            let x = fr.row, y = fr.col;
            path1[x][y] = fri[1];
            if ( V[x][y] == 2 )
            {
                return {x,y};
            }
            for (let j = 0; j < 4; j++) {
                let newx = x + X[j];
                let newy = y + Y[j];
                if ( newx >= 0 && newx < n && newy >= 0 && newy < m && V[newx][newy] !=1 && nodes[newx][newy].isWall==false)
                {
                    V[newx][newy] = 1;
                    nodes[newx][newy].isVisited = true;
                    nodes[newx][newy].divRef.classList.add( "node-current" );
                    setTimeout(() => {
                        nodes[newx][newy].divRef.classList.add("node-check");
                    }, 1500 );
                    let temp = [...fri[1]];
                    temp.push( nodes[newx][newy] );
                    q1.push( [nodes[newx][newy], temp] );
                    path1[newx][newy] = temp;
                }
            }
        }
        //q2
        let siq2 = q2.length;
        for ( let i = 0; i < siq2; i++ )
        {
            let fri = q2.shift();
            let fr = fri[0];
            let x = fr.row, y = fr.col;
            path2[x][y] = fri[1];
            if ( V[x][y] == 1 )
            {
                return {x,y};
            }
            for (let j = 0; j < 4; j++) {
                let newx = x + X[j];
                let newy = y + Y[j];
                if ( newx >= 0 && newx < n && newy >= 0 && newy < m && V[newx][newy] != 2  && nodes[newx][newy].isWall==false)
                {
                    V[newx][newy] = 2;
                    nodes[newx][newy].divRef.classList.add("node-current");
                    setTimeout(() => {
                        nodes[newx][newy].divRef.classList.add("node-check-backward");
                    }, 1500);
                    nodes[newx][newy].isVisited = true;
                    let temp = [...fri[1]];
                    temp.push(nodes[newx][newy]);
                    q2.push( [nodes[newx][newy], temp] );
                    path2[newx][newy] = temp;
                }
            }
        }
    }
}
async function bibfsr ()
{
    let n = nodes.length, m = nodes[0].length;
    
    path1 = new Array();
    path2 = new Array();
    for ( let i = 0; i < n; i++ )
    {       
        path1[i] = new Array();
        path2[i] = new Array();
    }
    reuse();
    let ans = await bibfs( nodes, rs, cs, re, ce );
    if ( ans )
    {
        make_path_bibfs( ans );
    }
}


async function make_path_bibfs ( locations )
{
    let p1 = path1[locations.x][locations.y];
    let p2 = path2[locations.x][locations.y];
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        if (i < p1.length) {
            p1[i].divRef.classList.remove("node-check");
            p1[i].divRef.classList.remove("node-current");
            p1[i].divRef.classList.add("node-path");
        }
        if (i < p2.length) {
            p2[i].divRef.classList.remove("node-check");
            p2[i].divRef.classList.remove("node-current");
            p2[i].divRef.classList.add("node-path");
        }
        await new Promise((done) => setTimeout(() => done(), 50));
    }
}

