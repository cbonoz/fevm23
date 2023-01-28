
import React, { useRef, useState, useEffect } from 'react'
import { getMiners, getStorageProviders } from '@/util/api';
import { LOCATION_MAP, REGION_MAP } from '@/util/mappings';
import dynamic from "next/dynamic";
import { useWindowSize } from '@/hooks/WindowSize';
import { Modal, Option, Select, Input } from 'antd';
import { computeRankScore } from '@/util/ranking';
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SKY = "https://unpkg.com/three-globe@2.24.13/example/img/night-sky.png"

const styling = {
    backgroundImage: `url('${SKY}')`,
    width: "100%",
    height: "100%",
    position: 'relative'
}

// A miner takes this structure: {"id":0,"address":"f02822","status":false,"reachability":"unreachable","tag":{"name":null,"verified":null},"uptimeAverage":0,"price":null,"verifiedPrice":null,"minPieceSize":null,"maxPieceSize":null,"rawPower":"274877906944","qualityAdjPower":"274877906944","isoCode":"CN","region":"Asia","creditScore":null,"score":"11","scores":{"total":"11","uptime":0,"storageDeals":"11","committedSectorsProofs":0},"freeSpace":null,"storageDeals":{"total":7,"noPenalties":6,"successRate":"0.85714285714285714286","averagePrice":"224695000000000","dataStored":"8589934592","slashed":1,"terminated":1,"faultTerminated":0,"recent30days":null},"goldenPath":{"storageDealSuccessRate":false,"retrievalDealSuccessRate":false,"fastRetrieval":null,"verifiedDealNoPrice":false,"faultsBelowThreshold":false},"energy":{"recs":null,"pageUrl":null},"rank":"4427","regionRank":"1538"}

function FilecoinGlobe({ onSelect }) {
    const [points, setPoints] = useState([]);
    const [miners, setMiners] = useState();
    const [filteredMiners, setFilteredMiners] = useState();
    const [filters, setFilters] = useState({
        region: '',
        size: '',
        maxPrice: ''
    })
    const [selectedMiners, setSelectedMiners] = useState();

    const size = useWindowSize();
    const globeEl = useRef();

    useEffect(() => {
        getMiners()
            .then((data) => {
                const miners = data.miners.filter((miner) => miner.reachability === 'reachable')
                setMiners(miners)

            });

    }, [])

    useEffect(() => {
        const filtered = miners?.filter((miner) => {
            if (filters.region && filters.region !== miner.region) {
                return false;
            } else if (filters.size && (filters.size > miner.maxPieceSize || filters.size < miner.minPieceSize)) {
                return false;
            } else if (miners.price && filters.maxPrice && filters.maxPrice < miner.price) {
                return false;
            }

            return true;
        })
        setFilteredMiners(filtered)

        const pts = filtered?.filter(x => LOCATION_MAP[x.isoCode]).map((miner) => {
            const rankScore = computeRankScore(miner)
            const location = LOCATION_MAP[miner.isoCode]
            return {
                id: miner.address,
                name: miner.address,
                color: 'red',
                lat: location.Latitude,
                lng: location.Longitude,
                value: rankScore,
            }
        })
        if (pts) {
            setPoints(pts)
        }

    }, [miners, filters])

    return (
        <div className='' style={styling}>
            {/* Add a box overlay */}
            <div className='box-overlay'>
                I am looking to store about&nbsp;<Input
                    value={filters.size}
                    type='number'
                    style={{ width: 120 }}
                    onChange={(e) => setFilters({ ...filters, size: e.target.value })} />
                &nbsp;GB of data.<br/><br/> I am willing to pay up to&nbsp;
                <Input
                type='number'
                    value={filters.maxPrice}
                    style={{ width: 120 }}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                &nbsp;FIL per GB/month.<br/><br/> I am looking for a storage provider in&nbsp;
                <Select
                allowClear
                    style={{ width: 120 }}
                    value={filters.region}
                    onChange={(value) => setFilters({ ...filters, region: value })}
                    options={
                        Object.keys(REGION_MAP).map((region, i) => {
                            return {
                                key: i,
                                value: region,
                                label: region
                            }
                        })} />

                    <br/>
                    <br/>
                    {points && <p>Showing <b>{points.length}</b> results.</p>}
            </div>
            <Globe
                labelsData={points}
                width={size.width}
                height={size.height - 60}
                // ref={globeEl}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl={SKY}
                hexBinPointWeight="pop"
                hexAltitude={d => d.sumWeight * 6e-8}
                hexBinResolution={4}
                hexTopColor={d => weightColor(d.sumWeight)}
                hexSideColor={d => weightColor(d.sumWeight)}
                hexBinMerge={true}
                enablePointerInteraction={false}
            />

            <Modal
                show={!!selectedMiners}
                title="Storage Providers"
                cancelButtonProps={{ style: { display: 'none' } }}
                onOk={() => setSelectedMiners(null)}
                onCancel={() => setSelectedMiners(null)}
            >
                {selectedMiners?.slice(0, 1).map((miner, i) => {
                    return (
                        <div key={i}>
                            <h3>{miner.address}</h3>
                            <h4>Rank: {miner.rankScore}</h4>
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
                        </div>
                    )
                })}
            </Modal>

        </div>)
}

export default FilecoinGlobe
