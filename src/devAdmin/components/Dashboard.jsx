import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Bar, Line } from 'react-chartjs-2';
  import { Button, Card, Carousel, Image } from "react-bootstrap"
  import useFetch from '../../clients/features/get_withcredentials';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from 'react-icons/md';

    


export default function Dashboard(){
    const [openModal, setOpenModal]= useState(false)
    const [openModalTT, setOpenModalTT]= useState(false)

    const navigate= useNavigate()

    const {data, loading, error, refreshData}= useFetch(`http://localhost:10000/api/earn`)

    if(error?.response?.status===401){
        alert(error.response.statusText)
        navigate('/admin')

    }
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );
      var optionsC = []
      data?.map((hotel) => {
        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: hotel?.name,
              },
            },
          };
          hotel?.name!== 'Total'&& optionsC.push(options)
      }
      )
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: "Total",
          },
        },
      };
      
    
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


      var dataCharsetEarn = []
      data?.map((hotel) => {
      const datai = {
          labels,
          datasets: [
            {
              label: 'Hotel Earning',
              data: hotel?.months?.map((element) => element?.earn),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            
          ],
        };
        hotel?.name!=="Total" && dataCharsetEarn.push(datai)
      }
      )
      var dataCharsetEarnP = []
      data?.map((hotel) => {
      const datai = {
          labels,
          datasets: [
            {
              label: 'Juzr Income',
              data: hotel?.months?.map((element) => element?.earn * 0.1),
              backgroundColor: 'rgba(107, 201, 8, 0.5)',
            },
            
          ],
        };
        hotel?.name!=="Total" && dataCharsetEarnP.push(datai)
      }
      )
      var dataCharsetUser = []
      data?.map((hotel) => {
      const datai = {
          labels,
          datasets: [
            {
              label: 'Hotel Users',
              data: hotel?.months?.map((element) => element?.userCount.length),
              backgroundColor: 'rgba(112, 28, 112, 0.5)',
            },
            
          ],
        };
        hotel?.name!=="Total" && dataCharsetUser.push(datai)
      }
      )
      var dataCharsetEarnTT = []
      
      data?.map((hotel) => {
        const datai = {
            labels,
            datasets: [
              {
                fill:true,
                label: 'Juzr Earning',
                data: hotel?.months?.map((element) => element?.earn),
                borderColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              
            ],
          };
        hotel.name==="Total" && dataCharsetEarnTT.push(datai)
        })

        var dataCharsetEarnPTT = []
        data?.map((hotel) => {
            const datai = {
                labels,
                datasets: [
                {
                    fill:true,
                    label: 'Juzr Income',
                    data: hotel?.months?.map((element) => element?.earn*0.1),
                    borderColor: 'rgba(107, 201, 8, 0.5)',
                    backgroundColor: 'rgba(107, 201, 8, 0.5)',
                },
                
                ],
            };
            hotel.name==="Total" && dataCharsetEarnPTT.push(datai)
        })
      var dataCharsetUserTT = []
      data?.map((hotel) => {
      const datai = {
          labels,
          datasets: [
            {
              fill:true,
              label: 'Juzr Users',
              data: hotel?.months?.map((element) => element?.userCount.length),
              borderColor: 'rgba(112, 28, 112, 0.5)',
              backgroundColor: 'rgba(112, 28, 112, 0.5)',
            },
            
          ],
        };
        hotel.name==="Total" && dataCharsetUserTT.push(datai)
      })
      const indexT=data?.map((hotel) => hotel.name).indexOf('Total')

    return(
        <div className='bg-secondary d-flex flex-column align-items-center h-100 w-100'>
            <Button className='border border-3 my-7 bg-white shadow-sm text-center w-25 p-2 fw-bold fs-5' onClick={() => openModal ?setOpenModal(false): setOpenModal(true) }>Hotel earning&user <MdArrowDropDown /></Button>
            
            {openModal&&
            data?.map((hotel, i) =>
                hotel.name=== 'Total'? null :
                i> indexT ? 
                <div className='d-flex flex-column align-items-center'>
                    <h3 className='fw-bold'>{hotel.name}</h3>
                    <Bar className='w-75 border bg-white border-3 my-3 h-25' options={optionsC[i-1]} data={dataCharsetEarn[i-1]} height='100px'   />
                    <Bar className='w-75 border bg-white border-3 my-3 h-25' options={optionsC[i-1]} data={dataCharsetEarnP[i-1]} height='100px'   />
                    <Bar className='w-75 border bg-white border-3 my-3 h-25' options={optionsC[i-1]} data={dataCharsetUser[i-1]} height='100px'   />
                </div>:
                <div className='d-flex flex-column align-items-center'>
                    <h3 className='fw-bold'>{hotel.name}</h3>
                    <Bar className='w-75 border bg-white border-3 my-3 h-25' options={optionsC[i]} data={dataCharsetEarn[i]} height='100px'   />
                    <Bar className='w-75 border bg-white border-3 my-3 h-25' options={optionsC[i]} data={dataCharsetUser[i]} height='100px'   />
                </div>
            )}
            <Button className='border border-3 my-7 bg-white shadow-sm text-center w-25 p-2 fw-bold fs-5' onClick={() => openModalTT ?setOpenModalTT(false): setOpenModalTT(true) }>Juzr Hotel earning&user <MdArrowDropDown /></Button>
            {openModalTT&&
            
                <div className='d-flex flex-column align-items-center'>
                    <Line className='w-75 border bg-white border-3 my-3 h-25' options={options} data={dataCharsetEarnTT[0]} height='100px'   />
                    <Line className='w-75 border bg-white border-3 my-3 h-25' options={options} data={dataCharsetEarnPTT[0]} height='100px'   />
                    <Line className='w-75 border bg-white border-3 my-3 h-25' options={options} data={dataCharsetUserTT[0]} height='100px'   />
                </div>
            }
        </div>
    )
}