import date from '../date'

test('date', () => {
  date.turnDebugOn()
  date.set("2019-01-01 09:00", "2019-01-01 05:00")
  date.reset()
  const slot = {
    DATE: "2019-01-01 12:00",
    END_DATE: "2019-01-010 13:00",
  }
  expect(date.isNow(slot)).toBeFalsy()
  expect(date.isPast(slot)).toBeTruthy()
  expect(date.print()).toEqual("9:00")
  date.tick()
  console.log(date.print())
})