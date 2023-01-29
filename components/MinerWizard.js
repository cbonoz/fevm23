import { getExplorerUrl } from '@/util'
import { MINER_STEPS } from '@/util/constants'
import { Button, Steps, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import RankBar from './RankBar'
import StorageSteps from './StorageSteps'

export default function MinerWizard({ selectedMiners }) {
    const [miner, setMiner] = useState(null)
    const [step, setStep] = useState(0)

    const lastStep = MINER_STEPS.length - 1
    const detailUrl = getExplorerUrl(miner?.address)

    if (!selectedMiners) { return null }

    return (
        <div>
            <Steps
                current={step}
                items={MINER_STEPS}
            />
            {step === 0 && <div>
                <h1>Top storage providers</h1>
                <a target="_blank" className='normal-link' href="/about">How ranking works (i)</a>
                <br />
                {selectedMiners?.slice(0, 10).map((m, i) => {
                    return (
                        <RankBar selected={miner?.address === m.address} key={i} miner={m} onClick={() => setMiner(m)} />
                    )
                })}
            </div>}
            {step === 1 && <div>
                <Card title="Miner details">
                    <p><a target="_blank" className='normal-link' href={detailUrl}>View recent deals</a></p>
                    <h3>{miner.address}</h3>
                    <h4>Score: {miner.rank}</h4>
                    <p>Region: {miner.region}</p>
                    <p>Storage Deals: {miner.storageDeals.total}</p>
                    <p>Verified Deals: {miner.storageDeals.verified}</p>
                    <p>Success Rate: {miner.storageDeals.successRate}</p>
                    <p>Price: {miner.price}</p>
                    <p>Verified Price: {miner.verifiedPrice}</p>
                    <p>Raw Power: {miner.rawPower}</p>
                    <p>Quality Adj Power: {miner.qualityAdjPower}</p>
                    <p>Min Piece Size: {miner.minPieceSize}</p>
                    <p>Max Piece Size: {miner.maxPieceSize}</p>
                    <p>Free Space: {miner.freeSpace}</p>
                </Card>
            </div>}
            {step === 2 && <div>
                <StorageSteps miner={miner} />
            </div>}
            <br />
            {step !== 0 && <Button type="secondary" onClick={() => setStep(step - 1)}>Back</Button>}&nbsp;
            {step !== lastStep && <Button type="primary" disabled={!miner} onClick={() => setStep(step + 1)}>Next</Button>}

        </div>
    )
}
