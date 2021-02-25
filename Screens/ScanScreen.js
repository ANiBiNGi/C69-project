import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import { TextInput } from 'react-native-gesture-handler';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
        hascamerapermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
        }
    }
    getCameraPermissions = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hascamerapermissions:status === 'granted',
            buttonState:'clicked'
        })
    }
    handleBarcodeScanned = async({type,data}) =>{  
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })    
    }
    render(){
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        const hascamerapermissions = this.state.hascamerapermissions;

        if(buttonState==='clicked' && hascamerapermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned? undefined : this.handleBarcodeScanned}/>
            )

        }
        else if(buttonState==='normal'){
        return(           
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Image source = {require("../assets/camera.jpg")}
                style ={{width:200, height:200}}/>
                
                <Text style={{fontSize: 35}}> Bar Code Scanner </Text>

                <TouchableOpacity
                    onPress = {this.getCameraPermissions}
                    style = {styles.scanButton}
                    title = "Bar Code Scanner">
                    <Text style={styles.buttonText}> Scan QR Code </Text>
                    </TouchableOpacity>
            </View>
        )   
    }
}
}
const styles = StyleSheet.create({
    scanButton: {padding:10,margin:10,backgroundColor:'cyan'},
    buttonText: {color: "magenta"}
})