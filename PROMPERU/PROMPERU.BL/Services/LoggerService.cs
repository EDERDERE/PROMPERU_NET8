using PROMPERU.BL.Interfaces;
using Serilog;
namespace PROMPERU.BL.Services
{
    public class LoggerService : ILoggerService
    {      

        public LoggerService()
        {
        }

        public void LogInfo(string message)
        {
            Log.Information(message);
        }

        public void LogWarning(string message)
        {
            Log.Warning(message);
        }

        public void LogError(string message, Exception ex)
        {
            Log.Error(ex, message);
        }
    }
}
