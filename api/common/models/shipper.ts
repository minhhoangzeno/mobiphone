import { Shipper } from "../../codegen/api/fetch/api";
import { knex } from "../helpers/knex";
import { PersistedModelStatic } from "../helpers/loopback";
import { executeNativeSql } from "../helpers/native-sql";

module.exports = function (Shipper: PersistedModelStatic<Shipper>) {
  // Contact.beforeRemote("**", async (ctx: HttpContext<Contact>) => {
  //   console.log("methodString: ", ctx.methodString);
  // });

  Shipper.afterRemote("find", async (ctx: any) => {
    try {
      const pg = knex('shipper').count().toString();
      const data = await executeNativeSql(Shipper.app.dataSources.postgres.connector, pg, []);
      if (data && data.length > 0) {
        ctx.result = {
          data: ctx.result,
          total: Number(data[0].count)
        }
      }
    } catch (error) {
      console.log(error);
    }
  })


}