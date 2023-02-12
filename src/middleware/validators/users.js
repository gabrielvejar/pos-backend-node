const {
  validateResult,
  baseChecker,
  basicAlphanumericCheckValidation
} = require('../../helpers/validateHelper')

/**
 * Middleware to validate Sign-up fields
 */
const validateSignUp = [
  basicAlphanumericCheckValidation({ fieldName: 'password', minLength: 8 }),
  basicAlphanumericCheckValidation({
    fieldName: 'first_name',
    isOptional: true
  }),
  basicAlphanumericCheckValidation({
    fieldName: 'last_name',
    isOptional: true
  }),
  basicAlphanumericCheckValidation({
    fieldName: 'username',
    isOptional: true
  }),
  validateResult
]

/**
 * Middleware to validate Login fields
 */
const validateLogin = [
  baseChecker('username').exists(),
  baseChecker('password').exists(),
  validateResult
]

/**
 * User roles
 */
const roles = ['ADMIN', 'SUPERVISOR', 'CASHIER', 'SALES']

/**
 * Middleware to validate Create User fields
 */
const validateCreateUser = [
  basicAlphanumericCheckValidation({ fieldName: 'password', minLength: 8 }),
  basicAlphanumericCheckValidation({
    fieldName: 'first_name'
  }),
  basicAlphanumericCheckValidation({
    fieldName: 'last_name'
  }),
  basicAlphanumericCheckValidation({
    fieldName: 'username'
  }),
  baseChecker('role')
    .exists()
    .bail()
    .withMessage('missing role')
    .isIn(roles)
    .bail()
    .withMessage(`Invalid role. Roles allowed: [ ${roles.join(' | ')} ]`),
  validateResult
]

module.exports = { validateSignUp, validateLogin, validateCreateUser }
