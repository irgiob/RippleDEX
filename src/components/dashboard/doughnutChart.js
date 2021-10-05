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
  const [prospect, setProspect] = useState(0)
  const [lead, setLead] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [qualified, setQualified] = useState(0)
  const [proposal, setProposal] = useState(0)
  const [negotiation, setNegotiation] = useState(0)
  const [closed, setClosed] = useState(0)

  useEffect(() => {
    // Fetch data from database
    const stageCount = {
      prospect: 0,
      lead: 0,
      pitch: 0,
      qualified: 0,
      proposalsent: 0,
      negotiation: 0,
      closed: 0,
    }

    deals.forEach(doc => {
      stageCount[doc.stage.toLowerCase().replace(" ", "")] += 1
    })

    // setProspect(stageCount.prospect)
    // setLead(stageCount.lead)
    // setPitch(stageCount.pitch)
    // setQualified(stageCount.qualified)
    // setProposal(stageCount.proposalsent)
    // setNegotiation(stageCount.negotiation)
    // setClosed(stageCount.closed)

    // For demo purposes, uncomment this
    setProspect(255)
    setLead(185)
    setPitch(135)
    setQualified(93)
    setProposal(92)
    setNegotiation(43)
    setClosed(12)
  }, [deals])

  const data = {
    labels: [
      "Prospect",
      "Lead",
      "Pitch",
      "Qualified",
      "Proposal Sent",
      "Negotiation",
      "Closed",
    ],
    datasets: [
      {
        data: [prospect, lead, pitch, qualified, proposal, negotiation, closed],
        backgroundColor: [
          "#ffb3ba",
          "#ffdfba",
          "#ffffba",
          "#baffc9",
          "#bae1ff",
          "#d0d0d0",
          "#7bd8f1",
        ],
        borderColor: [
          "#ffb3ba",
          "#ffdfba",
          "#ffffba",
          "#baffc9",
          "#bae1ff",
          "#d0d0d0 ",
          "#7bd8f1",
        ],
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
