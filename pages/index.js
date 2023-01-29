import { APP_DESC, APP_NAME, STORAGE_STEPS } from '@/util/constants'
import { Button, Steps } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import logo from '../img/logo_trans.png'

export default function Home() {
  const router = useRouter()

  return (
    <div className='content-height container'>
      {/* Hero image and value statements */}
      <div className='hero'>
        <div className='hero-content centered'>
          <Image
            className='hero-logo'
            src={logo}
            alt={APP_NAME}></Image>
            <br/>
            <br/>
          <h3>{APP_DESC}.</h3>
        </div>
        <Steps
        className='hero-steps'
          progressDot
          items={STORAGE_STEPS}
          current={STORAGE_STEPS.length - 1} />

          <br/>
          <br/>

        <Button size="large" type='primary' onClick={() => {
          router.push('/search')
        }}>Find a storage provider</Button>

      </div>
    </div>
  )
}
