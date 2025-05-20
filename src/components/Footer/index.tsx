import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'codeNav',
          title: '编程导航',
          href: 'https://www.codefather.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> 鱼皮 Github</>,
          href: 'https://github.com/liyupi',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
