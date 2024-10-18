using Dapper;
using System.Data.Common;
using System.Data;

namespace Edportal.Interface
{
    public interface IDapper : IDisposable
    {
        DbConnection GetDbconnection();
        Task<T> Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        Task<IEnumerable<T>> GetAll<T>(string sp, CommandType commandType = CommandType.StoredProcedure);
        Task<T> Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    }
}
