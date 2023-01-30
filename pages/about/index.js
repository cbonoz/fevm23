import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { APP_DESC, APP_NAME, DISCLAIMER } from '../../util/constants'
import logo from '../../img/logo_trans.png'

function About(props) {
  return (
    <div className='about-page'>
      <Image
        className='about-logo'
        src={logo}
        alt={APP_NAME}></Image>
      <br />
      <br />
      <h1>About</h1>
      <br />
      <h3>What is {APP_NAME}?</h3>
      <p>Filecoin is a decentralized storage network that allows users to store, share, and access data in a secure and decentralized way. It uses a peer-to-peer network of storage providers, called miners, to store and retrieve data. These miners are incentivized through the use of Filecoin tokens, which are used to pay for storage and retrieval services on the network.</p>

      <p>If you are re looking to onboard to Filecoin and start storing or retrieving data, you can use a tool like globe.fil to make the process quick and easy. Globe.fil is a user-friendly platform that utilizes the api.filrep.io miner API to retrieve and index a list of active storage providers on the Filecoin network.</p>

      <p>To use globe.fil, simply set your search criteria, such as storage capacity and location, and then select a region from the globe or search globally. The platform will then recommend a list of storage providers based on a composite score that takes into account factors such as recent transactions, deal count, storage power, and success rate.</p>

      <p>From the recommended results, you can select the storage provider that best suits your needs and securely store your data on the Filecoin network. With globe.fil, you can easily access the decentralized storage power of Filecoin with just a few clicks.</p>
      <br />
      <h3>How ranking works</h3>
      <p>When you search for a storage provider, globe.fil will recommend a list of storage providers based on a composite score that takes into account factors such as recent transactions, deal count, storage power, and success rate. The ranking algorithm is as follows:
      </p>
      <br />
      <pre>
        overall = recent transactions rank * 0.3 +
        deal rank * 0.2 +
        power rank * 0.2 +
        success rate * 0.3
      </pre>
      <br/>
      <p>

        A green checkbox indicates that a storage provider has a high probability of a successful deal.
      </p>

      <br />
      <br />
      <p>
        <a rel="noreferrer" className='normal-link' href="https://github.com/cbonoz/fevm23" target="_blank">Github</a>
      </p>
      {/* TODO: add full description here for the app including motivation */}
    </div>
  )
}

About.propTypes = {}

export default About
