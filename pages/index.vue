<template>
	<div class="container">
		<h2>bubble chart</h2>
		<bubble-chart
			ref="simpleChart"
			type="bubble"
			chart-id="simpleChart"
			styles="margin:0 auto; height: 300px;"
			:options="options"
			@init="init"
		/>
		<p>By <a href="www.pedropcruz.pt" target="_blank">Pedro Cruz</a></p>
	</div>
</template>

<script>
/* eslint-disable no-loss-of-precision */
import { BubbleChart } from 'vue-scichart'

export default {
	components: {
		BubbleChart,
	},
	data: () => ({
		xArr: [
			8.525709936735955,
			7.2738658635690046,
			4.677323387060965,
			4.953211358871736,
			5.99540383970891,
			6.994768920669962,
			7,
			7.994925262963647,
			8,
			8,
			8.995063030244932,
			9,
			9.990599123234292,
			10,
			10,
			10,
			10,
			10,
			10,
			9.014578254509996,
		],
		yArr: [
			79.54219055175781,
			79.630859375,
			85.94464111328125,
			80.73989868164062,
			78.99478149414062,
			79.5733642578125,
			78.49017333984375,
			82.376953125,
			80.1502685546875,
			78.03790283203125,
			78.00262451171875,
			76.10986328125,
			75.77880859375,
			78.6217041015625,
			74.41259765625,
			77.733154296875,
			75.0433349609375,
			75.1181640625,
			75.34423828125,
			75.2998046875,
		],
		bubbleSize: 16,
		options: {
			yAxes: {
				axisTitle: 'Lap Time',
				growBy: [0.2, 0.2],
				axisTitleStyle: {
					fontSize: 16,
				},
				axisAlignment: 'left',
			},
			xAxes: {
				axisTitle: 'Average Regeneration Mode',
				axisTitleStyle: {
					fontSize: 16,
				},
			},
			bubbleChartOptions: {
				key: 'ellipse',
				pointMarker: {
					width: 24,
					height: 24,
					strokeThickness: 0,
				},
			},
			modifiers: {
				mouseWheelZoom: {
					xyDirection: 0,
				},
				zoomPan: {
					xyDirection: 0,
				},
				rollover: {
					rolloverLineStroke: '#f70f1c',
					showTooltip: false,
				},
			},
		},
	}),
	methods: {
		init() {
			const { appendRangeData, zoomExtents } = this.$refs.simpleChart
			const zValues = []

			for (let i = 0; i < this.xArr.length; i++) {
				zValues.push(this.bubbleSize)
			}

			appendRangeData(this.xArr, this.yArr, zValues)

			zoomExtents()
		},
	},
}
</script>
