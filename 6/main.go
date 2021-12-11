package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func getDecimalValue(x []string) int64 {
	decimalValue, _ := strconv.ParseInt(strings.Join(x, ""), 2, 64)
	return decimalValue
}

type BitCount struct {
	setBits   []string
	unsetBits []string
}

func getBitCountArrays(lines []string, position int) BitCount {
	var setBits []string
	var unSetBits []string

	for _, line := range lines {
		if string(line[position]) == "1" {
			setBits = append(setBits, line)
		} else {
			unSetBits = append(unSetBits, line)
		}
	}

	return BitCount{setBits: setBits, unsetBits: unSetBits}
}

func readInputFile() []string {
	inputBuffer, err := os.ReadFile("./input")
	if err != nil {
		fmt.Printf("panic: %v\n", err)
	}

	lines := strings.Split(string(inputBuffer), "\n")
	return lines

}

type compare func(a int, b int) bool

func lt(a int, b int) bool {
	return a < b
}

func gte(a int, b int) bool {
	return a >= b
}

//  Todo: refactor this to use a closure so I dont have to keep passing handler through
func scan(lines []string, position int, handler compare) []string {

	if len(lines) == 1 {
		return lines
	}

	bitCounts := getBitCountArrays(lines, position)

	if handler(len(bitCounts.setBits), len(bitCounts.unsetBits)) {
		return scan(bitCounts.setBits, position+1, handler)
	}
	return scan(bitCounts.unsetBits, position+1, handler)
}

func main() {

	lines := readInputFile()

	oxygenGenerator := scan(lines, 0, gte)
	co2Scrubber := scan(lines, 0, lt)

	fmt.Println(getDecimalValue(oxygenGenerator) * getDecimalValue(co2Scrubber))
}
