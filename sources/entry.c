// Include the header
#include <h8/reg3067.h>
#include <mes2.h>

// The number of clocks per 0.01s
#define SYSCLOCK 20000000.0
#define COUNT_MAX ( (int)(SYSCLOCK/8192/100) + 0.5 )

// Count of the operation
int car_count;
// Count of the LED
int led_count;

// Include the modules
#include "init.h"	// Each terminal initialization
#include "ad_conv.h"	// A/D conversion module
#include "motor.h"	// Operation module
#include "drive.h"	// Motor control module
#include "led.h"	// LED control module

// Store the results of the A/D conversion
int ADdata[8] = {0, 0, 0, 0, 0, 0, 0, 0};

#pragma interrupt
// Timer setting for the operation
void operation_timer_handler() {
	load_segment(36);
	TCSR0_8 &= ~0x40;
	count++;
	if(count > 10) {
		count = 0;
	}
}
// Timer setting for the LED
void led_timer_handler() {
	load_segment(36);
	TCSR0_8 &= ~0x40;
	t_count++;
	if(t_count > 100) {
		count = 0;
	}
}

int main(void) {
	// Terminals initialization
	init();

	// Robot start-up flag
	int startup_flag = 0;

	// Timer start
	set_handler(36, operation_timer_handler);
	set_handler(36, led_timer_handler);
	TCORA0_8 = COUNT_MAX - 1;
	TCSR0_8 = 0x02;
	TCNT0_8 = 0;
	TCR0_8 = 0x4b;

	while(1) {

		// A/D conversion
		// AN0-AN3
		ADCexecL();
		ADReadL();
		ADStop();
		// AN4-AN7
		ADCexecH();
		ADReadH();
		ADStop();

		// Robot operation
		if(startup_flag) {
			motor_drive();
		} else {
			motor_stop();
			// All LED flashes
			led_flash(0x07);
		}
	}
}