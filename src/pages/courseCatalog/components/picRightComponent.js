import React, { useState, useEffect, useRef } from 'react'
import {useNavigate, connect } from 'umi';
import {Image, List, SearchBar, Skeleton, Empty, FloatingBubble, Card, Space, Grid } from 'antd-mobile';
import { request } from '@/services';
import "./index.less"

const picRightComponent = ({item}) => {
  const {id, name, introduce, pic, children} = item;

  //登陆成功提示模态框
  let navigate = useNavigate();
  const handleDump = () => {
    navigate("/courseDetail", {
      replace: true,
      state: {
        categoryId: id,
        categoryName: name
      }
    });
  }

  return (
    <div className="picRightComponent">
      <Card title={name}>
        <Grid columns={2} gap={20}>
          <Grid.Item>
            {
              children.map((item, index) => (
                <div
                  className="sectionIndex"
                  onClick={() => handleDump()}>
                  <span>{index + 1}</span>
                </div>
              ))
            }
          </Grid.Item>
          <Grid.Item>
            <Space
              style={{ height: '100%' }}
              justify='center'
              align='center'
              block>
              <Image
                lazy
                width={100}
                height={100}
                src={pic}
              />
            </Space>
          </Grid.Item>
        </Grid>
      </Card>
    </div>
  )
}

export default picRightComponent
