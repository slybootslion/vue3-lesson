import axios from 'axios'
import { Commit, createStore } from 'vuex'

interface ImageProps {
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

export interface UserProps {
  _id?: number;
  isLogin: boolean;
  nickName?: string;
  column?: string;
  email?: string;
}

export interface GlobalDataProps {
  user: UserProps;
  columns: ColumnProps[];
  posts: PostProps[];
  loading: boolean;
  token: string;
}

async function getAndCommit (url: string, mutationName: string, commit: Commit) {
  const { data } = await axios.get(url)
  commit(mutationName, data.data)
}

async function postAndCommit (url: string, mutationName: string, commit: Commit, payload: unknown) {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data.data)
  return data.data
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false },
    loading: false,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    login (state, data) {
      const token = data.token
      state.token = token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem('token', token)
      // state.user = { ...state.user, isLogin: true, name: 'slybootslion' }
    },
    fetchCurrentUser (state, data) {
      state.user = { isLogin: true, ...data }
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
    },
    fetchCurrentUser ({ commit }) {
      getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(res => {
        return dispatch('fetchCurrentUser')
      })
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
