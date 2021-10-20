import React, { useEffect, useState } from "react"
// import { FunnelChart } from "react-funnel-pipeline"
import { FunnelChart } from "./custom-react-pipeline-funnel/index.js"
import "./custom-react-pipeline-funnel/index.css"

/**
 *
 * @property {String} org associated organization
 * @property {String} maxWidth  maximum width of the sales funnel, defaults at 100vw
 * @property {String} maxHeight maximum height of the sales funnel, defaults at 100vh
 * @returns
 */
const SalesFunnel = ({ deals }) => {
  // Data used for sales funnel
  const [freqs, setFreqs] = useState()

  const colors = [
    "#f14c14",
    "#f39c35",
    "#68BC00",
    "#1d7b63",
    "#4e97a8",
    "#4466a3",
    "#5B44A3",
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
      stageCount[doc.stage.charAt(0).toUpperCase() + doc.stage.slice(1)] +=
        parseInt(doc.dealSize)
    })

    setFreqs(stageCount)
  }, [deals])

  return (
    <FunnelChart
      chartHeight="100%"
      data={
        freqs
          ? Object.keys(freqs).map(freq => ({
              name: freq,
              value: freq ? freqs[freq] : 0,
            }))
          : []
      }
      pallette={colors}
      getToolTip={row => {
        ""
      }}
    />
  )
}

export default SalesFunnel
