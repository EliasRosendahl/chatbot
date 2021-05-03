# Chatbot

## Watson
I've opted with using the watson assistant framework, as it enables me to leverage the many tools included in the platform.

## NodeJS
I've NodeJs as backend framework, as the watson API is well documented for node, and it enables me to integrate other API's as well.

## Integrations

The project intergrates with the following services:

api.openweathermap.org


# Running the project
```npm install```

installs requirements

```npm run tsc && node src/app.js```

Compiles and runs the code.

# Usage

To interact with the chatbot, use the following endpoint 

* **URL**

  /chatbot

* **Method:**
  
     `POST`

* **Data Params**
```json
{
    "dialog": ""
}
```