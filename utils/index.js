export function msToLapTime(
	duration,
	dateFns = this.$dateFns,
	removeMilliseconds = false
) {
	if (!duration || !dateFns) return
	const t = dateFns.addMilliseconds(new Date(0), duration * 1000)
	return duration * 1000 >= 3600000
		? !removeMilliseconds
			? dateFns.format(dateFns.addHours(t, -1), 'h:mm:ss.SSS')
			: dateFns.format(dateFns.addHours(t, -1), 'h:mm:ss')
		: !removeMilliseconds
		? dateFns.format(t, 'm:ss.SSS')
		: dateFns.format(t, 'm:ss')
}
