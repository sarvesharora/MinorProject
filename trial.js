let n = 5, m = 5;

let V = new Array( n );
for (let i = 0; i < n; i++) {
    V[i] = new Array(m);
    for (let j = 0; j < m; j++) {
        V[i][j] = 0;
    }
}
console.log(V);
V[0][0] = 1;
V[4][4] = 2;
console.log("oye", V);
