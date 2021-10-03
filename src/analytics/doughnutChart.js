import React, { useEffect, useState } from "react"
import { Chart, Doughnut } from "react-chartjs-2"
import { Box } from "@chakra-ui/react"
import pieceLabel from "chartjs-plugin-datalabels"
import { getDealsByOrg } from "../models/Deal"

// Chartjs implementation reference: https://github.com/reactchartjs/react-chartjs-2/issues/201
Chart.register(pieceLabel)

/**
 * Doughnut Chart for the deals breakdown
 * @property {Object} org organization object
 * @returns
 */
const DoughnutChart = ({ org }) => {
  const [prospect, setProspect] = useState(0)
  const [lead, setLead] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [qualified, setQualified] = useState(0)
  const [proposal, setProposal] = useState(0)
  const [negotiation, setNegotiation] = useState(0)
  const [closed, setClosed] = useState(0)
  const [failed, setFailed] = useState(0)

  useEffect(async () => {
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
    try {
      const docs = await getDealsByOrg(org.id)
      docs.forEach(doc => {
        stageCount[doc.stage.toLowerCase().replace(" ", "")] += 1
      })
    } catch (err) {
      console.error("Fail to retrieve data for ", err)
    }

    setProspect(stageCount.prospect)
    setLead(stageCount.lead)
    setPitch(stageCount.pitch)
    setQualified(stageCount.qualified)
    setProposal(stageCount.proposalsent)
    setNegotiation(stageCount.negotiation)
    setClosed(stageCount.closed)
  })
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
          dataArr.map(data => {
            sum += data
          })
          let percentage = ((value * 100) / sum).toFixed(2) + "%"
          return value > 0 ? percentage : ""
        },
      },
      legend: {
        position: "right",
        labels: { boxWidth: 10 },
      },
      title: {
        display: true,
        text: "Deals breakdown",
        font: {
          size: 24,
        },
      },
    },
  }

  return (
    <>
      <Box width={"30vw"}>
        <Doughnut data={data} options={options} />
      </Box>
    </>
  )
}

export default DoughnutChart