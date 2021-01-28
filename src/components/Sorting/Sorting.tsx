import * as React from "react";
import { useSpring, animated, useSprings } from "react-spring";
import { Box, Button, Flex, Progress } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import DataColumn from "./DataColumn";
import { columnType, horizontalMovementType } from "../../types";

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
    // loopingRef.current = !loopingRef.current;
  };

  const [opsIdx, setOpsIdx] = useState(0);
  const idxRef = useRef(opsIdx);
  idxRef.current = opsIdx;
  const [operations, setOperations] = useState<Operation[]>([]);
  // useEffect(() => {
  //   console.log(opsIdx);
  //   console.log(operations[opsIdx]);
  // }, [opsIdx]);

  const runAlgorithm = () => {
    // ******   Store Result First   *******
    if (loopingRef.current) {
      // ******   Insertion Sort   *******
      // calculateSteps(items);
      // * Operations:
      // * 1. Selection
      // * 2. Compare
      // * 3. Switch position or not
      // * Repeat 1.

      // ******   Run Algorithm   *******
      // console.log("Looping");
      var nextloop;
      if (!(idxRef.current + 1 > operations.length - 1)) {
        setOpsIdx((_idx) =>
          _idx + 1 > operations.length - 1 ? _idx : _idx + 1
        );
        nextloop = setTimeout(runAlgorithm, 1000);
        // console.log("Next");
        // console.log("opsIdx + 1: " + (idxRef.current + 1));
        // console.log("ops.length - 1: " + (operations.length - 1));
      } else {
        // console.log("Stop");
        setLooping(false);
        clearTimeout(nextloop);
      }
    }
  };

  useEffect(() => {
    if (looping) setTimeout(runAlgorithm, 1000);
  }, [looping]);

  const assignColumnType = (index: number, op: Operation) => {
    switch (index) {
      case op.current:
        return columnType.Current;
      case op.compareTo:
        return columnType.CompareTo;
      default:
        if (op.sorted?.find((value) => value === index)) {
          //FIXME: first column value 0 somehow can not assign a sorted type
          return columnType.Sorted;
        } else return columnType.Default;
    }
  };

  const [toggle, setToggle] = useState(false);
  const sceneReadyRef = useRef(toggle);
  sceneReadyRef.current = toggle;
  useEffect(() => {
    handleChangeAmountOfItems(10);
    setTimeout(() => {
      setToggle(true);
      // sceneReadyRef.current = !sceneReadyRef.current;
    }, 1000);
  }, []);

  // const [props, set] = useSpring(() => ({
  //   to: async (next, cancel) => {
  //     await next({ height: "500px" });
  //   },
  //   from: { height: "0px" },
  // }));

  const assignHorizontalMovement = (_idx: number, op: Operation) => {
    if (op.moveLeft === _idx) return horizontalMovementType.Left;
    else if (op.moveRight === _idx) return horizontalMovementType.Right;
    else return horizontalMovementType.None;
  };

  return (
    <Box px={"8rem"}>
      <Box>
        <Button onClick={() => handleChangeAmountOfItems()}>
          Randomize Array
        </Button>
        <Button onClick={() => setToggle((state) => !state)}>Toggle</Button>
      </Box>
      <Box>
        Set Number:
        <Button onClick={() => handleChangeAmountOfItems(10)}>10</Button>
        <Button onClick={() => handleChangeAmountOfItems(100)}>100</Button>
        {/* <Button onClick={() => handleChangeAmountOfItems(1000)}>1000</Button> */}
      </Box>
      <Box>
        Algorithms:
        <Button
          onClick={() =>
            calculateSteps(items).then((res) => setOperations(res))
          }
        >
          Insert Sort
        </Button>
      </Box>
      <Flex minH={200} flexDirection="column">
        <Progress hasStripe value={64} h={5} w={"100%"} />
        <Box mb="5rem">
          <Button
            disabled={opsIdx - 1 < 0}
            onClick={() => setOpsIdx((state) => state - 1)}
          >
            Previous Step
          </Button>
          <Button onClick={() => toggleLoop()}>
            {looping ? "Stop" : "Start"}
          </Button>
          <Button disabled={opsIdx === 0} onClick={() => setOpsIdx(0)}>
            Reset
          </Button>
          <Button
            disabled={opsIdx + 1 > operations.length - 1}
            onClick={() => setOpsIdx((state) => state + 1)}
          >
            Next Step
          </Button>
        </Box>
        <Flex
          flexDirection="row"
          h="500px"
          // overflow={"hidden"}
          overflow={sceneReadyRef.current ? "inherit" : "hidden"}
        >
          {operations[opsIdx]?.array.map((item, idx) => (
            <DataColumn
              key={idx}
              idx={idx}
              toggle={toggle}
              calculateWidth={calculateWidth}
              currentAmount={currentAmount}
              calculateHeight={calculateHeight}
              item={item}
              type={assignColumnType(idx, operations[opsIdx])}
              horizontalMovement={assignHorizontalMovement(
                idx,
                operations[opsIdx]
              )}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sorting;

type Operation = {
  current?: number;
  compareTo?: number;
  sorted?: number[];
  moveLeft?: number;
  moveRight?: number;
  array: number[];
};

async function calculateSteps(items: number[]) {
  const ops: Operation[] = [];
  const inputArr = [...items];
  ops.push({ array: [...inputArr] });

  let n = inputArr.length;
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = inputArr[i];
    ops.push({ current: i, array: [...inputArr] });
    // The last element of our sorted subarray
    let j = i - 1;
    ops.push({ current: i, compareTo: j, array: [...inputArr] });
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      // Move sorted element to the right by 1
      inputArr[j] = current;
      ops.push({
        current: i,
        compareTo: j,
        moveLeft: i,
        moveRight: j,
        array: [...inputArr],
      });
      ops.push({ current: j, compareTo: j - 1, array: [...inputArr] });
      j--;
    }
    inputArr[j + 1] = current;
    ops.push({ current: i, array: [...inputArr] });
  }
  // All sorted
  const sorted = [];
  for (let i = 0; i < n; i++) {
    sorted.push(i);
  }
  ops.push({ sorted, array: [...inputArr] });
  return ops;
}
