#include <h8/reg3067.h>
#include <mes2.h>

void motor_fwd() {
	P4DR = 0x06 | (P4DR & 0xf0);
}
void motor_rev() {
	P4DR = 0x09 | (PADR & 0xf0)
}
void motor_stop() {
	P4DR = 0x00 | (P4DR & 0xf0);
}

void motor_rt() {
	P4DR = 0x02 | (P4DR & 0xf0);
}
void motor_lt() {
	P4DR = 0x04 | (P4DR & 0xf0);
}