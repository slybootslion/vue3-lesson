import axios from 'axios'
import { Commit, createStore } from 'vuex'

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
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface GlobalDataProps {
  user: UserProps;
  columns: ColumnProps[];
  posts: PostProps[];
  loading: boolean;
}

async function getAndCommit (url: string, mutationName: string, commit: Commit) {
  const { data } = await axios.get(url)
  commit(mutationName, data.data)
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'slybootslion', columnId: 1 },
    loading: false
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'slybootslion' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, data) {
      state.columns = data.list
    },
    fetchColumn (state, data) {
      state.columns = [data]
    },
    fetchPosts (state, data) {
      state.posts = data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  },
  getters: {
    getColumnById (state) {
      return (id: string) => state.columns.find(c => c._id === id)
    },
    getPostsByCid (state) {
      return (id: string) => state.posts.filter(post => post.column === id)
    }
  }
})

export default store
