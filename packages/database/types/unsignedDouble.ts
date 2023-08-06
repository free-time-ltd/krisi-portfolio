import { customType } from "drizzle-orm/mysql-core";

const unsignedDouble = customType<{ data: number }>({
  dataType() {
    return "double UNSIGNED";
  },
});

export default unsignedDouble;
