import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation, useNavigate, connect } from 'umi';
import { Space, Divider, Image, Input, Skeleton, Empty, NoticeBar, Modal, ProgressBar, Card } from 'antd-mobile'
import { SoundOutline, StarOutline, StarFill, AntOutline } from 'antd-mobile-icons';
import { fisherYatesShuffle } from "@/utils/format";
import { playAudio } from "@/utils/audio";
import GradientText from "@/components/GradientText";
import "./index.less"

const QuestionType4 = forwardRef((props, ref) => {
  const { id, title, analysis, type, url, questionOptions } = props.data;

  //单词截取设置
  const[value, setValue] = useState('');
  const [sentence, setSentence] = useState([]);
  const handleSetSentence = () => {
    const sentence = title.split(analysis);
    setSentence(sentence);
  }
  useEffect(() => { handleSetSentence() }, [])

  //监听输入内容
  const handleInputChange = (val) => {
    const isCorrect = val === analysis;
    const isFinish = !!val;
    props.onEvent({ isCorrect, isFinish });
    setValue(val);
  }

  return (
    <div className="QuestionType4">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={20}
        showBorder={false}
        className="title"
      >
        请你写出正确单词
      </GradientText>
      <Space>
        <Image
          src='./image/teacherIcon.png'
          width={100}
          height={100}
          fit='fill'
        />
        <div className="teacherBtnArea">
          <Image
            onClick={() => { playAudio(url, 1) }}
            src='./image/playNormalIcon.png'
            width={32}
            height={32}
            fit='fill'
          />
          <Divider direction='vertical' />
          <Image
            onClick={() => {  playAudio(url, 0.5)  }}
            src='./image/playSlowIcon.png'
            width={38}
            height={32}
            fit='fill'
          />
        </div>
      </Space>
      <div className="teacherInputArea">
        <Space wrap>
          <span>{sentence[0]}</span>
          <Input
            style={{
              borderBottom: '1px solid #329DFB',
              '--text-align': 'center',
              '--font-size': '18px',
              width: 80
            }}
            placeholder="请输入"
            value={value}
            onChange={val => { handleInputChange(val) }}
          />
          <span>{sentence[1]}</span>
        </Space>
      </div>
    </div>
  )
})

export default QuestionType4;
