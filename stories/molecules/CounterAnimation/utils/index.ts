/* Need a function, which creates string of numbers
 * @param input: nubmer
 * @return number[]
 */
function getArrayOfNumber(input: number) {
    const string = input.toString();
    const isNegative = string.startsWith("-");
    return {
        isNegative,
        numbers: isNegative ? string.split("").slice(1) : string.split("")
    };
}

const getLength = ({ prevValue, value, isIncreasing, isLevelChanging }) => {
    if (
        ((prevValue - value < 0 && isIncreasing) || prevValue - value > 0) &&
        !isLevelChanging
    ) {
        return Math.abs(prevValue - value);
    } else {
        return Math.abs(
            (isIncreasing ? prevValue : prevValue + 10) -
            (isIncreasing ? value + 10 : value)
        );
    }
};

// 1, 3, true => [1, 2, 3] ✅
// 1, 3, true, true => [1, 2, 3, 4, 5, ..., 3] (1->13) ✅
// 1, 3, false => [1, 0, 9, 8, 7, 6, 5, 4, 3] (11->3) ✅
// 5, 2, false => [4, 3, 2] ✅
// 5, 2, false, true => [4, 3, 2, 1, 0, 9, 8, ..., 2] ✅
// 3, 0, true, true => [4, 5, 6, 7, 8, 9, 0] (3->10) ✅
// 2, 8, false => [1, 0, 9, 8] (12->8) ✅
// 9, 9 => [9]
function getDiskNumbers(
    prevValue,
    value,
    isIncreasing,
    isLevelChanging = false
) {
    if (prevValue === value) {
        return [value];
    }
    const length = getLength({ prevValue, value, isIncreasing, isLevelChanging });
    const range = Array(length)
        .fill("")
        .map((_, i) => {
            if (isIncreasing) {
                const val = prevValue + 1 + i;
                return val >= 10 ? Math.abs(10 - val) : val;
            }
            const val = prevValue - 1 - i;
            return val < 0 ? Math.abs(-val - 10) : val;
        });
    const returnValue = [prevValue, ...range];
    return isIncreasing ? returnValue : returnValue.reverse();
}

export default {
    getArrayOfNumber,
    getDiskNumbers
}  