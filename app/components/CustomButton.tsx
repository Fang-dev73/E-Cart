import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../utils/colors';
import { RFValue } from 'react-native-responsive-fontsize';

const CustomButton = ({text, onPress, customStyles}: {text: string, onPress: () => void, customStyles?: any}) => {
  return (
    <TouchableHighlight onPress={onPress} style={[styles.button, customStyles]}>
        <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        width: "80%",
        height: hp(5),
        borderRadius: hp(1),
        borderColor: colors.primary,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    text: {
        fontFamily: "Inter_18pt-Bold",
        color: colors.primary,
        fontSize: RFValue(10),
    }
})