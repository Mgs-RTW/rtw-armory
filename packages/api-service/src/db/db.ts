import fs from "fs";
import postgres from "postgres";

// const ca = fs.readFileSync("keys/pg-cert.pem", "utf8").toString();

const config = {
  user: "avnadmin",
  password: "AVNS_g2eLQdMdem6BwyU5jmZ",
  host: "rtw-armory-rtw-armory.a.aivencloud.com",
  port: 10143,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUeNUMAKTV3JHsNwGTYwiRIvFhXP8wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYmY3OGViZDUtMDQ2Ni00ODc4LThlMDktZDkzNjYxYTU5
MGY5IFByb2plY3QgQ0EwHhcNMjMxMjA4MjAwNTAyWhcNMzMxMjA1MjAwNTAyWjA6
MTgwNgYDVQQDDC9iZjc4ZWJkNS0wNDY2LTQ4NzgtOGUwOS1kOTM2NjFhNTkwZjkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALMj0X4e
PcpFY7JBooDj6VW+SYgXrCLbs+pgqmmOcP6CTQ7wCJff0NDaQG4tVucR8VbTZioA
M31rcABDZN8bVqSVQVvw6n5HKqEKGty/gqgSSbc2O9Ut/H16bkW/IyLfr3g1wVKj
YopwWLQCYeZpLHcGUYTus+FSjKfWuwYxa2YLun79z03ocQGYTQ8E/7AbLsPwtE5U
G6ElZKK6j4Y/mDrsWeF0CXj6apk1+3dZ4G5AqWTVZroJYZ+7qFttU6TOEDnrO0SW
OS16AMY/zKIbkOXkylTXj32gnUX7bHd3ybipbbJ8k7harVjElv/OO8+CsnTEMyef
5KgYsscslLz9SniHnb6Ryzz+ahIXwSxjHZWjWVAyl7O4o4NE4O8y6S97othkgfP4
lsI1Rb6lEcxnyPfiCyBhUrrY5MsclUUOIXOvFc0eWgnhzvwz4mSaWGixht0RFkzp
4RUloeB0msGn+slCPfKaalKQZ0MwAuPnQxedHYGAHKCfR+FBMapf/PzZnQIDAQAB
oz8wPTAdBgNVHQ4EFgQUzLT32ffwZ8r5YMwpWifSzAstpAwwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAK4Kuuq7yD8hm9p2
hXXyfftRJSQb9WQ2jSfnOroKAGal2df3vgqRUE6KpYHZOqbfiMgvfg9/01/oBXAB
GNp69u1xHsAYjZohiA9qjAHxA7KKRx45PtLZLT/CNe3ocguhMU7KAFZQmB6Aa3IG
dON5vVRewytEVTPVzT6p/kc6ujC94u2o5vZJ5jG+kBKa5svXrAigbG+zmBcC/zY5
ZIGOhkT+qG26C1DANanif/8xf5QZ1yNr2RMSHJHbGgIw2f1t67tqUgyaTM/ehn5O
HKQ0/lEDAdWkDA+dY07/YL87lwmJPyIZWUZEyET6lCQbP6G5wJkH32m2S3oczwD0
ilNKHCFeQ8W2828GYbwjd/1K5pZqchE0ZIiuHHr/HgQaCp2EIMlx4KfXdgvHYM8u
Ul/QkBuhRGFnpGZVJ8lPwFBW0a/JQ+p5Kk7acrf2wy5v6WHwBv92rSZNBrtvq6es
QUiRCTI7HoOjZvI+VYy1DumoBBMqq/xnUXDW+UPcmm9w+isQ4Q==
-----END CERTIFICATE-----`,
  },
};

export const sql = postgres(config);
