<template>
	<v-card>

		<v-card-title primary-title>
			<div>
				<div class="headline">
					<v-icon>question_answer</v-icon> New Quiz
				</div>
			</div>
		</v-card-title>

		<v-subheader>Quiz Information</v-subheader>
		<quiz-information />
		<quiz-questions /> 
	</v-card>
</template>

<script>
	import QuizInformation from '@/components/Quiz/QuizInformation'
	import QuizQuestions from '@/components/Quiz/QuizQuestions'

	export default {
		name: 'create-quiz',
		components: {
			QuizInformation,
			QuizQuestions
		}
	}
</script>