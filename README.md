# Daily CodeWars Challenge API

This API employs a web scraper on the https://www.codewars.com/ website to deliver a daily CodeWars challenge. The output is formatted as a JSON object, as illustrated below:

Feel free to use this API to incorporate CodeWars challenges into your daily routine!
 
## Link
  ```curl
    https://codewarsapi.herokuapp.com/api/getDailyChallenge/
   ````

## Usage

```javascript
{
  "id": "5882b032bdeafec15w0000e6",
  "name": "Print Hello World!",
  "slug": "Hello-World",
  "category": "reference",
  "publishedAt": "2017-01-21T01:07:00.466Z",
  "approvedAt": "2017-06-27T21:34:56.069Z",
  "languages": [
    "python",
    "javascript",
    "csharp",
    "factor",
    "rust"
  ],
  "url": "https://www.codewars.com/kata/5882b032bdeafec15w0000e6",
  "rank": {
  "id": -7,
  "name": "7 kyu",
  "color": "white"
  },
  "createdAt": "2017-01-21T00:50:26.422Z",
  "createdBy": {
    "username": "Dwight-Schrute",
    "url": "https://www.codewars.com/users/Dwight-Schrute"
  },
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
