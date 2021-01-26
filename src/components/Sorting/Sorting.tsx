import { Box, Button, Flex } from "@chakra-ui/react";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const Sorting = () => {
  const [items, setItems] = useState<number[]>([]);
  const [currentAmount, setCurrentAmount] = useState(10);
  const [max, setMax] = useState(100);
  const handleChangeAmountOfItems = (num?: number) => {
    if (num) setCurrentAmount(num);
    else num = currentAmount;

    const maxNumber = num * 10;

    let i = 1;
    const newArray = [];
    for (;;) {
      if (i > num) break;
      const newItem = Math.floor(Math.random() * maxNumber) + 1;
      newArray.push(newItem);
      i++;
    }
    setItems(newArray);
    setMax(maxNumber);
  };

  const calculateHeight = (value: number) => {
    const percentage = (value / max) * 100;
    return percentage.toString() + "%";
  };
  const calculateWidth = useCallback(() => {
    const percentage = 100 / currentAmount;
    return percentage.toString() + "%";
  }, [currentAmount]);

  const [looping, setLooping] = useState(false);
  const loopingRef = useRef(looping);
  loopingRef.current = looping;

  const toggleLoop = () => {
    setLooping((current) => !current);
  };
  const runAlgorithm = useCallback(() => {
    // Using ref = always up to date
    if (loopingRef.current) {
      // ******   Run Algorithm   *******
      console.log("Looping");
    }

    setTimeout(runAlgorithm, 1000);
  }, []);

  useEffect(() => {
    handleChangeAmountOfItems(10);
    runAlgorithm();
  }, []);
  return (
    <Box px={"8rem"}>
      <Box>
        <Button onClick={() => handleChangeAmountOfItems()}>
          Randomize Array
        </Button>
      </Box>
      <Box>
        Set Number:
        <Button onClick={() => handleChangeAmountOfItems(10)}>10</Button>
        <Button onClick={() => handleChangeAmountOfItems(100)}>100</Button>
        {/* <Button onClick={() => handleChangeAmountOfItems(1000)}>1000</Button> */}
      </Box>
      <Flex minH={200}>
        {items.map((item, idx) => (
          <Flex
            key={idx}
            h="500px"
            w={calculateWidth()}
            alignItems={"flex-end"}
          >
            <Box
              bg="teal.300"
              // mx={1}
              // px={3}
              mx={currentAmount > 50 ? "0.1rem" : "0.5rem"}
              h={calculateHeight(item)}
              w="100%"
              pos="relative"
            >
              <Box
                pos="absolute"
                bottom="-2rem"
                left="0%"
                textAlign="center"
                w="100%"
                fontSize={currentAmount > 50 ? "0.5rem" : "0.75rem"}
              >
                {currentAmount < 50 && item}
              </Box>
            </Box>
          </Flex>
        ))}
      </Flex>
      <Box mt="5rem">
        <Button onClick={() => toggleLoop()}>
          {looping ? "Stop" : "Start"}
        </Button>
      </Box>
    </Box>
  );
};

export default Sorting;
