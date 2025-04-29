import ProtectedRoute from '@/app/utils/ProtectedRoute'
import DetailArticle from '@/app/components/user-dashboard/DetailArticle'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <DetailArticle />
      </ProtectedRoute>
    </div>
  )
}

export default page
