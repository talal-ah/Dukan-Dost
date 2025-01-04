import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RemoveToken } from '../services/storetoken'
import FieldSideBar from './FieldSideBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DiscountIcon from '@mui/icons-material/Discount';
// Usage in a component


function SideBar() {
  const [activeComponent, setActiveComponent] = useState('profile');

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };
  const [ok,setOk]=useState('')
  const navigate=useNavigate()

    function logoutfunc() {
        RemoveToken()
        window.location.reload();
        navigate('/login')
    
    
        
      }

    function online() {
      setOk('online')
      
    }
    
  return (
    <div className="  hidden lg:block bg-[#1C4E80] lg:w-[18%] lg:h-[98%] flex-col cursor-pointer rounded-lg">
           <FieldSideBar name='Profile' icon={AccountCircleIcon}  componentname='profile'
            isActive={activeComponent === 'profile'}
            onClick={() => handleClick('profile')}
           />

          <FieldSideBar name='Analytics' icon={DashboardIcon}   componentname='dashboard' isActive={activeComponent === 'dashboard'}
        onClick={() => handleClick('dashboard')}/>
           <FieldSideBar name='Inventory' icon={InventoryIcon}  componentname='inventery' isActive={activeComponent === 'inventery'}
        onClick={() => handleClick('inventery')}/>
           <FieldSideBar name='Discounts' icon={DiscountIcon}  componentname='discounts' 
           isActive={activeComponent === 'discounts'}
           onClick={() => handleClick('discounts')}
           />


           <FieldSideBar name='order' icon={ShoppingCartIcon}  componentname='order'
           isActive={activeComponent === 'order'}
           onClick={() => handleClick('order')}
           />
           <FieldSideBar name='Riders' icon={DeliveryDiningIcon}  componentname='riders'
            isActive={activeComponent === 'riders'}
            onClick={() => handleClick('riders')}/>

           <FieldSideBar name='Chats' icon={ChatIcon}  onclick={online} componentname='chating'
           isActive={activeComponent === 'chating'}
           onClick={() => handleClick('chating')}
           />

           <FieldSideBar name='Logout' icon={LogoutIcon} onclick={logoutfunc}  componentname='logout'
           isActive={activeComponent === 'logout'}/>


          
          
        </div>
  )
}

export default SideBar