const add = (a: number, b: number) => a+b

fdescribe("Add", () => {
    beforeEach(() => {
        console.log("Vorbereitungsarbeiten.... ")
    })

    it("should correct add", () => {
        const a = 1
        const b = 2

        const c = add(a,b)

        expect(c).toBe(3)
    })
})