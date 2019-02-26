function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function NumberOfReminds(num, divider) {  // number of reminds different degrees of numbers from divider
    let remindsNumber = 0;
    let nowRem = num;
    for (let j = 1; j <= 10; ++j) {
        nowRem *= num;
        nowRem %= divider;
        ++remindsNumber;
        if (nowRem === (num % divider)) {
            return remindsNumber;
        }
    }
}

function Generator(minDeg, maxDeg, remNum1, remNum2, minBase, maxBase, divider) {
    let result = [];  // [num1, num2, degree]

    let num = getRandomInRange(minBase, maxBase);

    while(result.length < 2) {
        if (result.length === 0 && NumberOfReminds(num, divider) === remNum1) {
            result.push(num);
        } else if (result.length === 1 && NumberOfReminds(num, divider) === remNum2
                   && result[0] !== num) {
            result.push(num);
        }

        num = getRandomInRange(minBase, maxBase);
    }

    const deg = getRandomInRange(minDeg, maxDeg);
    result.push(deg);

    return result;
}

function Format(resultOfGenerator) {
    const num1 = resultOfGenerator[0];
    const num2 = resultOfGenerator[1];
    const deg = resultOfGenerator[2];
    return "(" + num1 + "^" + deg + " * "
           + num1 + num1 + "^" + deg + " * "
           + num1 + num1 + num1 + "^" + deg + ") + ("
           + num2 + "^" + deg + " * "
           + num2 + num2 + "^" + deg + " * "
           + num2 + num2 + num2 + "^" + deg + ")";
}

console.log(Format(Generator(1, 100, 2, 4, 1, 9, 5)));