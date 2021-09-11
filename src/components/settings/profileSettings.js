import * as React from "react"

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
  useMediaQuery,
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
} from "@chakra-ui/react"

import SignUpIll from "../../images/RippleDexDark.svg"
import ProfilePicture from "../../images/RippleDEXWhite.svg"

import {
  BiBuildings,
  BiPalette,
  BiBell,
  BiUserCircle,
  BiTrash,
  BiSearch,
} from "react-icons/bi"

const ProfileSettings = props => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  return (
    <Modal size="3xl" isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent pos="absolute" borderRadius="20px" pt="10px" pb="10px">
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
            </TabList>
            <TabPanels pl="5px" pr="5px">
              <TabPanel>
                <ProfileTab />
              </TabPanel>
              <TabPanel>
                <NotificationsTab />
              </TabPanel>
              <TabPanel>
                <p>Coming Soon!</p>
              </TabPanel>
              <TabPanel>
                <OrganizationsTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const ProfileTab = () => {
  return (
    <VStack>
      <HStack align="start" spacing={5}>
        <VStack textAlign="left" spacing={5}>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              First Name
            </Text>
            <Input variant="outline" placeholder="First Name" type="text" />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Last Name
            </Text>
            <Input placeholder="Last Name" type="text" />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Position at Company
            </Text>
            <Input placeholder="Position at Company" type="text" />
          </Box>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Phone Number
            </Text>
            <Input placeholder="Phone Number" type="text" />
          </Box>
        </VStack>
        <Spacer />
        <VStack spacing={0}>
          <Center h="200px" w="200px" bgColor="ripple.100">
            <Image src={ProfilePicture} />
          </Center>
          <Box h="10px" />
          <HStack spacing={1}>
            <Button
              color="ripple.200"
              fontFamily="Raleway-Bold"
              borderRadius="20px"
              variant="ghost"
              size="sm"
              _hover={{
                transform: "scale(1.08)",
              }}
            >
              Change Profile Picture
            </Button>
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
          >
            Save Changes
          </Button>
        </VStack>
      </HStack>
    </VStack>
  )
}

const NotificationsTab = () => {
  return (
    <VStack spacing={3} align="start">
      <Text color="ripple.200">Notify me about ...</Text>
      <HStack>
        <Switch colorScheme="green" />
        <Text>New Meetings</Text>
      </HStack>
      <HStack>
        <Switch colorScheme="green" />
        <Text>New Members</Text>
      </HStack>
      <br />
      <Text color="ripple.200">Customize Notifications</Text>
      <RadioGroup colorScheme="green">
        <Stack spacing={3}>
          <Radio value="1">Send Notifications Live</Radio>
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

const OrganizationsTab = () => {
  return (
    <VStack>
      <HStack align="start" spacing={4}>
        <VStack textAlign="left" spacing={5}>
          <Box textAlign="left" w="300px">
            <Text color="ripple.200" pb="5px" fontSize="12px">
              Workspace Name
            </Text>
            <Input variant="outline" placeholder="First Name" type="text" />
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
          <Box padding="6" w="100%">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </VStack>
        <Spacer />
        <VStack spacing={0}>
          <Center h="200px" w="200px" bgColor="ripple.100">
            <Image src={ProfilePicture} />
          </Center>
          <Box h="10px" />
          <HStack spacing={1}>
            <Button
              color="ripple.200"
              fontFamily="Raleway-Bold"
              borderRadius="20px"
              variant="ghost"
              size="sm"
              _hover={{
                transform: "scale(1.08)",
              }}
            >
              Change Workspace Icon
            </Button>
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
          >
            Save Changes
          </Button>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default ProfileSettings
