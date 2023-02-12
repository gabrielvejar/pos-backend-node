const checkUserIsCashier = (request, response, next) => {
  if (!request.cashier) {
    return response
      .status(403)
      .json({ success: false, error: 'user is not cashier' })
  }
  next()
}

const checkUserIsSales = (request, response, next) => {
  if (!request.sales) {
    return response
      .status(403)
      .json({ success: false, error: 'user is not sales' })
  }
  next()
}

const checkUserIsProductsAdmin = (request, response, next) => {
  if (!request.adminProducts) {
    return response
      .status(403)
      .json({ success: false, error: 'user is not products admin' })
  }
  next()
}

const checkUserIsUsersAdmin = (request, response, next) => {
  if (!request.adminUsers) {
    return response
      .status(403)
      .json({ success: false, error: 'user is not users admin' })
  }
  next()
}

const checkUserIsAdminsAdmin = (request, response, next) => {
  if (request.body.roleId !== 0) {
    next()
  }

  if (!request.adminAdmins) {
    return response
      .status(403)
      .json({ success: false, error: 'user can not manipulates admins' })
  }
  next()
}

module.exports = {
  checkUserIsCashier,
  checkUserIsAdminsAdmin,
  checkUserIsProductsAdmin,
  checkUserIsSales,
  checkUserIsUsersAdmin
}
