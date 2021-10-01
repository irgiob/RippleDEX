import React from "react"
import { CUIAutoComplete } from "chakra-ui-autocomplete"
import {
  Input,
  Tooltip,
  Flex,
  Avatar,
  Text,
  Box,
  Spacer,
} from "@chakra-ui/react"
import { AiOutlineClose } from "react-icons/ai"

export const CustomAutoComplete = ({
  placeholder,
  items,
  itemRenderer,
  disableCreateItem,
  onCreateItem,
  value,
  onChange,
  valueInputAttribute,
  showImage,
  size,
  variant,
  focusBorderColor,
}) => {
  return (
    <CUIAutoComplete
      placeholder={placeholder}
      items={items}
      itemRenderer={itemRenderer}
      disableCreateItem={disableCreateItem}
      hideToggleButton={true}
      selectedItems={value !== undefined ? [value] : []}
      onSelectedItemsChange={c => {
        onChange(c.selectedItems[0])
        document.activeElement.blur()
      }}
      onCreateItem={onCreateItem}
      tagStyleProps={{ display: "none" }}
      renderCustomInput={inputProps =>
        value ? (
          <Flex flexDir="row" alignItems="center" w="100%">
            <AutoCompleteListItem
              name={value[valueInputAttribute]}
              profilePicture={value.profilePicture}
              showImage={showImage}
            />
            <Spacer />
            <Tooltip label="Clear">
              <Box>
                <AiOutlineClose onClick={() => onChange(undefined)} />
              </Box>
            </Tooltip>
          </Flex>
        ) : (
          <Input
            {...inputProps}
            size={size}
            variant={variant}
            focusBorderColor={focusBorderColor}
          />
        )
      }
    />
  )
}

export const AutoCompleteListItem = ({
  name,
  profilePicture,
  showImage = true,
}) => {
  return (
    <Flex flexDir="row" alignItems="center">
      {showImage && (
        <Avatar mr="0.5em" name={name} size="sm" src={profilePicture} />
      )}
      <Text>{name}</Text>
    </Flex>
  )
}
