import React, { FC } from 'react';
import { Drawer, DrawerProps, Spin, theme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';
import genDefaultStyle from "./jss"
import classNames from 'classnames';

const { useToken } = theme;

interface Props extends DrawerProps {
  loading?: boolean;
  onOk?: () => void;
  confirmLoading?: boolean;
}

const Index: FC<Props> = props => {
  const prefixCls = 'antd-enhanced-drawer';
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );

  const {
    rootClassName = '',
    loading = false,
    children,
    ...restProps
  } = props;

  return wrapSSR(
        <Drawer
          rootClassName={classNames(prefixCls, rootClassName, hashId)}
          {...restProps}
        >
          <Spin spinning={loading}>{children}</Spin>
        </Drawer>,
    )
};

export default Index;