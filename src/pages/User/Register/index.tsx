import { Footer } from '@/components';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,

} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl,  Helmet } from '@umijs/max';
import {   message, Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';

import { createStyles } from 'antd-style';
import {SYSTEM_LOGO} from "@/constants";
import {register} from "@/services/ant-design-pro/api";
import {Link} from "@@/exports";

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>

    </>
  );
};

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};



const Register: React.FC = () => {

  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const intl = useIntl();

  // const fetchUserInfo = async () => {
  //   try {
  //     const msg = await quertCurrentUser();
  //     return msg.data;
  //   }
  //   catch (error) {
  //     history.push(loginPath)
  //   }
  //   return underfined;
  // };
  // if (!initialState?.cruuentUser && location.pathname !== loginPath){
  //   history.push(loginPath);
  // }
//表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const {password,checkPassword} = values;
    if (password !== checkPassword){
      message.error("两次密码不一致");
      return;
    }
    try {
      // 注册
      //const user = await Register({ userAccount,password,checkPassword});
      const id =await register(values);

      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        //await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const {query} = history.location;
        // const {redirect} = query as {
        //   redirect: string;
        // };
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }else throw  new Error(`register error id = ${id}`)
    } catch (error) {
      console.log(error)
      //const defaultLoginFailureMessage = '注册失败，请重试！';
     // message.error(defaultLoginFailureMessage);
    }
  };
  //const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '注册页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig:{
              submitText: '注册' //按钮文字
            }
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="用户中心"
          // subTitle={ <a href={PLANET_LINK} target="_blank" rel="noreferrer">最好的学习资源</a>}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            // <FormattedMessage
            //   key="loginWith"
            //   id="pages.login.loginWith"
            //   defaultMessage="其他注册方式"
            // />,
            <ActionIcons key="icons" />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码注册',
                }),
              },

            ]}
          />

          {/*{status === 'error' && loginType === 'account' && (*/}
          {/*  <LoginMessage*/}
          {/*    content={intl.formatMessage({*/}
          {/*      id: 'pages.login.accountLogin.errorMessage',*/}
          {/*      defaultMessage: '账户或密码错误(admin/ant.design)',*/}
          {/*    })}*/}
          {/*  />*/}
          {/*)}*/}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={"请输入账号"}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.userAccount.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={ "请输入密码"}
                rules={[
                  {
                    required:true,
                    message:"密码是必填项目"
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能小于8'
                  }
                  // {
                  //   required: true,
                  //   message: (
                  //     <FormattedMessage
                  //       id="pages.login.password.required"
                  //       defaultMessage="请输入密码！"
                  //     />
                  //   ),
                  // },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={ '请确认密码'}
                rules={[
                  {
                    required:true,
                    message:"确认密码是必填项目"
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能小于8'
                  }

                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={"请输入星球编号"}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userAccount.required"
                        defaultMessage="星球编号必须填!"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <Link to="/user/login">去登录</Link>
          {/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}*/}
          {type === 'mobile' && (
            <>

            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >

            <a
              style={{
                float: 'right',
              }}
            >

            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
