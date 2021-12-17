import data from "./2003.json";
import { ranking } from "./backend";

test("cruzeiro é campeão em 2003", () => {
  const _ranking = ranking(data);
  expect(_ranking![0].id).toBe("Cruzeiro");
  expect(_ranking![0].values).toStrictEqual([100, 31, 7, 8, 102, 47, 55]);
});

export {};
