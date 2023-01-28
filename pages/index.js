import FilecoinGlobe from '@/components/FilecoinGlobe'
import { APP_DESC, APP_NAME } from '@/util/constants'
import { Modal } from 'antd'
import React, { useState } from 'react'

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState(null)

  return (
    <div className='content-height'>
        <FilecoinGlobe onSelect={setSelectedProvider} />
        <Modal
          show={selectedProvider}
          title={APP_NAME}>
          <p>{APP_DESC}</p>
          </Modal>
    </div>
  )
}
