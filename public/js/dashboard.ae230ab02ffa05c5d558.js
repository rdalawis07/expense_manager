(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"KHd+":function(t,e,n){"use strict";function s(t,e,n,s,o,a,i,r){var c,d="function"==typeof t?t.options:t;if(e&&(d.render=e,d.staticRenderFns=n,d._compiled=!0),s&&(d.functional=!0),a&&(d._scopeId="data-v-"+a),i?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},d._ssrRegister=c):o&&(c=r?function(){o.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(d.functional){d._injectStyles=c;var l=d.render;d.render=function(t,e){return c.call(e),l(t,e)}}else{var p=d.beforeCreate;d.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:d}}n.d(e,"a",(function(){return s}))},KSeX:function(t,e,n){"use strict";n.r(e);var s={data:function(){return{myExpenseList:[],chartExpenses:null,items:[{text:"Dashboard",disabled:!1}],randColorList:["#E91E63","#F8BBD0","#FF2301","#45323FF","#00FF12","#4CAF50","#009688","#673AB7","#607D8B","#FFEB3B","#4CAF50","#03A9F4","#795548","#FF9800","#F44336","#3F51B5"]}},computed:{userInformation:function(){return this.$store.getters["app/user_detail"]}},created:function(){this.fetchMyExpense()},methods:{fetchMyExpense:function(){var t=this;this.$store.dispatch("app/changeLoading",!0),this.myExpenseList=[];var e=this.userInformation[0].id;this.$axios({method:"get",url:"/api/expensegroup/".concat(e)}).then((function(e){if(e.data.length>0){t.myExpenseList=e.data;var n=t.myExpenseList.map((function(t){return t.expense_category_name})),s={type:"pie",data:{datasets:[{data:t.myExpenseList.map((function(t){return t.total_amount})),backgroundColor:t.randColorList,label:"By Expense Category"}],labels:n},options:{responsive:!0,legend:{display:!1}}};t.chartExpenses=new Chart(document.getElementById("myExpenses").getContext("2d"),s)}else t.$swal.fire("Information","No Expenses Found.","info");t.$store.dispatch("app/changeLoading",!1)})).catch((function(e){console.log(e),t.$swal.fire("Failed","Something went wrong. Please check your connection.","error"),t.$store.dispatch("app/changeLoading",!1)}))}}},o=n("KHd+"),a=Object(o.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",[n("v-col",{attrs:{cols:"6"}},[n("div",{staticClass:"title"},[t._v("My Expenses")])]),t._v(" "),n("v-col",{attrs:{cols:"6"}},[n("v-breadcrumbs",{staticClass:"indigo--text font-weight-black pa-0 pt-2 d-flex justify-end",attrs:{items:t.items},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),n("v-row",[n("v-col",{attrs:{cols:"4"}},[n("v-simple-table",{staticClass:"text-center body-2 d-flex justify-end"},[n("thead",[n("tr",[n("th",{staticClass:"text-center"},[t._v("Expense Categories")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("Total")])])]),t._v(" "),n("tbody",t._l(t.myExpenseList,(function(e){return n("tr",{key:e.expense_category_name},[n("td",[t._v(t._s(e.expense_category_name))]),t._v(" "),n("td",[t._v(t._s("$ "+e.total_amount))])])})),0)])],1),t._v(" "),n("v-col",{attrs:{cols:"8"}},[n("canvas",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"myExpenses"}})])],1)],1)}),[],!1,null,"d19d7b5a",null);e.default=a.exports}}]);