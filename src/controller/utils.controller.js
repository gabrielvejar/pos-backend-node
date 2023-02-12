const defaultErrorResponse = (response) => {
  return response
    .status(500)
    .json({ success: false, data: null, error: 'internal server error' })
}

module.exports = { defaultErrorResponse }
