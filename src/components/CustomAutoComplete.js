import React from "react"
import { CUIAutoComplete } from "chakra-ui-autocomplete"
import {
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  Flex,
  Avatar,
  Text,
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
          <InputGroup>
            <Input
              value={value[valueInputAttribute]}
              size="sm"
              variant="flushed"
              focusBorderColor="ripple.200"
              readOnly
            />
            <Tooltip label="Clear">
              <InputRightElement
                children={<AiOutlineClose />}
                onClick={() => onChange(undefined)}
              />
            </Tooltip>
          </InputGroup>
        ) : (
          <Input
            {...inputProps}
            size="sm"
            variant="flushed"
            focusBorderColor="ripple.200"
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
