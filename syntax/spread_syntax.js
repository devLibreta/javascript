const assert = require('assert');

/* 
 * Array Spread Syntax
 */


// 1. 초기 데이터
const aArray = [1, 2, 3];
const bArray = [4, 5, 6];

// 2. 두 가지 방식으로 합치기 (둘 다 새로운 배열을 생성함)
const cArray = aArray.concat(bArray);
const dArray = [...aArray, ...bArray];

// --- 검증 시작 ---

// [검증 1] cArray와 dArray의 내용물은 동일해야 함
assert.deepStrictEqual(cArray, [1, 2, 3, 4, 5, 6], "concat 결과가 예상과 다릅니다.");
assert.deepStrictEqual(dArray, [1, 2, 3, 4, 5, 6], "Spread 결과가 예상과 다릅니다.");

// [검증 2] cArray와 dArray는 내용물은 같지만, '서로 다른' 메모리 주소를 가진 별개 객체임
assert.notStrictEqual(cArray, dArray, "cArray와 dArray는 서로 다른 객체여야 합니다.");

// [검증 3] 원본 배열이 보존되었는지 확인 (비파괴적 증명)
aArray.push(99); 
// aArray를 수정해도 이미 복사본인 c, d에는 영향이 없어야 함
assert.strictEqual(cArray.includes(99), false, "원본 수정이 결과 배열에 영향을 주면 안 됩니다.");
assert.strictEqual(dArray.length, 6, "dArray의 길이는 여전히 6이어야 합니다.");


/* 
 * Object Spread Syntax
 */

const aObj = {a: "알짜배기a"};
const bObj = {b: "알짜배기b"};
// 1. aObj 자체를 수정하면서 cObj에 그 주소를 할당 (얕은 복사)
const cObj = Object.assign(aObj, bObj);
// 2. 새로운 객체를 생성 (aObj와는 남남)
const dObj = { ...aObj, ...bObj };

// aObj 값을 변경.
aObj.a = "알짜배기z";

// --- 검증 ---

// [성공] aObj와 cObj는 같은 주소를 가리키므로 cObj.a도 "알짜배기z"임
assert.strictEqual(aObj, cObj, "aObj와 cObj는 동일한 객체여야 합니다.");

// [성공] aObj와 cOjb의 내용물은 같음.
assert.deepStrictEqual(aObj, { a: '알짜배기z', b: '알짜배기b' });

// [성공] dObj는 생성 당시의 값을 복사한 '별개'의 객체이므로 aObj를 바꿔도 유지됨
assert.strictEqual(dObj.a, "알짜배기a", "dObj.a는 원본값이 유지되어야 합니다.");


/* 
 * Function Rest Parameter
 */

function sum(...numbers) { // numbers는 [1, 2, 3] 배열이 됨
    return numbers.reduce((a, b) => a + b);
}

// [성공] 함수 파라미터 변수를 합침
assert.deepStrictEqual(6, sum(1, 2, 3));
