export const isPermitted = (isSuperAdmin, path, permissions, roleAccess) => {
  if (isSuperAdmin || path === '/') return true
  const [moduleName, subModuleName] = path.split('/').filter((e) => {
    return e === 0 || e
  })

  if (permissions) {
    const module = permissions.find((permission) => permission.name === moduleName)
    if (!module) return false

    // const submodule = module.subModules.find((submodule) => submodule.name === subModuleName)
    // if (!submodule) return false

    // const subAction = submodule.actions.find((ac) => ac.name === roleAccess)

    // if (!subAction) return false

    return true
  }
  return false
}

export const sleep = (ms) => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(timeout)
    }, ms)
  })
}

export const truncateStringInMiddle = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str
  }

  const charsToShow = maxLength - 3 // Account for the length of the ellipsis
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  const frontPart = str.slice(0, frontChars)
  const backPart = str.slice(str.length - backChars)

  return `${frontPart}...${backPart}`
}

export const buildHierarchy = (data, parentField = 'locationId', childField = 'parentId') => {
  const cloneData = data.map((item) => ({ ...item, ancestorsName: [] }))

  const map = {}
  const roots = []

  // Create a map of items
  cloneData.forEach((item) => {
    item.children = []
    map[item[parentField]] = item
  })

  // Build the hierarchy
  cloneData.forEach((item) => {
    if (item[childField]) {
      const parent = map[item[childField]]
      if (parent) {
        // Add the current item's name to the parent's children array
        parent.children.push(item)

        // Add the parent's ancestors and its own name to the current item's ancestors
        item.ancestorsName = [...parent.ancestorsName, parent.name]
      }
    } else {
      // If there is no parent, it is a root item
      roots.push(item)
    }
  })

  return roots
}

export const replaceId = (url, params) => {
  if (typeof params !== 'object' || params === null) {
    throw new Error('Params must be a non-null object')
  }

  return url.replace(/:(\w+)/g, (_, key) => params[key] || `:${key}`)
}

export const joinArray = (arr, key) => {
  let result = ''
  if (Array.isArray(arr)) {
    if (key) {
      result = arr.map((item) => item?.[key])?.join(', ')
    } else {
      result = arr.map((item) => item)?.join(', ')
    }
  }
  if (typeof arr === 'string') {
    result = arr.split(',').join(' > ')
  }

  return result
}

export const capitalizeFirstLetterOfEachWord = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const isObjectAndTruthy = (obj) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export const hasEditAccessBy = (auditors = [], createdBy = {}, leadAuditor = {}) => {
  const currentUserId = JSON.parse(localStorage.getItem('user_information'))?._id
  let hasAccess = false
  if (Array.isArray(auditors)) {
    const result = auditors.filter((item) => item?._id === currentUserId)
    if (result.length > 0) hasAccess = true
  }
  if (isObjectAndTruthy(createdBy)) {
    for (const item in createdBy) {
      if (currentUserId === createdBy[item]) hasAccess = true
    }
  }
  if (isObjectAndTruthy(leadAuditor)) {
    for (const item in leadAuditor) {
      if (currentUserId === leadAuditor[item]) hasAccess = true
    }
  }
  return hasAccess
}
