# javascript date notes

#### Wzup event component   

> datetime, date, time inputs from Wzup event component

```
    let date_inputs = supported ? (
      <input
      className={`wzup_date_${iUN} datetime_input wzup_input`} type="datetime-local"
      ref={datetime_input_ref}
      name={``}
      onChange={update_input}
      defaultValue={default_datetime.current} />
    ) : (
      <>
        <input
        className={`wzup_date_${iUN} date_input wzup_input`}
        ref={date_input_ref}
        type="date" name={``}
        onChange={update_input}
        defaultValue={default_date.current}/>
        <input
        className={`wzup_date_${iUN} time_input wzup_input`}
        ref={time_input_ref}
        type="time" name={``}
        onChange={update_input}
        defaultValue={default_time.current}/>
      </>
    )
```
// datetime returns "2021-04-15T17:06"
// date returns "2021-04-21"
// time returns "17:16" // 24 hr format


#### how do i turn the into timestamps?   

```
d = new Date("2021-04-15T17:06");
d.getTime();
```
> works

```
  let my_date ="2021-04-21"
  let my_time ="17:16"
  d = new Date(`${my_date} ${my_time}`);
  d.getTime();
```
> works

> both return 1619039760000

#### how do you convert from a timestamp

datetime

```
  new Date().toISOString("1619039760000");// works
  new Date("1619039760000").toISOString();// fails RangeError: Invalid time value
  new Date("1619039760000").toString();// fails RangeError: Invalid time value

  // fails because the string has to be a number
```

#### format for the datetime-local input - timestamp to date
```
new Date(Number("1619039760000")).toISOString();// works
```
> returns "2021-04-21T21:16:00.000Z"


#### another working example
```
new Date(Number("1619039760000")).toString();// works
```
> returns "Wed Apr 21 2021 17:16:00 GMT-0400 (Eastern Daylight Time)"

#### milliseconds to date

```
new Date(Number("1619039760000")).toDateString()
```
> returns "Wed Apr 21 2021"

#### milliseconds to time

```
  Date(Number("1619039760000")).toLocaleTimeString()
  // returns "5:16:00 PM"

  new Date(Number("1619039760000")).toTimeString();
  // returns "17:16:00 GMT-0400 (Eastern Daylight Time)"
```
#### GOTCHA [t.getDay() returns day of the week use getDate() starting at zero](https://stackoverflow.com/questions/13359294/date-getday-javascript-returns-wrong-day)   
> The value returned by getDay is an integer corresponding to the day of the week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.

#### date format outputs

```
  d = new Date(	"Thu May 28 2020 21:27:08 GMT-0400 (Eastern Daylight Time")
  // Thu May 28 2020 21:27:08 GMT-0400 (Eastern Daylight Time)

  d.toDateString()
  // "Thu May 28 2020"
  d.toGMTString()
  // "Fri, 29 May 2020 01:27:08 GMT"

  d.toISOString()
  // "2020-05-29T01:27:08.000Z"

  d.toJSON()
  // "2020-05-29T01:27:08.000Z"

  d.toLocaleDateString()
  // "5/28/2020"

  d.toLocaleString()
  // "5/28/2020, 9:27:08 PM"

  d.toLocaleTimeString()
  // "9:27:08 PM"
  
  d.toString()
  // "Thu May 28 2020 21:27:08 GMT-0400 (Eastern Daylight Time)"
  
  d.toTimeString()
  // "21:27:08 GMT-0400 (Eastern Daylight Time)"
  
  d.toUTCString()
  // "Fri, 29 May 2020 01:27:08 GMT"
```