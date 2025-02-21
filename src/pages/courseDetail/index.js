import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, connect } from 'umi';
import { Space, Collapse, Switch, Button, Image, Empty, NoticeBar, Modal, ProgressBar, Card } from 'antd-mobile'
import { SoundOutline, StarOutline, StarFill, AntOutline } from 'antd-mobile-icons';
import { request } from '@/services';
import "./index.less"
import QuestionType1 from './components/questionType1';
import QuestionType2 from './components/questionType2';
import QuestionType3 from './components/questionType3';
import QuestionType4 from './components/questionType4';

const courseDetail = () => {
  const navigate = useNavigate();
  const stateParams = useLocation();
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
    return (
      <RenderComponent
        onEvent={handleChildEvent}
        key={id}
        data={item}
      />
    )
  }

  const [isComplete, setComplete] = React.useState(false);  //是否提交
  const [isFinish, setIsFinish] = React.useState(false);    //是否答完
  const [isCorrect, setIsCorrect] = React.useState(false);  //是否正确
  const handleChildEvent = (data) => {
    const { isCorrect, isFinish } = data;
    setIsFinish(isFinish);
    setIsCorrect(isCorrect);
  }

  //俺不会
  const handleUnknown = () => {
    setIndex(index => index + 1);
  }

  //我做完了
  const handleSubmit = () => {
    if(isFinish) setComplete(true)
  }

  //继续
  const handleContinue = () => {
    setIndex(index => index + 1);
  }

  //知道了
  const handleKnown = () => {

  }

  return (
    <div className='courseDetail'>

      <div className='courseDetailContain'>
        <ProgressBar
          style={{'--track-width': '24px'}}
          percent={80}
          text
        />
        {subjectList.length ? subjectRenderTpl() : ''}
      </div>

      {
        !isComplete ? (
          <div className='operateBtnArea'>
            <div className='topBtn'>
            <span
              onClick={() => handleUnknown()}>
              俺不会
            </span>
            </div>
            <div
              style={{ background: !isFinish ? '#CFD6E3' : '#329DFB' }}
              className='bottomBtn'
              onClick={() => handleSubmit()}>
              <Image
                src='./image/iconBtn.png'
                width={40}
                height={40}
                style={{marginRight: 4}}
              />
              <span>我做完啦</span>
            </div>
          </div>
        ) : ''
      }

      {
        isComplete ? (
          isCorrect ? (
            <div className='rightBtnArea'>
              <div className='topBtn'>
                <Image
                  src='./image/correctIcon.png'
                  width={40}
                  height={40}
                  style={{marginRight: 4}}
                />
                <span>正确</span>
              </div>
              <div
                onClick={() => handleContinue()}
                className='bottomBtn'>
                <Image
                  src='./image/goIcon.png'
                  width={40}
                  height={40}
                  style={{marginRight: 4}}
                />
                <span>继续</span>
              </div>
            </div>
          ) : (
            <div className='wrongBtnArea'>
              <div className='topBtn'>
                <Image
                  src='./image/wrongIcon.png'
                  width={40}
                  height={40}
                  style={{marginRight: 4}}
                />
                <span>不正确</span>
              </div>
              <div
                onClick={() => handleKnown()}
                className='bottomBtn'>
                <Image
                  src='./image/knowIcon.png'
                  width={40}
                  height={40}
                  style={{marginRight: 4}}
                />
                <span>知道了</span>
              </div>
            </div>
          )
        ) : ''
      }

    </div>
  )
}

export default courseDetail
