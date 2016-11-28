# Uptime check
Checks uptime status of given url and provided keyword (optional).

## How it works
Makes simple curl requests, gathers data on response and if requested also is looking for a keyword inside the document body.

If http code (response) is 2xx website is considered "up". If there is a keyword given for search but the keyword cannot be found in the document body, website is considered "down".

## Example usage
```javascript
check({
  url: 'https://example.com',
  keyword: 'example',
  redirectsLimit: 0
})
  .then(result => {
    /*
    result = {
      httpCode: '{number}',
      httpCodeLang: 'English translation for http code (e.x. "Bad Request")',
      nameLookupTime: '{number} see curl documentation',
      connectTime: '{number} see curl documentation',
      preTransferTime: '{number} see curl documentation',
      startTransferTime: '{number} see curl documentation',
      response: '{string} full response (header + body)',
      headerSize: '{number} header size (length)',
      bodySize: '{number} body size (length)',
      body: '{string} body (response without header)',
      header: '{string} header (response without body)',
      status: '{bool} true if test passed, false if failed',
    }
    */
  })
  .catch((result, err) => {
    /*
    result = '{object|undefined} object if test failed (result.status === false), undefined when for some reason curl failed to proceed';
    err = '{Error} error passed from node-libcurl';
    */
  });
```