import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation, useNavigate, connect } from 'umi';
import { Space, CheckList, Image, Grid, Skeleton, Empty, NoticeBar, Modal, ProgressBar, Card } from 'antd-mobile'
import { SoundOutline, StarOutline, StarFill, AntOutline } from 'antd-mobile-icons';
import { fisherYatesShuffle } from "@/utils/format";
import { playAudio } from "@/utils/audio";
import GradientText from '@/components/GradientText'
import "./index.less"

const QuestionType3 = forwardRef((props, ref) => {
  const { title, analysis, type, url, questionOptions } = props.data;

  const [itemId, setItemId] = useState(undefined);
  const handleChangeCheck = (id) => {
    const item = questionOptions.find(option => option.id === id);
    const { correct } = item;
    const isCorrect = correct === "1";
    const isFinish = !!id;
    props.onEvent({ isCorrect, isFinish });
    setItemId(id);
  }

  return (
    <div className="QuestionType3">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={20}
        showBorder={false}
        className="title"
      >
        请你选择正确图片
      </GradientText>
      <Space block>
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
          <span>{title}</span>
        </div>
      </Space>
      <ul className="CheckGroup">
        {
          questionOptions.map(({ id, content, correct, url }, index) => (
            <div
              onClick={() => handleChangeCheck(id)}
              className={`CheckListArea ${itemId === id ? 'CheckListAreaActive' : ''}`}
              key={id}>
              <div className="CheckListInnerArea">
                <Image
                  src={url}
                  width={100}
                  height={100}
                  fit='fill'
                />
                <p>{content}</p>
              </div>
            </div>
          ))
        }
      </ul>
    </div>
  )
})

export default QuestionType3;
