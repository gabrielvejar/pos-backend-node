// EXTERNAL
const bcrypt = require('bcrypt')

const prisma = require('../db')
const { defaultErrorResponse } = require('./utils.controller')

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        role: true,
        active_flag: true,
        created_at: true,
        updated_at: true
      }
    })
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(400).json({ success: false, data: null, error })
  }
}

const createUser = async (request, response) => {
  const {
    body: {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      role
    }
  } = request
  try {
    const hashPassword = await bcrypt.hash(password, 10)

    const { password: _, ...newUser } = await prisma.users.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        username,
        password: hashPassword,
        role
      }
    })

    return response.status(201).json({ success: true, data: newUser })
  } catch (e) {
    let error = ''
    // unique username error
    if (e.code === 'P2002') {
      error = `The username '${username}' already exists`

      // any other prisma error
    } else if (e.code) {
      error = e.message
    }

    if (error) {
      return response.status(400).json({
        success: false,
        error
      })
    }
    return defaultErrorResponse(response)
  }
}

const getUser = async (request, response) => {
  try {
    const { userId } = request.params

    const { password, ...user } = await prisma.users.findUnique({
      where: { id: userId }
    })
    response.status(200).json({ success: true, data: user })
  } catch (error) {
    if (error.code) {
      return response
        .status(400)
        .json({ success: false, data: null, error: error.message })
    }
    return defaultErrorResponse(response)
  }
}

const updateUser = async (request, response) => {
  const {
    body,
    params: { userId }
  } = request
  const {
    first_name: firstName,
    last_name: lastName,
    password,
    role,
    active_flag: activeFlag,
    username
  } = body

  try {
    // Check user exists
    const user = await prisma.users.findUnique({
      where: { id: userId }
    })
    if (!user) {
      return response
        .status(404)
        .json({ success: false, data: null, error: 'user not found' })
    }

    // Hash new password (if provided)
    let hashPassword
    if (password) {
      hashPassword = await bcrypt.hash(password, 10)
    }

    // User new data
    const userNewData = {
      username: username ?? user.username,
      first_name: firstName ?? user.first_name,
      last_name: lastName ?? user.last_name,
      password: hashPassword ?? user.password,
      role: role ?? user.role,
      active_flag: activeFlag ?? user.active_flag,
      updated_at: new Date()
    }

    // Update user
    const { password: _, ...updateUser } = await prisma.users.update({
      where: { id: userId },
      data: userNewData
    })

    return response.status(200).json({ success: true, data: updateUser })
  } catch (e) {
    let error = ''
    // unique username error
    if (e.code === 'P2002') {
      error = `The username '${username}' already exists`

      // any other prisma error
    } else if (e.code) {
      error = e.message
    }

    if (error) {
      return response.status(400).json({
        success: false,
        error
      })
    }
    return defaultErrorResponse(response)
  }
}

const deleteUser = async (request, response) => {
  try {
    const {
      params: { userId }
    } = request

    // Check user exists
    const user = await prisma.users.findUnique({
      where: { id: userId }
    })
    if (!user) {
      return response
        .status(404)
        .json({ success: false, data: null, error: 'user not found' })
    }

    const { password: _, ...deletedUser } = await prisma.users.update({
      where: { id: userId },
      data: {
        active_flag: false,
        updated_at: new Date()
      }
    })

    return response.status(200).json({ success: true, data: deletedUser })
  } catch (error) {
    defaultErrorResponse(response)
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
