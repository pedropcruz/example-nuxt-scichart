<template>
	<div>
		<line-chart
			:ref="id"
			:style="styles"
			:chart-id="id"
			:theme="theme"
			type="line"
			:options="options"
			@init="init"
		/>
	</div>
</template>

<script>
import { LineChart } from 'vue-scichart'

export default {
	components: {
		LineChart,
	},
	props: {
		id: {
			type: String,
			required: true,
			default: 'chart',
		},
		options: {
			type: Object,
			default: () => {},
		},
		styles: {
			type: Object,
			default: () => {},
		},
		theme: {
			type: String,
			default: 'dark',
		},
	},
	methods: {
		init() {
			this.$emit('init', this.id, this.$refs[this.id])
		},
	},
}
</script>
