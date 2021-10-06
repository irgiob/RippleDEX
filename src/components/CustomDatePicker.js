import React, { useState, useEffect } from "react"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  HStack,
  Switch,
  Spacer,
  Text,
} from "@chakra-ui/react"

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"

import DatePicker from "react-datepicker"

const CustomDatePicker = ({ children, times, setTimes }) => {
  const oneDay = 24 * 60 * 60 * 1000
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [date, setDate] = useState()
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [allDay, setAllDay] = useState(false)

  useEffect(() => {
    if (date) {
      var startDate = new Date(date)
      var endDate = new Date(date)
      if (!allDay) {
        if (start) startDate.setHours(start.getHours(), start.getMinutes())
        if (end) endDate.setHours(end.getHours(), end.getMinutes())
      } else {
        endDate = null
      }
      if (
        !times ||
        times[0]?.getTime() !== startDate?.getTime() ||
        times[1]?.getTime() !== endDate?.getTime()
      )
        setTimes([startDate, endDate])
    }
  }, [date, start, end, allDay, times, setTimes])

  const CustomHeader = ({ monthDate, decreaseMonth, increaseMonth }) => (
    <HStack>
      <RiArrowLeftSLine onClick={decreaseMonth} size="2rem" />
      <Text>
        {monthDate.toLocaleString("en-US", { month: "short", year: "numeric" })}
      </Text>
      <Spacer />
      <Text>All Day?</Text>
      <Switch isChecked={allDay} onChange={e => setAllDay(!allDay)} />
      <RiArrowRightSLine onClick={increaseMonth} size="2rem" />
    </HStack>
  )

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent w="100%" h="100%">
          <HStack spacing="0" mb="-0.5em" align="stretch">
            <DatePicker
              inline
              fixedHeight
              selected={date}
              onChange={setDate}
              renderCustomHeader={CustomHeader}
              disabledKeyboardNavigation
            />
            {!allDay && date && (
              <DatePicker
                inline
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Start"
                selected={start}
                onChange={setStart}
                timeIntervals={15}
              />
            )}
            {!allDay && date && start && (
              <DatePicker
                inline
                showTimeSelect
                showTimeSelectOnly
                timeCaption="End"
                selected={end}
                onChange={setEnd}
                timeIntervals={15}
                minTime={start ? start.getTime() : today.getTime()}
                maxTime={today.getTime() + oneDay - 1}
              />
            )}
          </HStack>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default CustomDatePicker
