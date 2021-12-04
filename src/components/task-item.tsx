import { Box, themeTools, useColorModeValue, useTheme } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import AnimatedCheckbox from './animated-checkbox'

interface Props {
  isDone: boolean
  onToggleCheckbox?: () => void
}

const TaskItem = (props: Props) => {
  const { isDone, onToggleCheckbox } = props
  const theme = useTheme()
  const highlighColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.500')
  )
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  )
  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white')
  )
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  )
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  )

  return (
    <Box width={30} height={30} mr={2}>
      <Pressable onPress={onToggleCheckbox}>
        <AnimatedCheckbox
          highlightColor={highlighColor}
          checkmarkColor={checkmarkColor}
          boxOutLineColor={boxStroke}
          checked={isDone}
        />
      </Pressable>
    </Box>
  )
}

export default TaskItem
