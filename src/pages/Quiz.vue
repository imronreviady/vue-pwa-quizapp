<template>
	<v-card>

	</v-card>
</template>

<script>
	import { mapGetter, mapActions } from 'vuex'

	export default {
		name: 'quiz',
		created() {
			// get the quiz using the id passed in url params
			this.getQuiz(this.$route.params.id)
		},
		computed: {

		},
		methods: {
			...mapActions('quiz', {getQuiz: 'get'})
		},
		data() {
			return {
				
			}
		}
	}
</script>