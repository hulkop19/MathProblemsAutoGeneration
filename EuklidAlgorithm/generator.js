function GCD(x, y) {
    if (x < 0 || y < 0) {
        return NaN;
    }

    let count = 0;
    while(x !== 0 && y !== 0) {
        if (x > y) {
            x %= y;
        } else {
            y %= x;
        }
        count += 1;
    }
    return [x + y, count];
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generator(minNum, maxNum, minAnsw, maxAnsw, minSteps, maxSteps) {
    const wantedAnswer = getRandomInRange(minAnsw, maxAnsw);
    let num1 = getRandomInRange(minNum, maxNum);
    let num2 = getRandomInRange(minNum, maxNum);

    let numSteps = GCD(num1, num2)[1];
    let realAnswer = GCD(num1, num2)[0];

    while (!(numSteps >= minSteps && numSteps <= maxSteps)
           || (realAnswer !== wantedAnswer)) {
        num1 = getRandomInRange(minNum, maxNum);
        num2 = getRandomInRange(minNum, maxNum);
        realAnswer = GCD(num1, num2)[0];
        numSteps = GCD(num1, num2)[1];
    }

    return [realAnswer, num1, num2, numSteps];
}

const problem = generator(1000, 9999, 6, 12, 5, 9);
console.log(problem[0], problem[1], problem[2], problem[3]);
console.log(GCD(problem[1], problem[2])[0], GCD(problem[1], problem[2])[1]);