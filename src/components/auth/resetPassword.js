import React, { useState } from "react"

import { resetPassword } from "../../utils/AuthFunctions"

import {
  Text,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useToast,
} from "@chakra-ui/react"

export const ResetPasswordPopup = ({ children, email, readOnly }) => {
  const [userEmail, setEmail] = useState(email)
  const toast = useToast()

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Text color="ripple.200">Reset Password</Text>
          <Input
            mt="0.5em"
            variant="outline"
            placeholder="Email Address"
            type="text"
            readOnly={readOnly}
            value={userEmail}
            name="email"
            onChange={event => setEmail(event.target.value)}
          />
          <Button
            mt="1em"
            disabled={!userEmail}
            bgColor="ripple.200"
            color="white"
            fontFamily="Raleway-Bold"
            borderRadius="30px"
            variant="solid"
            onClick={async () => {
              await resetPassword(userEmail)
              toast({
                title: "Password reset email sent",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
            }}
          >
            Send reset email
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
