import React, { useEffect, useState } from "react"
import { Chart, Doughnut } from "react-chartjs-2"
import pieceLabel from "chartjs-plugin-datalabels"

// Chartjs implementation reference: https://github.com/reactchartjs/react-chartjs-2/issues/201
Chart.register(pieceLabel)

/**
 * Doughnut Chart for the deals breakdown
 * @property {Object} org organization object
 * @returns
 */
const DoughnutChart = ({ deals }) => {
  const [freqs, setFreqs] = useState()

  const colors = [
    "#ffb3ba",
    "#ffdfba",
    "#ffffba",
    "#baffc9",
    "#bae1ff",
    "#d0d0d0",
    "#7bd8f1",
  ]

  useEffect(() => {
    // Fetch data from database
    const stageCount = {
      Prospect: 0,
      Lead: 0,
      Pitch: 0,
      Qualified: 0,
      "Proposal Sent": 0,
      Negotiation: 0,
      Closed: 0,
    }

    deals.forEach(doc => {
      stageCount[
        (doc.stage.charAt(0).toUpperCase() + doc.stage.slice(1)).replace(
          " ",
          ""
        )
      ] += 1
    })

    setFreqs(stageCount)
  }, [deals])

  const data = {
    labels: freqs ? Object.keys(freqs) : [],
    datasets: [
      {
        data: freqs ? Object.values(freqs) : [],
        backgroundColor: freqs ? colors : [],
        borderColor: freqs ? colors : [],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      datalabels: {
        //Referenced from : https://stackoverflow.com/questions/52044013/chartjs-datalabels-show-percentage-value-in-pie-piece
        formatter: (value, ctx) => {
          let sum = 0
          let dataArr = ctx.chart.data.datasets[0].data
          dataArr.map(data => (sum += data))
          let percentage = ((value * 100) / sum).toFixed(2) + "%"
          return value > 0 ? percentage : ""
        },
      },
      legend: {
        position: "bottom",
        labels: { boxWidth: 10 },
      },
    },
  }

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  )
}

export default DoughnutChart
