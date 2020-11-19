import axios from 'axios'
import { createStore } from 'vuex'
import { testPosts } from './testData'

interface ImageProps{
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: string;
}

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId: number;
}

export interface GlobalDataProps {
  user: UserProps;
  columns: ColumnProps[];
  posts: PostProps[];
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: testPosts,
    user: { isLogin: true, name: 'slybootslion', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'slybootslion' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, data) {
      state.columns = data.data.list
    }
  },
  actions: {
    fetchColumns (ctx) {
      axios.get('/columns').then(res => {
        console.log(res.data)
        ctx.commit('fetchColumns', res.data)
      })
    }
  },
  getters: {
    getColumnById (state) {
      return (id: string) => state.columns.find(c => c._id === id)
    },
    getPostsByCid (state) {
      return (id: string) => state.posts.filter(post => post.columnId === id)
    }
  }
})

export default store
