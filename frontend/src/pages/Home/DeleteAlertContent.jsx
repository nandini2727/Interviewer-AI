import React from 'react'

const DeleteAlertContent = ({content,onDelete,title}) => {
  return (
  <div className="bg-white   p-6 max-w-md w-full">
  <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
  <div className="text-sm text-gray-600 mb-6">{content}</div>
  <div className="flex justify-end space-x-3">
    <button
      type="button"
      onClick={onDelete}
      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
</div>

  )
}

export default DeleteAlertContent
