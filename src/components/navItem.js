import React, { useState } from 'react'
import { Link } from 'gatsby'
import {
    Menu,
    MenuButton,
    Icon,
    Flex,
    Text,
    Fade
} from '@chakra-ui/react'


export default function NavItem({navSize, icon, pageName, page}) {
    let active = false
    const pathname = window.location.pathname
    if (pathname === page) {
        active = true
    }
    let isOpen = false
    if (navSize === "large") {
        isOpen = true
    }

    return (
        <Flex
            mt = {10}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start" }
        >                 
            <Menu placement="right">
                <Link 
                to={page}
                w={navSize === "large" && "100%"}
                >
                     <MenuButton
                        w = {navSize === "large" && "230px" }
                        _hover={{background: 'ripple.200',  transform: "scale(1.05)"}}
                        backgroundColor={active && "ripple.200"}
                        p={3}
                        borderRadius= {50}
                        
                    >
                         <Flex w = "100%">
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
