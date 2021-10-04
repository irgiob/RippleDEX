import React, { useEffect, useState } from "react"

import { FunnelChart } from "react-funnel-pipeline"
import "react-funnel-pipeline/dist/index.css"
import { getDealsByOrg } from "../models/Deal"

/**
 *
 * @property {String} org associated organization
 * @property {String} maxWidth  maximum width of the sales funnel, defaults at 100vw
 * @property {String} maxHeight maximum height of the sales funnel, defaults at 100vh
 * @returns
 */
const SalesFunnel = ({ deals }) => {
  // Data used for sales funnel
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

    deals.forEach(doc => {
      stageCount[doc.stage.toLowerCase().replace(" ", "")] += parseInt(
        doc.dealSize
      )
    })
    // setProspect(stageCount.prospect)
    // setLead(stageCount.lead)
    // setPitch(stageCount.pitch)
    // setQualified(stageCount.qualified)
    // setProposal(stageCount.proposalsent)
    // setNegotiation(stageCount.negotiation)
    // setClosed(stageCount.closed)

    // For demo purposes, uncomment this
    setProspect(255000)
    setLead(185000)
    setPitch(135000)
    setQualified(93500)
    setProposal(92000)
    setNegotiation(43000)
    setClosed(12000)
  }, [])

  return (
    <FunnelChart
      data={[
        { name: "Prospect", value: prospect },
        { name: "Lead", value: lead },
        { name: "Pitch", value: pitch },
        { name: "Qualified", value: qualified },
        { name: "Proposal Sent", value: proposal },
        { name: "Negotiation", value: negotiation },
        { name: "Closed", value: closed },
      ]}
      pallette={[
        "#f14c14",
        "#f39c35",
        "#68BC00",
        "#1d7b63",
        "#4e97a8",
        "#4466a3",
        "#5B44A3",
      ]}
    />
  )
}

export default SalesFunnel
