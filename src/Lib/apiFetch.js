const apiFetch = async ({ payload, method = 'GET', url }) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (payload) {
      options.body = JSON.stringify(payload)
    }
    const response = await fetch(url, options)
    return response.json()
  } catch (err) {
    console.error(err)
  }
}

export default apiFetch