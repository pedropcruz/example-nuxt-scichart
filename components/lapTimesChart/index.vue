<template>
	<div class="container">
		<line-chart
			id="chart"
			:options="options"
			:styles="options.styles"
			@init="init"
		/>
	</div>
</template>

<script>
import { msToLapTime } from '~/utils'
import { stintArray, stintStatisticsArray } from '~/utils/data'

export default {
	data() {
		return {
			stintArray,
			stintStatisticsArray,
			options: {
				customTheme: {
					padding: {
						bottom: 20,
						left: 20,
						right: 20,
						top: 20,
					},
				},
				styles: {
					width: '1000px',
					height: '500px',
				},
				lineChartOptions: {
					stroke: '#42c3fa',
					strokeThickness: 4,
				},
				xAxes: {
					labelFormat: 'Decimal_0',
					drawMajorTickLines: false,
					drawMinorTickLines: false,
					autoRange: 'Once',
				},
				yAxes: {
					axisTitle: 'Lap Time',
					axisTitleStyle: {
						fontSize: 16,
					},
					drawMajorTickLines: false,
					drawMinorTickLines: false,
					autoRange: 'Once',
					labelProvider: {
						formatLabel: (value) =>
							msToLapTime(value, this.$dateFns, true) || '',
					},
					growBy: [0.1, 0.1],
					axisAlignment: 'left',
				},
				modifiers: {
					zoomPan: {
						xyDirection: 'XyDirection',
					},
					rollover: {
						rolloverLineStroke: '#f70f1c',
					},
				},
			},
		}
	},
	methods: {
		extractValues(data, prop) {
			return [...data.map((o) => o[prop])]
		},

		init(_id, chart) {
			this.stintArray.forEach((stintItem) => {
				// Filter only for Valid Laps
				const onlyValidLapsArr = stintItem.lapTimeCoordinates.filter(
					(lap) => lap.lapState === 'VALID'
				)
				// lapNumber will be my X value

				const xArr = this.extractValues(onlyValidLapsArr, 'lapNumber')

				// The Y Value will be the lap time, unformatted to specify exactly where is on the chart. Not the best code,
				// but at the moment we're more worried to put our charting working.

				const lapTimesArr = this.extractValues(onlyValidLapsArr, 'lapTimes')
				const yArr = this.extractValues(lapTimesArr, 'unformatted')

				// After have all values for a specific stint (Stint is a group of laps) we can start draw our lineChart

				this.initLapTimeChart(chart, onlyValidLapsArr, xArr, yArr)
			})
		},

		async initLapTimeChart(scichart, arr, xValues, yValues) {
			if (!scichart) return

			const {
				getDataSeries,
				renderChart,
				chart: { sciChartSurface },
			} = scichart

			if (arr.length !== 0) {
				// Here I'm using the wrapper I have done, and maybe anything can be wrong there as well.
				const lineRenderable = await scichart.setFastLineRenderableSeries({
					dataSeries: await getDataSeries('line', {
						xValues,
						yValues,
					}),
					...this.options.lineChartOptions,
				})

				const { max, min, stdDev } = this.stintStatisticsArray

				// If I'm using rollover property with this specific tooltipLegendTemplate, why is appearing other rollover property?

				lineRenderable.rolloverModifierProps.markerColor = '#f70f1c'
				lineRenderable.rolloverModifierProps.tooltipLegendOffsetX =
					sciChartSurface.renderSurface.viewportSize.width - 356
				lineRenderable.rolloverModifierProps.tooltipLegendOffsetY = 10
				lineRenderable.rolloverModifierProps.tooltipLegendTemplate = (
					_tooltipProps,
					seriesInfo
				) => {
					const time = arr.find(
						({ lapNumber }) => seriesInfo.xValue === lapNumber
					)

					return `<svg>
										<foreignObject width="16em" height="12em">
											<div xmlns="http://www.w3.org/1999/xhtml" class="box has-background-danger p-4 is-rounded">
												<div class="content is-small">
													<p class="mb-0 has-text-white" style="white-space:nowrap;"><strong>Min:</strong> ${min}</p>
													<p class="mb-0 has-text-white" style="white-space:nowrap;"><strong>Max:</strong> ${max}</p>
													<p class="mb-0 has-text-white" style="white-space:nowrap;"><strong>Standard Deviation:</strong> ${stdDev}</p>
													<p class="mb-0 has-text-white"><strong>Lap Number:</strong> ${time.lapNumber}</p>
													<p class="mb-0 has-text-white"><strong>Lap Time:</strong> ${time.lapTimes.formatted}</p>
												</div>
											</div>
										</foreignObject>
									</svg>`
				}

				renderChart(lineRenderable)
			}
		},
	},
}
</script>
