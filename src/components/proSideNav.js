import React from "react"
import "./proSideNav.scss"

import { Box, Tooltip } from "@chakra-ui/react"
import { Link } from "gatsby"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"

import { FaExpandAlt, FaTasks, FaDollarSign } from "react-icons/fa"
import { BsFillChatSquareDotsFill, BsBarChartFill } from "react-icons/bs"
import { BiBuildingHouse, BiCalendar } from "react-icons/bi"
import { RiContactsBook2Line } from "react-icons/ri"
import { AiFillHome } from "react-icons/ai"

const ProSideNav = ({ location }) => {
  const [collapsed, setCollapsed] = React.useState(true)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const pathname = location.pathname

  return (
    <Box zIndex={997} position="fixed">
      <ProSidebar
        collapsedWidth="80px"
        width="190px"
        collapsed={collapsed}
        style={{ position: "absolute", height: "100vh" }}
      >
        <Menu style={{ paddingTop: "85px" }} iconShape="round">
          <Tooltip isDisabled={!collapsed} label="Expand" placement="right">
            <Box onClick={toggleCollapsed}>
              <MenuItem icon={<FaExpandAlt size="15px" />} />
            </Box>
          </Tooltip>
          <Tooltip isDisabled={!collapsed} label="Dashboard" placement="right">
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/dashboard" || pathname === "/dashboard/")
              }
              icon={<AiFillHome size="20px" />}
            >
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>
          </Tooltip>
          <Tooltip isDisabled={!collapsed} label="Tasks" placement="right">
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/tasks" || pathname === "/tasks/")
              }
              icon={<FaTasks size="20px" />}
            >
              <Link to="/tasks">Tasks</Link>
            </MenuItem>
          </Tooltip>
          <Tooltip isDisabled={!collapsed} label="Calendar" placement="right">
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/calendar" || pathname === "/calendar/")
              }
              icon={<BiCalendar size="20px" />}
            >
              <Link to="/calendar">Calendar</Link>
            </MenuItem>
          </Tooltip>
          <Tooltip isDisabled={!collapsed} label="Contacts" placement="right">
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/contacts" || pathname === "/contacts/")
              }
              icon={<RiContactsBook2Line size="20px" />}
            >
              <Link to="/contacts">Contacts</Link>
            </MenuItem>
          </Tooltip>
          <Tooltip isDisabled={!collapsed} label="Companies" placement="right">
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/companies" || pathname === "/companies/")
              }
              icon={<BiBuildingHouse size="20px" />}
            >
              <Link to="/companies">Companies</Link>
            </MenuItem>
          </Tooltip>
          <Tooltip isDisabled={!collapsed} label="Deals" placement="right">
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/deals" || pathname === "/deals/")
              }
              icon={<FaDollarSign size="20px" />}
            >
              <Link to="/deals">Deals</Link>
            </MenuItem>
          </Tooltip>
          <Tooltip
            isDisabled={!collapsed}
            label="Interactions"
            placement="right"
          >
            <MenuItem
              active={
                pathname != null &&
                (pathname === "/interactions" || pathname === "/interactions/")
              }
              icon={<BsFillChatSquareDotsFill size="20px" />}
            >
              <Link to="/interactions">Interactions</Link>
            </MenuItem>
          </Tooltip>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default ProSideNav
