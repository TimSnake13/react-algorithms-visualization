import { useSpring, animated, useSprings } from "react-spring";
import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";

export enum columnType {
  Current,
  CompareTo,
  Sorted,
  Default,
}

interface Props {
  idx: number;
  toggle: boolean;
  calculateWidth: () => string;
  currentAmount: number;
  calculateHeight: (value: number) => string;
  item: number;
  type: columnType;
}
const DataColumn = ({
  idx,
  toggle,
  calculateWidth,
  currentAmount,
  calculateHeight,
  item,
  type,
}: Props) => {
  const props = useSpring({
    height: "100%",
    transform: `perspective(600px) translateY(${toggle ? "0%" : "100%"})`,
    delay: idx * 25,
  });
  const AnimatedBox = animated(Box);
  const assignBg = () => {
    switch (type) {
      case columnType.Current:
        return "purple.400";
      case columnType.CompareTo:
        return "yellow.400";
      case columnType.Sorted:
        return "green.200";
      case columnType.Default:
      default:
        return "blue.200";
    }
  };
  return (
    <>
      <Box w={calculateWidth()} h="100%">
        <Flex
          alignItems={"flex-end"}
          w="100%"
          h="100%"
          pos="relative"
          px={currentAmount > 50 ? "0.1rem" : "0.5rem"}
          justify="center"
        >
          <Flex
            w="100%"
            h={calculateHeight(item)}
            maxW={"2rem"}
            overflow="hidden"
          >
            <AnimatedBox
              style={props}
              w="100%"
              //   bg="teal.200"
              bg={assignBg()}
              boxShadow="0px 2px 40px #00000020, 0px 2px 5px #00000030"
            ></AnimatedBox>
          </Flex>
          <Box
            pos="absolute"
            bottom="0.75rem"
            fontWeight="700"
            left="50%"
            transform="translateX(-50%)"
            w="100%"
            maxW={"2rem"}
            textAlign="center"
            fontSize={currentAmount > 50 ? "0.5rem" : "0.75rem"}
          >
            {currentAmount < 50 && item}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default DataColumn;
