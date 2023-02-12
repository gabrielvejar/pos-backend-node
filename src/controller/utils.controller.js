const defaultErrorResponse = (response) => {
  return response
    .status(500)
    .json({ success: false, data: null, error: 'internal server error' })
}

const handleErrors = (response, error, foreignKey, parentMethodName) => {
  console.log({ [`${parentMethodName}Error`]: { ...error } })

  const { errors } = error
  if (errors) {
    const errorMessages = errors.map(({ message }) => message)

    return response
      .status(400)
      .json({ success: false, data: null, error: errorMessages.join(', ') })
  }

  // Foreign key error
  if (error?.name === 'SequelizeForeignKeyConstraintError') {
    return response
      .status(400)
      .json({ success: false, data: null, error: `${foreignKey} invalid` })
  }

  defaultErrorResponse(response)
}

module.exports = { defaultErrorResponse, handleErrors }
