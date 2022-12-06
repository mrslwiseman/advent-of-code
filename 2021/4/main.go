package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type submarineState struct {
	depth      int64
	horizontal int64
	aim        int64
}

func main() {
	subState := submarineState{depth: 0, horizontal: 0}

	inputBuffer, err := os.ReadFile("./input")
	if err != nil {
		fmt.Printf("panic: %v\n", err)
	}

	lines := strings.Split(string(inputBuffer), "\n")
	for _, command := range lines {
		parsedCommand := strings.Split(command, " ")

		direction := parsedCommand[0]
		increment, _ := strconv.ParseInt(parsedCommand[1], 10, 64)

		fmt.Println(parsedCommand)
		//  up down forward
		if direction == "up" {
			// subState.depth -= increment
			subState.aim -= increment
		}
		if direction == "down" {
			// subState.depth += increment
			subState.aim += increment
			// increases aim by X
		}
		if direction == "forward" {
			subState.horizontal += increment
			subState.depth += (subState.aim * increment)
			//  increases depth by aim * X
		}

		fmt.Println("d:", subState.depth, "h", subState.horizontal, "a", subState.aim)
		fmt.Println("------")

	}

	fmt.Println("d:", subState.depth, "h", subState.horizontal)
	fmt.Println(subState.depth * subState.horizontal)

}
