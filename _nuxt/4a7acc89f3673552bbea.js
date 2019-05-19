(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1036:function(t,e,n){t.exports=n.p+"img/a0f4f30.svg"},1037:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"voting-item"},[e("div",{staticClass:"voting-label"},[this._v("\n              Active ballot for:\n            ")]),this._v(" "),e("div",{staticClass:"voting-value"},[this._v("\n              Mattic network support\n            ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"column left-column"},[e("div",{staticClass:"border left-border"},[e("div",{staticClass:"logo"},[e("img",{attrs:{src:n(1036),alt:""}})])])])}],l=n(33),c=n(216),r={data:function(){return{loading:null}},name:"Voting",computed:Object(l.a)({},Object(c.d)("voting",["voteTx","decision","duration","votingResults","isLoaded"]),Object(c.c)("voting",["txExplorerUrl","txHashToRender","txStatusClass","isUserInVotingList","balance"]),Object(c.d)("metamask",["ethAccount"]),Object(c.c)("metamask",["networkConfig"]),{isError:function(){return!this.isUserInVotingList}}),mounted:function(){this.loading=this.$loading.open({container:null})},watch:{isLoaded:function(t){this.loading.close(),this.loading=null}},methods:Object(l.a)({},Object(c.b)("voting",["vote"]),{callVote:function(t){var e=this,n=t.votingOption;this.loading=this.$loading.open({container:null}),setTimeout(function(){e.vote({votingOption:n})},1e3)}})},v=n(62),component=Object(v.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("section",{staticClass:"section future"},[n("div",{staticClass:"columns is-vcentered mobile-reverse"},[n("div",{staticClass:"column"},[n("h1",{staticClass:"title is-spaced"},[t._v("The Future of 0x Platform")]),t._v(" "),n("p",[t._v("\n          It has been well over a year since we published the 0x white paper and shared our\n          vision. Should we support Mattic network now?\n        ")]),t._v(" "),n("b-button",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:".vote",expression:"'.vote'"}],staticClass:"chevron",attrs:{type:"is-primary",size:"is-medium",rounded:""}},[t._v("\n          Place Vote Now\n        ")])],1),t._v(" "),n("div",{staticClass:"column"},[n("div",{staticClass:"voting"},[n("div",{staticClass:"voting-header"},[t._v("\n            Voting\n          ")]),t._v(" "),n("div",{staticClass:"voting-line top"}),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"voting-line bottom"}),t._v(" "),n("div",{staticClass:"voting-item"},[n("div",{staticClass:"voting-label"},[t._v("\n              To sumbit votes:\n            ")]),t._v(" "),n("div",{staticClass:"voting-value"},[t._v("\n              "+t._s(t.duration.days+":"+t.duration.hours+":"+t.duration.minutes+":"+t.duration.seconds)+"\n            ")])])])])])]),t._v(" "),n("section",{staticClass:"section vote"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("div",{staticClass:"vote-icon"},[n("b-icon",{attrs:{icon:"check",size:"is-large",type:"is-success"}})],1),t._v(" "),n("h4",[t._v("\n          Yes\n        ")]),t._v(" "),n("p",[t._v("\n          This proposal constructs a new token specifically designed and categorized as new token\n          on Mattic Network\n        ")]),t._v(" "),n("b-button",{staticClass:"chevron",attrs:{type:"is-primary",size:"is-medium",rounded:""},on:{click:function(e){return t.callVote({votingOption:2})}}},[t._v('\n          Vote "Yes"\n        ')]),t._v(" "),n("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:".structure",expression:"'.structure'"}],staticClass:"link",attrs:{href:"#"}},[t._v("Read more")])],1),t._v(" "),n("div",{staticClass:"column"},[n("div",{staticClass:"vote-icon"},[n("b-icon",{attrs:{icon:"close",size:"is-large",type:"is-danger"}})],1),t._v(" "),n("h4",[t._v("\n          No\n        ")]),t._v(" "),n("p",[t._v("\n          This vote means the community prefers to keep 0x token to the exact policy described in\n          our white paper\n        ")]),t._v(" "),n("b-button",{staticClass:"chevron",attrs:{type:"is-primary",size:"is-medium",rounded:""},on:{click:function(e){return t.callVote({votingOption:1})}}},[t._v('\n          Vote for "No"\n        ')]),t._v(" "),n("a",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:".structure",expression:"'.structure'"}],staticClass:"link",attrs:{href:"#"}},[t._v("Read more")])],1)]),t._v(" "),t.voteTx.txHash&&1!==t.voteTx.status?n("div",{staticClass:"token-field"},[n("div",{staticClass:"label"},[t._v("Transaction hash")]),t._v(" "),n("div",{staticClass:"txs"},[n("div",{staticClass:"txs__item",class:t.txStatusClass(t.voteTx.status)},[n("div",{staticClass:"txs__status"}),t._v(" "),n("a",{staticClass:"txs__address",attrs:{href:t.txExplorerUrl("voteTx"),target:"_blank"}},[t._v("\n            "+t._s(t.txHashToRender("voteTx"))+"\n          ")])])])]):t._e()]),t._v(" "),n("section",{staticClass:"section results"},[t._v("\n    Current Voting Results: "),n("br"),n("br"),t._v("\n    No "+t._s(t.votingResults.noPercent)+"% Votes: "+t._s(t.votingResults.noVotes)+"\n    "+t._s(t.networkConfig.tokenSymbol)),n("br"),t._v("\n    Yes "+t._s(t.votingResults.yesPercent)+"% Votes: "+t._s(t.votingResults.yesVotes)+"\n    "+t._s(t.networkConfig.tokenSymbol)),n("br"),t._v("\n    Total Voted "+t._s(t.votingResults.totalVoted)+" "+t._s(t.networkConfig.tokenSymbol)+"\n  ")]),t._v(" "),n("section",{staticClass:"section wallet"},[n("div",{staticClass:"columns is-gapless"},[t._m(1),t._v(" "),n("div",{staticClass:"column right-column"},[n("div",{staticClass:"border right-border"},[t.ethAccount?n("div",{staticClass:"wallet-item"},[n("div",{staticClass:"wallet-item__name"},[t._v("Your Address")]),t._v(" "),n("div",{staticClass:"wallet-item__value"},[t._v(t._s(t.ethAccount))])]):t._e(),t._v(" "),n("div",{staticClass:"columns is-gapless"},[n("div",{staticClass:"column"},[n("div",{staticClass:"wallet-item"},[n("div",{staticClass:"wallet-item__name"},[t._v("Your Balance")]),t._v(" "),n("div",{staticClass:"wallet-item__value"},[t._v(t._s(t.balance)+" "),n("span",[t._v("ZRX")])])])]),t._v(" "),n("div",{staticClass:"column"},[n("div",{staticClass:"wallet-item"},[n("div",{staticClass:"wallet-item__name"},[t._v("Your Decision")]),t._v(" "),n("div",{staticClass:"wallet-item__value"},[n("a",{attrs:{href:t.txExplorerUrl("voteTx"),target:"_blank"}},[t._v(t._s(t.decision))])])])])])])])]),t._v(" "),n("b-message",{attrs:{type:"is-warning",active:t.isError},on:{"update:active":function(e){t.isError=e}}},[t._v("\n      Current address "+t._s(t.ethAccount)+" is not in the voting list.\n    ")])],1)])},o,!1,null,null,null);e.default=component.exports}}]);