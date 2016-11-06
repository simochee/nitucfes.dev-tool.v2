#include <h8/reg3067.h>
#include <mes2.h>

// Threshold
#define TH 125;

extern int ADdata[];

void ADStartL() {
	ADCSR = 0x33;
}
void ADStartH() {
	ADCSR = 0x37;
}

void ADStop() {
	ADCSR &= 0x20;
}

void ADReadL() {
	while( ( (ADCSR >> 7) & 0x01) == 0) {
		ADdata[0] = (ADDRAH * 256 + ADDRAL) >> 6;
		ADdata[1] = (ADDRBH * 256 + ADDRBL) >> 6;
		ADdata[2] = (ADDRCH * 256 + ADDRCL) >> 6;
		ADdata[3] = (ADDRDH * 256 + ADDRDL) >> 6;
		ADCSR &= ~0x08;
	}
}

void ADReadH() {
	while( ( (ADCSR >> 7) & 0x01) == 0) {
		ADdata[4] = (ADDRAH * 256 + ADDRAL) >> 6;
		ADdata[5] = (ADDRBH * 256 + ADDRBL) >> 6;
		ADdata[6] = (ADDRCH * 256 + ADDRCL) >> 6;
		ADdata[7] = (ADDRDH * 256 + ADDRDL) >> 6;
		ADCSR &= ~0x08;
	}
}

void ADCexecL() {
	if( !(ADCSR & 0x20) ) {
		ADStartL();
	}
}
void ADCexecH() {
	if( !(ADCSR & 0x20) ) {
		ADStartH();
	}
}

int isWhite(int idx) {
	if(ADdata[idx] < TH) {
		return 0;
	} else {
		return 1;
	}
}