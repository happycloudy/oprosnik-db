const base = 'http://localhost:3000'

export const client = async (uri, options) => {
	const url = new URL(uri, base)

	const res = await fetch(url.toString(), {
		method: options.method || 'GET',
		headers: {
			'Authorization': localStorage.getItem('token') || undefined,
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(options.body) || undefined
	})

	return res.json()
}