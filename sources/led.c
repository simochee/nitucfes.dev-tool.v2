#include <h8/reg3067.h>
#include <mes2.h>

extern int led_count;

void led_flash(int port) {
	if(led_count < 50) {
		P6DR &= port;
	} else {
		P6DR |= ~port;
	}
}