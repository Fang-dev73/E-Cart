import { Platform, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import colors from '../utils/colors'

const CustomInput = ({value, onChangeText, placeholder, secureTextEntry}: TextInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <TextInput placeholderTextColor={colors.grey} secureTextEntry={secureTextEntry} onFocus={() => {setIsFocused(true)}} onBlur={() => {setIsFocused(false)}} placeholder={placeholder} style={[styles.input, {borderWidth: isFocused ? 2 : 1}]} value={value} onChangeText={onChangeText} />
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: heightPercentageToDP(5),
        borderRadius: 5,
        borderColor: colors.primary,
        color: colors.primary,
    }
})