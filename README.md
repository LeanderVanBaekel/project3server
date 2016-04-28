# project3server

[tutorial used](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)

## ESP data

### GET Requests:

```
/esp/:id/:amount  
```
:id = esp you want to select 
:amount = amount of enterys you want to see

example: 
```
/esp/esp1/100
```

### Post Requests:

```
/esp/:id/:sensor1/:sensor2/:sensor3
```

:id = esp you are posting from
:sensor1 = sensor data PIR
:sensor2 = sensor data ldr
:sensor3 = sensor data sound

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
- **/alarm/:year** Get all the alarms per year

- **/alarm/day/:day/:month/:year/esp1 or /esp2** Get all the alarms per day, for location
- **/alarm/month/:month/:year/esp1 or /esp2** Get all the alarms per month, for location
- **/alarm/:year/esp1 or /esp2** Get all the alarms per year, for location

##POST Requests:
- **/alarm/new/esp1 or /esp2** Insert new alarm
- **/alarm/update/:id/:value** Value parameter has to be true, false or null

## Get van gemeente

/data/datarequest
