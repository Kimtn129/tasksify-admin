export const appendFormData = (data) => {
  const formData = new FormData()
  const arrayObj = Object.entries(data)

  arrayObj.forEach((obj) => {
    if (Array.isArray(obj[1])) {
      obj[1].forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach((child) => {
            formData.append(`${obj[0]}[][${child}]`, item[child])
          })
        } else {
          formData.append(`${obj[0]}[]`, item)
        }
      })
    } else if (typeof obj[1] === 'object' && obj[1] !== null) {
      // If the object is a non-null object, iterate its properties
      Object.keys(obj[1]).forEach((key) => {
        formData.append(`${obj[0]}`, obj[1][key])
      })
    } else {
      formData.append(obj[0], obj[1])
    }
  })

  return formData
}

export function appendObjectToFormData(formData, data, parentKey = '') {
  Object.entries(data).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}[${key}]` : key

    if (value instanceof File) {
      formData.append(formKey, value)
    } else if (Array.isArray(value) && key === 'content_items_attributes') {
      // Special handling for 'content_items' to use a custom format
      value.forEach((item, index) => {
        Object.entries(item).forEach(([itemKey, itemValue]) => {
          const itemFormKey = `${formKey}[${index}][${itemKey}]`
          formData.append(itemFormKey, itemValue)
        })
      })
    } else if (Array.isArray(value)) {
      // Generic handling for arrays (not 'content_items')
      value.forEach((item) => {
        const itemFormKey = `${formKey}[]`
        if (typeof item === 'object') {
          appendObjectToFormData(formData, item, itemFormKey)
        } else {
          formData.append(itemFormKey, item)
        }
      })
    } else if (typeof value === 'object' && value !== null) {
      // Recursively handle nested objects
      appendObjectToFormData(formData, value, formKey)
    } else {
      // Convert null to empty string and append other values directly
      formData.append(formKey, value == null ? '' : value)
    }
  })
}
