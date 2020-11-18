import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

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

export { PostProps, ColumnProps }

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, name: 'slybootslion', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'slybootslion' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById (state) {
      return (id: number) => state.columns.find(c => c.id === id)
    },
    getPostsByCid (state) {
      return (id: number) => state.posts.filter(post => post.columnId === id)
    }
  }
})

export default store
