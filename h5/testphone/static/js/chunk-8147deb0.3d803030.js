;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-8147deb0'],
  {
    '837e': function (t, i, s) {},
    f1ac: function (t, i, s) {
      'use strict'
      s('837e')
    },
    fefd: function (t, i, s) {
      'use strict'
      s.r(i)
      var a = function () {
          var t = this,
            i = t._self._c
          return i('div', { staticClass: 'inspect' }, [
            i('header', [
              i('div', [
                i('div', { staticClass: 'headerFont' }, [
                  i('img', {
                    staticClass: 'headerImg',
                    attrs: { src: t.titleImg },
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
            ]),
            i('main', [
              i('div', [
                i('div', { staticClass: 'maindivbox' }, [
                  i('div', {
                    staticClass: 'maindiv maindivimg1',
                    on: {
                      click: function (i) {
                        return t.$router.push('/inspectClass/disabledList')
                      },
                    },
                  }),
                  i('div', [t._v('群众申请')]),
                ]),
              ]),
            ]),
          ])
        },
        e = [],
        n = s('dd16'),
        c = s.n(n),
        d = {
          data() {
            return { titleImg: c.a }
          },
          methods: {
            routePush(t, i) {
              this.$router.push({ path: t })
            },
          },
        },
        r = d,
        u = (s('f1ac'), s('2877')),
        o = Object(u['a'])(r, a, e, !1, null, '425f0482', null)
      i['default'] = o.exports
    },
  },
])
