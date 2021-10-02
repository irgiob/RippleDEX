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

/**
 * Custom Auto-Complete component
 *
 * @param {String}    placeholder the text in the input box when no input
 * @param {[Object]}  items list of items that represent options that show up when searching
 * @param {Component} itemRender component that displays single object from items, takes said item as input
 * @param {Boolean}   disableCreateItem toggles whether user can create new item from autocomplete
 * @param {function}  onCreateItem runs function when user tries to create new item
 * @param {Object}    value the currently selected item from the list of itmes
 * @param {function}  onChange runs when new item is selected, takes selected item as input
 * @param {String}    valueInputAttribute which field in the item object is used when displaying the item
 * @param {Boolean}   showImage if true, item will display with image taken from .profilePicture field (default)
 * @param {String}    size how big the input element of the auto complete should be using Chakra UI sizes
 * @param {String}    variant which variant of the input should be used
 * @param {String}    focusBorderColor the color of the input's border when selected
 */
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
        // selects the new selected item and then unfocus out of the input
        onChange(c.selectedItems[0])
        document.activeElement.blur()
      }}
      onCreateItem={onCreateItem}
      tagStyleProps={{ display: "none" }}
      listStyleProps={{ position: "absolute", zIndex: "10" }}
      renderCustomInput={inputProps =>
        // show list item with clear button if item is selected, else show input
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

/**
 * Basic list item used together with the CustomAutoComplete
 * @param {String}  name the main text shown in each list item
 * @param {String}  profilePicture image to display next to text
 * @param {Boolean} showImage toggles if image needs to be displayed at all (true by default)
 */
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
