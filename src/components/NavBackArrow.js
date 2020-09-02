import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function NavBackArrow(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17.67 3.77L15.89 2 6 11.9l9.9 9.9 1.77-1.77-8.13-8.13 8.13-8.13z"
        fill="#fff"
      />
    </Svg>
  )
}

export default NavBackArrow
