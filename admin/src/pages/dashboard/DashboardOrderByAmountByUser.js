import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch } from 'react-redux';
import DatePicker from "react-multi-date-picker"
import { getDashboardOrderByAmountByUserThunk } from '../../redux/dashboardSlice';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default () => {

  const [year, setYear] = useState(new Date());
  const [labels, setLabels] = useState([]);
  const [dataAmount, setDataAmount] = useState([]);
  let dispatch = useDispatch();
  const search = async () => {
    if (year.year) {
      let resp = await dispatch(getDashboardOrderByAmountByUserThunk(year.year));
      if (resp) {
        let respLabels = [];
        let respData = [];
        resp[0].forEach(item => {
          respLabels.push(item.label)
          respData.push(item.amount)
        })
        setLabels(respLabels)
        setDataAmount(respData)
      }
    } else {
      let date = new Date();
      let resp = await dispatch(getDashboardOrderByAmountByUserThunk(date.getFullYear()));
      if (resp) {
        let respLabels = [];
        let respData = [];
        resp[0].forEach(item => {
          respLabels.push(item.label)
          respData.push(item.amount)
        })
        setLabels(respLabels)
        setDataAmount(respData)
      }
    }

  }
  useEffect(() => {
    search() // eslint-disable-next-line
  }, [year]) // eslint-disable-next-line

  const data = {
    labels,
    datasets: [{
      label: 'Thống kê đơn hàng theo số lượng',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataAmount,
    }]
  };

  return (
    <>
      <div>
        <DatePicker onChange={(value) => setYear(value)} value={year}
          onlyYearPicker
          format='YYYY'
        />
      </div>
      <Bar
        data={data}
      />
    </>
  )
}