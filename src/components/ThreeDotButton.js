import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

function ThreeDotMenu(props) {
  return (
    <TouchableOpacity>
      <Svg width={27} height={24} viewBox="0 0 27 24" fill="none" {...props}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.165 8c1.196 0 2.175-.9 2.175-2s-.979-2-2.175-2c-1.196 0-2.175.9-2.175 2s.979 2 2.175 2zm0 2c-1.196 0-2.175.9-2.175 2s.979 2 2.175 2c1.196 0 2.175-.9 2.175-2s-.979-2-2.175-2zm-2.175 8c0-1.1.979-2 2.175-2 1.196 0 2.175.9 2.175 2s-.979 2-2.175 2c-1.196 0-2.175-.9-2.175-2z"
          fill="#000"
          fillOpacity={0.54}
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default ThreeDotMenu
