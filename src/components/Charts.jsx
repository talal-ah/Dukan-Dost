import React, { useEffect } from 'react'
import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import DashBoardHearder from './DashBoardHearder';
import ProgressChart from './ProgressChart';
import Chartslection from './Chartslection';
import { useGenReportMutation } from '../reduxServices/Apis/ProductsApis';
import GenerateReportPopup from './GenerateReportPopup';
import { useTotalreportQuery } from '../reduxServices/Apis/ProductsApis';
import { useSelector } from 'react-redux';
import { useAvgsalesreportQuery } from '../reduxServices/Apis/ProductsApis';
import Loadingdata from './Loadingdata';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
function Charts() {
const dukandata = useSelector(state => state.dukandata);



  const [start_date, setStart_date] = useState("")
  const [end_date, setEnd_date] = useState("")
  const [avgsalesdata,setAvgsalesdata]=useState([])
  const [dukaan_id, setDukaan_id] = useState(dukandata.dukaanId)
  const { data, isSuccess,isLoading:reportLoading } = useTotalreportQuery({ start_date, end_date, dukaan_id })
  const { data:avgsales, isSuccess:avgsalesIssussess } = useAvgsalesreportQuery({ start_date, end_date, dukaan_id })

  const [orders, setOrders] = useState('')
  const [sales, setSales] = useState('')
  const [revnue, setRevnue] = useState('')

  useEffect(() => {
    console.log(data)
    if (isSuccess) {
      setOrders(data.total_orders)
      setSales(data.total_sales)
      setRevnue(data.total_revenue)

    }

   

  }, [data])
  useEffect(() => {

    if(avgsalesIssussess){
      console.log("data of avgis here",avgsales)
      setAvgsalesdata(avgsales)

    }

  }, [avgsales])
  const CustomTooltip = ({ active, payload, header }) => {
    if (active && payload && payload.length) {
      const { end_date, total_sales, total_revenue, total_orders } = payload[0].payload;

      // Determine which data to display based on the header
      let value;
      switch (header) {
        case 'sales':
          value = total_sales;
          break;
        case 'revenue':
          value = total_revenue;
          break;
        case 'orders':
          value = total_orders;
          break;
        default:
          value = total_sales;
      }

      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${end_date}`}</p>
          <p className="intro">{`${header}: ${value}`}</p>
        </div>
      );
    }

    return null;
  };

  // coutum tooltip>
  const [charttoggel, setCharttoggel] = useState(false)
  const [datestoggel, setDatestoggel] = useState(false)
  const [isdown, setIsdown] = useState(false)
  const [chart, setChart] = useState("Line")
  const [dates, setDates] = useState("Last7 Days")
  const [period, setPeriod] = useState('Last7 day')




  const [report, { isLoading }] = useGenReportMutation()
  const [repdata, setRepdata] = useState([])
  async function genReport() {
    try {
      const response = await report({ start_date, end_date, dukaan_id })
      if (response) {


        setRepdata(response.data)


      }
      else {
        console.log('errorr data:')
      }

    } catch (error) {
      console.log('errorr catch:', error)

    }



  }
  useEffect(() => {
    genReport();

  }, [start_date, end_date, repdata])
  function setdates(start_date, end_date) {
    setStart_date(start_date)
    setEnd_date(end_date)
    genReport()

  }
  const [header, setHeader] = useState('')

  return (
    <>

      <div className='w-full h-[600px] overflow-y-scroll '>
        <div className='flex flex-col   rounded-2xl shadow-2xl'>
          <div className='flex flex-row '>
            <h1 onClick={() => genReport()} className='text-xl ml-8  font-bold'>Activity Level</h1>

            <div className='ml-5 flex rounded-lg items-center justify-center bg-slate-200 w-[90px]'>
              {reportLoading?Loadingdata:null}
              <div>

                <input className=' w-full  flex text-center  rounded-lg  bg-slate-200 select-none  py-2 text-sm' type="text" value={chart} />
                {
                  charttoggel ? <div className=' fixed z-50  rounded-xl shadow-lg w-[90px] bg-white items-center justify-center'>
                    <ul className='  text-md'>
                      <li onClick={() => { setChart('Line'); setCharttoggel(!charttoggel) }} className=' p-1 hover:bg-blue-100'>Line</li>
                      {/* <li onClick={() => { setChart('Pie'); setCharttoggel(!charttoggel) }} className='p-1 hover:bg-blue-100'>Pie</li> */}
                      <li onClick={() => { setChart('Bar'); setCharttoggel(!charttoggel) }} className='p-1 rounded-b-xl hover:bg-blue-100'>Bar</li>
                    </ul>



                  </div>
                    : null
                }
              </div>

            </div>
            <div onClick={() => { setCharttoggel(!charttoggel) }}><ArrowDropDown /></div>
            {/* second.. */}


            <div className='ml-5 flex rounded-lg items-center justify-center bg-slate-200 w-[90px]' >
              <GenerateReportPopup setdates={setdates} />
            </div>
          </div>
          <div className=' mx-6 grid mt-4   grid-cols-4   '>


            <DashBoardHearder onClick={() => { setHeader('sales') }} gr="bg-gradient-to-r from-orange-400 to-yellow-500" sales={sales} text="Sales" saleprc={43} />
            <DashBoardHearder onClick={() => { setHeader('revenue') }} gr="bg-gradient-to-r from-blue-500 to-blue-400" sales={revnue} text="Revenue" saleprc={43} />
            {/* <DashBoardHearder gr="bg-gradient-to-r from-blue-500 to-blue-400" sales={1297} text="Profit" saleprc={43} /> */}
            <DashBoardHearder onClick={() => { setHeader('orders') }} gr="bg-gradient-to-r from-green-300 to-green-200" sales={orders} text="Orders" saleprc={43} />



          </div>
          {/* Charts ................ */}
          <div className='    mt-5 p-6'>
            {


              chart === "Line" ? (<ResponsiveContainer  width="100%" aspect={4}   >
                {repdata && (<LineChart data={repdata} width={500} height={300}>
                  <CartesianGrid  strokeDasharray="3 3" />
                  <XAxis dataKey="end_date" interval={'preserveStartEnd'} />

                  {
                    header === 'sales' ? (
                      <YAxis dataKey="total_sales" />
                    ) : header === 'revenue' ? (
                      <YAxis dataKey="total_revenue" />
                    ) : header === 'orders' ? (
                      <YAxis dataKey="total_orders" />
                    ) : (
                      <YAxis dataKey="total_sales" />  // Fallback case
                    )
                  }
                  <YAxis dataKey="end_date" />
                  {
                    header === 'sales' ? (
                      <Line dataKey="total_sales" type="monotone" />
                    ) : header === 'revenue' ? (
                      <Line dataKey="total_revenue" type="monotone" />
                    ) : header === 'orders' ? (
                      <Line dataKey="total_orders" type="monotone" />
                    ) : (
                      <Line dataKey="total_sales" type="monotone" />  // Fallback case
                    )
                  }

                  <Tooltip content={<CustomTooltip header={header} />} />

                </LineChart>)}



              </ResponsiveContainer  >) : null
            }
            {
              chart === "Pie" ? (
                <ResponsiveContainer width="100%" aspect={4}>

                  <PieChart width={730} height={250}>
                    <Pie data={repdata} dataKey="total_sales" nameKey="end_date" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                    <Pie data={repdata} dataKey="total_revenue" nameKey="end_date" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" />
                  </PieChart>
                </ResponsiveContainer>
              ) : null

            }
            {
              chart === "Bar" ? (<ResponsiveContainer width="100%" aspect={4}   >
                <BarChart width={730} height={250} data={repdata}>

                  <XAxis dataKey="end_date" interval={'preserveStartEnd'} />
                  <YAxis />

                  <Legend />
                  <Bar
                    dataKey={
                      header === 'sales'
                        ? "total_sales"
                        : header === 'revenue'
                          ? "total_revenue"
                          : "total_orders"
                    }
                    fill="#8884d8"
                  />
                  <Tooltip content={<CustomTooltip header={header} />} />

                </BarChart>
              </ResponsiveContainer>) : null
            }
          </div>
        </div>
        {/* <div className='mt-3 bg-white h-full'>
          <div className='flex  items-center    '>
          {avgsalesdata.length>0 ?<h1 className=' text-2xl ml-8 p-5  font-bold'>Categorized Sales Report</h1>:<div className=' text-black font-bold ml-[45%]'> Gerate report</div>}
           
            
          </div>
          <div className='    grid grid-cols-4 '>

            {
              avgsalesdata.map((items,index)=>(
                <ProgressChart name={items.category} percentage={items.percentage_of_total_sales} value={items.total_sales} item={items.total_items_sold} color="#5F4B8BFF" />

              ))
            }
            






          </div>
         



        </div> */}






      </div>




    </>
  )
}

export default Charts




{/*  */ }