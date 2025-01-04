import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import StoreIcon from '@mui/icons-material/Store';
import { useSelector, useDispatch } from 'react-redux';
import { useDukanDataQuery } from '../reduxServices/Apis/DukancreationApi';
import { GetToken } from '../services/storetoken';
import { setDukanData } from '../reduxServices/slicers/dukandataslicer';
import DukanCreate from './DukanCreate';
import EditDukan from './EditDukan';
import profpic from '../assets/prof.png'; // Profile picture placeholder
import IBANForm from './IBANForm';
import AccountCard from './AccountCard';
import ProfileUpdate from './ProfileUpdate';
import Loadingdata from './Loadingdata';
import Settings from './Settings';
function Profile() {
    const [name, setName] = useState('Create Dukan');
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [token, setToken] = useState({});
    const { data, isSuccess,isLoading } = useDukanDataQuery(token.access);

    useEffect(() => {
        if (isSuccess) {
            setName('Edit Dukan');
            dispatch(
                setDukanData({
                    shopeName: data[0].shopeName,
                    city: data[0].city,
                    owner: data[0].owner,
                    shopAddress: data[0].shopAddress,
                    shopLatitude: data[0].shopLatitude,
                    shopLongitude: data[0].shopLongitude,
                    distric: data[0].distric,
                    province: data[0].province,
                    dukaanId: data[0].dukaanId,
                    shopImg: data[0].shopImg,
                    deliveryfee:data[0].deliveryfee,

                    timing:data[0].timing,

                    
                })
            );
        }
    }, [data, isSuccess, dispatch]);

    useEffect(() => {
        const token = GetToken();
        if (token) {
            setToken({
                access: token.access_token,
                refresh: token.Refresh_token,
            });
        }
    }, []);

    const dukandata = useSelector(state => state.dukandata);
    const profile = useSelector(state => state.profile);
    const [profileEdit,setProfileEdit]=useState(false)
    const [profilePasswordedit,setProfilePasswordedit]=useState(false)

function closeprofileEditModal() {
    setProfileEdit(false)

    
}
function closeprofilePasswordeditModal() {
    setProfilePasswordedit(false)

    
}
useEffect(()=>{
    console.log("this is dukan data",dukandata)
},[dukandata])

    return (
        <div className={`${profileEdit || profilePasswordedit?"flex align-middle justify-center":"w-full lg:h-full p-6     bg-gray-50 rounded-lg overflow-auto"}`}>
               
            {profileEdit &&  <ProfileUpdate onClose={closeprofileEditModal}/>}
            {profilePasswordedit && <Settings onClose={closeprofilePasswordeditModal}/>}
            {show && (
                name === 'Edit Dukan' ? 
                <EditDukan name={name} onClose={() => setShow(false)} /> :
                <DukanCreate name={name} onClose={() => setShow(false)} />
            )}
            {
                !show  &&(
                    <div className={`${profileEdit || profilePasswordedit ?' opacity-5':'grid  lg:grid-cols-3 grid-cols-1 gap-6 '}`}>
                        {/* Profile Section */}
                        <div className="col-span-1">
                            <div className="bg-white p-6 shadow-2xl rounded-xl text-center">
                                <Avatar 
                                    src={`http://127.0.0.1:8000${dukandata.shopImg}`}
                                    alt="Profile"
                                    sx={{ width: 120, height: 120, margin: 'auto' }}
                                />
                                <h2 className="mt-4 text-xl font-semibold">{profile.user_name || 'User Name'}</h2>
                                <p className="text-gray-500">{profile.phone_number || 'Phone Number'}</p>
                                <div className=' flex  space-x-2 justify-center  '>
                                <Button 
                                    variant="outlined" 
                                    startIcon={<EditIcon />}
                                    onClick={() => setShow(true)}
                                    className="mt-4"
                                >
                                    {name}
                                </Button>
                                <div className=' space-x-1 flex justify-center mt-6'>
                                    <AccountCircleIcon  onClick={()=>{setProfileEdit(true)}}
                                    className='  text-blue-700  rounded-full shadow-2xl' fontSize="small"/>
                                    <LockIcon  onClick={()=>{setProfilePasswordedit(true)}}
                                    className='  text-blue-700 rounded-full shadow-2xl' fontSize="small"/>
                                </div>
                                </div>
                            </div>
                        </div>

                        {isLoading ? <Loadingdata/> : null  }
                        {/* Shop Section */}
                        <div className="col-span-2">
                            <div className="bg-white p-6 shadow-2xl rounded-xl">
                                <div className="flex items-center">
                                    <StoreIcon className="text-indigo-600 mr-2" />
                                    <h2 className="text-2xl font-semibold">{dukandata.shopeName || 'Shop Name'}</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Address</h4>
                                        <p className="text-gray-500">{dukandata.shopAddress || 'Not available'}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700">City</h4>
                                        <p className="text-gray-500">{dukandata.city || 'Not available'}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700">District</h4>
                                        <p className="text-gray-500">{dukandata.distric || 'Not available'}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Province</h4>
                                        <p className="text-gray-500">{dukandata.province || 'Not available'}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Longitude</h4>
                                        <p className="text-gray-500">{dukandata.shopLongitude || 'Not available'}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Latitude</h4>
                                        <p className="text-gray-500">{dukandata.shopLatitude || 'Not available'}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mt-2">Timing</h4>
                                        <p className="text-gray-500">{dukandata.timing || 'Not available'}</p>
                                    </div>
                                    <div>
                                    <h4 className="font-semibold text-gray-700 mt-2">Delivery fee</h4>
                                    <p className="text-gray-500">{dukandata.deliveryfee || 'Not available'}</p>
                                    </div>
                                    
                                </div>
                                <div className="mt-6">
                                    <LocationOnIcon className="text-indigo-600 mr-2" />
                                    <span className="text-gray-500">Location: {dukandata.shopLatitude}, {dukandata.shopLongitude}</span>
                                </div>
                                
                                    

                                     
                            </div>
                        </div>
                       

                    </div>
                    )
            }
       
        </div>
    );
}

export default Profile;
