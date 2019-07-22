/*
  Code    : Send sensor values via POST request
  Author  : Atick Faisal
  License : MIT
  Date    : 23.07.2019
*/

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Enter your wifi credentaials
const char * ssid = "Free wifi";
const char * password = "1988acca";
// IP address of the Raspberry Pi
const String pi_ip_address = "192.168.0.101";

int temp, hum, light;
// Interval between to requests
const int interval = 3000;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  uint8_t i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(500);
    if ((++i % 16) == 0) {
      Serial.println(F(" still trying to connect"));
    }
  }
}

void loop() {
  // acquire sensor values here
  //////////////////////////////////////
  temp = random(20, 40);
  hum = random(20, 99);
  light = random(40, 80);
  //////////////////////////////////////
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://" + pi_ip_address + "/api/sensors");
    http.addHeader("Content-Type", "application/json");
    // constructing the json
    /* Here is the format :
        {
          "temp": "35",
          "hum": "80",
          "light": "60"
        }
    */
    String data = "{\r\n    \"temp\": \"" + String(temp) + "\",\r\n    \"hum\": \"" + String(hum) + "\",\r\n    \"light\": \"" + String(light) + "\"\r\n}";
    int httpResponseCode = http.POST(data);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("Error in WiFi connection");
  }
  delay(interval);
}
