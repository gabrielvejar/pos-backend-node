const { validationResult, check } = require('express-validator')

const validateResult = (request, response, next) => {
  try {
    validationResult(request).throw()
    return next()
  } catch (error) {
    response
      .status(403)
      .json({
        success: false,
        error: 'request body validation errors',
        errors: error.array().map(({ location, value, ...rest }) => rest)
      })
  }
}

const baseChecker = (fieldName) => check(fieldName)

const basicAlphanumericCheckValidation = ({ fieldName, isOptional = false, minLength = 4 }) => {
  const checker = check(fieldName)

  if (isOptional) {
    checker.optional()
  } else {
    checker
      .exists()
      .bail()
      .withMessage(`missing ${fieldName}`)
  }

  checker
    .not()
    .isEmpty()
    .bail()
    .withMessage(`${fieldName} can't be empty`)
    .isLength({ min: minLength })
    .bail()
    .withMessage(`${fieldName} must have at least ${minLength} characters`)
  return checker
}

module.exports = { validateResult, baseChecker, basicAlphanumericCheckValidation }
