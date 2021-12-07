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

	var prev string = ""
	var increases int = 0

	for _, currentDepth := range strings.Split(string(inputBuffer), "\n") {
		prevInt, _ := strconv.ParseInt(prev, 10, 64)
		currentInt, _ := strconv.ParseInt(currentDepth, 10, 64)
		if prev != "" && prevInt < currentInt {
			// fmt.Println(currentDepth, "INCREASED")
			increases += 1
		} else {
			// fmt.Println(currentDepth, "NO INCREASE")
		}
		prev = currentDepth

	}

	fmt.Println(increases)
}
