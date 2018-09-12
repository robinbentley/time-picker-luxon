/* eslint no-console:0 */

import 'rc-time-picker-luxon/assets/index.less';

import React from 'react';
import ReactDom from 'react-dom';

import { DateTime } from 'luxon';

import TimePicker from 'rc-time-picker-luxon';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const now = DateTime.fromObject({ hour: 14, minute: 30 });

function generateOptions(length, excludedOptions) {
  const arr = [];
  for (let value = 0; value < length; value++) {
    if (excludedOptions.indexOf(value) < 0) {
      arr.push(value);
    }
  }
  return arr;
}

function onChange(value) {
  console.log(value && value.toFormat(str));
}

function disabledHours() {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
}

function disabledMinutes(h) {
  switch (h) {
    case 9:
      return generateOptions(60, [30]);
    case 21:
      return generateOptions(60, [0]);
    default:
      return generateOptions(60, [0, 30]);
  }
}

function disabledSeconds(h, m) {
  return [h + m % 60];
}

ReactDom.render(
  <div>
    <h3>Disabled picker</h3>
    <TimePicker
      defaultValue={now}
      disabled
      onChange={onChange}
    />
    <h3>Disabled options</h3>
    <TimePicker
      showSecond={showSecond}
      defaultValue={now}
      className="xxx"
      onChange={onChange}
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      disabledSeconds={disabledSeconds}
    />
  </div>
, document.getElementById('__react-content'));
