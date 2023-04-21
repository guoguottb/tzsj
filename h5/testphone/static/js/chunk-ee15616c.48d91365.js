;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-ee15616c'],
  {
    2060: function (t, s, e) {},
    '8d7b': function (t, s, e) {
      'use strict'
      e('2060')
    },
    ab21: function (t, s, e) {
      'use strict'
      e.r(s)
      var n = function () {
          var t = this,
            s = t._self._c
          return s('div', { staticClass: 'home' }, [
            t._m(0),
            s('main', [
              s(
                'div',
                t._l(t.btnList, function (e, n) {
                  return s(
                    'div',
                    {
                      key: n,
                      staticClass: 'maindivbox',
                      on: {
                        click: function (s) {
                          return t.routePush(e.url, e.btnName)
                        },
                      },
                    },
                    [
                      s('div', { staticStyle: { 'font-size': '14px' } }, [
                        t._v(t._s(e.btnName)),
                      ]),
                    ]
                  )
                }),
                0
              ),
            ]),
            t._m(1),
          ])
        },
        i = [
          function () {
            var t = this,
              s = t._self._c
            return s('header', [
              s('div', [
                s('div', { staticClass: 'headerFont' }, [
                  s('img', {
                    staticClass: 'headerImg',
                    attrs: { src: e('dd16') },
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
            ])
          },
          function () {
            var t = this,
              s = t._self._c
            return s('footer', [
              s(
                'span',
                { staticStyle: { color: '#fff', 'font-size': '12px' } },
                [t._v('所属单位：泰州市民政局 联系电话：0523-86198830')]
              ),
            ])
          },
        ],
        a = {
          name: 'inspectClass',
          data() {
            return {
              btnList: [
                {
                  btnName: '困境儿童上门核查',
                  url: '/inspectClass/ChildrenDistress',
                },
                { btnName: '残疾人上门核查', url: '/inspectClass/theDisabled' },
                { btnName: '社会救助上门核查', url: '/InspectTwo' },
              ],
            }
          },
          created() {},
          methods: {
            routePush(t, s) {
              '上门核查' === s && (t = '/inspectClass'),
                console.log(s),
                '退出账号' == s
                  ? (sessionStorage.removeItem('token'),
                    this.$router.push({ path: '/' }))
                  : this.$router.push({ path: t })
            },
          },
        },
        r = a,
        o = (e('8d7b'), e('2877')),
        c = Object(o['a'])(r, n, i, !1, null, 'ab1e599e', null)
      s['default'] = c.exports
    },
  },
])
