import { Box, Button, Flex } from "@chakra-ui/react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

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
  useEffect(() => {
    handleChangeAmountOfItems(10);
  }, []);

  const calculateHeight = (value: number) => {
    const percentage = (value / max) * 100;

    return percentage.toString() + "%";
  };
  const calculateWidth = useCallback(() => {
    const percentage = 100 / currentAmount;
    console.log(percentage);
    return percentage.toString() + "%";
  }, [currentAmount]);

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
    </Box>
  );
};

export default Sorting;
