// Validate the provided json is a valid one
module.exports = (err, req, res, next) => {
  if (err.status === 400) {
    return res
      .status(err.status)
      .json({ success: false, data: null, error: 'invalid json' })
  }

  return next(err)
}
