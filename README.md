# project3server

[tutorial used](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)

## ESP data

### GET Requests:
- **/esp/:id/:amount** :id = esp you want to select. :amount = amount of enterys you want to see.

example: 
```
/esp/esp1/100
```

### Post Requests:
**/esp/:id/:sensor1/:sensor2/:sensor3** :id = esp you are posting from. :sensor1 = sensor data PIR. :sensor2 = sensor data ldr. :sensor3 = sound sensor data 

example: 
```
/esp/esp1/1/1024/312
```

## Alarmen
Values with a `:` are parameters, and can be edited.
All date values are in numbers, years written in full ie. 2016, months written in numbers: 1 is January, 12 is December.

###GET Requests:
- **/alarm/all** Get all the documents in the collection
- **/alarm/:id** Get alarm with specific id
- **/alarm/latest** Get the latest document in the collection

- **/alarm/day/:day/:month/:year** Get all the alarms per day
- **/alarm/month/:month/:year** Get all the alarms per month
- **/alarm/year/:year** Get all the alarms per year

- **/alarm/day/:day/:month/:year/esp1 or /esp2** Get all the alarms per day, for location
- **/alarm/month/:month/:year/esp1 or /esp2** Get all the alarms per month, for location
- **/alarm/year/:year/esp1 or /esp2** Get all the alarms per year, for location

All :value parameters here have to be, true, false or null
- **/alarm/day/:day/:month/:year/esp1/:value or /esp2/:value** Get all the alarms per day, for location for a specific status
- **/alarm/month/:month/:year/esp1/:value or /esp2/:value** Get all the alarms per month, for location for a specific status.
- **/alarm/year/:year/esp1/:value or /esp2:value** Get all the alarms per year, for location for a specific status

##POST Requests:
- **/alarm/new/esp1 or /esp2** Insert new alarm
- **/alarm/update/:id/:value** Value parameter has to be true, false or null

## Averages

/average/


## Activity

Activity is measured on a scale from 1 to 10. When the activity is 6 or hire an alarm is fired. The activity is the everage of 5 minutes of data.

### GET Requests:
- **activity/day/:day/:month/:year/esp1 or /esp2** Get all the activity from the esp











