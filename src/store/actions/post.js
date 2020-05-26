import { LOAD_POSTS, TOGGLE_BOOKED, DELETE_POST, ADD_POST } from '../types'
import { DATA } from '../../data'

export const loadPosts = () => {
    return {
        type: LOAD_POSTS,
        payload: DATA
    }
}

export const toggleBooked = id => {
    return {
        type: TOGGLE_BOOKED,
        payload: id
    }
}

export const deletePost = id => {
    return {
        type: DELETE_POST,
        payload: id
    }
}

export const addPost = post => {
    post.id = new Date().toString()

    return {
        type: ADD_POST,
        payload: post
    }
}