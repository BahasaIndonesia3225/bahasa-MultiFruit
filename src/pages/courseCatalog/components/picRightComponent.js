import React, { useState, useEffect, useRef } from 'react'
import {useNavigate, connect } from 'umi';
import {Image, Card, Space, Grid, Dialog } from 'antd-mobile';
import { LockOutline, UnlockOutline } from 'antd-mobile-icons'
import { request } from '@/services';
import "./index.less"

const picRightComponent = ({item}) => {
  const {id, name, introduce, pic, children, colour, flag} = item;

  let navigate = useNavigate();
  const handleDump = async (data) => {
    const {id, name, flag} = data;
    if(flag === 0) {
      await Dialog.alert({
        content: '请先完成前面的关卡',
      })
      return
    }
    navigate("/courseDetail", {
      replace: false,
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
              children.map((item, index) => {
                const { id, name, flag } = item;
                return (
                  <div
                    key={id}
                    className="sectionIndex"
                    style={{ backgroundImage: flag === 0 ? `url(./image/defaultBtnBg.png)` : `url(./image/${colour}BtnBg.png)` }}
                    onClick={() => handleDump(item)}>
                    <span>{index + 1}</span>
                  </div>
                )
              })
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
