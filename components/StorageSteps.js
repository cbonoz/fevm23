import React from 'react'

export default function StorageSteps({ miner }) {
    return (
        <div className="storage-steps">
            <h1>Storage Steps</h1>
            <p>Follow the instructions below to create a deal with the selected storage provider.<br/>
            <a className='normal-link' href="https://docs.filecoin.io/get-started/store-and-retrieve/store-data/#create-a-deal" target="_blank">View full instructions</a>
            </p>
            <br />
            <pre>
                lotus client deal # use miner address {miner.address}
            </pre>

        </div>
    )
}
