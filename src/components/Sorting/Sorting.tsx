import * as React from "react";
import { useSpring, animated, useSprings } from "react-spring";
import { Box, Button, Flex, Progress } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import DataColumn from "./DataColumn";

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
  const [selectedIdx, setSelectedIdx] = useState<Operation[]>([]);
  const runAlgorithm = useCallback(() => {
    // Using ref = always up to date
    if (loopingRef.current) {
      // ******   Run Algorithm   *******
      console.log("Looping");

      // ******   Insertion Sort   *******
      const operations = [];
      let n = items.length;
      for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = items[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while (j > -1 && current < items[j]) {
          items[j + 1] = items[j];
          j--;
        }
        items[j + 1] = current;
      }
      // * Operations:
      // * 1. Selection
      // * 2. Compare
      // * 3. Switch position or not
      // * Repeat 1.
    }

    setTimeout(runAlgorithm, 1000);
  }, []);

  useEffect(() => {
    handleChangeAmountOfItems(10);
    setTimeout(() => setToggle(true), 1000);
    runAlgorithm();
  }, []);

  // const [props, set] = useSpring(() => ({
  //   to: async (next, cancel) => {
  //     await next({ height: "500px" });
  //   },
  //   from: { height: "0px" },
  // }));
  const [toggle, setToggle] = useState(false);
  const props = useSpring({ opacity: toggle ? 1 : 0 });

  return (
    <Box px={"8rem"}>
      <Box>
        <Button onClick={() => handleChangeAmountOfItems()}>
          Randomize Array
        </Button>
        <Button onClick={() => setToggle((current) => !current)}>
          TToggle
        </Button>
      </Box>
      <Box>
        Set Number:
        <Button onClick={() => handleChangeAmountOfItems(10)}>10</Button>
        <Button onClick={() => handleChangeAmountOfItems(100)}>100</Button>
        {/* <Button onClick={() => handleChangeAmountOfItems(1000)}>1000</Button> */}
      </Box>
      <Flex minH={200} flexDirection="column">
        <Progress hasStripe value={64} h={5} w={"100%"} />
        <Box mb="5rem">
          <Button onClick={() => toggleLoop()}>
            {looping ? "Stop" : "Start"}
          </Button>
        </Box>
        <Flex flexDirection="row" h="500px">
          {items.map((item, idx) => (
            <DataColumn
              key={idx}
              idx={idx}
              toggle={toggle}
              calculateWidth={calculateWidth}
              currentAmount={currentAmount}
              calculateHeight={calculateHeight}
              item={item}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

type Operation = {
  current: number;
  compareTo: number;
  sorted?: number[];
};

export default Sorting;
