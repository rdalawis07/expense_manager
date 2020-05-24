(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      windowSize: {
        x: 0,
        y: 0
      },
      myExpenseList: [],
      chartExpenses: null,
      items: [{
        text: 'Dashboard',
        disabled: false
      }],
      randColorList: ['#E91E63', '#F8BBD0', '#FF2301', '#45323FF', '#00FF12', '#4CAF50', '#009688', '#673AB7', '#607D8B', '#FFEB3B', '#4CAF50', '#03A9F4', '#795548', '#FF9800', '#F44336', '#3F51B5']
    };
  },
  mounted: function mounted() {
    this.onResize();
  },
  computed: {
    userInformation: function userInformation() {
      return this.$store.getters['app/user_detail'];
    }
  },
  created: function created() {
    this.fetchMyExpense();
  },
  methods: {
    fetchMyExpense: function fetchMyExpense() {
      var _this = this;

      this.$store.dispatch('app/changeLoading', true);
      this.myExpenseList = [];
      var user_id = this.userInformation[0].id;
      this.$axios({
        method: 'get',
        url: "/api/expensegroup/".concat(user_id)
      }).then(function (result) {
        if (result.data.length > 0) {
          _this.myExpenseList = result.data; //CONFIG PIE (MY EXPENSES)

          var expenseLabel = _this.myExpenseList.map(function (a) {
            return a.expense_category_name;
          });

          var expenseData = _this.myExpenseList.map(function (a) {
            return a.total_amount;
          });

          var configExpenses = {
            type: 'pie',
            data: {
              datasets: [{
                data: expenseData,
                backgroundColor: _this.randColorList,
                label: 'By Expense Category'
              }],
              labels: expenseLabel
            },
            options: {
              responsive: true,
              legend: {
                display: false
              }
            }
          };
          _this.chartExpenses = new Chart(document.getElementById("myExpenses").getContext('2d'), configExpenses);
        } else {
          _this.$swal.fire('Information', 'No Expenses Found.', 'info');
        }

        _this.$store.dispatch('app/changeLoading', false);
      })["catch"](function (err) {
        console.log(err);

        _this.$swal.fire('Failed', 'Something went wrong. Please check your connection.', 'error');

        _this.$store.dispatch('app/changeLoading', false);
      });
    },
    onResize: function onResize() {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "resize",
          rawName: "v-resize",
          value: _vm.onResize,
          expression: "onResize"
        }
      ]
    },
    [
      _c(
        "v-row",
        [
          _c("v-col", { attrs: { cols: "6" } }, [
            _c("div", { staticClass: "title" }, [_vm._v("My Expenses")])
          ]),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "6" } },
            [
              _c("v-breadcrumbs", {
                staticClass:
                  "indigo--text font-weight-black pa-0 pt-2 d-flex justify-end",
                attrs: { items: _vm.items },
                scopedSlots: _vm._u([
                  {
                    key: "divider",
                    fn: function() {
                      return [_c("v-icon", [_vm._v("mdi-chevron-right")])]
                    },
                    proxy: true
                  }
                ])
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.windowSize.x > 600
        ? _c(
            "div",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "4" } },
                    [
                      _c(
                        "v-simple-table",
                        {
                          staticClass: "text-center body-2 d-flex justify-end"
                        },
                        [
                          _c("thead", [
                            _c("tr", [
                              _c("th", { staticClass: "text-center" }, [
                                _vm._v("Expense Categories")
                              ]),
                              _vm._v(" "),
                              _c("th", { staticClass: "text-center" }, [
                                _vm._v("Total")
                              ])
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "tbody",
                            _vm._l(_vm.myExpenseList, function(item) {
                              return _c(
                                "tr",
                                { key: item.expense_category_name },
                                [
                                  _c("td", [
                                    _vm._v(_vm._s(item.expense_category_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s("$ " + item.total_amount))
                                  ])
                                ]
                              )
                            }),
                            0
                          )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-col", { attrs: { cols: "8" } }, [
                    _c("canvas", {
                      staticStyle: { width: "100%", height: "100%" },
                      attrs: { id: "myExpenses" }
                    })
                  ])
                ],
                1
              )
            ],
            1
          )
        : _c(
            "div",
            [
              _c(
                "v-row",
                [
                  _c("v-col", [
                    _c("canvas", {
                      staticStyle: { width: "100%", height: "100%" },
                      attrs: { id: "myExpenses" }
                    })
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    [
                      _c(
                        "v-simple-table",
                        {
                          staticClass: "text-center body-2 d-flex justify-start"
                        },
                        [
                          _c("thead", [
                            _c("tr", [
                              _c("th", { staticClass: "text-center" }, [
                                _vm._v("Expense Categories")
                              ]),
                              _vm._v(" "),
                              _c("th", { staticClass: "text-center" }, [
                                _vm._v("Total")
                              ])
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "tbody",
                            _vm._l(_vm.myExpenseList, function(item) {
                              return _c(
                                "tr",
                                { key: item.expense_category_name },
                                [
                                  _c("td", [
                                    _vm._v(_vm._s(item.expense_category_name))
                                  ]),
                                  _vm._v(" "),
                                  _c("td", [
                                    _vm._v(_vm._s("$ " + item.total_amount))
                                  ])
                                ]
                              )
                            }),
                            0
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/MainComponent/DashboardComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/components/MainComponent/DashboardComponent.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashboardComponent_vue_vue_type_template_id_7de543ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true& */ "./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true&");
/* harmony import */ var _DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashboardComponent_vue_vue_type_template_id_7de543ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DashboardComponent_vue_vue_type_template_id_7de543ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7de543ff",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/MainComponent/DashboardComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DashboardComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_template_id_7de543ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/DashboardComponent.vue?vue&type=template&id=7de543ff&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_template_id_7de543ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_template_id_7de543ff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);