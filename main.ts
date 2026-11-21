import*as f from'fs';
for(let k=1;k<6;k++){
let id='i00'+k,L=f.readFileSync('/input/'+id+'/level.txt','utf8').split('\n'),
w=L[0].length,G=L.join(''),p=G.indexOf('@'),Y=p/w|0,D=[],X=p%w,P='',
O=[[-w,'u'],[w,'d'],[-1,'l'],[1,'r']],
F=(s,A)=>{let R={[s]:''},Q=[s];while(Q.length){let u=Q.shift(),t=R[u];for(let[o,c]of O){let v=u+o;if(!(v in R)&&A(v))R[v]=t+c,Q.push(v)}}return R};
for(let c=0;c<w;c++){let d=Y*w+c;if(G[d-w]!='#'||G[d+w]!='#')D.push(d)}
for(let d of D){
let df=d%w-X;P+=(df>0?'r':'l').repeat(df<0?-df:df);X+=df;
let r=F(d,v=>G[v]!='#'&&(v/w|0)!=Y),B=[];
for(let v in r)if(G[v]=='$'||G[v]=='*')B.push(+v);
let V={[B+','+d]:1},Q=[[B,d,'']],s=0;
while(Q.length){
let[b,u,t]=Q.shift(),rc=F(u,v=>(v in r)&&!b.includes(v));
if(d in rc&&b.every(x=>G[x]>'$')){s=t+rc[d];break}
for(let[o,c]of O)for(let bx of b){let pd=bx-o,bd=bx+o;if((bd in r)&&!b.includes(bd)&&(pd in rc)){
let nb=[...b];nb[nb.indexOf(bx)]=bd;nb.sort((a,b)=>a-b);let K=nb+','+bx;
if(!(K in V))V[K]=1,Q.push([nb,bx,t+rc[pd]+c])
}}
}
if(s)P+=s
}
f.mkdirSync('/output/'+id,{recursive:!0});f.writeFileSync('/output/'+id+'/solution.txt',P)
}
