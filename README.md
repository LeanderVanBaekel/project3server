# Project 3 - Server
[Dashboard Repository](https://github.com/Wesleyvd/Dashboard)
[tutorial used](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)

## ESP data

### GET Requests:
- **/esp/:id/:amount** `:id` is the esp you want to select. `:amount` is the amount of enteries you want to see.

### Post Requests:
- **/esp/:id/:sensor1/:sensor2/:sensor3** 
`:id` is the esp you are posting from. `:sensor1` is the sensor data from PIR. `:sensor2` is the sensor data from the ldr. `:sensor3` is the sound sensor data.

## Alarms
Values with a `:` are parameters, and can be edited.
All date values are in numbers, years written in full ie. 2016, months written in numbers: 1 is January, 12 is December.

### GET Requests:
- **/alarm/all** Get all the documents in the collection
- **/alarm/:id** Get alarm with specific id
- **/alarm/latest** Get the latest document in the collection

#### Alarms by date
- **/alarm/day/:day/:month/:year** By day
- **/alarm/month/:month/:year** By month
- **/alarm/year/:year** By year

#### Alarms by date, by lotcation
- **/alarm/day/:day/:month/:year/esp1 or /esp2** By day
- **/alarm/month/:month/:year/esp1 or /esp2** By month
- **/alarm/year/:year/esp1 or /esp2** By year

#### Alarms by date, by location and by status value
Alarms have a status that is either `true`, `false` or `null`. To get results, `value` has to be one of those.

- **/alarm/day/:day/:month/:year/esp1/:value or /esp2/:value** By day
- **/alarm/month/:month/:year/esp1/:value or /esp2/:value** By month
- **/alarm/year/:year/esp1/:value or /esp2:value**  By year

### POST Requests:
- **/alarm/new/esp1 or /esp2** Insert new alarm
- **/alarm/update/:id/:value** Update alarm with specific id. Value parameter has to be true, false or null.

## Averages

### Get Requests:

- **average/day/:esp/:day/:month/:year** - Get an array with 23 objects representing all the hours, giving the average of the hour, of the specified day.
- **average/week/:esp/:day/:month/:year** - Get an array of 7 days, calculated from the day provided in the query. Ie> 7 april will get you april 7 to and with 13 april
-**average/month/:esp/:month/:year** - Get an array of days, containing the average data per day for everyday of the specified month

## Activity

Activity is measured on a scale from 1 to 10. When the activity is 6 or hire an alarm is fired. The activity is the everage of 5 minutes of data.

### GET Requests:
- **activity/day/:day/:month/:year/esp1 or /esp2** Get all the activity from the esp

### Changing Alarm trigger
- **http://api.leandervanbaekel.nl/settings** Enter the new value for the activity threshold. 

---

# Leander: wat heb ik gedaan?

Ik ben begonnen met het stuk van de communicatie van de ESP. Ik heb er voor gezorgd dat de ESP's de data kunnen posten naar onze api en dat deze data wordt opgeslagen in een mongo database.

Vervolgens ben ik deze data gaan omreken in een 'cijfer' zodat er een waarde van 0 tot 10 zodat de data makkelijk leesbaar is.

Daarna heb ik de settings pagina gemaakt zodat de alarm meldingen makkelijk afgesteld kunnen worden.

# Maaike: wat heb ik gedaan?

Ik ben begonnen met het opzetten van de alarmen, hoe ze worden aangemaakt en hoe we ze kunnen vinden in de database en updaten.

Verder ben ik aan de 'average' calls, hiermee kan de gebruiker de gemiddelde van een dag, week of maand opvragen.

Als laatste heb ik een index pagina met informatie, een klein beetje css en een mudkip toegevoegt. 