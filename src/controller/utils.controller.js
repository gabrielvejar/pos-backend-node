const defaultErrorResponse = (res) => {
  return res
    .status(500)
    .json({ success: false, data: null, error: 'internal server error' })
}

module.exports = { defaultErrorResponse }
