;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-3e339ba1'],
  {
    '426d': function (e, t, s) {
      'use strict'
      s('a6c7')
    },
    a55b: function (e, t, s) {
      'use strict'
      s.r(t)
      var o = function () {
          var e = this,
            t = e._self._c
          return t(
            'div',
            { staticClass: 'login' },
            [
              e._m(0),
              t(
                'el-form',
                {
                  ref: 'loginForm',
                  staticClass: 'login-form',
                  attrs: {
                    'show-message': !1,
                    model: e.loginForm,
                    rules: e.loginRules,
                  },
                },
                [
                  t(
                    'el-form-item',
                    { attrs: { prop: 'username' } },
                    [
                      t('el-input', {
                        staticClass: 'loginInput',
                        attrs: {
                          type: 'text',
                          'auto-complete': 'off',
                          placeholder: '请输入账号',
                        },
                        model: {
                          value: e.loginForm.username,
                          callback: function (t) {
                            e.$set(e.loginForm, 'username', t)
                          },
                          expression: 'loginForm.username',
                        },
                      }),
                    ],
                    1
                  ),
                  t(
                    'el-form-item',
                    { attrs: { prop: 'password' } },
                    [
                      t('el-input', {
                        staticClass: 'loginPassword',
                        attrs: {
                          type: 'password',
                          'auto-complete': 'off',
                          placeholder: '请输入密码',
                        },
                        nativeOn: {
                          '!paste': function (t) {
                            return (
                              t.preventDefault(),
                              e.handlePaste.apply(null, arguments)
                            )
                          },
                        },
                        model: {
                          value: e.loginForm.password,
                          callback: function (t) {
                            e.$set(e.loginForm, 'password', t)
                          },
                          expression: 'loginForm.password',
                        },
                      }),
                    ],
                    1
                  ),
                  t(
                    'el-form-item',
                    { staticStyle: { width: '100%' } },
                    [
                      t(
                        'el-button',
                        {
                          staticClass: 'loginPassword',
                          attrs: {
                            loading: e.loading,
                            size: 'medium',
                            type: 'primary',
                          },
                          nativeOn: {
                            click: function (t) {
                              return (
                                t.preventDefault(),
                                e.handleLogin.apply(null, arguments)
                              )
                            },
                          },
                        },
                        [
                          e.loading
                            ? t('span', [e._v('登 录 中...')])
                            : t('span', [e._v('登 录')]),
                        ]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              e._m(1),
            ],
            1
          )
        },
        a = [
          function () {
            var e = this,
              t = e._self._c
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
                        'letter-spacing': '4px',
                      },
                    },
                    [e._v('泰州智慧民政社会救助')]
                  ),
                ]),
              ]),
            ])
          },
          function () {
            var e = this,
              t = e._self._c
            return t('footer', [
              t('span', { staticStyle: { color: '#fff' } }, [
                e._v('所属单位：泰州市民政局 联系电话：0523-86198830'),
              ]),
            ])
          },
        ],
        r = s('b775'),
        n = {
          name: 'Login',
          data() {
            return {
              loginForm: { username: '', password: '' },
              loginRules: {
                username: [
                  { required: !0, trigger: 'blur', message: '用户名不能为空' },
                ],
                password: [
                  { required: !0, trigger: 'blur', message: '密码不能为空' },
                ],
              },
              loading: !1,
            }
          },
          watch: {},
          methods: {
            handleLogin() {
              this.$refs.loginForm.validate((e) => {
                e
                  ? ((this.loading = !0),
                    Object(r['a'])({
                      method: 'post',
                      url: '/social/assistanceWeixin/login',
                      data: {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                        module: '上门核查',
                      },
                    })
                      .then((e) => {
                        ;(this.loading = !1),
                          'ok' == e[0].status
                            ? (sessionStorage.setItem('token', e[0].token),
                              localStorage.setItem(
                                'username',
                                this.loginForm.username
                              ),
                              localStorage.setItem(
                                'password',
                                this.loginForm.password
                              ),
                              localStorage.setItem(
                                'station_handle',
                                e[0].station_handle
                              ),
                              this.$router.push({ path: '/Home2' }))
                            : this.$alert('账号或密码错误')
                      })
                      .catch((e) => {
                        ;(this.loading = !1), console.log(e)
                      }))
                  : this.$toast.fail('请输入账号或密码')
              })
            },
          },
        },
        i = n,
        l = (s('426d'), s('2877')),
        c = Object(l['a'])(i, o, a, !1, null, '3e6b6fca', null)
      t['default'] = c.exports
    },
    a6c7: function (e, t, s) {},
    b775: function (e, t, s) {
      'use strict'
      var o = s('bc3a'),
        a = s.n(o),
        r = s('a18c')
      let n = Object({
        NODE_ENV: 'production',
        BASE_URL: '/testphone/',
      }).baseURL
      const i = a.a.create({ baseURL: n, timeout: 3e4 })
      i.interceptors.request.use(
        (e) => (
          sessionStorage.token && (e.headers.token = sessionStorage.token), e
        ),
        (e) => {
          console.log(e), Promise.reject(e)
        }
      ),
        i.interceptors.response.use(
          (e) =>
            'blob' == e.config.responseType
              ? 200 == e.status
                ? e
                : Promise.reject(error)
              : 200 === e.status
              ? e.data
              : 407 !== e.status
              ? Promise.reject('error1')
              : void 0,
          (e) => {
            if ((console.log('err' + e), e.response))
              switch (e.response.data.message) {
                case '401':
                  console.log('token过期了，需要重新登录'),
                    r['a'].replace({
                      path: '/login',
                      query: { redirect: r['a'].currentRoute.fullPath },
                    })
              }
            return Promise.reject(e.response.data)
          }
        ),
        (t['a'] = i)
    },
  },
])
