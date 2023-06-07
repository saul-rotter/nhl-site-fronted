(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,a,t){},206:function(e,a,t){e.exports=t(356)},356:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),l=t(32),c=t.n(l),s=(t(146),t(13)),o=t(178),m=t(36),u=Object(o.a)({baseQuery:Object(m.d)({baseUrl:"https://project.trumedianetworks.com/api/"}),endpoints:function(e){return{getAPIToken:e.query({query:function(){return{url:"token",headers:{apiKey:"199b9b1a-1973-4aa9-9f7c-f22b9a9b4cbe","content-type":"application/json"}}},refetchOnMountOrArgChange:86340})}}}),i=u.useGetAPITokenQuery;var d=u.injectEndpoints({endpoints:function(e){return{getPlayerGames:e.query({query:function(e){var a=e.token,t=e.playerId;return{url:"nfl/player/".concat(t),headers:{"content-type":"application/json",tempToken:a}}},transformResponse:function(e){var a=e,t=0,r=0,n=0,l=0,c=0;return(a=a.map(function(e){return e["Yd/Att"]=(e.PsYds/e.Att).toFixed(3),e["Cmp%"]=(e.Cmp/e.Att).toFixed(3),r+=e.PsTD,t+=e.PsYds,n+=e.Cmp,l+=e.Att,c+=e.Int,e})).YdsPerGame=(t/a.length).toFixed(3),a.TotTDs=r,a.TotCmpPer=(n/l).toFixed(3),a.TotInt=c,a}})}}}).useGetPlayerGamesQuery,p=t(375),y=t(376),E=t(360);var h=function(e){var a=e.player;return n.a.createElement(p.a,{style:{width:"18rem"}},n.a.createElement(p.a.Img,{variant:"top",src:a[0].playerImage}),n.a.createElement(p.a.Body,null,n.a.createElement(p.a.Title,null,a[0].fullName),n.a.createElement(p.a.Subtitle,null,n.a.createElement(p.a.Img,{src:a[0].teamImage,style:{width:"9%"}}),a[0].team),n.a.createElement(y.a,{variant:"flush"},n.a.createElement(y.a.Item,null,"Yards Per Game: ",a.YdsPerGame),n.a.createElement(y.a.Item,null,"Total TDs: ",a.TotTDs),n.a.createElement(y.a.Item,null,"Season Completion %: ",a.TotCmpPer),n.a.createElement(y.a.Item,null,"Total Ints: ",a.TotInt)),n.a.createElement(E.a,{variant:"primary"},"Compare QBs ")))},f=t(369),v=t(368),g=t(12),b=t(361),k=t(362),w=t(366),I=t(194),P=t(195),T=t(95),C=t(92),j=t(200);var G=function(e){var a=e.playerGames;return n.a.createElement(b.a,{width:"100%",height:"70%"},n.a.createElement(k.a,{width:500,height:500,data:a,margin:{top:5,bottom:5,left:5,right:5}},n.a.createElement(w.a,{strokeDasharray:"3 3"}),n.a.createElement(I.a,{dataKey:"week",label:"Week",height:60}),n.a.createElement(P.a,null),n.a.createElement(T.a,{labelFormatter:function(e){return"Week ".concat(e)}}),n.a.createElement(C.a,null),n.a.createElement(j.a,{type:"monotone",dataKey:"Cmp%",stroke:"#8884d8",activeDot:{r:8}}),n.a.createElement(j.a,{type:"monotone",dataKey:"Yd/Att",stroke:"#82ca9d"})))},H=t(196),O=t(367);function A(e){var a=e.columns,t=e.data,r=Object(H.useTable)({columns:a,data:t}),l=r.getTableProps,c=r.getTableBodyProps,s=r.headerGroups,o=r.rows,m=r.prepareRow;return n.a.createElement(O.a,Object.assign({responsive:"xl"},l()),n.a.createElement("thead",null,s.map(function(e){return n.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map(function(e){return n.a.createElement("th",e.getHeaderProps(),e.render("Header"))}))})),n.a.createElement("tbody",c(),o.map(function(e,a){return m(e),n.a.createElement("tr",e.getRowProps(),e.cells.map(function(e){return n.a.createElement("td",e.getCellProps(),e.render("Cell"))}))})))}var Y=t(372);var D=function(e){var a=e.playerGames,t=Object(r.useState)(!0),l=Object(g.a)(t,2),c=l[0],s=l[1],o=function(e){return s(e)};return n.a.createElement(v.a,null,n.a.createElement("h2",null,"Games"),n.a.createElement(E.a,{variant:c?"primary":"secondary",onClick:function(){return o(!0)}},"Table"," "),n.a.createElement(E.a,{variant:c?"secondary":"primary",onClick:function(){return o(!1)}},"Graph"," "),c?n.a.createElement(A,{columns:[{Header:"Week",accessor:"week",disableFilters:!0,sticky:"left"},{Header:"Game Date",accessor:"gameDate",sticky:"left",Cell:function(e){var a=e.value;return Object(Y.a)(new Date(a),"MM/dd/yyyy")}},{Header:"Opponent",accessor:"opponent",sticky:"left"},{Header:"Attempts",accessor:"Att"},{Header:"Completions",accessor:"Cmp"},{Header:"Interceptions",accessor:"Int"},{Header:"Passing Touchdowns",accessor:"PsTD"},{Header:"Passing Yards",accessor:"PsYds"},{Header:"Sacks",accessor:"Sack"},{Header:"Rushes",accessor:"Rush"},{Header:"Rushing Yards",accessor:"RshYds"},{Header:"Rushing Touchdowns",accessor:"RshTD"},{Header:"Yds/Att",accessor:"Yd/Att"},{Header:"Cmp%",accessor:"Cmp%"}],data:a}):n.a.createElement(G,{playerGames:a}))};var R=function(e){var a=e.token,t=Object(s.h)().playerId,r=n.a.createElement("div",null);if(a){var l=d({token:a,playerId:t}),c=l.data;l.isSuccess&&(r=n.a.createElement(f.a,{xs:2,className:"justify-content-space-evenly"},n.a.createElement(v.a,null,n.a.createElement(h,{player:c})),n.a.createElement(D,{playerGames:c})))}return r},S=t(373),x=t(371),N=t(70);function q(e){var a=e.player;return n.a.createElement("div",null,n.a.createElement(N.b,{to:"/players/".concat(a.playerId)},n.a.createElement("img",{"data-tip":"Select player to view statistics",src:a.playerImage,alt:a.fullName,className:"img-thumbnail"}),n.a.createElement("br",null),n.a.createElement("div",null,a.fullName)),n.a.createElement(s.a,null))}var F=u.injectEndpoints({endpoints:function(e){return{getPlayers:e.query({query:function(e){return{url:"nfl/players",headers:{"content-type":"application/json",tempToken:e}}}})}}}).useGetPlayersQuery;var B=function(e){var a=e.token,t=F(a),r=t.data,l=void 0===r?[]:r,c=null;return t.isSuccess&&(c=l.map(function(e){return n.a.createElement(S.a.Item,{style:{padding:5},key:e.playerId},n.a.createElement(q,{player:e}))})),n.a.createElement(x.a,{collapseOnSelect:!0,bg:"dark",variant:"dark",style:{height:"min-content",width:"max-content"}},n.a.createElement(x.a.Brand,{href:"/react_app",style:{width:"20%",paddingRight:5}},n.a.createElement("img",{src:"/react_app/trumedialogo.png",alt:"Logo",className:"img-thumbnail"})),n.a.createElement(x.a.Collapse,{id:"responsive-navbar-nav"},n.a.createElement(S.a,{style:{width:"25%",paddingRight:10}},c)))},Q=t(370);var K=function(){var e=function(){var e=i(),a=e.data;return e.isSuccess?a.token:null}(),a=n.a.createElement("div",null),t=n.a.createElement("div",null);return e&&(a=n.a.createElement("div",null,n.a.createElement(B,{token:e})),t=n.a.createElement(R,{token:e})),n.a.createElement("div",{className:"App"},n.a.createElement(Q.a,{fluid:!0},a,n.a.createElement(s.d,null,n.a.createElement(s.b,{exact:!0,path:"/",element:n.a.createElement("h1",null,"Welcome to the homepage, choose a player from above")}),n.a.createElement(s.b,{exact:!0,path:"/players/:playerId",element:t}))))},M=t(33),W=t(22),J=t(9),_=Object(J.a)({reducer:Object(W.a)({},u.reducerPath,u.reducer),middleware:function(e){return e().concat(u.middleware)}});t(355);c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(N.a,null,n.a.createElement(M.a,{store:_},n.a.createElement(K,null)))),document.getElementById("root"))}},[[206,1,2]]]);
//# sourceMappingURL=main.75aa372d.chunk.js.map