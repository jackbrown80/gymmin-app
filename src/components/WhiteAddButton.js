import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function WhiteAddButton(props) {
  return (
    <Svg width={46} height={46} viewBox="0 0 46 46" fill="none" {...props}>
      <Path
        d="M36.417 24.917h-11.5v11.5h-3.834v-11.5h-11.5v-3.834h11.5v-11.5h3.834v11.5h11.5v3.834z"
        fill="#fff"
      />
    </Svg>
  )
}

export default WhiteAddButton
