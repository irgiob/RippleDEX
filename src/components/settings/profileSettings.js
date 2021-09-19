import React, { useState } from "react"
import { updateUser } from "../../models/User"

import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  Stack,
  SkeletonCircle,
  SkeletonText,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  VStack,
  useToast
} from "@chakra-ui/react"

import ProfilePicture from "../../images/RippleDEXWhite.svg"

import {
  BiBuildings,
  BiPalette,
  BiBell,
  BiUserCircle,
  BiTrash,
  BiSearch,
} from "react-icons/bi"
import UploadImageButton from "../uploadImageButton"
import { updateMemberPosition, updateOrganization } from "../../models/Organisation"

const ProfileSettings = props => {
  return (
    <Modal size="3xl" isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent pos="absolute" h="500px" borderRadius="20px" pt="10px" pb="10px">
        <ModalCloseButton m="15px" />
        <ModalBody>
          <Box pb="10px" pl="10px" textAlign="left">
            <Text
              pt="8px"
              pb="10px"
              fontFamily="Nunito-Bold"
              fontSize="23px"
              color="ripple.200"
            >
              Settings
            </Text>
            <Divider />
          </Box>
          <Tabs
            defaultIndex={props.tab}
            orientation="vertical"
            variant="unstyled"
          >
            <TabList>
              <Tab
                _selected={{
                  borderRadius: "10px",
                  color: "white",
                  bg: "ripple.200",
                }}
              >
                <HStack>
                  <BiUserCircle />
                  <Text>Profile</Text>
                  <Spacer />
                </HStack>
              </Tab>
              <Tab
                _selected={{
                  borderRadius: "10px",
                  color: "white",
                  bg: "ripple.200",
                }}
              >
                <HStack>
                  <BiBell />
                  <Text>Notifications</Text>
                  <Spacer />
                </HStack>
              </Tab>
              <Tab
                _selected={{
                  borderRadius: "10px",
                  color: "white",
                  bg: "ripple.200",
                }}
              >
                <HStack>
                  <BiPalette />
                  <Text>Themes</Text>
                  <Spacer />
                </HStack>
              </Tab>
              {props.org?.admin === props.user?.id &&
                <Tab
                  _selected={{
                    borderRadius: "10px",
                    color: "white",
                    bg: "ripple.200",
                  }}
                >
                  <HStack>
                    <BiBuildings />
                    <Text>Organizations</Text>
                  </HStack>
                </Tab>
              }
            </TabList>
            <TabPanels pl="5px" pr="5px">
              <TabPanel>
                <ProfileTab 
                  user={props.user} 
                  setUser={props.setUser}
                  org={props.org}
                  setOrg={props.setOrg}
                />
              </TabPanel>
              <TabPanel>
                <NotificationsTab user={props.user} setUser={props.setUser}/>
              </TabPanel>
              <TabPanel>
                <p>Coming Soon!</p>
              </TabPanel>
              <TabPanel>
                <OrganizationsTab org={props.org} setOrg={props.setOrg}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const ProfileTab = props => {
  const [firstName, setFirstName] = useState(props.user?.firstName)
  const [lastName, setLastName] = useState(props.user?.lastName)
  const [position, setPosition] = useState(props.org?.members.filter(
    member => member.userID === props.user?.id
  )[0].position)
  const [phoneNumber, setPhoneNumber] = useState(props.user?.phoneNumber)
  const toast = useToast()

  const [photoUrl, setPhotoUrl] = useState(props.user?.profilePicture)
  const changePhotoUrl = (newUrl) => {
    setPhotoUrl(newUrl)
  }

  const handleClick = () => {
    updateUser(props.user?.id, {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      profilePicture: photoUrl
    }).then((user) => {
      props.setUser(user)
      updateMemberPosition(
        props.org?.id, 
        props.user?.id, 
        props.org?.members.filter(
          member => member.userID === props.user?.id
        )[0].position,
        position
      ).then((org) => {
        props.setOrg(org)
        toast({
          title: "Success",
          description: "Your details have been updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }).catch((error) => {
        toast({
          title: "Failed to update details",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
    }).catch((error) => {
      toast({
        title: "Failed to update details",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    <VStack>
      <HStack align="start" spacing={5}>
        <VStack textAlign="left" spacing={5}>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              First Name
            </Text>
            <Input
              variant="outline" 
              placeholder="First Name" 
              type="text"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Last Name
            </Text>
            <Input 
              placeholder="Last Name" 
              type="text"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Position at Company
            </Text>
            <Input 
              placeholder="Position at Company" 
              type="text" 
              value={position}
              onChange={event => setPosition(event.target.value)}
            />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Phone Number
            </Text>
            <Input 
              placeholder="Phone Number" 
              type="text" 
              value={phoneNumber}
              onChange={event => setPhoneNumber(event.target.value)}
            />
          </Box>
        </VStack>
        <Spacer />
        <VStack spacing={0}>
          <Center h="200px" w="200px" bgColor="ripple.100">
            <Image src={photoUrl || props.user?.profilePicture || ProfilePicture} boxSize="200px"/>
          </Center>
          <Box h="10px" />
          <HStack spacing={1}>
            <UploadImageButton
              color="ripple.200"
              fontFamily="Raleway-Bold"
              borderRadius="20px"
              variant="ghost"
              size="sm"
              _hover={{ transform: "scale(1.08)" }}
              buttonMessage="Change Profile Picture"
              changeUrl={changePhotoUrl}
            />
            <Circle
              _hover={{
                transform: "scale(1.2)",
              }}
            >
              <BiTrash style={{ color: "red" }} />
            </Circle>
          </HStack>
          <Box h="50px" />
          <Button
            bgColor="ripple.200"
            color="white"
            fontFamily="Raleway-Bold"
            borderRadius="30px"
            variant="solid"
            size="lg"
            _hover={{
              transform: "scale(1.05)",
            }}
            onClick={handleClick}
          >
            Save Changes
          </Button>
        </VStack>
      </HStack>
    </VStack>
  )
}

const NotificationsTab = props => {
  const notificationMode = props.user?.notificationMode
  const [switch1, setSwitch1] = useState(parseInt(notificationMode.substr(0,1)))
  const [switch2, setSwitch2] = useState(parseInt(notificationMode.substr(1,1)))
  const [radio, setRadio] = useState(parseInt(notificationMode.substr(2,1)))

  const updateNotifs = (switch1Val, switch2Val, radioVal) => {
    updateUser(props.user?.id, {
      notificationMode: switch1Val.toString() + switch2Val.toString() + radioVal.toString() 
    }).then((updatedUser) => props.setUser(updatedUser))
    setSwitch1(switch1Val)
    setSwitch2(switch2Val)
    setRadio(radioVal)
  }

  return (
    <VStack spacing={3} align="start">
      <Text color="ripple.200">Notify me about ...</Text>
      <HStack>
        <Switch 
          colorScheme="green" 
          isChecked={switch1}
          onChange={(e) => { updateNotifs(switch1 ? 0 : 1, switch2, radio) }}
        />
        <Text>New Meetings</Text>
      </HStack>
      <HStack>
        <Switch 
          colorScheme="green" 
          isChecked={switch2}
          onChange={(e) => { updateNotifs(switch1, switch2 ? 0 : 1, radio) }}
        />
        <Text>New Members</Text>
      </HStack>
      <br />
      <Text color="ripple.200">Customize Notifications</Text>
      <RadioGroup 
        colorScheme="green" 
        value={radio.toString()} 
        onChange={(e) => { updateNotifs(switch1, switch2, e) }}
      >
        <Stack spacing={3}>
          <Radio value="1">
            Send Notifications Live
          </Radio>
          <Radio value="2">
            Send Notifications as Daily Digest at the start of the next day
          </Radio>
          <Radio value="3">
            Send Notifications as Daily Digest at the end of the day
          </Radio>
        </Stack>
      </RadioGroup>
      <Box h="83px" />
    </VStack>
  )
}

const OrganizationsTab = props => {
  const [orgName, setOrgName] = useState(props.org.name)
  const [orgDesc, setOrgDesc] = useState(props.org.description)
  const [photoUrl, setPhotoUrl] = useState(props.user?.profilePicture)
  const toast = useToast()

  const handleClick = () => {
    updateOrganization(props.org.id, {
      name: orgName,
      description: orgDesc,
      profilePicture: photoUrl
    }).then((org) => {
      props.setOrg(org)
      toast({
        title: "Success",
        description: "Organization details have been updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }).catch((error) => {
      toast({
        title: "Failed to update details",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  } 

  return (
    <VStack>
      <HStack align="start" spacing={4}>
        <VStack textAlign="left" spacing={5}>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Workspace Name
            </Text>
            <Input 
              variant="outline" 
              placeholder="Organization Name" 
              type="text" 
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Workspace Description
            </Text>
            <Input 
              variant="outline" 
              placeholder="Organization Description" 
              type="text" 
              value={orgDesc}
              onChange={(e) => setOrgDesc(e.target.value)}
            />
          </Box>
          <Box textAlign="left" w="300px">
            <HStack>
              <Text color="ripple.200" pb="5px" fontSize="12px">
                Manage Members
              </Text>
              <Spacer />
              <Text color="green.400" pb="5px" fontSize="12px">
                Invite People +
              </Text>
            </HStack>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiSearch style={{ color: "#a2b1c0" }} />}
              />
              <Input type="text" placeholder="Search" />
            </InputGroup>
          </Box>
          <Box w="100%">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </VStack>
        <Spacer />
        <VStack spacing={0}>
          <Center h="200px" w="200px" bgColor="ripple.100">
            <Image src={photoUrl || props.org?.profilePicture || ProfilePicture} />
          </Center>
          <Box h="10px" />
          <HStack spacing={1}>
            <UploadImageButton
              color="ripple.200"
              fontFamily="Raleway-Bold"
              borderRadius="20px"
              variant="ghost"
              size="sm"
              _hover={{
                transform: "scale(1.08)",
              }}
              buttonMessage="Change Workspace Icon"
              changeUrl={setPhotoUrl}
            />
            <Circle _hover={{ transform: "scale(1.2)" }}>
              <BiTrash style={{ color: "red" }} />
            </Circle>
          </HStack>
          <Box h="50px" />
          <Button
            bgColor="ripple.200"
            color="white"
            fontFamily="Raleway-Bold"
            borderRadius="30px"
            variant="solid"
            size="lg"
            _hover={{
              transform: "scale(1.05)",
            }}
            onClick={handleClick}
          >
            Save Changes
          </Button>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default ProfileSettings