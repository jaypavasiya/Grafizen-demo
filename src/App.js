import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


let dummyData = {
  two: [{ totalAmount: 100, name: 'chart 1', quantity: 100, date: '2023-02-12' },
  { totalAmount: 10, name: 'chart 5', quantity: 10, date: '2023-01-21' },
  { totalAmount: 5, name: 'chart 2', quantity: 8, date: '2023-03-05' },
  { totalAmount: 0, name: 'chart 4', quantity: 8, date: '2023-05-17' },
  { totalAmount: 67, name: 'chart 4', quantity: 8, date: '2023-05-13' },
  { totalAmount: 15, name: 'chart 3', quantity: 12, date: '2023-05-31' },],

  one: [{ totalAmount: 10, name: 'chart 1', quantity: 10, date: '2023-02-12' },
  { totalAmount: 15, name: 'chart 2', quantity: 5, date: '2023-01-21' },
  { totalAmount: 8, name: 'chart 3', quantity: 2, date: '2023-03-05' },
  { totalAmount: 10, name: 'chart 4', quantity: 7, date: '2023-05-17' },
  { totalAmount: 50, name: 'chart 4', quantity: 7, date: '2023-05-13' },
  { totalAmount: 12, name: 'chart 5', quantity: 9, date: '2023-05-31' }]
}


function App() {

  const [chartType, setChartType] = useState('line')
  const [state, setState] = useState({
    series: [{
      name: 'TEAM A',
      data: []
    }, {
      name: 'TEAM B',
      data: []
    }],
    options: {
      chart: {
        height: 350,
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'solid',
        opacity: [0.35, 1],
      },
      xaxis: {
        categories: ['Jan', 'March', 'May', 'July', 'September', 'November'],
      },
      markers: {
        size: 0
      },
      yaxis: [
        {
          title: {
            text: 'One',
          },
          labels: {
            show: true,
            formatter: (value) => {
              return value // Customize the Y-axis label formatting
            }
          },
        },
        {
          opposite: true,
          title: {
            text: 'Two',
          },
          labels: {
            show: true,
            style: {
              colors: '#008FFB'
            },
            formatter: (value) => {
              return value // Customize the Y-axis label formatting
            }
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    },
    key: Math.random()
  })

  const defaultChatLoad = () => {
    let oneValue = dummyData.one.map(_ => _.totalAmount)
    let twoValue = dummyData.two.map(_ => _.totalAmount)
    let newStateData = { ...state }
    newStateData.series[0].data = oneValue
    newStateData.series[1].data = twoValue
    newStateData.options.xaxis.categories = ['Jan', 'March', 'May', 'July', 'September', 'November']

    setState({
      ...newStateData,
      key: Math.random()

    })

  }
  useEffect(() => {
    defaultChatLoad()
    return () => {

    }
  }, [])


  const onChartTypeChange = () => {
    let currentType = chartType === 'line' ? 'bar' : 'line'
    setChartType(currentType)
    setState({
      ...state, options: {
        ...state.options, chart: { ...state.options.chart, type: currentType },
        key: Math.random()
      }
    })
    // var chart = ReactApexChart()
    // chart.render()
  }

  const handleSelectChange = (e) => {
    const { value } = e.target
    if (value === "monthly") {
      let oneValue = []
      let dates = []
      dummyData.one.map(_ => {
        if (moment(_.date).isSame(new Date(), 'month') && moment(_.date).isSame(new Date(), 'year')) {
          oneValue.push(_.totalAmount)
          dates.push(_.date)
        }
      })
      let twoValue = []
      dummyData.two.map(_ => {
        if (moment(_.date).isSame(new Date(), 'month') && moment(_.date).isSame(new Date(), 'year')) {
          twoValue.push(_.totalAmount)
          if (!dates.includes(_.date)) {
            dates.push(_.date)
          }
        }
      })
      let newStateData = { ...state }
      newStateData.series[0].data = oneValue
      newStateData.series[1].data = twoValue
      newStateData.options.xaxis.categories = dates
      console.log(newStateData, oneValue, twoValue, dates);

      setState({
        ...newStateData,
        key: Math.random()
      })
    } else if (value === 'daily') {
      let oneValue = []
      let dates = []
      dummyData.one.map(_ => {
        if (moment(_.date).isSame(new Date(), 'month') && moment(_.date).isSame(new Date(), 'year') && moment(_.date).isSame(new Date(), 'day')) {
          oneValue.push(_.totalAmount)
          dates.push(_.date)
        }
      })
      let twoValue = []
      dummyData.two.map(_ => {
        if (moment(_.date).isSame(new Date(), 'month') && moment(_.date).isSame(new Date(), 'year') && moment(_.date).isSame(new Date(), 'day')) {
          twoValue.push(_.totalAmount)
          if (!dates.includes(_.date)) {
            dates.push(_.date)
          }
        }
      })
      let newStateData = { ...state }
      newStateData.series[0].data = oneValue
      newStateData.series[1].data = twoValue
      newStateData.options.xaxis.categories = dates
      console.log(newStateData, oneValue, twoValue, dates);

      setState({
        ...newStateData,
        key: Math.random()
      })
    }
    else if (value === "yearly") {
      defaultChatLoad()
    }

  }
  const handleDatePick = (e) => {

    let oneValue = []
    let dates = []
    dummyData.one.map(_ => {
      if (moment(_.date).isBetween(e[0], e[1], undefined, '[]')) {
        oneValue.push(_.totalAmount)
        dates.push(_.date)
      }
    })
    let twoValue = []
    dummyData.two.map(_ => {
      if (moment(_.date).isBetween(e[0], e[1], undefined, '[]')) {
        twoValue.push(_.totalAmount)
        if (!dates.includes(_.date)) {
          dates.push(_.date)
        }
      }
    })
    let newStateData = { ...state }
    newStateData.series[0].data = oneValue
    newStateData.series[1].data = twoValue
    newStateData.options.xaxis.categories = dates
    console.log(newStateData, oneValue, twoValue, dates);

    setState({
      ...newStateData,
      key: Math.random()
    })
  }

  return (
    <div>
      <h1>chart</h1>

      <button onClick={() => onChartTypeChange()}>Change Chart Type</button>
      <select name="type" id="" onChange={(e) => handleSelectChange(e)}>
        <option value="yearly">yearly</option>
        <option value="monthly">monthly</option>
        <option value="daily">daily</option>
      </select>
      <DateRangePicker onChange={handleDatePick} />
      <div id="chart">
        {
          <ReactApexChart key={state.key} options={state.options} series={state.series} type={chartType} height={350} />
        }
      </div>
    </div>
  );
}

export default App;
