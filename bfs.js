let path = []
async function bfs ( nodes, sr, sc )
{
    let n = nodes.length, m = nodes[0].length;
    let queue = [];
    queue.push( [nodes[sr][sc],[nodes[sr][sc]]] );
    let Y = [0, 0, -1, 1];
    let X = [1, -1, 0, 0];
    while ( queue.length != 0 )
    {
        await new Promise((done) => setTimeout(() => done(), 100));  
        let si = queue.length;
        for (let j = 0; j < si; j++) {
            let fri = queue.shift(); 
            let fr = fri[0];
            if ( fr.isEnd )
            {
                path = fri[1];
                nodes[fr.row][fr.col].isVisited = true;
                fr.divRef.classList.add( "node-current" );
                setTimeout(() => {
                    nodes[fr.row][fr.col].divRef.classList.add("node-check");
                }, 1500);
                return true;
            }
            const r = fr.row, c = fr.col;
            for ( let i = 0; i < 4; i++ )
            {
                let newr = r + X[i], newc = c + Y[i];
                if ( newr >= 0 && newr < n && newc >= 0 && newc < m && nodes[newr][newc].isVisited == false && nodes[newr][newc].isWall==false)
                {
                    nodes[newr][newc].isVisited = true;
                    nodes[newr][newc].divRef.classList.add( "node-current" );
                    setTimeout( () =>
                    {
                    nodes[newr][newc].divRef.classList.add("node-check");
                    },1500)
                    let temp = [...fri[1]];
                    temp.push( nodes[newr][newc] );
                    queue.push( [nodes[newr][newc],temp] );
                }
            }
        }
    }
    return false;
}


async function make_path_bfs ()
{
    for ( let i = 0; i < path.length; i++ )
    {
        path[i].divRef.classList.remove( "node-check" );
        path[i].divRef.classList.remove("node-current");
        await new Promise((done) => setTimeout(() => done(), 50)); 
        path[i].divRef.classList.add("node-path");
    }

}
async function bfsr ()
{
    path = [];
    reuse();
    await bfs( nodes, rs, cs );
    make_path_bfs();
}
