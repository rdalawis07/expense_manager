(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
      isFormValid: false,
      moment: moment,
      isVisibleControl: true,
      dialog: false,
      search: '',
      roleList: [],
      isCreate: false,
      items: [{
        text: 'User Management',
        disabled: false
      }, {
        text: 'Roles',
        disabled: false
      }],
      headers: [{
        text: 'Display Name',
        align: 'left',
        value: 'name',
        sortable: true
      }, {
        text: 'Description',
        align: 'left',
        value: 'description',
        sortable: true
      }, {
        text: 'Created At',
        align: 'left',
        value: 'created_at',
        sortable: true
      }],
      roleObj: {
        id: null,
        name: null,
        description: null
      },
      rules: {
        required: function required(value) {
          return !!value || 'Required.';
        }
      }
    };
  },
  created: function created() {
    this.fetchRole();
  },
  methods: {
    fetchRole: function fetchRole() {
      var _this = this;

      this.$store.dispatch('app/changeLoading', true);
      this.roleList = [];
      this.$axios({
        method: 'get',
        url: '/api/roles'
      }).then(function (result) {
        if (result.data.length > 0) {
          _this.roleList = result.data;
        } else {
          _this.$swal.fire('Failed', 'No Data.', 'warning');
        }

        _this.$store.dispatch('app/changeLoading', false);
      })["catch"](function (err) {
        _this.$swal.fire('Failed', 'Something went wrong. Please check your connection.', 'error');

        _this.$store.dispatch('app/changeLoading', false);
      });
    },
    create: function create() {
      this.isCreate = true;
      this.roleObj.id = null;
      this.roleObj.name = null;
      this.roleObj.description = null;
      this.dialog = true;
    },
    editRow: function editRow(item) {
      if (item.name.includes('ADMIN')) {
        this.isVisibleControl = false;
      } else {
        this.isVisibleControl = true;
      }

      this.isCreate = false;
      this.roleObj.id = item.id;
      this.roleObj.name = item.name;
      this.roleObj.description = item.description;
      this.dialog = true;
    },
    saveCreate: function saveCreate() {
      var _this2 = this;

      this.$swal.fire({
        title: 'Save Role',
        text: "Are you sure?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          _this2.$store.dispatch('app/changeLoading', true);

          _this2.$axios({
            method: 'post',
            url: '/api/roles/create',
            params: _this2.roleObj
          }).then(function (result) {
            if (result.data[0].id || result.data.length <= 0) {
              _this2.roleList = result.data;

              _this2.$swal.fire('Success', 'Successfully add role.', 'success');
            } else {
              _this2.$swal.fire('Failed', 'Something went wrong. Please try again later.', 'error');
            }

            _this2.dialog = false;

            _this2.$store.dispatch('app/changeLoading', false);
          })["catch"](function (error) {
            _this2.$swal.fire('Failed', 'Something went wrong. Please try again later.', 'error');

            _this2.$store.dispatch('app/changeLoading', false);
          }); //end axios

        }
      });
    },
    saveEdit: function saveEdit() {
      var _this3 = this;

      this.$swal.fire({
        title: 'Save Update Role',
        text: "Are you sure?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          _this3.$store.dispatch('app/changeLoading', true);

          _this3.$axios({
            method: 'put',
            url: '/api/roles/update',
            params: _this3.roleObj
          }).then(function (result) {
            if (result.data[0].id || result.data.length <= 0) {
              _this3.roleList = result.data;

              _this3.$swal.fire('Success', 'Successfully Update role.', 'success');
            } else {
              _this3.$swal.fire('Failed', 'Something went wrong. Please try again later.', 'error');
            }

            _this3.dialog = false;

            _this3.$store.dispatch('app/changeLoading', false);
          })["catch"](function (error) {
            _this3.$swal.fire('Failed', 'Something went wrong. Please try again later.', 'error');

            _this3.$store.dispatch('app/changeLoading', false);
          }); //end axios

        }
      });
    },
    saveDelete: function saveDelete() {
      var _this4 = this;

      this.$swal.fire({
        title: 'Delete Role',
        text: "Are you sure?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          _this4.$store.dispatch('app/changeLoading', true);

          _this4.$axios({
            method: 'delete',
            url: '/api/roles/delete',
            params: _this4.roleObj
          }).then(function (result) {
            if (result.data[0].id || result.data.length <= 0) {
              _this4.roleList = result.data;

              _this4.$swal.fire('Success', 'Successfully add role.', 'success');
            } else {
              _this4.$swal.fire('Failed', 'Something went wrong. Please try again later.', 'error');
            }

            _this4.dialog = false;

            _this4.$store.dispatch('app/changeLoading', false);
          })["catch"](function (error) {
            _this4.$swal.fire('Failed', 'Something went wrong. Please try again later.', 'error');

            _this4.$store.dispatch('app/changeLoading', false);
          }); //end axios

        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.row-clickable[data-v-06db4861]{\r\n    cursor: pointer !important;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=template&id=06db4861&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=template&id=06db4861&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
    [
      _c(
        "v-row",
        [
          _c("v-col", { attrs: { cols: "6" } }, [
            _c("div", { staticClass: "title" }, [_vm._v("Roles")])
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
      _c(
        "v-row",
        { attrs: { "no-gutters": "" } },
        [
          _c(
            "v-col",
            { attrs: { cols: "12" } },
            [
              _c(
                "v-card",
                { staticClass: "elevation-1" },
                [
                  _c(
                    "v-card-title",
                    { staticClass: "pa-2 ma-0" },
                    [
                      _c(
                        "v-row",
                        { attrs: { "no-gutters": "" } },
                        [
                          _c(
                            "v-col",
                            { attrs: { cols: "8" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "primary", small: "" },
                                  on: { click: _vm.create }
                                },
                                [
                                  _c("v-icon", [_vm._v("mdi-plus")]),
                                  _vm._v(" Add Role")
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            { attrs: { cols: "4" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  outlined: "",
                                  dense: "",
                                  label: "Search",
                                  "prepend-icon": "mdi-magnify"
                                },
                                model: {
                                  value: _vm.search,
                                  callback: function($$v) {
                                    _vm.search = $$v
                                  },
                                  expression: "search"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    [
                      _c("v-data-table", {
                        staticClass: "ml-5 elevation-1",
                        attrs: {
                          search: _vm.search,
                          items: _vm.roleList,
                          headers: _vm.headers
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "item",
                            fn: function(ref) {
                              var item = ref.item
                              return [
                                _c(
                                  "tr",
                                  {
                                    class: {
                                      "row-clickable": item.name.includes(
                                        "ADMIN"
                                      )
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.editRow(item)
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "td",
                                      { staticClass: "subtitle-2 text-left" },
                                      [_vm._v(_vm._s(item.name))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      { staticClass: "subtitle-2 text-left" },
                                      [_vm._v(_vm._s(item.description))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      { staticClass: "subtitle-2 text-left" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm
                                              .moment(item.created_at)
                                              .format("YYYY-MM-DD")
                                          )
                                        )
                                      ]
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ])
                      })
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
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", width: "400" },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _c(
            "v-card",
            [
              _vm.isCreate
                ? _c(
                    "v-card-title",
                    {
                      staticClass: "headline purple lighten-2",
                      attrs: { "primary-title": "" }
                    },
                    [_vm._v("\r\n                Add Role\r\n                ")]
                  )
                : _c(
                    "v-card-title",
                    {
                      staticClass: "headline purple lighten-2",
                      attrs: { "primary-title": "" }
                    },
                    [
                      _vm._v(
                        "\r\n                Update Role\r\n                "
                      )
                    ]
                  ),
              _vm._v(" "),
              _c(
                "v-card-text",
                { staticClass: "pt-5 pr-5 pl-5 pb-0" },
                [
                  _c(
                    "v-form",
                    {
                      model: {
                        value: _vm.isFormValid,
                        callback: function($$v) {
                          _vm.isFormValid = $$v
                        },
                        expression: "isFormValid"
                      }
                    },
                    [
                      _c("v-text-field", {
                        attrs: {
                          outlined: "",
                          dense: "",
                          label: "Display Name",
                          rules: [_vm.rules.required]
                        },
                        model: {
                          value: _vm.roleObj.name,
                          callback: function($$v) {
                            _vm.$set(_vm.roleObj, "name", $$v)
                          },
                          expression: "roleObj.name"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-text-field", {
                        attrs: {
                          outlined: "",
                          dense: "",
                          label: "Description",
                          rules: [_vm.rules.required]
                        },
                        model: {
                          value: _vm.roleObj.description,
                          callback: function($$v) {
                            _vm.$set(_vm.roleObj, "description", $$v)
                          },
                          expression: "roleObj.description"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-divider"),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c(
                    "v-btn",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.isCreate === false && _vm.isVisibleControl,
                          expression: "isCreate === false && isVisibleControl"
                        }
                      ],
                      attrs: { color: "red", small: "" },
                      on: {
                        click: function($event) {
                          return _vm.saveDelete()
                        }
                      }
                    },
                    [_vm._v("Delete")]
                  ),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "grey", small: "" },
                      on: {
                        click: function($event) {
                          _vm.dialog = false
                        }
                      }
                    },
                    [_vm._v("Cancel")]
                  ),
                  _vm._v(" "),
                  _vm.isCreate
                    ? _c(
                        "v-btn",
                        {
                          attrs: {
                            color: "green",
                            small: "",
                            disabled:
                              !_vm.isFormValid ||
                              !_vm.roleObj.name ||
                              !_vm.roleObj.description
                          },
                          on: {
                            click: function($event) {
                              return _vm.saveCreate()
                            }
                          }
                        },
                        [_vm._v("Save")]
                      )
                    : _c(
                        "v-btn",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.isVisibleControl,
                              expression: "isVisibleControl"
                            }
                          ],
                          attrs: {
                            color: "indigo",
                            small: "",
                            disabled:
                              !_vm.isFormValid ||
                              !_vm.roleObj.name ||
                              !_vm.roleObj.description
                          },
                          on: {
                            click: function($event) {
                              return _vm.saveEdit()
                            }
                          }
                        },
                        [_vm._v("Update")]
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

/***/ "./resources/js/components/MainComponent/RoleComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/MainComponent/RoleComponent.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RoleComponent_vue_vue_type_template_id_06db4861_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoleComponent.vue?vue&type=template&id=06db4861&scoped=true& */ "./resources/js/components/MainComponent/RoleComponent.vue?vue&type=template&id=06db4861&scoped=true&");
/* harmony import */ var _RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoleComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/MainComponent/RoleComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css& */ "./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RoleComponent_vue_vue_type_template_id_06db4861_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RoleComponent_vue_vue_type_template_id_06db4861_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "06db4861",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/MainComponent/RoleComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/MainComponent/RoleComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/MainComponent/RoleComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css&":
/*!**************************************************************************************************************************!*\
  !*** ./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=style&index=0&id=06db4861&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_style_index_0_id_06db4861_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/MainComponent/RoleComponent.vue?vue&type=template&id=06db4861&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/MainComponent/RoleComponent.vue?vue&type=template&id=06db4861&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_template_id_06db4861_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RoleComponent.vue?vue&type=template&id=06db4861&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MainComponent/RoleComponent.vue?vue&type=template&id=06db4861&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_template_id_06db4861_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_template_id_06db4861_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);