using System.Data.Common;
using System.Data;
using Dapper;
using System.Data.SqlClient;
using Edportal.Interface;

namespace Edportal.Services
{
    public class DapperService : IDapper
    {
        private readonly IConfiguration config;
        private string Connectionstring = "DefaultConnection";

        public DapperService(IConfiguration config)
        {
            this.config = config;
        }
        public void Dispose()
        {

        }


        public async Task<T> Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
        {
            var conn = GetDbconnection();
            T finalResult;
            try
            {
                conn.Open();
                var result = await conn.QueryAsync<T>(sp, parms, commandType: commandType);
                return finalResult = result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<T>> GetAll<T>(string sp, CommandType commandType = CommandType.StoredProcedure)
        {
            var conn = GetDbconnection();
            try
            {
                conn.Open();
                return await conn.QueryAsync<T>(sp, commandType: commandType);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public DbConnection GetDbconnection()
        {
            var connection = config.GetConnectionString(Connectionstring);
            SqlConnection conn = new SqlConnection(connection);
            return conn;
        }

        public async Task<T> Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            var conn = GetDbconnection();
            T finalResult;
            try
            {
                if (conn.State == ConnectionState.Closed)
                    conn.Open();

                using var tran = conn.BeginTransaction();
                try
                {
                    var result = await conn.QueryAsync<T>(sp, parms, commandType: commandType, transaction: tran);
                    finalResult = result.FirstOrDefault();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn.State == ConnectionState.Open)
                    conn.Close();
            }

            return finalResult;
        }
    }
}
