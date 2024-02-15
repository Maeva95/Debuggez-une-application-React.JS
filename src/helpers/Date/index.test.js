
import { getMonth } from ".";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function don't return décembre for 2022-01-01 as date", () => {
            const result = getMonth(new Date ("2022-01-01"))
            expect(result).not.toBe("décembre")
        });
        it("the function return février for 2022-02-01 as date", () => {
            const result = getMonth(new Date ("2022-02-01"))
            expect(result).toBe("février")
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            // to implement
            const result = getMonth(new Date ("2022-07-08"))
            expect(result).toBe("juillet")
        });
    });
})

