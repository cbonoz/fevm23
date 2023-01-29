import { APP_NAME, STORAGE_STEPS } from '@/util/constants'
import { Button, Steps } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import logo from '../img/logo_trans.png'

export default function Home() {
  const router = useRouter()

  return (
    <div className='content-height container'>
      {/* Generate a home landing page */}
      <div>
        {/* Hero image and value statements */}
        <div className='hero'>
          <div className='hero-content centered'>
            <Image
              className='hero-logo'
              src={logo}
              alt={APP_NAME}></Image>

              Generate three steps for the user to take:
             
          </div>
        </div>

      <Steps
        direction="horizontal"
        steps={STORAGE_STEPS}
        current={STORAGE_STEPS.length - 1}/>

        <Button size="large" type='primary' onClick={() => {
          router.push('/search')
        }}>Find a storage provider</Button>
            
      </div>
    </div>
  )
}
