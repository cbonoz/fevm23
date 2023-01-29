import { Progress } from 'antd'
import React from 'react'

export default function RankBar({ miner, onClick, selected }) {
    return (
        <div className={`${selected ? 'selected' : ''} rank-bar`} onClick={onClick && onClick()}>
            <span>{miner.address}</span><br />
            <span><Progress percent={miner.rank} showInfo={true} strokeColor={{ from: '#108ee9', to: '#87d068' }} /></span>
        </div>
    )
}
