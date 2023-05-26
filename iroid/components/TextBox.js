import React from "react";
import {
  TextInput,
} from "react-native";
export default function TextBox(props) {
  return (
    <TextInput
    style={{
      backgroundColor: '#F2F2F2',
      borderRadius: 28,
      width:"100%",
      marginVertical:10,
      fontFamily:'SegoeUI',
      fontSize:12,
      paddingHorizontal:20,
      height:50
    }}
    placeholderTextColor={'#B6B7B7'}
    placeholder={props.placeholder}
    onChangeText={val=>{props.onChangeText(val)}}
    returnKeyType={"done"}
/>
  );
}

