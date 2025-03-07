import React, { useState, useEffect, useRef } from 'react'
import {useNavigate, connect } from 'umi';
import {FloatingBubble, Dialog, Space, Toast } from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons'
import PicLeftComponent from "@/pages/courseCatalog/components/picLeftComponent";
import PicRightComponent from "@/pages/courseCatalog/components/picRightComponent";
import { request } from '@/services';
import './index.less'

const courseCatalog = (props) => {
  const navigate = useNavigate();

  //保存关卡的参数
  const [submitParams, setSubmitParams] = useState({stage: undefined, node: undefined});

  //获取阶段列表
  useEffect(() => { getStageListMethod() }, [])
  const [stageList, setStageList] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const getStageListMethod = async () => {
    try {
      setLoading(true)
      const params = { pageNum: 1, pageSize: 100 }
      const { rows, total } = await request.get('/prod-api/stageApi/list', { params })
      setStageList(rows);
      //获取保存进度的参数
      const pItem = rows.find(item => item?.flag === 0);
      if(pItem) {
        //返回第一条未完成的阶段
        const index = pItem.children.findIndex(item => item?.flag === 0);
        const aItem = pItem.children[index];
        const submitParams = {stage: pItem.stage, node: aItem.stage};
        setSubmitParams(submitParams)
      }else {
        //阶段全部通过
        setSubmitParams({stage: undefined, node: undefined})
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      Toast.show({
        icon: 'fail',
        content: '获取阶段列表失败，请稍后再试',
      })
    }
  }

  //重置进度
  const handleReset = async () => {
    const result = await Dialog.confirm({
      title: '确认重置进度？',
      content: '重置进度后将从第一阶段开始玩！',
    })
    if (result) {
      const stage = stageList[0].stage;
      const node = stageList[0].children[0].stage;
      await request.post('/prod-api/stageApi/add', { data: { stage, node } })
      Toast.show({
        icon: 'success',
        content: '重置进度成功',
      })
      getStageListMethod();
    }
  }

  return (
    <div className='courseCatalog'>
      <Space
        style={{ '--gap': '16px' }}
        direction='vertical'
        block
      >
        {
          stageList.map((pItem, pIndex) => {
            const {id} = pItem;
            if(pIndex%2===0) {
              return <PicLeftComponent key={id} item={pItem} />
            }else {
              return <PicRightComponent key={id} item={pItem} />
            }
          })
        }
        <FloatingBubble
          style={{
            '--initial-position-bottom': '24px',
            '--initial-position-right': '24px',
            '--edge-distance': '24px',
          }}
          onClick={() => handleReset()}
        >
          <UndoOutline fontSize={32} />
        </FloatingBubble>
      </Space>
    </div>
  )
}

export default courseCatalog
