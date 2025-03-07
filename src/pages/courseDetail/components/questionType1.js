import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation, useNavigate, connect } from 'umi';
import { Space, Divider, Image, Button, Skeleton, Empty, NoticeBar, Modal, ProgressBar, Card } from 'antd-mobile'
import { SoundOutline, StarOutline, StarFill, AntOutline } from 'antd-mobile-icons';
import { fisherYatesShuffle } from "@/utils/format";
import { playAudio } from "@/utils/audio";
import GradientText from '@/components/GradientText'
import "./index.less"

const QuestionType1 = forwardRef((props, ref) => {
  const { id, title, analysis, type, url, questionOptions } = props.data;
  const [indexArray, setIndexArray] = useState([]);
  const [topWordArray, setTopWordArray] = useState([]);
  const [bottomWordArray, setBottomWordArray] = useState([]);

  //设置词组
  useEffect(() => {
    let wordArray = title.split(' ');
    wordArray = fisherYatesShuffle(wordArray);
    wordArray = wordArray.map((item, index) => ({word: item, index}));
    setIndexArray(wordArray.map(({index}) => ({index})));
    setTopWordArray(wordArray.map(({index}) => ({word: '', index})))
    setBottomWordArray(wordArray);
  }, []);

  const handleSelectWord = (item, type) => {
    //单词选中逻辑
    const { word, index } = item;
    let bottomWordArray_ = JSON.parse(JSON.stringify(bottomWordArray));
    let topWordArray_ = JSON.parse(JSON.stringify(topWordArray));
    if(type === "bottom") {
      bottomWordArray_[index].word = '';
      //赋值
      const emptyWordIndex = topWordArray_.findIndex(({word}) => !word);
      topWordArray_[emptyWordIndex].word = word;
    }else {
      topWordArray_[index].word = '';
      //赋值
      const emptyWordIndex = bottomWordArray_.findIndex(({word}) => !word);
      bottomWordArray_[emptyWordIndex].word = word;
    }
    //告诉父组件是否正确
    const words = topWordArray_.map(item => item.word);
    const isCorrect = words.join(' ') === title;
    //告诉父组件是否完成
    const len = topWordArray_.filter(item => !item.word);
    const isFinish = len.length === 0;
    props.onEvent({ isCorrect, isFinish });
    setTopWordArray(topWordArray_);
    setBottomWordArray(bottomWordArray_);
  }

  return (
    <div className="QuestionType1">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={20}
        showBorder={false}
        className="title"
      >
        输入你听到的内容
      </GradientText>
      <Space direction="vertical" block>
        <Space wrap>
          {
            indexArray.map(({index}) => (
              <div className="cardContain" key={index}>
                {
                  (topWordArray.length && topWordArray[index].word) ? (
                    <div
                      className="cardContainInner"
                      onClick={() => handleSelectWord(topWordArray[index], 'top')}>
                      <span>{topWordArray[index].word}</span>
                    </div>
                  ) : ''
                }
              </div>
            ))
          }
        </Space>
        <Divider />
        <Divider />
        <Divider />
        <Space wrap>
          {
            indexArray.map(({index}) => (
              <div className="cardContain" key={index}>
                {
                  (bottomWordArray.length && bottomWordArray[index].word) ? (
                    <div
                      className="cardContainInner"
                      onClick={() => handleSelectWord(bottomWordArray[index], 'bottom')}>
                      <span>{bottomWordArray[index].word}</span>
                    </div>
                  ) : ''
                }
              </div>
            ))
          }
        </Space>
      </Space>
      <Space
        style={{ '--gap': '16px', marginTop: '48px' }}
        justify='center'
        align="end"
        block>
        <div
          onClick={() => { playAudio(url, 1) }}
          className="normalPlayBtn">
          <Image
            src='./image/sound03@2x.png'
            width={50}
            height={50}
            fit='fill'
          />
        </div>
        <div
          onClick={() => {  playAudio(url, 0.5)  }}
          className="slowPlayBtn">
          <Image
            src='./image/snail03@2x.png'
            width={30}
            height={30}
            fit='fill'
          />
        </div>
      </Space>
    </div>
  )
})

export default QuestionType1;
