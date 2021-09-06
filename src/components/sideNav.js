import React, { useState } from 'react'
import {
    Flex,
    IconButton,
    Fade
} from '@chakra-ui/react'
import {
    RiMoneyDollarCircleLine,
    RiTodoLine,
    RiCalendarEventLine,
    RiContactsBook2Line,
    RiCommunityLine,
    RiLineChartLine
} from 'react-icons/ri'
import { BiConversation, BiExpand } from "react-icons/bi"


import NavItem from '../components/navItem'

// code adapted from https://github.com/bjcarlson42/chakra-left-responsive-navbar
export default function SideNav() {
    const [navSize, changeNavSize] = useState("small") // change nav size wide or small
    let isOpen = false
    if (navSize === "large") {
        isOpen = true
    }
    return (

        <Flex 
            pos="fixed"
            zIndex={998}
            bgColor="ripple.100"
            left="0"
            h="100vh"
            marginTop="0vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={navSize == "small" ? "110px" : "260px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"    
                flexDir="column"
                alignItems={navSize == "small" ? "center" : "flex-start" }
                as="nav"
            >
                <IconButton
                    background="none"
                    color="white"
                    mt = {100}
                    _hover={{background: 'ripple.200'}}
                    icon={<BiExpand/>}
                    size="lg"
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")

                    }}
                />
                <NavItem navSize={navSize} icon={RiTodoLine} pageName="Tasks" page="/tasks" />
                <NavItem navSize={navSize} icon={RiCalendarEventLine} pageName="Calendar" page="/calendar" />
                <NavItem navSize={navSize} icon={RiContactsBook2Line} pageName="Contacts" page="/contacts" />
                <NavItem navSize={navSize} icon={RiCommunityLine} pageName="Organization" page="/organization" />
                <NavItem navSize={navSize} icon={RiMoneyDollarCircleLine} pageName="Deal" page="/deal"/>
                <NavItem navSize={navSize} icon={BiConversation} pageName="Interactions" page="/interactions" /> 
                <NavItem navSize={navSize} icon={RiLineChartLine} pageName="Analytics" page="/analytics" />
            </Flex>
        </Flex>
    )
}
