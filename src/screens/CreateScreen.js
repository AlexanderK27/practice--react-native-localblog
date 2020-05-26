import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { addPost } from '../store/actions/post'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { PhotoPicker } from '../components/PhotoPicker'


export const CreateScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const imgRef = useRef()

    const pickPhotoHandler = uri => {
        imgRef.current = uri
    }

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            img: imgRef.current,
            booked: false
        }

        dispatch(addPost(post))
        setText('')
        navigation.navigate('Main')
    }
    
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title} >New content</Text>
                    <TextInput 
                        style={styles.textarea}
                        placeholder="Here you can enter text"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={pickPhotoHandler} />
                    <Button 
                        title="Create"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text.trim()}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Create a new post',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
            <Item 
                title="Toggle Drawer"
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})