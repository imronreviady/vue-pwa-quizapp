<template>
	<v-container fluid>
		<v-layout wrap>
			<v-flex xs12>
				<v-expansion-panel focusable>
					<v-expansion-panel-content
					v-for="(item, questionIndex) in quiz.questions"
					:key="questionIndex"
					focusable
					>
						<div slot="header">{{item.question}}</div>
						<v-card class="grey lighten-3">
							<v-container>
								<v-layout wrap>
									<v-flex xs10>
										<v-textarea
										label="Question"
										:value="item.question"
										@input="updateQuestionTitle($event, questionIndex)"
										></v-textarea>
									</v-flex>
									<v-flex xs2>
										<v-textarea
										type="number"
										label="Points"
										:value="item.points"
										@input="updateQuestionPoints($event, questionIndex)"
										></v-textarea>
									</v-flex>
								</v-layout>
								<v-container>
									<v-layout
									wrap
									v-for="(answer, answerIndex) in item.answers"
									:key="answerIndex"
									>
										<v-flex xs10>
											<v-checkbox
											label="Right Answer"
											:input-value="answer.isRight"
											hide-details
											@change="updateAnswerState($event, questionIndex, answerIndex)"
											></v-checkbox>
											<v-textarea
											label="Answer"
											:value="answer.answer"
											@input="updateAnswerText($event, questionIndex, answerIndex)"
											></v-textarea>
										</v-flex>
										<v-flex xs2>
											<v-btn
											fab 
											dark 
											small 
											color="red"
											@click="removeAnswer({questionIndex, answerIndex})"
											>
												<v-icon>remove</v-icon>
											</v-btn>
										</v-flex>
									</v-layout>
								</v-container>
								<v-layout class="pl-2">
									<v-btn
									v-if="item.answers && (item.answers).length < 5"
									class="mt-4"
									color="primary"
									@click="addAnswer(questionIndex)"
									>Add Answer</v-btn>
									<v-btn
									class="mt-4"
									color="red"
									dark
									@click="removeQuestion(questionIndex)"
									>Remove Question</v-btn>
								</v-layout>
							</v-container>
						</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'

	import { ADD_ANSWER, REMOVE_QUESTION, REMOVE_ANSWER, UPDATE_ANSWER, UPDATE_QUESTION } from '@/store/quiz/mutations'

	export default {
		name: 'quiz-question',
		computed: {
			...mapGetters('quiz', {
				quiz: 'newQuiz'
			})
		},
		methods: {
			...mapMutations('quiz', {
				addAnswer: ADD_ANSWER,
				removeQuestion: REMOVE_QUESTION,
				removeAnswer: REMOVE_ANSWER,
				updateAnswer: UPDATE_ANSWER,
				updateQuestion: UPDATE_QUESTION
			}),
			updateAnswerText(value, questionIndex, answerIndex) {
				this.updateAnswer({
					answer: value,
					isRight: this.quiz.questions[questionIndex].answers[answerIndex].isRight,
					questionIndex,
					answerIndex
				})
			},
			updateAnswerState(value, questionIndex, answerIndex) {
				this.updateAnswer({
					isRight: value,
					answer: this.quiz.questions[questionIndex].answers[answerIndex].answer,
					questionIndex,
					answerIndex
				})
			},
			updateQuestionTitle(value, questionIndex) {
				this.updateQuestion({
					question: value,
					points: this.quiz.questions[questionIndex].points,
					questionIndex
				})
			},
			updateQuestionPoints(value, questionIndex) {
				const points = parseInt(value);
				if (isNaN(points) || points < 0) return;

				this.updateQuestion({
					question: this.quiz.questions[questionIndex].question,
					points,
					questionIndex
				})
			}
		}
	}
</script>