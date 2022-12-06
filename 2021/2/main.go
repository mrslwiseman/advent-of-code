package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	inputBuffer, err := os.ReadFile("./input")
	if err != nil {
		fmt.Printf("panic: %v\n", err)
	}

	var windowA, windowB, windowC string = "", "", ""
	var increases, windowIndex = 0, 0
	var prevWindowDepth int64 = -1

	items := strings.Split(string(inputBuffer), "\n")
	for position, _ := range items {

		if position+2 == len(items) {
			fmt.Println(">>>>", increases)
			return
		}
		windowA = items[position]
		windowB = items[position+1]
		windowC = items[position+2]

		fmt.Println("A", windowA, "B", windowB, "C", windowC)
		fmt.Println("wIndex", windowIndex, position)

		windowAInt, _ := strconv.ParseInt(windowA, 10, 64)
		windowBInt, _ := strconv.ParseInt(windowB, 10, 64)
		windowCInt, _ := strconv.ParseInt(windowC, 10, 64)

		windowSum := windowAInt + windowBInt + windowCInt

		fmt.Println("window depth:", windowSum)
		fmt.Println()

		if prevWindowDepth != -1 && windowSum > prevWindowDepth {
			// fmt.Println(prevWindowDepth, sum, "INCREASED")
			increases += 1
		}
		prevWindowDepth = windowSum

	}

}
