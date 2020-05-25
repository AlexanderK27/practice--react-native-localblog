import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Alert, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { DATA } from '../data'
import { THEME } from '../theme'

export const PostScreen = ({navigation, route}) => {
    const postId = navigation.getParam('postId')

    const post = DATA.find(p => p.id === postId)

    const deleteHandler = () => {
        Alert.alert(
            'Post deleting',
            'Are you sure you want to delete this post?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => {} }
            ],
            {cancelable: true}
        )
    }

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button 
                title="Delete" 
                color={THEME.DANGER_COLOR}    
                onPress={deleteHandler} 
            />
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const date = navigation.getParam('date')
    const booked = navigation.getParam('booked')
    const iconName =  booked ? 'ios-star' : 'ios-star-outline'
    
    return {
        headerTitle: 'Posted ' + new Date(date).toLocaleDateString(),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
                <Item 
                    title="Hangle bookmarked"
                    iconName={iconName}
                    onPress={() => console.log('Booked pressed')}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
})