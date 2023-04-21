;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-599b57d4'],
  {
    '43b4': function (i, t, s) {
      'use strict'
      s('974c')
    },
    '974c': function (i, t, s) {},
    b652: function (i, t, s) {
      'use strict'
      s.r(t)
      var a = function () {
          var i = this,
            t = i._self._c
          return t('div', { staticClass: 'inspect' }, [
            i._m(0),
            t('main', [
              t('div', [
                t('div', { staticClass: 'maindivbox' }, [
                  t('div', {
                    staticClass: 'maindiv maindivimg1',
                    on: {
                      click: function (t) {
                        return i.routePush('/dbhc', '群众申请')
                      },
                    },
                  }),
                  t('div', [i._v('群众申请')]),
                ]),
                t('div', { staticClass: 'maindivbox' }, [
                  t('div', {
                    staticClass: 'maindiv maindivimg2',
                    on: {
                      click: function (t) {
                        return i.routePush('/dsrhc', '主动排查')
                      },
                    },
                  }),
                  t('div', [i._v('主动排查')]),
                ]),
                t('div', { staticClass: 'maindivbox' }, [
                  t('div', {
                    staticClass: 'maindiv maindivimg3',
                    on: {
                      click: function (t) {
                        return i.routePush('/tkhc', '预警推送')
                      },
                    },
                  }),
                  t('div', [i._v('预警推送')]),
                ]),
                t('div', { staticClass: 'maindivbox' }, [
                  t('div', {
                    staticClass: 'maindiv maindivimg4',
                    on: {
                      click: function (t) {
                        return i.routePush('/lshc', '临时救助')
                      },
                    },
                  }),
                  t('div', [i._v('临时救助')]),
                ]),
                t('div', { staticStyle: {} }),
              ]),
            ]),
          ])
        },
        n = [
          function () {
            var i = this,
              t = i._self._c
            return t('header', [
              t('div', [
                t('div', { staticClass: 'headerFont' }, [
                  t('img', {
                    staticClass: 'headerImg',
                    attrs: { src: s('dd16') },
                  }),
                  t(
                    'span',
                    {
                      staticStyle: {
                        'font-size': '25px',
                        display: 'block',
                        'margin-top': '10px',
                      },
                    },
                    [i._v('泰州智慧民政社会救助')]
                  ),
                ]),
              ]),
            ])
          },
        ],
        c = {
          data() {
            return {}
          },
          methods: {
            routePush(i, t) {
              localStorage.getItem('username'), sessionStorage.getItem('token')
              this.$router.push({ path: i, query: { stype: t } })
            },
          },
        },
        e = c,
        d = (s('43b4'), s('2877')),
        r = Object(d['a'])(e, a, n, !1, null, '8ccc8818', null)
      t['default'] = r.exports
    },
  },
])
