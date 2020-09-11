import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

function BlueAddButton(props) {
  return (
    <TouchableOpacity onPress={props.press}>
      <Svg width={134} height={58} viewBox="0 0 134 58" fill="none" {...props}>
        <Rect width={134} height={58} rx={29} fill="#14213D" />
        <Path
          d="M80.417 30.917h-11.5v11.5h-3.834v-11.5h-11.5v-3.834h11.5v-11.5h3.834v11.5h11.5v3.834z"
          fill="#FCA311"
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default BlueAddButton
