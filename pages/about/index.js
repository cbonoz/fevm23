import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { APP_DESC, APP_NAME, DISCLAIMER } from '../../util/constants'
import logo from '../../img/logo_trans.png'

function About(props) {
  return (
    <div className='container'>
        <Image
          className='about-logo'
            src={logo}
            alt={APP_NAME}></Image>
        <br/>
        <h1>About</h1>
        <br/>
        {/* TODO: add full description here for the app including motivation */}
    </div>
  )
}

About.propTypes = {}

export default About
