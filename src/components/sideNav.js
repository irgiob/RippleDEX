import React, { useState } from 'react'
import { Link } from 'gatsby'
import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    Icon,
    Text,
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

// code adapted from https://github.com/bjcarlson42/chakra-left-responsive-navbar
const SideNav = ({location}) => {
    const [navSize, changeNavSize] = useState("small") // change nav size wide or small

    return (
        <Flex 
            pos="fixed"
            zIndex={998}
            bgColor="ripple.100"
            left="0"
            h="100vh"
            marginTop="0vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={navSize === "small" ? "110px" : "260px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"    
                flexDir="column"
                alignItems={navSize === "small" ? "center" : "flex-start" }
                as="nav"
            >
                <IconButton
                    background="none"
                    color="white"
                    mt = {100}
                    _hover={{background: 'ripple.200'}}
                    icon={<BiExpand/>}
                    size="lg"
                    onClick={() => navSize === "small" 
                        ? changeNavSize("large") 
                        : changeNavSize("small")
                    }
                />
                <NavItem navSize={navSize} icon={RiTodoLine} pageName="Tasks" page="/tasks" location={location}/>
                <NavItem navSize={navSize} icon={RiCalendarEventLine} pageName="Calendar" page="/calendar" location={location}/>
                <NavItem navSize={navSize} icon={RiContactsBook2Line} pageName="Contacts" page="/contacts" location={location}/>
                <NavItem navSize={navSize} icon={RiCommunityLine} pageName="Companies" page="/companies" location={location}/>
                <NavItem navSize={navSize} icon={RiMoneyDollarCircleLine} pageName="Deals" page="/deals" location={location}/>
                <NavItem navSize={navSize} icon={BiConversation} pageName="Interactions" page="/interactions" location={location}/> 
                <NavItem navSize={navSize} icon={RiLineChartLine} pageName="Analytics" page="/analytics" location={location}/>
            </Flex>
        </Flex>
    )
}

const NavItem = ({navSize, icon, pageName, page, location}) => {
    const pathname = location.pathname
    const active = pathname === page
    const isOpen = navSize === "large"

    return (
        <Flex
            mt="0.8em"
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start" }
        >                 
            <Menu placement="right">
                <Link 
                    to={page}
                    w={navSize === "large" ? "100%" : undefined}
                >
                    <MenuButton
                        w={navSize === "large" ? "230px": undefined}
                        _hover={{background: 'ripple.200',  transform: "scale(1.05)"}}
                        backgroundColor={active ? "ripple.200" : undefined}
                        p={3}
                        borderRadius= {50}   
                    >
                        <Flex w="100%">
                            <Icon as={icon} w={10} h={10} color='white'/>
                            <Fade in={isOpen}>
                                <Text 
                                    display={navSize === "small" ? "none" : "flex" }
                                    color='white'
                                    fontSize = "25px"
                                    ml={5}    
                                >
                                    {pageName}
                                </Text>
                            </Fade>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )   
}

export default SideNav
