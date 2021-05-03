# Chatbot

## Watson
I've opted with using the watson assistant framework, as it enables me to leverage the many tools included in the platform.

## NodeJS
I've used NodeJs as backend framework, as the watson API is well documented for node, and it enables me to integrate other API's as well.

## Integrations

The project intergrates with the following services:

api.openweathermap.org

distance24.org

api.eu-de.assistant.watson.cloud.ibm.com


# Running the project
```npm install```

installs requirements

```npm run tsc && node src/app.js```

Compiles and runs the code.

# Usage

To interact with the chatbot, use the following endpoint 

* **URL**

  host:3000/chatbot

* **Method:**
  
     `POST`

* **Data Params**
```json
{
    "dialog": ""
}
```
