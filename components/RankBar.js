import { Progress } from 'antd'
import React from 'react'

export default function RankBar({ miner, onSelect, selected }) {
    return (
        <div className={`${selected ? 'selected' : ''} rank-bar`} onClick={onSelect}>
            <span>Miner: {miner.address} ({miner.region})</span><br />
            <span><Progress percent={miner.appRank} showInfo={true} strokeColor={{ from: '#108ee9', to: '#87d068' }} /></span>
        </div>
    )
}
