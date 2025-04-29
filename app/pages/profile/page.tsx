import Profile from '@/app/components/admin-dashboard/Profile'
import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    </div>
  )
}

export default page
