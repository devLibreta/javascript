const soapLib = require("./soap-parser");

const soapBody = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org">
  <soap:Body>
    <m:GetStockPrice xmlns:m="http://example.org">
      <m:StockName>SAMSUNG</m:StockName>
    </m:GetStockPrice>
    <ResponseStatus>SUCCESS</ResponseStatus>
    <Timestamp>2024-05-20T10:00:00Z</Timestamp>
  </soap:Body>
</soap:Envelope>
`.trim();

const body = soapLib.parseSoapToJson(soapBody);

if (body) {
    const stockName = body.GetStockPrice?.StockName;
    const status = body.ResponseStatus;
    const time = body.Timestamp;

    console.log("--- 파싱 결과 ---");
    console.log("종목명:", stockName);   // SAMSUNG
    console.log("상태값:", status);      // SUCCESS
    console.log("시 간:", time);        // 2024-05-20T10:00:00Z
}

console.log(JSON.stringify(body, null, 2));