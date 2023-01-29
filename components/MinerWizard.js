import { getExplorerUrl } from '@/util'
import { APP_NAME, MINER_STEPS } from '@/util/constants'
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
                <a target="_blank" className='normal-link' href="/about">How ranking works (i)</a>
                <div className='select-miner-heading'>
                    <span className='bold'>Miner address</span>
                    <span></span>
                    <span className='bold'>Reputation rank</span>
                </div>
                {selectedMiners?.slice(0, 10).map((m, i) => {
                    return (
                        <RankBar selected={miner?.address === m.address} key={i} miner={m} onSelect={() => {
                            console.log('selected', m)
                            setMiner(m)
                            setStep(step + 1)
                        }} />
                    )
                })}
            </div>}
            {step === 1 && <div>
                <Card title={`Miner details: ${miner?.address}`}>
                    {/* <h3>Provider: {miner.address}</h3> */}
                    <p><a target="_blank" className='normal-link' href={detailUrl}>View recent deals</a></p>
                    <h4>{APP_NAME} rank: {miner.rank}</h4>
                    <hr />
                    <br />
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
            {step !== 0 && <div>
                <Button type="secondary" onClick={() => setStep(step - 1)}>Back</Button>&nbsp;
                {step !== lastStep && <span>
                    <Button type="primary" disabled={!miner && step === 0} onClick={() => setStep(step + 1)}>Next</Button>
                    {!miner && step === 0 && <span>&nbsp;Select a miner to continue</span>}
                </span>
                }
            </div>}

        </div>
    )
}
