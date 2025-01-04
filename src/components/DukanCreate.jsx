import React, { useState, useRef } from 'react'
import { useState as UseState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { ArrowDropDown } from '@mui/icons-material';
import Loadingdata from './Loadingdata';
import { useDukanUpdateMutation } from '../reduxServices/Apis/DukancreationApi';
import { useDukanCreationMutation as Dukancreationmutation } from '../reduxServices/Apis/DukancreationApi';
import { GetToken } from '../services/storetoken'
import MyLocation from './DukanLocation';
function DukanCreate({ onClose, name }) {
    const tokens = GetToken();
    const accessToken = tokens.access_token;
    const [dukandata, setDukandata] = useState({})
    const catagoryarry = ["All Products", "Vegitable", 'Meet', "Groccery"]
    const [toggel, setToggel] = UseState(false)
    const [catatoggl, setCatatoggl] = UseState(false)
    const profile = useSelector(state => state.profile);
    const [shopeName, setShopeName] = UseState('');
    const [catagory, setCatagory] = UseState('');
    const [city, setCity] = UseState('');
    const [province, setProvince] = UseState('');
    const [distric, setDistric] = UseState('');
    // const [owner, setOwner] = UseState('158c7c25-fc43-405e-b52d-5ffd223a3b90');
    const [shopAddress, setshopAddress] = UseState('');
    const [timing, setTiming] = UseState('');
    const [deliveryfee, setDeliveryfee] = UseState('');


    const [shopImg, setShopeImg] = UseState(null);
    const [shopLatitude, setShopLatitude] = UseState();
    const [shopLongitude, setShopLongitude] = UseState();
    const [updateshop, setUpdateshop] = UseState(false)
    const [dukancreation, { isLoading }] = Dukancreationmutation()
    const [dukanUpdatemutation, { isLoadingg }] = useDukanUpdateMutation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loc, setloc] = useState({})
    const popupRef = useRef(null);
    const handleButtonClick = () => {
        setIsPopupOpen(!isPopupOpen);

    };
    const [located, setLocated] = useState(false)
    function handleLocationSelected(locat,city,disrict,province) {
        setIsPopupOpen(false);

        setShopLatitude(locat.lat)
        setShopLongitude(locat.lng)
        setCity(city)
        setProvince(province)
        setDistric(disrict)

        console.log("from creation side")

        console.log('lantllon', locat.lat)
        console.log(shopLatitude)
        console.log(shopLongitude)
        console.log(city)
        console.log(province)
        console.log(distric)


        setLocated(true)

    }
    console.log("upddddddddddddddddd", updateshop)


    const [show, setShow] = UseState(false)
    async function shopedata() {
        const dukandata = {
            owner: profile.id,
            shopeName,
            catagory,
            city,
            distric,
            province,
            shopAddress,
            shopImg,
            shopLatitude,
            shopLongitude,
            timing,
            deliveryfee
        }
        console.log(dukandata)
        try {
            const response = await dukancreation(dukandata)

            if (response.data) {
                setUpdateshop(true)
                console.log(response.data)
                console.log("upddddddddddddddddd", updateshop)

                alert('Dukaan Created ')

                window.location.reload()
                setUpdateshop(true)
                console.log("upddddddddddddddddd", updateshop)



            }

            else if (response.error) {
                // Error response from server
                console.log(response.error);
                alert(`Error: ${response.error.data.message || 'Failed to Creat Dukaan'}`);
            }
        } catch (response) {
            if (response.error) {
                // The request was made and the server responded with a status code
                console.log('Server responded with status:', error.response.status);
                console.log('Response data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('No response received from server');
                console.log('Request:', error.request);
            } else {
                // Something else happened while setting up the request
                console.log('Error setting up the request:', error.message);
            }
        }






    }



    console.log("upddddddddddddddddd", updateshop)



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'productImg' && event.target.files) {
            // When a file is selected, update the state with the file object
            setDukandata(prevDukandata => ({
                ...prevDukandata,
                [name]: event.target.files[0]
            }));
        } else {
            // For other input fields or if no file is selected, update the state as usual
            setDukandata(prevDukandata => ({
                ...prevDukandata,
                [name]: value,
            }));
        }


    };


    console.log(dukandata)

    async function dukanUpdate() {
        // const dukandata = {
        //     // owner: profile.id,
        //     shopeName,
        //     catagory,
        //     city,
        //     distric,
        //     province,
        //     shopAddress,
        //     shopImg,
        //     shopLatitude,
        //     shopLongitude,
        // }
        console.log(dukandata)

        try {
            const response = await dukanUpdatemutation({ dukandata, accessToken })

            if (response.data) {
                setUpdateshop(true)
                console.log(response.data)
                console.log("upddddddddddddddddd", updateshop)

                alert('Dukaan Created ')

                window.location.reload()
                setUpdateshop(true)
                console.log("upddddddddddddddddd", updateshop)



            }

            else if (response.error) {
                // Error response from server
                console.log(response.error);
                alert(`Error: ${response.error.data.message || 'Failed to Creat Dukaan'}`);
            }
        } catch (response) {
            if (response.error) {
                // The request was made and the server responded with a status code
                console.log('Server responded with status:', error.response.status);
                console.log('Response data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('No response received from server');
                console.log('Request:', error.request);
            } else {
                // Something else happened while setting up the request
                console.log('Error setting up the request:', error.message);
            }
        }



    }

    return (
        <div className='w-full md:w-[40%] h-full overflow-x-hidden  overflow-y-scroll mx-auto z-50 fixed left-1/2 transform -translate-x-1/2 scrollbar-hidden'>
            {isPopupOpen && (
                <div className=" absolute z-50   w-full h-full border flex flex-col bg-white items-center  justify-center">

                    < CloseIcon className=' flex  bg-red-700 rounded-full  mb-1 ' onClick={handleButtonClick} />
                    <MyLocation onLocationSelected={handleLocationSelected} />

                </div>
            )}

            <div className='  z-50  flex   items-center justify-center'>
                {isLoading ? <Loadingdata /> : null}
            </div>
            <div className=' justify-center align-middle   flex'>
                < CloseIcon className=' flex    bg-red-700 rounded-full   ' onClick={onClose} />
            </div>
            <form action="" className=' justify-center h-full '>
                <div className='  bg-white   shadow-xl w-full  mt-1 rounded-xl  p-3 flex      flex-col'>
                    <div className='  grid grid-cols-1  mt-4 w-full  items-center  '>
                        <div className='flex flex-row  '>
                            <label htmlFor="" className='  w-[41%]  text-[10px] lg:text-[15px]   p-5 '>ShopName</label>
                            <input value={shopeName} className=' w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="text"
                                onChange={(text) => { setShopeName(text.target.value) }} />
                        </div>

                        <div className="flex flex-row w-full align-middle">
                            <label htmlFor="catagory" className="w-[41%] text-[10px] lg:text-[15px] p-5">
                                Category
                            </label>
                            <div className="flex w-full">
                                <select
                                    value={catagory}
                                    name="catagory"
                                    onChange={(event) => setCatagory(event.target.value)}
                                    className="self-center w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black h-12 p-1"
                                >
                                    {catagoryarry.map((items, index) => (
                                        <option key={index} value={items}>
                                            {items}
                                        </option>
                                    ))}
                                </select>


                            </div>
                        </div>
                        <div className='flex flex-row  align-middle'>
                        <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 '>Location </label>
                    <div className='self-center  w-full   h-12  p-3'>
                    {
                                located ?
                                    <Button onClick={handleButtonClick} variant="contained" className=' bg-green-600   mb-9  h-9 p-3'>Located</Button>

                                    :
                                    <Button onClick={handleButtonClick} variant="contained" className=' bg-[#7C41F5] w-full   mb-9  h-9 p-3'>Get Your LOcation</Button>

                            }
                    </div>


                        </div>

                        <div className='flex flex-row  align-middle '>
                            <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 '>City</label>
                            <input value={city} className='self-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="text"
                                onChange={(text) => setCity(text.target.value)} readOnly/>
                        </div>
                        <div className='flex flex-row  align-middle '>
                            <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 ' >District</label>
                            <input value={distric} className='self-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="text"
                                onChange={(text) => setDistric(text.target.value)}  readOnly/>
                        </div>
                        <div className='flex flex-row  align-middle '>
                            <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 '>Province</label>
                            <input value={province} className='self-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="text"
                                onChange={(text) => setProvince(text.target.value)} readOnly />

                        </div>
                        <div className='flex flex-row  align-middle '>
                            <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 '>shopAddress</label>
                            <input value={shopAddress} className='self-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="text"
                                onChange={(text) => setshopAddress(text.target.value)} />
                        </div>


                        <div className='flex flex-row  align-middle '>
                            <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 '>Timing(_T0 _)</label>
                            <input value={timing} className='self-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="text"
                                onChange={(text) => setTiming(text.target.value)} />
                        </div>
                        <div className='flex flex-row  align-middle '>
                            <label htmlFor="" className='      w-[41%] text-[10px] lg:text-[15px]  p-5 '>Delivery Fee </label>
                            <input   value={deliveryfee} className='self-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' type="number"
                                onChange={(text) => setDeliveryfee(text.target.value)} />
                        </div>
                        
                        <div className='flex flex-row  align-middle '>

                            <label htmlFor="" className='  w-[41%] text-[10px] lg:text-[15px]  p-5 '>ShopeImage</label>
                            <input className=' p-3 text-[10px] lg:text-[15px] items-center  w-full border-gray-100 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  ' type='file'
                                onChange={(img) => setShopeImg(img.target.files[0])} />
                        </div>
                       



                    </div>




                    <div className='    flex justify-center mt-3       '>
                        <Button onClick={shopedata} variant="contained" className=' bg-[#7C41F5]   mb-9  h-9 p-3'>{name}</Button>


                        {/*  */}
                    </div>

                </div>

            </form>

        </div>
    )
}

export default DukanCreate