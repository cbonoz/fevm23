
import React, { useRef, useState, useEffect } from 'react'
import { getMiners, getStorageProviders } from '@/util/api';
import { LOCATION_MAP, REGION_MAP } from '@/util/mappings';
import dynamic from "next/dynamic";
import { useWindowSize } from '@/hooks/WindowSize';
import { Modal, Button, Option, Select, Input } from 'antd';
import { computeRankScore } from '@/util/ranking';
import MinerWizard from './MinerWizard';
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SKY = "https://unpkg.com/three-globe@2.24.13/example/img/night-sky.png"

const styling = {
    backgroundImage: `url('${SKY}')`,
    width: "100%",
    height: "100%",
    position: 'relative'
}

// A miner takes this structure: {"id":0,"address":"f02822","status":false,"reachability":"unreachable","tag":{"name":null,"verified":null},"uptimeAverage":0,"price":null,"verifiedPrice":null,"minPieceSize":null,"maxPieceSize":null,"rawPower":"274877906944","qualityAdjPower":"274877906944","isoCode":"CN","region":"Asia","creditScore":null,"score":"11","scores":{"total":"11","uptime":0,"storageDeals":"11","committedSectorsProofs":0},"freeSpace":null,"storageDeals":{"total":7,"noPenalties":6,"successRate":"0.85714285714285714286","averagePrice":"224695000000000","dataStored":"8589934592","slashed":1,"terminated":1,"faultTerminated":0,"recent30days":null},"goldenPath":{"storageDealSuccessRate":false,"retrievalDealSuccessRate":false,"fastRetrieval":null,"verifiedDealNoPrice":false,"faultsBelowThreshold":false},"energy":{"recs":null,"pageUrl":null},"rank":"4427","regionRank":"1538"}

function FilecoinGlobe({ }) {
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
                    .map((miner) => {
                        const appRank = computeRankScore(miner);
                        return {
                            ...miner,
                            appRank,
                        }
                    })
                    miners.sort((a, b) => b.appRank - a.appRank)
                setMiners(miners)

            });

    }, [])

    useEffect(() => {
        const maxPrice = parseFloat(filters.maxPrice)
        const targetSize = parseFloat(filters.size) * Math.pow(10,9)
        const filtered = miners?.filter(x => LOCATION_MAP[x.isoCode]).filter((miner) => {
            const price = parseFloat(miner.price)
            if (filters.region && filters.region !== miner.region) {
                return false;
            } else if (filters.size && (targetSize > parseFloat(miner.maxPieceSize) || targetSize < parseFloat(miner.minPieceSize))) {
                return false;
            } else if (filters.maxPrice && maxPrice < price) {
                return false;
            } else if (filters.size && !miner.maxPieceSize) {
                // Filter out miners that don't have a max piece size and the max size is set.
                return false;
            }
            // console.log('filters', targetSize, miner.maxPieceSize, miner.minPieceSize, maxPrice, price)
            return true;
        });

        // Sort by rank descending
        // filtered?.sort((a, b) => b.appRank - a.appRank)

        setFilteredMiners(filtered)
        if (!filtered) {
            setPoints([])
            return
        }

        const minerCount = filtered.length
        if (!minerCount) {
            setPoints([])
            return
        }

        let pts = Object.keys(REGION_MAP).map((region, i) => {
            const minersInRegion = filtered?.filter((miner) => miner.region === region).length || 0
            const text = `${region} - ${minersInRegion} miners`
            const percent = minersInRegion / minerCount
            return {
                id: i,
                color: REGION_MAP[region].color,
                count: minersInRegion,
                region,
                label: text,
                dotRadius: percent * 5 + 1,
                labelSize: percent * 2 + 1,
                lat: REGION_MAP[region].lat,
                lng: REGION_MAP[region].lng
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
                    {filteredMiners && 
                    <div>
                        <p><b>{filteredMiners.length}</b> results.</p>
                        <br/>
                        {filteredMiners.length > 0 && <Button type="primary" onClick={() => setSelectedMiners(filteredMiners)}>View top {Math.min(filteredMiners.length, 10)} miners</Button>}
                    </div>
                    }
            </div>

            {/* https://github.com/vasturiano/react-globe.gl#labels-layer */}
            <Globe
                labelsData={points}
                width={size.width}
                height={size.height - 60}
                // ref={globeEl}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl={SKY}
                labelLat={d => d.lat}
                labelLng={d => d.lng}
                labelText={d => d.label}
                labelSize={d => d.labelSize}
                labelDotRadius={d => d.dotRadius}
                labelColor={() => 'rgba(255, 165, 0, 0.75)'}
                onLabelClick={(obj) => {
                    const region = obj.region
                    const selected = miners?.filter((miner) => miner.region === region) || []
                    setSelectedMiners(selected)
                }}
                enablePointerInteraction={true}
            />

            <Modal
                width={1000}
                size='large'
                open={!!selectedMiners}
                title="Top Storage Providers"
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onOk={() => setSelectedMiners(null)}
                onCancel={() => setSelectedMiners(null)}
            >
                <MinerWizard selectedMiners={selectedMiners} />
            </Modal>

        </div>)
}

export default FilecoinGlobe
