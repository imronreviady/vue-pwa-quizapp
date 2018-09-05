import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user/index'
import quiz from '@/store/quiz/index'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		awesome: true
	},
	modules: {
		user,
		quiz
	}
})

export default store