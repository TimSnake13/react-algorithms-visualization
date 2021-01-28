import { useSpring, animated, interpolate } from "react-spring";
import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { columnType, horizontalMovementType } from "../../types";

interface BoxProps {
  idx: number;
  bg: string;
  flowing: boolean;
  toggle: boolean;
  type: columnType;
  horizontalMovement: horizontalMovementType;
}

const AnimatedBox = ({
  idx,
  bg,
  flowing,
  toggle,
  type,
  horizontalMovement,
}: BoxProps) => {
  const [delay, setDelay] = useState(idx * 25);
  let skipNextAnimation = false;
  const [skip, setSkip] = useState(false);
  const assignHorizontalMovement = () => {
    switch (horizontalMovement) {
      case horizontalMovementType.Left:
        skipNextAnimation = true;
        return "-150%";
      case horizontalMovementType.Right:
        skipNextAnimation = true;
        return "150%";
      default:
        skipNextAnimation = false;
        return "0%";
    }
  };
  const props = useSpring({
    width: "100%",
    height: "100%",
    transform: `perspective(600px) translate3d(${assignHorizontalMovement()},
    ${type === columnType.Current ? "120%" : "0%"}, 0) 
    scale(${flowing ? 1.2 : 1})`,
    delay: delay,
    backgroundColor: bg,
    boxShadow: flowing
      ? "0px 2px 40px #00000020, 0px 2px 5px #00000030"
      : "0px 0px 0px #00000020, 0px 0px 0px #00000030",
    onRest: () => {
      setDelay(0);
      if (skipNextAnimation) setSkip(true);
      else setSkip(false);
    },
    immediate: skip,
  });

  return <animated.div style={props} />;
};

interface HABoxProps {
  children: any;
  w: string;
  h: string;
}

const HABox = ({ children, w, h }: HABoxProps) => {
  // const HABox = animated(Box);

  return <animated.div style={{ width: w, height: h }} children={children} />;
};

interface DataColumnProps {
  idx: number;
  toggle: boolean;
  calculateWidth: () => string;
  currentAmount: number;
  calculateHeight: (value: number) => string;
  item: number;
  type: columnType;
  horizontalMovement: horizontalMovementType;
}
const DataColumn = ({
  idx,
  toggle,
  calculateWidth,
  currentAmount,
  calculateHeight,
  item,
  type,
  horizontalMovement,
}: DataColumnProps) => {
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
      <HABox w={calculateWidth()} h="100%">
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
              type={type}
              horizontalMovement={horizontalMovement}
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
      </HABox>
    </>
  );
};

export default DataColumn;
