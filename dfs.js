path = []

async function dfs ( nodes, sr, sc ,time)
{
    let Y = [0, 0, -1, 1];
    let X = [1, -1, 0, 0];
    const n = nodes.length, m = nodes[0].length;
    nodes[sr][sc].divRef.classList.add( "node-current" );
    setTimeout(() => {
        nodes[sr][sc].divRef.classList.add("node-check");
    }, 5000 );
    
    if ( nodes[sr][sc].isEnd )
    {
        path.push( nodes[sr][sc] );
        return true;
    }
    nodes[sr][sc].isVisited = true;
    for ( let i = 0; i < 4; i++ )
    {
        const newr = sr + X[i], newc = sc + Y[i];
        if ( newr >= 0 && newr < n && newc >= 0 && newc < m && nodes[newr][newc].isVisited == false &&nodes[newr][newc].isWall==false)
        {
            await new Promise(done => setTimeout(() => done(), time));  
            const re = await dfs( nodes, newr, newc ,time);
            if ( re )
            {
                path.push( nodes[newr][newc] );
                return true;
            }
        }
    }
    return false;
}
async function dfsr() {
    reuse();
    path = []
    let time = 10;
    if (speed == 0) {
        time = 200;
    } else if (speed == 1) {
        time = 100;
    } else {
        time = 10;
    }
    let res = await dfs(nodes, rs, cs,time);
    make_path_dfs();
}
async function make_path_dfs() {
    console.log( "hi" );
    // console.log( path );
    path.reverse();
    // console.log( path );
    for ( let i = 0; i < path.length; i++ )
    {
        path[i].divRef.classList.remove("node-current");
        path[i].divRef.classList.remove("node-check");
        await new Promise( ( done ) => setTimeout( () => done(), 50 ) );
        // console.log( path );
        path[i].divRef.classList.add("node-path");
    }
}
