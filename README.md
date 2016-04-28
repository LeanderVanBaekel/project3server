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

###GET Requests:
- **/alarm/all** Get all the documents in the collection
- **/alarm/latest** Get the latest document in the collection

##POST Requests:
- **/alarm/new/esp1 or /esp2** Insert new alarm
- **/alarm/update/:id**

## Get van gemeente

/data/datarequest
