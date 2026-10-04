// The "app": prints a new UUID.
// `npm run build` bundles it into dist/main.js, run it with `node dist/main.js`
import { UuidGeneratorNaiveRandomImpl } from "./funwithflags/uuidGenerator"

console.log(new UuidGeneratorNaiveRandomImpl().create())
