import * as React from 'react'
import Svg, { G, Rect, Path, Defs } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

function BlueAddButton(props) {
  return (
    <Svg width={294} height={50} viewBox="0 0 294 161" fill="none" {...props}>
      <Path
        d="M160.417 110.917h-11.5v11.5h-3.834v-11.5h-11.5v-3.834h11.5v-11.5h3.834v11.5h11.5v3.834z"
        fill="#FCA311"
      />
    </Svg>
  )
}

export default BlueAddButton
