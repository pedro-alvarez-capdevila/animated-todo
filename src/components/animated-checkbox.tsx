import React, { useEffect } from "react";
import Animated, { Easing, withTiming } from "react-native-reanimated";
import { interpolateColor } from "react-native-reanimated";
import { useAnimatedProps } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";
import Svg, { Path, Rect } from "react-native-svg";
import AnimatedStroke from "./animated-stroke";

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const outLineBoxPath = "M17.5 0.25H47C53.0281 0.25 57.1965 1.94754 59.8654 5.10504C62.5416 8.27115 63.75 12.9511 63.75 19V45.5C63.75 51.5493 62.5415 56.1014 59.8686 59.1413C57.2018 62.1743 53.0336 63.75 47 63.75H17.5C11.4663 63.75 7.17022 62.1741 4.37768 59.1371C1.58129 56.096 0.25 51.5441 0.25 45.5V19C0.25 12.9561 1.58124 8.27653 4.38096 5.10922C7.17546 1.94783 11.4717 0.25 17.5 0.25Z"
const checkMarkPath = "M42.7818 20.9366C34.9583 30.8201 27.8397 42.6839 23.677 50.5932L23.4779 50.9715L23.3151 50.5762C21.9335 47.221 19.4217 44.6229 16.8322 42.7367C14.2426 40.8503 11.5881 39.6852 9.94253 39.1916L10.0575 38.8084C11.7452 39.3148 14.4407 40.4997 17.0678 42.4133C19.5955 44.2546 22.0716 46.7792 23.5189 50.0359C27.7146 42.1151 34.7465 30.4431 42.4682 20.6884C46.3895 15.7346 50.4937 11.2688 54.4995 8.03961C58.4995 4.81508 62.4301 2.8 66 2.8V3.2C62.5699 3.2 58.7297 5.14325 54.7505 8.35102C50.7771 11.5541 46.6939 15.9945 42.7818 20.9366Z"

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
  checked?: boolean
}

const AnimatedCheckbox = ( props: Props ) => {
  const { checked } = props
  const checkMarkColor = '#000000'
  const highlightColor = 'red'
  const boxOutLineColor = '#000000'

  const progress = useSharedValue( 0 );

  useEffect(() => {
    progress.value = withTiming( checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        Easing.bezier( 0.16, 1, 0.3, 1)(progress.value),
        [ 0, 1 ],
        [ boxOutLineColor, highlightColor ], 
        'RGB'
      ),
      fill: interpolateColor(
        Easing.bezier( 0.16, 1, 0.3, 1)(progress.value),
        [ 0, 1 ],
        [ '#00000000', 'green' ], 
        'RGB'
      ),
    }), [highlightColor, boxOutLineColor]
  )

  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    >
      <AnimatedPath
        d={outLineBoxPath}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <AnimatedStroke 
        d={checkMarkPath}
        stroke={checkMarkColor}
        strokeWidth={4}
        progress={progress}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeOpacity={checked ? 1 : 0}
      />
    </Svg>
  )
}

export default AnimatedCheckbox