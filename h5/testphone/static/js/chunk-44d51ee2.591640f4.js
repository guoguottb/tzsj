;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-44d51ee2'],
  {
    '57a2': function (t, i, s) {
      'use strict'
      s('ee09')
    },
    bee2: function (t, i, s) {
      'use strict'
      s.r(i)
      var e = function () {
          var t = this,
            i = t._self._c
          return i('div', { staticClass: 'inspect' }, [
            t._m(0),
            i('main', [
              i('div', [
                i('div', { staticClass: 'maindivbox' }, [
                  i('div', {
                    staticClass: 'maindiv maindivimg1',
                    on: {
                      click: function (i) {
                        return t.routePush('/inspectTwo')
                      },
                    },
                  }),
                  i('div', [t._v('民政部门')]),
                ]),
              ]),
            ]),
          ])
        },
        a = [
          function () {
            var t = this,
              i = t._self._c
            return i('header', [
              i('div', [
                i('div', { staticClass: 'headerFont' }, [
                  i('img', {
                    staticClass: 'headerImg',
                    attrs: { src: s('dd16') },
                  }),
                  i(
                    'span',
                    {
                      staticStyle: {
                        'font-size': '25px',
                        display: 'block',
                        'margin-top': '10px',
                      },
                    },
                    [t._v('泰州智慧民政社会救助')]
                  ),
                ]),
              ]),
            ])
          },
        ],
        n = {
          data() {
            return {}
          },
          methods: {
            routePush(t) {
              this.$router.push({ path: t })
            },
          },
        },
        c = n,
        r = (s('57a2'), s('2877')),
        u = Object(r['a'])(c, e, a, !1, null, '7b4b5938', null)
      i['default'] = u.exports
    },
    ee09: function (t, i, s) {},
  },
])
