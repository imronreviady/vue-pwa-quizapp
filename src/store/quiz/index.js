import { UPDATE_INFORMATION, ADD_ANSWER, REMOVE_QUESTION, REMOVE_ANSWER } from './mutations'

const state = {
	newQuiz: {
		title: "Quiz 2018",
		description: "An awesome quiz!",
		questions: [{
			question: "First Question",
			points: 50,
			answers: [{
				answer: "First answer",
				isRight: false
			}]
		}]
	}
}

const getters = {
	newQuiz: ({newQuiz}) => newQuiz
}

const mutations = {
	[UPDATE_INFORMATION](state, info) {
		state.newQuiz.title = info.title
		state.newQuiz.description = info.description
	},
	[ADD_ANSWER](state, questionIndex) {
		const answers = state.newQuiz.questions[questionIndex].answers;
		if (answers.length < 5) {
			answers.push({
				answer: "Another one!",
				isRight: false
			})
		}
	},
	[REMOVE_QUESTION](state, questionIndex) {
		if (state.newQuiz.questions.length > 1) {
			state.newQuiz.questions.splice(questionIndex, 1)
		}
	},
	[REMOVE_ANSWER](state, payload) {
		const questionIndex = payload.questionIndex
		const answerIndex = payload.answerIndex

		const question = state.newQuiz.questions[questionIndex]

		if (question.answers.length > 1) {
			question.answers.splice(answerIndex, 1)
		}
	}
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}