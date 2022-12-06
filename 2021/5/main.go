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

	lines := strings.Split(string(inputBuffer), "\n")

	positionSetBitCount := 0

	var gammaBits []string
	var epsilonBits []string

	for i := 0; i < 12; i++ {
		var mostCommonBit string
		for _, line := range lines {

			bits := strings.Split(line, "")
			bit := bits[i]

			if (bit) == "1" {
				positionSetBitCount += 1
			}

		}

		if positionSetBitCount > len(lines)/2 {
			mostCommonBit = "1"
		} else {
			mostCommonBit = "0"
		}

		gammaBits = append(gammaBits, mostCommonBit)
		positionSetBitCount = 0
	}

	for _, v := range gammaBits {
		if v == "1" {
			epsilonBits = append(epsilonBits, "0")
		} else {
			epsilonBits = append(epsilonBits, "1")
		}
	}

	gammaDecimal, _ := strconv.ParseInt(strings.Join(gammaBits, ""), 2, 64)
	fmt.Println(gammaDecimal)
	epsilonDecimal, _ := strconv.ParseInt(strings.Join(epsilonBits, ""), 2, 64)
	fmt.Println(epsilonDecimal)

	fmt.Println(gammaDecimal * epsilonDecimal)

}
