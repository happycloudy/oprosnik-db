export const getEnd = (amount) => {
	if (amount === 1) {
		return ''
	} else if (amount === 2 || amount === 3 || amount === 4) {
		return 'а'
	} else {
		return 'ов'
	}
}