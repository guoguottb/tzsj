;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-bb277ae2'],
  {
    '40a8': function (t, s, i) {
      'use strict'
      i.r(s)
      var a = function () {
          var t = this,
            s = t._self._c
          return s('div', { staticClass: 'inspect' }, [
            s('header', [
              s('div', [
                s('div', { staticClass: 'headerFont' }, [
                  s('img', {
                    staticClass: 'headerImg',
                    attrs: { src: t.titleImg },
                  }),
                  s(
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
            ]),
            s('main', [
              s('div', [
                s('div', { staticClass: 'maindivbox' }, [
                  s('div', {
                    staticClass: 'maindiv maindivimg1',
                    on: {
                      click: function (s) {
                        return t.$router.push(
                          '/inspectClass/MassInspectionList'
                        )
                      },
                    },
                  }),
                  s('div', [t._v('群众申请')]),
                ]),
              ]),
            ]),
          ])
        },
        n = [],
        e = i('dd16'),
        c = i.n(e),
        r = {
          data() {
            return { titleImg: c.a }
          },
          methods: {
            routePush(t, s) {
              this.$router.push({ path: t })
            },
          },
        },
        d = r,
        o = (i('c81e'), i('2877')),
        u = Object(o['a'])(d, a, n, !1, null, '1b1a8bf7', null)
      s['default'] = u.exports
    },
    '53ae': function (t, s, i) {},
    c81e: function (t, s, i) {
      'use strict'
      i('53ae')
    },
  },
])
