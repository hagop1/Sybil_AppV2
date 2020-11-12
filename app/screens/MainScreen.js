import React from 'react';
import {Text, ImageBackground, StyleSheet, View, Image, Dimensions} from "react-native";
// import Video from 'react-native-video';
import { Video } from 'expo-av';


function MainScreen(props) {
    return (
        <View style={styles.video}>
            <Text style={{textAlign: 'center'}}>Live Feed</Text>
            <Video
                source={{ uri: 'http://34.211.232.227:8080/hls/stream.m3u8' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="center"
                shouldPlay
                isLooping
                didJustFinish= {true}
                //useNativeControls = {true}
                style={{ width: 410, height: 700, }}
            />
            <View style={styles.buttonLayout}>

            </View>
        </View>


        // <View style={styles.container}>
        //     <Image
        //             style={styles.logo}
        //             source={require("C:/Users/Hagop/secondApp/assets/sybil_logo.png")}
        //     />
        //     {/* <Video source={{ uri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8' }} /> */}
        // </View>
        // <View>
        //     <Video source={{uri: "C:/Users/Hagop/secondApp/assets/small.mp4"}}   // Can be a URL or a local file.
        //         ref={(ref) => {
        //             this.player = ref
        //         }}                                      // Store reference
        //         onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //         onError={this.videoError}               // Callback when video cannot be loaded
        //         style={styles.backgroundVideo} 
        //     />
        // </View>
        
    )
}

const styles = StyleSheet.create({
    video:{
        justifyContent:'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonLayout:{
        flex: 2,
    },
    backgroundVideo: {
        justifyContent: 'center',
        width: 300, 
        height: 300,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
      },
    background: {
        flex: 1,
        justifyContent: "flex-end",
    },
    container: {
        justifyContent: 'center', //
        alignItems: 'center', //moves logo left -> right
    },
    logo: {
        width: 150,
        height: 150,
    },
})

export default MainScreen;