import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, connect } from 'umi';
import { Space, Collapse, Switch, Button, Skeleton, Empty, NoticeBar, Modal, ProgressBar, Card } from 'antd-mobile'
import { SoundOutline, StarOutline, StarFill, AntOutline } from 'antd-mobile-icons';
import { request } from '@/services';
import QuestionType1 from './components/questionType1';
import QuestionType2 from './components/questionType2';
import QuestionType3 from './components/questionType3';
import QuestionType4 from './components/questionType4';
import "./index.less"

const courseDetail = () => {
  const stateParams = useLocation();
  const navigate = useNavigate();
  const { categoryId, categoryName } = stateParams.state;

  const [index, setIndex] = useState(0);

  //获取题目列表
  useEffect(() => { getSubjectListMethod() }, [])
  const [subjectList, setSubjectList] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const getSubjectListMethod = async () => {
    try {
      setLoading(true);
      const params = {category: categoryId}
      const { data = [] } = await request.get('/prod-api/stageApi/getStageList', { params });
      const dataList = data.map((item) => ({...item, isCorrect: false }))
      setSubjectList(dataList);
      setLoading(false);

      console.log(dataList)
    } catch (error) {
      setLoading(false)
    }
  }

  const subjectRenderTpl = () => {
    const item = subjectList[index];
    const { id, title, analysis, type, url, questionOptions } = item;
    let RenderComponent = null;
    if(type === '1') RenderComponent = QuestionType1;
    if(type === '2') RenderComponent = QuestionType2;
    if(type === '3') RenderComponent = QuestionType3;
    if(type === '4') RenderComponent = QuestionType4;
    return <RenderComponent key={id} data={item} />
  }

  return (
    <div className='courseDetail'>
      <ProgressBar
        percent={80}
        text
        style={{
          '--track-width': '24px',
        }}
      />
      { subjectList.length && subjectRenderTpl() }
    </div>
  )
}

export default courseDetail
