import { useSpring, animated, interpolate } from "react-spring";
import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface BoxProps {
  idx: number;
  bg: string;
  flowing: boolean;
  toggle: boolean;
}

const AnimatedBox = ({ idx, bg, flowing, toggle }: BoxProps) => {
  const [delay, setDelay] = useState(idx * 25);
  const AnimatedBox = animated(Box);
  const props = useSpring({
    height: "100%",
    transform: `perspective(600px) translateY(${
      toggle ? "0%" : "100%"
    }) scale(${flowing ? 1.2 : 1})`,
    delay: delay,
    backgroundColor: bg,

    boxShadow: flowing
      ? "0px 2px 40px #00000020, 0px 2px 5px #00000030"
      : "0px 0px 0px #00000020, 0px 0px 0px #00000030",
    onRest: () => {
      setDelay(0);
    },
  });

  return (
    <AnimatedBox
      style={props}
      w="100%"
      //   bg="teal.200"
      //   bg={assignBg()}
      //   boxShadow="0px 2px 40px #00000020, 0px 2px 5px #00000030"
    ></AnimatedBox>
  );
};

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
  // const flowingRef = useRef(false);
  const [flowing, setFlowing] = useState(false);
  const assignBg = () => {
    switch (type) {
      case columnType.Current:
        return "#0987A0";
      case columnType.CompareTo:
        return "#3182CE";
      case columnType.Sorted:
        return "#48BB78";
      case columnType.Default:
      default:
        return "#76E4F7";
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
          //   overflow="hidden"
        >
          <Flex
            w="100%"
            h={calculateHeight(item)}
            maxW={"2rem"}
            onClick={() => {
              setFlowing((s) => !s);
            }}
          >
            <AnimatedBox
              bg={assignBg()}
              flowing={flowing}
              idx={idx}
              toggle={toggle}
            ></AnimatedBox>
          </Flex>
          <Box
            pos="absolute"
            bottom="0.1rem"
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
