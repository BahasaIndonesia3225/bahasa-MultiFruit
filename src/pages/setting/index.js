import React, { useLayoutEffect, useState }  from 'react';
import { useNavigate, connect } from 'umi';
import { List, Switch } from 'antd-mobile';
import { UnorderedListOutline } from 'antd-mobile-icons'
import "./index.less"

export default () => {
  let navigate = useNavigate();

  return (
    <div className="setting">
      <List header='偏好设置'>
        <List.Item
          description='您学习的好帮手~'
          onClick={() => {}}
        >
          小曼同学
        </List.Item>
        <List.Item
          description='粤ICP备2024177696号'
          onClick={() => {
            window.open('https://beian.miit.gov.cn/', '_blank');
          }}>
          备案信息
        </List.Item>
      </List>
    </div>
  )
}
