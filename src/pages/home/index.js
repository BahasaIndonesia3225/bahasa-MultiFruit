import React, { useState, useRef } from 'react'
import { useNavigate, connect } from 'umi';
import { Modal, Form, Input, Button, AutoCenter, Checkbox, Space, Radio, Image } from 'antd-mobile';
import {setCookie, getCookie, clearCookie} from '@/utils/rememberPassword';
import { request } from '@/services';
import Aurora from '@/components/Aurora';
import ShinyText from '@/components/ShinyText';
import Threads from '@/components/Threads';
import VariableProximity from '@/components/VariableProximity';
import './index.less';

const Home = () => {
  const containerRef = useRef(null);

  let navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login", { replace: false });
  }

  return (
    <div className="home">
      <Aurora
        colorStops={["#00D8FF", "#4ebd39", "#00D8FF"]}
        speed={0.5}
      />
      <ShinyText
        text="印尼语东仔"
        disabled={false}
        speed={2}
        className='pageTitle'
      />
      <p className='pageDescription'>
        登录遇到问题？请在工作时间（早上10点-晚上6点）联系对接老师或抖音搜索东东印尼语。
      </p>
      <div className="pageLoginBtn">
        <a onClick={() => handleLogin()}>去登录</a>
      </div>
      <div className="threads--container">
        <Threads
          amplitude={5}
          distance={0.5}
          enableMouseInteraction={true}
        />
      </div>
    </div>
  )
}

export default Home
