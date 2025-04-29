import Image from 'next/image'
import React from 'react'

const FooterUserDashboard = () => {
  return (
    <div className="flex justify-center items-center py-4 bg-blue-500">
      <div className="relative w-[20px] h-[22px]">
        <Image
          src={"/white-vector.png"}
          fill
          className="object-cover"
          alt="Footer"
        />
      </div>
      <p className="text-white px-2 font-semibold">Logoipsum</p>
      <p className='text-white text-xs'>© 2025 Blog genzet. All right reserved.</p>
    </div>
  );
}

export default FooterUserDashboard
