(this["webpackJsonpslide-a-lama"]=this["webpackJsonpslide-a-lama"]||[]).push([[0],{12:function(e,a,t){e.exports=t(18)},17:function(e,a,t){},18:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(6),l=t.n(c),s=(t(17),t(2)),i=t(7),m=t(8),o=t(4),u=t(11),p=t(9);var d=t(10),y=function(e){var a=e.onTimeUp,t=Object(n.useState)(10),c=Object(d.a)(t,2),l=c[0],s=c[1];return Object(n.useEffect)((function(){var e=l>0&&setInterval((function(){s(l-1),1===l&&a&&a()}),1e3);return function(){return clearInterval(e)}}),[l]),r.a.createElement("div",{className:"TimeLeft-count"},r.a.createElement("div",{className:"TimeLeft-count-inner"},l))},b={7:{name:"7",icon:"\ud83c\udfc6",points:150},bar:{name:"bar",icon:"\ud83d\udcb8",points:100},cherry:{name:"cherry",icon:"\ud83c\udf52",points:70},pear:{name:"pear",icon:"\ud83c\udf50",points:40},plum:{name:"plum",icon:"\ud83c\udf47",points:30},banana:{name:"banana",icon:"\ud83c\udf4c",points:20},bell:{name:"bell",icon:"\ud83d\udd14",points:10}},v=function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(e){var n;return Object(i.a)(this,t),(n=a.call(this,e)).state={activeItems:[Object.assign({x:1,y:0},b.cherry),Object.assign({x:1,y:1},b.bell),Object.assign({x:1,y:2},b.pear),Object.assign({x:2,y:2},b.pear),Object.assign({x:4,y:2},b.bar),Object.assign({x:0,y:3},b.pear),Object.assign({x:1,y:3},b.cherry),Object.assign({x:2,y:3},b.bell),Object.assign({x:4,y:3},b.bell),Object.assign({x:0,y:4},b.banana),Object.assign({x:1,y:4},b.bell),Object.assign({x:2,y:4},b.pear),Object.assign({x:3,y:4},b.banana),Object.assign({x:4,y:4},b.bell)],players:[{name:"Cassidi",points:0,lamas:5,color:"red"},{name:"Butch",points:0,lamas:5,color:"blue"}],currentPlayerIndex:0},n.onTimeUp=n.onTimeUp.bind(Object(o.a)(n)),n}return Object(m.a)(t,[{key:"componentDidMount",value:function(){this.start()}},{key:"start",value:function(){}},{key:"onTimeUp",value:function(){this.setState({currentPlayerIndex:0===this.state.currentPlayerIndex?1:0})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App ".concat("")},r.a.createElement("div",{className:"Stats m-1 mb-3"},this.state.players.map((function(a,t){return r.a.createElement("div",{key:t,className:"Stats-player Stats-player-".concat(a.color," ").concat(e.state.currentPlayerIndex===t?"active":"")},r.a.createElement("div",{className:"Stats-player-name"},a.name),r.a.createElement("div",{className:"Stats-player-points"},(n=a.points,c=4,n.toString().length>=c?n.toString():(Math.pow(10,c)+Math.floor(n)).toString().substring(1))));var n,c}))),r.a.createElement("div",{className:"App-row"},r.a.createElement("div",{className:"App-side-col"},r.a.createElement("table",{className:"App-table mx-2"},r.a.createElement("tbody",null,Object.values(b).map((function(e,a){return r.a.createElement("tr",{key:a},Object(s.a)(Array(3)).map((function(a,t){return r.a.createElement("td",{key:t},e.icon)})),r.a.createElement("td",null,e.points))})),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:3},"4 of a kind"),r.a.createElement("td",null,"\xd72")),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:3},"5 of a kind"),r.a.createElement("td",null,"\xd73"))))),r.a.createElement("main",{className:"App-main-col"},r.a.createElement("div",{className:"Grid mb-3"},Object(s.a)(Array(5)).map((function(e,a){return Object(s.a)(Array(5)).map((function(e,t){return r.a.createElement("div",{key:"".concat(a,"-").concat(t),className:"Grid-item Grid-item-".concat(a,"-").concat(t," Grid-x-").concat(a," Grid-y-").concat(t),"data-y-friendly":t+1,style:{}},!1)}))})),this.state.activeItems.map((function(e,a){return r.a.createElement("div",{key:a,className:"Item Grid-item Grid-item-".concat(e.x,"-").concat(e.y)},e.icon)}))),r.a.createElement("div",{className:"TimeLeft mb-3"},r.a.createElement("div",{className:"TimeLeft-arrow TimeLeft-arrow-red"},0===this.state.currentPlayerIndex&&r.a.createElement("span",null,"\u2b05")),0===this.state.currentPlayerIndex?r.a.createElement(n.Fragment,null,r.a.createElement(y,{onTimeUp:this.onTimeUp})):r.a.createElement(y,{onTimeUp:this.onTimeUp}),r.a.createElement("div",{className:"TimeLeft-arrow TimeLeft-arrow-blue"},1===this.state.currentPlayerIndex&&r.a.createElement("span",{className:"mirror"},"\u2b05")))),r.a.createElement("div",{className:"App-side-col"})),r.a.createElement("div",{className:"Lamas"},this.state.players.map((function(e,a){return r.a.createElement("div",{key:a,className:"Lamas-player Lamas-player-".concat(e.color)},Object(s.a)(Array(e.lamas)).map((function(a,t){return r.a.createElement("span",{key:t,className:"Lamas-llama ".concat("red"===e.color?"mirror":""),role:"img","aria-label":"Llama"},"\ud83e\udd99")})))}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.b723799d.chunk.js.map