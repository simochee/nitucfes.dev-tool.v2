#include <h8/reg3067.h>
#include <mes2.h>

// Each terminal initialization
void init() {
	// Setting of the motor terminal
	P4DDR = 0x0f;
	// Setting of the LED terminal
	P6DDR = 0x07;
	// Setting of the switches terminal
	PADDR = 0x0f;
}