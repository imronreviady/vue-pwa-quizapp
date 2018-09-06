import db from '@/db'
import firebase from '@/firebase'

import { 
	UPDATE_INFORMATION, 
	ADD_QUESTION, 
	REMOVE_QUESTION, 
	UPDATE_QUESTION, 
	ADD_ANSWER, 
	REMOVE_ANSWER, 
	UPDATE_ANSWER, 
	RESET_QUIZ 
} from './mutations'

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
	[RESET_QUIZ](state) {
		this.newQuiz = {
			title: "",
			description: "",
			questions: []
		}
	},
	[UPDATE_INFORMATION](state, info) {
		state.newQuiz.title = info.title
		state.newQuiz.description = info.description
	},
	[ADD_QUESTION](state) {
		state.newQuiz.questions.push({
			question: "Question",
			points: 0,
			answer: []
		})
	},
	[REMOVE_QUESTION](state, questionIndex) {
		if ((state.newQuiz.questions).length > 1) {
			state.newQuiz.questions.splice(questionIndex, 1)
		}
	},
	[UPDATE_QUESTION](state, payload) {
		const question = state.newQuiz.questions[payload.questionIndex]

		question.question = payload.question
		question.points = payload.points
	},
	[ADD_ANSWER](state, questionIndex) {
		const answers = state.newQuiz.questions[questionIndex].answers;
		if ((answers).length < 5) {
			answers.push({
				answer: "Another one!",
				isRight: false
			})
		}
	},
	[REMOVE_ANSWER](state, payload) {
		const questionIndex = payload.questionIndex
		const answerIndex = payload.answerIndex

		const question = state.newQuiz.questions[questionIndex]

		if ((question.answers).length > 1) {
			question.answers.splice(answerIndex, 1)
		}
	},
	[UPDATE_ANSWER](state, payload) {
		const questionIndex = payload.questionIndex
		const answerIndex = payload.answerIndex
		const answerText = payload.answer
		const isRight = payload.isRight

		const answer = state.newQuiz.questions[questionIndex].answers[answerIndex]

		answer.isRight = isRight
		answer.answer = answerText
	}
}

const actions = {
	async create({state}) {
		const user = firebase.auth().currentUser
		if (user) {

			// check if there user question without right answer
			state.newQuiz.questions.map(question => {
				let hasRightAnswer = false

				question.answers.map(answer => {
					if (answer.isRight) hasRightAnswer = true
				})

				if (!hasRightAnswer) {
					alert(`Question: '${question.question}' doesn't have a right answer!`)
					throw new error()
				}
			})

			// save to database
			await db.collection('quizes').add({
				...state.newQuiz,
				userId: user.uid
			})

			alert('Quiz created')
		} else {
			alert('Unauthorized')
		}
	}
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}