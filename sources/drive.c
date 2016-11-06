#include <h8/reg3067.h>
#include <mes2.h>

#include "ad_conv.h"
#include "motor.h"
#include "led.h"

/*
 * 利用可能な関数
 * A/D変換
 *   int isWhite(int idx)：idxのセンサが白か（白なら1(true)、黒なら0(false)）
 * モータ
 *   void motor_fwd()
 *   void motor_rev()
 *   void motor_stop()
 *   void motor_rt()
 *   void motor_lt()
 * LED
 *   void led_flash(int port)：portで指定されたLEDを点滅させる
 */

void motor_drive() {
	// Original code here!
}