import { SystemFileSaver } from "./systemFileSaver"


test("should append data in txt file", async () => {
    const instance = new SystemFileSaver()
    let message = "fake news world\n"
    let result = await instance.save(message)
    expect(result).toBe(true)
  })