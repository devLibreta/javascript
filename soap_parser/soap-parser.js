const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({
    ignoreAttributes: true,
    removeNSPrefix: true
});

function parseSoapToJson(xmlString) {
    const jsonObj = parser.parse(xmlString);
    const body = jsonObj.Envelope?.Body;

    if (!body) return null;

    // 필요한 데이터만 정리해서 반환
    return body;
}

module.exports = { 
    parser,
    parseSoapToJson
};