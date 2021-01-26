import { Box, Button, Flex } from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";

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
    console.log(items.length);
  };
  useEffect(() => {
    handleChangeAmountOfItems(10);
  }, []);

  const calculateHeight = (value: number) => {
    const percentage = (value / max) * 100;
    const str = percentage.toString() + "%";
    console.log(str);
    return str;
  };
  return (
    <Box>
      <Box>
        Set Number:
        <Button onClick={() => handleChangeAmountOfItems(10)}>10</Button>
        <Button onClick={() => handleChangeAmountOfItems(100)}>100</Button>
        {/* <Button onClick={() => handleChangeAmountOfItems(1000)}>1000</Button> */}
      </Box>
      <Flex border={"1px solid black"} minH={200}>
        {items.map((item, idx) => (
          <Flex key={idx} h={"500px"} alignItems={"flex-end"}>
            <Box
              bg="teal.300"
              mx={1}
              px={3}
              h={calculateHeight(item)}
              pos="relative"
            >
              <Box
                pos="absolute"
                bottom="-2rem"
                left="0%"
                w={"100%"}
                textAlign="center"
                fontSize="0.75rem"
              >
                {item}
              </Box>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Sorting;
