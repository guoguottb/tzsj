;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-047ab4e3'],
  {
    '8bb8': function (t, e, s) {},
    aba8: function (t, e, s) {
      'use strict'
      s('8bb8')
    },
    b1ba: function (t, e, s) {
      'use strict'
      s.r(e)
      var a = function () {
          var t = this,
            e = t._self._c
          return e('div', { staticClass: 'home' }, [
            t._m(0),
            e('main', [
              e(
                'div',
                t._l(t.btnList2, function (s, a) {
                  return e(
                    'div',
                    {
                      key: a,
                      staticClass: 'maindivbox',
                      on: {
                        click: function (e) {
                          return t.operateBtn(s)
                        },
                      },
                    },
                    [
                      e('div', { staticStyle: { 'font-size': '14px' } }, [
                        t._v(t._s(s.btnName)),
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
        n = [
          function () {
            var t = this,
              e = t._self._c
            return e('header', [
              e('div', [
                e('div', { staticClass: 'headerFont' }, [
                  e('img', {
                    staticClass: 'headerImg',
                    attrs: { src: s('dd16') },
                  }),
                  e(
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
              e = t._self._c
            return e('footer', [
              e(
                'span',
                { staticStyle: { color: '#fff', 'font-size': '12px' } },
                [t._v('所属单位：泰州市民政局 联系电话：0523-86198830')]
              ),
            ])
          },
        ],
        i =
          (s('caad'),
          {
            name: 'Home2',
            data() {
              return {
                btnList: [
                  { btnName: '群众自助申请', url: '/apply', type: 'qz' },
                  {
                    btnName: '救助公示栏',
                    url: '/helpBulletinBoard',
                    type: 'qz',
                  },
                  { btnName: '受理进度查询', url: '/workNode', type: 'qz' },
                  {
                    btnName: '救助对象自我评估',
                    url: '/PoliciesCalculator',
                    type: 'qz',
                  },
                  { btnName: '上门核查', url: '/inspectTwo', type: 'mz' },
                  { btnName: '上门核查', url: '/inspectTwo', type: 'sgz' },
                  { btnName: '服务记录(走访)', url: '/zfhc', type: 'sgz' },
                  {
                    btnName: '特困自理能力评估',
                    url: '/SelfCareAssessmentList',
                    type: 'sgz',
                  },
                  {
                    btnName: '特困自理能力评估',
                    url: '/SelfCareAssessmentList',
                    type: 'gg',
                  },
                  {
                    btnName: '救助复查',
                    url: '/reexaminationList',
                    type: 'sgz',
                  },
                  { btnName: '困境儿童风险评估', url: '/etpgList', type: 'gg' },
                  { btnName: '服务记录(走访)', url: '/zfhc', type: 'mz' },
                  { btnName: '政策查询', url: '/policySearch', type: 'qz' },
                  { btnName: '投诉建议', url: '/complaints', type: 'qz' },
                  { btnName: '退出账号', url: '/Login', type: 'gg' },
                ],
                btnList2: [],
                station_handle: localStorage.getItem('station_handle') || !1,
              }
            },
            created() {
              this.$route.query.userId &&
                localStorage.setItem('cs_userId', this.$route.query.userId),
                this.loadData()
            },
            methods: {
              loadData() {
                let t = localStorage.getItem('username'),
                  e = localStorage.getItem('station_handle')
                this.btnList2 = []
                let s = /^3212.*/
                return '社会群众入口' == this.$route.query.module
                  ? (this.btnList2 = this.btnList.filter((t) => 'qz' == t.type))
                  : 'true' === e
                  ? (this.btnList2 = this.btnList.filter(
                      (t) => 'sgz' == t.type || '退出账号' === t.btnName
                    ))
                  : t.includes('pg')
                  ? (this.btnList2 = this.btnList.filter(
                      (t) => 'pg' == t.type || 'gg' == t.type
                    ))
                  : s.test(t)
                  ? (this.btnList2 = this.btnList.filter(
                      (t) => 'mz' == t.type || 'gg' == t.type
                    ))
                  : void 0
              },
              operateBtn(t) {
                '退出账号' === t.btnName &&
                  (localStorage.removeItem('username'),
                  localStorage.removeItem('password'),
                  localStorage.removeItem('station_handle')),
                  this.routePush(t.url, t.btnName)
              },
              routePush(t, e) {
                '上门核查' === e && (t = '/inspectClass'),
                  console.log(e),
                  '退出账号' == e
                    ? (sessionStorage.removeItem('token'),
                      this.$router.push({ path: '/' }))
                    : this.$router.push({ path: t })
              },
            },
          }),
        r = i,
        o = (s('aba8'), s('2877')),
        l = Object(o['a'])(r, a, n, !1, null, '59202b60', null)
      e['default'] = l.exports
    },
  },
])
