import React, { useState } from 'react'
import { dummyUserData, ownerMenuLinks, assets } from '../../assets/assets'
import { useLocation, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
const Sidebar = () => {
  const {user,axios,fetchUser} = useAppContext();
  const location = useLocation()

  // ✅ correct type
  const [image, setImage] = useState(null)

  // ✅ safe update
  const updateImage = async () => {
  try {

    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post('/api/owner/update-image', formData);

    if (data.success) {
      fetchUser();
      toast.success(data.message);
      setImage("");
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>

      {/* Profile Image */}
      <div className='group relative'>
        <label htmlFor='image'>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300'
            }
            alt="profile"
            className='w-11 h-11 md:w-16 md:h-16 rounded-full mx-auto'
          />

          <input
            type='file'
            id='image'
            accept='image/*'
            hidden
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          {/* Edit overlay */}
          <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
            {assets?.edit_icon && (
              <img src={assets.edit_icon} alt="edit" />
            )}
          </div>
        </label>
      </div>

      {/* Save button */}
      {image && (
        <button
          className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
          onClick={updateImage}
        >
          Save
            <img src={assets.check_icon} width={13} alt="" />
          
        </button>
      )}

      {/* Username */}
      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

      {/* Menu */}
      <div className='w-full'>
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname
          const iconSrc = isActive ? link.coloredIcon : link.icon

          return (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
                isActive ? 'bg-primary/10 text-primary' : 'text-gray-600'
              }`}
            >
              {/* ✅ safe icon */}
              {iconSrc && (
                <img src={iconSrc} alt='menu icon' />
              )}

              <span className='max-md:hidden'>{link.name}</span>

              <div
                className={`${
                  isActive ? 'bg-primary' : ''
                } w-1.5 h-8 rounded-1 right-0 absolute`}
              ></div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar