import * as React from 'react'
import Svg, { Circle } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

function DotMenu(props) {
  return (
    <TouchableOpacity>
      <Svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
        <Circle cx={2.5} cy={2.5} r={2.5} fill="#FCA311" />
        <Circle cx={18.5} cy={2.5} r={2.5} fill="#FCA311" />
        <Circle cx={2.5} cy={17.5} r={2.5} fill="#FCA311" />
        <Circle cx={18.5} cy={17.5} r={2.5} fill="#FCA311" />
      </Svg>
    </TouchableOpacity>
  )
}

export default DotMenu
